import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled ? 'bg-dark-900/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex flex-col group">
          <span className="font-display font-bold text-2xl text-white tracking-widest group-hover:text-gold-400 transition-colors">
            VOIX D'OR
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500">
            Studio
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium tracking-widest uppercase relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[1px] after:bg-gold-500 after:transition-all hover:after:w-full hover:text-gold-400 transition-colors ${
                  isActive ? 'text-gold-500 after:w-full' : 'text-gray-400'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button className="border border-gold-500/30 px-6 py-2 text-gold-500 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-all">
            Réserver
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-6">
           {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="text-lg font-display text-white hover:text-gold-500"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
