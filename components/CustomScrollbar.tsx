
import React, { useEffect, useRef } from 'react';

const CustomScrollbar: React.FC = () => {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScroll = () => {
        if (!thumbRef.current) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = window.scrollY / totalHeight;
        const barHeight = window.innerHeight * 0.2; // 20% height thumb
        const availableHeight = window.innerHeight - barHeight;
        
        const translateY = progress * availableHeight;
        thumbRef.current.style.transform = `translateY(${translateY}px)`;
        thumbRef.current.style.height = `${barHeight}px`;
    };

    window.addEventListener('scroll', updateScroll);
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed right-1 top-0 bottom-0 w-1 z-[999] mix-blend-difference pointer-events-none hidden md:block">
        <div className="w-full h-full bg-white/10 rounded-full relative">
            <div 
                ref={thumbRef} 
                className="w-full bg-white rounded-full absolute top-0 left-0 transition-transform duration-75 ease-out"
            ></div>
        </div>
    </div>
  );
};

export default CustomScrollbar;
