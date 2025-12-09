
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
        trigger: containerRef.current, // Use ref instead of selector string
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
    <footer id="footer" ref={containerRef} className="footer-section bg-[#0c0c0c] pt-24 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden relative">
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-50 hidden lg:block">
          <Sphere />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[6vh] relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="footer-title text-[8vw] lg:text-[6vw] leading-[0.9] font-bold font-['Syne'] uppercase tracking-tighter mix-blend-overlay">
                <span className="block"><TextScramble text={t.footer.lets} /></span>
                <span className="block text-gray-600"><TextScramble text={t.footer.build} /></span>
                <span className="block"><TextScramble text={t.footer.together} /></span>
              </h2>
            </div>
            
            <div>
                <TerminalContact />
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mt-20 gap-8">
            <div className="flex flex-col gap-3">
                <span className="text-gray-500 uppercase text-xs tracking-widest mb-2">{t.footer.details}</span>
                
                <button 
                    onClick={handleCopyEmail}
                    className="flex items-center gap-2 text-xl hover:text-blue-400 transition-colors group text-left"
                    data-cursor="link"
                >
                  <Mail size={18} /> 
                  <span className="group-hover:underline">yveslandry363@gmail.com</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                  </span>
                </button>
                
                <span className="flex items-center gap-2 text-lg text-gray-300">
                  <Phone size={18} /> +49 179 3996576
                </span>
                
                <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-2 text-gray-500 text-sm">
                        <MapPin size={16} /> Germany
                    </span>
                    <LiveTime />
                </div>
            </div>
            
            <div className="text-gray-600 text-sm">
                &copy; 2025 Yves-Landry Simo Yomgni. {t.footer.rights}
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
