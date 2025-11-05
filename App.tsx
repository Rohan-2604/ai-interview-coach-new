import React, { useState, useCallback, useEffect } from 'react';
import { AppState, Feedback, InterviewRound } from './types';
import { generateQuestions, getFeedback } from './services/geminiService';
import { saveSessionToHistory } from './utils/historyManager';

import BranchSelector from './components/BranchSelector';
import DifficultySelector from './components/DifficultySelector';
import InterviewSession from './components/InterviewSession';
import FeedbackDisplay from './components/FeedbackDisplay';
import HistoryView from './components/HistoryView';
import Loader from './components/common/Loader';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ApiKeyModal from './components/ApiKeyModal';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.SELECTING_BRANCH);
  const [branch, setBranch] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string | null>(null);
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [currentSessionRounds, setCurrentSessionRounds] = useState<InterviewRound[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [numQuestions, setNumQuestions] = useState<number>(5);

  useEffect(() => {
    const key = sessionStorage.getItem('gemini-api-key');
    if (key) {
      setApiKey(key);
    }
  }, []);

  const handleKeySubmit = (key: string) => {
    sessionStorage.setItem('gemini-api-key', key);
    setApiKey(key);
  };

  const handleBranchSelect = useCallback((selectedBranch: string) => {
    setBranch(selectedBranch);
    setAppState(AppState.SELECTING_DIFFICULTY);
  }, []);

  const handleStartInterview = useCallback(async (selectedDifficulty: string, selectedNumQuestions: number) => {
    if (!branch) return;
    setDifficulty(selectedDifficulty);
    setNumQuestions(selectedNumQuestions);
    setAppState(AppState.GENERATING_QUESTIONS);
    setError(null);
    try {
      const newQuestions = await generateQuestions(branch, selectedDifficulty, selectedNumQuestions);
      if (newQuestions && newQuestions.length > 0) {
        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
        setAppState(AppState.INTERVIEWING);
      } else {
        setError('Failed to generate questions. The AI may be overloaded or the API key is invalid. Please try again.');
        setAppState(AppState.ERROR);
      }
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate questions: ${errorMessage}. Check your API key and network connection.`);
      setAppState(AppState.ERROR);
    }
  }, [branch]);

  const handleSubmitAnswer = useCallback(async (answer: string) => {
    if (!branch || questions.length === 0) return;

    setCurrentAnswer(answer);
    setAppState(AppState.ANALYZING_ANSWER);
    setError(null);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const newFeedback = await getFeedback(branch, currentQuestion, answer);
      setFeedback(newFeedback);
      setAppState(AppState.SHOWING_FEEDBACK);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to analyze your answer: ${errorMessage}. Check your API key and network connection.`);
      setAppState(AppState.ERROR);
    }
  }, [branch, questions, currentQuestionIndex]);

  const handleNextQuestion = useCallback(() => {
    const lastRound: InterviewRound = {
        question: questions[currentQuestionIndex],
        answer: currentAnswer,
        feedback: feedback!,
    };
    const updatedRounds = [...currentSessionRounds, lastRound];
    setCurrentSessionRounds(updatedRounds);

    setFeedback(null);
    setCurrentAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setAppState(AppState.INTERVIEWING);
    } else {
      saveSessionToHistory({
        id: new Date().toISOString(),
        branch: branch!,
        difficulty: difficulty!,
        date: new Date().toISOString(),
        rounds: updatedRounds,
      });
      setAppState(AppState.SESSION_COMPLETE);
    }
  }, [branch, difficulty, currentQuestionIndex, questions, currentAnswer, feedback, currentSessionRounds]);

  const handleRestart = useCallback(() => {
    setAppState(AppState.SELECTING_BRANCH);
    setBranch(null);
    setDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setCurrentAnswer('');
    setFeedback(null);
    setError(null);
    setCurrentSessionRounds([]);
    setNumQuestions(5);
  }, []);
  
  const handleResumeAnalysisRequest = useCallback(() => {
    setAppState(AppState.ANALYZING_RESUME);
  }, []);

  const renderContent = () => {
    switch (appState) {
      case AppState.SELECTING_BRANCH:
        return <BranchSelector onSelect={handleBranchSelect} onViewHistory={() => setAppState(AppState.VIEWING_HISTORY)} onAnalyzeResume={handleResumeAnalysisRequest} />;
      case AppState.SELECTING_DIFFICULTY:
        return <DifficultySelector branch={branch!} onStart={handleStartInterview} />;
      case AppState.VIEWING_HISTORY:
        return <HistoryView onBack={() => setAppState(AppState.SELECTING_BRANCH)} />;
      case AppState.ANALYZING_RESUME:
        return <ResumeAnalyzer onBack={handleRestart} />;
      case AppState.GENERATING_QUESTIONS:
        return <Loader text="Generating tailored questions..." />;
      case AppState.INTERVIEWING:
        return (
          <InterviewSession
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onSubmit={handleSubmitAnswer}
          />
        );
      case AppState.ANALYZING_ANSWER:
        return <Loader text="Analyzing your answer..." />;
      case AppState.SHOWING_FEEDBACK:
        return (
          <FeedbackDisplay
            question={questions[currentQuestionIndex]}
            answer={currentAnswer}
            feedback={feedback!}
            onNext={handleNextQuestion}
            isLastQuestion={currentQuestionIndex >= questions.length - 1}
          />
        );
      case AppState.SESSION_COMPLETE:
        return (
          <div className="text-center p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Interview Complete!</h2>
            <p className="text-lg text-slate-300 mb-6">Your session has been saved to your history.</p>
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-purple-500/30"
            >
              Start New Session
            </button>
          </div>
        );
      case AppState.ERROR:
        return (
          <div className="text-center p-8 bg-red-900/50 border border-red-500 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold text-red-400 mb-4">An Error Occurred</h2>
            <p className="text-lg text-slate-300 mb-6">{error}</p>
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  if (!apiKey) {
    return <ApiKeyModal onSubmit={handleKeySubmit} />;
  }

  return (
    <div className="min-h-screen text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto z-10">
        <header className="text-center mb-8 flex flex-col items-center">
            <div className="flex items-center gap-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-500">
                    <path d="M14.5 9.5C14.5 10.8807 13.3807 12 12 12C10.6193 12 9.5 10.8807 9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.47597 20.9937 7.17215 19.3137 5.56066L19.2515 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M16.5 14.5C16.5 15.8807 15.3807 17 14 17C12.6193 17 11.5 15.8807 11.5 14.5C11.5 13.1193 12.6193 12 14 12C15.3807 12 16.5 13.1193 16.5 14.5Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9.5 14.5C9.5 15.8807 8.38071 17 7 17C5.61929 17 4.5 15.8807 4.5 14.5C4.5 13.1193 5.61929 12 7 12C8.38071 12 9.5 13.1193 9.5 14.5Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-pink-300">
                    AI Interview Coach
                </h1>
          </div>
          {branch && appState > AppState.SELECTING_DIFFICULTY && appState < AppState.SESSION_COMPLETE && (
            <p className="text-slate-300 mt-2 text-lg">Field: <span className="font-bold text-white">{branch}</span> | Difficulty: <span className="font-bold text-white">{difficulty}</span> | Questions: <span className="font-bold text-white">{numQuestions}</span></p>
          )}
        </header>
        <main>
          <div key={appState} className="animate-fade-in">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
