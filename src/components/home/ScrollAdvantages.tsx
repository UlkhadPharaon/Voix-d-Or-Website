import { TextBlock } from './scroll/TextBlock';
import { StickyVisual } from './scroll/StickyVisual';

const advantages = [
    {
        number: "01",
        title: "Satisfaction Absolue",
        description: "Nous plaçons votre satisfaction au cœur de tout ce que nous créons. Chaque projet est une collaboration sincère, où vos idées deviennent des œuvres sur mesure. Notre objectif est simple : faire résonner votre vision."
    },
    {
        number: "02",
        title: "Rapidité & Maîtrise",
        description: "Le temps est votre ressource la plus précieuse. Grâce à des processus optimisés, nous livrons des résultats professionnels à une vitesse record, sans jamais sacrifier la qualité. Efficacité et fiabilité sont nos maîtres mots."
    },
    {
        number: "03",
        title: "Savoir Rêver Grand et l'Accomplir",
        description: "Chez Studio Voix d’Or, nous croyons en la puissance des rêves audacieux. Nous repoussons les limites de la création pour donner vie à des projets qui inspirent, transcendent et marquent les esprits."
    }
];

export const ScrollAdvantages = () => {
    return (
        <section className="relative bg-vantablack">
            <div className="flex flex-col-reverse md:flex-row">

                {/* Left Column: Text (Scrolls) */}
                <div className="w-full md:w-1/2 relative z-10 pl-6 md:pl-20">
                    {advantages.map((item, index) => (
                        <TextBlock key={index} {...item} />
                    ))}
                    {/* Extra spacer at bottom to allow last item to scroll out */}
                    <div className="h-[20vh]" />
                </div>

                {/* Right Column: Visual (Sticky) */}
                <div className="w-full md:w-1/2 h-screen sticky top-0 md:block hidden">
                    <StickyVisual />
                </div>

            </div>
        </section>
    );
};
