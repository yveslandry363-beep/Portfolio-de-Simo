import React, { useState, useEffect, useRef } from 'react';
import { playHoverSound } from '../utils/audio';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
  autoStart?: boolean;
}

// Extended Sci-Fi Charset: Katakana, Greek, Math, Standard
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&ΞΠΣΩΨΔΓΛΘアエイオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

const TextScramble: React.FC<TextScrambleProps> = ({ text, className, trigger = true, autoStart = false }) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<any>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const scramble = () => {
    if (!trigger) return;

    let iteration = 0;
    clearInterval(intervalRef.current);

    // Only play sound if user initiated (hover), generic auto-scramble shouldn't spam audio
    if (!autoStart) playHoverSound();

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useGSAP(() => {
    if (autoStart && !hasAnimated.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 85%",
        onEnter: () => {
          scramble();
          hasAnimated.current = true;
        }
      });
    }
  }, { scope: containerRef, dependencies: [autoStart] });

  return (
    <span
      ref={containerRef}
      className={`${className} inline-block`}
      onMouseEnter={scramble}
    >
      {display}
    </span>
  );
};

export default TextScramble;
