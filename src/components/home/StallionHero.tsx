// 🚀 StallionHero : Section Hero cinématique avec fond vidéo et particules de poussière dorée
// Ce composant gère un canvas pour l'effet de particules et Framer Motion pour le parallaxe au scroll

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LiquidText } from '@/components/ui/LiquidText';

// ✨ Composant Interne : GoldenDust
// Gère l'effet de "poussière dorée" flottante via un Canvas HTML5 pour les performances
const GoldenDust = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

        // 📏 Redimensionne le canvas selon la fenêtre
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // 💎 Initialisation des particules
        const initParticles = () => {
            particles = [];
            const particleCount = 100; // Nombre de particules
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        };

        // 🎬 Boucle d'animation optimisée
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                // 🔄 Réinitialise la position si la particule sort de l'écran
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.shadowBlur = 5;
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

export const StallionHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 🎢 Configuration des effets de scroll (Parallaxe)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const blurAmount = useTransform(scrollYProgress, [0, 0.5], ["0px", "10px"]);

    // 🔊 Gestion de l'interaction sonore (Optionnel)
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
            {/* 🎥 Fond Vidéo (Étalon Noir) */}
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
                    <source src="/assets/video/stallion-hero.mp4" type="video/mp4" />
                </video>
                {/* 🌑 Overlay dégradé pour améliorer la lisibilité des textes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </motion.div>

            {/* ✨ Particules dorées */}
            <GoldenDust />

            {/* ✍️ Typographie Haute Couture "LEGENDARY" */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 z-30 pointer-events-none">
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="text-center px-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    >
                        <h2 className="text-gold font-monument text-sm md:text-lg tracking-[0.5em] uppercase mb-4">
                            POUR LES MARQUES QUI REFUSENT L'ANONYMAT.
                        </h2>
                        {/* 🌊 LiquidText : Animation de déformation organique au survol */}
                        <LiquidText id="stallion-title" maxDisplacement={25} className="inline-block">
                            <h1 className="text-5xl md:text-8xl lg:text-9xl font-monument uppercase tracking-tighter text-white mb-6 leading-none drop-shadow-2xl">
                                L'Art De <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">Dominer.</span>
                            </h1>
                        </LiquidText>
                        <p className="text-white/60 font-satoshi text-xs md:text-sm tracking-[0.3em] uppercase">
                            Bâtisseurs d'empires audiovisuels.
                        </p>
                    </motion.div>
                </motion.div>
            </div>

            {/* 🖱️ Indicateur de Scroll */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
            </motion.div>
        </section>
    );
};
