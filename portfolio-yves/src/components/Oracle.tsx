import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Oracle: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{text: string, sender: 'bot' | 'user'}[]>([]);
    const location = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            let msg = "System Online. Welcome.";
            if (location.pathname.includes('project')) msg = "Accessing project archives...";
            setMessages([{ text: msg, sender: 'bot' }]);
        }, 2000);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleSuggestion = (text: string) => {
        setMessages(prev => [...prev, { text, sender: 'user' }]);
        setTimeout(() => {
            setMessages(prev => [...prev, { text: "Processing...", sender: 'bot' }]);
        }, 800);
    };

    return (
        <div className="fixed bottom-24 left-8 z-40 hidden md:flex flex-col items-start gap-4">
            {isOpen && (
                <div className="bg-black/90 backdrop-blur border border-blue-500/30 rounded-2xl p-4 w-64 shadow-2xl">
                    <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                        <span className="text-[10px] font-mono text-blue-400">ORACLE_AI</span>
                        <button onClick={() => setIsOpen(false)}><X size={12}/></button>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto mb-3 scrollbar-hide text-[11px] text-white">
                        {messages.map((m, i) => (
                            <div key={i} className={`p-2 rounded ${m.sender === 'bot' ? 'bg-blue-900/20' : 'bg-white/10'}`}>
                                {m.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => handleSuggestion("Tech Stack?")} className="text-[9px] border border-white/20 text-white px-2 py-1 rounded">Tech?</button>
                    </div>
                </div>
            )}
            
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-black border border-blue-500/50 flex items-center justify-center hover:scale-110 transition-transform"
            >
                <MessageSquare size={16} className="text-blue-400" />
            </button>
        </div>
    );
};

export default Oracle;