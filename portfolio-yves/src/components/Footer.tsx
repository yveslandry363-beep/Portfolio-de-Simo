
import React, { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../context/LanguageContext';
import Sphere from './Sphere';
import TextScramble from './TextScramble';
import TerminalContact from './TerminalContact';
import LiveTime from './LiveTime';

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useGSAP(() => {
    gsap.from(".footer-title span", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out"
    });
  }, { scope: containerRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("yveslandry363@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="footer" ref={containerRef} className="footer-section bg-[#050505] pt-32 pb-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-30 hidden lg:block">
        <Sphere />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh] relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: Huge Typography */}
          <div className="lg:col-span-7">
            <h2 className="footer-title text-[12vw] lg:text-[7vw] leading-[0.85] font-black font-['Syne'] uppercase tracking-tight text-white mix-blend-normal">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400"><TextScramble text={t.footer.lets} /></span>
              <span className="block text-gray-700 ml-4 lg:ml-12"><TextScramble text={t.footer.build} /></span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"><TextScramble text={t.footer.together} /></span>
            </h2>
          </div>

          {/* Right: Floating Terminal */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 transform lg:rotate-[-5deg] lg:translate-y-8 hover:translate-y-0 hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] drop-shadow-2xl">
              <TerminalContact />
            </div>
            {/* Decorative Elements behind Terminal */}
            <div className="absolute -inset-4 border border-white/5 rounded-xl z-0 -rotate-3 hidden lg:block"></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-32 border-t border-white/5 pt-12">
          <div className="flex flex-col gap-4">
            <span className="text-blue-500 uppercase text-[10px] font-bold tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {t.footer.details}
            </span>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-3 text-2xl lg:text-3xl font-['Syne'] font-bold text-white hover:text-blue-400 transition-colors group text-left"
              data-cursor="link"
            >
              <span className="group-hover:underline decoration-blue-500/50 underline-offset-4 decoration-2">yveslandry363@gmail.com</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
              </span>
            </button>

            <span className="flex items-center gap-3 text-lg text-gray-400 font-mono">
              <Phone size={16} className="text-blue-500" />
              <span className="tracking-wider">+49 179 3996576</span>
            </span>

            <div className="flex items-center gap-6 mt-4 opacity-60 hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
                <MapPin size={12} /> Germany
              </span>
              <div className="h-3 w-[1px] bg-white/20"></div>
              <LiveTime />
            </div>
          </div>

          <div className="text-gray-600 text-xs font-mono mt-8 md:mt-0 max-w-md text-right">
            <p>&copy; 2025 Yves-Landry S.Y. // <span className="text-gray-500">All Systems Operational</span></p>
            <p className="mt-1 opacity-50">{t.footer.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
