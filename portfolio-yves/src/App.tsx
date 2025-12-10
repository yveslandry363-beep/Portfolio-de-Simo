import React, { useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';
import PageTransition from './components/PageTransition';
import MathDecor from './components/MathDecor';
import NotFound from './components/NotFound';
import ScrollProgress from './components/ScrollProgress';
import MenuOverlay from './components/MenuOverlay';
import KeyboardNav from './components/KeyboardNav';
import SEO from './components/SEO';
import Konami from './components/Konami';
import CustomScrollbar from './components/CustomScrollbar';
import DynamicTitle from './components/DynamicTitle';
import CanvasNoise from './components/CanvasNoise';
import Oracle from './components/Oracle';
import AudioNarrative from './components/AudioNarrative';
import InstallPrompt from './components/InstallPrompt';
import TimeTravel from './components/TimeTravel';
import TerminalOverlay from './components/TerminalOverlay';
import SplashIntro from './components/SplashIntro';
import { useAppEngine } from './hooks/useAppEngine';
import { useMousePosition } from './hooks/useMousePosition';
import { useSettings } from './context/SettingsContext';

const Work = React.lazy(() => import('./components/Work'));
const About = React.lazy(() => import('./components/About'));
const ProjectDetail = React.lazy(() => import('./components/ProjectDetail'));

const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  useEffect(() => {
    if (state && (state as any).scrollTo) {
      const id = (state as any).scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);
  return null;
};

const Home: React.FC<{ projects: any[], experience: any[] }> = ({ projects, experience }) => {
  return (
    <div className="w-full text-white selection:bg-cyan-500 selection:text-black">
      <SEO title="Home" />
      <Hero />
      <section className="py-20 bg-black relative z-20">
        <Marquee text="CREATIVE DEVELOPER • DATA SCIENTIST • QUANTUM DESIGN • " speed={3} />
      </section>
      <Suspense fallback={<div className="h-screen"></div>}>
        <Work projects={projects} experience={experience} />
        <About />
      </Suspense>
      <Footer />
    </div>
  );
};

const Starfield: React.FC<{ scrollVelocity: React.MutableRefObject<number> }> = ({ scrollVelocity }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { reduceMotion } = useSettings();
  const { x: mouseX, y: mouseY } = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const numStars = reduceMotion ? 200 : 800;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * width - width / 2,
      y: Math.random() * height - height / 2,
      z: Math.random() * width,
      o: Math.random()
    }));

    let animationFrameId: number;

    const render = () => {
      const velocity = reduceMotion ? 0 : scrollVelocity.current;
      const speed = reduceMotion ? 0.5 : (2 + Math.abs(velocity * 3));

      // Parallax Offset
      const parallaxX = (mouseX - width / 2) * 0.1;
      const parallaxY = (mouseY - height / 2) * 0.1;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        const x2d = ((star.x - parallaxX) / star.z) * width + width / 2;
        const y2d = ((star.y - parallaxY) / star.z) * width + height / 2;

        if (x2d > 0 && x2d < width && y2d > 0 && y2d < height) {
          const size = Math.max(0.1, (1 - star.z / width) * 3);
          ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollVelocity, reduceMotion, mouseX, mouseY]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none -z-10" />;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use Custom Hook for Logic
  const {
    loading,
    showSplash,
    setShowSplash,
    loadProgress,
    isMenuOpen,
    setIsMenuOpen,
    appData,
    contentRef,
    scrollVelocityRef
  } = useAppEngine();

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <ScrollToTop />
      <PageTransition />
      <DynamicTitle />
      <Konami />
      <InstallPrompt />

      {showSplash && !loading && <SplashIntro onComplete={() => setShowSplash(false)} />}

      <div className={`relative bg-black min-h-screen ${showSplash ? 'h-screen overflow-hidden' : ''}`}>
        <CanvasNoise />
        <MathDecor />
        <Starfield scrollVelocity={scrollVelocityRef} />

        <Preloader loading={loading} progress={loadProgress} />

        {!showSplash && (
          <>
            <CustomCursor />
            <ScrollProgress />
            <CustomScrollbar />
            <CustomScrollbar />
            <KeyboardNav />
            <Oracle />
            <AudioNarrative />
            <TimeTravel />
            <TerminalOverlay />

            <Header onMenuOpen={() => setIsMenuOpen(true)} />

            <MenuOverlay
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              links={[{ name: "Projects", id: "work" }, { name: "Philosophy", id: "philosophy" }, { name: "Contact", id: "footer" }]}
              onNavClick={handleNavClick}
            />

            <div className="w-full overflow-hidden perspective-[2000px] relative z-10">
              <div ref={contentRef} className="liquid-container origin-top">
                <Routes>
                  <Route path="/" element={<Home projects={appData.projects} experience={appData.experience} />} />
                  <Route path="/project/:id" element={
                    <Suspense fallback={<div className="h-screen bg-black"></div>}>
                      <ProjectDetail />
                    </Suspense>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App;