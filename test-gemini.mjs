import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyB3ifoU4KSczQZ617eYxieZE7zS_qxrXGs';
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `Tu es Awa, le concierge...`;

async function test() {
    try {
        console.log("Instantiating model...");
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: SYSTEM_PROMPT
        });

        console.log("Starting chat...");
        const chat = model.startChat({
            history: []
        });

        console.log("Sending message...");
        const result = await chat.sendMessage("salut");
        console.log("Response:", result.response.text());
    } catch (error) {
        console.error("API Error:");
        console.error(error);
    }
}

test();
