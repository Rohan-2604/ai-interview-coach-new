import React from 'react';
import { ENGINEERING_BRANCHES } from '../constants';
import Card from './common/Card';
import { HeroIllustration } from './icons/HeroIllustration';
import { SoftwareIcon, MechanicalIcon, ElectricalIcon, CivilIcon, ChemicalIcon, AerospaceIcon, BiomedicalIcon, DataScienceIcon } from './icons/EngineeringIcons';

interface BranchSelectorProps {
  onSelect: (branch: string) => void;
  onViewHistory: () => void;
  onAnalyzeResume: () => void;
}

const branchIcons: { [key: string]: React.ReactNode } = {
  "Software Engineering": <SoftwareIcon />,
  "Mechanical Engineering": <MechanicalIcon />,
  "Electrical Engineering": <ElectricalIcon />,
  "Civil Engineering": <CivilIcon />,
  "Chemical Engineering": <ChemicalIcon />,
  "Aerospace Engineering": <AerospaceIcon />,
  "Biomedical Engineering": <BiomedicalIcon />,
  "Data Science": <DataScienceIcon />,
};

const BranchSelector: React.FC<BranchSelectorProps> = ({ onSelect, onViewHistory, onAnalyzeResume }) => {
  return (
    <Card>
      <div className="text-center">
        <div className="flex justify-center mb-6">
            <HeroIllustration />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome to Your Personal Interview Coach!</h2>
        <p className="text-slate-300 mb-8 text-lg">
          Select your field to start a mock interview, or get AI-powered feedback on your resume.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {ENGINEERING_BRANCHES.map((branch) => (
          <button
            key={branch}
            onClick={() => onSelect(branch)}
            className="group p-4 bg-slate-800/50 rounded-lg text-slate-200 font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-pink-400 flex flex-col items-center justify-center gap-2 text-center"
          >
            <div className="w-10 h-10 text-pink-400 group-hover:text-white transition-colors">{branchIcons[branch]}</div>
            <span>{branch}</span>
          </button>
        ))}
      </div>
       <div className="mt-8 border-t border-slate-700 pt-6 flex flex-col sm:flex-row justify-center items-center gap-6">
        <button
            onClick={onAnalyzeResume}
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors text-lg"
        >
            Analyze My Resume
        </button>
        <span className="hidden sm:inline text-slate-600">|</span>
        <button
            onClick={onViewHistory}
            className="text-pink-400 hover:text-pink-300 font-semibold transition-colors text-lg"
        >
            View Interview History
        </button>
      </div>
    </Card>
  );
};

export default BranchSelector;