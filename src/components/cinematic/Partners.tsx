import React from 'react';

const PARTNERS = [
    { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
    { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
    { name: "Teeg Wend Prod", logo: "/assets/brands/Teeg Wend Prod.jpg" },
    { name: "Sentinelle Prod", logo: "/assets/brands/Sentinelle Production.jpg" },
    { name: "Nafadou", logo: "/assets/brands/NAFADOU.jpg" },
    { name: "BBDA", logo: "/assets/brands/BBDA.jpg" }
];

const Partners: React.FC = () => {
    return (
        <section className="py-8 bg-[#0a0a0a] border-y border-[#D4AF37]/10 overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="animate-marquee flex gap-16 md:gap-32 items-center">
                    {/* Duplicate list 3 times to ensure smooth loop */}
                    {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
                        <div
                            key={idx}
                            className="flex-shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 w-32 md:w-40 flex items-center justify-center p-2"
                        >
                            <img src={partner.logo} alt={partner.name} className="h-12 md:h-16 w-full object-contain mix-blend-screen" />
                        </div>
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
