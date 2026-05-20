import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll during preload
    document.body.style.overflow = 'hidden';

    // Counter simulation
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 800); // Wait a bit at 100%
          return 100;
        }
        // Random increment for realistic "loading" feel
        const increment = Math.floor(Math.random() * 10) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = ''; // Restore scroll
    }
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] text-[#D4AF37]"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="flex flex-col items-center">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-6xl md:text-9xl font-cinzel font-bold tracking-tighter"
                >
                    {count}%
                </motion.div>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "200px" }}
                    transition={{ duration: 1.5 }}
                    className="h-[1px] bg-[#D4AF37] mt-8"
                />
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 text-xs uppercase tracking-[0.4em] text-gray-400"
                >
                    Initialisation de l'Héritage
                </motion.p>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;