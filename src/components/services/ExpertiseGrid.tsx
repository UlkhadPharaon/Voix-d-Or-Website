import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { NavLink } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';

const services = [
    {
        id: "tv",
        title: "Spot Publicitaire",
        description: "Votre arme de persuasion. Des campagnes taillées pour capturer l'attention et déclencher l'acte d'achat.",
        button: "Découvrir",
        src: "/assets/images/spot publicitaire horizontale.webp",
        href: "/services?cat=tv",
    },
    {
        id: "clip",
        title: "Clip Vidéo",
        description: "L'esthétique qui forge les légendes. Votre univers sonore en une claque visuelle qui domine les plateformes.",
        button: "Découvrir",
        src: "/assets/images/Onset_image9.webp",
        href: "/services?cat=clip",
    },
    {
        id: "prod",
        title: "Production Vidéo",
        description: "Films corporate et documentaires captivants qui inspirent un respect immédiat aux investisseurs.",
        button: "Découvrir",
        src: "/assets/images/Onset_image12.webp",
        href: "/services?cat=prod",
    },
    {
        id: "post",
        title: "Post-Production",
        description: "Précision technique, esthétique cinéma et impact émotionnel. Du montage à la livraison broadcast.",
        button: "Découvrir",
        src: "/assets/images/post production.webp",
        href: "/services?cat=post",
    },
    {
        id: "audio",
        title: "Audio & Composition",
        description: "La fréquence de l'excellence. Un sanctuaire acoustique pour donner une dimension épique à vos projets.",
        button: "Découvrir",
        src: "/assets/images/Audio verticale.webp",
        href: "/services?cat=audio",
    },
    {
        id: "mdf",
        title: "Musique de Film",
        description: "Des compositions orchestrales et électroniques taillées pour le cinéma. L'âme de votre œuvre.",
        button: "Découvrir",
        src: "/assets/images/Musique de Film.webp",
        href: "/musique-de-film",
    },
    {
        id: "formation",
        title: "Académie / Formation",
        description: "L'élite de demain se forge ici. Ingénierie audiovisuelle et effets visuels complexes.",
        button: "Le Pacte",
        src: "/assets/images/for formation 2.webp",
        href: "/formation",
    },
];

export const ExpertiseGrid = () => {
    const plugin = useRef(
        Autoplay({ delay: 3500, stopOnInteraction: true })
    );

    return (
        <section className="relative py-10 pb-32 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne-gold/[0.03] blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="container mx-auto px-6 relative"
            >
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    plugins={[plugin.current]}
                    onMouseEnter={() => plugin.current.stop()}
                    onMouseLeave={() => plugin.current.reset()}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4 md:-ml-6 py-4">
                        {services.map((service) => (
                            <CarouselItem key={service.id} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                                <NavLink to={service.href} className="block group">
                                    <div className="relative h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                                        {/* Background Image */}
                                        <div className="absolute inset-0 z-0">
                                            <img
                                                src={service.src}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>

                                        {/* Content */}
                                        <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                                            <div className="mb-4">
                                                <h3 className="text-2xl md:text-3xl font-monument text-white uppercase tracking-tight group-hover:text-gold transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <div className="w-12 h-1 bg-gold mt-4 group-hover:w-24 transition-all duration-500" />
                                            </div>

                                            <p className="text-white/70 font-satoshi text-sm leading-relaxed mb-8 opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                {service.description}
                                            </p>

                                            <div className="flex items-center gap-2 text-gold font-monument text-[10px] uppercase tracking-widest">
                                                <span>{service.button}</span>
                                                <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    {/* Desktop Arrows */}
                    <div className="hidden md:block">
                        <CarouselPrevious className="left-[-2rem] lg:left-[-3.5rem] h-12 w-12 bg-black/40 border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 backdrop-blur-md" />
                        <CarouselNext className="right-[-2rem] lg:right-[-3.5rem] h-12 w-12 bg-black/40 border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 backdrop-blur-md" />
                    </div>
                    
                    {/* Mobile Arrows */}
                    <div className="flex justify-center gap-6 mt-8 md:hidden">
                        <CarouselPrevious className="static translate-y-0 h-12 w-12 bg-black/40 border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 backdrop-blur-md" />
                        <CarouselNext className="static translate-y-0 h-12 w-12 bg-black/40 border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 backdrop-blur-md" />
                    </div>
                </Carousel>
            </motion.div>
        </section>
    );
};
