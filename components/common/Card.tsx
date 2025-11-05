import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-slate-900/50 border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/30 p-6 md:p-8 backdrop-blur-2xl relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;