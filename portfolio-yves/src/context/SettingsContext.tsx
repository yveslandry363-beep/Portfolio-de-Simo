import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const toggleReduceMotion = () => setReduceMotion(prev => !prev);
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  return (
    <SettingsContext.Provider value={{ reduceMotion, toggleReduceMotion, highContrast, toggleHighContrast }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};