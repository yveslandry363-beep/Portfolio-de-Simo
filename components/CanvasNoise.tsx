
import React, { useRef, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

const CanvasNoise: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { reduceMotion } = useSettings();

  useEffect(() => {
    if (reduceMotion) return; // Disable noise animation for reduced motion

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    window.addEventListener('resize', resize);
    resize();

    const loop = () => {
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.1) { // 10% of pixels usually enough for grain
           // ABGR order for 32-bit writes
           // Alpha = 255 (full opaque noise pixel, but we use CSS opacity)
           // Grey value
           const val = Math.random() * 255;
           buffer32[i] = 0xff000000 | (val << 16) | (val << 8) | val;
        }
      }

      ctx.putImageData(idata, 0, 0);
      requestAnimationFrame(loop);
    };

    const frameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-[50] mix-blend-overlay opacity-[0.04]"
    />
  );
};

export default CanvasNoise;
