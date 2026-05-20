import React from 'react';
import { GlowCard } from './spotlight-card';

export interface FAQItem {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    title?: string;
    description?: string;
    questions: FAQItem[];
    className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
    title = "Questions Fréquentes",
    description,
    questions,
    className = ""
}) => {
    return (
        <section className={`py-24 relative overflow-hidden bg-[#FAFAFA] ${className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAFAFA] to-[#ECECEC] opacity-60 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4 block font-satoshi">
                        L'Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#111] uppercase tracking-tight font-display mb-6">
                        {title}
                    </h2>
                    {description && (
                        <p className="text-gray-600 font-satoshi font-light text-lg">
                            {description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {questions.map((item, index) => (
                        <GlowCard
                            key={index}
                            glowColor="gold"
                            customSize
                            theme="light"
                            className="h-full w-full bg-white/60 border border-[#C5A059]/10 hover:border-[#C5A059]/30 transition-colors duration-500 p-8"
                        >
                            <div className="flex flex-col h-full relative z-20">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 font-display leading-tight">
                                    {item.question}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-satoshi font-light">
                                    {item.answer}
                                </p>
                            </div>
                        </GlowCard>
                    ))}
                </div>
            </div>
        </section>
    );
};
