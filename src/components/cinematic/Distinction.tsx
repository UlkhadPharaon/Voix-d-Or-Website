import React from 'react';
import { motion, useInView } from 'framer-motion';
import { CONTENT } from '@/data/cinematic_constants';
import { Diamond, Star, Crown } from 'lucide-react';
import SkewCards from '@/components/ui/gradient-card-showcase';
import type { SkewCardData } from '@/components/ui/gradient-card-showcase';

const icons = [
    <Crown size={32} strokeWidth={1} />,
    <Star size={32} strokeWidth={1} />,
    <Diamond size={32} strokeWidth={1} />,
];

// Gold-themed gradient variations for each card
const gradients = [
    { from: '#D4AF37', to: '#8B6914' },   // Classic gold
    { from: '#D4AF37', to: '#B8860B' },   // Dark gold
    { from: '#D4AF37', to: '#DAA520' },   // Goldenrod
];

const Distinction: React.FC = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const skewCards: SkewCardData[] = CONTENT.distinction.stats.map((stat, index) => ({
        title: stat.value,
        desc: (
            <>
                <span className="block text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-4">
                    {stat.title}
                </span>
                <span className="block">{stat.desc}</span>
            </>
        ),
        gradientFrom: gradients[index].from,
        gradientTo: gradients[index].to,
        icon: icons[index],
    }));

    return (
        <section id="distinction" ref={ref} className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
            {/* Subtle Luxury Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    className="mb-10 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                        Philosophie
                    </span>
                    <h2 className="text-4xl md:text-6xl font-display font-normal text-white mb-4">
                        {CONTENT.distinction.title}
                    </h2>
                    <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto my-6"></div>
                    <p className="text-gray-400 text-xl font-light italic font-serif">
                        "{CONTENT.distinction.subtitle}"
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <SkewCards cards={skewCards} />
                </motion.div>
            </div>
        </section>
    );
};

export default Distinction;
