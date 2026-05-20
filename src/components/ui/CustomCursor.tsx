import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', moveCursor);

        // Add listeners to all interactive elements
        const buttons = document.querySelectorAll('button, a, input, .cursor-pointer');
        buttons.forEach((b) => {
            b.addEventListener('mouseenter', handleMouseEnter);
            b.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            buttons.forEach((b) => {
                b.removeEventListener('mouseenter', handleMouseEnter);
                b.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    // Re-bind listeners on DOM mutation (for dynamic content)
    useEffect(() => {
        const observer = new MutationObserver(() => {
            const buttons = document.querySelectorAll('button, a, input, .cursor-pointer');
            const handleMouseEnter = () => setIsHovering(true);
            const handleMouseLeave = () => setIsHovering(false);

            buttons.forEach((b) => {
                b.addEventListener('mouseenter', handleMouseEnter);
                b.addEventListener('mouseleave', handleMouseLeave);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-gold-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
            }}
            transition={{ duration: 0.2 }}
        >
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gold-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
    );
};
