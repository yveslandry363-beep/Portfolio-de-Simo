import React, { useState, useEffect } from 'react';
import { Rewind, FastForward } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { triggerHaptic, Patterns } from '../utils/haptics';

const TimeTravel: React.FC = () => {
    const [isRetro, setIsRetro] = useState(false);

    const toggleTimeTravel = () => {
        setIsRetro(!isRetro);
        triggerHaptic(Patterns.Success);

        if (!isRetro) {
            document.body.classList.add('brutal-mode');
            gsap.to("body", { filter: "grayscale(100%) contrast(1.5)", duration: 0.5 });
        } else {
            document.body.classList.remove('brutal-mode');
            gsap.to("body", { filter: "none", duration: 0.5 });
        }
    };

    return (
        <button
            onClick={toggleTimeTravel}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white hover:text-black transition-all group overflow-hidden"
            title={isRetro ? "Return to 2025" : "Travel directly to 1995"}
        >
            <div className="relative w-4 h-4 overflow-hidden">
                <div className={`absolute inset-0 transition-transform duration-500 ${isRetro ? '-translate-y-full' : 'translate-y-0'}`}>
                    <Rewind size={16} />
                </div>
                <div className={`absolute inset-0 transition-transform duration-500 ${isRetro ? 'translate-y-0' : 'translate-y-full'}`}>
                    <FastForward size={16} />
                </div>
            </div>

            <span className="text-xs font-bold uppercase tracking-widest font-mono">
                {isRetro ? "2025" : "1995"}
            </span>

            {/* Glitch Effect on Hover */}
            <div className="absolute inset-0 bg-white mix-blend-difference opacity-0 group-hover:opacity-10 pointer-events-none"></div>
        </button>
    );
};

export default TimeTravel;
