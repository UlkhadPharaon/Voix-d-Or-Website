import { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

// ─── CUSTOM HOOK: useScrollVelocity ─────────────────────────────────
// Returns a normalized value [0, 1] based on scroll speed.
// Uses requestAnimationFrame for smooth 60fps tracking.
const useScrollVelocity = (sensitivity: number = 0.005, decay: number = 0.92): number => {
    const [velocity, setVelocity] = useState(0);
    const lastScrollY = useRef(0);
    const lastTime = useRef(Date.now());
    const animFrame = useRef<number>(0);
    const currentVelocity = useRef(0);

    useEffect(() => {
        // Check for prefers-reduced-motion
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        const tick = () => {
            const now = Date.now();
            const dt = Math.max(now - lastTime.current, 1); // Avoid division by zero
            const currentY = window.scrollY;
            const dy = Math.abs(currentY - lastScrollY.current);

            // Calculate instantaneous velocity normalized by time delta
            const instantVelocity = (dy / dt) * sensitivity * 16; // Normalize to ~60fps

            // Blend: fast attack, slow decay (exponential smoothing)
            if (instantVelocity > currentVelocity.current) {
                currentVelocity.current = Math.min(instantVelocity, 1); // Clamp to 1
            } else {
                currentVelocity.current *= decay; // Exponential decay
            }

            // Kill micro-values for performance
            if (currentVelocity.current < 0.001) {
                currentVelocity.current = 0;
            }

            lastScrollY.current = currentY;
            lastTime.current = now;
            setVelocity(currentVelocity.current);

            animFrame.current = requestAnimationFrame(tick);
        };

        animFrame.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(animFrame.current);
        };
    }, [sensitivity, decay]);

    return velocity;
};

// ─── CUSTOM HOOK: useReducedMotion ───────────────────────────────────
const useReducedMotion = (): boolean => {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mq.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────
interface LiquidTextProps {
    children: ReactNode;
    className?: string;
    /** Unique ID per instance (required for SVG filter isolation) */
    id?: string;
    /** Max displacement scale. Default 30. */
    maxDisplacement?: number;
    /** Turbulence frequency X. Default 0.01 */
    freqX?: number;
    /** Turbulence frequency Y. Default 0.08 */
    freqY?: number;
    /** Velocity detection sensitivity. Default 0.005 */
    sensitivity?: number;
}

export const LiquidText = ({
    children,
    className = '',
    id = 'liquid',
    maxDisplacement = 30,
    freqX = 0.01,
    freqY = 0.08,
    sensitivity = 0.005
}: LiquidTextProps) => {
    const prefersReduced = useReducedMotion();
    const velocity = useScrollVelocity(sensitivity);
    const filterRef = useRef<SVGFEDisplacementMapElement>(null);
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

    // Spring-based motion value for elastic return
    const rawDisplacement = useMotionValue(0);
    const springDisplacement = useSpring(rawDisplacement, {
        stiffness: 300,
        damping: 20,
        mass: 0.8
    });

    // Secondary deformations derived from velocity
    const skewX = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
    const scaleY = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

    // Update displacement from velocity
    useEffect(() => {
        if (prefersReduced) return;

        const displacementValue = velocity * maxDisplacement;
        rawDisplacement.set(displacementValue);

        // Skew: velocity-driven lateral shear
        skewX.set(velocity * 8); // Max ~8deg at full speed
        // ScaleY: slight vertical compression at speed
        scaleY.set(1 - velocity * 0.05); // Max 5% compression

    }, [velocity, maxDisplacement, prefersReduced, rawDisplacement, skewX, scaleY]);

    // Apply SVG filter displacement via rAF (direct DOM manipulation for 60fps)
    useEffect(() => {
        if (prefersReduced) return;

        const unsubscribe = springDisplacement.on('change', (v) => {
            if (filterRef.current) {
                filterRef.current.setAttribute('scale', String(v));
            }
        });

        return () => unsubscribe();
    }, [springDisplacement, prefersReduced]);

    // Animate turbulence seed for organic movement
    useEffect(() => {
        if (prefersReduced) return;

        let seed = 0;
        let animFrame: number;

        const animateTurbulence = () => {
            seed += 0.5;
            if (turbulenceRef.current) {
                turbulenceRef.current.setAttribute('seed', String(Math.floor(seed)));
            }
            animFrame = requestAnimationFrame(animateTurbulence);
        };

        // Only animate when there's velocity
        const unsubscribe = springDisplacement.on('change', (v) => {
            if (v > 0.5) {
                animFrame = requestAnimationFrame(animateTurbulence);
            }
        });

        return () => {
            unsubscribe();
            cancelAnimationFrame(animFrame);
        };
    }, [springDisplacement, prefersReduced]);

    const filterId = `${id}-filter`;

    if (prefersReduced) {
        return <div className={className}>{children}</div>;
    }

    return (
        <>
            {/* SVG Filter Definition (hidden, referenced by CSS) */}
            <svg
                className="absolute w-0 h-0 overflow-hidden"
                aria-hidden="true"
                style={{ position: 'absolute', width: 0, height: 0 }}
            >
                <defs>
                    <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                        <feTurbulence
                            ref={turbulenceRef}
                            type="fractalNoise"
                            baseFrequency={`${freqX} ${freqY}`}
                            numOctaves={2}
                            seed={1}
                            stitchTiles="stitch"
                            result="warp"
                        />
                        <feDisplacementMap
                            ref={filterRef}
                            xChannelSelector="R"
                            yChannelSelector="G"
                            scale={0}
                            in="SourceGraphic"
                            in2="warp"
                        />
                    </filter>
                </defs>
            </svg>

            {/* The Liquid Text Container */}
            <motion.div
                className={className}
                style={{
                    filter: `url(#${filterId})`,
                    skewX,
                    scaleY,
                    willChange: 'filter, transform',
                }}
            >
                {children}
            </motion.div>
        </>
    );
};
