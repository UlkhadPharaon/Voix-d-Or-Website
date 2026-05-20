import { motion } from 'framer-motion';

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-vantablack flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            onAnimationComplete={onComplete}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative"
            >
                <div className="absolute inset-0 bg-champagne-gold/20 blur-[100px] rounded-full" />
                <h1 className="font-monument text-4xl md:text-6xl text-white font-bold tracking-widest relative z-10">
                    VOIX <span className="text-transparent bg-clip-text bg-gold-gradient">D'OR</span>
                </h1>
                <motion.div
                    className="h-[1px] bg-champagne-gold mt-4 w-0 mx-auto"
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
};
