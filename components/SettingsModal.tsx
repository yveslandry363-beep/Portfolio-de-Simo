
import React from 'react';
import { X, Eye, Zap, Type } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { reduceMotion, toggleReduceMotion, highContrast, toggleHighContrast } = useSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-[#111] border border-white/20 rounded-2xl w-full max-w-md p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold font-['Syne']">Preferences</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20}/></button>
        </div>

        <div className="space-y-6">
            
            {/* Reduced Motion */}
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-500/20 text-blue-400">
                        <Zap size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-white">Reduced Motion</p>
                        <p className="text-xs text-gray-500">Disable heavy 4D scroll & distortions</p>
                    </div>
                </div>
                <button 
                    onClick={toggleReduceMotion}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${reduceMotion ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${reduceMotion ? 'translate-x-6' : ''}`}></div>
                </button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white/10 text-white">
                        <Eye size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-white">High Contrast</p>
                        <p className="text-xs text-gray-500">Increase legibility (Coming soon)</p>
                    </div>
                </div>
                <button 
                    onClick={toggleHighContrast}
                    className={`w-12 h-6 rounded-full p-1 transition-colors ${highContrast ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                     <div className={`w-4 h-4 rounded-full bg-white transition-transform ${highContrast ? 'translate-x-6' : ''}`}></div>
                </button>
            </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
             <button onClick={onClose} className="text-sm text-gray-400 hover:text-white uppercase tracking-widest font-bold">Close & Save</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
