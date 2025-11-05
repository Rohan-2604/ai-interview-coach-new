import React, { useState } from 'react';
import { DIFFICULTIES } from '../constants';
import Card from './common/Card';

interface DifficultySelectorProps {
  branch: string;
  onStart: (difficulty: string, numQuestions: number) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({ branch, onStart }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('Medium');
  const [selectedNumQuestions, setSelectedNumQuestions] = useState<number>(5);
  const questionOptions = [3, 5, 10];

  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Interview Setup</h2>
        <p className="text-slate-300 mb-8 text-lg">
          You've chosen <span className="font-bold text-pink-400">{branch}</span>. Now, configure your session.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-slate-200 mb-3 text-center">1. Choose Difficulty</label>
          <div className="flex justify-center bg-slate-900/50 p-2 rounded-xl">
            {DIFFICULTIES.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none ${
                  selectedDifficulty === difficulty
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-transparent text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        <div>
            <label className="block text-lg font-semibold text-slate-200 mb-3 text-center">2. Select Number of Questions</label>
            <div className="flex justify-center bg-slate-900/50 p-2 rounded-xl">
                {questionOptions.map((num) => (
                    <button
                        key={num}
                        onClick={() => setSelectedNumQuestions(num)}
                        className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none ${
                        selectedNumQuestions === num
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                            : 'bg-transparent text-slate-300 hover:bg-slate-700/50'
                        }`}
                    >
                        {num} Questions
                    </button>
                ))}
            </div>
        </div>

        <div className="pt-4">
             <button
                onClick={() => onStart(selectedDifficulty, selectedNumQuestions)}
                className="w-full py-4 text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-purple-500/30 transform hover:-translate-y-1"
            >
                Start Interview
            </button>
        </div>
      </div>
    </Card>
  );
};

export default DifficultySelector;