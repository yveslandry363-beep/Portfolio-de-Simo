
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if(!textRef.current) return;
    
    const w = textRef.current.offsetWidth;
    
    gsap.to(textRef.current, {
      x: -w / 2,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }, { scope: containerRef });

  const skills = "JAVASCRIPT — PYTHON — REACT — WEBGL — DATA SCIENCE — AI/ML — AUTOMATION — MATHEMATICS — ";

  return (
    <div ref={containerRef} className="w-full overflow-hidden py-4 border-y border-white/10 bg-black/50 backdrop-blur-sm">
      <div ref={textRef} className="whitespace-nowrap flex">
        <span className="text-4xl md:text-6xl font-['Syne'] font-bold text-transparent stroke-white opacity-30 uppercase tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
          {skills.repeat(4)}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
