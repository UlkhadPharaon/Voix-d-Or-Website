import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Fallback logic in case key is missing in demo env, though instructions say assume valid.
const ai = new GoogleGenAI({ apiKey });

export interface BrandAuditParams {
  industry: string;
  currentVibe: string;
  goal: string;
}

export const analyzeBrandGap = async (params: BrandAuditParams): Promise<string> => {
  if (!apiKey) {
    return "Notre service de conciergerie digitale est momentanément indisponible. Veuillez vérifier votre clé d'accès.";
  }

  const prompt = `
    Tu es un Consultant de Marque de Luxe Senior, expert en "Brand Elevation" et en codes du luxe (Hermès, Aman Resorts, Patek Philippe).
    Ton ton est : Raffiné, Calme, Exclusif, Perspicace. Tu ne cherches pas à dominer, mais à *sublimer*.
    
    Analyse les données suivantes d'un client prestigieux :
    - Industrie : ${params.industry}
    - Aura Actuelle : ${params.currentVibe}
    - Vision Ultime : ${params.goal}
    
    Ta mission :
    1. Identifie avec tact mais précision ce qui manque pour atteindre l'excellence visée.
    2. Propose une direction artistique sophistiquée (métaphores visuelles, matières, lumière).
    3. Conclus par une invitation subtile à l'élévation via le Cinematic Launch.
    
    Reste concis (max 100 mots). Utilise un vocabulaire choisi (Prestige, Intemporel, Signature, Essence).
  `;

  try {
    // Optimized for speed as per "Fast AI responses" request
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: prompt,
    });
    return response.text || "Le diagnostic est en cours de finition...";
  } catch (error) {
    console.error("Erreur IA:", error);
    return "Une interférence momentanée nous empêche de finaliser l'audit. Veuillez réessayer.";
  }
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const streamChatWithAwa = async (
  history: ChatMessage[],
  newMessage: string,
  onChunk: (text: string) => void
) => {
  if (!apiKey) {
    onChunk("Je ne parviens pas à établir la connexion. Veuillez vérifier la clé API.");
    return;
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview', // Pro model for the assistant as requested
      config: {
        systemInstruction: `Tu es AWA, la Concierge Digitale du "Studio VOIX D'OR".
        
        TON PERSONA :
        - Extrêmement polie, calme et raffinée.
        - Tu t'exprimes comme le concierge d'un hôtel 5 étoiles.
        - Tu utilises des termes comme "Excellence", "Raffinement", "Vision".
        - Tu ne parles pas de "guerre" ou de "domination", mais d'"Héritage" et d'"Impact".
        
        TA MISSION :
        - Guider les visiteurs vers l'Audit de Marque ou la prise de rendez-vous.
        - Expliquer que Cinematic Launch est une "Forge d'Art Digital", pas une simple agence.
        
        SI ON DEMANDE LES PRIX :
        - "L'excellence est un investissement sur mesure. Tout dépend de la grandeur de votre vision."
        
        Si on te demande qui tu es : "Je suis AWA. L'esprit de la Maison."
        `,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: newMessage });
    
    for await (const chunk of result) {
       if (chunk.text) {
         onChunk(chunk.text);
       }
    }
  } catch (error) {
    console.error("Chat Error:", error);
    onChunk("Je vous prie de m'excuser, je rencontre une difficulté technique.");
  }
};