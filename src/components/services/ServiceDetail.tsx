import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowLeft, FileText, Image as ImageIcon, Video, Edit2, Diamond, Volume2, Quote, Play } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    FileText,
    ImageIcon,
    Video,
    Edit2,
    Diamond,
    Volume2
};

export { iconMap };


import { servicesData } from '@/data/servicesData';
import { ImageGallery } from '@/components/ui/carousel-circular-image-gallery';
import { FeatureGlowCards } from '@/components/ui/feature-glow-cards';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { SplineScene } from '@/components/ui/SplineScene';
import ScrollMorphHero from '@/components/ui/scroll-morph-hero';
import { FaqSection } from '@/components/ui/FaqSection';
import {
    Stories,
    StoriesContent,
    Story,
    StoryAuthor,
    StoryAuthorImage,
    StoryAuthorName,
    StoryOverlay,
    StoryImage
} from '@/components/ui/stories-carousel';

type ServiceKey = keyof typeof servicesData;

/** Map service keys to self-hosted Spline scenes */
const splineHeroScenes: Partial<Record<ServiceKey, string>> = {
    tv: '/assets/spline/Spot_Publicitaire_Hero.splinecode',
};

/** Floating golden dust particles — matching the AudioStudio aesthetic */
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
            for (let i = 0; i < 80; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.5 + 0.1,
                });
            }
        };
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
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
                ctx.shadowColor = 'gold';
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

export const ServiceDetail = ({ serviceKey }: { serviceKey: ServiceKey }) => {
    const service = servicesData[serviceKey];
    const heroRef = useRef<HTMLDivElement>(null);
    const splineScene = splineHeroScenes[serviceKey];
    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);




    if (!service) return <div className="min-h-screen bg-vantablack text-white flex items-center justify-center">Service Introuvable</div>;

    return (
        <div className="bg-vantablack min-h-screen text-white font-satoshi">
            {/* 1. HERO SECTION */}
            {serviceKey === 'tv' ? (
                <section className="relative w-full overflow-hidden bg-vantablack">
                    <div className="absolute top-10 left-6 z-50">
                        <NavLink to="/services" className="inline-flex items-center text-white/50 hover:text-champagne-gold transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Retour aux services
                        </NavLink>
                    </div>
                    <ScrollMorphHero title={service.title} subtitle={service.subtitle} />
                </section>
            ) : splineScene ? (
                /* ─── FULL-SCREEN 3D HERO ─── */
                <section
                    ref={heroRef}
                    className="relative h-screen w-full overflow-hidden bg-vantablack"
                >
                    {/* Spline 3D — fills 100% of viewport, no constraints */}
                    <div
                        className="absolute z-0"
                        style={{
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <SplineScene
                            scene={splineScene}
                            className="w-full h-full"
                        />
                    </div>

                    {/* Bottom gradient for seamless transition to next section */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-vantablack to-transparent pointer-events-none z-10" />

                    {/* Golden Dust */}
                    <GoldenDust />

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                        animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold to-transparent" />
                    </motion.div>
                </section>
            ) : (
                /* ─── CLASSIC IMAGE HERO (default) ─── */
                <div ref={heroRef} className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end">
                    <div className="absolute inset-0">
                        <ParallaxImage
                            src={service.heroImage}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            wrapperClassName="w-full h-full absolute inset-0"
                            speed={0.5}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-vantablack/40 to-transparent z-10" />
                    </div>

                    <div className="container mx-auto px-6 relative z-20 pb-20">
                        <NavLink to="/services" className="inline-flex items-center text-white/50 hover:text-champagne-gold transition-colors mb-6 group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                            Retour
                        </NavLink>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-[#C5A059] drop-shadow-md font-monument text-sm tracking-[0.2em] uppercase mb-4">{service.subtitle}</h2>
                            <h1 className="text-5xl md:text-7xl font-display font-medium text-[#C5A059] drop-shadow-md max-w-4xl leading-none">{service.title}</h1>
                        </motion.div>
                    </div>
                </div>
            )}

            {/* 2. INTRO SECTION - "Que faisons nous?" */}
            <section className="py-24 md:py-32 bg-vantablack relative">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="flex-1 max-w-4xl">
                            <h2 className="text-3xl md:text-4xl font-monument uppercase mb-8 text-white">{service.intro.title}</h2>
                            <div className="text-xl md:text-3xl font-light leading-relaxed text-white/80">
                                <TextReveal text={service.intro.content} />
                            </div>
                        </div>
                        {((service.intro as any).video) && (
                            <div className="flex-1 w-full lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl"
                                >
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={(service.intro as any).video}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen>
                                    </iframe>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. TARGET SECTION - "Pour qui?" - distinct styling */}
            <section className="py-24 bg-white/5 border-y border-white/5 relative">
                <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center gap-16">
                    <div className="flex-1 order-2 md:order-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-monument uppercase mb-8 text-champagne-gold">{service.target.title}</h2>
                            <p className="text-lg leading-relaxed text-white/70 mb-8">
                                {service.target.content}
                            </p>
                            <div className="mt-8">
                                <NavLink to="/contact">
                                    <MagneticButton>
                                        <button className="text-sm font-bold uppercase tracking-widest border-b border-white/30 pb-1 hover:border-champagne-gold hover:text-champagne-gold transition-all">
                                            Commencer un projet
                                        </button>
                                    </MagneticButton>
                                </NavLink>
                            </div>
                        </motion.div>
                    </div>
                    <div className="flex-1 w-full mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="aspect-video bg-black rounded-lg overflow-hidden border border-white/10"
                        >
                            {((service.target as any).video) ? (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={(service.target as any).video}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>
                                </iframe>
                            ) : (
                                <ParallaxImage
                                    src={service.target.image}
                                    alt={service.target.title}
                                    className="w-full h-full object-cover opacity-80"
                                    wrapperClassName="w-full h-full"
                                    speed={0.1}
                                />
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* NEW FEATURES SECTION (if exists) */}
            {(service as any).features && (
                <FeatureGlowCards
                    title={(service as any).features.title}
                    subtitle={(service as any).features.subtitle}
                    items={(service as any).features.items}
                />
            )}

            {/* 4. PROCESS SECTION - "Notre Processus" */}
            <section className="py-32 bg-vantablack relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-monument uppercase text-white">Notre Processus</h2>
                        <div className="w-20 h-1 bg-champagne-gold mx-auto mt-6" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {service.process.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative group text-center"
                            >
                                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-xl font-monument text-white/30 bg-white/5 mx-auto mb-6 group-hover:border-champagne-gold group-hover:text-champagne-gold group-hover:bg-champagne-gold/10 transition-all duration-500">
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PRICING SECTION - Audio Exclusive */}
            {(serviceKey === 'audio') && (
                <section className="py-24 bg-vantablack relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 faso-pattern opacity-5 pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-monument uppercase text-white mb-4">
                                Tarifs & <span className="text-transparent bg-clip-text bg-gold-gradient">Services</span>
                            </h2>
                            <p className="text-white/40 font-satoshi uppercase tracking-[0.2em] text-sm">
                                Excellence & Transparence
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {(service as any).pricing?.map((plan: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative group p-8 bg-white/5 border border-white/10 hover:border-champagne-gold/50 transition-all duration-500 rounded-sm overflow-hidden"
                                >
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-champagne-gold/0 to-champagne-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10 text-center">
                                        <h3 className="text-white font-monument text-lg mb-2 group-hover:text-champagne-gold transition-colors duration-300">
                                            {plan.title.split('(')[0]}
                                        </h3>
                                        {plan.title.includes('(') && (
                                            <p className="text-white/40 text-xs font-satoshi mb-6 uppercase tracking-wider">
                                                {plan.title.split('(')[1].replace(')', '')}
                                            </p>
                                        )}

                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <span className="text-3xl md:text-4xl font-bold text-white group-hover:text-champagne-gold transition-colors font-outfit">
                                                {plan.price}
                                            </span>
                                        </div>

                                        <div className="inline-block px-4 py-1 border border-white/20 rounded-full text-xs font-satoshi text-white/60 uppercase tracking-widest group-hover:border-champagne-gold/30 group-hover:bg-champagne-gold/10 transition-all">
                                            {plan.duration}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 6. PORTFOLIO SECTION - "Ils ont rêvé grand" */}
            <section className="bg-vantablack relative overflow-hidden">
                <div className="container mx-auto px-6 pt-24 pb-4">
                    <h2 className="text-2xl font-monument uppercase text-[var(--text-primary)] flex items-center gap-4">
                        <span className="w-8 h-[2px] bg-champagne-gold" />
                        Réalisations Récentes
                    </h2>
                </div>

                {serviceKey === 'tv' ? (
                    <div className="container mx-auto px-6 py-12">
                        <Stories opts={{ align: 'start', loop: false }}>
                            <StoriesContent>
                                {service.portfolio.map((item, idx) => (
                                    <Story
                                        key={idx}
                                        className="aspect-[9/16] !w-[280px] sm:!w-[320px]"
                                        onClick={() => (item as any).videoId && setActiveVideoIndex(idx)}
                                    >
                                        <StoryImage
                                            src={item.image}
                                            alt={item.title}
                                            className="opacity-70 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-110"
                                        />
                                        <StoryOverlay side="bottom" className="h-40 from-black/80 to-transparent" />
                                        <StoryAuthor className="pb-6 px-6">
                                            <StoryAuthorImage
                                                fallback="VO"
                                                name="Voix d'Or"
                                                className="border-champagne-gold/50"
                                            />
                                            <div className="flex flex-col">
                                                <StoryAuthorName className="text-white font-monument text-[10px] uppercase tracking-wider">
                                                    {item.category}
                                                </StoryAuthorName>
                                                <h3 className="text-white font-monument text-[11px] uppercase tracking-tight mt-1 group-hover:text-champagne-gold transition-colors">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </StoryAuthor>

                                        {/* Play Indicator Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                            <div className="w-16 h-16 bg-champagne-gold/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-md">
                                                <Play className="w-6 h-6 text-black fill-black ml-1" />
                                            </div>
                                        </div>

                                        {/* Top Header Label */}
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-monument text-white/70 uppercase tracking-widest">
                                                Exclusif
                                            </span>
                                        </div>
                                    </Story>
                                ))}
                            </StoriesContent>
                        </Stories>

                        {/* Full-screen Video Modal */}
                        {activeVideoIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                                onClick={() => setActiveVideoIndex(null)}
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${(service.portfolio[activeVideoIndex] as any).videoId}?autoplay=1`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>

                                    <button
                                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/10 group z-50"
                                        onClick={() => setActiveVideoIndex(null)}
                                    >
                                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    </button>

                                    <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                                        <p className="text-champagne-gold font-monument text-xs uppercase tracking-widest mb-2">
                                            {service.portfolio[activeVideoIndex].category}
                                        </p>
                                        <h2 className="text-white font-monument text-2xl uppercase tracking-tighter">
                                            {service.portfolio[activeVideoIndex].title}
                                        </h2>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                ) : (service.portfolio[0] as any).description ? (
                    <div className="container mx-auto px-6 py-12">
                        <div className="space-y-24">
                            {service.portfolio.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
                                >
                                    <div className="flex-1 w-full relative">
                                        {(item as any).videoId && activeVideoIndex === idx ? (
                                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                                                <iframe
                                                    className="w-full h-full object-cover"
                                                    src={`https://www.youtube.com/embed/${(item as any).videoId}?autoplay=1`}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                        ) : (
                                            <div
                                                className={`relative aspect-video rounded-2xl overflow-hidden border border-white/10 group shadow-2xl ${(item as any).videoId ? 'cursor-pointer' : ''}`}
                                                onClick={() => (item as any).videoId && setActiveVideoIndex(idx)}
                                            >
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                                {/* Glow Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                                {(item as any).videoId && (
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-champagne-gold/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] backdrop-blur-md scale-95 group-hover:scale-100">
                                                        <Play className="w-6 h-6 text-black fill-black ml-1" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 space-y-6">
                                        <p className="text-champagne-gold text-sm uppercase tracking-widest font-bold">{item.category}</p>
                                        <h3 className="text-3xl md:text-5xl font-monument text-white">{item.title}</h3>
                                        <p className="text-white/70 text-lg font-satoshi leading-relaxed">
                                            {(item as any).description}
                                        </p>
                                        {(item as any).quote && (
                                            <div className="relative mt-8 p-8 bg-white/5 border-l-4 border-champagne-gold rounded-r-2xl">
                                                <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                                                <p className="text-white/90 italic font-satoshi text-lg relative z-10">
                                                    "{(item as any).quote}"
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full mt-8">
                        <ImageGallery images={service.portfolio.map(item => ({
                            title: item.title,
                            url: item.image,
                            videoId: (item as any).videoId
                        }))} />
                    </div>
                )}
            </section>

            {/* 7. FAQ SECTION & Closer */}
            <div className="bg-vantablack">
                {(service as any).faqData && (
                    <FaqSection
                        title={service.faq || "Questions Fréquentes"}
                        questions={(service as any).faqData}
                        className="bg-vantablack border-t border-white/5"
                    />
                )}
            </div>

            <section className="py-32 bg-vantablack relative">
                <div className="container mx-auto px-6">

                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-monument text-white mb-8">
                            {(service as any).faqData ? "Lancez votre projet dès aujourd'hui" : service.faq}
                        </h2>
                        <NavLink to="/contact">
                            <MagneticButton>
                                <button className="px-10 py-5 bg-champagne-gold text-vantablack font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                    Demander un devis
                                </button>
                            </MagneticButton>
                        </NavLink>
                    </div>
                </div>
            </section>
        </div>
    );
};
