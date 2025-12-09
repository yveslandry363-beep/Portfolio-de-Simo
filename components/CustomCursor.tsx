
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const text = textRef.current;
    
    // Only enable on desktop
    if (window.innerWidth < 768) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        
        // Check for specific cursor triggers
        const trigger = target.closest('[data-cursor]');
        const isLink = target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button');
        
        if (trigger) {
            const type = trigger.getAttribute('data-cursor');
            if (type === 'view') {
                gsap.to(follower, { scale: 4, backgroundColor: 'white', mixBlendMode: 'difference', duration: 0.3 });
                if(text) text.innerText = "VIEW";
                gsap.to(text, { opacity: 1, scale: 1, duration: 0.3 });
                gsap.to(cursor, { opacity: 0 });
            } else if (type === 'drag') {
                gsap.to(follower, { scale: 3, backgroundColor: 'transparent', border: '1px solid white', duration: 0.3 });
                if(text) text.innerText = "< >";
                gsap.to(text, { opacity: 1, scale: 1, duration: 0.3 });
            }
        } else if (isLink) {
            // Magnetic snap visual
            gsap.to(follower, { scale: 1.5, backgroundColor: 'transparent', border: '1px solid white', duration: 0.3 });
            gsap.to(cursor, { scale: 0.5, duration: 0.3 });
            gsap.to(text, { opacity: 0 });
        } else {
            // Default
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', mixBlendMode: 'difference', duration: 0.3 });
            gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(text, { opacity: 0 });
        }
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-colors"
      >
          <span ref={textRef} className="text-[8px] font-bold text-black opacity-0 uppercase tracking-widest"></span>
      </div>
    </>
  );
};

export default CustomCursor;
