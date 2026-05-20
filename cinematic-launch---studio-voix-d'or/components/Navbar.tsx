import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import Logo from './Logo';
import Magnetic from './Magnetic';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-md border-b border-[#D4AF37]/10 py-2' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#D4AF37] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              <Logo className="h-12 md:h-14 w-auto" />
            </div>
            <div className="hidden lg:block">
               <span className="block text-white font-cinzel text-lg leading-none tracking-widest font-bold">STUDIO</span>
               <span className="block text-[#D4AF37] text-[0.6rem] uppercase tracking-[0.3em] leading-none mt-1">VOIX D'OR</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-xs font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-[#D4AF37] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Magnetic>
                <button 
                onClick={() => scrollToSection('#audit')}
                className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                Start Project
                </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[#D4AF37]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-cinzel text-white hover:text-[#D4AF37] transition-colors"
              >
                {link.name}
              </button>
            ))}
             <button 
              onClick={() => scrollToSection('#audit')}
              className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest mt-8"
            >
              Start Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;