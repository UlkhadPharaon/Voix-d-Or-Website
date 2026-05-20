import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-2xl text-white tracking-widest mb-4">
              STUDIO VOIX D'OR
            </h3>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Une fusion d'artisanat traditionnel et de technologie futuriste. 
              Nous sculptons l'avenir de la production audiovisuelle.
            </p>
          </div>
          
          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest mb-6 text-sm">Navigation</h4>
            <ul className="space-y-4">
              {['Accueil', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-gold-500 font-bold uppercase tracking-widest mb-6 text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="text-gray-400 text-sm">Paris, France</li>
              <li className="text-gray-400 text-sm">hello@voixdor.studio</li>
              <li className="flex gap-4 mt-4">
                {[Instagram, Twitter, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="text-white hover:text-gold-500 transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © 2024 Studio Voix d'Or. Tous droits réservés.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs uppercase tracking-wider">Confidentialité</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs uppercase tracking-wider">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
