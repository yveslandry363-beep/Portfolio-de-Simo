
import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams as useParamsRouter, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, Code, CheckCircle, Lock, ArrowRight, Play } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { experience, projects } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import TextScramble from './TextScramble';
import Gallery from './Gallery';
import Button from './Button';
import SEO from './SEO';
import ImageLoader from './ImageLoader';
import ProjectMetrics from './ProjectMetrics';
import ProjectDemo from './ProjectDemo'; // NEW IMPORT

const ProjectDetail: React.FC = () => {
  const { id } = useParamsRouter<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const projectId = parseInt(id || '0');
  const allItems = [...experience, ...projects];
  const projectIndex = allItems.findIndex(p => p.id === projectId);
  const project = allItems[projectIndex];
  
  const nextProject = projectIndex < allItems.length - 1 ? allItems[projectIndex + 1] : allItems[0];
  const prevProject = projectIndex > 0 ? allItems[projectIndex - 1] : allItems[allItems.length - 1];

  useEffect(() => {
      const handleScroll = () => {
          if (!containerRef.current || !progressBarRef.current) return;
          const totalHeight = containerRef.current.clientHeight - window.innerHeight;
          const progress = window.scrollY / totalHeight;
          const width = Math.min(100, Math.max(0, progress * 100));
          progressBarRef.current.style.width = `${width}%`;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') {
            navigate(`/project/${nextProject.id}`);
        } else if (e.key === 'ArrowLeft') {
            navigate(`/project/${prevProject.id}`);
        } else if (e.key === 'Escape') {
            navigate('/');
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject, navigate]);

  useGSAP(() => {
    window.scrollTo(0,0);
    const tl = gsap.timeline();
    tl.from(".detail-hero", {
      clipPath: "inset(0 100% 0 0)", 
      duration: 1.2,
      ease: "power4.inOut"
    })
    .from(".detail-meta", {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8
    }, "-=0.5");
  }, { scope: containerRef, dependencies: [id] });

  if (!project) return null;

  const getLocalizedContent = (item: any, field: string) => {
    if (language === 'en') return item[field];
    return item[`${field}_${language}`] || item[field];
  };

  const imageUrl = (project as any).image || `https://picsum.photos/seed/${project.id}/1920/1080`;
  const techStack = (project as any).stack || ["HTML", "CSS", "JavaScript"];
  const isPrivate = (project as any).private;
  const category = getLocalizedContent(project, 'category');

  return (
    <div ref={containerRef} className="pt-32 pb-0 px-6 md:px-12 text-white min-h-screen relative overflow-hidden">
      <SEO title={project.title} description={getLocalizedContent(project, 'description')} />
      
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/10">
          <div ref={progressBarRef} className="h-full bg-blue-500 w-0 transition-all duration-100 ease-out"></div>
      </div>
      
      <div className="absolute top-0 right-0 p-4 font-mono text-xs text-gray-700">
         ID: {project.id} // SEC: 03 // NAV: ← →
      </div>

      <div className="max-w-7xl mx-auto pb-24">
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-12 group transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-widest text-xs font-bold">{t.project.back}</span>
        </Link>

        <div className="mb-16 border-b border-white/10 pb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="detail-meta">
                     <span className="text-blue-400 font-mono text-xs tracking-widest mb-4 block">
                        // {category}
                     </span>
                     <h1 className="text-5xl md:text-8xl font-['Syne'] font-bold leading-[0.9] uppercase tracking-tighter">
                        <TextScramble text={project.title} />
                     </h1>
                </div>
                
                <div className="detail-meta flex gap-8 text-sm font-mono text-gray-400">
                    <div>
                        <span className="block text-gray-600 uppercase text-[10px]">Year</span>
                        {getLocalizedContent(project, 'year') || '2024'}
                    </div>
                </div>
            </div>
        </div>

        <div className="detail-hero w-full aspect-video md:aspect-[2.35/1] overflow-hidden mb-20 relative rounded-2xl">
          <ImageLoader 
            src={imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover scale-105"
            containerClassName="w-full h-full"
          />
          {isPrivate && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest z-20">
                  Classified / Private
              </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
             <div className="md:col-span-4 space-y-8 detail-meta">
                 <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{t.project.overview}</h3>
                    <p className="text-lg leading-relaxed text-gray-200">
                        {getLocalizedContent(project, 'details') || getLocalizedContent(project, 'description')}
                    </p>
                 </div>
                 
                 <div className="pt-8 border-t border-white/10">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{t.project.techStack}</h3>
                    <div className="flex flex-wrap gap-2">
                        {techStack.map((t: string) => (
                            <span key={t} className="px-3 py-1 border border-white/20 rounded-full text-xs hover:bg-white hover:text-black transition-colors cursor-default">
                                {t}
                            </span>
                        ))}
                    </div>
                 </div>

                 <div className="pt-4">
                     {isPrivate ? (
                         <Button disabled className="w-full justify-center">
                             <span className="flex items-center gap-2"><Lock size={14} /> {t.work.privateRepo}</span>
                         </Button>
                     ) : (
                         <Button href="#" className="w-full justify-center">
                             <span className="flex items-center gap-2"><Github size={14} /> {t.work.sourceCode}</span>
                         </Button>
                     )}
                 </div>
             </div>

             <div className="md:col-span-1 hidden md:block border-r border-white/10 h-full mx-auto"></div>

             <div className="md:col-span-7 detail-meta space-y-16">
                 <div>
                    <p className="text-2xl md:text-3xl leading-normal font-light text-gray-300 mb-12">
                        "This project represents a significant step in exploring {techStack[1] || 'modern technology'}, focusing on performance and scalability."
                    </p>
                    <ProjectMetrics />
                 </div>

                 {/* LIVE DEMO ENGINE INTEGRATION */}
                 <div>
                    <h3 className="text-xl font-bold font-['Syne'] mb-6 flex items-center gap-2">
                        <Play size={20} className="text-blue-500" /> Live Interactive Demo
                    </h3>
                    <ProjectDemo id={project.id} category={category} title={project.title} />
                 </div>
                 
                 <Gallery id={project.id} />
             </div>
        </div>
      </div>

      <Link to={`/project/${nextProject.id}`} className="block border-t border-white/10 py-24 bg-neutral-900/30 hover:bg-blue-900/20 transition-colors group relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-10">
               <div>
                   <span className="text-xs font-mono text-gray-500 mb-2 block">NEXT PROJECT // 0{nextProject.id}</span>
                   <h2 className="text-4xl md:text-7xl font-['Syne'] font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                       {nextProject.title}
                   </h2>
               </div>
               <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-125 group-hover:bg-white group-hover:text-black transition-all">
                   <ArrowRight size={24} />
               </div>
           </div>
      </Link>
    </div>
  );
};

export default ProjectDetail;
