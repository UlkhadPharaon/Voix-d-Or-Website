import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { CONTENT } from '../constants';
import { Diamond, Star, Crown } from 'lucide-react';

// Changed icons to Luxury specific ones
const icons = [Crown, Star, Diamond];

const Distinction: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="distinction" ref={ref} className="py-32 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
      {/* Subtle Luxury Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Philosophie
          </span>
          <h2 className="text-4xl md:text-6xl font-cinzel font-normal text-white mb-4">
            {CONTENT.distinction.title}
          </h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto my-6"></div>
          <p className="text-gray-400 text-xl font-light italic font-serif">
            "{CONTENT.distinction.subtitle}"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {CONTENT.distinction.stats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-700 hover:bg-white/[0.02]"
              >
                <div className="mb-8 p-6 rounded-full border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors duration-500 relative">
                  <Icon size={32} className="text-[#D4AF37]" strokeWidth={1} />
                  <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                </div>
                
                <h3 className="text-3xl font-serif italic text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-500">
                  {stat.value}
                </h3>
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-6">
                  {stat.title}
                </h4>
                <p className="text-gray-400 text-sm leading-8 font-light max-w-xs mx-auto">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Distinction;