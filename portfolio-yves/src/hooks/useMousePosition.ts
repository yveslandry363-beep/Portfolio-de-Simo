import { useState, useEffect } from 'react';

interface Position {
    x: number;
    y: number;
    source: 'mouse' | 'gyro';
}

export const useMousePosition = () => {
    const [position, setPosition] = useState<Position>({ x: 0, y: 0, source: 'mouse' });

    useEffect(() => {
        let isMobile = false;
        // Basic mobile detection
        if (typeof window !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            isMobile = true;
        }

        const updateMouse = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY, source: 'mouse' });
        };

        const updateGyro = (e: DeviceOrientationEvent) => {
            // Beta: Front/Back (-180 to 180). Gamma: Left/Right (-90 to 90).
            // Normalize to approx screen coords for consistency
            const x = (e.gamma || 0) * 15 + window.innerWidth / 2;
            const y = (e.beta || 0) * 15 + window.innerHeight / 2;
            setPosition({ x, y, source: 'gyro' });
        };

        if (isMobile && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
            // iOS 13+ requires permission. We start with mouse listeners as fallback
            // Permission request usually needs a user click, so we default to 'mouse' logic
            // until specific triggering.
            window.addEventListener('mousemove', updateMouse);
        } else if (isMobile && window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', updateGyro);
        } else {
            window.addEventListener('mousemove', updateMouse);
        }

        return () => {
            window.removeEventListener('mousemove', updateMouse);
            window.removeEventListener('deviceorientation', updateGyro);
        };
    }, []);

    return position;
};
