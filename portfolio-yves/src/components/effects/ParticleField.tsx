import React, { useRef, useEffect } from 'react';

interface ParticleFieldProps {
    mode?: 'stars' | 'network' | 'dust' | 'matrix';
    count?: number;
    speed?: number;
    color?: string;
    opacity?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({
    mode = 'stars',
    count = 100,
    speed = 1,
    color = '#ffffff',
    opacity = 0.5
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let animationFrame: number;

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            char?: string; // For matrix mode
        }

        const particles: Particle[] = [];

        // Init Particles
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed * (mode === 'stars' ? 5 : 1),
                vy: (Math.random() - 0.5) * speed * (mode === 'stars' ? 5 : 1),
                size: Math.random() * (mode === 'stars' ? 2 : 3),
                char: mode === 'matrix' ? String.fromCharCode(0x30A0 + Math.random() * 96) : undefined
            });
        }

        // Loop
        const render = () => {
            ctx.clearRect(0, 0, width, height);

            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;

            // Network lines
            if (mode === 'network') {
                ctx.lineWidth = 0.5;
                ctx.strokeStyle = color;
                for (let i = 0; i < count; i++) {
                    for (let j = i + 1; j < count; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.globalAlpha = (100 - dist) / 100 * opacity * 0.5;
                            ctx.stroke();
                        }
                    }
                }
            }

            ctx.globalAlpha = opacity;

            particles.forEach((p, i) => {
                // Update
                if (mode === 'matrix') {
                    p.y += (p.size * speed * 2);
                    if (p.y > height) p.y = 0;
                } else if (mode === 'stars') {
                    // Warp speed effect option: move from center
                    // Simple drift for now
                    p.x += p.vx;
                    p.y += p.vy;
                } else {
                    p.x += p.vx;
                    p.y += p.vy;
                }

                // Boundary Wrap
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Draw
                if (mode === 'matrix') {
                    ctx.font = `${p.size + 10}px monospace`;
                    ctx.fillText(p.char || '0', p.x, p.y);
                    if (Math.random() > 0.95) p.char = String.fromCharCode(0x30A0 + Math.random() * 96);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            animationFrame = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', handleResize);
        };

    }, [mode, count, speed, color, opacity]);

    return (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    );
};

export default ParticleField;
