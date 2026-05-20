import { motion } from 'framer-motion';

const advantages = [
    {
        id: 1,
        number: "01",
        title: "Satisfaction Absolue",
        description: "Nous plaçons votre satisfaction au cœur de tout ce que nous créons. Chaque projet est une collaboration sincère, où vos idées deviennent des œuvres sur mesure. Notre objectif est simple : faire résonner votre vision dans le monde, avec excellence et passion."
    },
    {
        id: 2,
        number: "02",
        title: "Rapidité & Maîtrise",
        description: "Nous savons que le temps est votre ressource la plus précieuse. Grâce à des processus optimisés et une équipe experte, nous livrons des résultats professionnels à une vitesse record, sans jamais sacrifier la qualité. Efficacité et fiabilité sont nos maîtres mots."
    },
    {
        id: 3,
        number: "03",
        title: "Savoir Rêver Grand et l'Accomplir",
        description: "Chez Studio Voix d’Or, nous croyons en la puissance des rêves audacieux. Nous vous aidons à repousser les limites de la création, pour donner vie à des projets qui inspirent, transcendent et marquent les esprits. Parce que vos ambitions méritent un studio qui voit plus grand que la norme."
    }
];

export const Advantages = () => {
    return (
        <section className="py-32 relative bg-void-black overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gold-500 uppercase tracking-[0.3em] text-xs font-semibold mb-4"
                    >
                        Notre Offre
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-4xl md:text-5xl text-white tracking-wide"
                    >
                        Découvrez nos <br className="md:hidden" />
                        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">trois principaux avantages</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-24 h-[1px] bg-gold-500/50 mt-8"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {advantages.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative p-8 border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-colors duration-500"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
                                <div className="absolute inset-0 bg-gold-500/5 blur-xl" />
                            </div>

                            <div className="relative z-10">
                                <div className="text-6xl md:text-7xl font-monument text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent mb-6 group-hover:from-gold-500/20 group-hover:to-transparent transition-all duration-500 select-none">
                                    {item.number}
                                </div>

                                <h3 className="text-xl md:text-2xl font-serif text-white mb-6 group-hover:text-gold-400 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-white/60 font-sans font-light leading-relaxed text-sm md:text-base">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
