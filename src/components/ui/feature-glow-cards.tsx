'use client';
import { Star, Edit2, Search, Video, Users, Film, FileText, Image as ImageIcon, Diamond, Volume2 } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    FileText,
    Image: ImageIcon,
    Video,
    Edit2,
    Diamond,
    Volume2,
    Star,
    Search,
    Users,
    Film
};

export interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface FeatureGlowCardsProps {
    title: string;
    subtitle: string;
    items: FeatureItem[];
}

export function FeatureGlowCards({ title, subtitle, items }: FeatureGlowCardsProps) {
    return (
        <section className="py-24 md:py-32 bg-transparent relative w-full">
            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="text-center mb-16 md:mb-24">
                    {subtitle && (
                        <h3 className="text-[#C5A059] text-xs font-bold tracking-[0.3em] uppercase mb-4">
                            {subtitle}
                        </h3>
                    )}
                    <h2 className="text-2xl md:text-3xl font-monument uppercase text-black">
                        {title}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                    {items.map((item, index) => {
                        const IconComponent = iconMap[item.icon] || FileText;

                        return (
                            <div key={index} className="bg-white rounded-[2rem] p-10 md:p-12 flex flex-col items-center text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group border border-black/5">

                                <div className="mb-6 text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
                                    <IconComponent className="w-7 h-7" strokeWidth={1} />
                                </div>

                                <h3 className="text-[13px] md:text-sm font-bold font-satoshi text-black uppercase tracking-[0.2em] mb-5 leading-relaxed">
                                    {item.title}
                                </h3>

                                <div className="w-8 h-[1px] bg-[#C5A059]/30 mb-5 group-hover:w-16 group-hover:bg-[#C5A059] transition-all duration-500"></div>

                                <p className="text-sm font-satoshi text-black/60 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeatureGlowCards;
