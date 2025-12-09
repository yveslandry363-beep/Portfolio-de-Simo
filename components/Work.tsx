
import React, { useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TextScramble from './TextScramble';
import ImageLoader from './ImageLoader';
import { triggerHaptic, Patterns } from '../utils/haptics';

interface WorkProps {
    projects: any[];
    experience: any[];
}

const Work: React.FC<WorkProps> = ({ projects, experience }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  
  // Filtering Logic
  const [filter, setFilter] = useState("All");
  
  const categories = useMemo(() => {
     return ["All", "Data", "Web", "Math", "AI"];
  }, []);

  const filteredProjects = useMemo(() => {
      if (filter === "All") return projects;
      return projects.filter(p => {
          const cat = p.category.toLowerCase();
          if (filter === "Data") return cat.includes("data") || cat.includes("fintech") || cat.includes("analytics");
          if (filter === "Web") return cat.includes("web") || cat.includes("react") || cat.includes("bot");
          if (filter === "Math") return cat.includes("math") || cat.includes("algorithm") || cat.includes("simulation");
          if (filter === "AI") return cat.includes("ai") || cat.includes("learning") || cat.includes("vision") || cat.includes("nlp");
          return false;
      });
  }, [filter, projects]);

  useGSAP(() => {
    // Reveal Image Animation for Vertical List
    const projectItems = gsap.utils.toArray('.project-item');
    projectItems.forEach((item: any) => {
      gsap.fromTo(item, 
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      gsap.from(item.querySelectorAll('.reveal-content'), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
            trigger: item,
            start: "top 90%",
        }
      });
    });

    // Animate Filter Change
    gsap.fromTo(".horizontal-item", 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
    );

  }, { scope: containerRef, dependencies: [filteredProjects, experience] });

  useGSAP(() => {
     ScrollTrigger.refresh();
     
     // USE MATCH MEDIA TO PREVENT PINNING (BLACK HOLE) ON MOBILE
     const mm = gsap.matchMedia();

     mm.add("(min-width: 769px)", () => {
         // Desktop: Pinning enabled
         if (horizontalRef.current && filteredProjects.length > 0) {
            const sections = gsap.utils.toArray(".horizontal-item");
            if (sections.length > 0) {
                gsap.to(sections, {
                    xPercent: -100 * (sections.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: horizontalRef.current,
                        pin: true,
                        scrub: 1,
                        // Calculate end based on content width for smooth pinning
                        end: () => "+=" + (horizontalRef.current?.offsetWidth || 0) * (sections.length * 0.5)
                    }
                });
            }
         }
     });

     return () => mm.revert();
     
  }, { scope: containerRef, dependencies: [filteredProjects] });

  const getLocalizedContent = (item: any, field: string) => {
    if (language === 'en') return item[field];
    return item[`${field}_${language}`] || item[field];
  };

  const handleParallax = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const bg = card.querySelector('.parallax-bg');
    if (bg) {
        gsap.to(bg, { scale: 1.15, duration: 0.6, ease: 'power2.out' });
        triggerHaptic(Patterns.Hover);
    }
  };

  const resetParallax = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const bg = card.querySelector('.parallax-bg');
    if (bg) {
        gsap.to(bg, { scale: 1.0, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <section id="work" ref={containerRef} className="relative z-10">
      
      {/* PART 1: Vertical List (Experience) */}
      <div className="py-24 md:py-40 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-20 border-b border-white/10 pb-8">
          <h2 className="text-5xl md:text-8xl font-['Syne'] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <span className="block text-sm font-mono tracking-widest text-blue-400 mb-2">01.</span>
            {t.work.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">{t.work.history}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {experience.map((job, index) => (
            <Link 
              to={`/project/${job.id}`}
              key={job.id}
              onClick={() => triggerHaptic(Patterns.Click)}
              className="project-item group relative block rounded-3xl overflow-hidden transition-all duration-500 border border-white/5 hover:border-white/20"
              onMouseEnter={handleParallax}
              onMouseLeave={resetParallax}
              data-cursor="view"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                 <div className="w-full h-full transition-transform duration-1000 ease-out will-change-transform">
                    <img 
                        src={job.image} 
                        alt={job.title} 
                        className="parallax-bg w-[110%] h-[110%] max-w-none object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-all duration-500 filter blur-[2px] group-hover:blur-0"
                    />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
              </div>

              <div className="relative z-10 p-8 md:p-12 h-full flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="md:w-1/2 reveal-content">
                   <span className="text-xs font-mono text-gray-500 mb-2 block">0{index + 1} // EXPERIENCE</span>
                  <h3 className="text-3xl md:text-5xl font-bold mb-2 font-['Syne'] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                    {job.title}
                  </h3>
                  <p className="text-blue-300 font-mono text-sm tracking-wide flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    {getLocalizedContent(job, 'category')}
                  </p>
                </div>
                
                <div className="md:w-1/4 flex flex-col items-start md:items-end reveal-content">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/70 border border-white/10 rounded-full px-3 py-1 mb-2 bg-white/5 backdrop-blur-md">
                    {getLocalizedContent(job, 'year')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* PART 2: Horizontal Scroll (Projects) */}
      <div className="py-24 border-t border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden md:min-h-[800px]">
        <div className="px-6 md:px-12 mb-8 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="text-4xl md:text-6xl font-['Syne'] font-bold leading-tight">
                <span className="block text-sm font-mono tracking-widest text-blue-400 mb-2">02.</span>
                {t.work.academic} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">{t.work.personal}</span>
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => { setFilter(cat); triggerHaptic(Patterns.Click); }}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${filter === cat ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/20 hover:border-white'}`}
                        data-cursor="link"
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Horizontal Container - Native Scroll on Mobile, Pinned on Desktop */}
        <div 
          ref={horizontalRef} 
          className="flex flex-nowrap md:h-[600px] items-center px-6 md:px-12 gap-8 w-max overflow-x-auto md:overflow-visible no-scrollbar pb-8 md:pb-0"
        >
             {filteredProjects.length === 0 ? (
                 <div className="w-full text-center text-gray-500 font-mono">No projects found for {filter}</div>
             ) : (
                 filteredProjects.slice(0, 10).map((project, i) => (
                     <div key={project.id} className="horizontal-item w-[85vw] md:w-[600px] h-[400px] md:h-full flex-shrink-0">
                        <Link 
                            to={`/project/${project.id}`}
                            onClick={() => triggerHaptic(Patterns.Click)}
                            className="group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/30 transition-colors"
                            onMouseEnter={handleParallax}
                            onMouseLeave={resetParallax}
                            data-cursor="view"
                        >
                             <div className="absolute inset-0 overflow-hidden">
                                <ImageLoader 
                                    src={(project as any).image || `https://picsum.photos/seed/${project.id}/800/600`}
                                    alt={project.title}
                                    className="parallax-bg w-full h-full object-cover transition-transform duration-700"
                                    containerClassName="w-full h-full"
                                />
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500"></div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-xs font-mono text-blue-400 mb-2 block">00{i + 1}</span>
                                        <h3 className="text-3xl font-bold font-['Syne'] text-white mb-2"><TextScramble text={project.title} trigger={false} /></h3>
                                        <p className="text-sm text-gray-400 max-w-sm line-clamp-2">{getLocalizedContent(project, 'description')}</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                                    </div>
                                </div>
                            </div>

                            {(project as any).private && (
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded flex items-center gap-1">
                                    <Lock size={10} /> Private
                                </div>
                            )}
                        </Link>
                     </div>
                 ))
             )}
             
             {/* Load More Card */}
             {filteredProjects.length > 10 && (
                <div className="horizontal-item w-[300px] h-[400px] md:h-full flex-shrink-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-400 mb-4 font-mono">And {filteredProjects.length - 10} more...</p>
                        <button className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full" data-cursor="link">
                            View Archive
                        </button>
                    </div>
                </div>
             )}
        </div>
      </div>

    </section>
  );
};

export default Work;
