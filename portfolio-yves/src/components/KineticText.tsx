import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface KineticTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
    style?: React.CSSProperties;
    [key: string]: any;
}

const KineticText: React.FC<KineticTextProps> = ({ text, className = "", as: Tag = 'h2', style, ...props }) => {
    const containerRef = useRef<any>(null);

    useGSAP(() => {
        // Split text into words/chars if needed, but for weight interpolation
        // we can animate the container's font-weight variations

        // We want the text to get "heavier" as it centers in the viewport
        // and "lighter" at the edges.

        gsap.fromTo(containerRef.current,
            {
                fontVariationSettings: "'wght' 200, 'wdth' 100", // Start Light & Narrow
                opacity: 0.5
            },
            {
                fontVariationSettings: "'wght' 800, 'wdth' 125", // End Bold & Wide
                opacity: 1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    end: "top 40%",
                    scrub: 0.5,
                    toggleActions: "play reverse play reverse"
                }
            }
        );

        // Exit animation (fade out/lighten as it goes up)
        gsap.to(containerRef.current, {
            fontVariationSettings: "'wght' 200, 'wdth' 100",
            opacity: 0.5,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom 40%",
                end: "bottom 0%",
                scrub: 0.5
            }
        });

    }, { scope: containerRef });

    return (
        <Tag ref={containerRef} className={`block will-change-transform ${className}`} style={style} {...props}>
            {text}
        </Tag>
    );
};

export default KineticText;
