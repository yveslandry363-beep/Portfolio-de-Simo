```
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';
import Portal from './Portal';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    links: { name: string; id: string }[];
    onNavClick: (e: React.MouseEvent, id: string) => void;
}

// Curated High-End Imagery
const IMAGES = {
    work: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop", // Abstract Fluid Oil
    philosophy: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=2668&auto=format&fit=crop", // Abstract Statue/Human
    footer: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" // Cyberpunk/Tech
};

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, links, onNavClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    useGSAP(() => {
        gsap.set(containerRef.current, { 
            clipPath: "inset(100% 0% 0% 0%)",
            pointerEvents: "none"
        });

        tl.current = gsap.timeline({ paused: true })
            .to(containerRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 0.8,
                ease: "power4.inOut",
                onStart: () => {
                    gsap.set(containerRef.current, { pointerEvents: "all" });
                    document.body.style.cursor = "auto";
                },
                onReverseComplete: () => {
                    gsap.set(containerRef.current, { pointerEvents: "none" });
                    document.body.style.cursor = "none";
                }
            })
            .from(".menu-row", {
                y: 100,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }, "-=0.4");

    }, { scope: containerRef });

    useEffect(() => {
        if (isOpen) {
            tl.current?.play();
        } else {
            tl.current?.reverse();
        }
    }, [isOpen]);

    return (
        <Portal>
            <div
                ref={containerRef}
                className="fixed inset-0 z-[9999] bg-[#050505] text-white cursor-auto flex flex-col"
            >
                {/* CLOSE BUTTON - ABSOLUTELY POSITIONED & HIGH Z-INDEX */}
                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 md:top-12 md:right-12 p-6 bg-white text-black rounded-full z-[10002] cursor-pointer hover:scale-110 active:scale-90 transition-transform shadow-2xl hover:bg-gray-200 group"
                    aria-label="Close Menu"
                    style={{ pointerEvents: 'auto' }} // FORCE CLICKABILITY
                >
                    <X size={28} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>

                <div className="absolute top-12 left-12 text-xs font-mono text-gray-500 uppercase tracking-widest z-[10001]">
                    Navigation
                </div>

                <div className="flex-1 flex flex-col justify-center w-full relative z-[10000]">
                    <nav className="flex flex-col w-full">
                        {links.map((link, idx) => {
                            const isHovered = hoveredLink === link.id;
                            const image = IMAGES[link.id as keyof typeof IMAGES] || IMAGES.work;
                            
                            return (
                                <div 
                                    key={idx}
                                    className={`menu - row relative w - full border - t border - white / 10 overflow - hidden transition - all duration - 700 ease -in -out cursor - pointer group ${ isHovered ? 'bg-white text-black py-24 md:py-32' : 'bg-transparent text-white py-8 md:py-10' } `}
                                    onMouseEnter={() => setHoveredLink(link.id)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    onClick={(e) => onNavClick(e as any, link.id)}
                                >
                                    <div className="max-w-[90vw] mx-auto px-6 w-full flex items-center justify-between relative z-10 pointer-events-none">
                                        
                                        {/* Center Text */}
                                        <div className={`text - 6xl md: text - 9xl font - ['Syne'] font - black uppercase tracking - tighter transition - all duration - 500 ${ isHovered ? 'opacity-0 translate-y-[-50px]' : 'opacity-100 translate-y-0' } `}>
                                            {link.name}
                                        </div>

                                        {/* Index Number */}
                                        <span className={`text - sm md: text - base font - mono absolute top - 1 / 2 - translate - y - 1 / 2 left - 0 md: left - 12 transition - colors duration - 300 ${ isHovered ? 'text-black opacity-0' : 'text-gray-500 opacity-100' } `}>
                                            0{idx + 1}
                                        </span>

                                    </div>

                                    {/* AAA Marquee Reveal */}
                                    <div className={`absolute inset - 0 flex items - center justify - center opacity - 0 transition - opacity duration - 500 pointer - events - none ${ isHovered ? 'opacity-100' : '' } `}>
                                        <div className="whitespace-nowrap flex animate-marquee">
                                            {Array(8).fill(link.name).map((text, i) => (
                                                <div key={i} className="flex items-center mx-12">
                                                    <span className="text-8xl md:text-[10rem] font-['Syne'] font-black uppercase text-transparent stroke-black tracking-tighter" style={{ WebkitTextStroke: '2px black' }}>
                                                        {text}
                                                    </span>
                                                    <div className="w-24 h-24 md:w-32 md:h-32 ml-12 rounded-full overflow-hidden relative border-2 border-black">
                                                        <img src={image} alt="" className="w-full h-full object-cover scale-125 group-hover:scale-100 transition-transform duration-[2s] ease-out"/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="w-full border-t border-white/10"></div>
                    </nav>
                </div>

                <div className="p-12 flex justify-between items-end text-gray-500 font-mono text-sm uppercase tracking-widest relative z-[10001]">
                    <div>Germany &bull; Est. 2025</div>
                    <div className="hidden md:block">Yves-Landry S.Y.</div>
                </div>
            </div>
            
            <style>{`
@keyframes marquee {
    0 % { transform: translateX(0); }
    100 % { transform: translateX(-20 %); }
}
                .animate - marquee {
    animation: marquee 8s linear infinite;
}
`}</style>
        </Portal>
    );
};

export default MenuOverlay;
```
