import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
    </svg>
);

export const SoftwareIcon = () => <IconWrapper><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></IconWrapper>;
export const MechanicalIcon = () => <IconWrapper><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></IconWrapper>;
export const ElectricalIcon = () => <IconWrapper><path d="M12.22 2h-4.44l-3 9h5l-1 7h3l3-9h-5l1-7z"></path></IconWrapper>;
export const CivilIcon = () => <IconWrapper><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></IconWrapper>;
export const ChemicalIcon = () => <IconWrapper><path d="M8 21h8"></path><path d="M12 17V3"></path><path d="M12 3H8.5A2.5 2.5 0 006 5.5V9"></path><path d="M12 3h3.5A2.5 2.5 0 0118 5.5V9"></path><path d="M6 9h12"></path></IconWrapper>;
export const AerospaceIcon = () => <IconWrapper><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></IconWrapper>;
export const BiomedicalIcon = () => <IconWrapper><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 11V3"></path><path d="M12 11l4 2"></path><path d="M12 11L8 9"></path></IconWrapper>;
export const DataScienceIcon = () => <IconWrapper><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2"></path><path d="M12 20h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2"></path><path d="M4 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4"></path></IconWrapper>;
