import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT, MOTION } from '@/data/cinematic_constants';
import { ArrowDown } from 'lucide-react';
import Magnetic from './Magnetic';

const Hero: React.FC = () => {
    return (
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-[#050505]">

            {/* Luxury Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-[#D4AF37]/10 to-transparent opacity-40" />
                <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-[#D4AF37]/5 to-transparent opacity-30" />
            </div>

            <motion.div
                variants={MOTION.staggerContainer}
                initial="hidden"
                animate="visible"
                className="z-10 max-w-6xl mx-auto flex flex-col items-center"
            >
                <motion.div variants={MOTION.fadeUp} className="mb-8 relative">
                    <span className="text-[#D4AF37] text-xs tracking-[0.4em] uppercase font-light">
                        Cinematic Launch™
                    </span>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                </motion.div>

                <motion.h1
                    variants={MOTION.fadeUp}
                    className="text-5xl md:text-8xl font-display font-normal tracking-wide leading-[1.2] mb-10 text-white"
                >
                    <span className="block">{CONTENT.hero.title}</span>
                    <span className="block text-[#D4AF37] italic font-serif text-4xl md:text-6xl mt-4 opacity-90">
                        {CONTENT.hero.subtitle}
                    </span>
                </motion.h1>

                <motion.p
                    variants={MOTION.fadeUp}
                    className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-16 font-light leading-8 tracking-wide font-satoshi"
                >
                    {CONTENT.hero.description}
                </motion.p>

                <motion.div variants={MOTION.fadeUp}>
                    <Magnetic>
                        <button className="relative px-12 py-4 border border-[#D4AF37]/30 text-white hover:border-[#D4AF37] transition-all duration-700 group overflow-hidden">
                            <span className="relative z-10 font-display text-sm tracking-[0.2em] group-hover:text-black transition-colors duration-500">
                                {CONTENT.hero.cta}
                            </span>
                            <div className="absolute inset-0 bg-[#D4AF37] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                        </button>
                    </Magnetic>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#D4AF37]/50"
            >
                <ArrowDown size={20} strokeWidth={1} />
            </motion.div>
        </section>
    );
};

export default Hero;
