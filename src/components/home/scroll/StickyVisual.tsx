import { motion } from 'framer-motion';

export const StickyVisual = () => {
    return (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Glow */}
            <div className="absolute w-[800px] h-[800px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Dynamic Visual Elem - could be replaced with 3D model later */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
            >
                <div className="absolute inset-0 border border-gold-500/20 rounded-full" />
                <div className="absolute inset-8 border border-black/5 rounded-full" />
                <div className="absolute inset-[15%] w-[70%] h-[70%] bg-gold-500/10 backdrop-blur-3xl rounded-full" />
            </motion.div>
        </div>
    );
};
