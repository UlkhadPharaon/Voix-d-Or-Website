import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FaqSection } from '@/components/ui/FaqSection';



const gearList = [
    { name: "DaVinci Resolve Studio", type: "Software" },
    { name: "Mac Studio Ultra M2", type: "Workstation" },
    { name: "Eizo ColorEdge CG319X", type: "Monitoring" },
    { name: "Blackmagic Mini Panel", type: "Hardware" },
    { name: "Adobe Creative Cloud", type: "Suite" },
    { name: "Genelec 8040B", type: "Audio" },
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
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.shadowBlur = 4;
                ctx.shadowColor = "gold";
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

export const PostProductionStudio = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white font-satoshi selection:bg-gold/30">

            {/* 1. VISUAL ALCHEMY HERO */}
            <section
                ref={containerRef}
                className="preserve-white relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
            >
                {/* Background Video */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ filter: useTransform(blurAmount, (v) => `blur(${v})`) }}
                >
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/assets/video/post-production-hero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                </motion.div>

                {/* Golden Dust Overlay */}
                <GoldenDust />

                {/* Content */}
                <div className="relative z-10 text-center container px-6">
                    <motion.div
                        style={{ y: textY, opacity: textOpacity }}
                    >
                        <NavLink to="/services" className="inline-flex items-center text-white/40 hover:text-gold transition-colors mb-8 text-xs tracking-widest uppercase">
                            <ArrowLeft className="w-3 h-3 mr-2" /> Retour aux services
                        </NavLink>

                        <h1 className="text-5xl md:text-8xl font-monument uppercase tracking-tighter text-white mb-6">
                            L'Art de La <br />
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-white to-gold-500">Finition</span>
                        </h1>
                        <p className="text-white/60 font-monument tracking-[0.4em] uppercase text-xs md:text-sm">
                            Montage • Étalonnage • VFX
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. INVESTISSEMENT SECTION (Pricing Grid) */}
            <section className="py-32 bg-[#050505] relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 pointer-events-none" />

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
                            className="text-4xl md:text-5xl font-monument text-white"
                        >
                            Menu Post-Prod
                        </motion.h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                tier: "Essentiel",
                                price: "125 000F",
                                subtitle: "Professional Editing & Color",
                                features: [
                                    "Montage spot (30s)",
                                    "Étalonnage cinématographique",
                                    "Sound Design inclus",
                                    "3 révisions incluses"
                                ]
                            },
                            {
                                tier: "Premium",
                                price: "250 000F",
                                subtitle: "Professionnal Editing, VFX & Advanced Grading",
                                features: [
                                    "Montage moyen format",
                                    "Effets visuels complexes",
                                    "Étalonnage HDR / DaVinci",
                                    "Nettoyage d'image avancé"
                                ]
                            },
                            {
                                tier: "Empire",
                                price: "3 000 000F",
                                subtitle: "Cinematic Global Post-Production",
                                features: [
                                    "Montage long format",
                                    "Conception VFX & 3D",
                                    "Color grading",
                                    "Conception Musique Originale",
                                    "Mixage immersif",
                                    "Export Broadcast international"
                                ]
                            }
                        ].map((pkg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-white/10 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-8 flex flex-col hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(197,160,89,0.2)] transition-all duration-300 group"
                            >
                                <div className="mb-8">
                                    <h4 className="text-xl font-bold text-white mb-2">{pkg.tier}</h4>
                                    <div className="text-2xl font-bold text-[#C5A059] mb-1">{pkg.price}</div>
                                    <p className="text-sm text-white/40 font-light italic">{pkg.subtitle}</p>
                                </div>
                                <ul className="space-y-4 mb-10 flex-grow">
                                    {pkg.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-white/70">
                                            <svg className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <NavLink to="/contact" className="w-full">
                                    <button className="w-full py-4 bg-transparent border border-[#C5A059] text-[#C5A059] rounded-lg font-monument text-[10px] uppercase tracking-widest hover:bg-[#C5A059] hover:text-white transition-all duration-300">
                                        Commander la finition
                                    </button>
                                </NavLink>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. HARDWARE & SOFTWARE SHOWCASE */}
            <section className="py-24 bg-white/5 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="md:w-1/3">
                            <h2 className="text-2xl font-monument text-white mb-6">
                                Suite De <br />
                                <span className="text-white/20">Post-Production</span>
                            </h2>
                            <p className="text-white/60 leading-relaxed font-light">
                                Une station de travail ultra-performante calibrée pour la 4K, le RAW et les VFX complexes. Nous garantissons une fidélité couleur absolue.
                            </p>
                        </div>

                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {gearList.map((gear, idx) => (
                                <div key={idx} className="p-6 bg-black/40 border border-white/5 rounded hover:border-gold/30 transition-all group">
                                    <div className="text-gold/50 text-xs uppercase tracking-widest mb-2 group-hover:text-gold transition-colors">
                                        {gear.type}
                                    </div>
                                    <div className="text-white font-bold font-outfit text-lg">
                                        {gear.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FAQ SECTION */}
            <FaqSection
                title="Questions Fréquentes"
                questions={[
                    {
                        question: "Prenez-vous en charge des rushs tournés par d'autres équipes ?",
                        answer: "Oui. Nos coloristes et ingénieurs VFX peuvent sublimer n'importe quelle séquence de haute qualité, agissant comme le dernier filtre d'excellence avant la diffusion mondiale."
                    },
                    {
                        question: "Gérez-vous la 3D complexe et l'intégration CGI ?",
                        answer: "Notre pôle VFX est équipé pour sculpter la réalité. De l'incrustation subtile à la création d'environnements 3D complets, nous maîtrisons l'alchimie digitale de bout en bout."
                    },
                    {
                        question: "Quels workflows d'étalonnage utilisez-vous ?",
                        answer: "Nous opérons sur des stations de travail certifiées et calibrées, permettant un étalonnage colorimétrique chirurgical pour donner à votre projet sa véritable signature visuelle."
                    }
                ]}
                className="bg-black border-t border-white/5"
            />

        </div>
    );
};
