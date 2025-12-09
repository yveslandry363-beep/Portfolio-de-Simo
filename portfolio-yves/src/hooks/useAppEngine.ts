import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { fetchProjects, fetchExperience } from '../services/api';
import { loadResources } from '../utils/resourceManager';
import { playClickSound } from '../utils/audio';
import { useSettings } from '../context/SettingsContext';

interface AppData {
    projects: any[];
    experience: any[];
}

export const useAppEngine = () => {
    const [loading, setLoading] = useState(true);
    const [showSplash, setShowSplash] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [appData, setAppData] = useState<AppData>({ projects: [], experience: [] });

    const { reduceMotion } = useSettings();
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollVelocityRef = useRef(0);

    // Initial Data Load
    useEffect(() => {
        const initApp = async () => {
            try {
                const [projData, expData] = await Promise.all([fetchProjects(), fetchExperience()]);

                const safeProjects = Array.isArray(projData) ? projData : [];
                const safeExperience = Array.isArray(expData) ? expData : [];

                setAppData({ projects: safeProjects, experience: safeExperience });

                // Preload critical resources
                await loadResources([...safeProjects, ...safeExperience], setLoadProgress);
                setLoading(false);
            } catch (err) {
                console.error("Engine Init Failed:", err);
                setLoading(false);
            }
        };

        // Global Click Sound Listener
        const handleClick = () => playClickSound();
        window.addEventListener('click', handleClick);

        initApp();

        return () => window.removeEventListener('click', handleClick);
    }, []);

    // Physics Engine (Lenis + GSAP)
    useEffect(() => {
        if (loading || showSplash) return;

        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            lerp: 0.05,
            touchMultiplier: 2, // Better mobile sensitivity
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);

        const physicsLoop = () => {
            scrollVelocityRef.current = lenis.velocity;

            // Apply Skew Effect if not reduced motion
            if (contentRef.current && !reduceMotion) {
                const v = lenis.velocity;
                gsap.to(contentRef.current, {
                    skewY: Math.max(Math.min(v * 0.05, 5), -5),
                    duration: 0.1,
                    overwrite: true
                });
            }
            requestAnimationFrame(physicsLoop);
        };
        const rafId = requestAnimationFrame(physicsLoop);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(lenis.raf);
            cancelAnimationFrame(rafId);
        };
    }, [loading, showSplash, reduceMotion]);

    return {
        loading,
        showSplash,
        setShowSplash,
        loadProgress,
        isMenuOpen,
        setIsMenuOpen,
        appData,
        contentRef,
        scrollVelocityRef
    };
};
