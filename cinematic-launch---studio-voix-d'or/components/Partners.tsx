import React from 'react';

const PARTNERS = [
  "MAISON KÉBÉ", "SOW WEAR", "ORION PROPERTIES", "KEMET LUX", "SAHEL VENTURES", 
  "VOGUE AFRIQUE", "FORBES", "L'OFFICIEL", "DIOR (CONCEPT)", "CARTIER (CONCEPT)"
];

const Partners: React.FC = () => {
  return (
    <section className="py-8 bg-[#0a0a0a] border-y border-[#D4AF37]/10 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
      
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex gap-16 items-center">
          {/* Duplicate list 3 times to ensure smooth loop */}
          {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
            <span 
              key={idx} 
              className="text-gray-500 font-cinzel text-sm md:text-lg font-bold tracking-[0.2em] hover:text-[#D4AF37] transition-colors cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  );
};

export default Partners;