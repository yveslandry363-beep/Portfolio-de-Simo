
import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const LiveTime: React.FC = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format for Germany (CET/CEST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-gray-500 text-sm font-mono uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10 w-fit">
      <Clock size={14} className="text-blue-400 animate-pulse" />
      <span>GER {time}</span>
    </div>
  );
};

export default LiveTime;
