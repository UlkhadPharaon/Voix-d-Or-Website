import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Crosshair, Cpu, Award } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function Formation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const tiers = [
        {
            name: "Initiation",
            subtitle: "La Fondation (VFX & Montage)",
            price: "Accès Sélectif",
            features: [
                "Maîtrise de DaVinci Resolve",
                "Fondamentaux du compositing",
                "Grammaire du montage dynamique",
                "Colorimétrie narrative"
            ],
            icon: Crosshair
        },
        {
            name: "Maîtrise",
            subtitle: "L'Architecture (Sound & Beatmaking)",
            price: "Sur Dossier",
            features: [
                "Ingénierie du Beatmaking",
                "Design Sonore Avancé",
                "Mixage Haute-Fidélité",
                "Psychologie des Fréquences"
            ],
            icon: Cpu,
            primary: true
        },
        {
            name: "Empire",
            subtitle: "L'Ultime (Director's Cut)",
            price: "L'Élite Seulement",
            features: [
                "Réalisation & Direction 360°",
                "Intégration IA & Unreal Engine",
                "Business de Studio Haut de Gamme",
                "Mentorat Direct & Exclusif"
            ],
            icon: Award
        }
    ];

    const mentors = [
        {
            name: "Ulkhad Pharaon",
            role: "Directeur VFX & AI Architect",
            desc: "Expertise intransigeante en génération procédurale et effets visuels complexes. Il redéfinit les frontières du possible à l'aide d'outils de pointe (Unreal, Nuke, AI Workflows).",
            image: "/assets/team/Ulkhad.webp"
        },
        {
            name: "Poloxi",
            role: "Maître de l'Acoustique",
            desc: "Architecte sonore visionnaire. Il sculpte le silence et dompte les fréquences pour créer des expériences auditives d'une densité émotionnelle rare.",
            image: "/assets/team/Poloxi.webp"
        }
    ];

    return (
        <div className="bg-vantablack min-h-screen text-primary font-satoshi selection:bg-[#C5A059]/30 transition-colors duration-500">
            {/* 1. HERO SECTION */}
            <section
                ref={containerRef}
                className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-vantablack"
            >
                <div className="absolute inset-0 z-0 bg-vantablack">
                    <img
                        src="/assets/images/for formation 3.webp"
                        alt="L'Académie Voix d'Or"
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-10" />
                </div>

                <div className="relative z-30 text-center container px-6 pointer-events-none">
                    <motion.div style={{ y: textY, opacity: textOpacity }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <NavLink to="/" className="inline-flex items-center text-white/50 hover:text-[#C5A059] transition-colors mb-10 text-xs tracking-[0.2em] uppercase pointer-events-auto border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm bg-black/20">
                                <ArrowLeft className="w-3 h-3 mr-3" /> Retour
                            </NavLink>

                            <h2 className="text-[#C5A059] font-outfit font-light text-xs md:text-sm tracking-[0.4em] uppercase mb-4 flex items-center gap-4 drop-shadow-lg">
                                <span className="w-8 h-[1px] bg-[#C5A059]/50" />
                                L'Académie Voix d'Or
                                <span className="w-8 h-[1px] bg-[#C5A059]/50" />
                            </h2>
                            <h1 className="text-4xl md:text-6xl lg:text-8xl font-monument uppercase tracking-tight text-white mb-8 leading-[1.1] drop-shadow-2xl">
                                L'Élite de Demain <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-[#999] to-[#C5A059] opacity-90">se Forge Ici.</span>
                            </h1>
                            <p className="text-white/70 font-satoshi text-sm md:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
                                Rejoignez le sanctuaire de l'ingénierie audiovisuelle et des effets visuels.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2. THE VISION (Manifesto) */}
            <section className="py-32 relative z-20 bg-vantablack overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-4xl relative z-30 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="w-12 h-12 rounded-full border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(197,160,89,0.15)] bg-black">
                            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-monument text-white mb-8 leading-tight">
                            Pas une école. <br />
                            <span className="text-[#C5A059]">Une forge pour visionnaires.</span>
                        </h3>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mb-10" />
                        <p className="text-lg md:text-xl font-light leading-relaxed text-white/70 max-w-3xl mx-auto">
                            Studio Voix d'Or ne forme pas des techniciens; nous élevons des architectes de l'art. L'excellence exige de la discipline, des standards implacables et une maîtrise absolue d'outils dévastateurs comme Unreal Engine, DaVinci Resolve, et les Workflows I.A. de pointe. Vous n'apprenez pas seulement à créer; vous apprenez à dominer le marché.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. MASTERCLASSES GRID */}
            <section className="py-32 bg-luxury-black border-y border-white/5 relative overflow-hidden">
                {/* Decorative background for "Golden White" look in light mode */}
                <div className="absolute inset-0 theme-light:bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="text-center mb-24">
                        <h2 className="text-sm tracking-[0.4em] uppercase text-[#C5A059] font-outfit mb-4">
                            L'Enseignement
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-monument text-white">
                            Les Masterclasses
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tiers.map((tier, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className={`relative glass-card ${tier.primary ? 'border-gold shadow-[0_0_30px_rgba(197,160,89,0.15)]' : 'border-white/10'} rounded-2xl p-10 flex flex-col hover:-translate-y-2 hover:border-gold transition-all duration-300 group overflow-hidden`}
                            >
                                {tier.primary && (
                                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
                                )}

                                <div className="mb-8 relative z-10">
                                    <tier.icon className={`w-8 h-8 mb-6 ${tier.primary ? 'text-[#C5A059]' : 'text-white/50 group-hover:text-[#C5A059]'} transition-colors`} />
                                    <h4 className="text-2xl font-bold font-monument text-white mb-2 uppercase tracking-wide">{tier.name}</h4>
                                    <div className={`text-sm font-bold uppercase tracking-widest ${tier.primary ? 'text-[#C5A059]' : 'text-white/70'} mb-2`}>{tier.price}</div>
                                    <p className="text-sm text-white/50 font-light italic">{tier.subtitle}</p>
                                </div>
                                <ul className="space-y-4 mb-12 flex-grow relative z-10">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-white/80 font-light">
                                            <ChevronRight className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <NavLink to="/le-pacte" className="w-full relative z-10">
                                    <button className={`w-full py-4 text-[10px] uppercase font-monument tracking-widest transition-all duration-300 rounded border preserve-white ${tier.primary ? 'bg-gold text-white border-gold hover:bg-transparent hover:text-gold' : 'bg-transparent border-white/20 text-white/70 hover:border-gold hover:text-gold hover:bg-gold/5'}`}>
                                        Candidater
                                    </button>
                                </NavLink>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. THE MENTORS */}
            <section className="py-32 bg-vantablack relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-20">
                        <h2 className="text-sm tracking-[0.4em] uppercase text-[#C5A059] font-outfit mb-4">
                            L'Avant-Garde
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-monument text-white">
                            Les Maîtres D'Armes
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {mentors.map((mentor, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="group flex flex-col md:flex-row gap-8 items-center bg-white/5 theme-light:bg-white border border-white/10 rounded-2xl hover:border-gold/30 transition-colors p-6"
                            >
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-xl overflow-hidden flex-shrink-0 relative">
                                    <div className="absolute inset-0 bg-[#C5A059]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = "https://via.placeholder.com/300x300/111/C5A059?text=" + mentor.name.split(' ')[0];
                                        }}
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-2xl font-monument uppercase text-white mb-2">{mentor.name}</h4>
                                    <p className="text-[#C5A059] text-xs font-bold tracking-widest uppercase mb-4">{mentor.role}</p>
                                    <p className="text-white/60 font-light text-sm leading-relaxed">
                                        {mentor.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CTA / SOUMETTRE CANDIDATURE */}
            <section className="py-40 bg-luxury-black relative flex items-center justify-center border-t border-gold/20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/10 rounded-full blur-[150px]" />
                </div>

                <div className="container px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-monument uppercase tracking-tight mb-8">
                            Rejoignez <br className="hidden md:block" />
                            <span className="text-[#C5A059] italic pr-4 font-light mix-blend-screen">L'Empire</span>
                        </h2>
                        <p className="text-white/60 font-satoshi text-lg max-w-xl mx-auto font-light mb-16 tracking-wide leading-relaxed">
                            Les places sont rares. Seuls les esprits les plus affûtés et déterminés franchiront ces portes. Prouvez votre valeur.
                        </p>

                        <NavLink to="/contact">
                            <MagneticButton>
                                <button className="px-12 py-5 bg-[#C5A059] text-white font-monument text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]">
                                    Soumettre Sa Candidature
                                </button>
                            </MagneticButton>
                        </NavLink>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
