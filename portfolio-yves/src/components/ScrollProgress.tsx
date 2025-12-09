
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const ScrollProgress: React.FC = () => {
  const circleRef = useRef<SVGCircleElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Only show after scrolling a bit
    gsap.fromTo(containerRef.current, 
        { autoAlpha: 0, y: 20 },
        { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.5, 
            scrollTrigger: {
                trigger: document.body, // Use element directly
                start: "top -100px",
                toggleActions: "play none none reverse"
            }
        }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const updateProgress = () => {
      if (!circleRef.current) return;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      const circumference = 2 * Math.PI * 18; // r=18
      const offset = circumference - progress * circumference;
      circleRef.current.style.strokeDashoffset = offset.toString();
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
        ref={containerRef}
        className="fixed bottom-8 right-8 z-40 hidden md:flex items-center justify-center cursor-pointer mix-blend-difference opacity-0 invisible"
        onClick={scrollToTop}
        data-cursor="link"
    >
      <svg width="50" height="50" className="transform -rotate-90">
        <circle
          cx="25"
          cy="25"
          r="18"
          stroke="rgba(255, 255, 255, 0.2)"
          strokeWidth="2"
          fill="none"
        />
        <circle
          ref={circleRef}
          cx="25"
          cy="25"
          r="18"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeDasharray={2 * Math.PI * 18}
          strokeDashoffset={2 * Math.PI * 18}
          className="transition-all duration-100 ease-out"
        />
      </svg>
      <span className="absolute text-[8px] font-bold uppercase text-white">Top</span>
    </div>
  );
};

export default ScrollProgress;
