import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Terminal, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TerminalOverlay: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistory] = useState<string[]>(["Welcome to YVES-OS v.1.0.0", "Type 'help' for available commands."]);
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Toggle with Tilde
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '`' || e.key === '~') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Auto-focus input
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            gsap.fromTo(containerRef.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    // Scroll to bottom
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen]);

    const handleCommand = (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const args = trimmed.split(' ');
        const main = args[0];

        let response = "";

        switch (main) {
            case 'help':
                response = "Available commands: help, clear, ls, cd [page], whoami, date, exit";
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'ls':
                response = "pages: home, projects, philosophy, contact\nfiles: cv.pdf, portrait.jpg";
                break;
            case 'whoami':
                response = "user: guest\nrole: observer\naccess: restricted";
                break;
            case 'date':
                response = new Date().toString();
                break;
            case 'exit':
                setIsOpen(false);
                return;
            case 'cd':
                if (args[1]) {
                    if (args[1] === 'home') { navigate('/'); response = "Navigating to Home..."; }
                    else if (args[1] === 'projects') { navigate('/'); setTimeout(() => document.getElementById('work')?.scrollIntoView(), 100); response = "Navigating to Projects..."; }
                    else if (args[1] === 'philosophy') { navigate('/'); setTimeout(() => document.getElementById('philosophy')?.scrollIntoView(), 100); response = "Navigating to Philosophy..."; }
                    else if (args[1] === 'contact') { navigate('/'); setTimeout(() => document.getElementById('footer')?.scrollIntoView(), 100); response = "Navigating to Contact..."; }
                    else { response = `Directory not found: ${args[1]}`; }
                } else {
                    response = "Usage: cd [page]";
                }
                break;
            case 'cat':
                if (args[1] === 'cv.pdf') { window.open('/cv.pdf', '_blank'); response = "Opening CV..."; }
                else if (args[1] === 'portrait.jpg') { window.open('/portrait.jpg', '_blank'); response = "Opening Portrait..."; }
                else { response = "File not found or unreadable."; }
                break;
            case '':
                return;
            default:
                response = `Command not found: ${main}`;
        }

        setHistory(prev => [...prev, `> ${cmd}`, response]);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleCommand(input);
        setInput("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full z-[100] p-4 font-mono text-sm pointer-events-none">
            <div ref={containerRef} className="w-full max-w-2xl mx-auto bg-black/90 backdrop-blur-xl border border-gray-700 rounded-lg shadow-2xl overflow-hidden pointer-events-auto">
                {/* Header */}
                <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 select-none">
                        <Terminal size={14} />
                        <span>yves-terminal ~ zsh</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">
                        <X size={14} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 h-64 overflow-y-auto custom-scrollbar" onClick={() => inputRef.current?.focus()}>
                    {history.map((line, i) => (
                        <div key={i} className="mb-1 text-gray-300 whitespace-pre-wrap">{line}</div>
                    ))}
                    <form onSubmit={onSubmit} className="flex gap-2">
                        <span className="text-green-500">➜</span>
                        <span className="text-blue-400">~</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
                            autoFocus
                        />
                    </form>
                    <div ref={bottomRef}></div>
                </div>
            </div>
        </div>
    );
};

export default TerminalOverlay;
