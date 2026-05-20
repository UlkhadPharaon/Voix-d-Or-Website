export const COLORS = {
    obsidian: '#050505',
    gold: '#D4AF37',
    charcoal: '#1A1A1A',
    white: '#FFFFFF',
    goldDim: 'rgba(212, 175, 55, 0.1)',
};

export const ASSETS = {
    logo: "./logo.png",
    logoFallback: "https://placehold.co/150x150/050505/D4AF37/png?text=UP+LOGO"
};

export const NAV_LINKS = [
    { name: "Le Choix de l'Exception", href: "#distinction" },
    { name: "La Signature", href: "#offer" },
    { name: "Collection Privée", href: "#vault" },
    { name: "Échos", href: "#testimonials" },
    { name: "Audit Stratégique", href: "#audit" },
];

export const CONTENT = {
    hero: {
        title: "LE CINEMATIC LAUNCH™",
        subtitle: "Ne lancez pas un produit. Déclenchez un mouvement.",
        description: "Une stratégie d'hybridation absolue entre la production hollywoodienne et l'innovation technologique. Conçu pour les entreprises qui veulent imposer leur autorité et marquer l'inconscient de leur marché.",
        cta: "RÉVÉLER MON POTENTIEL"
    },
    distinction: {
        title: "POURQUOI LE MARCHÉ IGNORE-T-IL VOS CONCURRENTS ?",
        subtitle: "Parce que l'attention est la monnaie la plus chère au monde.",
        stats: [
            {
                id: 1,
                title: "Autorité Magnétique",
                value: "Perception",
                desc: "L'élégance ne se négocie pas, elle s'impose. Une qualité d'image médiocre détruit votre crédibilité. Nous élevons votre marque au rang d'icône."
            },
            {
                id: 2,
                title: "Emprise Sensorielle",
                value: "Émotion",
                desc: "Le cerveau humain oublie les faits, mais se souvient des émotions. Par un sound design chirurgical et une colorimétrie d'élite, nous capturons l'âme de votre audience."
            },
            {
                id: 3,
                title: "L'Héritage Numérique",
                value: "ROI",
                desc: "Ne dépensez plus dans du contenu éphémère. Bâtissez un patrimoine visuel intemporel qui travaille pour vous, jour et nuit."
            }
        ]
    },
    portfolio: [
        {
            id: 1,
            title: "ROYAL ESSENCE",
            category: "Haute Parfumerie",
            image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop",
            videoUrl: "https://www.youtube.com/embed/xyguAEQNeEg",
            client: "Maison Kébé",
            challenge: "Incarner la quintessence du luxe sahélien pour une clientèle internationale.",
            solution: "Une ode visuelle de 90s, capturant la lumière dorée du désert de Lompoul avec une grâce cinématographique.",
            result: "Une rupture de stock immédiate et une consécration critique."
        },
        {
            id: 2,
            title: "NEO DAKAR",
            category: "Couture Digitale",
            image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1000&auto=format&fit=crop",
            client: "Sow Wear",
            challenge: "Élever le streetwear au rang de pièce de collection.",
            solution: "Une fusion avant-gardiste entre tradition textile et glitch art futuriste.",
            result: "Standing ovation à la Lagos Fashion Week."
        },
        {
            id: 3,
            title: "GOLDEN LEGACY",
            category: "Architecture de Prestige",
            image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1000&auto=format&fit=crop",
            client: "Orion Properties",
            challenge: "Commercialiser l'invisible : des penthouses d'exception sur plan.",
            solution: "Une visite onirique hyper-réaliste, brouillant la frontière entre le rêve et la réalité.",
            result: "La totalité de la résidence réservée en un trimestre."
        }
    ]
};

export const MOTION = {
    fadeUp: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    },
    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }
};
