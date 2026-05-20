import { motion } from 'framer-motion';
import HolographicCard from '@/components/ui/holographic-card';

const advantages = [
    {
        number: "01",
        title: "Satisfaction absolue",
        description: "Nous plaçons votre satisfaction au cœur de tout ce que nous créons. Chaque projet est une collaboration sincère.",
        image: "/assets/images/Onset_image13.webp",
        delay: 0
    },
    {
        number: "02",
        title: "Rapidité & maîtrise",
        description: "Nous savons que le temps est votre ressource la plus précieuse. Nous livrons des résultats professionnels à une vitesse record.",
        image: "/assets/images/Onset_image10.webp",
        delay: 0.2
    },
    {
        number: "03",
        title: "Savoir rêver grand et l'accomplir",
        description: "Nous vous aidons à repousser les limites de la création, pour donner vie à des projets qui inspirent et transcendent.",
        image: "/assets/images/Onset_image5.webp",
        delay: 0.4
    }
];

export const AdvantagesSection = () => {
    return (
        <section className="relative py-32 bg-vantablack text-white overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-gold uppercase tracking-widest text-xs font-bold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
                        Notre offre
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-4 leading-tight">
                        Une collaboration <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                            fluide et continue
                        </span>
                    </h2>
                    <p className="text-white/70 max-w-2xl mx-auto text-lg font-light">
                        Unifiez vos équipes et vos ambitions. Nous comblons le fossé entre l'idée et la réalisation avec une simplicité déconcertante.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {advantages.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: item.delay }}
                            className="h-full group"
                        >
                            <HolographicCard className="rounded-3xl h-[550px] flex flex-col overflow-hidden border-white/5 relative bg-transparent">
                                {/* Image Background with Surgical Gradient */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />
                                </div>

                                {/* Card Content */}
                                <div className="relative z-20 p-8 flex flex-col h-full justify-end">
                                    <div className="mt-auto">
                                        <div className="text-[#C5A059] font-monument text-sm mb-4 opacity-100 drop-shadow-md">
                                            {item.number}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-[#C5A059] transition-colors duration-300 drop-shadow-lg [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
                                            {item.title}
                                        </h3>
                                        <p className="text-[#C5A059] leading-relaxed text-sm font-light opacity-100 drop-shadow-md [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Interactive Aura / Golden Glow */}
                                    <div className="relative h-24 overflow-hidden pointer-events-none">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gold/20 blur-[60px] rounded-full group-hover:bg-gold/40 transition-all duration-700" />

                                        {/* Particle Lines */}
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end gap-1">
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-[1px] bg-gradient-to-t from-gold to-transparent origin-bottom"
                                                    style={{ height: `${30 + Math.random() * 50}px` }}
                                                    animate={{
                                                        scaleY: [0.3, 1, 0.3],
                                                        opacity: [0.2, 0.8, 0.2]
                                                    }}
                                                    transition={{
                                                        duration: 2 + Math.random() * 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </HolographicCard>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
