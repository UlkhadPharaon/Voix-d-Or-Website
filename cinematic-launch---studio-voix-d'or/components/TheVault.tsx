import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTENT } from '../constants';
import { Play, X, Trophy, Target, Zap } from 'lucide-react';

const TheVault: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedProject = CONTENT.portfolio.find(p => p.id === selectedId);

  return (
    <section id="vault" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-6xl text-white font-bold font-cinzel"
          >
            THE VAULT
          </motion.h2>
          <p className="hidden md:block text-gray-500 font-mono text-sm tracking-widest">ARCHIVES SÉLECTIVES</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {CONTENT.portfolio.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`card-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="group relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-pointer border border-white/10"
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-10 group-hover:translate-y-0">
                 <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center mb-6 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <Play className="ml-1 text-[#D4AF37]" fill="#D4AF37" size={24} />
                 </div>
                 <h3 className="text-3xl md:text-5xl font-bold text-white mb-2 font-cinzel">{item.title}</h3>
                 <p className="text-[#D4AF37] tracking-widest uppercase text-sm">{item.category}</p>
                 <p className="text-gray-300 text-xs mt-4 uppercase tracking-wide border-b border-[#D4AF37] pb-1">Voir l'étude de cas</p>
              </div>

              {/* Decorative borders */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedId}`}
              className="w-full max-w-5xl bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-lg overflow-hidden relative shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:text-[#D4AF37] transition-colors border border-white/10"
              >
                <X size={24} />
              </button>

              {/* Video Area (Simulated) */}
              <div className="relative w-full aspect-video bg-black group cursor-pointer overflow-hidden">
                 <img 
                   src={selectedProject.image} 
                   className="w-full h-full object-cover opacity-50" 
                   alt="Video Thumbnail"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-black/40 backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                        <Play size={32} className="text-[#D4AF37] ml-1" fill="#D4AF37" />
                    </div>
                 </div>
                 <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider">
                    Showreel 4K
                 </div>
              </div>

              {/* Content Area */}
              <div className="p-8 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl text-white font-cinzel font-bold mb-2">{selectedProject.title}</h2>
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
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedProject.challenge}
                      </p>
                   </div>

                   <div className="p-6 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3 mb-3 text-white">
                        <Zap size={20} className="text-gray-400" />
                        <h4 className="font-bold uppercase tracking-wider text-sm">La Solution</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {selectedProject.solution}
                      </p>
                   </div>

                   <div className="p-6 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
                      <div className="flex items-center gap-3 mb-3 text-[#D4AF37]">
                        <Trophy size={20} />
                        <h4 className="font-bold uppercase tracking-wider text-sm">L'Impact</h4>
                      </div>
                      <p className="text-[#D4AF37] text-sm leading-relaxed font-medium">
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