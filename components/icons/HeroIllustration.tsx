import React from 'react';

export const HeroIllustration: React.FC = () => (
    <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#22d3ee', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        
        <circle cx="50" cy="50" r="45" fill="url(#grad2)" opacity="0.1" />
        
        <path d="M 50,5 A 45,45 0 1 1 5,50" fill="none" stroke="url(#grad1)" strokeWidth="4">
            <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="10s"
                repeatCount="indefinite"
            />
        </path>
        
        <path d="M 95,50 A 45,45 0 1 1 50,95" fill="none" stroke="url(#grad2)" strokeWidth="4">
             <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="-360 50 50"
                dur="12s"
                repeatCount="indefinite"
            />
        </path>

        <circle cx="50" cy="20" r="5" fill="url(#grad1)">
            <animateMotion dur="6s" repeatCount="indefinite" path="M0,0 A30,30 0 1,1 0,-0.01 Z" />
        </circle>
        <circle cx="20" cy="50" r="5" fill="url(#grad2)">
             <animateMotion dur="8s" repeatCount="indefinite" path="M0,0 A30,30 0 1,1 0,-0.01 Z" />
        </circle>
        
        <text x="50" y="58" fontFamily="Inter, sans-serif" fontSize="24" fontWeight="bold" fill="#ffffff" textAnchor="middle">AI</text>
    </svg>
);
