import React, { useRef, useEffect } from 'react';
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

const MenuOverlay: React.FC<MenuOverlayProps> = ({ isOpen, onClose, links, onNavClick }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        gsap.set(containerRef.current, {
            clipPath: "inset(0% 0% 100% 0%)",
            pointerEvents: "none",
            autoAlpha: 0
        });

        tl.current = gsap.timeline({ paused: true })
            .to(containerRef.current, {
                clipPath: "inset(0% 0% 0% 0%)",
                autoAlpha: 1,
                duration: 0.8,
                ease: "power4.inOut",
                onStart: () => {
                    if (containerRef.current) containerRef.current.style.pointerEvents = "all";
                    document.body.style.cursor = "auto";
                },
                onReverseComplete: () => {
                    if (containerRef.current) containerRef.current.style.pointerEvents = "none";
                    document.body.style.cursor = "none";
                }
            })
            .from(".menu-link-item", {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.5");

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
                className="fixed inset-0 z-[10000] bg-black text-white flex flex-col justify-center items-center overflow-hidden"
            >
                {/* CLOSE BUTTON - Fixed to Viewport, ensuring it's always on top */}
                <button
                    onClick={onClose}
                    className="fixed top-8 right-8 z-[10001] p-4 bg-white text-black rounded-full hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                    aria-label="Close Menu"
                >
                    <X size={32} />
                </button>

                <nav className="flex flex-col items-center gap-8 md:gap-12">
                    {links.map((link, idx) => (
                        <div
                            key={idx}
                            className="menu-link-item overflow-hidden cursor-pointer"
                            onClick={(e) => onNavClick(e, link.id)}
                        >
                            <span
                                className="block text-5xl md:text-8xl font-black uppercase tracking-tighter hover:text-cyan-400 transition-colors duration-300 font-['Syne']"
                            >
                                {link.name}
                            </span>
                        </div>
                    ))}
                </nav>

                <div className="absolute bottom-12 w-full text-center text-gray-500 font-mono text-xs uppercase tracking-widest">
                    Based in Germany &bull; {new Date().getFullYear()}
                </div>
            </div>
        </Portal>
    );
};

export default MenuOverlay;
