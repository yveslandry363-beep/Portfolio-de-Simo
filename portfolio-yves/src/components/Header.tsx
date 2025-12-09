
import React, { useRef, useEffect, useState } from 'react';
import { Menu, Download, Volume2, VolumeX, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../data/translations';
import { useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { toggleAmbientSound } from '../utils/audio';
import { triggerHaptic, Patterns } from '../utils/haptics';
import SettingsModal from './SettingsModal';
import AudioVisualizer from './AudioVisualizer';
import MagneticButton from './MagneticButton';

interface HeaderProps {
  onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = (lang: Language) => {
    triggerHaptic(Patterns.Click);
    setLanguage(lang);
  };

  const toggleSound = () => {
    triggerHaptic(Patterns.Click);
    const newState = !isSoundOn;
    setIsSoundOn(newState);
    toggleAmbientSound(newState);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerHaptic(Patterns.Click);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'root' } });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Magnetic Button Logic
  const magneticBtnRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const btn = magneticBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      if (Math.abs(x) < 50 && Math.abs(y) < 50) {
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        // Subtle haptic on enter magnet zone
        triggerHaptic(Patterns.Hover);
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 mix-blend-difference text-white pointer-events-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto pointer-events-auto">
          <a href="#" onClick={handleLogoClick} className="text-xl font-bold tracking-tighter uppercase font-['Syne'] relative z-50">
            Yves-Landry <span className="text-xs opacity-50 ml-1">S.Y.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">

            {/* Audio Visualizer */}
            <AudioVisualizer isActive={isSoundOn} />

            {/* Sound Toggle */}
            <MagneticButton
              onClick={toggleSound}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              data-cursor="link"
            >
              {isSoundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </MagneticButton>

            {/* Settings Toggle */}
            <MagneticButton
              onClick={() => { triggerHaptic(Patterns.Click); setIsSettingsOpen(true); }}
              className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              data-cursor="link"
            >
              <Settings size={16} />
            </MagneticButton>

            {/* Language Switcher */}
            <div className="flex items-center space-x-3 text-sm font-bold border-l border-white/30 pl-8">
              <button onClick={() => toggleLanguage('en')} className={`${language === 'en' ? 'text-white' : 'text-gray-500 hover:text-white'} transition-colors`} data-cursor="link">EN</button>
              <button onClick={() => toggleLanguage('fr')} className={`${language === 'fr' ? 'text-white' : 'text-gray-500 hover:text-white'} transition-colors`} data-cursor="link">FR</button>
              <button onClick={() => toggleLanguage('de')} className={`${language === 'de' ? 'text-white' : 'text-gray-500 hover:text-white'} transition-colors`} data-cursor="link">DE</button>
            </div>

            {/* Menu Trigger */}
            <MagneticButton
              onClick={() => { triggerHaptic(Patterns.Click); onMenuOpen(); }}
              className="flex items-center gap-2 text-sm font-medium hover:text-gray-300 uppercase tracking-widest group px-2 py-1"
              data-cursor="link"
            >
              <div className="w-8 h-[1px] bg-white group-hover:w-12 transition-all"></div>
              Menu
            </MagneticButton>

            {/* Download CV Button - Magnetic */}
            <div className="ml-4">
              <MagneticButton
                as="a"
                href="/cv.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                data-cursor="link"
                onClick={() => triggerHaptic(Patterns.Success)}
              >
                <Download size={14} />
                {t.nav.downloadCv}
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 relative p-2 pointer-events-auto"
            onClick={() => { triggerHaptic(Patterns.Click); onMenuOpen(); }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default Header;
