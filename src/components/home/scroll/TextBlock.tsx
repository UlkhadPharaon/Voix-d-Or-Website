import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TextBlockProps {
    number: string;
    title: string;
    description: string;
}

export const TextBlock = ({ number, title, description }: TextBlockProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
    const y = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [50, 0, -50]);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className="flex flex-col justify-center h-screen px-4 md:px-0 max-w-xl"
        >
            <div className="text-6xl md:text-8xl font-monument text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent mb-6 select-none">
                {number}
            </div>
            <h3 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
                {title}
            </h3>
            <p className="text-white/60 font-satoshi font-light leading-relaxed text-lg md:text-xl">
                {description}
            </p>
        </motion.div>
    );
};
