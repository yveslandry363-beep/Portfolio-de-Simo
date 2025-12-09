
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TextPlugin from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

interface PreloaderProps {
  loading: boolean;
  progress: number; 
}

const Preloader: React.FC<PreloaderProps> = ({ loading, progress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [narrative, setNarrative] = useState("Initializing...");

  // Narrative Loading Logic
  useEffect(() => {
     if (progress < 30) setNarrative("Initializing Core...");
     else if (progress < 60) setNarrative("Loading Quantum Assets...");
     else if (progress < 90) setNarrative("Compiling 4D Matrix...");
     else setNarrative("Ready.");
  }, [progress]);

  // 3D Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!loading || !imageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      gsap.to(imageRef.current, {
        rotationY: xPos * 15,
        rotationX: -yPos * 15,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 900,
        transformOrigin: "center center"
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [loading]);

  useEffect(() => {
      if(counterRef.current) {
          counterRef.current.innerText = `${progress}%`;
      }
  }, [progress]);

  useGSAP(() => {
    if (!turbulenceRef.current || !displacementRef.current || !contentRef.current) return;

    gsap.set(turbulenceRef.current, { attr: { baseFrequency: "0.02 0.05" } });
    gsap.set(displacementRef.current, { attr: { scale: 100 } });
    gsap.set(imageRef.current, { scale: 1.2, opacity: 0 });
    gsap.set(contentRef.current, { opacity: 0 });

    const tl = gsap.timeline();

    tl.to(imageRef.current, { opacity: 1, duration: 1, ease: "power2.inOut" })
      .to(contentRef.current, { opacity: 1, duration: 1 }, "-=0.5");

    gsap.to(turbulenceRef.current, {
        attr: { baseFrequency: "0.01 0.02" },
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    if (!loading) {
       gsap.killTweensOf(turbulenceRef.current);

       const exitTl = gsap.timeline();
       
       exitTl.to(turbulenceRef.current, {
          attr: { baseFrequency: "0 0" },
          duration: 1.5,
          ease: "power2.out"
       })
       .to(displacementRef.current, {
          attr: { scale: 0 },
          duration: 1.5,
          ease: "power2.out"
       }, "<")
       .to(containerRef.current, {
         yPercent: -100,
         duration: 1.2,
         ease: "power4.inOut",
         delay: 0.2
       });
    }
  }, { scope: containerRef, dependencies: [loading] });

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden ${!loading ? 'pointer-events-none' : ''}`}
    >
        <svg className="hidden">
            <filter id="liquid-filter">
                <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" result="noise" />
                <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="100" />
            </filter>
        </svg>

        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            <div className="relative w-full h-full max-w-[100vw] max-h-[100vh]">
                 <img 
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=2574&auto=format&fit=crop" 
                    alt="Yves-Landry"
                    className="w-full h-full object-cover filter-[url(#liquid-filter)]"
                    style={{ filter: 'url(#liquid-filter)' }}
                 />
                 <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
            </div>
            
            <div ref={contentRef} className="absolute inset-0 flex flex-col justify-end p-12 md:p-24 text-white mix-blend-difference">
                 <div className="overflow-hidden">
                    <h1 className="text-6xl md:text-9xl font-bold font-['Syne'] uppercase tracking-tighter leading-none">
                        Yves-Landry
                    </h1>
                 </div>
                 <div className="flex justify-between items-end mt-4 border-t border-white/50 pt-4">
                    <div className="flex flex-col">
                        <span className="text-sm uppercase tracking-widest font-mono text-blue-300">{narrative}</span>
                        <span className="text-xs text-gray-400 mt-1">Portfolio 2025</span>
                    </div>
                    <span ref={counterRef} className="counter-text text-6xl md:text-8xl font-bold font-['Syne']">0%</span>
                 </div>
            </div>
        </div>
    </div>
  );
};

export default Preloader;
