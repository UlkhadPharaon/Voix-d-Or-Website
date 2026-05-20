import React from 'react';
import { motion } from 'framer-motion';
import { Film, Smartphone, PenTool, Music, Cpu, TrendingUp, Globe } from 'lucide-react';

// Configuration des cartes de l'offre
const PACK_ITEMS = [
  {
    id: 1,
    icon: Film,
    title: "Le Film Signature (45-90s)",
    desc: "Une œuvre cinématographique intemporelle. Étalonnage, colorimétrie et montage conçus pour susciter l'émotion pure."
  },
  {
    id: 2,
    icon: Smartphone,
    title: "La Suite Sociale (9:16)",
    desc: "L'art de la présence verticale. Des déclinaisons esthétiques pour Instagram et TikTok, sans compromis sur l'élégance."
  },
  {
    id: 3,
    icon: PenTool,
    title: "Direction Artistique",
    desc: "Nous ne créons pas seulement des images, mais des univers. Scripting émotionnel et cohérence visuelle absolue."
  },
  {
    id: 4,
    icon: Music,
    title: "Design Sonore",
    desc: "L'élégance s'écoute aussi. Une composition sonore immersive et des voix-off d'une distinction rare."
  }
];

// Configuration des avantages concurrentiels
const ADVANTAGES = [
  {
    id: 1,
    icon: Cpu,
    title: "Innovation Invisible",
    desc: "L'IA et la 3D subliment le réel avec une discrétion absolue pour un rendu magique."
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Résonance",
    desc: "L'art doit servir un but. Chaque plan est conçu pour marquer les esprits et inviter à l'action."
  },
  {
    id: 3,
    icon: Globe,
    title: "Pan-Africanisme Futuriste",
    desc: "Une esthétique fière, ancrée à Ouagadougou, qui dialogue avec les capitales du monde."
  }
];

const Offer: React.FC = () => {
  return (
    <section id="offer" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#D4AF37] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. DÉFINITION (L'ADN) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-4xl mx-auto"
        >
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
            Votre Héritage
          </span>
          <h2 className="text-3xl md:text-5xl text-white font-cinzel font-normal mb-6">
            LA SIGNATURE CINEMATIC LAUNCH™
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed font-light font-serif italic">
            "Bien plus qu'une production, un <span className="text-white">actif immatériel</span>. 
            Nous fusionnons l'artisanat du cinéma et la puissance du numérique pour sculpter votre légende."
          </p>
        </motion.div>

        {/* 2. LES COMPOSANTES DU PACK (GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {PACK_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative p-10 rounded-sm bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-700"
            >
              <div className="flex items-start gap-6">
                <div className="text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  <item.icon size={24} strokeWidth={1} />
                </div>
                <div>
                  <h3 className="text-xl text-white mb-3 group-hover:text-[#D4AF37] transition-colors font-cinzel tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-7 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3. L'AVANTAGE DÉLOYAL (COMPARISON) */}
        <div className="border-t border-[#D4AF37]/10 pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl text-white font-cinzel mb-2">L'ART DE LA DIFFÉRENCE</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADVANTAGES.map((adv, idx) => (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center p-6"
              >
                <div className="mx-auto w-10 h-10 flex items-center justify-center text-[#D4AF37] mb-6 relative">
                  <adv.icon size={28} strokeWidth={1} />
                </div>
                <h4 className="text-sm text-white font-bold mb-3 uppercase tracking-[0.2em]">{adv.title}</h4>
                <div className="h-[1px] w-8 bg-[#D4AF37] mx-auto mb-4 opacity-50" />
                <p className="text-gray-500 text-sm font-light leading-6">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Offer;