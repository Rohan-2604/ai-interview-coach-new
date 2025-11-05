import React, { useState, useCallback } from 'react';
import { ENGINEERING_BRANCHES } from '../constants';
import { analyzeResume } from '../services/geminiService';
import { parsePdf } from '../utils/pdfParser';
import { ResumeFeedback } from '../types';
import Card from './common/Card';
import Loader from './common/Loader';
import { SoftwareIcon, MechanicalIcon, ElectricalIcon, CivilIcon, ChemicalIcon, AerospaceIcon, BiomedicalIcon, DataScienceIcon } from './icons/EngineeringIcons';

interface ResumeAnalyzerProps {
    onBack: () => void;
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

type ResumeAnalysisState = 'selecting_branch' | 'uploading' | 'analyzing' | 'showing_feedback' | 'error';

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onBack }) => {
    const [state, setState] = useState<ResumeAnalysisState>('selecting_branch');
    const [branch, setBranch] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<ResumeFeedback | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleBranchSelect = (selectedBranch: string) => {
        setBranch(selectedBranch);
        setState('uploading');
    };

    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !branch) return;

        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            setState('error');
            return;
        }

        setState('analyzing');
        setError(null);
        setFileName(file.name);

        try {
            const resumeText = await parsePdf(file);
            const result = await analyzeResume(resumeText, branch);
            setFeedback(result);
            setState('showing_feedback');
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
            setError(`Analysis failed: ${errorMessage}`);
            setState('error');
        }
    }, [branch]);

    const handleRestart = () => {
        setState('selecting_branch');
        setBranch(null);
        setFeedback(null);
        setError(null);
        setFileName('');
    };

    const renderContent = () => {
        switch (state) {
            case 'selecting_branch':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Resume Analyzer</h2>
                        <p className="text-slate-300 mb-6">Select the field your resume is tailored for to get the most relevant feedback.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {ENGINEERING_BRANCHES.map((b) => (
                                <button key={b} onClick={() => handleBranchSelect(b)} className="group p-4 bg-slate-800/50 rounded-lg text-slate-200 font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/30 flex flex-col items-center justify-center gap-2 text-center">
                                    <div className="w-8 h-8 text-pink-400 group-hover:text-white transition-colors">{branchIcons[b]}</div>
                                    <span>{b}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 'uploading':
                return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
                        <p className="text-slate-300 mb-6">Upload your resume in PDF format for analysis tailored to <span className="font-bold text-pink-400">{branch}</span>.</p>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-800/80 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/></svg>
                                    <p className="mb-2 text-sm text-slate-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-slate-500">PDF only (MAX. 5MB)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                            </label>
                        </div>
                    </div>
                );
            case 'analyzing':
                return <Loader text={`Analyzing "${fileName}" for ${branch}...`} />;
            case 'showing_feedback':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-6">Resume Feedback for <span className="text-pink-400">{branch}</span></h2>
                        <div className="space-y-6">
                            <FeedbackSection title="Strengths" items={feedback!.strengths} colorClass="green" />
                            <FeedbackSection title="Areas for Improvement" items={feedback!.improvements} colorClass="yellow" />
                            <FeedbackSection title="Formatting Tips" items={feedback!.formattingTips} colorClass="cyan" />
                        </div>
                        <button onClick={handleRestart} className="mt-8 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors">Analyze Another Resume</button>
                    </div>
                );
            case 'error':
                return (
                    <div className="text-center p-4 bg-red-900/50 border border-red-500 rounded-lg">
                        <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
                        <p className="text-slate-300 mb-4">{error}</p>
                        <button onClick={handleRestart} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors">Try Again</button>
                    </div>
                );
        }
    };

    return (
        <Card>
            <div className="flex justify-end mb-4">
                 <button onClick={onBack} className="text-slate-400 hover:text-white transition-colors">&larr; Back to Main Menu</button>
            </div>
            {renderContent()}
        </Card>
    );
};

const FeedbackSection: React.FC<{ title: string; items: string[]; colorClass: string }> = ({ title, items, colorClass }) => (
    <div>
        <h3 className={`text-2xl font-bold text-${colorClass}-400 border-b-2 border-${colorClass}-500/50 pb-2 mb-3`}>{title}</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);


export default ResumeAnalyzer;