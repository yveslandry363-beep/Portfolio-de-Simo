
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TimelineItem {
    year: string;
    title: string;
    role: string;
    description: string;
    type: 'edu' | 'work';
}

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  // Data merged from experience and education for a chronological view
  const timelineData: TimelineItem[] = [
      { year: "2025", title: "RPTU Kaiserslautern", role: "Mathematics Student", description: "Specializing in Optimization and Algorithms.", type: 'edu' },
      { year: "Current", title: "Psb Intralogistics", role: "Assistant Engineer", description: "Automation and Logic Control systems.", type: 'work' },
      { year: "2024", title: "Lern-Academy", role: "Tutor", description: "Teaching Math & Physics.", type: 'work' },
      { year: "2023", title: "DCON GmbH", role: "Data Analyst", description: "SQL & Python Automation.", type: 'work' },
      { year: "2022", title: "BMW", role: "Software Engineer", description: "Python & JS Development.", type: 'work' },
      { year: "2021", title: "Univ. Douala", role: "B.Sc. Physics", description: "Fundamental Science Degree.", type: 'edu' },
  ];

  useGSAP(() => {
    // Draw the line
    gsap.fromTo(lineRef.current, 
        { scaleY: 0, transformOrigin: "top" },
        { 
            scaleY: 1, 
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom 60%",
                scrub: 1
            }
        }
    );

    // Animate items
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item: any) => {
        gsap.from(item, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative py-12 pl-8 md:pl-0">
        {/* Central Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 hidden md:block"></div>
        <div ref={lineRef} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-blue-500 hidden md:block origin-top"></div>
        
        {/* Mobile Line */}
        <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-white/10 md:hidden"></div>

        <div className="space-y-12">
            {timelineData.map((item, index) => (
                <div key={index} className={`timeline-item flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* Content Side */}
                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12 mb-4 md:mb-0">
                        <div className={`p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-blue-400/30 transition-colors ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                            <span className="text-blue-400 font-mono text-xs mb-2 block">{item.year}</span>
                            <h4 className="text-xl font-bold font-['Syne']">{item.title}</h4>
                            <p className="text-white/70 font-medium mb-2">{item.role}</p>
                            <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                        </div>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(0,0,0,1)]">
                        {item.type === 'edu' ? <GraduationCap size={16} className="text-gray-400" /> : <Briefcase size={16} className="text-blue-400" />}
                    </div>

                    {/* Empty Side for alignment */}
                    <div className="hidden md:block w-1/2"></div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Timeline;
