
import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import TechLogos from './TechLogos';
import Timeline from './Timeline';
import GravitySkills from './GravitySkills';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const languages = [
    "German", "French", "English", "Spanish"
  ];

  useGSAP(() => {
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-40 px-6 md:px-12 text-white relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
            <div className="quantum-glass p-8 md:p-12 rounded-3xl h-fit">
              <h2 className="text-4xl md:text-6xl font-['Syne'] font-bold mb-8 leading-tight about-text drop-shadow-lg">
                {t.about.title} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">{t.about.thinker}</span>.
              </h2>
              <div className="about-text space-y-6 text-gray-300 text-lg leading-relaxed max-w-lg">
                <p>{t.about.bio1}</p>
                <p>{t.about.bio2}</p>
              </div>
              
              <TechLogos />
            </div>

            <div className="flex flex-col">
                {/* Replaced static list with Gravity Physics */}
                <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-gray-400">{t.about.skills}</h3>
                <div className="mb-12">
                    <GravitySkills />
                </div>

                <h3 className="text-2xl font-bold mb-8 uppercase tracking-widest text-gray-400">{t.about.languages}</h3>
                <div className="services-list grid grid-cols-2 gap-4">
                     {languages.map((lang, index) => (
                        <div key={index} className="service-item quantum-glass flex items-center justify-center p-4 rounded-lg hover:border-blue-400/50 transition-colors">
                            <span className="font-medium text-lg font-['Syne']">{lang}</span>
                        </div>
                    ))}
                </div>

                 {/* Stat block */}
                 <div className="mt-12 grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
                    <div className="text-center md:text-left">
                        <div className="text-6xl font-['Syne'] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">2+</div>
                        <div className="text-sm text-blue-200 uppercase mt-2 tracking-widest">{t.about.yearsExp}</div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="text-6xl font-['Syne'] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">4</div>
                        <div className="text-sm text-blue-200 uppercase mt-2 tracking-widest">{t.about.langSpoken}</div>
                    </div>
                 </div>
            </div>
        </div>

        {/* Timeline Section */}
        <div className="border-t border-white/10 pt-24">
            <h3 className="text-center text-4xl font-['Syne'] font-bold mb-16 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                The Journey
            </h3>
            <Timeline />
        </div>

      </div>
    </section>
  );
};

export default About;
