import React from 'react';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';

const testimonials = [
    {
        author: {
            name: "Agence Kemet Lux",
            handle: "Direction Artistique",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        },
        text: "Une rigueur technique qui frôle l'obsession. Le Cinematic Launch n'est pas un service vidéo, c'est une arme de conversion massive.",
    },
    {
        author: {
            name: "Moussa Diop",
            handle: "CEO, Sahel Ventures",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        },
        text: "Nous avons vu un 'avant' et un 'après' immédiat dans la perception de nos investisseurs. Studio VOIX D'OR comprend le langage du pouvoir.",
    },
    {
        author: {
            name: "Amina Traoré",
            handle: "Fondatrice, Luxe Sahel",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        },
        text: "Le niveau de sophistication est incomparable. Chaque frame respire le luxe. Notre taux de conversion a explosé de 340% en trois semaines.",
    },
    {
        author: {
            name: "Jean-Marc Beaumont",
            handle: "Directeur Créatif, Maison B",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        },
        text: "J'ai travaillé avec des studios à Paris et à New York. Voix d'Or les surpasse tous en matière de storytelling visuel premium.",
    },
    {
        author: {
            name: "Fatou Ndiaye",
            handle: "CEO, FN Cosmetics",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        },
        text: "Notre lancement de marque a été transformé en événement cinématique. Le ROI a dépassé toutes nos projections. Investissement stratégique, pas une dépense.",
    },
    {
        author: {
            name: "Ibrahim Konaté",
            handle: "VP Marketing, Atlas Group",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        },
        text: "La différence entre un prestataire et un partenaire stratégique. Voix d'Or est le second. Ils ont compris notre ADN avant même notre premier brief.",
    },
];

const Testimonials: React.FC = () => {
    return (
        <TestimonialsSection
            title="L'Expertise Validée"
            description="Validé par nos partenaires de production"
            testimonials={testimonials}
        />
    );
};

export default Testimonials;
