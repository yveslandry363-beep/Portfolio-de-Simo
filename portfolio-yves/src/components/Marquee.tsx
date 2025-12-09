import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface MarqueeProps {
  text: string;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ text, className = "", speed = 5, reverse = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    let xPercent = 0;
    let direction = reverse ? 1 : -1;

    // Create seamless loop
    const animation = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(textRef.current, { xPercent: xPercent });

      // Base speed
      let velocity = speed * direction;

      xPercent += velocity * 0.05; // Time delta adjustment
      requestAnimationFrame(animation);
    };

    const animId = requestAnimationFrame(animation);
    return () => cancelAnimationFrame(animId);

  }, { scope: containerRef, dependencies: [speed, reverse] });

  // Triple the text to ensure no gaps on wide screens
  const content = `${text}  •  ${text}  •  ${text}  •  ${text}  •  `;

  return (
    <div ref={containerRef} className={`relative overflow-hidden whitespace-nowrap py-4 ${className}`}>
      <div ref={textRef} className="will-change-transform inline-block">
        <span className="text-8xl md:text-[12rem] font-bold font-['Syne'] uppercase tracking-tighter opacity-10 text-transparent stroke-black dark:stroke-white stroke-2" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)' }}>
          {content}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
