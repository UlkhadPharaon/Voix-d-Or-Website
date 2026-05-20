import { useRef, useEffect, useState, Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowLeft } from 'lucide-react';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';
import { FaqSection } from '@/components/ui/FaqSection';

const Spline = lazy(() => import('@splinetool/react-spline'));

// --- Error Boundary for Spline ---
class SplineErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
    constructor(props: { children: ReactNode; fallback: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Spline Error captured:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// --- Assets / Data ---
const offersData: CardStackItem[] = [
    {
        id: "vocal",
        tag: "Vocal Clarity",
        title: "Enregistrement Haute-Fidélité",
        description: "Sculpture vocale d'une pureté absolue. Des sessions exclusives calibrées pour capturer chaque nuance de votre performance avec une clarté cristalline.",
        ctaLabel: "Explorer",
        href: "/contact"
    },
    {
        id: "sound-design",
        tag: "Sonic Landscapes",
        title: "Design Sonore Cinématographique",
        description: "Forgez des paysages magnétiques qui inscrivent vos œuvres dans la légende. Une immersion acoustique totale pour captiver une audience d'exception.",
        ctaLabel: "Explorer",
        href: "/contact"
    },
    {
        id: "mixing",
        tag: "Audio Supremacy",
        title: "Mixage & Mastering d'Élite",
        description: "L'ingénierie du son poussée à son paroxysme. Sublimez vos fréquences pour une puissance d'impact maximale sur tous les standards internationaux.",
        ctaLabel: "Explorer",
        href: "/contact"
    },
    {
        id: "live",
        tag: "Prestige Live",
        title: "Sonorisation Prestigieuse",
        description: "Pérennisez l'éphémère avec maestria. Transformez vos événements exclusifs en expériences immersives grâce à une architecture sonore sans faille.",
        ctaLabel: "Explorer",
        href: "/contact"
    }
];

const gearList = [
    { name: "Neumann U87 Ai", type: "Microphone", desc: "La référence absolue pour une chaleur vocale intemporelle." },
    { name: "Avalon VT-737sp", type: "Preamp", desc: "Chaleur analogique et richesse harmonique sans compromis." },
    { name: "Universal Audio Apollo x8p", type: "Interface", desc: "Conversion cristalline au standard de l'industrie musicale." },
    { name: "Focal Trio6 Be", type: "Monitoring", desc: "Restitution fréquentielle d'une précision chirurgicale." },
    { name: "Pro Tools Ultimate", type: "DAW", desc: "L'écosystème numérique des plus grands studios californiens." },
    { name: "SSL Fusion", type: "Processing", desc: "La magie colorimétrique des consoles SSL pour un mastering d'élite." },
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

export const AudioStudio = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [hasInteracted, setHasInteracted] = useState(false);
    const [splineLoaded, setSplineLoaded] = useState(false);

    const handleInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    const HeroBackground = () => (
        <div className="absolute inset-0 z-0 bg-[#FAFAFA]">
            {/* Pristine Video Background - Higher opacity, no grey cast */}
            <video
                className="w-full h-full object-cover opacity-80"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/assets/video/Audio_page_Hero_BG.mp4" type="video/mp4" />
            </video>
            {/* Clean bottom anchor without full-page haze */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-10" />
        </div>
    );

    return (
        <div className="bg-[#f8f9fa] min-h-screen text-black font-satoshi selection:bg-[#C5A059]/30">
            {/* 1. CINEMATIC HERO (The Attention) */}
            <section
                ref={containerRef}
                className="preserve-white relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#FAFAFA] text-white"
                onClick={handleInteraction}
                onScroll={handleInteraction}
            >
                {/* Dual Background Strategy: Video Fallback + Spline Overlay */}
                <motion.div
                    className="absolute inset-0 z-0 bg-[#FAFAFA]"
                >
                    <HeroBackground />

                    <SplineErrorBoundary fallback={<div className="hidden" />}>
                        <Suspense fallback={<div className="hidden" />}>
                            <motion.div
                                className="absolute inset-0 z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: splineLoaded ? 0.8 : 0 }}
                                transition={{ duration: 1.5 }}
                            >
                                <Spline
                                    scene="https://prod.spline.design/3O5ZJ1cMtsq6m3hU/scene.splinecode"
                                    className="w-full h-full object-cover"
                                    onLoad={() => setSplineLoaded(true)}
                                />
                            </motion.div>
                        </Suspense>
                    </SplineErrorBoundary>
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
                                Ingénierie Sonore
                                <span className="w-8 h-[1px] bg-[#C5A059]/50" />
                            </h2>
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-monument uppercase tracking-tight text-white mb-8 leading-[1.1] drop-shadow-2xl">
                                Architecture Sonore <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white to-[#C5A059] opacity-90">Absolue</span>
                            </h1>
                            <p className="text-white/60 font-satoshi text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                                Transcendez les fréquences. Devenez une signature vocale incontournable. <br className="hidden md:block" /> La pureté acoustique poussée à son paroxysme.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 pointer-events-none"
                    animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059]/70">Explorer</span>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-[#C5A059] to-transparent" />
                </motion.div>
            </section>

            {/* 2. THE GAP / AGITATION */}
            <section className="py-32 md:py-48 bg-white relative z-10 overflow-hidden shadow-sm">
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
                            La médiocrité sonore coûte des <span className="text-[#C5A059]">millions</span> en opportunités.
                        </h2>
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent mx-auto mb-10" />
                        <p className="text-lg md:text-xl font-light leading-relaxed text-black/70 font-satoshi max-w-3xl mx-auto">
                            Dans une industrie impitoyable, votre empreinte vocale doit imposer le respect à la première seconde. Un son standard vous décrédibilise. Nous ne faisons pas d'enregistrements; nous forgeons l'identité acoustique des leaders.
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
                                <h4 className="text-[#C5A059] font-outfit text-xs tracking-[0.3em] uppercase mb-4 border-l-2 border-[#C5A059] pl-4">
                                    Standards Internationaux
                                </h4>
                                <h2 className="text-3xl md:text-5xl font-monument text-black mb-8 leading-tight">
                                    Services <br />
                                    <span className="text-black/20 delay-100 transition-colors">Acoustique</span>
                                </h2>
                                <p className="text-black/60 leading-relaxed font-light font-satoshi text-lg">
                                    Pureté cristalline et chaleur analogique. Des microphones de légende aux convertisseurs de référence mondiale, nous déployons la chaîne audio exigée par l'élite de l'industrie musicale pour votre vision.
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
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full ease-out" />

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

            {/* 4.1. INVESTISSEMENT SECTION (Pricing Grid) */}
            <section className="py-32 bg-[#FAFAFA] relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-sm tracking-[0.4em] uppercase text-[#C5A059] font-outfit mb-4"
                        >
                            Investissement
                        </motion.h2>
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-monument text-black"
                        >
                            Tarification D'Élite
                        </motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                tier: "MIXTAPES",
                                price: "30.000F",
                                subtitle: "Mix & Master",
                                features: [
                                    "Délai : 1 Semaine"
                                ]
                            },
                            {
                                tier: "PROGRAMME COMPLET",
                                price: "90.000F",
                                subtitle: "Beat, Voix, Mix Master",
                                features: [
                                    "Délai : 3 Semaines"
                                ]
                            },
                            {
                                tier: "ENREGISTREMENT LIVE ORCHESTRES",
                                price: "150.000F",
                                subtitle: "avec Mix Master",
                                features: [
                                    "Délai : 1 Mois"
                                ]
                            },
                            {
                                tier: "PRISE DE VOIX SEULE",
                                price: "15.000F",
                                subtitle: "Sans Mix, Voix Off",
                                features: [
                                    "Délai : 1 Journée"
                                ]
                            },
                            {
                                tier: "CRÉATION D'INSTRUMENTALE",
                                price: "45.000F",
                                subtitle: "Beat",
                                features: [
                                    "Délai : 4 Jours"
                                ]
                            },
                            {
                                tier: "LOCATION DU STUDIO",
                                price: "10.000F",
                                subtitle: "L'ABA",
                                features: [
                                    "Durée : 1 Heure"
                                ]
                            }
                        ].map((pkg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-white/40 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-8 flex flex-col hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all duration-300 group"
                            >
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.tier}</h4>
                                    <div className="text-2xl font-bold text-[#C5A059] mb-1">{pkg.price}</div>
                                    <p className="text-sm text-gray-500 font-light italic">{pkg.subtitle}</p>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {pkg.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-700">
                                            <svg className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <NavLink to="/contact" className="w-full">
                                    <button className="w-full py-4 bg-transparent border border-[#C5A059] text-[#C5A059] rounded-lg font-monument text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all duration-300">
                                        Réserver le protocole
                                    </button>
                                </NavLink>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4.5. FAQ SECTION */}
            <FaqSection
                title="Questions Fréquentes"
                questions={[
                    {
                        question: "Comment garantissez-vous la qualité de la sonorisation sur des événements Live ?",
                        answer: "Sous la direction technique de Pape, notre équipe déploie une infrastructure acoustique sur mesure, gérant le câblage complexe et la diffusion pour une clarté sonore absolue, peu importe l'envergure de l'événement."
                    },
                    {
                        question: "Faites-vous du Sound Design sur mesure pour l'image ?",
                        answer: "Le son représente 50% de l'expérience cinématographique. Nous sculptons des paysages sonores immersifs qui renforcent l'impact narratif de chaque image."
                    },
                    {
                        question: "Proposez-vous des sessions d'enregistrement voix-off ou doublage ?",
                        answer: "Notre studio est conçu comme un sanctuaire acoustique, offrant une captation vocale d'une pureté cristalline pour les documentaires, publicités et productions musicales."
                    }
                ]}
            />

            {/* 5. THE PROTOCOL (CTA) */}
            <section className="relative py-48 bg-[#050505] text-white overflow-hidden flex items-center justify-center border-t border-white/5">
                {/* Cinematic backdrop */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C5A059]/20 rounded-full blur-[150px]" />
                </div>

                <div className="container px-6 relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-monument uppercase tracking-tight mb-8 drop-shadow-2xl">
                            Signez Votre <br className="hidden md:block" />
                            <span className="text-[#C5A059] italic pr-4 font-light mix-blend-screen">Chef-d'Œuvre</span>
                        </h2>
                        <p className="text-white/60 font-satoshi text-lg max-w-xl mx-auto font-light mb-16 tracking-wide leading-relaxed">
                            L'excellence ne s'attend pas, elle s'enregistre. Nos agendas studios sont strictement limités pour garantir un niveau de mixage et de mastering intransigeant.
                        </p>

                        <NavLink to="/contact">
                            <MagneticButton>
                                <button className="px-12 py-5 bg-white text-black font-monument text-xs md:text-sm hover:bg-[#C5A059] hover:text-white transition-all duration-500 uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95">
                                    Réserver L'Architecture Sonore
                                </button>
                            </MagneticButton>
                        </NavLink>
                    </motion.div>
                </div>
            </section>

        </div>
    );
};
