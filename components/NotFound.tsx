
import React from 'react';
import { Link } from 'react-router-dom';
import TextScramble from './TextScramble';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <h1 className="text-[20vw] font-['Syne'] font-bold leading-none text-transparent stroke-white opacity-20" style={{ WebkitTextStroke: '2px white' }}>
        404
      </h1>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-center">
              <TextScramble text="SYSTEM ERROR" />
          </h2>
          <p className="text-gray-400 mb-8 font-mono max-w-md text-center">
              The quantum sector you are looking for has collapsed or does not exist in this dimension.
          </p>
          <Link 
            to="/" 
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
            data-cursor="link"
          >
              Return to Base
          </Link>
      </div>
    </div>
  );
};

export default NotFound;
