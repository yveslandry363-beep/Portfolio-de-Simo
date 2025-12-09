
import React, { useState, useEffect, useRef } from 'react';
import { playHoverSound } from '../utils/audio';

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&";

const TextScramble: React.FC<TextScrambleProps> = ({ text, className, trigger = true }) => {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<any>(null);

  const scramble = () => {
    if (!trigger) return;
    
    let iteration = 0;
    clearInterval(intervalRef.current);
    
    playHoverSound();

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

  return (
    <span 
      className={className} 
      onMouseEnter={scramble}
    >
      {display}
    </span>
  );
};

export default TextScramble;
