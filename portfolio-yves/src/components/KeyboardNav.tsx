
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const KeyboardNav: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Only active on home page
        if (pathname === '/') {
            const sections = ['root', 'work', 'about', 'footer'];
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                // Find current visible section and scroll to next
                const currentScroll = window.scrollY;
                let nextSection = '';
                
                for(const id of sections) {
                    const el = document.getElementById(id);
                    if(el && el.offsetTop > currentScroll + 100) {
                        nextSection = id;
                        break;
                    }
                }
                
                if (nextSection) {
                    document.getElementById(nextSection)?.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const currentScroll = window.scrollY;
                let prevSection = '';
                
                for(let i = sections.length - 1; i >= 0; i--) {
                    const id = sections[i];
                    const el = document.getElementById(id);
                    if(el && el.offsetTop < currentScroll - 100) {
                        prevSection = id;
                        break;
                    }
                }

                if (prevSection || currentScroll > 0) {
                    if (prevSection) document.getElementById(prevSection)?.scrollIntoView({ behavior: 'smooth' });
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pathname]);

  return null;
};

export default KeyboardNav;
