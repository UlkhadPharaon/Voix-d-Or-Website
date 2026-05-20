import React from 'react';
import { CinematicHero } from '@/components/cinematic/CinematicHero';
import Offer from '@/components/cinematic/Offer';
import Distinction from '@/components/cinematic/Distinction';
import TheVault from '@/components/cinematic/TheVault';
import Partners from '@/components/cinematic/Partners';
import AIAuditor from '@/components/cinematic/AIAuditor';
import { FaqSection } from '@/components/ui/FaqSection';

import { NavLink } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CinematicLaunch: React.FC = () => {
    return (
        <div className="bg-vantablack min-h-screen text-white w-full overflow-x-hidden">
            {/* Back to Home Button (Optional, for navigation safety) */}
            <NavLink to="/" className="fixed top-6 left-6 z-50 p-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white">
                <ArrowLeft size={20} />
            </NavLink>

            <CinematicHero />
            <Partners />
            <Offer />
            <Distinction />
            <TheVault />
            <AIAuditor />
            <FaqSection
                title="Questions Fréquentes"
                questions={[
                    {
                        question: "Qu'est-ce qui différencie l'offre 'Cinematic Launch' d'une publicité classique ?",
                        answer: "Le Cinematic Launch n'est pas une simple annonce, c'est un événement visuel. Il est conçu pour élever instantanément la perception de votre marque et créer un impact psychologique profond sur votre audience cible."
                    },
                    {
                        question: "Adaptez-vous les formats pour les différentes plateformes digitales ?",
                        answer: "Oui. Chaque campagne est livrée avec un écosystème de formats taillés sur mesure pour maximiser l'engagement sur tous les réseaux sociaux, sans jamais compromettre la qualité cinématographique."
                    },
                    {
                        question: "Comment mesurez-vous le succès visuel d'une campagne ?",
                        answer: "Nous créons des visuels magnétiques. Notre objectif est de maximiser la rétention d'attention et de générer un ROI perçu immédiat par la supériorité esthétique de la campagne."
                    }
                ]}
                className="bg-vantablack border-t border-white/5"
            />

        </div>
    );
};

export default CinematicLaunch;
