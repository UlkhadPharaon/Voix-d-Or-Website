import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SkewCardData {
    title: string;
    desc: string | ReactNode;
    gradientFrom?: string;
    gradientTo?: string;
    button?: string;
    buttonHref?: string;
    icon?: ReactNode;
}

interface SkewCardsProps {
    cards: SkewCardData[];
    className?: string;
}

export default function SkewCards({ cards, className }: SkewCardsProps) {
    return (
        <>
            <div className={cn("flex justify-center items-center flex-wrap py-10", className)}>
                {cards.map(({ title, desc, gradientFrom = '#D4AF37', gradientTo = '#8B6914', button, buttonHref, icon }, idx) => (
                    <div
                        key={idx}
                        className="group relative w-[320px] h-[400px] m-[40px_30px] transition-all duration-500"
                    >
                        {/* Skewed gradient panels */}
                        <span
                            className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                            style={{
                                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                            }}
                        />
                        <span
                            className="absolute top-0 left-[50px] w-1/2 h-full rounded-lg transform skew-x-[15deg] blur-[30px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[20px] group-hover:w-[calc(100%-90px)]"
                            style={{
                                background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})`,
                            }}
                        />

                        {/* Animated blurs */}
                        <span className="pointer-events-none absolute inset-0 z-10">
                            <span className="absolute top-0 left-0 w-0 h-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-skew-blob group-hover:top-[-50px] group-hover:left-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                            <span className="absolute bottom-0 right-0 w-0 h-0 rounded-full opacity-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-500 animate-skew-blob-delayed group-hover:bottom-[-50px] group-hover:right-[50px] group-hover:w-[100px] group-hover:h-[100px] group-hover:opacity-100" />
                        </span>

                        {/* Content */}
                        <div className="preserve-white relative z-20 left-0 p-[24px_36px] h-full flex flex-col justify-center bg-[rgba(10,10,10,0.85)] backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(212,175,55,0.08)] rounded-lg border border-white/10 text-white transition-all duration-500 group-hover:left-[-25px] group-hover:p-[40px_36px] group-hover:bg-[rgba(10,10,10,0.92)]">
                            {icon && (
                                <div className="mb-5 text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                    {icon}
                                </div>
                            )}
                            <h2 className="text-2xl md:text-3xl font-display font-normal mb-3 text-white group-hover:text-[#D4AF37] transition-colors duration-500">{title}</h2>
                            <div className="text-sm text-gray-300 leading-7 mb-6 font-satoshi">{desc}</div>
                            {button && (
                                <a
                                    href={buttonHref || "#"}
                                    className="inline-block w-fit text-xs font-monument font-bold uppercase tracking-widest text-black bg-[#D4AF37] px-5 py-3 rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300"
                                >
                                    {button}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes skewBlob {
                    0%, 100% { transform: translateY(10px); }
                    50% { transform: translate(-10px, -5px); }
                }
                .animate-skew-blob { animation: skewBlob 3s ease-in-out infinite; }
                .animate-skew-blob-delayed { animation: skewBlob 3s ease-in-out infinite; animation-delay: -1.5s; }
            `}</style>
        </>
    );
}

export type { SkewCardData };
