import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4AF37] opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-center md:text-left flex flex-col items-center md:items-start">
          <Logo className="h-20 w-auto mb-6" />
          <h3 className="text-white font-cinzel font-bold text-lg tracking-wider">STUDIO VOIX D'OR</h3>
          <p className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] mt-1 mb-4">Savoir Rêver Grand</p>
          <p className="text-gray-600 text-xs max-w-xs">
            L'architecture de votre héritage numérique commence ici. 
            Ouagadougou
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-gray-400 text-xs font-medium tracking-wide max-w-md">
            <a href="#" className="hover:text-[#D4AF37] transition-colors hover:scale-105 transform duration-300">INSTAGRAM</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors hover:scale-105 transform duration-300">FACEBOOK</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors hover:scale-105 transform duration-300">TIKTOK</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors hover:scale-105 transform duration-300">YOUTUBE</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors hover:scale-105 transform duration-300">LINKEDIN</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors hover:scale-105 transform duration-300">WHATSAPP</a>
            </div>
            <div className="mt-4 text-gray-700 text-xs font-mono">
            © {new Date().getFullYear()} CINEMATIC LAUNCH™. ALL RIGHTS RESERVED.
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;