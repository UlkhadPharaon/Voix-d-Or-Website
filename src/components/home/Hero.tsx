import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

// 🎯 Composant Hero principal : Première impression visuelle du site
// Utilise Framer Motion pour des animations fluides et un design épuré
export const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-vantablack py-24 border-b border-white/5">
            {/* Background Effects */}
            <div className="absolute inset-0 faso-pattern z-0 pointer-events-none opacity-[0.15]"></div>
            <div className="absolute inset-0 bg-subtle-smoke z-0 pointer-events-none"></div>

            {/* Central Visual */}
            <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none opacity-40">
                <div className="absolute w-[600px] h-[600px] border border-champagne-gold/10 rounded-full animate-spin-slow"></div>
                <div className="absolute w-[800px] h-[1px] bg-gradient-to-r from-transparent via-champagne-gold/20 to-transparent"></div>

                {/* 🎨 Élément flottant avec lueur dorée — Remplacé par une lueur pure sans image placeholder externe */}
                <div className="relative w-[300px] h-[300px] animate-float">
                    <div
                        className="w-full h-full rounded-full bg-gradient-gold opacity-20 blur-3xl drop-shadow-[0_0_50px_rgba(218,167,47,0.3)]"
                    />
                </div>
            </div>

            {/* Text Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center py-20">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-monument uppercase tracking-wide text-white leading-tight mb-2"
                >
                    Studio <span className="text-transparent bg-clip-text bg-gold-gradient">Voix d'Or</span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-2xl md:text-3xl font-satoshi font-light text-white mb-8 relative inline-block"
                >
                    La voix dorée de la{' '}
                    <span className="relative font-bold text-white">
                        création
                        <svg className="absolute w-[110%] h-[12px] -bottom-2 -left-1 text-champagne-gold" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0 15 Q 50 25 100 15" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                        </svg>
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-white/60 font-satoshi text-lg md:text-xl max-w-2xl mb-12 tracking-wide"
                >
                    Studio panafricain de production audiovisuelle tourné vers l'excellence et l'innovation.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="flex flex-col md:flex-row gap-6 items-center"
                >
                    <NavLink to="/services" className="px-8 py-4 rounded-full bg-black border border-white/10 text-white font-satoshi font-bold uppercase tracking-widest text-xs hover:bg-white/5 hover:border-champagne-gold/50 transition-all duration-300">
                        Voir Nos offres
                    </NavLink>
                    <NavLink to="/contact" className="px-8 py-4 rounded-full bg-champagne-gold text-vantablack font-satoshi font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                        Contactez nous
                    </NavLink>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50"
            >
                <span className="material-symbols-outlined text-champagne-gold text-3xl">keyboard_double_arrow_down</span>
            </motion.div>
        </section>
    );
};
