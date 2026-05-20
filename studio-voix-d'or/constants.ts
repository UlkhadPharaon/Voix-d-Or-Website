import { ServiceItem, Testimonial, FAQItem, Partner } from './types';

export const NAV_LINKS = [
  { name: 'Accueil', path: '/' },
  { name: 'Expertise', path: '/services' },
  { name: 'Studio', path: '/#studio' },
  { name: 'Contact', path: '/#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'production',
    title: 'Production Cinématographique',
    description: 'Conception et réalisation de films publicitaires et institutionnels avec une esthétique cinématographique.',
    longDescription: 'De la pré-production à la réalisation finale, nous orchestrons chaque plan avec une précision chirurgicale. Notre équipe utilise des caméras RED et ARRI pour capturer l\'essence de votre marque avec une qualité d\'image inégalée.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    features: ['Direction Artistique', 'Casting & Repérage', 'Tournage 6K/8K', 'Gestion de Projet']
  },
  {
    id: 'post-production',
    title: 'Post-Production VFX',
    description: 'Montage, étalonnage et effets visuels pour sublimer chaque image et créer des mondes immersifs.',
    longDescription: 'C\'est ici que la magie opère. Nos suites de montage et d\'étalonnage DaVinci Resolve sont équipées pour traiter les flux de travail HDR et Dolby Vision. Nos artistes VFX donnent vie à l\'impossible.',
    image: 'https://images.unsplash.com/photo-1574717024453-354056aef981?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    features: ['Montage Non-Linéaire', 'Étalonnage HDR', 'VFX & CGI', 'Motion Design']
  },
  {
    id: 'audio',
    title: 'Ingénierie Sonore',
    description: 'Sound design, mixage et mastering pour une expérience auditive aussi riche que l\'image.',
    longDescription: 'Le son représente 50% de l\'expérience. Nos studios acoustiquement traités et nos ingénieurs certifiés créent des paysages sonores profonds, du sound design subtil au mixage surround immersif.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    features: ['Sound Design', 'Mixage 5.1 / Atmos', 'Composition Originale', 'Voice Over']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'CMO',
    company: 'Luxe Horizon',
    quote: "Studio Voix d'Or a transformé notre vision en une œuvre d'art. L'esthétique visuelle est tout simplement époustouflante.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'David K.',
    role: 'Réalisateur',
    company: 'Indie Films',
    quote: "Leur expertise en colorimétrie a donné à mon film cette touche 'cinéma' que je recherchais depuis des années.",
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Elise B.',
    role: 'Brand Manager',
    company: 'TechFlow',
    quote: "Une exécution rapide sans compromis sur la qualité. Le son, l'image, tout est parfaitement synchronisé.",
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer: "Nous sommes spécialisés dans les publicités haut de gamme, les clips musicaux artistiques, les documentaires de marque et la post-production cinématographique complète."
  },
  {
    question: "Travaillez-vous à l'international ?",
    answer: "Oui, bien que basés à Paris, nous collaborons avec des clients du monde entier, notamment à Londres, New York et Lagos, grâce à nos workflows cloud sécurisés."
  },
  {
    question: "Quels sont vos délais de livraison ?",
    answer: "Cela dépend de l'ampleur du projet. Un spot publicitaire standard prend généralement 3 à 5 semaines de la pré-production à la livraison finale."
  },
  {
    question: "Fournissez-vous la musique ?",
    answer: "Absolument. Nous avons une équipe de compositeurs en interne et des partenariats pour le licensing musical afin de garantir une identité sonore unique."
  }
];

export const PARTNERS: Partner[] = [
  { name: 'Sony', logo: 'SONY' },
  { name: 'Universal', logo: 'UNIVERSAL' },
  { name: 'Vogue', logo: 'VOGUE' },
  { name: 'Tesla', logo: 'TESLA' },
  { name: 'LVMH', logo: 'LVMH' },
  { name: 'Canal+', logo: 'CANAL+' },
];
