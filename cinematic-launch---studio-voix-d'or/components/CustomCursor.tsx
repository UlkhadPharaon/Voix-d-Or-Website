import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if the target is interactive (button, link, input, or specifically marked)
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Hide on touch devices strictly via logic
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(212, 175, 55, 0)",
      border: "1px solid #D4AF37",
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(212, 175, 55, 0.1)",
      border: "1px solid rgba(212, 175, 55, 0.5)",
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none mix-blend-difference hidden md:block"
      variants={variants}
      animate={isHovering ? "hover" : "default"}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5
      }}
    >
      {!isHovering && <div className="absolute inset-0 bg-[#D4AF37] opacity-20 blur-md rounded-full" />}
    </motion.div>
  );
};

export default CustomCursor;