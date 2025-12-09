
import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { triggerHaptic, Patterns } from '../utils/haptics';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detect iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // Check if already in standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    
    if (isIosDevice && !isStandalone) {
        setIsIOS(true);
        // Show prompt after a delay for iOS users
        setTimeout(() => setShowPrompt(true), 10000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    triggerHaptic(Patterns.Click);
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[9999] md:hidden animate-in slide-in-from-bottom-10 fade-in duration-700">
        <div className="bg-[#111] border border-white/20 p-4 rounded-2xl shadow-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold font-['Syne'] text-white">
                    YL
                </div>
                <div>
                    <h4 className="font-bold text-white text-sm">Install App</h4>
                    <p className="text-xs text-gray-400">Add to Home Screen</p>
                </div>
            </div>
            
            <div className="flex items-center gap-3">
                {isIOS ? (
                    <div className="text-xs text-gray-400 mr-2 flex items-center gap-1">
                        Tap <Share size={12}/> then "Add to Home Screen"
                    </div>
                ) : (
                    <button 
                        onClick={handleInstall}
                        className="bg-white text-black text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform"
                    >
                        Install
                    </button>
                )}
                <button onClick={() => setShowPrompt(false)} className="text-gray-500 p-1"><X size={16}/></button>
            </div>
        </div>
    </div>
  );
};

export default InstallPrompt;
