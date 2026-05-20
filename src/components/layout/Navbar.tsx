import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from './Logo';

import { useTheme } from '@/components/ThemeContext';

// ⚓ NavItem : Sous-composant pour les liens de navigation
// Gère l'indicateur visuel (ligne dorée) sous le lien actif
const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
        to={to}
        className={({ isActive }) => cn(
            "relative text-xs tracking-[0.2em] font-satoshi font-medium transition-colors duration-300 hover:text-champagne-gold uppercase",
            isActive ? "text-champagne-gold" : "text-white/60"
        )}
    >
        {({ isActive }) => (
            <>
                {children}
                {isActive && (
                    <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-[1px] bg-champagne-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />
                )}
            </>
        )}
    </NavLink>
);

// 🧭 Navbar : Barre de navigation principale avec gestion de la transparence au scroll
// Design "Glassmorphism" et réactivité mobile intégrée
export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const location = useLocation();
    const { isDark } = useTheme();

    // 🔍 Effet de scroll pour changer l'apparence de la navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 📱 Ferme le menu mobile lors d'un changement de route
    useEffect(() => {
        setIsMobileOpen(false);
    }, [location]);

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b",
                    isScrolled
                        ? "bg-vantablack/80 backdrop-blur-xl border-white/5 py-4 shadow-lg"
                        : "bg-transparent border-white/5 py-6"
                )}
            >
                <div className="w-full px-6 md:px-12 flex items-center justify-between">
                    {/* Logo */}
                    <NavLink to="/">
                        <Logo />
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center justify-center flex-1 gap-3 2xl:gap-6 mx-4">
                        <NavItem to="/">ACCUEIL</NavItem>
                        <NavItem to="/services">SERVICES</NavItem>
                        <NavItem to="/cinematic-launch">CINEMATIC LAUNCH™</NavItem>
                        <NavItem to="/portfolio">LA GALERIE</NavItem>
                        <NavItem to="/about">LE MANIFESTE</NavItem>
                        <div className="w-[1px] h-4 bg-white/10 mx-1" />
                        <NavItem to="/services?cat=tv">PUB</NavItem>
                        <NavItem to="/services?cat=clip">CLIPS</NavItem>
                        <NavItem to="/services?cat=prod">PROD</NavItem>
                        <NavItem to="/services?cat=post">POST-PROD</NavItem>
                        <NavItem to="/services?cat=audio">AUDIO</NavItem>
                        <NavItem to="/musique-de-film">MUSIQUE DE FILM</NavItem>
                        <NavItem to="/formation">FORMATION</NavItem>
                    </div>

                    {/* CTA Button + Theme Toggle */}
                    <div className="hidden xl:flex items-center gap-4">

                        <NavLink to="/contact">
                            <button className={cn(
                                "px-4 2xl:px-6 py-2 rounded text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 whitespace-nowrap",
                                isDark
                                    ? "bg-transparent border border-champagne-gold/30 text-champagne-gold hover:bg-champagne-gold hover:text-vantablack hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                    : "bg-transparent border border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-white hover:shadow-[0_0_20px_rgba(184,148,30,0.15)]"
                            )}>
                                Le Pacte
                            </button>
                        </NavLink>
                    </div>

                    {/* Mobile: Theme Toggle + Hamburger */}
                    <div className="xl:hidden flex items-center gap-3">

                        <button
                            className={cn(
                                "transition-colors z-[70] relative",
                                isDark ? "text-white hover:text-champagne-gold" : "text-[var(--text-primary)] hover:text-[var(--gold)]"
                            )}
                            onClick={() => setIsMobileOpen(!isMobileOpen)}
                        >
                            {isMobileOpen ? <X className="w-8 h-8 stroke-[1]" /> : <Menu className="w-8 h-8 stroke-[1]" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-vantablack flex flex-col items-center justify-center gap-8"
                    >
                        <div className="absolute inset-0 faso-pattern opacity-10 pointer-events-none"></div>

                        <nav className="flex flex-col items-center gap-3 sm:gap-4 relative z-10 text-center overflow-y-auto max-h-screen w-full py-20 px-4">
                            <NavLink to="/" className="text-lg sm:text-xl font-monument text-white hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>ACCUEIL</NavLink>
                            <NavLink to="/services" className="text-lg sm:text-xl font-monument text-white hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>SERVICES</NavLink>
                            <NavLink to="/cinematic-launch" className="text-lg sm:text-xl font-monument text-white hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>LE CINEMATIC LAUNCH™</NavLink>
                            <NavLink to="/portfolio" className="text-lg sm:text-xl font-monument text-white hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>LA GALERIE</NavLink>
                            <NavLink to="/about" className="text-lg sm:text-xl font-monument text-white hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>LE MANIFESTE</NavLink>
                            <NavLink to="/contact" className="text-lg sm:text-xl font-monument text-white hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>LE PACTE</NavLink>
                            <hr className="w-12 border-white/10 my-1 sm:my-2" />
                            <NavLink to="/services?cat=tv" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>SPOT PUBLICITAIRE</NavLink>
                            <NavLink to="/services?cat=clip" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>CLIP VIDÉOS</NavLink>
                            <NavLink to="/services?cat=prod" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>PRODUCTION VIDÉOS</NavLink>
                            <NavLink to="/services?cat=post" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>POST PRODUCTION</NavLink>
                            <NavLink to="/services?cat=audio" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>AUDIO</NavLink>
                            <NavLink to="/musique-de-film" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>MUSIQUE DE FILM</NavLink>
                            <NavLink to="/formation" className="text-sm sm:text-base font-monument text-white/70 hover:text-champagne-gold transition-colors" onClick={() => setIsMobileOpen(false)}>FORMATION</NavLink>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
