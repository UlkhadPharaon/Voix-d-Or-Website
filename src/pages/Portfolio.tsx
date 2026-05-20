import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHeader } from '../components/ui/PageHeader';
import InfiniteGallery from '../components/ui/3d-gallery-photography';
import { X } from 'lucide-react';
import type { ImageItem } from '../components/ui/3d-gallery-photography';

// 🎥 Portfolio : Galerie interactive 3D des réalisations (YouTube)
// Utilise un effet de galerie infinie pour une immersion maximale

// 🔑 IDs YouTube des projets phares
const youtubeIds = [
    "L5R2RfzMSvY",
    "fkdxzegfuk4",
    "HaApx1OEU1k",
    "tsIy230X3X8",
    "-essNSRi49E",
    "reQEJulE2hU",
    "Fe099D1qAoc",
];

// Map YouTube IDs to ImageItem format required by InfiniteGallery
const galleryImages: ImageItem[] = youtubeIds.map(id => ({
    src: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    alt: `Video ${id}`,
    videoId: id
}));

const Portfolio = () => {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // 🖱️ Gestionnaire de clic sur un élément de la galerie
    const handleItemClick = (item: ImageItem) => {
        if (typeof item === 'object' && item.videoId) {
            setSelectedVideo(item.videoId);
        }
    };

    // ✖️ Fermeture de la modal vidéo
    const closeOverlay = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="bg-[#050505] min-h-screen relative overflow-hidden">
            <PageHeader title="La Galerie" subtitle="Immersion Visuelle" />

            {/* 3D Infinite Gallery Container */}
            <div className="w-full h-[calc(100vh-200px)] relative z-10">
                <InfiniteGallery
                    images={galleryImages}
                    speed={1.5}
                    zSpacing={4}
                    visibleCount={10}
                    falloff={{ near: 0.8, far: 18 }}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                    onItemClick={handleItemClick}
                />

                {/* Navigation Hint */}
                <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="inline-flex flex-col items-center"
                    >
                        <p className="font-monument text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] mb-2">
                            Explorez la Galerie
                        </p>
                        <p className="font-satoshi text-xs text-white/50 tracking-wide">
                            Utilisez la souris, le trackpad ou les flèches pour naviguer.<br />Cliquez sur une œuvre pour la visionner.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Video Overlay Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12 cursor-pointer"
                        onClick={closeOverlay}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: 0.2 }}
                            onClick={closeOverlay}
                            className="absolute top-8 right-8 flex items-center gap-3 text-white/50 hover:text-[#D4AF37] transition-all duration-300 z-50 group px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D4AF37]"
                        >
                            <span className="font-monument text-xs tracking-widest uppercase mt-0.5">Fermer</span>
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </motion.button>

                        {/* Video Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-7xl aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1&controls=1&color=white`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full absolute inset-0"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Portfolio;
