import React from 'react';
import { Feedback, FeedbackPoint } from '../types';
import Card from './common/Card';
import { CheckIcon, LightbulbIcon, StarIcon } from './icons/FeedbackIcons';

interface FeedbackDisplayProps {
  question: string;
  answer: string;
  feedback: Feedback;
  onNext: () => void;
  isLastQuestion: boolean;
}

const FeedbackItem: React.FC<{ item: FeedbackPoint, colorClass: string }> = ({ item, colorClass }) => (
  <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/80 space-y-2">
    <p className="text-slate-200">{item.point}</p>
    <blockquote className="border-l-4 border-slate-600 pl-3 my-2 text-slate-400 italic">
      "{item.example}"
    </blockquote>
    <div className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-${colorClass}-500/10 text-${colorClass}-400 border border-${colorClass}-500/30`}>
      {item.concept}
    </div>
  </div>
);

const FeedbackSection: React.FC<{ title: string; items: FeedbackPoint[]; icon: React.ReactNode; colorClass: string;}> = ({ title, items, icon, colorClass }) => (
    <div className="flex-1 min-w-0">
        <div className="flex items-center mb-4">
            <div className={`mr-3 p-2 rounded-full bg-${colorClass}-500/10 text-${colorClass}-400`}>{icon}</div>
            <h3 className={`text-2xl font-bold text-${colorClass}-400`}>{title}</h3>
        </div>
        <div className="space-y-3">
            {items.map((item, index) => <FeedbackItem key={index} item={item} colorClass={colorClass} />)}
        </div>
    </div>
);


const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ question, answer, feedback, onNext, isLastQuestion }) => {
  return (
    <Card>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-400 mb-2">Your Answer For:</h3>
          <p className="italic text-slate-200 text-xl font-medium">"{question}"</p>
        </div>
        
        <div className="p-4 bg-slate-900/50 rounded-lg max-h-32 overflow-y-auto border border-slate-700">
           <p className="text-slate-300 whitespace-pre-wrap">{answer}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
            <FeedbackSection title="Strengths" items={feedback.strengths} icon={<CheckIcon />} colorClass="green" />
            <FeedbackSection title="Improvements" items={feedback.improvements} icon={<LightbulbIcon />} colorClass="yellow" />
        </div>
        
        {feedback.tip && (
            <div className="mt-2 border-t border-slate-700/80 pt-6">
                 <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-full bg-cyan-500/10 text-cyan-400"><StarIcon /></div>
                    <h3 className="text-2xl font-bold text-cyan-400">Expert Tip</h3>
                </div>
                <p className="text-slate-300 text-lg">{feedback.tip}</p>
            </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onNext}
          className="w-full md:w-auto py-3 px-8 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-lg hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-0.5"
        >
          {isLastQuestion ? 'Finish Session & Save' : 'Next Question'}
        </button>
      </div>
    </Card>
  );
};

export default FeedbackDisplay;
