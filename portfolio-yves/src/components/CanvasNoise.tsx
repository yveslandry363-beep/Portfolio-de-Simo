import React from 'react';
import { useSettings } from '../context/SettingsContext';

const CanvasNoise: React.FC = () => {
  const { reduceMotion } = useSettings();

  if (reduceMotion) return null;

  return (
    <>
      <svg className="hidden">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
            numOctaves="3"
          />
        </filter>
      </svg>
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-[0.05] mix-blend-overlay"
        style={{
          filter: 'url(#noiseFilter)',
          // Simple shift animation to create "alive" feeling without heavy canvas ops
          // We use a small translate to shift the noise texture
          animation: 'noise-shift 0.2s infinite steps(1)',
        }}
      />
      <style>{`
        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
      `}</style>
    </>
  );
};

export default CanvasNoise;
