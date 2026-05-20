

const services = [
    {
        id: 1,
        title: "Post-Production",
        description: "Editing, VFX, and compositing with industry-leading precision. We sculpt time and light to perfect your narrative.",
        icon: "movie_edit",
        number: "01",
        image: "https://images.unsplash.com/photo-1574717432724-43c969d7bb3a?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Audio Engineering",
        description: "Crystal clear recording, mixing, and mastering in Dolby Atmos. Sonic architecture for immersive experiences.",
        icon: "graphic_eq",
        number: "02",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "VFX & Grading",
        description: "Bringing cinematic color science to your visual storytelling. High dynamic range grading and seamless VFX.",
        icon: "auto_fix_high",
        number: "03",
        image: "https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?q=80&w=800&auto=format&fit=crop"
    }
];

export const ServicesTeaser = () => {
    return (
        <section className="relative z-10 py-32 bg-transparent">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-black/5 pb-8">
                    <div className="relative pl-6">
                        <div className="absolute left-0 top-1 w-1 h-full bg-gold-500 opacity-0 md:opacity-100" />
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-charcoal uppercase tracking-widest leading-none">
                            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-charcoal to-gray-500">Expertises</span>
                        </h2>
                        <p className="text-charcoal/60 mt-4 max-w-md font-sans text-lg tracking-wide opacity-80">
                            Technologie de pointe et vision artistique pour des résultats cinématographiques.
                        </p>
                    </div>

                    <a href="/services" className="group flex items-center gap-3 text-gold-500 hover:text-charcoal transition-colors duration-300">
                        <span className="uppercase text-sm tracking-[0.2em] font-bold">View All Services</span>
                        <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group relative overflow-hidden rounded-xl h-[500px] flex flex-col justify-end bg-white/60 backdrop-blur-3xl border border-black/5 hover:border-gold-500/80 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition-all duration-500">
                            {/* Liquid Border Simulation */}
                            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent animate-[borderFlow_2s_linear_infinite]" />
                            </div>

                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-80"
                                    style={{ backgroundImage: `url('${service.image}')` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-8 border-t border-black/5 bg-white/80 backdrop-blur-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="w-14 h-14 rounded-full bg-black/5 border border-gold-500/30 flex items-center justify-center backdrop-blur-md group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-500">
                                        <span className="material-symbols-outlined text-gold-500 text-2xl group-hover:text-white transition-colors">{service.icon}</span>
                                    </div>
                                    <span className="text-gold-500/50 text-4xl font-serif opacity-20 group-hover:opacity-50 transition-opacity">{service.number}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-charcoal mb-3 font-serif uppercase tracking-wider group-hover:text-gold-500 transition-colors">
                                    {service.title}
                                </h3>

                                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                                    <p className="text-charcoal text-base font-sans font-light leading-relaxed opacity-80 mb-6">
                                        {service.description}
                                    </p>
                                </div>

                                <div className="w-full h-[1px] bg-gold-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-full bg-gold-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
