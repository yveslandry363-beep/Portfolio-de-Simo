
import React, { useRef, useEffect } from 'react';

const Sphere: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 300;
    let height = 300;
    canvas.width = width;
    canvas.height = height;

    let rotation = 0;
    const dots: {x: number, y: number, z: number}[] = [];
    const numDots = 400;
    const radius = 100;

    // Fibonacci Sphere distribution
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numDots; i++) {
        const y = 1 - (i / (numDots - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        dots.push({ x: x * radius, y: y * radius, z: z * radius });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      
      rotation += 0.005;

      dots.forEach(dot => {
         // Rotate Y
         const x1 = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
         const z1 = dot.z * Math.cos(rotation) + dot.x * Math.sin(rotation);
         
         // Project
         const scale = 300 / (300 + z1);
         const x2d = x1 * scale + width / 2;
         const y2d = dot.y * scale + height / 2;
         
         const size = Math.max(0.5, scale * 1.5);
         const alpha = scale - 0.5;

         ctx.globalAlpha = alpha;
         ctx.beginPath();
         ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
         ctx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }, []);

  return <canvas ref={canvasRef} className="w-[300px] h-[300px] mix-blend-screen" />;
};

export default Sphere;
