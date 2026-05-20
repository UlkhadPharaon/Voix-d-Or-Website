import React, { useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils'; // Assuming this utility exists, if not I'll just use template literals

interface HolographicCardProps {
    children: ReactNode;
    className?: string;
}

const HolographicCard = ({ children, className }: HolographicCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Intensity of rotation
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
        card.style.setProperty('--opacity', '1');
        card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);

        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        const card = cardRef.current;

        // Reset
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        card.style.setProperty('--x', `50%`);
        card.style.setProperty('--y', `50%`);
        card.style.setProperty('--opacity', '0');
        card.style.setProperty('--bg-x', '50%');
        card.style.setProperty('--bg-y', '50%');
    };

    return (
        <div
            className={cn("holographic-card relative overflow-hidden transition-all duration-300 ease-out bg-[#0a0a0a] border border-white/5", className)}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Mouse follow glow */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0"
                style={{
                    opacity: 'var(--opacity, 0)',
                    background: `radial-gradient(600px circle at var(--x) var(--y), rgba(212, 175, 55, 0.15), transparent 40%)`,
                }}
            />

            <div className="holo-content relative z-10 h-full">
                {children}
            </div>

            {/* Holographic Glow Effect */}
            <div className="holo-glow absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-0 transition-opacity duration-300"></div>

            {/* Border shine with gold hint */}
            <div className="holo-border absolute inset-0 pointer-events-none z-20 border border-white/10 rounded-[inherit] group-hover:border-gold/30 transition-colors duration-500"></div>
        </div>
    );
};

export default HolographicCard;
