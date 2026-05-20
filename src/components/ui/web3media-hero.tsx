import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CryptoIcon {
    icon: React.ReactNode;
    label: string;
    position: { x: string; y: string };
}

interface Web3MediaHeroProps {
    logo?: string;
    navigation?: Array<{
        label: string;
        href?: string;
        onClick?: () => void;
    }>;
    contactButton?: {
        label: string;
        onClick: () => void;
    };
    title: string;
    highlightedText?: string;
    subtitle: string;
    ctaButton?: {
        label: string;
        onClick: () => void;
    };
    cryptoIcons?: CryptoIcon[];
    trustedByText?: string;
    brands?: Array<{
        name: string;
        logo: React.ReactNode;
    }>;
    videoBackground?: string;
    videoPoster?: string;
    className?: string;
    children?: React.ReactNode;
}

export function Web3MediaHero({
    logo = "Voix d'Or",
    title,
    highlightedText,
    subtitle,
    ctaButton,
    cryptoIcons = [],
    trustedByText = "Ils nous font confiance",
    brands = [],
    videoBackground,
    videoPoster,
    className,
    children,
}: Web3MediaHeroProps) {
    return (
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col overflow-hidden text-white",
                !videoBackground && "bg-vantablack",
                videoBackground && "preserve-white bg-[#FAFAFA]",
                className
            )}
            role="banner"
            aria-label="Hero section"
        >
            {/* Background Video */}
            {videoBackground && (
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                    <video
                        className="w-full h-full object-cover opacity-60"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={videoPoster}
                    >
                        <source src={videoBackground} type="video/mp4" />
                    </video>
                    {/* Dark gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-vantablack/40 to-transparent" />
                </div>
            )}

            {/* Radial Glow Background */}
            <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
                <div
                    className="absolute opacity-40 blur-[120px]"
                    style={{
                        width: "800px",
                        height: "800px",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, rgba(0,0,0,0) 70%)",
                    }}
                />
            </div>

            {/* Main Content */}
            {children ? (
                <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                    {children}
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-32 mt-12 md:mt-0">
                    {/* Floating Icons */}
                    {cryptoIcons.map((crypto, index) => (
                        <motion.div
                            key={index}
                            className="absolute hidden md:flex flex-col items-center gap-2 pointer-events-none"
                            style={{
                                left: crypto.position.x,
                                top: crypto.position.y,
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -20, 0],
                            }}
                            transition={{
                                opacity: { duration: 0.6, delay: 0.3 + index * 0.1 },
                                scale: { duration: 0.6, delay: 0.3 + index * 0.1 },
                                y: {
                                    duration: 3 + index * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                            }}
                        >
                            <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md border border-champagne-gold/20 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.1)] text-champagne-gold">
                                {crypto.icon}
                            </div>
                            <span className="font-monument text-[10px] text-white/60 tracking-widest uppercase">
                                {crypto.label}
                            </span>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col items-center text-center max-w-4xl gap-8"
                    >
                        {/* Logo Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="font-monument text-xs text-champagne-gold/60 tracking-[0.2em] uppercase border border-champagne-gold/20 px-4 py-1 rounded-full bg-champagne-gold/5"
                        >
                            {logo}
                        </motion.div>

                        {/* Title */}
                        <h1 className="font-monument font-medium text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight">
                            {title}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold via-white to-champagne-gold font-bold">
                                {highlightedText}
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="font-satoshi text-white/80 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
                            {subtitle}
                        </p>

                        {/* CTA Button */}
                        {ctaButton && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={ctaButton.onClick}
                                className="px-8 py-3 rounded-md bg-champagne-gold text-black font-monument text-xs md:text-sm font-bold tracking-widest hover:bg-white transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                            >
                                {ctaButton.label}
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Brand Slider */}
            {brands.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative z-10 w-full overflow-hidden py-12 border-t border-white/5 bg-black/20 backdrop-blur-sm"
                >
                    {/* "Trusted by" Text */}
                    <div className="text-center mb-8">
                        <span className="font-monument text-[10px] text-white/50 tracking-[0.2em] uppercase">
                            {trustedByText}
                        </span>
                    </div>

                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-vantablack to-transparent pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-vantablack to-transparent pointer-events-none" />

                    {/* Scrolling Brands */}
                    <div className="flex overflow-hidden">
                        <motion.div
                            className="flex items-center gap-16 pr-16"
                            animate={{
                                x: ["0%", "-50%"],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30, // Slower for smoother performance
                                    ease: "linear",
                                },
                            }}
                        >
                            {[...brands, ...brands].map((brand, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                >
                                    {/* Optimized image loading */}
                                    {typeof brand.logo === 'string' ? (
                                        <img 
                                            src={brand.logo} 
                                            alt={brand.name} 
                                            loading="lazy"
                                            decoding="async"
                                            className="h-8 md:h-10 w-auto object-contain" 
                                        />
                                    ) : (
                                        brand.logo
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
