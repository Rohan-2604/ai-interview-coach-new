import React, { useState, useEffect, useCallback } from 'react';
import { getHistory } from '../utils/historyManager';
import { InterviewSessionRecord, ProgressSummary, FeedbackPoint } from '../types';
import { generateProgressSummary } from '../services/geminiService';
import Card from './common/Card';
import Loader from './common/Loader';

interface HistoryViewProps {
  onBack: () => void;
}

const isFeedbackPoint = (item: string | FeedbackPoint): item is FeedbackPoint => {
  return typeof item === 'object' && item !== null && 'point' in item;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onBack }) => {
  const [history, setHistory] = useState<InterviewSessionRecord[]>([]);
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSessionId, setExpandedSessionId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerateSummary = useCallback(async () => {
    if (history.length === 0) return;
    setIsLoadingSummary(true);
    setError(null);
    try {
      const result = await generateProgressSummary(history);
      setSummary(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate summary: ${errorMessage}`);
    } finally {
      setIsLoadingSummary(false);
    }
  }, [history]);

  const toggleSession = (id: string) => {
    setExpandedSessionId(expandedSessionId === id ? null : id);
  };

  const renderFeedbackPoint = (item: string | FeedbackPoint, index: number) => {
    if (isFeedbackPoint(item)) {
        return (
            <li key={index} className="space-y-1">
                <span>{item.point}</span>
                <p className="text-xs text-slate-400 italic pl-2">Concept: {item.concept}</p>
            </li>
        )
    }
    return <li key={index}>{item}</li>;
  };

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-3xl font-bold">Interview History</h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
          >
            &larr; Back to Main Menu
          </button>
        </div>

        {history.length > 0 ? (
          <div>
            <button
              onClick={handleGenerateSummary}
              disabled={isLoadingSummary}
              className="w-full mb-6 py-3 px-6 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoadingSummary ? 'Generating...' : 'Generate AI Progress Summary'}
            </button>
            {isLoadingSummary && <Loader text="Analyzing your performance..." />}
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            {summary && (
              <div className="mb-8 p-4 bg-slate-900/50 rounded-lg space-y-4 border border-slate-700">
                <h3 className="text-xl font-bold text-green-400">Common Strengths</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {summary.commonStrengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
                <h3 className="text-xl font-bold text-yellow-400">Common Weaknesses</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {summary.commonWeaknesses.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
                <h3 className="text-xl font-bold text-cyan-400">Suggestions for Improvement</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  {summary.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-8">No interview history found. Complete a session to see it here!</p>
        )}
      </Card>

      {history.length > 0 && (
         <div className="space-y-4">
          {history.map(session => (
            <Card key={session.id} className="overflow-hidden">
              <button onClick={() => toggleSession(session.id)} className="w-full text-left">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-xl">{session.branch} - {session.difficulty}</p>
                    <p className="text-sm text-slate-400">{new Date(session.date).toLocaleString()}</p>
                  </div>
                  <span className={`transform transition-transform text-2xl ${expandedSessionId === session.id ? 'rotate-180' : ''}`}>▼</span>
                </div>
              </button>
              {expandedSessionId === session.id && (
                <div className="mt-6 border-t border-slate-700 pt-4 space-y-6">
                  {session.rounds.map((round, index) => (
                    <div key={index} className="p-4 bg-slate-900/50 rounded-lg">
                      <p className="font-bold text-slate-300 mb-2">Q: {round.question}</p>
                      <p className="text-sm text-slate-400 mb-4 whitespace-pre-wrap italic">A: {round.answer}</p>
                      <div className="text-sm">
                        <p className="font-semibold text-green-500">Strengths:</p>
                        <ul className="list-disc list-inside ml-4 text-slate-300">
                          {round.feedback.strengths.map((s, i) => renderFeedbackPoint(s as any, i))}
                        </ul>
                         <p className="font-semibold text-yellow-500 mt-2">Improvements:</p>
                        <ul className="list-disc list-inside ml-4 text-slate-300">
                           {round.feedback.improvements.map((imp, i) => renderFeedbackPoint(imp as any, i))}
                        </ul>
                        {round.feedback.tip && <>
                          <p className="font-semibold text-cyan-500 mt-2">Tip:</p>
                          <p className="ml-4 text-slate-300">{round.feedback.tip}</p>
                        </>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
