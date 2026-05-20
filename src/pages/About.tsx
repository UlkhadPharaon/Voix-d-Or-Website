import { AboutHero } from '@/components/about/AboutHero';
import { AboutTimeline } from '@/components/about/AboutTimeline';
import { CreditsSection } from '@/components/about/CreditsSection';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { NavLink } from 'react-router-dom';

// 🏛️ About : Page "À Propos" ou "Le Manifeste"
// Présente l'histoire, les valeurs et l'équipe du Studio Voix d'Or
const About = () => {
    return (
        <div className="bg-vantablack min-h-screen">
            {/* 🎭 Section Hero : Présentation de la vision */}
            <AboutHero />

            {/* ⏳ Chronologie : Les étapes clés du studio */}
            <AboutTimeline />

            {/* 🎖️ Crédits : Reconnaissance des talents et partenaires */}
            <CreditsSection />

            {/* 📢 CTA Finale : Appel à l'action stratégique */}
            <section className="py-32 px-6 flex items-center justify-center relative overflow-hidden bg-vantablack border-t border-white/5">
                <div className="relative z-10 text-center max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight mb-8 font-display">
                        Prêt pour le <span className="text-champagne-gold block md:inline">Montage Final ?</span>
                    </h2>
                    <p className="text-xl text-gray-400 font-light mb-12 font-satoshi">
                        Votre histoire mérite le traitement Voix d'Or. Créons une œuvre intemporelle.
                    </p>
                    <NavLink to="/contact">
                        <MagneticButton>
                            <button className="bg-champagne-gold hover:bg-[#ffe045] text-vantablack px-10 py-4 rounded text-base font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(244,212,52,0.4)]">
                                Lancez Votre Production
                            </button>
                        </MagneticButton>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default About;
