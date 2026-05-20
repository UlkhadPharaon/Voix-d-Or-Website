"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
    quote: string;
    name: string;
    designation: string;
    src: string;
}

interface Colors {
    name?: string;
    designation?: string;
    testimony?: string;
    arrowBackground?: string;
    arrowForeground?: string;
    arrowHoverBackground?: string;
}

interface FontSizes {
    name?: string;
    designation?: string;
    quote?: string;
}

interface CircularTestimonialsProps {
    testimonials: Testimonial[];
    autoplay?: boolean;
    colors?: Colors;
    fontSizes?: FontSizes;
}

function calculateGap(width: number) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
}: CircularTestimonialsProps) => {
    const colorName = colors.name ?? "#fff";
    const colorDesignation = colors.designation ?? "#D4AF37";
    const colorTestimony = colors.testimony ?? "#a1a1aa";
    const colorArrowBg = colors.arrowBackground ?? "#141414";
    const colorArrowFg = colors.arrowForeground ?? "#D4AF37";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "#D4AF37";
    const fontSizeName = fontSizes.name ?? "1.5rem";
    const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(
        () => testimonials[activeIndex],
        [activeIndex, testimonials]
    );

    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonialsLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handlePrev, handleNext]);

    function getImageStyle(index: number): React.CSSProperties {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
        const isRight = (activeIndex + 1) % testimonialsLength === index;
        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                filter: "grayscale(0%)",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                filter: "grayscale(100%)",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                filter: "grayscale(100%)",
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="circular-testimonial-container">
            <div className="circular-testimonial-grid">
                {/* Images */}
                <div className="circular-image-container" ref={imageContainerRef}>
                    {testimonials.map((testimonial, index) => (
                        <img
                            key={testimonial.src}
                            src={testimonial.src}
                            alt={testimonial.name}
                            className="circular-testimonial-image"
                            data-index={index}
                            style={getImageStyle(index)}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
                {/* Content */}
                <div className="circular-testimonial-content">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={quoteVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h3
                                className="circular-name font-display"
                                style={{ color: colorName, fontSize: fontSizeName }}
                            >
                                {activeTestimonial.name}
                            </h3>
                            <p
                                className="circular-designation font-monument"
                                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                            >
                                {activeTestimonial.designation}
                            </p>
                            <motion.p
                                className="circular-quote font-satoshi"
                                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                            >
                                {activeTestimonial.quote.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.22,
                                            ease: "easeInOut",
                                            delay: 0.025 * i,
                                        }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                    <div className="circular-arrow-buttons">
                        <button
                            className="circular-arrow-button"
                            onClick={handlePrev}
                            style={{
                                backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                            }}
                            onMouseEnter={() => setHoverPrev(true)}
                            onMouseLeave={() => setHoverPrev(false)}
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft size={20} color={hoverPrev ? "#000" : colorArrowFg} />
                        </button>
                        <button
                            className="circular-arrow-button"
                            onClick={handleNext}
                            style={{
                                backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                            }}
                            onMouseEnter={() => setHoverNext(true)}
                            onMouseLeave={() => setHoverNext(false)}
                            aria-label="Next testimonial"
                        >
                            <ArrowRight size={20} color={hoverNext ? "#000" : colorArrowFg} />
                        </button>
                    </div>
                </div>
            </div>
            <style>{`
                .circular-testimonial-container {
                    width: 100%;
                    max-width: 64rem;
                    padding: 2rem;
                }
                .circular-testimonial-grid {
                    display: grid;
                    gap: 4rem;
                }
                .circular-image-container {
                    position: relative;
                    width: 100%;
                    height: 26rem;
                    perspective: 1000px;
                }
                .circular-testimonial-image {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 1rem;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.1);
                    cursor: pointer;
                }
                .circular-testimonial-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .circular-name {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                    letter-spacing: 0.02em;
                }
                .circular-designation {
                    margin-bottom: 1.5rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-size: 0.75rem !important;
                    font-weight: 600;
                }
                .circular-quote {
                    line-height: 1.9;
                    font-style: italic;
                    font-weight: 300;
                }
                .circular-arrow-buttons {
                    display: flex;
                    gap: 1rem;
                    padding-top: 2.5rem;
                }
                .circular-arrow-button {
                    width: 2.8rem;
                    height: 2.8rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s;
                    border: 1px solid rgba(212, 175, 55, 0.2);
                }
                .circular-arrow-button:hover {
                    border-color: rgba(212, 175, 55, 0.6);
                    box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
                }
                @media (min-width: 768px) {
                    .circular-testimonial-grid {
                        grid-template-columns: 1fr 1fr;
                        gap: 5rem;
                    }
                    .circular-arrow-buttons {
                        padding-top: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default CircularTestimonials;
