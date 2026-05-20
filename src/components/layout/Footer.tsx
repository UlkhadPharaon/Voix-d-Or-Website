import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

// 📜 Footer : Pied de page informatif et navigation secondaire
// Utilise des effets de lueur (glow) pour rester dans l'esthétique premium
export const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-vantablack pt-20 pb-40 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-champagne-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-white/60 text-sm font-light">
                    <div className="space-y-6">
                        <Logo />
                        <p className="leading-relaxed text-xs tracking-wide font-satoshi">
                            Savoir Rêver Grand et l'Accomplir.<br />
                            Studio de production cinématographique et stratégique.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-monument uppercase tracking-widest mb-6 text-xs">Navigation</h3>
                        <ul className="space-y-3">
                            <li><NavLink to="/" className="hover:text-champagne-gold transition-colors">Accueil</NavLink></li>
                            <li><NavLink to="/services" className="hover:text-champagne-gold transition-colors">Services</NavLink></li>
                            <li><NavLink to="/portfolio" className="hover:text-champagne-gold transition-colors">Portfolio</NavLink></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-monument uppercase tracking-widest mb-6 text-xs">Légal</h3>
                        <ul className="space-y-3">
                            <li className="hover:text-champagne-gold transition-colors cursor-pointer">Conditions Générales</li>
                            <li className="hover:text-champagne-gold transition-colors cursor-pointer">Politique de Confidentialité</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-monument uppercase tracking-widest mb-6 text-xs">Contact</h3>
                        <p>Avenue des comores, Somgandé<br />Ouagadougou, Burkina Faso</p>
                        <p className="mt-4 hover:text-champagne-gold transition-colors cursor-pointer">+226 44-90-66-29</p>
                        <p className="mt-2 hover:text-champagne-gold transition-colors cursor-pointer">studiovoixdorofficiel@gmail.com</p>
                    </div>
                </div>

                <div className="border-t border-white/5 mt-20 pt-8 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40 font-monument">
                    <p>© 2026 Studio Voix d'Or. Tous droits réservés.</p>
                    <p>by Ulkhad Pharaon</p>
                </div>
            </div>
        </footer>
    );
};
