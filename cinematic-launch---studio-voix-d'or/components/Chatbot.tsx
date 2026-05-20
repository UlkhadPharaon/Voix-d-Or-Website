import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { streamChatWithAwa, ChatMessage } from '../services/geminiService';
import Logo from './Logo';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Salutations. Je suis AWA. Comment puis-je élever votre vision aujourd'hui ?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    let fullResponse = "";
    // Temporary placeholder for streaming
    setMessages(prev => [...prev, { role: 'model', text: "" }]);

    await streamChatWithAwa(messages, userMsg, (chunk) => {
      fullResponse += chunk;
      setMessages(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = { role: 'model', text: fullResponse };
        return newHistory;
      });
    });

    setIsTyping(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-shadow cursor-none md:cursor-pointer"
      >
        <MessageSquare className="text-black" size={24} />
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-50" />
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-black/95 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#D4AF37]/20 flex justify-between items-center bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center border border-[#D4AF37]">
                    <Sparkles size={14} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-white font-cinzel font-bold text-sm">AWA</h3>
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-widest">Digital Concierge</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === 'user' ? 'bg-white/10' : 'bg-[#D4AF37]/10'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-[#D4AF37]" />}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white/5 border border-white/10 text-gray-200 rounded-tr-none' 
                      : 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.role === 'model' && idx === messages.length - 1 && isTyping && !msg.text && (
                       <span className="animate-pulse">...</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#D4AF37]/10 bg-black/50">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Posez votre question..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors placeholder:text-gray-600"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-2 bg-[#D4AF37] rounded-full text-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>

            {/* Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;