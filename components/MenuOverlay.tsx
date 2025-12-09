
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  links: { name: string; id: string }[];
  onNavClick: (e: React.MouseEvent, id: string) => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, links, onNavClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(containerRef.current, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut"
    })
    .from(".menu-link", {
        y: 100,
        opacity: 0,
        rotate: 5,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from(".menu-decor", {
        opacity: 0,
        duration: 1
    }, "-=0.6");

    if (isOpen) {
        // Enable pointer events when open
        gsap.set(containerRef.current, { pointerEvents: "all" });
        tl.play();
    } else {
        tl.reverse().then(() => {
             // Disable pointer events when closed to avoid blocking site
             gsap.set(containerRef.current, { pointerEvents: "none" });
        });
    }

  }, { dependencies: [isOpen] });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] bg-[#050505] text-white pointer-events-none"
      style={{ clipPath: "inset(100% 0% 0% 0%)" }}
    >
        {/* Background Decor */}
        <div className="menu-decor absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border border-white/20 rounded-full animate-spin-slow"></div>
             <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/10"></div>
             <div className="absolute top-0 right-[20%] w-[1px] h-full bg-white/10"></div>
        </div>

        <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-4 hover:scale-110 transition-transform bg-white text-black rounded-full z-50 pointer-events-auto"
            data-cursor="link"
        >
            <X size={24} />
        </button>

        <div className="h-full flex flex-col justify-center items-center relative z-10">
            <nav className="flex flex-col gap-4 items-center">
                {links.map((link, idx) => (
                    <a 
                        key={idx}
                        href={`#${link.id}`}
                        onClick={(e) => onNavClick(e, link.id)}
                        className="menu-link group relative text-5xl md:text-8xl font-['Syne'] font-bold uppercase tracking-tighter hover:text-blue-500 transition-colors cursor-pointer pointer-events-auto"
                        data-cursor="view"
                    >
                        <span className="absolute -left-12 top-1/2 -translate-y-1/2 text-sm font-mono text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                        {link.name}
                    </a>
                ))}
            </nav>
        </div>
        
        <div className="menu-decor absolute bottom-12 w-full text-center text-gray-500 font-mono text-sm uppercase tracking-widest">
            Germany &bull; Est. 2025
        </div>
    </div>
  );
};

export default MenuOverlay;
