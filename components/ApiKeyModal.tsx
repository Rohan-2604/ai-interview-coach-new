import React, { useState } from 'react';
import Card from './common/Card';

interface ApiKeyModalProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-lg animate-fade-in">
        <Card>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white">Enter Your API Key</h2>
              <p className="text-slate-400 mt-2">
                To use the AI Interview Coach, please provide your own Google Gemini API key.
                Your key is stored securely in your browser for this session only.
              </p>
            </div>

            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API Key here"
              className="w-full p-3 bg-slate-800 border-2 border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors text-slate-200"
            />

            <button
              type="submit"
              disabled={!apiKey.trim()}
              className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-purple-500/30"
            >
              Save & Continue
            </button>
            <div className="text-center">
                <a 
                    href="https://ai.google.dev/gemini-api/docs/api-key" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                >
                    How to get an API key from Google AI Studio
                </a>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeyModal;
