import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SplashIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("INITIALIZING");

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.to(containerRef.current, {
            onStart: () => setText("LOADING ASSETS"),
            duration: 0.5,
            delay: 0.5
        })
        .to(containerRef.current, {
            onStart: () => setText("WAKING UP"),
            duration: 0.5,
        })
        .to(".splash-text", {
            opacity: 0,
            scale: 1.5,
            filter: "blur(10px)",
            duration: 0.8,
            ease: "power2.in"
        })
        .to(containerRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            <h1 className="splash-text text-white font-mono text-xs tracking-[0.5em]">{text}</h1>
        </div>
    );
};

export default SplashIntro;