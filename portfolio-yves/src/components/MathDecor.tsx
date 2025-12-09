
import React from 'react';

const MathDecor: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-overlay opacity-20">
      {/* Vertical Grid Lines */}
      <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-white/20"></div>
      <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/10"></div>
      <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-white/20"></div>

      {/* Floating Formulas / Numbers */}
      <div className="absolute top-[20%] left-[5%] font-mono text-xs text-blue-300 rotate-90 origin-left">
        ∫ e^x dx = e^x + C
      </div>
      <div className="absolute bottom-[15%] right-[5%] font-mono text-xs text-blue-300 -rotate-90 origin-right">
        ∑ n=1 to ∞ (1/n^2) = π^2/6
      </div>
      
      {/* Decorative Crosshairs */}
      <div className="absolute top-12 left-12 w-4 h-4 border-l border-t border-white/40"></div>
      <div className="absolute top-12 right-12 w-4 h-4 border-r border-t border-white/40"></div>
      <div className="absolute bottom-12 left-12 w-4 h-4 border-l border-b border-white/40"></div>
      <div className="absolute bottom-12 right-12 w-4 h-4 border-r border-b border-white/40"></div>
    </div>
  );
};

export default MathDecor;
