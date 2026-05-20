import { Web3MediaHero } from "@/components/ui/web3media-hero";
import { Video, Award, Film, Mic2 } from "lucide-react";

// 🚀 NewHero : Version alternative et moderne du Hero utilisant le composant Web3MediaHero
// Parfait pour une esthétique tech et premium avec des icônes flottantes
export function NewHero() {
    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Web3MediaHero
            logo="VOIX D'OR"
            title="L'ART DE"
            highlightedText="DOMINER"
            subtitle="Pour les marques qui refusent l'anonymat. Nous fusionnons stratégie, créativité et excellence technique pour bâtir des empires audiovisuels."
            ctaButton={{
                label: "DÉMARRER LE PROJET",
                onClick: scrollToContact,
            }}
            cryptoIcons={[
                {
                    icon: <Video className="w-6 h-6" />,
                    label: "PRODUCTION",
                    position: { x: "10%", y: "25%" },
                },
                {
                    icon: <Film className="w-6 h-6" />,
                    label: "CINEMA",
                    position: { x: "85%", y: "20%" },
                },
                {
                    icon: <Award className="w-6 h-6" />,
                    label: "PREMIUM",
                    position: { x: "15%", y: "65%" },
                },
                {
                    icon: <Mic2 className="w-6 h-6" />,
                    label: "AUDIO",
                    position: { x: "80%", y: "60%" },
                },
            ]}
            trustedByText="ILS NOUS FONT CONFIANCE"
            brands={[
                { name: "Brand Image", logo: "/assets/brands/brand image logo.jpg" },
                { name: "Sermel Films", logo: "/assets/brands/Sermel film big.png" },
                { name: "Teeg Wend Prod", logo: "/assets/brands/Teeg Wend Prod.jpg" },
                { name: "Sentinelle Prod", logo: "/assets/brands/Sentinelle Production.jpg" },
                { name: "Nafadou", logo: "/assets/brands/NAFADOU.jpg" },
                { name: "BBDA", logo: "/assets/brands/BBDA.jpg" },
            ]}
            videoBackground="/assets/video/Accueil_page_her_BG.mp4"
        />
    );
}

// 🎯 Note technique : Ce composant est idéal pour les landing pages à fort impact visuel.
