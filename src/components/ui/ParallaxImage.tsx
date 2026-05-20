import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxImageProps {
    src: string;
    alt: string;
    className?: string;
    wrapperClassName?: string;
    speed?: number; // 0 to 1, higher is faster parallax
}

export const ParallaxImage = ({ src, alt, className, wrapperClassName }: ParallaxImageProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Calculate Y movement based on scroll progress
    // If speed is 0.2, we move the image by 20% of its height
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    // Smooth out the parallax movement
    const smoothY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.1 });

    return (
        <div ref={ref} className={cn("overflow-hidden relative", wrapperClassName)}>
            <motion.div
                style={{ y: smoothY, scale: 1.1 }} // Scale up slightly to avoid empty edges
                className="w-full h-full"
            >
                <img
                    src={src}
                    alt={alt}
                    className={cn("w-full h-full object-cover", className)}
                />
            </motion.div>
        </div>
    );
};
