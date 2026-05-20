import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiquidText } from '@/components/ui/LiquidText';
import { ArrowDown } from 'lucide-react';

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

export const ServicesHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);

    return (
        <section
            ref={containerRef}
            className="preserve-white relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
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
                    <source src="/assets/video/services-hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-vantablack/50 to-transparent" />
            </motion.div>

            {/* Golden Dust Overlay */}
            <GoldenDust />

            {/* Content */}
            <div className="relative z-10 text-center container px-6 pointer-events-none">
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <span className="text-champagne-gold uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 block font-monument">
                            Studio Voix d'Or
                        </span>

                        <LiquidText id="services-title" maxDisplacement={25} className="inline-block">
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-monument uppercase tracking-tighter text-white mb-6 leading-none drop-shadow-2xl">
                                L'Art de <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-white to-champagne-gold">Création</span>
                            </h1>
                        </LiquidText>

                        <p className="text-white font-bold font-satoshi text-xs md:text-sm tracking-[0.3em] uppercase max-w-2xl mx-auto mt-8">
                            Fusionner technologie et émotion pour des expériences inoubliables
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="text-white w-6 h-6 animate-bounce" />
            </motion.div>
        </section>
    );
};
