import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '@/data/cinematic_constants';
import { Play, X, Trophy, Target, Zap } from 'lucide-react';
import { CardStack } from '@/components/ui/card-stack';
import type { CardStackItem } from '@/components/ui/card-stack';

// Map portfolio data to CardStack format
interface VaultCardItem extends CardStackItem {
    category: string;
    client: string;
    challenge: string;
    solution: string;
    result: string;
    videoUrl?: string;
}

const vaultItems: VaultCardItem[] = CONTENT.portfolio.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.category,
    imageSrc: item.image,
    tag: item.category,
    category: item.category,
    client: item.client,
    challenge: item.challenge,
    solution: item.solution,
    result: item.result,
    videoUrl: item.videoUrl,
}));

const TheVault: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<VaultCardItem | null>(null);

    return (
        <section id="vault" className="py-24 bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-3xl md:text-6xl font-bold font-display uppercase bg-clip-text text-transparent bg-gold-gradient"
                    >
                        Notre mine d'Or
                    </motion.h2>
                    <p className="hidden md:block text-[#D4AF37]/80 font-mono text-sm tracking-widest uppercase">Nos pépites</p>
                </div>

                {/* Card Stack Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <CardStack
                        items={vaultItems}
                        initialIndex={0}
                        cardWidth={600}
                        cardHeight={380}
                        overlap={0.5}
                        spreadDeg={40}
                        depthPx={120}
                        tiltXDeg={10}
                        activeLiftPx={20}
                        activeScale={1.02}
                        inactiveScale={0.92}
                        autoAdvance
                        intervalMs={3500}
                        pauseOnHover
                        showDots
                        loop
                        renderCard={(item, { active }) => (
                            <div className="relative h-full w-full group">
                                {/* Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={item.imageSrc}
                                        alt={item.title}
                                        className={`h-full w-full object-cover transition-all duration-700 ${active ? 'grayscale-0' : 'grayscale'
                                            }`}
                                        draggable={false}
                                        loading="eager"
                                    />
                                </div>

                                {/* Overlay */}
                                <div className={`absolute inset-0 transition-all duration-500 ${active
                                    ? 'bg-gradient-to-t from-black/80 via-black/30 to-black/10'
                                    : 'bg-black/60'
                                    }`} />

                                {/* Gold corner accents */}
                                {active && (
                                    <>
                                        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </>
                                )}

                                {/* Category tag */}
                                <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-[#D4AF37] text-black text-[10px] font-monument font-bold uppercase tracking-widest">
                                    {(item as VaultCardItem).category}
                                </div>

                                {/* Play button on hover (active card only) */}
                                {active && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedProject(item as VaultCardItem);
                                        }}
                                    >
                                        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/50 backdrop-blur-md hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                            <Play className="ml-1 text-[#D4AF37]" fill="#D4AF37" size={22} />
                                        </div>
                                    </div>
                                )}

                                {/* Content at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-1">
                                        {item.title}
                                    </h3>
                                    {active && (
                                        <p
                                            className="text-gray-300 text-xs mt-2 uppercase tracking-wide border-b border-[#D4AF37] pb-1 w-fit cursor-pointer hover:text-[#D4AF37] transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedProject(item as VaultCardItem);
                                            }}
                                        >
                                            Voir l'étude de cas
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    />
                </motion.div>
            </div>

            {/* Cinematic Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-5xl bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-lg overflow-hidden relative shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:text-[#D4AF37] transition-colors border border-white/10"
                            >
                                <X size={24} />
                            </button>

                            {/* Video Area */}
                            <div className="relative w-full aspect-video bg-black group overflow-hidden">
                                {selectedProject.videoUrl ? (
                                    <iframe
                                        src={`${selectedProject.videoUrl}?autoplay=1`}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={selectedProject.title}
                                    ></iframe>
                                ) : (
                                    <div className="relative w-full h-full cursor-pointer">
                                        <img
                                            src={selectedProject.imageSrc}
                                            className="w-full h-full object-cover opacity-50"
                                            alt="Video Thumbnail"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                                                <Play size={32} className="text-[#D4AF37] ml-1" fill="#D4AF37" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider z-10">
                                    Showreel 4K
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-3xl md:text-4xl text-white font-display font-bold mb-2">{selectedProject.title}</h2>
                                        <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm">{selectedProject.category}</p>
                                    </div>
                                    <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/5">
                                        <Trophy size={16} className="text-[#D4AF37]" />
                                        <span className="text-gray-300 text-sm">{selectedProject.client}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-3 mb-3 text-white">
                                            <Target size={20} className="text-gray-400" />
                                            <h4 className="font-bold uppercase tracking-wider text-sm">Le Défi</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed font-satoshi">
                                            {selectedProject.challenge}
                                        </p>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-3 mb-3 text-white">
                                            <Zap size={20} className="text-gray-400" />
                                            <h4 className="font-bold uppercase tracking-wider text-sm">La Solution</h4>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed font-satoshi">
                                            {selectedProject.solution}
                                        </p>
                                    </div>

                                    <div className="p-6 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
                                        <div className="flex items-center gap-3 mb-3 text-[#D4AF37]">
                                            <Trophy size={20} />
                                            <h4 className="font-bold uppercase tracking-wider text-sm">L'Impact</h4>
                                        </div>
                                        <p className="text-[#D4AF37] text-sm leading-relaxed font-medium font-satoshi">
                                            {selectedProject.result}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default TheVault;
