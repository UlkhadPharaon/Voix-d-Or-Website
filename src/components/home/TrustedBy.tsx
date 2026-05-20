import { Sparkles } from "@/components/ui/sparkles"
import { useTheme } from "@/components/ThemeContext"
import { motion } from "framer-motion"

const partners = [
    { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
    { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
    { name: "Teeg Wend Prod", logo: "/assets/brands/Teeg Wend Prod.jpg" },
    { name: "Sentinelle Prod", logo: "/assets/brands/Sentinelle Production.jpg" },
    { name: "Nafadou", logo: "/assets/brands/NAFADOU.jpg" },
    { name: "BBDA", logo: "/assets/brands/BBDA.jpg" },
    // Duplicate for infinite scroll or grid aesthetics
    { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
    { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
    { name: "Teeg Wend Prod", logo: "/assets/brands/Teeg Wend Prod.jpg" },
    { name: "Sentinelle Prod", logo: "/assets/brands/Sentinelle Production.jpg" },
];

export function TrustedBy() {
    const { isDark } = useTheme()
    const sparkleColor = isDark ? "#D4AF37" : "#000000";

    return (
        <section className="relative w-full overflow-hidden bg-vantablack py-32">
            <div className="container mx-auto px-6 relative z-20">

                {/* Header */}
                <div className="mx-auto w-full max-w-2xl text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl mb-8"
                    >
                        <span className="text-champagne-gold text-xs font-monument uppercase tracking-widest">
                            Partenariats
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-monument text-white leading-tight">
                        <span className="text-white/50 block text-2xl md:text-3xl mb-2 font-satoshi">Ils nous font</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne-gold via-white to-champagne-gold">
                            Confiance
                        </span>
                    </h2>
                </div>

                {/* Logos Grid */}
                <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-5 items-center justify-items-center">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="w-full h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 hover:scale-110 p-4"
                        >
                            <img 
                                src={partner.logo} 
                                alt={partner.name} 
                                loading="lazy"
                                decoding="async"
                                className="max-h-full max-w-full w-auto h-auto object-contain pointer-events-none" 
                            />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Sparkles Effect Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Radial Gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(212,175,55,0.15),transparent_70%)]" />

                {/* The 'Curve' mask effect from demo */}
                <div className="absolute -left-1/2 bottom-[-40%] aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-champagne-gold/20 bg-vantablack/50 backdrop-blur-[2px]" />

                <Sparkles
                    density={800}
                    className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(circle_at_center,white,transparent_85%)]"
                    color={sparkleColor}
                    size={1.2}
                    speed={0.5}
                />
            </div>
        </section>
    )
}
