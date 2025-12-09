
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, to, href, onClick, className = "", disabled = false }) => {
  const btnRef = useRef<HTMLElement>(null);
  
  // Magnetic Effect
  useEffect(() => {
    if(disabled) return;
    const btn = btnRef.current;
    if(!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        
        // Strength of magnet
        if (Math.abs(x) < rect.width / 2 + 20 && Math.abs(y) < rect.height / 2 + 20) {
            gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: "power2.out" });
        } else {
            gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
        }
    };
    
    const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled]);

  const content = (
      <div className="relative overflow-hidden px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm group hover:bg-white hover:text-black transition-colors duration-300">
          <div className="relative z-10 flex items-center justify-center gap-2 overflow-hidden">
              <span className="block transition-transform duration-500 group-hover:-translate-y-[150%] font-bold uppercase tracking-widest text-sm">
                  {children}
              </span>
              <span className="absolute top-0 block translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0 font-bold uppercase tracking-widest text-sm">
                  {children}
              </span>
          </div>
      </div>
  );

  const combinedClass = `inline-block relative z-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (to) {
      return <Link ref={btnRef as any} to={to} className={combinedClass} data-cursor="link">{content}</Link>;
  } else if (href) {
      return <a ref={btnRef as any} href={href} className={combinedClass} data-cursor="link">{content}</a>;
  } else {
      return <button ref={btnRef as any} onClick={onClick} disabled={disabled} className={combinedClass} data-cursor={disabled ? "" : "link"}>{content}</button>;
  }
};

export default Button;
