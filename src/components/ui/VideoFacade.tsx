import React, { useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoFacadeProps {
    videoId: string;
    title: string;
    client: string;
    category: string;
    size?: 'small' | 'medium' | 'large';
}

export const VideoFacade: React.FC<VideoFacadeProps> = ({ videoId, title, client, category, size = 'medium' }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // The containerRef and isHovered state are not used in the current implementation,
    // as the magnetic effect is applied directly to the play button and the hover state
    // is not explicitly needed for other elements.
    // const containerRef = useRef<HTMLDivElement>(null);
    // const [isHovered, setIsHovered] = useState(false);

    // Magnetic Play Button Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const magneticX = useSpring(mouseX, springConfig);
    const magneticY = useSpring(mouseY, springConfig);

    // The handleMouseMove, handleMouseLeave, and handleMouseEnter functions are not used
    // if containerRef and isHovered are removed.
    // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    //     if (!containerRef.current) return;
    //     const rect = containerRef.current.getBoundingClientRect();

    //     // Calculate position relative to center of the container
    //     const centerX = rect.left + rect.width / 2;
    //     const centerY = rect.top + rect.height / 2;

    //     // Max displacement for the magnetic effect (e.g., 30px)
    //     const maxDisplacement = 30;

    //     // Calculate displacement based on mouse position relative to center
    //     // The closer to the edge, the more it moves, but capped at maxDisplacement
    //     const xPct = (e.clientX - centerX) / (rect.width / 2);
    //     const yPct = (e.clientY - centerY) / (rect.height / 2);

    //     mouseX.set(xPct * maxDisplacement);
    //     mouseY.set(yPct * maxDisplacement);
    // };

    // const handleMouseLeave = () => {
    //     setIsHovered(false);
    //     mouseX.set(0);
    //     mouseY.set(0);
    // };

    // const handleMouseEnter = () => {
    //     setIsHovered(true);
    // };

    // Construct high-res thumbnail URL
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Construct iframe URL with clean parameters
    // rel=0: No related videos from other channels at the end
    // modestbranding=1: Minimal YouTube logo
    // color=white: White progress bar for a cleaner look
    const iframeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&color=white`;

    const heightClass = size === 'large' ? 'h-[600px]' : size === 'medium' ? 'h-[400px]' : 'h-[300px]';

    return (
        <div
            // ref={containerRef} // containerRef is no longer used
            className={`relative w-full ${heightClass} rounded-xl overflow-hidden group cursor-pointer border border-white/5 bg-[#050505] transform-gpu`}
            onClick={() => setIsPlaying(true)}
        // onMouseMove={handleMouseMove} // handleMouseMove is no longer used
        // onMouseEnter={handleMouseEnter} // handleMouseEnter is no longer used
        // onMouseLeave={handleMouseLeave} // handleMouseLeave is no longer used
        >
            {!isPlaying ? (
                <>
                    {/* Thumbnail Image with slow zoom on hover */}
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                        />
                        {/* Elegant gradient overlay for text legibility and mood */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
                        <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-2 font-bold drop-shadow-md">
                            {category}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl text-white font-normal leading-tight mb-1 drop-shadow-lg">
                            {title}
                        </h3>
                        <p className="text-white/60 text-sm font-satoshi font-light tracking-wide">
                            {client}
                        </p>
                    </div>

                    {/* Magnetic Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <motion.div
                            style={{ x: magneticX, y: magneticY }}
                            className="relative flex items-center justify-center"
                        >
                            {/* Glassmorphism Button Background */}
                            <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-[#C5A059]/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-white/10 group-hover:border-[#C5A059] group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all duration-500">
                                <Play className="w-8 h-8 text-[#D4AF37] fill-[#D4AF37] ml-1 group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Pulse effect rings */}
                            <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDuration: '3s' }} />
                        </motion.div>
                    </div>
                </>
            ) : (
                /* Active Iframe State */
                <div className="absolute inset-0 w-full h-full bg-black">
                    <iframe
                        src={iframeUrl}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0 absolute top-0 left-0"
                    />
                </div>
            )}
        </div>
    );
};
