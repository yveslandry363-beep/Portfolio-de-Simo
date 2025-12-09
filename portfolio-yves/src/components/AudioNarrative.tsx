import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface AudioNarrativeProps {
    onComplete?: () => void;
}

const AudioNarrative: React.FC<AudioNarrativeProps> = ({ onComplete }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [hasPlayed, setHasPlayed] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Using a placeholder TTS file or a futuristic sound effect for now
    // In a real scenario, this would be an ElevenLabs generated MP3
    const audioSrc = "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3"; // Sci-fi interface hum/voice placeholder

    useEffect(() => {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.volume = 0.5;

        audioRef.current.onended = () => {
            setIsPlaying(false);
            setHasPlayed(true);
            if (onComplete) onComplete();
            // Auto-hide after completion
            gsap.to(containerRef.current, { y: 100, opacity: 0, delay: 2, duration: 1 });
        };

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [onComplete]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    const closePlayer = () => {
        if (audioRef.current) audioRef.current.pause();
        setIsPlaying(false);
        gsap.to(containerRef.current, {
            x: 100,
            opacity: 0,
            duration: 0.5,
            onComplete: () => setIsVisible(false)
        });
    };

    if (!isVisible) return null;

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-2 pr-6 shadow-2xl">
            <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-500 transition-colors shrink-0"
            >
                {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
            </button>

            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">System Voice</span>
                <span className="text-xs font-medium text-white">Introduction</span>
            </div>

            <div className="flex gap-1 h-4 items-center ml-2">
                {/* Fake Visualizer */}
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1 bg-white/50 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`} style={{ height: isPlaying ? `${Math.random() * 16 + 4}px` : '4px', animationDelay: `${i * 0.1}s` }}></div>
                ))}
            </div>

            <button onClick={closePlayer} className="ml-2 text-gray-500 hover:text-white transition-colors">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );
};

export default AudioNarrative;
