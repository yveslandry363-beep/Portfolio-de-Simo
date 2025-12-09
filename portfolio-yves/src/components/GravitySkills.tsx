
import React, { useRef, useEffect } from 'react';

// Simple Physics Engine Implementation since we can't import Matter.js easily without npm
// Using Canvas API for performance

const GravitySkills: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.offsetWidth || window.innerWidth;
    let height = 400;
    canvas.width = width;
    canvas.height = height;

    const skills = [
      "JavaScript", "Python", "React", "SQL", "Math", 
      "WebGL", "Node.js", "AI/ML", "Data", "Optimization",
      "Git", "Docker", "Three.js", "Physics", "Canvas"
    ];

    interface Ball {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      text: string;
      color: string;
      isDragging: boolean;
    }

    const balls: Ball[] = [];
    const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ffffff"];

    // Initialize Balls
    skills.forEach((skill, i) => {
        balls.push({
            x: Math.random() * width,
            y: Math.random() * -500, // Start above screen
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 5,
            radius: 30 + Math.random() * 20,
            text: skill,
            color: colors[i % colors.length],
            isDragging: false
        });
    });

    // Interaction vars
    let mouseX = 0;
    let mouseY = 0;
    let draggedBall: Ball | null = null;
    const gravity = 0.4;
    const friction = 0.9;
    const bounce = 0.7;

    const update = () => {
        ctx.clearRect(0, 0, width, height);

        balls.forEach(ball => {
            if (!ball.isDragging) {
                ball.vy += gravity;
                ball.x += ball.vx;
                ball.y += ball.vy;

                // Wall collisions
                if (ball.x + ball.radius > width) {
                    ball.x = width - ball.radius;
                    ball.vx *= -bounce;
                } else if (ball.x - ball.radius < 0) {
                    ball.x = ball.radius;
                    ball.vx *= -bounce;
                }

                // Floor collision
                if (ball.y + ball.radius > height) {
                    ball.y = height - ball.radius;
                    ball.vy *= -bounce;
                    ball.vx *= friction;
                }
            } else {
                // Dragging physics
                ball.vx = (mouseX - ball.x) * 0.2;
                ball.vy = (mouseY - ball.y) * 0.2;
                ball.x = mouseX;
                ball.y = mouseY;
            }

            // Ball to Ball collision (Simplified)
            balls.forEach(other => {
                if (ball === other) return;
                const dx = other.x - ball.x;
                const dy = other.y - ball.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const minDist = ball.radius + other.radius;

                if (dist < minDist) {
                    const angle = Math.atan2(dy, dx);
                    const tx = ball.x + Math.cos(angle) * minDist;
                    const ty = ball.y + Math.sin(angle) * minDist;
                    const ax = (tx - other.x) * 0.1; // Spring force
                    const ay = (ty - other.y) * 0.1;
                    
                    ball.vx -= ax;
                    ball.vy -= ay;
                    other.vx += ax;
                    other.vy += ay;
                }
            });

            // Draw
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.strokeStyle = ball.color;
            ctx.lineWidth = 2;
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Syne';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ball.text, ball.x, ball.y);
        });

        requestAnimationFrame(update);
    };

    update();

    // Mouse Events
    const handleMouseDown = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        balls.forEach(ball => {
            const dx = mouseX - ball.x;
            const dy = mouseY - ball.y;
            if (Math.sqrt(dx*dx + dy*dy) < ball.radius) {
                draggedBall = ball;
                ball.isDragging = true;
            }
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };

    const handleMouseUp = () => {
        if (draggedBall) {
            draggedBall.isDragging = false;
            draggedBall.vx = (Math.random() - 0.5) * 20; // Throw effect
            draggedBall.vy = (Math.random() - 0.5) * 20;
            draggedBall = null;
        }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Resize handler
    const handleResize = () => {
        width = canvas.parentElement?.offsetWidth || window.innerWidth;
        canvas.width = width;
    }
    window.addEventListener('resize', handleResize);

    return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-[400px] quantum-glass rounded-3xl overflow-hidden relative cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="block" />
        <div className="absolute top-4 left-4 text-xs font-mono text-gray-500 pointer-events-none">
            PHYSICS_ENGINE.JS // DRAG TO INTERACT
        </div>
    </div>
  );
};

export default GravitySkills;
