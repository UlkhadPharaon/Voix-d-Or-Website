import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type CardStackItem = {
    id: string | number;
    title: string;
    description?: string;
    imageSrc?: string;
    href?: string;
    ctaLabel?: string;
    tag?: string;
    price?: string;
};

export type CardStackProps<T extends CardStackItem> = {
    items: T[];

    /** Selected index on mount */
    initialIndex?: number;

    /** How many cards are visible around the active (odd recommended) */
    maxVisible?: number;

    /** Card sizing */
    cardWidth?: number;
    cardHeight?: number;

    /** How much cards overlap each other (0..0.8). Higher = more overlap */
    overlap?: number;

    /** Total fan angle (deg). Higher = wider arc */
    spreadDeg?: number;

    /** 3D / depth feel */
    perspectivePx?: number;
    depthPx?: number;
    tiltXDeg?: number;

    /** Active emphasis */
    activeLiftPx?: number;
    activeScale?: number;
    inactiveScale?: number;

    /** Motion */
    springStiffness?: number;
    springDamping?: number;

    /** Behavior */
    loop?: boolean;
    autoAdvance?: boolean;
    intervalMs?: number;
    pauseOnHover?: boolean;

    /** UI */
    showDots?: boolean;
    className?: string;

    /** Hooks */
    onChangeIndex?: (index: number, item: T) => void;

    /** Custom renderer (optional) */
    renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
    if (len <= 0) return 0;
    return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
    const raw = i - active;
    if (!loop || len <= 1) return raw;

    // consider wrapped alternative
    const alt = raw > 0 ? raw - len : raw + len;
    return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
    items,
    initialIndex = 0,
    maxVisible = 7,

    cardWidth = 520,
    cardHeight = 320,

    overlap = 0.48,
    spreadDeg = 48,

    perspectivePx = 1100,
    depthPx = 140,
    tiltXDeg = 12,

    activeLiftPx = 22,
    activeScale = 1.03,
    inactiveScale = 0.94,

    springStiffness = 280,
    springDamping = 28,

    loop = true,
    autoAdvance = false,
    intervalMs = 2800,
    pauseOnHover = true,

    showDots = true,
    className,

    onChangeIndex,
    renderCard,
}: CardStackProps<T>) {
    const reduceMotion = useReducedMotion();
    const len = items.length;

    const [active, setActive] = React.useState(() =>
        wrapIndex(initialIndex, len),
    );
    const [hovering, setHovering] = React.useState(false);

    // keep active in bounds if items change
    React.useEffect(() => {
        setActive((a) => wrapIndex(a, len));
    }, [len]);

    React.useEffect(() => {
        if (!len) return;
        onChangeIndex?.(active, items[active]!);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

    const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    const canGoPrev = loop || active > 0;
    const canGoNext = loop || active < len - 1;

    const prev = React.useCallback(() => {
        if (!len) return;
        if (!canGoPrev) return;
        setActive((a) => wrapIndex(a - 1, len));
    }, [canGoPrev, len]);

    const next = React.useCallback(() => {
        if (!len) return;
        if (!canGoNext) return;
        setActive((a) => wrapIndex(a + 1, len));
    }, [canGoNext, len]);

    // keyboard navigation (when container focused)
    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    // autoplay
    React.useEffect(() => {
        if (!autoAdvance) return;
        if (reduceMotion) return;
        if (!len) return;
        if (pauseOnHover && hovering) return;

        const id = window.setInterval(
            () => {
                if (loop || active < len - 1) next();
            },
            Math.max(700, intervalMs),
        );

        return () => window.clearInterval(id);
    }, [
        autoAdvance,
        intervalMs,
        hovering,
        pauseOnHover,
        reduceMotion,
        len,
        loop,
        active,
        next,
    ]);

    if (!len) return null;

    const activeItem = items[active]!;

    return (
        <div
            className={cn("w-full", className)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            {/* Stage */}
            <div
                className="relative w-full"
                style={{ height: Math.max(380, cardHeight + 80) }}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                {/* background wash / spotlight (unique feel) */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-black/5 blur-3xl dark:bg-white/5"
                    aria-hidden="true"
                />
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-[#C5A059]/10 blur-[80px]"
                    aria-hidden="true"
                />

                <div
                    className="absolute inset-0 flex items-end justify-center"
                    style={{
                        perspective: `${perspectivePx}px`,
                    }}
                >
                    <AnimatePresence initial={false}>
                        {items.map((item, i) => {
                            const off = signedOffset(i, active, len, loop);
                            const abs = Math.abs(off);
                            const visible = abs <= maxOffset;

                            // hide far-away cards cleanly
                            if (!visible) return null;

                            // fan geometry
                            const rotateZ = off * stepDeg;
                            const x = off * cardSpacing;
                            const y = abs * 10; // subtle arc-down feel
                            const z = -abs * depthPx;

                            const isActive = off === 0;

                            const scale = isActive ? activeScale : inactiveScale;
                            const lift = isActive ? -activeLiftPx : 0;

                            const rotateX = isActive ? 0 : tiltXDeg;

                            const zIndex = 100 - abs;

                            // drag only on the active card
                            const dragProps = isActive
                                ? {
                                    drag: "x" as const,
                                    dragConstraints: { left: 0, right: 0 },
                                    dragElastic: 0.18,
                                    onDragEnd: (
                                        _e: any,
                                        info: { offset: { x: number }; velocity: { x: number } },
                                    ) => {
                                        if (reduceMotion) return;
                                        const travel = info.offset.x;
                                        const v = info.velocity.x;
                                        const threshold = Math.min(160, cardWidth * 0.22);

                                        // swipe logic
                                        if (travel > threshold || v > 650) prev();
                                        else if (travel < -threshold || v < -650) next();
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={item.id}
                                    className={cn(
                                        "absolute bottom-0 rounded-2xl border-[1px] border-[#C5A059]/30 overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]",
                                        "will-change-transform select-none backdrop-blur-md bg-white/70 dark:bg-[#0a0a0a]/70",
                                        isActive
                                            ? "cursor-grab active:cursor-grabbing"
                                            : "cursor-pointer",
                                    )}
                                    style={{
                                        width: cardWidth,
                                        height: cardHeight,
                                        zIndex,
                                        transformStyle: "preserve-3d",
                                    }}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : {
                                                opacity: 0,
                                                y: y + 40,
                                                x,
                                                rotateZ,
                                                rotateX,
                                                scale,
                                            }
                                    }
                                    animate={{
                                        opacity: 1,
                                        x,
                                        y: y + lift,
                                        rotateZ,
                                        rotateX,
                                        scale,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: springStiffness,
                                        damping: springDamping,
                                    }}
                                    onClick={() => setActive(i)}
                                    {...dragProps}
                                >
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            transform: `translateZ(${z}px)`,
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {renderCard ? (
                                            renderCard(item, { active: isActive })
                                        ) : (
                                            <DefaultFanCard item={item} active={isActive} />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Dots navigation centered at bottom */}
            {showDots ? (
                <div className="mt-8 flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                        {items.map((it, idx) => {
                            const on = idx === active;
                            return (
                                <button
                                    key={it.id}
                                    onClick={() => setActive(idx)}
                                    className={cn(
                                        "h-2 w-2 rounded-full transition-all duration-300",
                                        on
                                            ? "bg-[#C5A059] scale-125"
                                            : "bg-[#C5A059]/30 hover:bg-[#C5A059]/50",
                                    )}
                                    aria-label={`Go to ${it.title}`}
                                />
                            );
                        })}
                    </div>
                    {activeItem.href ? (
                        <Link
                            to={activeItem.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#C5A059]/70 hover:text-[#C5A059] transition ml-2"
                            aria-label="Open link"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Link>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
    return (
        <div className="relative h-full w-full bg-white/20 dark:bg-black/20 flex flex-col pt-8 pb-6 px-8">
            {/* subtle decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C5A059]/20 to-transparent rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    {item.tag && (
                        <span className="inline-block px-3 py-1 mb-4 border border-[#C5A059]/50 text-[#C5A059] text-[10px] uppercase tracking-widest rounded-full bg-[#C5A059]/5">
                            {item.tag}
                        </span>
                    )}
                    <div className="text-2xl md:text-3xl font-monument text-black dark:text-white leading-tight mb-2">
                        {item.title}
                    </div>
                    {item.description ? (
                        <div className="mt-4 text-sm md:text-base font-light font-satoshi text-black/70 dark:text-white/70 leading-relaxed">
                            {item.description}
                        </div>
                    ) : null}
                    {item.price && (
                        <div className="mt-4 text-[#C5A059] font-bold text-sm uppercase tracking-widest">
                            {item.price}
                        </div>
                    )}
                </div>

                {item.ctaLabel && (
                    <div className="flex justify-end mt-4 shrink-0 transition-opacity duration-300" style={{ opacity: active ? 1 : 0.6 }}>
                        <div className="text-[#C5A059] text-sm uppercase tracking-widest font-bold flex items-center group">
                            {item.ctaLabel}
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-2">→</span>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
