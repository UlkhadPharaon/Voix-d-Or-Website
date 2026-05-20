import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiquidText } from '@/components/ui/LiquidText';

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
            const particleCount = 80; // Slightly less dense for clarity
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

export const AboutHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.5], ["0px", "8px"]);

    // Sound on interaction logic (placeholder)
    const [hasInteracted, setHasInteracted] = useState(false);
    const handleInteraction = () => {
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    return (
        <section
            ref={containerRef}
            className="preserve-white relative h-screen w-full overflow-hidden bg-[#FAFAFA]"
            onClick={handleInteraction}
            onScroll={handleInteraction}
        >
            {/* 1. BACKGROUND VIDEO */}
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
                    <source src="/assets/video/about-hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-vantablack/40 to-transparent" />
            </motion.div>

            {/* 2. GOLDEN DUST */}
            <GoldenDust />

            {/* 3. TYPOGRAPHY */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-6">
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="text-center"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    >
                        <h2 className="text-champagne-gold font-monument text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
                            Notre Histoire
                        </h2>
                        <LiquidText id="about-title" maxDisplacement={20} className="inline-block">
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-monument uppercase tracking-tighter text-white mb-6 leading-none drop-shadow-lg">
                                L'Âme Du <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white to-champagne-gold">Studio</span>
                            </h1>
                        </LiquidText>
                        <div className="w-24 h-[1px] bg-champagne-gold/50 mx-auto mb-6" />
                        <p className="text-white font-bold font-satoshi text-sm md:text-lg tracking-[0.2em] uppercase max-w-xl mx-auto drop-shadow-md">
                            Au delà du son, une vision pour l'éternité
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
                animate={{ scaleY: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
            >
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent" />
            </motion.div>
        </section>
    );
};
