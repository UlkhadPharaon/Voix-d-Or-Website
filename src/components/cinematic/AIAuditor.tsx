import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeBrandGap } from '@/services/geminiService';
import { Sparkles, ArrowRight, RefreshCcw } from 'lucide-react';

const AIAuditor: React.FC = () => {
    const [step, setStep] = useState<'intro' | 'form' | 'loading' | 'result'>('intro');
    const [formData, setFormData] = useState({
        industry: '',
        currentVibe: '',
        goal: ''
    });
    const [analysis, setAnalysis] = useState<string>('');

    const handleStart = () => setStep('form');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('loading');
        const result = await analyzeBrandGap(formData);
        setAnalysis(result);
        setStep('result');
    };

    const handleReset = () => {
        setFormData({ industry: '', currentVibe: '', goal: '' });
        setStep('intro');
    };

    return (
        <section id="audit" className="py-24 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37] opacity-5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37] text-xs uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        <span>Technologie Google AI Studio</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl text-white font-bold mb-4 font-display">AI BRAND AUDITOR™</h2>
                    <p className="text-gray-400 max-w-xl mx-auto font-satoshi">
                        Découvrez en 30 secondes le "gap" entre votre image actuelle et le standard mondial.
                    </p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-lg shadow-2xl relative min-h-[400px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">

                        {step === 'intro' && (
                            <motion.div
                                key="intro"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <h3 className="text-2xl text-white font-bold mb-6 font-display">Prêt pour la vérité ?</h3>
                                <p className="text-gray-400 mb-8 font-satoshi">
                                    Notre IA analyse votre positionnement psychologique. Ce n'est pas un simple quiz. C'est un miroir stratégique.
                                </p>
                                <button
                                    onClick={handleStart}
                                    className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors font-display"
                                >
                                    Lancer le scan
                                </button>
                            </motion.div>
                        )}

                        {step === 'form' && (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-[#D4AF37] text-xs uppercase tracking-wider mb-2">Votre Industrie</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Haute Horlogerie, Tech, Immobilier..."
                                        className="w-full bg-[#111] border border-white/10 p-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-satoshi"
                                        value={formData.industry}
                                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#D4AF37] text-xs uppercase tracking-wider mb-2">Vibe Actuelle</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Traditionnelle, Sobre, Trop colorée..."
                                        className="w-full bg-[#111] border border-white/10 p-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-satoshi"
                                        value={formData.currentVibe}
                                        onChange={(e) => setFormData({ ...formData, currentVibe: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#D4AF37] text-xs uppercase tracking-wider mb-2">Ambition Ultime</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Devenir le leader panafricain..."
                                        className="w-full bg-[#111] border border-white/10 p-4 text-white focus:border-[#D4AF37] outline-none transition-colors font-satoshi"
                                        value={formData.goal}
                                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                    />
                                </div>
                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-2 group font-display"
                                    >
                                        <span>Analyser ma Marque</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.form>
                        )}

                        {step === 'loading' && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center text-center"
                            >
                                <div className="w-16 h-16 border-4 border-[#D4AF37]/20 border-t-[#D4AF37] rounded-full animate-spin mb-6" />
                                <p className="text-[#D4AF37] animate-pulse font-mono uppercase text-sm">Traitement Neuronal en cours...</p>
                                <p className="text-gray-500 text-xs mt-2">Accès aux archives du futur...</p>
                            </motion.div>
                        )}

                        {step === 'result' && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-left"
                            >
                                <div className="mb-6 border-l-4 border-[#D4AF37] pl-6">
                                    <h4 className="text-white font-bold text-xl mb-2 font-display">DIAGNOSTIC STRATÉGIQUE</h4>
                                    <div className="text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base font-light font-satoshi">
                                        {analysis}
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col md:flex-row gap-4">
                                    <button className="flex-1 px-6 py-3 bg-[#D4AF37] text-black font-bold uppercase text-sm hover:bg-white transition-colors font-display">
                                        Réserver un appel stratégique
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="flex-1 px-6 py-3 bg-transparent border border-white/20 text-white font-bold uppercase text-sm hover:border-white transition-colors flex items-center justify-center gap-2 font-display"
                                    >
                                        <RefreshCcw size={16} />
                                        Nouvelle Analyse
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default AIAuditor;
