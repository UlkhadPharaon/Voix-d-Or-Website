import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { NavLink } from 'react-router-dom';

const categories = ["TOUT SAVOIR", "STRATÉGIE", "PRODUCTION", "INVESTISSEMENT"];

const faqs = [
    {
        category: "STRATÉGIE",
        question: "J'ai juste une idée floue, pouvez-vous m'aider ?",
        answer: "Pas de panique ! Beaucoup de nos clients arrivent avec une simple idée ou une vision encore floue. Notre rôle est de vous accompagner dès la conception : nous vous aidons à structurer votre projet, à définir vos objectifs et à créer un résultat qui dépasse vos attentes."
    },
    {
        category: "PRODUCTION",
        question: "Quels sont vos délais de livraison ?",
        answer: "Nous savons que votre temps est précieux. Grâce à nos méthodes optimisées et notre équipe réactive, nous livrons vos projets plus rapidement que la moyenne du marché, tout en garantissant une qualité exceptionnelle."
    },
    {
        category: "VISION",  // Maps to All or I can add Vision category. Let's map to Strat? Or just show in All. Let's add VISION to categories list? Or just keep it simple. Let's put it in STRATÉGIE for simplicty or just display it when All.
        // Actually, let's just use "ALL", "PRODUCTION", "STRATEGY", "BUDGET"
        question: "Pourquoi choisir Studio Voix d'Or ?",
        answer: "Nous ne faisons pas que produire du son ou de la vidéo : nous créons des expériences mémorables. Nos clients nous choisissent pour notre écoute, notre passion et notre capacité à transformer leurs rêves en réalité."
    },
    {
        category: "PRODUCTION",
        question: "Travaillez-vous à l'international ?",
        answer: "Absolument. Bien que basés au Burkina Faso, nous collaborons régulièrement avec des marques et des institutions à travers toute l'Afrique et l'Europe. Nos équipes sont mobiles."
    },
    {
        category: "INVESTISSEMENT",
        question: "Quel est le budget minimum ?",
        answer: "Chaque projet est unique. Nous ne fixons pas de budget minimum rigide, mais nous privilégions les collaborations où nous pouvons garantir nos standards de qualité cinématographique."
    }
];

export const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [activeCategory, setActiveCategory] = useState("TOUT SAVOIR");

    const filteredFaqs = activeCategory === "TOUT SAVOIR"
        ? faqs
        : faqs.filter(faq => faq.category === activeCategory || (activeCategory === "STRATÉGIE" && faq.category === "VISION"));

    return (
        <section className="bg-vantablack py-32 relative overflow-hidden font-satoshi">
            <div className="container mx-auto px-6 max-w-5xl">

                {/* Header - Elite Style */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1 rounded-full border border-champagne-gold/20 bg-champagne-gold/5 mb-6">
                        <span className="text-champagne-gold text-[10px] font-monument uppercase tracking-widest">Studio Voix d'Or Integrated</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-monument text-champagne-gold mb-6 uppercase tracking-tight">
                        Enquêtes d'Elites
                    </h2>
                    <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
                        La convergence de l'excellence cinématographique et de la stratégie. Explorez l'architecture technique de nos productions haut de gamme.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border",
                                activeCategory === cat
                                    ? "bg-champagne-gold border-champagne-gold text-vantablack"
                                    : "bg-transparent border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    <AnimatePresence mode='wait'>
                        {filteredFaqs.map((faq, index) => {
                            const isOpen = activeIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="group"
                                >
                                    <div
                                        onClick={() => setActiveIndex(isOpen ? null : index)}
                                        className={cn(
                                            "cursor-pointer rounded-xl border transition-all duration-500 overflow-hidden",
                                            isOpen
                                                ? "bg-white/5 border-champagne-gold/30"
                                                : "bg-black/20 border-white/5 hover:border-white/10"
                                        )}
                                    >
                                        <div className="p-6 md:p-8 flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-4">
                                                {/* Icon based on category intent */}
                                                <div className={cn(
                                                    "w-2 h-2 rounded-full hidden md:block",
                                                    isOpen ? "bg-champagne-gold shadow-[0_0_10px_#D4AF37]" : "bg-white/20"
                                                )} />
                                                <h3 className={cn(
                                                    "text-lg font-bold transition-colors duration-300",
                                                    isOpen ? "text-white" : "text-white/60 group-hover:text-white/80"
                                                )}>
                                                    {faq.question}
                                                </h3>
                                            </div>

                                            <div className={cn(
                                                "text-champagne-gold transition-transform duration-300",
                                                isOpen ? "rotate-180" : "rotate-0 opacity-50"
                                            )}>
                                                {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 md:px-8 pb-8 pt-0 pl-8 md:pl-14">
                                                        <p className="text-white/80 leading-relaxed text-sm md:text-base border-l border-white/10 pl-6">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Bottom CTA - Concierge Style */}
                <div className="mt-24 pt-16 border-t border-white/5 text-center">
                    <h4 className="text-white font-monument uppercase text-lg mb-4">Encore des zones d'ombre ?</h4>
                    <p className="text-white/70 mb-8 max-w-xl mx-auto">Notre conciergerie est disponible pour une consultation technique et artistique.</p>

                    <NavLink to="/contact">
                        <MagneticButton>
                            <button className="px-8 py-4 bg-champagne-gold text-vantablack font-bold uppercase tracking-widest text-xs flex items-center gap-3 mx-auto hover:bg-white transition-colors">
                                Réserver un appel concierge
                                <ArrowRight size={16} />
                            </button>
                        </MagneticButton>
                    </NavLink>
                </div>

            </div>
        </section>
    );
};
