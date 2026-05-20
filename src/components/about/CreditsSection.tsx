import { motion } from 'framer-motion';
import { CircularTestimonials } from '@/components/ui/circular-testimonials';

const teamTestimonials = [
    {
        name: "Kheops",
        designation: "Fondateur & Directeur Artistique",
        quote: "Visionnaire et créatif, Kheops est le moteur du Studio Voix d’Or. Depuis son enfance, il nourrit une passion pour l’audiovisuel. Aujourd’hui, il guide chaque projet avec une vision audacieuse, mêlant innovation et émotion, pour donner vie aux rêves de ses clients.",
        src: "/assets/team/Kheops.webp",
    },
    {
        name: "MK",
        designation: "Manager d'Artistes & Stratège Musical",
        quote: "Pilier stratégique et relationnel, MK est le catalyseur de talent au sein du Studio Voix d'Or. Expert dans le développement de carrières, il accompagne chaque artiste avec une précision redoutable, alignant vision créative et domination de l'industrie pour propulser leurs œuvres vers les sommets.",
        src: "/assets/team/MK.webp",
    },
    {
        name: "Chris Joël",
        designation: "Cadreur, Photographe",
        quote: "Derrière l’objectif, Chris Joël capte des émotions authentiques. Photographe et cadreur passionné, il sublime chaque scène grâce à un regard artistique affûté, transformant chaque instant en image forte.",
        src: "/assets/team/Chris_Joel.png",
    },
    {
        name: "Poloxi",
        designation: "Expert en son",
        quote: "Expert en son, Poloxi apporte une maîtrise technique exceptionnelle à chaque projet. Son objectif : guider les artistes à atteindre leur pleine vision dans leurs œuvres musicales.",
        src: "/assets/team/Poloxi.webp",
    },
    {
        name: "Ulkhad Pharaon",
        designation: "Responsable Production Vidéo & VFX Artist",
        quote: "Ulkhad Pharaon intervient dans tout le processus de production, du scénario à la post-production. Il transforme chaque projet en création visuelle de haut niveau, alliant technique et émotion.",
        src: "/assets/team/Ulkhad.webp",
    },
    {
        name: "Inoss",
        designation: "Responsable Sonorisation & Technique Terrain",
        quote: "Inoss gère toute l'infrastructure audio en direct et la logistique lors des prestations. Il assure une fiabilité absolue sur chaque plateau, alliant polyvalence et efficacité redoutable.",
        src: "/assets/team/Pape.webp",
    },
    {
        name: "BNV",
        designation: "Beatmaker, Arrangeur & Mixeur Audio",
        quote: "BNV est l’artisan du rythme et de la mélodie au sein du studio. Grâce à son expertise en beatmaking, en arrangement et en mixage, il façonne des sons riches et mémorables, adaptés à chaque univers artistique.",
        src: "/assets/team/BNV.webp",
    }
];

export const CreditsSection = () => {
    return (
        <section className="py-32 px-6 bg-vantablack border-t border-white/5 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Créez sans limites
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold text-charcoal uppercase tracking-tight font-display mb-4">
                        Notre Équipe
                    </h3>
                    <div className="w-20 h-[1px] bg-[#D4AF37]/40" />
                </motion.div>

                {/* Circular Testimonials Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center"
                >
                    <CircularTestimonials
                        testimonials={teamTestimonials}
                        autoplay={true}
                        colors={{
                            name: "#121212",
                            designation: "#D4AF37",
                            testimony: "#666666",
                            arrowBackground: "#f5f5f5",
                            arrowForeground: "#D4AF37",
                            arrowHoverBackground: "#e0e0e0",
                        }}
                        fontSizes={{
                            name: "28px",
                            designation: "12px",
                            quote: "18px",
                        }}
                    />
                </motion.div>
            </div>
        </section>
    );
};
