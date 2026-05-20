"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const epochs = [
    {
        year: "2006-2010",
        title: "La Genèse : Contre Vents et Marées",
        description: "Tout a commencé par une obsession : celle de Kheops pour la magie du son et de l'image. Face à l'incompréhension et aux doutes, la passion s'est muée en une détermination féroce. Forgé par une formation rigoureuse en ingénierie du cinéma à l'ISIS/SE, les fondations d'une vision hors normes ont été posées. L'artisanat brut rencontrait déjà l'ambition de transcender le réel."
    },
    {
        year: "2014-2020",
        title: "L'Ascension : L'Artisanat de l'Image",
        description: "De la direction de BUUD PANGA PRODUCTION à la gestion de plateaux complexes, l'expertise technique est devenue notre signature. En combinant une maîtrise pointue des équipements numériques et des instruments traditionnels, le studio a imposé sa rigueur. C'est l'époque de la confiance gagnée auprès de l'État burkinabè et des productions de grande envergure."
    },
    {
        year: "2021",
        title: "La Consécration : L'Excellence Récompensée",
        description: "L'expertise Voix d'Or atteint les sommets institutionnels et panafricains. Le travail acharné au mixage et à l'assistance réalisation sur le film 'Zalissa' est couronné par le prestigieux Poulain d'Or au FESPACO 2021. En parallèle, à travers une alliance stratégique forte avec l'agence partenaire Brand Image, notre force de frappe audiovisuelle est déployée pour capitaliser les actions majeures de géants mondiaux comme Save The Children et Terre des Hommes. Être le pilier technique des plus grandes campagnes : l'excellence n'est plus une promesse, c'est un standard certifié."
    },
    {
        year: "L'Avenir",
        title: "L'Ère Nouvelle : L'Empire Néo-Ancestral",
        description: "Le Studio Voix d'Or fusionne la puissance narrative de notre héritage avec les technologies de demain. Propulsés par l'IA et des workflows propriétaires d'élite, nous garantissons une vélocité d'exécution absolue. Notre mission : donner aux marques la visibilité des géants, révéler les talents mondiaux, et former l'élite de demain. Savoir rêver grand et l'accomplir avec Voix d'Or, c'est choisir la voie d'or vers votre élévation."
    }
];

export const AboutTimeline = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="px-4 md:px-8 py-12 md:py-24 relative z-20">
            <section
                className="relative py-24 md:py-32 bg-[#FAFAFA] text-gray-900 overflow-hidden rounded-[2rem] md:rounded-[4rem] shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-[#C5A059]/20"
                ref={containerRef}
            >
                {/* Background Texture / Glow */}
                <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAFAFA] to-[#ECECEC]" />

                <div className="absolute inset-0 max-w-7xl mx-auto flex justify-start md:justify-center pointer-events-none px-6 md:px-0">
                    {/* The Track */}
                    <div
                        className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[1px] -translate-x-[0.5px] bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent"
                    />
                    {/* The Golden Thread */}
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute top-0 left-6 md:left-1/2 w-[3px] -translate-x-[1.5px] bg-gradient-to-b from-white via-[#C5A059] to-transparent shadow-[0_0_20px_rgba(197,160,89,1)] z-10"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
                    <div className="text-center mb-24 md:mb-32">
                        <span className="text-[#C5A059] text-sm font-bold tracking-[0.4em] uppercase mb-6 block font-satoshi">
                            La Mythologie
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-[#111] tracking-tighter mix-blend-multiply">
                            L'Héritage
                        </h2>
                    </div>

                    <div className="relative space-y-20 md:space-y-40">
                        {epochs.map((epoch, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 80 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 60,
                                        damping: 20,
                                        mass: 1.5,
                                        delay: 0.1,
                                    }}
                                    className={`flex flex-col md:flex-row items-center gap-10 md:gap-24 relative ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Spacer for Timeline Center */}
                                    <div className="hidden md:block md:w-1/2" />

                                    {/* Mobile Node */}
                                    <div className="absolute left-0 top-0 md:hidden flex items-center justify-center -translate-x-2 mt-8">
                                        <div className="w-5 h-5 rounded-full bg-[#FAFAFA] border-2 border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.5)] flex items-center justify-center z-20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                                        </div>
                                    </div>

                                    {/* Desktop Node */}
                                    <div className="hidden md:absolute md:left-1/2 md:-translate-x-1/2 md:flex items-center justify-center pointer-events-none z-20">
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.8 }}
                                            className="w-10 h-10 rounded-full bg-[#FAFAFA] border border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.4)] flex items-center justify-center backdrop-blur-sm"
                                        >
                                            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A059] shadow-[0_0_10px_rgba(197,160,89,0.8)]" />
                                        </motion.div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 flex ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                                        <div className="relative w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-[#C5A059]/20 rounded-[2rem] p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(197,160,89,0.15)] hover:bg-white/90 hover:border-[#C5A059]/40 transition-all duration-700 group overflow-hidden">

                                            {/* Decorative Glow */}
                                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-bl from-[#C5A059]/10 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />

                                            <div className="mb-6 relative z-10 flex flex-col items-start gap-2">
                                                <span className="inline-block px-4 py-1.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/5 text-xs font-bold tracking-widest text-[#C5A059] uppercase">
                                                    Époque
                                                </span>
                                                <span className="inline-block text-2xl md:text-4xl font-display font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#B8860B] tracking-wider drop-shadow-sm">
                                                    {epoch.year}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl md:text-[2.5rem] font-display font-bold text-[#1A1A1A] mb-8 leading-[1.1] group-hover:text-[#C5A059] transition-colors duration-500 relative z-10">
                                                {epoch.title}
                                            </h3>

                                            <p className="text-[#4A4A4A] leading-relaxed md:leading-loose font-satoshi font-light text-base md:text-lg relative z-10">
                                                {epoch.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};
