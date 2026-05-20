import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';
import { FaqSection } from '@/components/ui/FaqSection';

// --- Assets / Data ---
const offersData: CardStackItem[] = [
    {
        id: 1,
        tag: "FILM FOUNDATION",
        title: "Film d'Entreprise Premium",
        description: "Impacter votre marché avec autorité. Des œuvres cinématographiques conçues pour captiver vos investisseurs, partenaires et sublimer votre communication interne.",
        price: "Prix: Sur Devis",
        ctaLabel: "EXPLORER >",
        href: "/contact"
    },
    {
        id: 2,
        tag: "NARRATIVE ARTS",
        title: "Documentaires",
        description: "L'art du récit poussé à son paroxysme. Une immersion totale, de l'écriture à la post-production, pour des formats narratifs au raffinement absolu.",
        price: "Prix : Sur Devis",
        ctaLabel: "EXPLORER >",
        href: "/contact"
    },
    {
        id: 3,
        tag: "VISUAL CLARITY",
        title: "Motion Design Haut de Gamme",
        description: "L'alliance parfaite entre l'élégance du design et la précision pédagogique. Accélérez l'adhésion grâce à des modules animés d'une clarté absolue.",
        price: "Prix : Sur Devis",
        ctaLabel: "EXPLORER >",
        href: "/contact"
    }
];

const gearList = [
    { name: "RED Komodo 6K", type: "Cinema Camera", desc: "La norme hollywoodienne pour une dynamique d'image incomparable." },
    { name: "Sony FX3 / A7SIII", type: "Camera", desc: "Sensibilité extrême pour des atmosphères lumineuses maîtrisées." },
    { name: "Aputure 600d Pro", type: "Lighting", desc: "Sculpture de la lumière avec une précision chirurgicale." },
    { name: "DJI Mavic 3 Cine", type: "Drone", desc: "Perspectives aériennes 5.1K au format Apple ProRes." },
    { name: "Ronin RS3 Pro", type: "Stabilizer", desc: "Mouvements de caméra d'une fluidité absolue." },
    { name: "Sennheiser MKH 416", type: "Audio", desc: "Captation sonore au standard de l'industrie cinématographique." },
];

const GoldenDust = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = 80;
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
                ctx.shadowBlur = 4;
                ctx.shadowColor = "#C5A059";
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-20" />;
};

export const ProductionStudio = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);

    const [hasInteracted, setHasInteracted] = useState(false);
    const handleInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen text-black font-satoshi selection:bg-[#C5A059]/30">
            {/* 1. CINEMATIC HERO (The Attention) */}
            <section
                ref={containerRef}
                className="preserve-white relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAFAFA] text-white"
                onClick={handleInteraction}
                onScroll={handleInteraction}
            >
                {/* Background Video */}
                <motion.div
                    className="absolute inset-0 z-0 bg-[#FAFAFA]"
                    style={{ filter: useTransform(blurAmount, (v) => `blur(${v})`) }}
                >
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/assets/video/production-hero.mp4" type="video/mp4" />
                    </video>
                    {/* Dark gradient only at bottom to anchor content, removing full-screen grey cast */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                </motion.div>

                <GoldenDust />

                <div className="relative z-30 text-center container px-6 pointer-events-none">
                    <motion.div style={{ y: textY, opacity: textOpacity }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="flex flex-col items-center"
                        >
                            <NavLink to="/services" className="inline-flex items-center text-white/50 hover:text-[#C5A059] transition-colors mb-12 text-xs tracking-[0.2em] uppercase pointer-events-auto border border-white/10 px-6 py-2 rounded-full backdrop-blur-sm bg-black/20">
                                <ArrowLeft className="w-3 h-3 mr-3" /> Services
                            </NavLink>

                            <h2 className="text-[#C5A059] font-outfit font-light text-xs md:text-sm tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
                                <span className="w-8 h-[1px] bg-[#C5A059]/50" />
                                Élite Production
                                <span className="w-8 h-[1px] bg-[#C5A059]/50" />
                            </h2>
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-monument uppercase tracking-tight text-white mb-8 leading-[1.1] drop-shadow-2xl">
                                Vision Cinématographique <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white to-[#C5A059] opacity-90">Absolue</span>
                            </h1>
                            <p className="text-white/60 font-satoshi text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                                Transcendez le statut de marque. Devenez une icône. <br className="hidden md:block" /> L'art de l'image poussé à son paroxysme.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
                    animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]/70">Explorer</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-[#C5A059] to-transparent" />
                </motion.div>
            </section>

            {/* 2. THE GAP / AGITATION */}
            <section className="py-32 md:py-48 bg-white relative z-10 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                <div className="container mx-auto px-6 max-w-4xl relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="w-12 h-12 rounded-full border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(197,160,89,0.15)]">
                            <div className="w-2 h-2 bg-[#C5A059] rounded-full" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-monument text-black mb-8 leading-tight">
                            La médiocrité visuelle coûte des <span className="text-[#C5A059]">millions</span> en opportunités.
                        </h2>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mb-10" />
                        <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 font-satoshi max-w-3xl mx-auto">
                            Dans un écosystème saturé, votre image n'a qu'une fraction de seconde pour imposer le respect. Une production standard vous rend invisible. Nous ne faisons pas de vidéos; nous forgeons l'héritage visuel des leaders.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 3. SOLUTIONS D'ÉLITE (The Card Stack) */}
            <section className="py-24 md:py-32 bg-[#f8f9fa] relative border-y border-black/5">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm tracking-[0.4em] uppercase text-[#C5A059] font-outfit mb-4"
                        >
                            L'Excellence
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-monument text-black"
                        >
                            Solutions D'Élite
                        </motion.h3>
                    </div>

                    <div className="flex justify-center w-full max-w-5xl mx-auto min-h-[500px]">
                        <CardStack
                            items={offersData}
                            initialIndex={0}
                            autoAdvance
                            intervalMs={3000}
                            pauseOnHover
                            showDots
                        />
                    </div>
                </div>
            </section>

            {/* 4. L'ARSENAL (Proof & Authority) */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
                        <div className="lg:w-1/3 sticky top-32">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h3 className="text-[#C5A059] font-outfit text-xs tracking-[0.3em] uppercase mb-4 border-l-2 border-[#C5A059] pl-4">
                                    Standards Internationaux
                                </h3>
                                <h2 className="text-3xl md:text-5xl font-monument text-black mb-8 leading-tight">
                                    L'ARSENAL
                                </h2>
                                <p className="text-black/60 leading-relaxed font-light font-satoshi text-lg">
                                    Précision chirurgicale. Technologie de pointe. Des caméras cinéma d'élite aux drones de haute voltige, nous déployons l'arsenal exigé par les super-productions pour votre vision.
                                </p>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            {gearList.map((gear, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="p-8 bg-[#f8f9fa] border border-black/5 rounded-2xl hover:border-[#C5A059]/30 hover:shadow-[0_10px_40px_-15px_rgba(197,160,89,0.2)] transition-all duration-500 group relative overflow-hidden"
                                >
                                    {/* Hover reflection effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full ease-out" />

                                    <div className="text-[#C5A059]/60 text-[10px] uppercase font-bold tracking-[0.2em] mb-4 group-hover:text-[#C5A059] transition-colors relative z-10">
                                        {gear.type}
                                    </div>
                                    <div className="text-black font-monument text-xl md:text-2xl mb-3 relative z-10 transition-colors">
                                        {gear.name}
                                    </div>
                                    <p className="text-black/50 font-satoshi font-light text-sm relative z-10">
                                        {gear.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* 4.5. FAQ SECTION */}
            <FaqSection
                title="Questions Fréquentes"
                questions={[
                    {
                        question: "Gérez-vous la logistique et les talents sur des tournages internationaux ?",
                        answer: "Absolument. Notre équipe orchestre l'intégralité de la production, du repérage des décors à la direction des talents, assurant une exécution sans faille sur les plateaux les plus exigeants."
                    },
                    {
                        question: "Quel est le délai de livraison d'une production complète ?",
                        answer: "L'excellence demande de la précision. Bien que chaque projet soit unique, nos workflows optimisés par l'IA nous permettent de livrer des créations d'élite dans des délais extrêmement compétitifs, définis lors du protocole d'initiation."
                    },
                    {
                        question: "Utilisez-vous des caméras de qualité cinéma ?",
                        answer: "Nous tournons exclusivement avec des équipements de pointe approuvés par l'industrie cinématographique mondiale, garantissant une image d'une pureté et d'une dynamique absolues."
                    }
                ]}
            />

            {/* 5. THE PROTOCOL (CTA) */}
            <section className="relative py-48 bg-black text-white overflow-hidden flex items-center justify-center">
                {/* Cinematic backdrop */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/10 rounded-full blur-[150px]" />
                </div>

                <div className="container px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-monument uppercase tracking-tight mb-8 drop-shadow-2xl">
                            Entrez Dans <br className="hidden md:block" />
                            <span className="text-[#C5A059] italic pr-4 font-light mix-blend-screen">La Légende</span>
                        </h2>
                        <p className="text-white/60 font-satoshi text-lg max-w-xl mx-auto font-light mb-16 tracking-wide leading-relaxed">
                            L'excellence ne s'attend pas, elle se commande. Nos agendas de production sont strictement limités pour garantir un niveau de qualité intransigeant.
                        </p>

                        <NavLink to="/contact">
                            <MagneticButton>
                                <button className="px-12 py-5 bg-white text-black font-monument text-xs md:text-sm hover:bg-[#C5A059] hover:text-white transition-all duration-500 uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95">
                                    Postuler pour une production
                                </button>
                            </MagneticButton>
                        </NavLink>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};
