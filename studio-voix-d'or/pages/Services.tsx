import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Play } from 'lucide-react';
import { SERVICES, TESTIMONIALS, PARTNERS } from '../constants';
import Button from '../components/Button';

const Services: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (id: string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="min-h-screen bg-dark-900 pt-24">
      
      {/* 1. HEADER */}
      <section className="py-20 text-center px-6 border-b border-white/5">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
                NOTRE <span className="text-gold-gradient">EXPERTISE</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                L'excellence technique au service de votre vision. Découvrez comment nous transformons des concepts en réalités cinématographiques.
            </p>
        </motion.div>
      </section>

      {/* 2. DETAILED SERVICES LIST */}
      <div className="flex flex-col">
        {SERVICES.map((service, index) => (
            <section 
                key={service.id} 
                className={`py-24 px-6 relative ${index % 2 === 0 ? 'bg-dark-900' : 'bg-dark-800'}`}
            >
                <div className="max-w-7xl mx-auto">
                    <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                        
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <motion.div 
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gold-500 transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500"></div>
                                <div className="relative aspect-video overflow-hidden border border-white/10">
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                    />
                                    {/* Play Button Overlay */}
                                    <button 
                                        onClick={() => openModal(service.id)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <div className="w-20 h-20 rounded-full border border-gold-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm text-gold-500 hover:scale-110 transition-transform">
                                            <Play fill="currentColor" size={24} />
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Text Side */}
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="text-gold-500 font-display font-bold text-5xl mb-6 opacity-20">0{index + 1}</div>
                                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-white">{service.title}</h2>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                    {service.longDescription}
                                </p>
                                
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                                            <CheckCircle size={16} className="text-gold-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Button onClick={() => openModal(service.id)} variant="outline">
                                    Voir le Showreel
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        ))}
      </div>

      {/* 3. REVIEWS (Filtered) */}
      <section className="py-24 border-t border-white/5 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">ILS NOUS FONT CONFIANCE</h2>
                <p className="text-gray-400">Des collaborations qui ont marqué l'industrie.</p>
             </div>

             <div className="flex flex-wrap justify-center gap-8 mb-20">
                {PARTNERS.map((partner, i) => (
                    <div key={i} className="px-8 py-4 border border-white/5 bg-white/[0.02] text-gray-500 font-bold font-display text-xl tracking-widest hover:text-white hover:border-gold-500/30 transition-all cursor-default">
                        {partner.logo}
                    </div>
                ))}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {TESTIMONIALS.slice(0, 2).map((t) => (
                    <div key={t.id} className="bg-dark-800 p-8 border-l-2 border-gold-500">
                         <p className="text-gray-300 italic mb-6">"{t.quote}"</p>
                         <div className="font-bold text-white">{t.name}</div>
                         <div className="text-gold-500 text-xs uppercase">{t.company}</div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {activeModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                onClick={closeModal}
            >
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-5xl bg-dark-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-4 border-b border-white/10 bg-dark-800">
                        <h3 className="font-display font-bold text-white">Showreel: {SERVICES.find(s => s.id === activeModal)?.title}</h3>
                        <button onClick={closeModal} className="text-gray-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="aspect-video bg-black flex items-center justify-center relative group">
                        {/* Simulated Video Player */}
                        <img 
                            src={SERVICES.find(s => s.id === activeModal)?.image} 
                            alt="Video Thumbnail" 
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 rounded-full border-2 border-gold-500 flex items-center justify-center text-gold-500 bg-black/50 cursor-pointer hover:bg-gold-500 hover:text-black transition-all">
                                <Play fill="currentColor" size={30} className="ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-400 text-sm">
                            Ce showreel démontre nos capacités en {SERVICES.find(s => s.id === activeModal)?.title.toLowerCase()}. 
                            Pour des raisons de droits, ceci est une démonstration statique.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Services;
