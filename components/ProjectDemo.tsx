import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckSquare, Send, ShoppingCart, RefreshCw, Lock, Maximize2, Minus, X } from 'lucide-react';

interface ProjectDemoProps {
    id: number;
    category: string;
    title: string;
}

const ProjectDemo: React.FC<ProjectDemoProps> = ({ id, category, title }) => {
    const [active, setActive] = useState(false);
    const [booting, setBooting] = useState(false);

    const getEngineType = () => {
        if (id === 200) return 'QUANTUM'; 
        if (id >= 101 && id <= 110) return 'DATA';
        if (id >= 111 && id <= 120) return 'WEB';
        if (id >= 121 && id <= 130) return 'CONSOLE';
        if (id >= 131 && id <= 140) return 'CANVAS';
        if (id >= 141 && id <= 150) return 'AI';
        return 'CONSOLE';
    };

    const engine = getEngineType();

    const handleLaunch = () => {
        setActive(true);
        setBooting(true);
    };

    if (!active) {
        return (
            <div className="w-full h-[600px] bg-[#050505] border border-white/10 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent"></div>
                
                {/* Grid Floor */}
                <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom"></div>

                <div className="z-10 text-center relative">
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
                        <span className="px-2 py-1 border border-blue-500/30 rounded bg-blue-500/10">KERNEL: {engine}</span>
                        <span className="px-2 py-1 border border-blue-500/30 rounded bg-blue-500/10">LATENCY: 12ms</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] bg-[#0a0a0a] border border-white/20 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative font-mono text-sm">
            {/* Window Header */}
            <div className="h-10 bg-[#111] border-b border-white/10 flex items-center px-4 justify-between select-none">
                <div className="flex items-center gap-2">
                    <div className="flex gap-2 group">
                         <div onClick={() => setActive(false)} className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 flex items-center justify-center text-[8px] text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity"><X size={8}/></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-400 flex items-center justify-center text-[8px] text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity"><Minus size={8}/></div>
                         <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-400 flex items-center justify-center text-[8px] text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity"><Maximize2 size={8}/></div>
                    </div>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {title}.exe
                </div>
                <button onClick={() => setBooting(true)} className="text-gray-500 hover:text-white transition-colors" title="Reboot System"><RotateCcw size={14} /></button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative bg-black">
                {booting ? (
                    <BootSequence onComplete={() => setBooting(false)} />
                ) : (
                    <>
                        {engine === 'DATA' && <OscilloscopeEngine />}
                        {engine === 'WEB' && <BrowserEngine title={title} />}
                        {engine === 'CONSOLE' && <HackerTerminal title={title} />}
                        {engine === 'CANVAS' && <ParticleEngine />}
                        {engine === 'AI' && <ComputerVisionHUD />}
                        {engine === 'QUANTUM' && <DNAMedicalEngine />}
                    </>
                )}
            </div>
        </div>
    );
};

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

const OscilloscopeEngine = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let tick = 0;
        let frame = 0;
        const loop = () => {
            tick += 0.1;
            ctx.fillStyle = 'rgba(0,0,0,0.1)';
            ctx.fillRect(0,0,width,height);
            ctx.strokeStyle = '#00f0ff';
            ctx.beginPath();
            for(let i=0; i<width; i+=10) {
                const y = height/2 + Math.sin(tick + i * 0.01) * 50;
                if(i===0) ctx.moveTo(i, y); else ctx.lineTo(i,y);
            }
            ctx.stroke();
            frame = requestAnimationFrame(loop);
        }
        loop();
        const handleResize = () => {
             width = canvas.width = canvas.offsetWidth;
             height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return <canvas ref={canvasRef} className="w-full h-full" />;
};

const BrowserEngine = ({ title }: { title: string }) => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Review Architecture", done: true },
        { id: 2, text: "Deploy to Production", done: false },
        { id: 3, text: "Optimize Database", done: false }
    ]);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<{user: boolean, text: string}[]>([
        { user: false, text: "Welcome to the chat!" }
    ]);
    const [chatInput, setChatInput] = useState("");

    if (title.toLowerCase().includes("todo") || title.toLowerCase().includes("task")) {
        return (
            <div className="p-8 max-w-md mx-auto h-full flex flex-col justify-center bg-gray-100">
                <div className="bg-white text-black rounded-lg overflow-hidden shadow-xl h-[400px] flex flex-col">
                    <div className="bg-blue-600 p-4 text-white font-bold flex items-center gap-2">
                        <CheckSquare size={20} /> Task Manager
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto">
                        {tasks.map(t => (
                            <div key={t.id} className="flex items-center gap-2 mb-3 p-2 border-b border-gray-100">
                                <input type="checkbox" checked={t.done} onChange={() => setTasks(tasks.map(task => task.id === t.id ? {...task, done: !task.done} : task))} />
                                <span className={t.done ? "line-through text-gray-400" : ""}>{t.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 flex gap-2">
                        <input className="flex-1 border p-2 rounded text-sm" placeholder="Add task..." value={input} onChange={(e) => setInput(e.target.value)} />
                        <button className="bg-blue-600 text-white px-4 rounded text-sm font-bold" onClick={() => { if(input) { setTasks([...tasks, {id: Date.now(), text: input, done: false}]); setInput(""); }}}>Add</button>
                    </div>
                </div>
            </div>
        );
    }

    if (title.toLowerCase().includes("chat")) {
        return (
             <div className="p-8 max-w-md mx-auto h-full flex flex-col justify-center bg-gray-100">
                <div className="bg-white text-black rounded-lg overflow-hidden shadow-xl h-[400px] flex flex-col">
                    <div className="bg-green-600 p-4 text-white font-bold flex items-center gap-2">
                        <Send size={20} /> Secure Chat
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-100">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.user ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-2 rounded-lg max-w-[80%] text-sm ${m.user ? 'bg-green-500 text-white' : 'bg-white text-gray-800'}`}>
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-white flex gap-2">
                         <input className="flex-1 border p-2 rounded text-sm" placeholder="Type message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if(e.key === 'Enter' && chatInput) { setMessages([...messages, {user:true, text: chatInput}, {user:false, text: "Received."}]); setChatInput(""); } }} />
                    </div>
                </div>
             </div>
        );
    }

    return (
        <div className="h-full bg-gray-100 p-8 flex items-center justify-center text-black">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p>Interactive Web Module Loaded</p>
                <div className="mt-4 p-4 bg-white rounded shadow text-left max-w-sm mx-auto">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
};

const HackerTerminal = ({ title }: { title: string }) => (
    <div className="h-full p-4 font-mono text-green-500 text-xs">
        &gt; access root<br/>
        &gt; permission granted<br/>
        &gt; executing {title}...<br/>
        &gt; <span className="animate-pulse">_</span>
    </div>
);

const ParticleEngine = () => (
    <div className="h-full flex items-center justify-center text-white font-mono">
        [ PARTICLE SYSTEM ACTIVE ]
    </div>
);

const ComputerVisionHUD = () => (
    <div className="h-full bg-gray-900 flex items-center justify-center text-red-500 font-mono relative overflow-hidden">
        <div className="absolute inset-0 border-[20px] border-red-500/20"></div>
        [ TARGET TRACKING ACTIVE ]
    </div>
);

const DNAMedicalEngine = () => (
    <div className="h-full bg-black flex items-center justify-center text-blue-500 font-mono">
        [ VMed237 QUANTUM SIMULATION ]
    </div>
);

export default ProjectDemo;