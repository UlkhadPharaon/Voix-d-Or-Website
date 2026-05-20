import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Agence Kemet Lux",
    role: "Direction Artistique",
    text: "Une rigueur technique qui frôle l'obsession. Le Cinematic Launch n'est pas un service vidéo, c'est une arme de conversion massive."
  },
  {
    name: "Moussa Diop",
    role: "CEO, Sahel Ventures",
    text: "Nous avons vu un 'avant' et un 'après' immédiat dans la perception de nos investisseurs. Studio VOIX D'OR comprend le langage du pouvoir."
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 px-6 bg-[#080808] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl text-white font-bold mb-4">L'EXPERTISE VALIDÉE</h2>
          <p className="text-[#D4AF37] uppercase tracking-widest text-xs font-bold">Validé par nos partenaires de production</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-[#050505] p-8 md:p-12 border border-white/5 relative"
            >
              <div className="text-4xl text-[#D4AF37] font-serif absolute top-6 left-6 opacity-30">"</div>
              <p className="text-gray-300 italic mb-8 relative z-10 leading-relaxed">
                {t.text}
              </p>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-gray-500 text-sm uppercase">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;