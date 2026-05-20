/**
 * 📦 servicesData.ts
 * Ce fichier centralise toutes les données textuelles et visuelles des services.
 * Structure : Chaque clé représente un service (tv, clip, prod, post, audio).
 * Chaque service contient des sections pour le Hero, l'Intro, les Caractéristiques, 
 * le Processus, le Portfolio et la FAQ.
 */

export const servicesData = {
    tv: {
        title: "Spot Publicitaire",
        subtitle: "L'impact visuel au service de votre ROI.",
        heroImage: "/assets/images/spot publicitaire horizontale.webp",
        intro: {
            title: "L'Arme de Conversion",
            content: "Votre offre exige plus qu'une simple vidéo. Elle nécessite une arme de persuasion. Nous concevons des campagnes publicitaires taillées pour capturer l'attention dans les 3 premières secondes, susciter le désir et déclencher l'acte d'achat.",
            video: "https://www.youtube.com/embed/-essNSRi49E"
        },
        target: {
            title: "Pour Qui ?",
            content: "Brands, agences, startups, organismes culturels – toute structure qui veut transmettre un message clair et impactant.",
            // 🎯 Utilisation d'une image locale ou d'un dégradé si l'image est manquante
            image: "/assets/images/Onset_image12.webp",
            video: "https://www.youtube.com/embed/m4Fuk1QV-_0"
        },
        features: {
            title: "L'intégralité d'une campagne clé en main",
            subtitle: "De l'idée au spot diffusé : chaque étape maîtrisée pour un impact maximal.",
            items: [
                {
                    icon: "FileText",
                    title: "Concept & script publicitaire",
                    description: "Nos créatifs transforment votre objectif en une idée forte et un script précis, pensé pour capter l'attention dès les premières secondes et convertir votre audience."
                },
                {
                    icon: "Image",
                    title: "Storyboard & animatique",
                    description: "Visualisez le spot avant le tournage: storyboard détaillé et animatique permettent d'optimiser rythme, cadrage et transitions pour une exécution sans surprises."
                },
                {
                    icon: "Video",
                    title: "Tournage multi-caméras",
                    description: "Captation professionnelle multi-angles (studio ou terrain) avec équipes techniques expérimentées garantissant images riches et couverture parfaite pour le montage."
                },
                {
                    icon: "Edit2",
                    title: "Direction artistique, casting, décor",
                    description: "Direction artistique sur-mesure, casting adapté et décors soignés: nous créons une esthétique distinctive qui renforce l'identité de votre marque."
                },
                {
                    icon: "Diamond",
                    title: "Motion design & VFX léger",
                    description: "Animations et effets subtils pour moderniser votre message, dynamiser les formats courts et renforcer la lisibilité des messages-clés sans surcharger l'image."
                },
                {
                    icon: "Volume2",
                    title: "Mixage audio et sound design publicitaire",
                    description: "Sound design impactant et mixage broadcast ready: voix, ambiances et musique sont calibrées pour maximiser émotion, compréhension et mémorisation."
                }
            ]
        },
        process: [
            { step: "01", title: "Brief Stratégique", description: "Objectifs, audience, KPIs." },
            { step: "02", title: "Concept Créatif", description: "Idées, scripts, validation client." },
            { step: "03", title: "Préproduction", description: "Storyboard, planning, casting, repérages." },
            { step: "04", title: "Production", description: "Tournage, son, direction artistique." },
            { step: "05", title: "Post-Production", description: "Montage, étalonnage, mix, export." }
        ],
        portfolio: [
            { title: "Pour Qui ?", category: "Brand Film", image: "https://img.youtube.com/vi/m4Fuk1QV-_0/hqdefault.jpg", videoId: "m4Fuk1QV-_0" },
            { title: "L'Arme de Conversion", category: "Commercial", image: "https://img.youtube.com/vi/-essNSRi49E/hqdefault.jpg", videoId: "-essNSRi49E" },
            { title: "Spot Publicitaire 1", category: "Commercial", image: "https://img.youtube.com/vi/Hrcecqe3rL4/hqdefault.jpg", videoId: "Hrcecqe3rL4" },
            { title: "Spot Publicitaire 2", category: "Commercial", image: "https://img.youtube.com/vi/tsIy230X3X8/hqdefault.jpg", videoId: "tsIy230X3X8" }
        ],
        faqData: [
            {
                question: "Qu'est-ce qui différencie l'offre 'Cinematic Launch' d'une publicité classique ?",
                answer: "Le Cinematic Launch n'est pas une simple annonce, c'est un événement visuel. Il est conçu pour élever instantanément la perception de votre marque et créer un impact psychologique profond sur votre audience cible."
            },
            {
                question: "Adaptez-vous les formats pour les différentes plateformes digitales ?",
                answer: "Oui. Chaque campagne est livrée avec un écosystème de formats taillés sur mesure pour maximiser l'engagement sur tous les réseaux sociaux, sans jamais compromettre la qualité cinématographique."
            },
            {
                question: "Comment mesurez-vous le succès visuel d'une campagne ?",
                answer: "Nous créons des visuels magnétiques. Notre objectif est de maximiser la rétention d'attention et de générer un ROI perçu immédiat par la supériorité esthétique de la campagne."
            }
        ],
        faq: "Questions Fréquentes"
    },
    clip: {
        title: "Clip Vidéo Cinématographique",
        subtitle: "L'esthétique qui forge les légendes.",
        heroImage: "/assets/images/Onset_image9.webp",
        intro: {
            title: "L'Amplificateur de Marque",
            content: "La musique s'écoute, l'artiste se vit. Nous matérialisons votre univers sonore en une claque visuelle inédite. Des scénarios profonds et une direction artistique pointue pour amplifier votre identité et dominer les plateformes.",
            video: "https://www.youtube.com/embed/Z3X0j08-Fv8"
        },
        target: {
            title: "Notre Cible",
            content: "Artistes solo, collectifs, labels, beatmakers cherchant une image professionnelle et une visibilité maximale.",
            image: "/assets/images/Onset_image9.webp",
            video: "https://www.youtube.com/embed/ZF9VY-4xlEs"
        },
        features: {
            title: "Nos atouts créatifs pour vos clips",
            subtitle: "De l'idée brute au plan final : un processus créatif complet pour sublimer votre musique et votre image.",
            items: [
                {
                    icon: "Star",
                    title: "Concept créatif & treatment",
                    description: "Nous construisons un concept sur-mesure qui respecte votre identity artistique et parle à votre public. Le treatment fixe l'ambiance, l'arc narratif et les moments clés pour garantir un storytelling efficace."
                },
                {
                    icon: "Edit2",
                    title: "Storyboard & moodboard",
                    description: "Visualisation précise du clip avant la production : plans, transitions, couleurs et référence visuelle. Outil essentiel pour aligner l'équipe et éviter les pertes de temps sur le tournage."
                },
                {
                    icon: "Search",
                    title: "Casting & direction artistique",
                    description: "Sélection professionnelle des talents (acteurs, figurants, danseurs) et direction artistique cohérente pour une esthétique forte et fidèle à votre univers musical."
                },
                {
                    icon: "Video",
                    title: "Tournage (studio & extérieur)",
                    description: "Captation technique et artistique : multicam, éclairage cinéma, prise de son si nécessaire. Tournage optimisé pour le rendu et la fluidité de post-production."
                },
                {
                    icon: "Users",
                    title: "Chorégraphie & direction d'art (si nécessaire)",
                    description: "Création et coordination des mouvements scéniques pour des performances impactantes, complétées par une direction d'art soignée pour chaque plan."
                },
                {
                    icon: "Film",
                    title: "Post-production",
                    description: "Montage rythmique, étalonnage professionnel, VFX légers et sonorisation : nous donnons au clip son rythme, son look et son énergie, prêt à vivre sur toutes les plateformes."
                }
            ]
        },
        process: [
            { step: "01", title: "Session Créative", description: "Comprendre votre univers et le morceau." },
            { step: "02", title: "Préprod Pro", description: "Organisation, repérages, casting." },
            { step: "03", title: "Jour J", description: "Tournage cinéma, mise en lumière." },
            { step: "04", title: "Post & Release", description: "Montage, VFX, étalonnage." }
        ],
        portfolio: [
            {
                title: "Culu - Yvi",
                category: "Music Video",
                image: "https://img.youtube.com/vi/L5R2RfzMSvY/hqdefault.jpg",
                videoId: "L5R2RfzMSvY",
                description: "Clip hautement travaillé autour d'un étalonnage traditionnel et d'une mise en scène chorégraphiée. Nous avons mis l'accent sur la texture des couleurs et le placement scénique pour renforcer l'identité visuelle de l'artiste.",
                quote: "Le clip de Culu a redéfini mon image. L'équipe a su créer une atmosphère visuelle fidèle à la chanson. Résultat : engagement fort et retours presse immédiats."
            },
            {
                title: "Berriz Barton - Kawren",
                category: "Music Video",
                image: "https://img.youtube.com/vi/kzamhUUfrlM/hqdefault.jpg",
                videoId: "kzamhUUfrlM",
                description: "Épopée jazz-sahélienne immersive, fusionnant l'onirisme de la brousse et l'élégance du conservatoire. Esthétique épurée dominée par le blanc, jeux de surimpressions poétiques et chorégraphie organique pour une redéfinition cinématographique de la musique de terroir.",
                quote: "Un déploiement technique qui réconcilie performance instrumentale brute et post-production atmosphérique. Direction de la photographie contemplative, étalonnage texturé et langage visuel métissé : un standard de production qui propulse le patrimoine culturel burkinabè dans une dimension avant-gardiste et globale."
            },
            {
                title: "Fo Mii Mam Bii - Gareth Lafia",
                category: "Music Video",
                image: "https://img.youtube.com/vi/fkdxzegfuk4/hqdefault.jpg",
                videoId: "fkdxzegfuk4",
                description: "Clip rap / trap percutant, coupe nerveuse et esthétique drill, enrichi de VFX rythmiques pour amplifier l'impact visuel. Un montage millimétré pour soutenir l'intensité du morceau."
            }
        ],
        faqData: [
            {
                question: "Quel est le budget moyen pour un clip ?",
                answer: "Le budget dépend du concept (tournage simple vs production complexe), du nombre de jours de tournage, du casting, des VFX et de la post-prod. Nous proposons des packs (Essentiel / Pro / Prestige) et des devis personnalisés après brief. Lors du premier échange, nous fournissons trois scénarios budgétaires (économie, standard, premium) pour cadrer vos ambitions."
            },
            {
                question: "Quels sont les délais de production et de livraison ?",
                answer: "Pour un clip standard : 1–2 jours de tournage + 7–14 jours de post-production. Pour un projet avec VFX, chorégraphie ou multi-locations, le délai peut aller de 3 à 6 semaines. Un planning détaillé est fourni dès la validation du brief avec points de validation à chaque étape."
            },
            {
                question: "À qui appartiennent les droits du clip finalisé ?",
                answer: "Les droits sont définis contractuellement : généralement vous obtenez la cession des droits d'exploitation (terrains et durées précisés) à la réception du paiement final. Nous livrons les masters (ProRes/DNxHR), versions pour réseaux, sous-titres si nécessaire et assets marketing. Des options de licences étendues sont disponibles sur demande."
            }
        ],
        faq: "Questions fréquentes — Clips vidéo"
    },
    prod: {
        title: "Production vidéo sur-mesure",
        subtitle: "Du film corporate au documentaire : raconter votre histoire avec puissance.",
        heroImage: "/assets/images/Onset_image12.webp",
        intro: {
            title: "Que faisons nous?",
            content: "Vidéo stratégique et émotionnelle pour institutions, marques et projets culturels — pensée pour créer de l'impact, de la notoriété et de l'engagement."
        },
        target: {
            title: "Nos offres — solutions adaptées à chaque besoin",
            content: "Film corporate & institutional, Brand films & storytelling marque, Vidéos événementielles & captation live, Documentaires courts & séries web, Vidéo formation & motion design explicatif.",
            image: "/assets/images/Onset_image12.webp"
        },
        features: {
            title: "Production vidéo — raconter pour impacter",
            subtitle: "Stratégie, captation et post-production : des films pensés pour toucher, convaincre et convertir.",
            items: [
                {
                    icon: "Edit2",
                    title: "Recherche & écriture documentaire",
                    description: "Recherche terrain et écriture rigoureuse : nous construisons des narrations factuelles et humaines, basées sur des interviews, archives et données, pour produire des films qui informent et émeuvent."
                },
                {
                    icon: "Video",
                    title: "Tournage multicam, drones",
                    description: "Captation professionnelle multi-caméras et prises aériennes par drone pour des images dynamiques et complètes — parfait pour charpenter le récit et offrir des plans d'ouverture spectaculaires."
                },
                {
                    icon: "Volume2",
                    title: "Éclairage cinéma, prise de son pro",
                    description: "Mise en lumière cinéma et prise de son professionnelle (micro HF, perche, ambiances) pour une qualité image/son irréprochable et une immersion totale du spectateur."
                },
                {
                    icon: "Film",
                    title: "Post-production",
                    description: "Montage narratif, étalonnage, VFX légers, motion design et mixage final : nous affinons le récit jusqu'à la finition broadcast-ready, disponible en masters 4K et versions multiformats."
                }
            ]
        },
        process: [
            { step: "01", title: "Discovery & objectifs", description: "Définir le message, audience et KPIs." },
            { step: "02", title: "Scénario & préproduction", description: "Écriture, planning, autorisations." },
            { step: "03", title: "Production", description: "Équipe dédiée, respect du planning." },
            { step: "04", title: "Post-production", description: "Montage narratif, sound design, étalonnage." },
            { step: "05", title: "Validation", description: "Versions, révisions codifiées." },
            { step: "06", title: "Diffusion", description: "Masters, déclinaisons, conseil distribution." }
        ],
        portfolio: [
            {
                title: "Campagne Institutionnelle",
                category: "Film Corporate",
                image: "/assets/images/Onset_image12.webp",
                description: "Racontez votre mission avec clarté et autorité — films corporate pour investisseurs, partenaires et communication interne.",
                quote: "Le film corporate livré par Voix d’Or a transformé notre communication institutionnelle. Recherche solide, tournage discret sur le terrain et montage émotionnel : un vrai levier pour nos campagnes"
            },
            {
                title: "Appel à Financements",
                category: "Documentaire",
                image: "/assets/images/Onset_image12.webp",
                description: "Épisodes structurés et documentaires courts : recherche, terrain, écriture et post-prod pour des formats narratifs forts.",
                quote: "Captation multicam et prises drone impeccables. Le rendu final a renforcé notre crédibilité auprès des partenaires et a servi nos documents d’appel à financements."
            },
            {
                title: "Formation Interne",
                category: "Pédagogie",
                image: "/assets/images/Onset_image12.webp",
                description: "Modules pédagogiques et animations explicatives : clarté, structure et design pour accélérer l’apprentissage et l’adhésion.",
                quote: "Film interne et vidéos de formation livrés avec une clarté pédagogique remarquable. L’équipe a su traduire notre besoin en contenus efficaces et utilisables dès la première diffusion."
            }
        ],
        faqData: [
            {
                question: "Quel est le processus de production ?",
                answer: "Après brief, nous menons une phase de discovery : repérages, casting si besoin, écriture/traitement du script, planning et budget détaillé. Un calendrier avec jalons de validation est fourni avant tout tournage."
            },
            {
                question: "Tournez-vous à l'international ou en régions éloignées ?",
                answer: "Oui. Nous mobilisons notre réseau de techniciens et partenaires locaux, ou envoyons notre équipe selon le brief. Dans tous les cas, la chaîne qualité et le cahier des charges restent supervisés par Voix d’Or."
            },
            {
                question: "Quels sont les livrables finaux ?",
                answer: "Masters 4K (ProRes/DNxHR), versions H.264/H.265 pour web, teasers (15/30s), extraits pour réseaux (vertical/horizontal), fichiers audio stems et un guide de diffusion si demandé."
            }
        ],
        faq: "Questions fréquentes — Production vidéo"
    },
    post: {
        title: "Post-Production",
        subtitle: "Montage, Étalonnage & VFX",
        heroImage: "/assets/images/Post production Horizontale 1.webp",
        intro: {
            title: "La Précision Absolue",
            content: "Du montage à la livraison broadcast : précision technique, esthétique cinéma et impact émotionnel."
        },
        target: {
            title: "Services Clés",
            content: "Montage narratif, Étalonnage, VFX, Motion Design, Sound Design, DCP.",
            image: "/assets/images/Post production Horizontale 1.webp"
        },
        process: [
            { step: "01", title: "Réception", description: "Analyse des rushes, backup." },
            { step: "02", title: "Rough Cut", description: "Montage structurel." },
            { step: "03", title: "Fine Cut", description: "Peaufinage, VFX." },
            { step: "04", title: "Étalonnage", description: "Look définitif, grading." },
            { step: "05", title: "Sound & Delivery", description: "Mix, mastering, export." }
        ],
        portfolio: [
            { title: "Pro Aride", category: "SNV", image: "/assets/images/Post production Horizontale 1.webp" },
            { title: "Pro Pel", category: "Save Children", image: "/assets/images/Post production Horizontale 1.webp" }
        ],
        faq: "Sublimer mes images"
    },
    audio: {
        title: "Pôle Audio & Composition",
        subtitle: "La fréquence de l'excellence.",
        heroImage: "/assets/images/Audio verticale.webp",
        intro: {
            title: "Le Sanctuaire Acoustique",
            content: "Un sanctuaire acoustique où le silence devient or. De l'enregistrement haute fidélité à la composition de bandes originales sur-mesure, nous donnons une dimension épique à vos projets musicaux et cinématographiques."
        },
        target: {
            title: "Nos Offres Premium",
            content: "Artistes, Producteurs, Réalisateurs, Orchestres.",
            image: "/assets/images/Audio verticale.webp"
        },
        process: [
            { step: "01", title: "Prise de Son", description: "Microphones Neumann/Telefunken, acoustique traitée." },
            { step: "02", title: "Mixage", description: "Équilibre, dynamique, espace, clarté." },
            { step: "03", title: "Mastering", description: "Normes loudness, chaleur analogique." },
            { step: "04", title: "Composition", description: "Musique de film, B.O., instrumentales sur mesure." }
        ],
        pricing: [
            { title: "Mixtapes (Mix & Master)", price: "30.000F", duration: "1 Semaine" },
            { title: "Programme Complet (Beat, Voix, Mix)", price: "90.000F", duration: "3 Semaines" },
            { title: "Enregistrement Live Orchestres", price: "150.000F", duration: "1 Mois" },
            { title: "Prise de Voix Seule", price: "15.000F", duration: "1 Journée" },
            { title: "Création d'Instrumentale (Beat)", price: "45.000F", duration: "4 Jours" },
            { title: "Location du Studio (L'ABA)", price: "10.000F", duration: "1 Heure" }
        ],
        portfolio: [
            { title: "B.O. Film 'L'Orage'", category: "Film Score", image: "/assets/images/Onset_image12.webp" },
            { title: "Album 'Roots'", category: "Mix & Master", image: "/assets/images/Onset_image12.webp" }
        ],
        faq: "Réserver une session studio"
    }
};
