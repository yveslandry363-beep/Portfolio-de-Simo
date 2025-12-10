
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X, ArrowRight } from 'lucide-react';
import Portal from './Portal';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    links: { name: string; id: string }[];
    onNavClick: (e: React.MouseEvent, id: string) => void;
}

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
                    // Force cursor visibility
                    document.body.style.cursor = "auto";
                },
                onReverseComplete: () => {
                    gsap.set(containerRef.current, { pointerEvents: "none" });
                    document.body.style.cursor = "none"; // Restore custom cursor context
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
                <div className="flex justify-between items-center p-8 md:p-12 relative z-[10001]">
                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Navigation
                    </div>
                    <button
                        onClick={onClose}
                        className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform active:scale-95 cursor-pointer"
                        aria-label="Close Menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-center w-full">
                    <nav className="flex flex-col w-full">
                        {links.map((link, idx) => {
                            const isHovered = hoveredLink === link.id;

                            return (
                                <div
                                    key={idx}
                                    className={`menu-row relative w-full border-t border-white/10 overflow-hidden transition-all duration-500 cursor-pointer group ${isHovered ? 'bg-white text-black py-16' : 'bg-transparent text-white py-8'}`}
                                    onMouseEnter={() => setHoveredLink(link.id)}
                                    onMouseLeave={() => setHoveredLink(null)}
                                    onClick={(e) => onNavClick(e as any, link.id)}
                                >
                                    <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between relative z-10">

                                        {/* Center Text */}
                                        <div className={`text-6xl md:text-8xl font-['Syne'] font-black uppercase tracking-tighter transition-all duration-300 ${isHovered ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'}`}>
                                            {link.name}
                                        </div>

                                        {/* Index Number */}
                                        <span className={`text-sm font-mono absolute top-1/2 -translate-y-1/2 left-6 md:left-12 transition-colors duration-300 ${isHovered ? 'text-black' : 'text-gray-500'}`}>
                                            0{idx + 1}
                                        </span>

                                    </div>

                                    {/* Marquee Reveal on Hover */}
                                    <div className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : ''}`}>
                                        <div className="whitespace-nowrap flex animate-marquee">
                                            {Array(8).fill(link.name).map((text, i) => (
                                                <div key={i} className="flex items-center mx-8">
                                                    <span className="text-7xl md:text-9xl font-['Syne'] font-black uppercase text-black tracking-tighter">
                                                        {text}
                                                    </span>
                                                    <div className="w-16 h-16 ml-8 rounded-full bg-black overflow-hidden relative">
                                                        {/* Placeholder image or icon per section */}
                                                        {link.id === 'work' && <img src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=150" alt="" className="w-full h-full object-cover grayscale" />}
                                                        {link.id === 'philosophy' && <img src="https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&w=150" alt="" className="w-full h-full object-cover grayscale" />}
                                                        {link.id === 'footer' && <img src="https://images.pexels.com/photos/3394939/pexels-photo-3394939.jpeg?auto=compress&cs=tinysrgb&w=150" alt="" className="w-full h-full object-cover grayscale" />}
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

                <div className="p-8 md:p-12 flex justify-between items-end text-gray-500 font-mono text-sm uppercase tracking-widest relative z-[10001]">
                    <div>Germany &bull; Est. 2025</div>
                    <div className="hidden md:block">Yves-Landry S.Y.</div>
                </div>
            </div>

            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 10s linear infinite;
                }
            `}</style>
        </Portal>
    );
};

export default MenuOverlay;
