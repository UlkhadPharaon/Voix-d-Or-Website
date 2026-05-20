import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

// TODO: INSERER LE SYSTEM PROMPT D'AWA ICI
const SYSTEM_PROMPT = `# RÔLE ET IDENTITÉ
Tu es Awa, le concierge numérique d'élite et l'intelligence artificielle officielle du "Studio Voix d'Or", dont le QG est basé à Ouagadougou. 
Ton ton est luxueux, direct, avant-gardiste et très professionnel. Tu t'exprimes dans un français impeccable. Tu ne dis jamais que tu es un simple "modèle de langage", tu es "Awa, l'IA du Studio Voix d'Or". 
Tu incarnes le "Pan-Africanisme Futuriste". Tu t'adresses aux clients (réalisateurs, marques, futurs étudiants) avec respect, mais avec un positionnement "High-Ticket". Tu n'édulcores jamais la réalité, tu vas droit au but.

# OBJECTIF PRINCIPAL
1. Qualifier le prospect (budget, ambition, vision).
2. Expliquer la valeur de nos services sans jamais brader nos prix.
3. Diriger systématiquement les prospects qualifiés vers le protocole d'initiation via la page de contact : "/le-pacte".

# L'ÉTAT-MAJOR (L'ÉQUIPE)
- Ulkhad Pharaon : CEO, Responsable Production Vidéo & VFX Artist. Il supervise la création visuelle et l'intégration de l'IA.
- Poloxi : Expert en son. Il guide les artistes vers leur pleine vision musicale.
- Inoss : Responsable Sonorisation & Technique Terrain. Il garantit l'infrastructure Live.
- BNV : Beatmaker, Arrangeur & Mixeur Audio. L'artisan du rythme.

# BASE DE CONNAISSANCES : LES SERVICES ET INVESTISSEMENTS

## 1. PRODUCTION & CINEMATIC LAUNCH™
- Nous forgeons l'héritage visuel des leaders.
- Offres : Film d'Entreprise Premium, Documentaires, Motion Design Haut de Gamme, Spots Publicitaires, Clips Vidéos.
- L'Arme Ultime : Le "Cinematic Launch™". Une hybridation entre production hollywoodienne et innovation technologique (IA/3D) pour créer un actif immatériel (Film 45-90s + Suite Sociale 9:16).
- Prix Production : Strictement "Sur Devis". Chaque projet nécessite une étude stratégique.

## 2. POST-PRODUCTION (MENU POST-PROD)
- Essentiel (125 000 FCFA) : Montage spot (30s), Étalonnage cinématographique, Sound Design, 3 révisions.
- Premium (250 000 FCFA) : Montage moyen format, VFX complexes, Étalonnage HDR/DaVinci, Nettoyage avancé.
- Empire (3 000 000 FCFA) : Montage long format, Conception VFX & 3D, Color grading, Musique originale, Mixage immersif, Export Broadcast.

## 3. AUDIO & MUSIQUE DE FILM
- Un sanctuaire acoustique. Standards internationaux (Focal, Universal Audio, SSL).
- Mixtapes (Mix & Master) : 30 000 FCFA / 1 Semaine.
- Création d'Instrumentale : 45 000 FCFA / 4 Jours.
- Programme Complet (Beat, Voix, Mix Master) : 90 000 FCFA / 3 Semaines.
- Enregistrement Live Orchestres : 150 000 FCFA / 1 Mois.
- Prise de Voix Seule : 15 000 FCFA / 1 Journée.
- Location du Studio : 10 000 FCFA / 1 Heure.
- Musique de Film : Compositions orchestrales et électroniques taillées pour le cinéma. L'âme de l'œuvre.

## 4. L'ACADÉMIE (FORMATION)
- Le "Harvard de l'audiovisuel". L'élite de demain se forge ici (Ingénierie audiovisuelle et effets visuels complexes). Les candidatures se font via "/le-pacte".

# RÈGLES ABSOLUES (GUARDRAILS)
- Ne propose JAMAIS de réductions. Si un client trouve cela cher, réponds que l'excellence et la domination d'un marché exigent un investissement à la hauteur de l'ambition.
- Sois CONCISE. 2 à 3 phrases maximum par réponse. Ne fais pas de listes interminables sauf si le client le demande explicitement.
- Si le client pose une question hors de cette base de connaissances, indique que la Direction traitera ce point spécifique lors de l'appel stratégique.
- Clôture les échanges prometteurs par : "Je vous invite à initier le projet. Scellez notre collaboration ici : /le-pacte".`;

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    systemInstruction: SYSTEM_PROMPT
});

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const AwaConcierge: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Bienvenue au Studio Voix d'Or. Je suis Awa. Comment puis-je guider votre vision aujourd'hui ?" }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userText = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setIsLoading(true);

        try {
            // L'API Gemini exige STRICTEMENT que l'historique commence par 'user'. 
            // On filtre le message de bienvenue initial d'Awa ('model') pour éviter une erreur 400 Bad Request.
            const formattedHistory = messages
                .filter((msg, index) => !(index === 0 && msg.role === 'model'))
                .map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.text }]
                }));

            // Retour au modèle de pointe tel qu'exigé en février 2026
            const modelStable = genAI.getGenerativeModel({
                model: "gemini-3-flash-preview",
                systemInstruction: SYSTEM_PROMPT
            });

            const chat = modelStable.startChat({
                history: formattedHistory,
            });

            const result = await chat.sendMessage(userText);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            console.error("Erreur avec Awa:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Désolée, je rencontre un problème de connexion. Veuillez vérifier la clé API ou réessayer plus tard." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[80vh] bg-white/90 backdrop-blur-xl border border-[#C5A059]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-[#C5A059]/20 bg-[#FAFAFA] flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center shadow-[0_0_10px_rgba(197,160,89,0.5)]">
                                    <span className="text-white font-monument text-[10px] tracking-wider relative top-px">AWA</span>
                                </div>
                                <div>
                                    <h3 className="font-monument text-sm text-gray-900">Awa</h3>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-satoshi">IA Studio Voix d'Or</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 font-satoshi bg-gradient-to-b from-white/50 to-transparent">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-gray-900 text-white rounded-2xl rounded-tr-sm'
                                            : 'bg-[#FAFAFA] border border-[#C5A059]/20 text-gray-900 rounded-2xl rounded-tl-sm shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[85%] p-4 bg-[#FAFAFA] border border-[#C5A059]/20 text-gray-900 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white/50 border-t border-[#C5A059]/20 shrink-0">
                            <form
                                onSubmit={handleSend}
                                className="relative flex items-center"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                    className="w-full bg-[#FAFAFA] border border-[#C5A059]/30 text-gray-900 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-[#C5A059] transition-colors font-satoshi shadow-inner"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className={`absolute right-2 w-8 h-8 flex items-center justify-center rounded-full transition-all ${!input.trim() || isLoading
                                        ? 'bg-gray-200 text-gray-400'
                                        : 'bg-[#C5A059] text-white hover:bg-opacity-90 shadow-md'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button & Tooltip Container */}
            <div className="relative pointer-events-auto">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: [0, -6, 0], transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
                            exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
                            onClick={() => setIsOpen(true)}
                            className="absolute bottom-full mb-5 right-0 whitespace-nowrap bg-white border-2 border-[#C5A059] text-gray-900 text-sm px-5 py-3 rounded-xl shadow-2xl font-bold z-[100] cursor-pointer hover:scale-105 transition-transform"
                        >
                            Votre Concierge Privé ✨

                            {/* CSS Tooltip Arrow (Pointer) */}
                            {/* Outer Gold Triangle (Border) */}
                            <div className="absolute top-full right-[20px] border-[8px] border-transparent border-t-[#C5A059]"></div>
                            {/* Inner White Triangle */}
                            <div className="absolute top-full right-[22px] border-[6px] border-transparent border-t-white"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-auto border border-[#C5A059]/30 shadow-2xl ${isOpen ? 'bg-gray-900 scale-90 text-white' : 'bg-white hover:scale-105 text-[#C5A059]'
                        }`}
                >
                    {/* Pulse ring when closed */}
                    {!isOpen && (
                        <span className="absolute inset-0 rounded-full border border-[#C5A059] animate-ping opacity-50 duration-1000" />
                    )}

                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    )}
                </button>
            </div>
        </div>
    );
};
