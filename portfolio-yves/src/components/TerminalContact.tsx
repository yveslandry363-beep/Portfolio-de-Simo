
import React, { useState, useRef, useEffect } from 'react';
import { Send, Terminal } from 'lucide-react';
import emailjs from '@emailjs/browser';
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
        if (logsRef.current) {
            logsRef.current.scrollTop = logsRef.current.scrollHeight;
        }
    }, [logs]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setLogs(prev => [...prev, `> user: ${input}`]);

        // Check if it looks like an email or a message
        // In this terminal format, we treat the input as the MESSAGE body for simplicity, 
        // or we assume they are typing "email: message"

        setIsSending(true);
        setLogs(prev => [...prev, "Analysing packet...", "Encrypting payload..."]);

        // EMAILJS CONFIGURATION
        // TODO: USER MUST REPLACE THESE WITH REAL KEYS FROM EMAILJS.COM
        const SERVICE_ID = "service_id_placeholder";
        const TEMPLATE_ID = "template_id_placeholder";
        const PUBLIC_KEY = "public_key_placeholder";

        try {
            if (SERVICE_ID === "service_id_placeholder") {
                // Fallback if keys are not set
                throw new Error("CONFIGURATION_MISSING");
            }

            await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
                message: input,
                to_name: "Yves-Landry",
                reply_to: "visitor@portfolio.com" // ideally ask for email in a second step
            }, PUBLIC_KEY);

            setLogs(prev => [...prev, "SUCCESS: Packet sent to yveslandry363@gmail.com", "Server response: 200 OK"]);
        } catch (error: any) {
            console.error("Email Error:", error);

            if (error.message === "CONFIGURATION_MISSING") {
                setLogs(prev => [...prev, "WARN: Email Dispatcher not configured (Missing API Keys).", "Redirecting to local mail client..."]);
                setTimeout(() => {
                    window.location.href = `mailto:yveslandry363@gmail.com?subject=Prise de contact sur ton site&body=${encodeURIComponent(input)}`;
                }, 1500);
            } else {
                setLogs(prev => [...prev, `ERROR: Transmission failed.`, "Redirecting to fallback protocol..."]);
                setTimeout(() => {
                    window.location.href = `mailto:yveslandry363@gmail.com?subject=Contact Error Fallback&body=${encodeURIComponent(input)}`;
                }, 2000);
            }
        } finally {
            setIsSending(false);
            setInput('');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto font-mono text-sm mt-12">
            <div className="bg-[#1a1a1a] rounded-t-lg p-3 flex items-center gap-2 border border-white/10 border-b-0">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-gray-500 text-xs flex items-center gap-2"><Terminal size={12} /> contact_daemon.sh</div>
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
                        placeholder="Type your message here and press Enter..."
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
