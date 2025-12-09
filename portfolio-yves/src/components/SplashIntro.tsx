import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SplashIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState("INITIALIZING");

    // Safety timeout: Force close after 4 seconds if animation hangs
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        tl.to(containerRef.current, {
            duration: 0.5,
            delay: 0.2,
            onStart: () => setText("LOADING ASSETS")
        })
            .to(containerRef.current, {
                duration: 0.5,
                onStart: () => setText("WAKING UP")
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