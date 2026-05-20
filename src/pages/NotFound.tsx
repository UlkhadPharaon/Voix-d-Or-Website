import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="min-h-screen w-full bg-white flex flex-col items-center justify-center relative overflow-hidden px-6"
        >
            {/* 👻 GHOST TYPOGRAPHY (404) */}
            <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{
                    opacity: 0.05,
                    y: [0, -20, 0],
                }}
                transition={{
                    opacity: { duration: 2 },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute inset-0 flex items-center justify-center z-0 select-none pointer-events-none"
            >
                <h2 className="text-[30vw] md:text-[40vw] font-monument font-bold text-[#C5A059] tracking-tighter">
                    404
                </h2>
            </motion.div>

            {/* 🛡️ CONTENT CONTAINER */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-[#C5A059] text-xs font-bold uppercase tracking-[0.4em] mb-6 block font-satoshi"
                >
                    Erreur de Fréquence
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-monument text-gray-900 mb-8 uppercase tracking-tight"
                >
                    Hors-<span className="text-[#C5A059]">Champ.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="text-gray-500 font-satoshi font-light text-lg md:text-xl leading-relaxed mb-12"
                >
                    La fréquence que vous cherchez n'existe plus ou a été re-routée.
                    <br />
                    Ne restez pas dans le silence.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                >
                    <NavLink to="/">
                        <MagneticButton>
                            <div className="group relative bg-white border border-[#C5A059]/30 px-10 py-5 rounded-sm hover:border-[#C5A059] transition-all duration-500 hover:shadow-[0_20px_40px_rgba(197,160,89,0.1)] flex items-center gap-3">
                                <ArrowLeft size={18} className="text-[#C5A059] transition-transform group-hover:-translate-x-1" />
                                <span className="font-monument text-[10px] uppercase tracking-[0.3em] text-gray-900">
                                    Retourner au Studio
                                </span>
                            </div>
                        </MagneticButton>
                    </NavLink>
                </motion.div>
            </div>

            {/* Subtle Gradient Overlays for depth */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </motion.div>
    );
};

export default NotFound;
