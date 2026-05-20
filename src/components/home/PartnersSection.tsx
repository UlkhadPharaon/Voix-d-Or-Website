import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const partners = [
    { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
    { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
    { name: "Teeg Wend Prod", logo: "/assets/brands/Teeg Wend Prod.jpg" },
    { name: "Sentinelle Prod", logo: "/assets/brands/Sentinelle Production.jpg" },
    { name: "Nafadou", logo: "/assets/brands/NAFADOU.jpg" },
    { name: "BBDA", logo: "/assets/brands/BBDA.jpg" },
    { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
    { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
    { name: "Teeg Wend Prod", logo: "/assets/brands/Teeg Wend Prod.jpg" },
    { name: "Sentinelle Prod", logo: "/assets/brands/Sentinelle Production.jpg" },
    { name: "Nafadou", logo: "/assets/brands/NAFADOU.jpg" },
    { name: "BBDA", logo: "/assets/brands/BBDA.jpg" },
    { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
    { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
];

// Configuration for the "Hanging Threads" layout
// Each column has specific items, a top offset, and animation delay
const columns = [
    { items: [partners[0], partners[1]], offset: 'mt-0', delay: 0 },
    { items: [partners[2], partners[3]], offset: 'mt-12', delay: 1 },
    { items: [partners[4], partners[5]], offset: 'mt-24', delay: 2 },
    { items: [partners[6]], offset: 'mt-40', delay: 3 }, // Center Low
    { items: [partners[7], partners[8]], offset: 'mt-24', delay: 2 },
    { items: [partners[9], partners[10]], offset: 'mt-12', delay: 1 },
    { items: [partners[11], partners[12]], offset: 'mt-0', delay: 0 },
];

export const PartnersSection = () => {
    return (
        <section className="bg-vantablack py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 faso-pattern z-0 pointer-events-none opacity-[0.1]"></div>
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-vantablack to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vantablack to-transparent z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">

                {/* Text Content - Positioned absolutely to sit in the "arch" */}
                {/* In this specific layout, we'll place it centrally overlapping/below the cards */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[60%] z-20 text-center w-full max-w-2xl pointer-events-none mix-blend-screen">
                    {/* This text sits BEHIND/Mixes with content or strictly in the negative space. 
                         Given the reference, let's put it clearly in the visual center. */}
                </div>

                {/* The Grid / Threads */}
                <div className="flex justify-center gap-4 md:gap-8 min-h-[600px]">
                    {columns.map((col, colIndex) => (
                        <div
                            key={colIndex}
                            className={`flex flex-col items-center gap-6 w-full max-w-[140px] ${col.offset}`}
                        >
                            {/* The "Thread" Line */}
                            <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -z-10"></div>

                            {col.items.map((partner, imgIndex) => (
                                <motion.div
                                    key={imgIndex}
                                    initial={{ y: 0 }}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 4 + Math.random() * 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: col.delay + (imgIndex * 0.5)
                                    }}
                                    className="w-full aspect-square rounded-2xl glass-card border border-white/5 p-4 flex items-center justify-center relative group bg-black/40 backdrop-blur-md"
                                >
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 rounded-2xl bg-champagne-gold/0 group-hover:bg-champagne-gold/5 transition-colors duration-500"></div>

                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Text Content (Placed below/overlay correctly) */}
                <div className="text-center relative z-30 mt-[-100px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl mb-8"
                    >
                        <span className="text-champagne-gold text-xs font-monument uppercase tracking-widest">
                            Partenariats
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-display font-medium text-white leading-tight mb-8 drop-shadow-2xl">
                        Ils nous font <br />
                        <span className="font-bold">confiance</span>
                    </h2>

                    <NavLink to="/portfolio">
                        <button className="px-8 py-4 rounded-full bg-white text-vantablack font-bold uppercase tracking-widest text-xs hover:bg-champagne-gold transition-all duration-300 shadow-lg shadow-white/5">
                            Voir le portfolio
                        </button>
                    </NavLink>
                </div>

            </div>
        </section>
    );
};
