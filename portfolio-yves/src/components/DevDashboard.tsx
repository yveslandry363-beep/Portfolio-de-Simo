import React, { useEffect, useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, Cpu, HardDrive, Activity, Layers } from 'lucide-react';

interface DevDashboardProps {
    isOpen: boolean;
    onClose: () => void;
}

const DevDashboard: React.FC<DevDashboardProps> = ({ isOpen, onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [fps, setFps] = useState(0);
    const [memory, setMemory] = useState<any>({});
    const [domNodes, setDomNodes] = useState(0);

    // FPS Loop
    useEffect(() => {
        if (!isOpen) return;
        let frameCount = 0;
        let lastTime = performance.now();
        let rafId: number;

        const loop = () => {
            const now = performance.now();
            frameCount++;
            if (now - lastTime >= 1000) {
                setFps(frameCount);
                frameCount = 0;
                lastTime = now;
                setDomNodes(document.getElementsByTagName('*').length);
                if ((performance as any).memory) {
                    setMemory((performance as any).memory);
                }
            }
            rafId = requestAnimationFrame(loop);
        };
        loop();

        return () => cancelAnimationFrame(rafId);
    }, [isOpen]);

    useGSAP(() => {
        if (isOpen) {
            gsap.fromTo(containerRef.current,
                { y: -50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
            <div ref={containerRef} className="w-[500px] bg-[#111] border border-green-500/50 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,255,0,0.2)] font-mono text-xs">
                {/* Header */}
                <div className="bg-green-900/20 border-b border-green-500/30 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-green-400 uppercase tracking-widest font-bold">
                        <Activity size={16} />
                        Systems Monitor
                    </div>
                    <button onClick={onClose} className="text-green-500 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Grid */}
                <div className="p-6 grid grid-cols-2 gap-4">
                    {/* FPS */}
                    <div className="bg-black/50 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Activity size={14} /> FRAME RATE
                        </div>
                        <div className="text-4xl text-white font-bold">{fps} <span className="text-sm text-gray-400 font-normal">FPS</span></div>
                    </div>

                    {/* DOM Nodes */}
                    <div className="bg-black/50 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Layers size={14} /> DOM NODES
                        </div>
                        <div className="text-4xl text-white font-bold">{domNodes}</div>
                    </div>

                    {/* Memory */}
                    <div className="col-span-2 bg-black/50 p-4 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2 text-gray-500 mb-2">
                            <Cpu size={14} /> MEMORY HEAP
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <div className="text-gray-500 mb-1">USED</div>
                                <div className="text-xl text-white">{(memory.usedJSHeapSize / 1048576).toFixed(1) || 0} MB</div>
                            </div>
                            <div>
                                <div className="text-gray-500 mb-1">TOTAL</div>
                                <div className="text-xl text-white">{(memory.totalJSHeapSize / 1048576).toFixed(1) || 0} MB</div>
                            </div>
                            <div>
                                <div className="text-gray-500 mb-1">LIMIT</div>
                                <div className="text-xl text-white">{(memory.jsHeapSizeLimit / 1048576).toFixed(1) || 0} MB</div>
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-2 bg-green-900/10 p-4 rounded-lg border border-green-500/20 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-green-400">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            SYSTEM OPTIMAL
                        </div>
                        <div className="text-gray-500">V.2.0.25</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevDashboard;
