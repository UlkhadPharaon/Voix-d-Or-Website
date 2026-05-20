"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    src: string;
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({ src, index, target }: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className="cursor-pointer group z-20"
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotateY: 180 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.15)] bg-[#1a1a1a] border border-white/5"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <img
                        src={src}
                        alt={`hero-${index}`}
                        className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-transparent" />
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-[#050505] flex flex-col items-center justify-center p-4 border border-[#D4AF37]/50"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="text-center">
                        <p className="text-[8px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1 font-monument">Voir</p>
                        <p className="text-xs font-medium text-white font-satoshi">PUB</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 20;
const MOBILE_IMAGES = 12;
const MAX_SCROLL = 1200;

const IMAGES = [
    "/assets/images/hero/audio horizontale.webp",
    "/assets/images/hero/Audio verticale.webp",
    "/assets/images/hero/clip video Horizontale.webp",
    "/assets/images/hero/clip video Verticale.webp",
    "/assets/images/hero/on_set_image1.webp",
    "/assets/images/hero/Onset_image5.webp",
    "/assets/images/hero/Onset_image7.webp",
    "/assets/images/hero/Onset_image8.webp",
    "/assets/images/hero/Onset_image9.webp",
    "/assets/images/hero/Onset_image10.webp",
    "/assets/images/hero/Onset_image11.webp",
    "/assets/images/hero/Onset_image12.webp",
    "/assets/images/hero/Onset_image13.webp",
    "/assets/images/hero/Post production Horizontale 1.webp",
    "/assets/images/hero/post_production_Vertical.webp",
    "/assets/images/hero/Production video horizontale.webp",
    "/assets/images/hero/Production video verticale.webp",
    "/assets/images/hero/spot publicitaire horizontale.webp",
    "/assets/images/hero/Spot_Publicitaire(verticale).webp",
    "/assets/images/hero/Onset_image14.webp",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export default function ScrollMorphHero({
    title = "Spot Publicitaire",
    subtitle = "L'impact visuel au service de votre ROI."
}: {
    title?: string;
    subtitle?: string;
}) {
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            // Let normal scrolling happen when at the ends of the animation
            if ((scrollRef.current === 0 && e.deltaY < 0) || (scrollRef.current === MAX_SCROLL && e.deltaY > 0)) {
                return; // Let browser scroll the page
            }
            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        const isMobileDevice = window.innerWidth < 768;
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            const touchY = e.touches[0].clientY;
            const rawDelta = touchStartY - touchY;
            touchStartY = touchY;
            // Amplify swipe sensitivity on mobile so 1-2 swipes complete the animation
            const deltaY = isMobileDevice ? rawDelta * 3 : rawDelta;

            if ((scrollRef.current === 0 && deltaY < 0) || (scrollRef.current === MAX_SCROLL && deltaY > 0)) {
                return;
            }
            e.preventDefault();

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    const scrollRotate = useTransform(virtualScroll, [600, MAX_SCROLL], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, []);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div ref={containerRef} className="relative w-full h-[80vh] md:h-[90vh] bg-[#050505] overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000">

                <div className="absolute z-50 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.8 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-[#D4AF37] font-monument text-sm md:text-md tracking-[0.2em] uppercase mb-4"
                    >
                        {subtitle}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-7xl font-medium tracking-tight text-white font-display"
                    >
                        {title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-8 text-xs font-bold tracking-[0.2em] text-[#D4AF37]/70"
                    >
                        SCROLL POUR DÉCOUVRIR
                    </motion.p>
                </div>

                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className="absolute top-[15%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4 uppercase">
                        La Galerie <span className="text-[#D4AF37]">Pub</span>
                    </h2>
                    <p className="text-sm md:text-base text-gray-400 font-satoshi max-w-lg leading-relaxed">
                        Explorez notre collection de visuels publicitaires haut de gamme. <br className="hidden md:block" />
                        Chaque image est un point de contact pour captiver votre audience.
                    </p>
                </motion.div>

                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, containerSize.width < 768 ? MOBILE_IMAGES : TOTAL_IMAGES).map((src, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            // Increased multiplier from 0.35 to 0.45, and max cap from 350 to 500
                            const circleRadius = Math.min(minDimension * 0.45, 500);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);

                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                total={TOTAL_IMAGES}
                                phase={introPhase}
                                target={target}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-30" />
        </div>
    );
}
