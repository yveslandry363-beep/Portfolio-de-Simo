
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useGSAP(() => {
    // Staggered Text Reveal
    const tl = gsap.timeline({ delay: 2 }); 
    
    tl.fromTo(".hero-line", 
      { y: 150, opacity: 0, rotate: 5 },
      { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out", stagger: 0.15 }
    );
    
    tl.fromTo(".hero-sub", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

  }, { scope: containerRef });

  // Kinetic Typography Interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX / window.innerWidth;
        // Map mouse X to font weight range (e.g. 100 to 800)
        // We target specific kinetic-text classes
        const weights = [
            200 + x * 600, // Inverse
            800 - x * 600, // Standard
            400 + Math.sin(x * Math.PI) * 400 // Wave
        ];

        gsap.to('.kinetic-text-1', { fontWeight: weights[0], duration: 0.5 });
        gsap.to('.kinetic-text-2', { fontWeight: weights[1], duration: 0.5 });
        gsap.to('.kinetic-text-3', { fontWeight: weights[2], duration: 0.5 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden" ref={containerRef}>
      <div className="max-w-[90vw] mx-auto z-10">
        
        {/* Large Kinetic Typography */}
        <div className="flex flex-col gap-2 md:gap-4 mb-8 md:mb-12">
          <div className="overflow-hidden py-2 px-1">
             <h1 className="kinetic-text-1 hero-line text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase font-['Syne'] text-transparent stroke-white stroke-2 md:stroke-4 opacity-80" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.5)' }}>
               {t.hero.software}
             </h1>
          </div>
          <div className="overflow-hidden py-2 px-1">
             <h1 className="kinetic-text-2 hero-line text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase font-['Syne'] text-white">
               {t.hero.data}
             </h1>
          </div>
          <div className="overflow-hidden py-2 px-1">
             <h1 className="kinetic-text-3 hero-line text-[12vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase font-['Syne'] text-blue-500 mix-blend-screen drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
               {t.hero.math}
             </h1>
          </div>
        </div>

        {/* Introduction / Swiss Grid Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full border-t border-white/20 pt-8">
          <p className="hero-sub text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed font-light">
             {t.hero.bio}
          </p>
          
          <div className="hero-sub hidden md:flex items-center gap-4 mt-8 md:mt-0">
             <span className="text-xs uppercase tracking-widest animate-pulse font-mono">{t.hero.scroll}</span>
             <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                <ArrowDownRight size={20} />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
