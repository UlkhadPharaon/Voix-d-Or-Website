import { motion } from 'framer-motion';

const team = [
    {
        name: "Kheops",
        role: "Fondateur & Directeur Artistique",
        image: "/assets/team/Kheops.webp",
        description: "Visionnaire et créatif, Kheops est le moteur du Studio Voix d’Or. Depuis son enfance, il nourrit une passion pour l’audiovisuel. Aujourd’hui, il guide chaque projet avec une vision audacieuse, mêlant innovation et émotion, pour donner vie aux rêves de ses clients."
    },
    {
        name: "MK",
        role: "Manager d'Artistes & Stratège Musical",
        image: "/assets/team/MK.webp",
        description: "Pilier stratégique et relationnel, MK est le catalyseur de talent au sein du Studio Voix d'Or. Expert dans le développement de carrières, il accompagne chaque artiste avec une précision redoutable, alignant vision créative et domination de l'industrie pour propulser leurs œuvres vers les sommets."
    },
    {
        name: "Chris Joël",
        role: "Cadreur, Photographe",
        image: "/assets/team/Chris_Joel.png",
        description: "Derrière l’objectif, Chris Joël capte des émotions authentiques. Photographe et cadreur passionné, il sublime chaque scène grâce à un regard artistique affûté, transformant chaque instant en image forte."
    },
    {
        name: "Poloxi",
        role: "Expert en son",
        image: "/assets/team/Poloxi.webp",
        description: "Expert en son, Poloxi apporte une maîtrise technique exceptionnelle à chaque projet. Son objectif : créer des expériences auditives puissantes et immersives, grâce à des outils de pointe et une sensibilité artistique unique."
    },
    {
        name: "Ulkhad Pharaon",
        role: "Responsable Production Vidéo & VFX Artist",
        image: "/assets/team/Ulkhad.webp",
        description: "Ulkhad Pharaon gère toute la production vidéo, du tournage à la post-production. Montage, étalonnage et effets spéciaux : il transforme chaque projet en création visuelle de haut niveau, alliant technique et émotion."
    },
    {
        name: "Pape",
        role: "Responsable Sonorisation & Technique Terrain",
        image: "/assets/team/Pape.webp",
        description: "Pape gère toute l'infrastructure audio en direct, de la logistique événementielle à l'installation des équipements. Câblage complexe, montage et ingéniosité technique : il assure une fiabilité absolue sur chaque plateau, alliant polyvalence et efficacité redoutable."
    },
    {
        name: "BNV",
        role: "Fondateur & Directeur Artistique",
        image: "/assets/team/BNV.webp",
        description: "Visionnaire et créatif, Kheops est le moteur du Studio Voix d’Or. Depuis son enfance, il nourrit une passion pour l’audiovisuel. Aujourd’hui, il guide chaque projet avec une vision audacieuse, mêlant innovation et émotion, pour donner vie aux rêves de ses clients."
    }
];

export const TeamSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-monument text-white mb-6 uppercase">
                        L'Équipe <span className="text-transparent bg-clip-text bg-gold-gradient">Passionnée</span>
                    </h2>
                    <p className="text-white/60 font-satoshi max-w-2xl mx-auto">
                        Une famille de créateurs unis par l'amour du cinéma, de la musique et de l'innovation.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="aspect-[4/5] overflow-hidden rounded-2xl mb-6 relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-vantablack via-transparent to-transparent opacity-60 z-10"></div>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                />

                                <div className="absolute bottom-0 left-0 w-full p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-monument text-white mb-1 uppercase tracking-wide">{member.name}</h3>
                                    <p className="text-champagne-gold font-satoshi text-sm uppercase tracking-widest mb-4">{member.role}</p>
                                    <p className="text-white/70 font-satoshi text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-3">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
