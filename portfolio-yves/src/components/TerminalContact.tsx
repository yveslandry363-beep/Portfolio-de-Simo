
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal } from 'lucide-react';
import gsap from 'gsap';
import TextScramble from './TextScramble';

const TerminalContact: React.FC = () => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([
      "Initializing secure connection...",
      "Connected to mail server port 25.",
      "Awaiting user input..."
  ]);
  const [isSending, setIsSending] = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
      if(logsRef.current) {
          logsRef.current.scrollTop = logsRef.current.scrollHeight;
      }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLogs(prev => [...prev, `> user: ${input}`]);
    
    // Simulate processing command
    if (input.includes('@')) {
        setIsSending(true);
        setLogs(prev => [...prev, "Analysing syntax...", "Valid email detected.", "Encrypting payload..."]);
        
        setTimeout(() => {
            setLogs(prev => [...prev, "Packet sent successfully.", "Server response: 200 OK", "Thank you for your message."]);
            setIsSending(false);
            setInput('');
        }, 2000);
    } else {
        setLogs(prev => [...prev, "Error: Invalid syntax. Please provide a valid email or message.", "Awaiting input..."]);
        setInput('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto font-mono text-sm mt-12">
        <div className="bg-[#1a1a1a] rounded-t-lg p-3 flex items-center gap-2 border border-white/10 border-b-0">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-gray-500 text-xs flex items-center gap-2"><Terminal size={12}/> contact_daemon.sh</div>
        </div>
        
        <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-b-lg p-6 min-h-[300px] flex flex-col shadow-2xl">
            <div ref={logsRef} className="flex-1 overflow-y-auto mb-4 space-y-1 text-green-400/80 font-light scrollbar-hide">
                {logs.map((log, i) => (
                    <div key={i} className="break-words">
                        <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                        {log}
                    </div>
                ))}
                {isSending && (
                    <div className="animate-pulse text-blue-400">Processing... <span className="inline-block w-2 h-4 bg-blue-400 align-middle ml-1"></span></div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 pt-4">
                <span className="text-blue-500 font-bold">{'>'}</span>
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your email or message..."
                    className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 placeholder:text-gray-700"
                    disabled={isSending}
                />
                <button 
                    type="submit" 
                    disabled={isSending}
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    </div>
  );
};

export default TerminalContact;
