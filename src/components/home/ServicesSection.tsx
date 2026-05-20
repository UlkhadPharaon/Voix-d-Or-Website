import { motion } from 'framer-motion';
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail';

const SERVICE_ITEMS: FocusRailItem[] = [
    {
        id: 1,
        title: "Spot Publicitaire",
        description: "Votre arme de persuasion. Des campagnes taillées pour capturer l'attention en 3 secondes et déclencher l'acte d'achat.",
        meta: "Production • Pub",
        imageSrc: "/assets/images/Spot_Publicitaire(verticale).webp",
        href: "/services/spot-publicitaire",
    },
    {
        id: 2,
        title: "Production Vidéo",
        description: "Films corporate et documentaires captivants qui inspirent un respect immédiat à vos investisseurs et partenaires.",
        meta: "Cinéma • Corporate",
        imageSrc: "/assets/images/Production video verticale.webp",
        href: "/services/production-video",
    },
    {
        id: 3,
        title: "Post-Production",
        description: "Précision technique, esthétique cinéma et impact émotionnel. Du montage à la livraison broadcast, sans compromis.",
        meta: "Montage • VFX",
        imageSrc: "/assets/images/post_production_brand.webp",
        href: "/services/post-production",
    },
    {
        id: 4,
        title: "Clip Vidéo",
        description: "L'esthétique qui forge les légendes. Votre univers sonore en une claque visuelle qui domine les plateformes.",
        meta: "Musique • Création",
        imageSrc: "/assets/images/clip video Verticale.webp",
        href: "/services/clip-video",
    },
    {
        id: 5,
        title: "Audio & Composition",
        description: "La fréquence de l'excellence. Un sanctuaire acoustique pour donner une dimension épique à vos projets.",
        meta: "Audio • Studio",
        imageSrc: "/assets/images/Audio verticale.webp",
        href: "/services/audio-composition",
    },
    {
        id: 6,
        title: "Musique de Film",
        description: "Des compositions orchestrales et électroniques taillées pour le cinéma. L'âme de votre œuvre.",
        meta: "Audio • Cinéma",
        imageSrc: "/assets/images/Musique de Film.webp",
        href: "/musique-de-film",
    },
    {
        id: 7,
        title: "Académie / Formation",
        description: "L'élite de demain se forge ici. Ingénierie audiovisuelle et effets visuels complexes.",
        meta: "Formation • Expertise",
        imageSrc: "/assets/images/for formation 2.webp",
        href: "/formation",
    },
];

export const ServicesSection = () => {
    return (
        <section className="relative z-10 py-32 bg-vantablack overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 faso-pattern z-0 pointer-events-none opacity-[0.15]"></div>
            <div className="absolute inset-0 bg-subtle-smoke z-0 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/5 pb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="relative">
                        <div className="absolute -left-6 top-1 w-1 h-full bg-champagne-gold opacity-0 md:opacity-100"></div>
                        <h2 className="text-4xl md:text-6xl font-monument font-bold text-white uppercase tracking-widest leading-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Services</span>
                        </h2>
                        <p className="text-white/70 mt-4 max-w-md font-satoshi text-lg tracking-wide opacity-90 pl-2">
                            Technologie de pointe et vision artistique au service de votre domination.
                        </p>
                    </div>
                    <a href="/services" className="group flex items-center gap-3 text-champagne-gold hover:text-white transition-colors duration-300 cursor-pointer">
                        <span className="uppercase text-xs tracking-[0.2em] font-bold font-monument">Voir tout</span>
                        <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform duration-300 text-lg">arrow_forward</span>
                    </a>
                </motion.div>
            </div>

            {/* FocusRail Carousel — full-width */}
            <FocusRail
                items={SERVICE_ITEMS}
                autoPlay={true}
                interval={5000}
                loop={true}
            />
        </section>
    );
};
