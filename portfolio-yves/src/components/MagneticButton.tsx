import React, { useRef, ReactNode, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number; // How strong the magnet is (0.1 to 1)
    as?: React.ElementType;
    onClick?: () => void;
    [key: string]: any;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className = "",
    strength = 0.5,
    as: Component = "button",
    onClick,
    ...props
}) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const mouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = element.getBoundingClientRect();

            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            // Attraction Logic
            xTo(x * strength);
            yTo(y * strength);
        };

        const mouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        element.addEventListener("mousemove", mouseMove);
        element.addEventListener("mouseleave", mouseLeave);

        return () => {
            element.removeEventListener("mousemove", mouseMove);
            element.removeEventListener("mouseleave", mouseLeave);
        };
    }, [strength]);

    return (
        <Component
            ref={ref}
            className={`relative inline-block ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
};

export default MagneticButton;
