import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface LuxuryButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    className?: string;
}

export const LuxuryButton: React.FC<LuxuryButtonProps> = ({
    children,
    variant = 'primary',
    className,
    ...props
}) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative px-8 py-3 uppercase tracking-widest text-xs font-semibold overflow-hidden transition-all duration-300",
                "border border-white/10 rounded-none", // Luxury sharp corners

                // Primary: Deep Gold Glass
                variant === 'primary' && "bg-gold-500/10 text-gold-500 hover:bg-gold-500 hover:text-black hover:shadow-[0_0_40px_-10px_rgba(212,175,55,0.6)] backdrop-blur-sm",

                // Secondary: Void Black
                variant === 'secondary' && "bg-black/50 text-white hover:bg-white hover:text-black border-white/20",

                // Outline: Simple
                variant === 'outline' && "bg-transparent text-white/70 hover:text-white hover:border-gold-500/50",

                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {children}
            </span>

            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 -translate-x-full hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out pointer-events-none" />
        </motion.button>
    );
};
