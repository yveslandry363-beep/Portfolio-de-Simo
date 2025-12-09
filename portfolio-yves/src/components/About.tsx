
import React, { useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import TechLogos from './TechLogos';
import Timeline from './Timeline';
import GravitySkills from './GravitySkills';
import TextScramble from './TextScramble';

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
    <section id="philosophy" ref={containerRef} className="py-12 md:py-24 px-6 md:px-12 text-white relative z-10">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <div className="flex flex-col gap-12">

            {/* Portrait & Bio Block */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="relative w-full md:w-48 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-blue-500 mix-blend-color opacity-0 group-hover:opacity-40 transition-opacity duration-500 z-10"></div>
                <img
                  src="/portrait.jpg"
                  alt="Yves-Landry S.Y."
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-4xl md:text-6xl font-['Syne'] font-bold mb-6 leading-tight about-text drop-shadow-lg">
                  The Philosophy <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Of Creation</span>.
                </h2>
                <div className="about-text space-y-4 text-gray-300 text-base md:text-lg leading-relaxed font-light">
                  <p>
                    I am <strong className="text-white">Yves-Landry</strong>, a Creative Technologist and Data Scientist obsessed with the intersection of logic and emotion.
                  </p>
                  <p>
                    My work is not just about writing code; it's about <strong className="text-white">simulating reality</strong>. I bridge the gap between rigorous backend architecture and immersive frontend experiences.
                    From optimizing financial algorithms to crafting fluid WebGL interactions, I build digital ecosystems that don't just function—they <span className="text-blue-400">feel</span>.
                  </p>
                  <p className="text-sm border-l-2 border-purple-500 pl-4 italic text-gray-400 mt-4">
                    "react, adapt, and remember."
                  </p>
                </div>
              </div>
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
