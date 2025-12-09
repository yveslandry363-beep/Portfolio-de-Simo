
import React, { useEffect, useState } from 'react';
import gsap from 'gsap';

const Konami: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      const newSequence = [...sequence, key];
      
      // Keep only the last N keys
      if (newSequence.length > konamiCode.length) {
        newSequence.shift();
      }
      
      setSequence(newSequence);

      if (newSequence.join('') === konamiCode.join('')) {
        activateGodMode();
        setSequence([]); // Reset
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  const activateGodMode = () => {
    // Visual Chaos / Matrix Mode
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    
    // Create a temporary overlay message
    const msg = document.createElement('div');
    msg.innerText = "GOD MODE ACTIVATED // SYSTEM OVERRIDE";
    msg.style.position = 'fixed';
    msg.style.top = '50%';
    msg.style.left = '50%';
    msg.style.transform = 'translate(-50%, -50%)';
    msg.style.color = '#00FF00';
    msg.style.fontFamily = 'monospace';
    msg.style.fontSize = '2rem';
    msg.style.fontWeight = 'bold';
    msg.style.zIndex = '99999';
    msg.style.background = 'black';
    msg.style.padding = '20px';
    msg.style.border = '2px solid #00FF00';
    document.body.appendChild(msg);

    gsap.fromTo(msg, { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(1.7)" });
    
    setTimeout(() => {
        gsap.to(msg, { scale: 0, opacity: 0, duration: 0.5, onComplete: () => msg.remove() });
        // Optional: Revert filter after some time or keep it
        // document.body.style.filter = ""; 
    }, 4000);
  };

  return null;
};

export default Konami;
