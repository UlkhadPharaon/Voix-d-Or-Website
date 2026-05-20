import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, Play, Headphones, Speaker, Wind } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function MusiqueDeFilm() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <div className="bg-[#FAFAFA] min-h-screen text-gray-900 font-satoshi selection:bg-[#C5A059]/30">
            {/* 1. HERO SECTION */}
            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAFAFA]"
            >
                {/* Background Image / Video Placeholder */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/images/Musique de Film.webp"
                        alt="Scoring Background"
                        className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/20 to-black/40 z-10" />
                </div>

                <div className="relative z-30 text-center container px-6 pointer-events-none mt-20">
                    <motion.div style={{ y: textY, opacity: textOpacity }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <NavLink to="/" className="inline-flex items-center text-white/70 hover:text-[#C5A059] transition-colors mb-12 text-xs tracking-[0.2em] uppercase pointer-events-auto border border-white/20 px-6 py-2 rounded-full backdrop-blur-md bg-black/30">
                                <ArrowLeft className="w-3 h-3 mr-3" /> Retour
                            </NavLink>

                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-monument uppercase tracking-tight text-white mb-6 leading-[1.1] drop-shadow-2xl">
                                L'Âme de <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white to-[#C5A059]">Votre Œuvre</span>
                            </h1>
                            <p className="text-white/90 font-satoshi text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
                                Des compositions orchestrales et électroniques taillées pour le cinéma.
                            </p>

                            <NavLink to="/portfolio" className="pointer-events-auto">
                                <MagneticButton>
                                    <button className="flex items-center gap-3 px-10 py-5 bg-[#C5A059] text-white font-monument text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(197,160,89,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)]">
                                        <Play className="w-4 h-4" /> Écouter l'Arsenal
                                    </button>
                                </MagneticButton>
                            </NavLink>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SERVICES GRID (Glassmorphism) */}
            <section className="py-32 relative z-20 -mt-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="bg-white/40 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 flex items-center justify-center mb-8 border border-[#C5A059]/20 group-hover:scale-110 transition-transform duration-500">
                                <Headphones className="w-6 h-6 text-[#C5A059]" />
                            </div>
                            <h3 className="text-2xl font-monument text-gray-900 mb-4 uppercase tracking-wide">
                                Composition Originale
                            </h3>
                            <p className="text-gray-600 font-satoshi text-base leading-relaxed font-light">
                                Orchestral, Synthwave, Epic. Des mélodies inoubliables qui forgent l'identité émotionnelle de votre film, créées sur-mesure pour chaque scène.
                            </p>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-white/40 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 flex items-center justify-center mb-8 border border-[#C5A059]/20 group-hover:scale-110 transition-transform duration-500">
                                <Wind className="w-6 h-6 text-[#C5A059]" />
                            </div>
                            <h3 className="text-2xl font-monument text-gray-900 mb-4 uppercase tracking-wide">
                                Sound Design
                            </h3>
                            <p className="text-gray-600 font-satoshi text-base leading-relaxed font-light">
                                Création d'univers sonores immersifs. De l'ambiance la plus subtile à l'impact le plus dévastateur, chaque texture est sculptée avec précision.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-white/40 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-10 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(197,160,89,0.15)] transition-all duration-500 group"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#C5A059]/10 flex items-center justify-center mb-8 border border-[#C5A059]/20 group-hover:scale-110 transition-transform duration-500">
                                <Speaker className="w-6 h-6 text-[#C5A059]" />
                            </div>
                            <h3 className="text-2xl font-monument text-gray-900 mb-4 uppercase tracking-wide">
                                Mixage Spatial
                            </h3>
                            <p className="text-gray-600 font-satoshi text-base leading-relaxed font-light">
                                Dolby Atmos & Normes Cinéma. Un placement tridimensionnel absolu pour envelopper le spectateur au cœur de l'action narrative.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. TESTIMONIAL / IMPACT */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="text-[#C5A059] text-6xl font-serif mb-6 leading-none">"</div>
                        <h2 className="text-3xl md:text-5xl font-outfit font-light text-gray-900 mb-8 leading-tight italic">
                            La musique de Voix d'Or n'a pas seulement accompagné mon film, elle en est devenue le <span className="text-[#C5A059] font-medium">battement de cœur vital.</span> Une dimension émotionnelle pure qui transcende l'image.
                        </h2>
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-[1px] bg-[#C5A059] mb-4" />
                            <p className="font-monument uppercase text-sm tracking-widest text-gray-900">
                                Victor R. Laurent
                            </p>
                            <p className="text-gray-500 font-light text-sm mt-1">
                                Réalisateur Primé
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. CTA / LE PACTE */}
            <section className="py-32 bg-[#FAFAFA] border-t border-[#C5A059]/20">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-sm tracking-[0.4em] uppercase text-[#C5A059] font-outfit mb-6">
                            L'Étape Décisive
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-monument text-gray-900 mb-8 leading-tight">
                            Scellez Le Pacte <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-[#C5A059]">Sonore</span>
                        </h3>
                        <p className="text-gray-600 text-lg mb-12 font-light">
                            Engagez une conversation stratégique concernant l'architecture audio de votre prochaine réalisation. L'excellence exige de la préparation.
                        </p>
                        <NavLink to="/contact">
                            <MagneticButton>
                                <button className="px-12 py-5 bg-transparent border border-[#C5A059] text-[#C5A059] font-monument text-xs md:text-sm hover:bg-[#C5A059] hover:text-white transition-all duration-500 uppercase tracking-[0.2em]">
                                    Planifier La Stratégie
                                </button>
                            </MagneticButton>
                        </NavLink>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
