
import React from 'react';
import { Code, Database, Cpu, Globe, Server, Layers } from 'lucide-react';

const TechLogos: React.FC = () => {
  const techs = [
      { name: "React", icon: <Globe /> },
      { name: "Python", icon: <Code /> },
      { name: "TensorFlow", icon: <Cpu /> },
      { name: "PostgreSQL", icon: <Database /> },
      { name: "Node.js", icon: <Server /> },
      { name: "WebGL", icon: <Layers /> },
  ];

  return (
    <div className="py-12 border-t border-white/10 mt-12">
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-8">Technology Stack</h4>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 opacity-60">
            {techs.map((tech, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-3 group hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-blue-400/50 transition-colors">
                        {React.cloneElement(tech.icon as any, { size: 24, className: "group-hover:text-blue-300 transition-colors" })}
                    </div>
                    <span className="text-xs font-mono">{tech.name}</span>
                </div>
            ))}
        </div>
    </div>
  );
};

export default TechLogos;
