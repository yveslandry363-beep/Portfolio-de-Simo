
import React, { useEffect, useState } from 'react';
import { triggerHaptic, Patterns } from '../utils/haptics';
import DevDashboard from './DevDashboard';

const Konami: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
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
        setIsDashboardOpen(true);
        triggerHaptic(Patterns.Success);
        setSequence([]); // Reset
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);

  return <DevDashboard isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} />;
};

export default Konami;
