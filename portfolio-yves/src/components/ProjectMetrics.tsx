
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Metric {
    value: string;
    label: string;
}

const ProjectMetrics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mock data - In a real app, pass via props
  const metrics: Metric[] = [
      { value: "40%", label: "Performance Boost" },
      { value: "2.5s", label: "Load Time" },
      { value: "10k+", label: "Active Users" },
      { value: "99.9%", label: "Uptime" }
  ];

  useGSAP(() => {
      gsap.from(".metric-item", {
          scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
      });
      
      // Counter animation logic could go here for the numbers
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-white/10 my-12 bg-white/5 backdrop-blur-sm rounded-2xl">
        {metrics.map((m, i) => (
            <div key={i} className="metric-item text-center">
                <div className="text-3xl md:text-5xl font-['Syne'] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-400 mb-2">
                    {m.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    {m.label}
                </div>
            </div>
        ))}
    </div>
  );
};

export default ProjectMetrics;
