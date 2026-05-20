import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        service: "Spot Publicitaire",
        text: "Le Studio Voix d’Or a produit notre spot avec une créativité et une précision rares. Le message est clair, l’impact immédiat, l’équipe a su traduire notre brief en une campagne qui résonne.",
        author: "Directeur Marketing",
        role: "Campagne Corporate",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    {
        service: "Clip Vidéo",
        text: "Pour mon dernier single, Kheops et son équipe ont transformé ma vision en images. Le clip a augmenté ma visibilité et a donné une identité forte à ma musique.",
        author: "Artiste Musicien",
        role: "Production Musicale",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop"
    },
    {
        service: "Post-Production",
        text: "Résultat : étalonnage impeccable, mix audio précis et rythme narratif maîtrisé. Une prestation « Hollywood-grade » avec une vraie écoute client.",
        author: "Responsable Com.",
        role: "Film Institutionnel",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
    },
    {
        service: "Campagne 360",
        text: "Un partenaire stratégique qui comprend les enjeux du marché. Leur approche créative a considérablement augmenté notre engagement.",
        author: "Fatou Traoré",
        role: "CEO, Innov'Africa",
        image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=100&auto=format&fit=crop"
    },
    {
        service: "Brand Content",
        text: "L'excellence à l'état pur. De la pré-production à la post-prod, tout est géré avec une rigueur et une créativité impressionnantes.",
        author: "Jean-Paul Diop",
        role: "Canal+ Afrique",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
    }
];

export const TestimonialsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(2); // Start in middle

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const getCardStyle = (index: number) => {
        const diff = (index - currentIndex + testimonials.length) % testimonials.length;
        // Adjust diff to handle circular wrap logic closely centered around 0
        let effectiveDiff = diff;
        if (diff > testimonials.length / 2) effectiveDiff -= testimonials.length;

        // Only show 5 items max: -2, -1, 0, 1, 2
        if (Math.abs(effectiveDiff) > 2) return { opacity: 0, display: 'none' };

        const rotate = effectiveDiff * 15; // 15deg rotation per step
        const y = Math.abs(effectiveDiff) * 40; // Arch effect: Move down as we go out
        const scale = 1 - Math.abs(effectiveDiff) * 0.1;
        const opacity = 1 - Math.abs(effectiveDiff) * 0.3;
        const zIndex = 10 - Math.abs(effectiveDiff);

        return {
            rotate,
            y,
            scale,
            opacity,
            zIndex,
            x: effectiveDiff * 360 // Horizontal spacing
        };
    };

    return (
        <section className="bg-vantablack py-32 relative overflow-hidden min-h-[800px] flex flex-col justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-subtle-smoke opacity-40 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <header className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-monument text-white uppercase tracking-widest mb-4">
                        Ce que <span className="text-transparent bg-clip-text bg-gold-gradient">disent nos clients</span>
                    </h2>
                    <p className="text-white/40 font-satoshi text-sm uppercase tracking-[0.2em]">
                        Ils nous ont fait confiance
                    </p>
                </header>

                {/* 3D Carousel Container */}
                <div className="relative h-[450px] flex items-center justify-center perspective-[1000px]">
                    <AnimatePresence mode='popLayout'>
                        {testimonials.map((item, index) => {
                            const style = getCardStyle(index);
                            if (style.display === 'none') return null;

                            return (
                                <motion.div
                                    key={index}
                                    className="absolute"
                                    initial={false}
                                    animate={{
                                        rotate: style.rotate,
                                        y: style.y,
                                        x: style.x,
                                        scale: style.scale,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    style={{
                                        transformOrigin: "bottom center",
                                        height: '400px',
                                        left: '50%',
                                    }}
                                >
                                    <div className="w-[300px] sm:w-[350px] md:w-[400px] -ml-[150px] sm:-ml-[175px] md:-ml-[200px] h-full p-6 md:p-8 glass-card border-t border-white/5 rounded-2xl flex flex-col justify-between relative overflow-hidden">
                                        {/* Liquid Border Effect */}
                                        <div className="liquid-border opacity-30"></div>

                                        <div>
                                            <div className="flex justify-between items-start mb-6">
                                                <h3 className="font-monument text-lg text-white leading-tight">
                                                    {item.service}
                                                </h3>
                                                <Quote className="text-champagne-gold/40 w-8 h-8 rotate-180" />
                                            </div>

                                            <p className="font-satoshi text-white/70 text-lg leading-relaxed italic">
                                                "{item.text}"
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-champagne-gold/30">
                                                <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-monument text-xs text-white uppercase tracking-wider">{item.author}</p>
                                                <p className="text-champagne-gold text-xs font-satoshi mt-1">{item.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center justify-center mt-12 gap-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-bed-black hover:border-white transition-all duration-300 group"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>

                        {/* Progress Indicators */}
                        <div className="flex items-center gap-2">
                            {testimonials.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-[2px] transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-champagne-gold' : 'w-4 bg-white/10'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-vantablack hover:border-white transition-all duration-300 group"
                        >
                            <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
