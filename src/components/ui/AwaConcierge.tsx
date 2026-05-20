import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const AwaConcierge: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: "Bienvenue au Studio Voix d'Or. Je suis Awa. Comment puis-je guider votre vision aujourd'hui ?",
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
        setInput('');
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // TODO: INJECT LLM API FETCH HERE
            // Make a call to your AI backend/LLM (e.g., OpenAI, Gemini, Claude)
            // Provide the Studio Voix d'Or knowledge base as the system prompt.
            // E.g.: 
            // const response = await fetch('/api/chat', { method: 'POST', body: JSON.stringify({ message: userMessage }) });
            // const data = await response.json();
            // setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);

            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: "Ceci est une réponse simulée d'Awa. L'intégration de l'API arrive bientôt." },
            ]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="mb-4 w-80 sm:w-96 rounded-2xl bg-white/80 backdrop-blur-xl border border-[#C5A059]/30 shadow-[0_20px_40px_-15px_rgba(197,160,89,0.15)] overflow-hidden flex flex-col"
                        style={{ maxHeight: 'calc(100vh - 120px)', height: '500px' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-[#C5A059]/10 bg-white/50">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                                <span className="font-semibold text-gray-900 tracking-wide text-sm">
                                    Awa - Intelligence Voix d'Or
                                </span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100/50 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                                aria-label="Fermer le chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                            <AnimatePresence initial={false}>
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${message.role === 'user'
                                                    ? 'bg-gray-900 text-white rounded-br-sm'
                                                    : 'bg-white/60 border border-[#C5A059]/20 text-gray-900 rounded-bl-sm shadow-sm'
                                                }`}
                                        >
                                            {message.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-white/60 border border-[#C5A059]/20 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1">
                                            <motion.div
                                                className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                            />
                                            <motion.div
                                                className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                            />
                                            <motion.div
                                                className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 border-t border-[#C5A059]/10 bg-white/50">
                            <form
                                onSubmit={handleSendMessage}
                                className="relative flex items-center bg-white/80 border border-gray-200 focus-within:border-[#C5A059] rounded-full transition-colors shadow-sm"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-2 mr-1 text-[#C5A059] hover:text-[#A88647] hover:bg-[#C5A059]/10 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
                                    aria-label="Envoyer le message"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-white border border-[#C5A059]/40 rounded-full shadow-[0_8px_30px_rgba(197,160,89,0.3)] flex items-center justify-center text-[#C5A059] relative z-50 overflow-hidden"
                aria-label="Ouvrir le chat avec Awa"
            >
                <div className="absolute inset-0 bg-[#C5A059]/10 animate-pulse rounded-full" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 relative z-10" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6 relative z-10" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};
