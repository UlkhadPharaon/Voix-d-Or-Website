import { ContactProtocol } from '@/components/contact/ContactProtocol';

// 🏛️ Page Contact : Déclenchement du protocole d'audience VIP
// Cette page utilise le composant ContactProtocol pour une expérience immersive.

export default function Contact() {
    return (
        <main className="relative z-0">
            <ContactProtocol />
        </main>
    );
}
