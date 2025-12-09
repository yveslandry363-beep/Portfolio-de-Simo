import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface LiquidTextProps {
    text: string;
    className?: string;
    distortionScale?: number;
    radius?: number;
}

const LiquidText: React.FC<LiquidTextProps> = ({
    text,
    className = "",
    distortionScale = 30, // Max pixels to move
    radius = 100 // Radius of influence
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Optimization: Only animate if mouse is close to container (optional but good for perf)
            // But for "liquid" feeling we often want it to react even if just nearby

            charsRef.current.forEach((char) => {
                if (!char) return;

                const charRect = char.getBoundingClientRect();
                const charCenterX = charRect.left + charRect.width / 2;
                const charCenterY = charRect.top + charRect.height / 2;

                const dx = mouseX - charCenterX;
                const dy = mouseY - charCenterY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < radius) {
                    const force = (radius - dist) / radius; // 0 to 1
                    // Ease the force for "liquid" feel
                    const easedForce = gsap.parseEase("power2.out")(force);

                    const moveX = -(dx / dist) * easedForce * distortionScale;
                    const moveY = -(dy / dist) * easedForce * distortionScale;

                    gsap.to(char, {
                        x: moveX,
                        y: moveY,
                        scale: 1 + easedForce * 0.5,
                        rotation: moveX * 0.5, // Slight tilt
                        color: typeof className === 'string' && className.includes('cyan') ? '#ffffff' : undefined, // Flash white if cyan
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                } else {
                    gsap.to(char, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        color: "inherit",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.3)",
                        overwrite: "auto"
                    });
                }
            });
        };

        const handleMouseLeave = () => {
            charsRef.current.forEach((char) => {
                if (char) {
                    gsap.to(char, {
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotation: 0,
                        color: "inherit",
                        duration: 0.6,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        // Clean up
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [text, distortionScale, radius, className]);

    return (
        <div ref={containerRef} className={`inline-block cursor-default select-none ${className}`}>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    ref={el => { if (el) charsRef.current[i] = el; }}
                    className="inline-block"
                    style={{ willChange: 'transform' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </div>
    );
};

export default LiquidText;
