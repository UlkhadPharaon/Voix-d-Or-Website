import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Plus, Minus, ArrowRight, Zap, Globe, Clock, Star } from 'lucide-react';
import Button from '../components/Button';
import { SERVICES, TESTIMONIALS, FAQS, PARTNERS } from '../constants';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="Studio Background" 
                className="w-full h-full object-cover opacity-20 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-gold-500 font-bold tracking-[0.4em] uppercase text-sm mb-6">
                    Afrofuturism Luxury
                </h2>
                <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
                    STUDIO <br />
                    <span className="text-gold-gradient">VOIX D'OR</span>
                </h1>
                <p className="max-w-2xl mx-auto text-gray-300 text-lg md:text-xl mb-10 font-light leading-relaxed">
                    L'excellence technique au service de votre vision. Nous sculptons l'image et le son pour les marques qui osent.
                </p>
                <div className="flex flex-col md:flex-row gap-6 justify-center">
                    <Link to="/services"><Button variant="solid">Découvrir l'expertise</Button></Link>
                    <Button variant="outline">Voir le Showreel</Button>
                </div>
            </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
            <ChevronDown size={32} />
        </div>
      </section>

      {/* 2. SERVICES TEASER */}
      <section className="py-24 bg-dark-900 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="group relative p-10 border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-500 overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/5 transition-colors duration-500"></div>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

                        <div className="relative z-10">
                            <span className="text-6xl text-white/5 font-display font-bold absolute -top-4 -right-4 group-hover:text-gold-500/10 transition-colors">
                                0{index + 1}
                            </span>
                            <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-gold-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 mb-8 line-clamp-3">
                                {service.description}
                            </p>
                            <Link to="/services" className="inline-flex items-center gap-2 text-gold-500 text-sm uppercase tracking-widest hover:gap-4 transition-all">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. SOCIAL PROOF MARQUEE */}
      <section className="py-12 border-y border-white/5 bg-dark-800 overflow-hidden">
        <div className="max-w-full relative">
            <div className="flex gap-20 animate-[marquee_20s_linear_infinite] whitespace-nowrap items-center opacity-50 hover:opacity-100 transition-opacity">
                {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                    <span key={i} className="font-display font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                        {partner.logo}
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* 4. AVANTAGES (3 PILLARS) */}
      <section className="py-32 relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">POURQUOI NOUS CHOISIR</h2>
                <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center mb-6 text-gold-500 bg-gold-500/5">
                        <Zap size={32} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">Technologie Hollywoodienne</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Équipements RED, ARRI et suites de montage calibrées pour une qualité sans compromis, digne des plus grands studios.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center mb-6 text-gold-500 bg-gold-500/5">
                        <Globe size={32} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">Vision Stratégique</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Nous ne faisons pas que filmer. Nous comprenons votre marché et créons des visuels qui convertissent et marquent les esprits.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border border-gold-500/30 flex items-center justify-center mb-6 text-gold-500 bg-gold-500/5">
                        <Clock size={32} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-3">Vitesse d'Exécution</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Des workflows optimisés pour livrer des projets complexes dans des délais records, sans sacrifier l'art.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* 5. TÉMOIGNAGES */}
      <section className="py-24 bg-dark-800 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16 text-center">CE QUE DISENT NOS CLIENTS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((t) => (
                    <motion.div 
                        key={t.id}
                        whileHover={{ y: -5 }}
                        className="p-8 bg-dark-900 border border-white/5 relative"
                    >
                        <div className="text-gold-500 mb-6">
                            {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" className="inline-block mr-1" />)}
                        </div>
                        <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.quote}"</p>
                        <div className="flex items-center gap-4">
                            <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-gold-500/50" />
                            <div>
                                <h4 className="font-bold text-white text-sm">{t.name}</h4>
                                <p className="text-gold-500 text-xs uppercase tracking-wider">{t.role}, {t.company}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">QUESTIONS FRÉQUENTES</h2>
            
            <div className="space-y-4">
                {FAQS.map((faq, i) => (
                    <div key={i} className="border border-white/10 bg-white/[0.02]">
                        <button 
                            onClick={() => toggleFaq(i)}
                            className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                        >
                            <span className="font-display font-bold text-lg">{faq.question}</span>
                            <span className={`text-gold-500 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                                {openFaq === i ? <Minus size={20} /> : <Plus size={20} />}
                            </span>
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ${
                                openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* MARQUEE STYLE */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Home;
