export const COLORS = {
  obsidian: '#050505',
  gold: '#D4AF37',
  charcoal: '#1A1A1A',
  white: '#FFFFFF',
  goldDim: 'rgba(212, 175, 55, 0.1)',
};

export const ASSETS = {
  // Remplacer par le chemin réel de votre image si différent
  logo: "./logo.png", 
  logoFallback: "https://placehold.co/150x150/050505/D4AF37/png?text=UP+LOGO"
};

export const NAV_LINKS = [
  { name: "L'Excellence", href: "#distinction" },
  { name: "La Signature", href: "#offer" },
  { name: "Collection Privée", href: "#vault" },
  { name: "Échos", href: "#testimonials" },
  { name: "Audit Précieux", href: "#audit" },
];

export const CONTENT = {
  hero: {
    title: "L'ART D'INCARNER L'EXCEPTION.",
    subtitle: "AU DELÀ DES TENDANCES.",
    description: "Nous sculptons l'héritage visuel des marques qui façonnent l'avenir. Une fusion entre le raffinement cinématographique et l'innovation digitale.",
    cta: "RÉVÉLER VOTRE POTENTIEL"
  },
  distinction: { // Renamed from Armament
    title: "L'EXCELLENCE",
    subtitle: "Pourquoi choisir l'exception ?",
    stats: [
      {
        id: 1,
        title: "Prestige Magnétique",
        value: "Perception",
        desc: "L'élégance ne se discute pas, elle se ressent. Nous élevons votre image au rang d'art."
      },
      {
        id: 2,
        title: "Immersion Sensorielle",
        value: "Émotion",
        desc: "Au-delà de la vue, nous touchons l'âme. Une expérience auditive et visuelle inoubliable."
      },
      {
        id: 3,
        title: "Héritage Digital",
        value: "Intemporel",
        desc: "Ne créez pas du contenu. Bâtissez un patrimoine de marque qui traverse le temps."
      }
    ]
  },
  portfolio: [
    {
      id: 1,
      title: "ROYAL ESSENCE",
      category: "Haute Parfumerie",
      // Luxury perfume bottle in dark lighting
      image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop", 
      client: "Maison Kébé",
      challenge: "Incarner la quintessence du luxe sahélien pour une clientèle internationale.",
      solution: "Une ode visuelle de 90s, capturant la lumière dorée du désert de Lompoul avec une grâce cinématographique.",
      result: "Une rupture de stock immédiate et une consécration critique."
    },
    {
      id: 2,
      title: "NEO DAKAR",
      category: "Couture Digitale",
      // High fashion, dark skin, artistic lighting
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
      // Modern abstract architecture, gold tones
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