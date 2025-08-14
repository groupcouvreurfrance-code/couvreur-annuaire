// utils/contentRotation.ts

/**
 * Génère un contenu informatif rotatif basé sur la première lettre de la commune
 */
export function getRotatingContent(communeName: string) {
    const firstLetter = communeName.charAt(0).toLowerCase();

    // Mapping des lettres aux variantes de contenu
    const contentMapping = {
        'a': 'variant1',
        'b': 'variant2',
        'c': 'variant3',
        'd': 'variant1',
        'e': 'variant2',
        'f': 'variant3',
        'g': 'variant1',
        'h': 'variant2',
        'i': 'variant3',
        'j': 'variant1',
        'k': 'variant2',
        'l': 'variant3',
        'm': 'variant1',
        'n': 'variant2',
        'o': 'variant3',
        'p': 'variant1',
        'q': 'variant2',
        'r': 'variant3',
        's': 'variant1',
        't': 'variant2',
        'u': 'variant3',
        'v': 'variant1',
        'w': 'variant2',
        'x': 'variant3',
        'y': 'variant1',
        'z': 'variant2'
    };

    const variant = contentMapping[firstLetter] || 'variant1';
    return getContentByVariant(variant, communeName);
}

function getContentByVariant(variant: string, communeName: string) {
    const contentVariants = {
        variant1: {
            title: `Travaux de couverture et rénovation de toiture à ${communeName}`,
            sections: [
                {
                    title: "Restaurer votre couverture de toit",
                    content: `Confiez la restauration de votre toiture à notre entreprise de couvreurs professionnels à ${communeName}. Réparer ou remplacer un revêtement endommagé demande des compétences spécifiques et un savoir-faire technique. Nous intervenons rapidement afin d'éviter que les petits défauts ne se transforment en problèmes majeurs, coûteux et complexes à traiter.`
                },
                {
                    title: "Fixation et pose de charpente",
                    content: "La charpente est l'ossature essentielle de votre toiture. Sa fixation doit être réalisée avec une précision irréprochable pour garantir la solidité de l'ensemble et assurer une évacuation optimale des eaux pluviales. Un bon système d'écoulement permet de préserver vos murs extérieurs de toute trace d'humidité et de salissure."
                },
                {
                    title: "Nettoyage professionnel de toiture",
                    content: `Les mousses, lichens et dépôts peuvent altérer la performance et l'esthétique de vos tuiles. Monter sur votre toit pour les nettoyer présente des risques importants. Nos couvreurs à ${communeName} assurent un nettoyage complet, sécurisé et durable pour prolonger la vie de votre couverture.`
                },
                {
                    title: "Gestion et réparation de fuites de toit",
                    content: "Une infiltration provenant de la toiture doit être traitée immédiatement. Elle peut endommager murs, plafonds et isolations tout en favorisant l'apparition d'humidité à l'intérieur de votre maison. Nous localisons précisément la fuite et effectuons la réparation nécessaire pour stopper toute dégradation."
                },
                {
                    title: "Installation et conseil pour fenêtres de toit",
                    content: "Notre expertise couvre également la pose de fenêtres de toit. Nous vous accompagnons dans le choix du modèle adapté à vos besoins en luminosité, isolation et esthétique. Chaque installation est réalisée selon les normes de sécurité et de performance en vigueur."
                },
                {
                    title: "Intervention rapide sur travaux urgents",
                    content: `En cas de dommages nécessitant une intervention immédiate, nos couvreurs à ${communeName} se mobilisent rapidement. Leur savoir-faire et leur expérience garantissent une remise en état efficace, quel que soit le type de revêtement ou la complexité du chantier.`
                },
                {
                    title: "Demander un devis personnalisé",
                    content: "Nous établissons des devis clairs, détaillés et adaptés à vos besoins. Chaque projet est étudié avec précision afin de vous proposer la meilleure solution technique et budgétaire, le tout dans des délais courts pour vous permettre de planifier sereinement vos travaux."
                }
            ]
        },

        variant2: {
            title: `Couvreur à ${communeName} – Rénovation, réparation et entretien de toiture`,
            sections: [
                {
                    title: "Travaux de restauration de toiture",
                    content: `Notre entreprise de couverture à ${communeName} intervient pour redonner toute sa solidité et son esthétique à votre toit. Avec le temps, les intempéries fragilisent les matériaux et rendent la toiture vulnérable. Nous procédons à une restauration complète ou partielle afin d'éviter toute infiltration ou dégradation structurelle.`
                },
                {
                    title: "Charpente : fixation et pose soignées",
                    content: "Élément central de votre toiture, la charpente doit être solidement fixée pour assurer la stabilité de l'ensemble et un bon écoulement des eaux pluviales. Nous garantissons une pose précise et durable, afin que vos murs restent secs et exempts de salissures."
                },
                {
                    title: "Nettoyage et démoussage de toit",
                    content: `Ne prenez pas de risques inutiles en montant sur votre toit. Nos couvreurs à ${communeName} se chargent du nettoyage de vos tuiles ou ardoises, éliminant mousses, lichens et salissures. Un entretien régulier préserve l'étanchéité et la longévité de votre couverture.`
                },
                {
                    title: "Réparation de fuites et infiltrations",
                    content: "Une fuite de toiture doit être traitée immédiatement. Nos experts localisent précisément l'origine du problème et réalisent les réparations nécessaires pour protéger votre maison contre l'humidité et les dégâts intérieurs."
                },
                {
                    title: "Pose et remplacement de fenêtres de toit",
                    content: "Gagnez en luminosité et en confort avec nos solutions sur mesure. Nous installons et remplaçons vos fenêtres de toit dans le respect des normes, en vous conseillant sur les modèles les mieux adaptés à votre habitation."
                },
                {
                    title: "Interventions rapides en urgence",
                    content: `Tuiles arrachées, infiltration soudaine, tempête… notre équipe de couvreurs à ${communeName} intervient rapidement pour sécuriser votre toiture et éviter toute aggravation des dégâts.`
                },
                {
                    title: "Devis gratuit et personnalisé",
                    content: "Chaque projet est unique. Nous vous remettons un devis détaillé et adapté à vos besoins, en tenant compte de vos contraintes techniques et budgétaires."
                }
            ]
        },

        variant3: {
            title: `Réfection de toiture à ${communeName}`,
            sections: [
                {
                    title: "Pour tous vos travaux de réfection de toiture",
                    content: `Notre entreprise de couvreurs à ${communeName} est votre partenaire de confiance. Ne laissez pas les petits problèmes s'aggraver : même de légers dommages peuvent rapidement entraîner des dégâts plus importants et coûteux.`
                },
                {
                    title: "Pourquoi opter pour un toit en ardoises ?",
                    content: "L'ardoise reste un matériau prisé pour les toitures, alliant élégance et durabilité. Selon votre région, elle peut être un choix traditionnel ou purement esthétique. Si vous souhaitez en savoir plus sur la pose et l'entretien des toits en ardoises, notre équipe est à votre disposition pour vous conseiller sur votre projet."
                },
                {
                    title: "Nettoyage et entretien de toiture",
                    content: "Grimper sur un toit pour le nettoyer peut être dangereux. Nos couvreurs professionnels se chargent du nettoyage de vos tuiles et de l'entretien de votre toiture, en toute sécurité et avec efficacité, pour que votre maison conserve son aspect et sa durabilité."
                },
                {
                    title: "Isolation de toit par l'extérieur",
                    content: "L'isolation extérieure est une solution performante et pratique. Elle consiste généralement en la pose de panneaux isolants entre la charpente et la couverture. Avant toute intervention, nous étudions vos besoins et vous proposons la solution la plus adaptée à votre habitation."
                },
                {
                    title: "Gouttières : prévention et réparation",
                    content: "Nos équipes interviennent rapidement pour tout problème lié aux gouttières. Formés aux techniques les plus récentes, nous assurons leur réparation ou remplacement afin d'éviter infiltrations et dommages structurels."
                },
                {
                    title: "Choisir le type de couverture idéal",
                    content: "Le choix de votre toiture dépend de nombreux critères : budget, style de votre maison et contraintes climatiques de votre région. Nos experts vous accompagnent dans la sélection du revêtement le mieux adapté à votre projet."
                },
                {
                    title: "Rénovation et réparation de tuiles cassées",
                    content: `Que ce soit pour un entretien régulier ou une urgence due à des tuiles endommagées, notre entreprise de couverture à ${communeName} intervient rapidement et efficacement, vous garantissant une toiture sécurisée et durable.`
                }
            ]
        }
    };

    return contentVariants[variant];
}

// Services professionnels améliorés
export function getProfessionalServices(communeName: string) {
    return {
        title: `Expertise couverture à ${communeName}`,
        subtitle: "Services professionnels certifiés",
        description: "Notre savoir-faire au service de votre patrimoine immobilier",
        categories: [
            {
                title: "Couverture & Rénovation",
                icon: "🏠",
                services: [
                    {
                        name: `Couvreur certifié ${communeName}`,
                        description: "Expertise technique et savoir-faire artisanal"
                    },
                    {
                        name: `Artisan couvreur ${communeName}`,
                        description: "Interventions sur mesure et finitions soignées"
                    },
                    {
                        name: `Entreprise de couverture ${communeName}`,
                        description: "Solutions complètes pour professionnels et particuliers"
                    },
                    {
                        name: `Travaux de couverture ${communeName}`,
                        description: "Installation, rénovation et maintenance"
                    }
                ]
            },
            {
                title: "Zinguerie & Étanchéité",
                icon: "⚡",
                services: [
                    {
                        name: `Travaux de zinguerie ${communeName}`,
                        description: "Fabrication et pose d'éléments sur mesure"
                    },
                    {
                        name: `Rénovation de toiture zinc ${communeName}`,
                        description: "Remise à neuf et amélioration des performances"
                    },
                    {
                        name: `Réparation de toiture zinc ${communeName}`,
                        description: "Diagnostics précis et réparations durables"
                    },
                    {
                        name: `Étanchéité toiture zinc ${communeName}`,
                        description: "Protection optimale contre les infiltrations"
                    }
                ]
            },
            {
                title: "Services d'urgence",
                icon: "🚨",
                services: [
                    {
                        name: `SOS fuite toiture ${communeName}`,
                        description: "Intervention rapide 24h/24, 7j/7"
                    },
                    {
                        name: `Isolation de toiture ${communeName}`,
                        description: "Performance énergétique et confort thermique"
                    },
                    {
                        name: `Démoussage de toiture ${communeName}`,
                        description: "Traitement préventif et protection longue durée"
                    }
                ]
            },
            {
                title: "Installation & Pose",
                icon: "🔧",
                services: [
                    {
                        name: `Pose de couverture zinc ${communeName}`,
                        description: "Installation technique et respect des normes"
                    },
                    {
                        name: `Pose de gouttière zinc ${communeName}`,
                        description: "Évacuation efficace des eaux pluviales"
                    },
                    {
                        name: `Remplacement gouttière zinc ${communeName}`,
                        description: "Renouvellement et mise aux normes"
                    },
                    {
                        name: `Réfection toiture zinc ${communeName}`,
                        description: "Rénovation complète et modernisation"
                    }
                ]
            }
        ]
    };
}