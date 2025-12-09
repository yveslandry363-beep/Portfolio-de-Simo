import React, { useRef, useEffect } from 'react';
import { getAnalyser } from '../utils/audio';

interface AudioVisualizerProps {
    isActive: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrame: number;
        
        const render = () => {
            animationFrame = requestAnimationFrame(render);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!isActive) {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                ctx.fillRect(0, canvas.height / 2, canvas.width, 1);
                return;
            }

            const analyser = getAnalyser();
            if (analyser) {
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                analyser.getByteFrequencyData(dataArray);
                
                const barWidth = (canvas.width / bufferLength) * 2.5;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = dataArray[i] / 2;
                    ctx.fillStyle = `rgb(${barHeight + 100}, ${barHeight + 100}, 255)`;
                    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
                    x += barWidth + 1;
                }
            }
        };

        render();
        return () => cancelAnimationFrame(animationFrame);
    }, [isActive]);

    return (
        <canvas ref={canvasRef} width="60" height="24" className="mr-4 mix-blend-screen hidden md:block" />
    );
};

export default AudioVisualizer;