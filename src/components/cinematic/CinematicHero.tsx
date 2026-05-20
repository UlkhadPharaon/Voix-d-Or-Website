import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { AnimatedShaderHero } from '@/components/ui/animated-shader-hero';

export const CinematicHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Optional: we can still hook into scroll progress if we want to add extra effects later
    useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const handlePrimaryClick = () => {
        // Scroll to the offer section or contact
        document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSecondaryClick = () => {
        // Scroll to portfolio or showcase
        document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden"
            id="cinematic-hero"
        >
            <AnimatedShaderHero
                trustBadge={{
                    text: "Studio Voix d'Or Présente"
                }}
                headline={{
                    line1: "Cinematic",
                    line2: "Launch™"
                }}
                subtitle="Ne lancez pas un produit. Déclenchez un mouvement. Une expérience visuelle immersive pour dominer votre marché."
                buttons={{
                    primary: {
                        text: "Découvrir l'Arsenal",
                        onClick: handlePrimaryClick
                    },
                    secondary: {
                        text: "Explorer La Galerie",
                        onClick: handleSecondaryClick
                    }
                }}
            />
        </section>
    );
};

