import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckSquare, Send, ShoppingCart, RefreshCw, Lock, Maximize2, Minus, X, AlertTriangle, Loader2 } from 'lucide-react';
import LiquidText from './effects/LiquidText';
import ParticleField from './effects/ParticleField';

interface ProjectDemoProps {
    id: number;
    category: string;
    title: string;
    videoUrl?: string;
    description: string;
    details: string;
    stack: string[];
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ id, category, title, description, details, stack }) => {
    const [active, setActive] = useState(false);
    const [booting, setBooting] = useState(false);

    // --- HELPER: SYNTHETIC CONTENT GENERATOR ---
    // Generates rich "Techno-Babble" if 'details' prop is missing (which is true for projects 101-150)
    const getEnrichedDetails = () => {
        if (details && details.length > 20) return details;

        // Generate content based on category/stack
        const techStr = stack.join(', ');
        const timestamp = new Date().toISOString();

        const intro = [
            `> SYSTEM: INITIALIZING INTELLIGENT ANALYSIS FOR [${title.toUpperCase()}]...`,
            `> TARGET: ${category.toUpperCase()} SECTOR`,
            `> TECH_STACK_DETECTED: [${techStr}]`,
            `> KERNEL: OPTIMIZATION PROTOCOLS ENGAGED.`
        ].join('\n\n');

        const body = `
            Executing deep-dive architecture review. This project implements advanced ${category} methodologies using ${stack[0] || 'modern algorithms'}. 
            Core utilization of ${stack[1] || 'high-performance modules'} ensures minimal latency and maximum throughput.
            
            System handles high-frequency data processing with O(n log n) efficiency. 
            Deployed neural-symbolic logic to optimize user interaction patterns.
            
            The architecture is fully modular, adhering to SOLID principles and clean code standards.
            Security protocols verified: OAuth2.0 / JWT integration active. 
            Real-time telemetry streams enabled for monitoring throughput and error rates.
        `;

        const outro = `> STATUS: DEPLOYMENT SUCCESSFUL.\n> VERSION: 2.0.4-STABLE\n> TIME: ${timestamp}`;

        return `${intro}\n${body}\n${outro}`;
    };

    const finalDetails = getEnrichedDetails();

    // Engine type based on category/ID
    const getEngineType = () => {
        const cat = category.toLowerCase();
        if (cat.includes('quantum') || cat.includes('ai') || cat.includes('scifi') || id === 200) return 'SCIFI';
        if (cat.includes('data') || cat.includes('analy') || cat.includes('math')) return 'DATA';
        if (cat.includes('design') || cat.includes('web')) return 'PRESENTATION';
        return 'TERMINAL';
    };

    const engine = getEngineType();

    const handleLaunch = () => {
        setActive(true);
        setBooting(true);
    };

    if (!active) {
        return (
            <div className="w-full h-[600px] bg-[#050505] border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>

                {/* Grid Floor Effect */}
                <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom"></div>

                <div className="z-10 text-center relative pointer-events-none group-hover:pointer-events-auto">
                    <div
                        className="w-24 h-24 bg-white/5 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center mb-8 mx-auto group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-500 cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_50px_rgba(37,99,235,0.6)]"
                        onClick={handleLaunch}
                    >
                        <Play fill="white" size={32} className="ml-1" />
                    </div>
                    <h3 className="text-3xl font-bold font-['Syne'] uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                        Initialize Demo
                    </h3>
                    <div className="flex items-center justify-center gap-3 mt-4 text-xs font-mono text-blue-400">
                        <span className="px-2 py-1 border border-blue-500/30 rounded bg-blue-500/10">MODE: {engine}_VISUALIZER</span>
                        <span className="px-2 py-1 border border-blue-500/30 rounded bg-blue-500/10">LATENCY: 12ms</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative font-mono text-sm">
            {/* Window Header */}
            <div className="h-10 bg-[#111] border-b border-white/10 flex items-center px-4 justify-between select-none z-20 relative">
                <div className="flex gap-2">
                    <div onClick={() => setActive(false)} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {title}.exe
                </div>
                <button onClick={() => setBooting(true)} className="text-gray-500 hover:text-white"><RotateCcw size={14} /></button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative bg-black flex items-center justify-center">
                {booting ? (
                    <BootSequence onComplete={() => setBooting(false)} />
                ) : (
                    <>
                        {engine === 'SCIFI' && <SciFiCrawl title={title} description={description} details={finalDetails} stack={stack} />}
                        {engine === 'TERMINAL' && <TerminalLog title={title} description={description} details={finalDetails} stack={stack} />}
                        {engine === 'DATA' && <DataGrid title={title} description={description} details={finalDetails} stack={stack} />}
                        {engine === 'PRESENTATION' && <KineticType title={title} description={description} details={finalDetails} stack={stack} />}
                    </>
                )}
            </div>
        </div>
    );
};

// -- HELPER COMPONENTS --

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [log, setLog] = useState("BIOS CHECK...");
    useEffect(() => {
        const t1 = setTimeout(() => setLog("LOADING KERNEL..."), 500);
        const t2 = setTimeout(() => setLog("MOUNTING FILESYSTEM..."), 1000);
        const t3 = setTimeout(() => setLog("STARTING GUI..."), 1500);
        const t4 = setTimeout(onComplete, 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, []);
    return (
        <div className="h-full flex items-center justify-center font-mono text-green-500">
            {log} <span className="animate-pulse ml-1">_</span>
        </div>
    );
};

// --- ANIMATION ENGINES ---

// 1. STAR WARS / SCIFI STYLE
const SciFiCrawl = ({ title, description, details, stack }: any) => {
    return (
        <div className="w-full h-full perspective-[800px] overflow-hidden bg-black flex justify-center items-end pb-20 relative">
            {/* Dynamic Starfield Background */}
            <ParticleField mode="stars" count={200} speed={0.5} color="#ffffff" opacity={0.8} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

            <div className="relative w-[80%] text-center text-yellow-400 font-bold tracking-widest animate-[crawl_20s_linear_infinite] [transform-style:preserve-3d] [transform:rotateX(25deg)] z-20">
                <div className="mb-8">
                    <LiquidText text={title} className="text-4xl uppercase text-blue-500" distortionScale={50} radius={150} />
                </div>
                <p className="text-xl mb-12 text-white/90">{description}</p>
                <div className="text-lg text-justify opacity-80 leading-loose mb-12 font-mono text-green-400 whitespace-pre-line">
                    {details}
                </div>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-mono text-cyan-400">
                    {stack.map((s: string) => <span key={s} className="border border-cyan-500/50 px-2 py-1">[{s}]</span>)}
                </div>
            </div>
            <style>{`
                @keyframes crawl {
                    0% { transform: rotateX(20deg) translateY(100%); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: rotateX(25deg) translateY(-150%); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

// 2. TERMINAL / HACKER STYLE
const TerminalLog = ({ title, description, details, stack }: any) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        const script = [
            `> INITIALIZING PROTOCOL...`,
            `> LOAD SUCESSFUL.`,
            `> SUMMARY: ${description}`,
            `> ANALYZING CORE LOGIC...`,
            ...(details ? details.match(/.{1,60}/g) || [details] : []),
            `> DETECTED STACK: [${stack.join(', ')}]`,
            `> SYSTEM READY.`
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < script.length) {
                setLines(prev => [...prev, script[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full p-8 font-mono text-green-500 text-sm overflow-y-auto bg-black border-l-4 border-green-500/50 relative">
            {/* Matrix Rain Background */}
            <ParticleField mode="matrix" count={30} speed={2} color="#00ff00" opacity={0.15} />

            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%]"></div>

            <div className="relative z-20">
                <div className="mb-4 pb-2 border-b border-green-900">
                    <LiquidText text={title.toUpperCase()} className="text-2xl font-bold" radius={100} distortionScale={20} />
                </div>
                {lines.map((l, i) => (
                    <div key={i} className="mb-2 border-l-2 border-green-900 pl-2 animate-fade-in">
                        <span className="opacity-50 text-xs mr-2">[{new Date().toLocaleTimeString()}]</span>
                        {l}
                    </div>
                ))}
                <div className="animate-pulse">_</div>
            </div>
        </div>
    );
};

// 3. ENHANCED DATAGRID STYLE (Animated)
const DataGrid = ({ title, description, details, stack }: any) => {
    return (
        <div className="w-full h-full bg-slate-950 text-cyan-300 p-6 grid grid-cols-12 grid-rows-6 gap-2 font-mono text-xs overflow-hidden relative border-t-2 border-cyan-500/50">
            {/* Animated Network Background */}
            <ParticleField mode="network" count={60} speed={0.5} color="#06b6d4" opacity={0.2} />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-[scanline_3s_linear_infinite] z-10"></div>

            {/* Header Section */}
            <div className="col-span-12 row-span-1 border border-cyan-500/30 p-4 flex items-center justify-between bg-cyan-900/10 backdrop-blur-md relative overflow-hidden group z-20">
                <div className="absolute inset-0 bg-cyan-500/5 animate-pulse"></div>
                <div className="relative z-10 w-full">
                    <LiquidText
                        text={title.toUpperCase()}
                        className="text-2xl font-black tracking-[0.2em] inline-block"
                        distortionScale={40}
                        radius={200}
                    />
                </div>
                <div className="flex bg-black/50 border border-cyan-500 px-3 py-1 items-center gap-2 absolute right-4">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                    <span>LIVE_DATA_FEED</span>
                </div>
            </div>

            {/* Stats / Stack Panel */}
            <div className="col-span-4 row-span-5 border border-cyan-500/30 bg-black/40 backdrop-blur-sm p-4 flex flex-col gap-4 z-20">
                <div>
                    <h3 className="text-cyan-600 mb-1 text-[10px] uppercase font-bold">// MODULES_ACTIVE</h3>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((s: string) => (
                            <div key={s} className="bg-cyan-950/50 border border-cyan-500/20 px-2 py-1 text-[10px] text-cyan-200">{s}</div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 border-t border-cyan-500/20 pt-4 relative">
                    <h3 className="text-cyan-600 mb-2 text-[10px] uppercase font-bold">// SYSTEM_METRICS</h3>
                    <div className="space-y-2 text-[10px] opacity-70">
                        <div className="flex justify-between"><span>CPU_USAGE</span><span>12%</span></div>
                        <div className="w-full h-1 bg-cyan-900/30"><div className="w-[12%] h-full bg-cyan-500 animate-[width-pulse_2s_infinite]"></div></div>
                        <div className="flex justify-between"><span>MEMORY</span><span>484MB</span></div>
                        <div className="w-full h-1 bg-cyan-900/30"><div className="w-[40%] h-full bg-cyan-500"></div></div>
                        <div className="flex justify-between"><span>NETWORK</span><span>2.4Gbps</span></div>
                        <div className="w-full h-1 bg-cyan-900/30"><div className="w-[80%] h-full bg-cyan-500"></div></div>
                    </div>
                </div>
            </div>

            {/* Main Content Feed */}
            <div className="col-span-8 row-span-5 border border-cyan-500/30 bg-black/60 p-6 overflow-y-auto relative z-20">
                <h3 className="absolute top-0 right-0 bg-cyan-500 text-black px-2 py-0.5 text-[9px] font-bold">LOG_OUTPUT</h3>
                <p className="whitespace-pre-line leading-relaxed text-cyan-100/90 font-light text-sm">
                    {details}
                </p>

                <div className="mt-8 pt-4 border-t border-dashed border-cyan-800/50 text-cyan-600 text-xs">
                    &gt; END OF STREAM <span className="animate-blink">_</span>
                </div>
            </div>

            <style>{`
                @keyframes scanline { 0% { top: 0% } 100% { top: 100% } }
                @keyframes blink { 50% { opacity: 0 } }
            `}</style>
        </div>
    );
};

// 4. ELEGANT / PRESENTATION STYLE
const KineticType = ({ title, description, details, stack }: any) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#f0f0f0] text-black p-12 text-center overflow-hidden relative">
            {/* Subtle Dust/Noise Background */}
            <ParticleField mode="dust" count={30} speed={0.2} color="#000000" opacity={0.1} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-gray-200 opacity-50"></div>

            <div className="mb-6 relative z-10 animate-[tracking-in-expand_0.7s_cubic-bezier(0.215,0.610,0.355,1.000)_both]">
                <LiquidText text={title} className="text-6xl font-black uppercase tracking-tighter" distortionScale={30} radius={120} />
            </div>

            <div className="w-20 h-1 bg-black mb-8 relative z-10 animate-[scale-in-hor-center_0.5s_cubic-bezier(0.250,0.460,0.450,0.940)_both]"></div>

            <p className="text-xl font-light mb-8 italic text-gray-600 max-w-lg relative z-10 animate-[slide-in-bottom_0.5s_cubic-bezier(0.250,0.460,0.450,0.940)_both_0.2s]">"{description}"</p>

            <p className="text-sm leading-relaxed max-w-lg text-gray-800 mb-8 relative z-10 animate-[slide-in-bottom_0.5s_cubic-bezier(0.250,0.460,0.450,0.940)_both_0.4s]">
                {details}
            </p>

            <div className="flex gap-2 flex-wrap justify-center relative z-10 animate-[slide-in-bottom_0.5s_cubic-bezier(0.250,0.460,0.450,0.940)_both_0.6s]">
                {stack.map((s: string) => (
                    <span key={s} className="bg-black text-white px-3 py-1 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors cursor-default">{s}</span>
                ))}
            </div>

            <style>{`
                @keyframes tracking-in-expand {
                    0% { letter-spacing: -0.5em; opacity: 0; }
                    40% { opacity: 0.6; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ProjectDemo;