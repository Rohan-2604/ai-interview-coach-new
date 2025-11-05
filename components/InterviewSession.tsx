import React, { useState, useCallback } from 'react';
import useSpeechToText from '../hooks/useSpeechToText';
import Card from './common/Card';
import { MicIcon, StopIcon } from './icons/AudioIcons';

interface InterviewSessionProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onSubmit: (answer: string) => void;
}

const InterviewSession: React.FC<InterviewSessionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onSubmit,
}) => {
  const [answer, setAnswer] = useState('');

  const handleTranscriptChange = useCallback((transcript: string) => {
    setAnswer(transcript);
  }, []);

  const { isListening, startListening, stopListening, hasRecognitionSupport } = useSpeechToText({ onTranscriptChange: handleTranscriptChange });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
    }
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <Card>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold text-cyan-400">
            Question {questionNumber} of {totalQuestions}
            </p>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-cyan-400 to-violet-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <h2 className="text-2xl font-bold leading-tight text-slate-100">{question}</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="relative">
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type or speak your answer here..."
            className="w-full h-48 p-4 bg-slate-900/70 border-2 border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors text-slate-200 resize-none"
            disabled={isListening}
          />
          {hasRecognitionSupport && (
            <div className="absolute bottom-3 right-3">
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-2 rounded-full transition-all duration-200 ${
                  isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50' : 'bg-slate-700 hover:bg-cyan-500 text-slate-300 hover:text-white'
                }`}
                aria-label={isListening ? 'Stop recording' : 'Start recording'}
              >
                {isListening ? <StopIcon /> : <MicIcon />}
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!answer.trim()}
          className="w-full py-3 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-lg hover:from-violet-700 hover:to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-indigo-500/30 disabled:shadow-none"
        >
          Submit Answer
        </button>
         {!hasRecognitionSupport && (
          <p className="text-xs text-slate-500 text-center">Voice input is not supported in your browser.</p>
        )}
      </form>
    </Card>
  );
};

export default InterviewSession;