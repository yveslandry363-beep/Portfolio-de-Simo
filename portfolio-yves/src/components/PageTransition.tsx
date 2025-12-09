
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLocation } from 'react-router-dom';

const PageTransition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useGSAP(() => {
    // Determine context (simple wipe effect)
    const tl = gsap.timeline();

    // Entrance animation (Wipe away the black curtain)
    tl.set(".transition-curtain", { scaleY: 1, transformOrigin: "bottom" })
      .to(".transition-curtain", {
        scaleY: 0,
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2 // Wait for data/render slightly
      });

  }, { scope: containerRef, dependencies: [location.pathname] });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999] flex flex-col">
      <div className="transition-curtain w-full h-full bg-blue-600 relative z-20"></div>
      <div className="transition-curtain w-full h-full bg-black absolute inset-0 z-10 delay-100"></div>
    </div>
  );
};

export default PageTransition;
