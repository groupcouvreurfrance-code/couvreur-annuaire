// utils/contentRotation.ts

/**
 * Génère un contenu informatif rotatif basé sur la première lettre de la commune
 * Version étendue avec 20+ variantes pour éviter la duplication
 */
export function getRotatingContent(communeName: string) {
    const firstLetter = communeName.charAt(0).toLowerCase();

    // Hash simple pour distribuer les communes sur plus de variantes
    const charCode = communeName.charCodeAt(0) + communeName.charCodeAt(1 || 0);
    const variantNumber = (charCode % 20) + 1; // 20 variantes principales

    const variant = `variant${variantNumber}`;
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
                    content: "La charpente est l'ossature essentielle de votre toiture. Sa fixation doit être réalisée avec une précision irréprochable pour garantir la solidité de l'ensemble et assurer une évacuation optimale des eaux pluviales."
                },
                {
                    title: "Nettoyage professionnel de toiture",
                    content: `Les mousses, lichens et dépôts peuvent altérer la performance de vos tuiles. Nos couvreurs à ${communeName} assurent un nettoyage complet et sécurisé pour prolonger la vie de votre couverture.`
                },
                {
                    title: "Gestion et réparation de fuites",
                    content: "Une infiltration provenant de la toiture doit être traitée immédiatement. Nous localisons précisément la fuite et effectuons la réparation nécessaire pour stopper toute dégradation."
                }
            ]
        },

        variant2: {
            title: `Couvreur à ${communeName} – Rénovation et entretien de toiture`,
            sections: [
                {
                    title: "Travaux de restauration de toiture",
                    content: `Notre entreprise de couverture à ${communeName} intervient pour redonner toute sa solidité à votre toit. Avec le temps, les intempéries fragilisent les matériaux et rendent la toiture vulnérable.`
                },
                {
                    title: "Charpente : fixation et pose soignées",
                    content: "Élément central de votre toiture, la charpente doit être solidement fixée pour assurer la stabilité de l'ensemble et un bon écoulement des eaux pluviales."
                },
                {
                    title: "Nettoyage et démoussage de toit",
                    content: `Nos couvreurs à ${communeName} se chargent du nettoyage de vos tuiles, éliminant mousses et lichens. Un entretien régulier préserve l'étanchéité de votre couverture.`
                },
                {
                    title: "Réparation de fuites et infiltrations",
                    content: "Une fuite de toiture doit être traitée immédiatement. Nos experts localisent l'origine du problème et réalisent les réparations nécessaires."
                }
            ]
        },

        variant3: {
            title: `Réfection de toiture à ${communeName} - Expert en couverture`,
            sections: [
                {
                    title: "Spécialiste de la réfection de toiture",
                    content: `Notre équipe de couvreurs à ${communeName} maîtrise tous les aspects de la réfection. Ne laissez pas les petits problèmes s'aggraver et devenir coûteux.`
                },
                {
                    title: "Installation d'ardoises naturelles",
                    content: "L'ardoise reste un matériau prisé alliant élégance et durabilité. Nous vous conseillons sur la pose et l'entretien selon votre région et vos besoins."
                },
                {
                    title: "Entretien sécurisé de toiture",
                    content: "Grimper sur un toit présente des risques. Nos professionnels se chargent du nettoyage et de l'entretien en toute sécurité pour préserver votre habitation."
                },
                {
                    title: "Isolation thermique par l'extérieur",
                    content: "L'isolation extérieure améliore les performances énergétiques. Nous étudions vos besoins et proposons la solution la plus adaptée à votre projet."
                }
            ]
        },

        variant4: {
            title: `Services de couverture à ${communeName} - Artisan qualifié`,
            sections: [
                {
                    title: "Maîtrise des techniques traditionnelles",
                    content: `Notre savoir-faire à ${communeName} s'appuie sur les techniques traditionnelles de couverture, adaptées aux spécificités architecturales locales et aux contraintes climatiques.`
                },
                {
                    title: "Rénovation de charpentes anciennes",
                    content: "Les charpentes anciennes nécessitent une approche particulière. Nous préservons le caractère authentique tout en renforçant la structure selon les normes actuelles."
                },
                {
                    title: "Traitement préventif des matériaux",
                    content: "La prévention reste la meilleure protection. Nous appliquons des traitements adaptés pour protéger vos matériaux contre les intempéries et le vieillissement."
                },
                {
                    title: "Solutions sur mesure",
                    content: "Chaque toiture est unique. Nous concevons des solutions personnalisées en fonction de l'architecture, du budget et des contraintes techniques spécifiques."
                }
            ]
        },

        variant5: {
            title: `Entreprise de toiture à ${communeName} - Travaux garantis`,
            sections: [
                {
                    title: "Expertise en toitures complexes",
                    content: `Toitures à forte pente, architecture atypique, contraintes urbanistiques : notre équipe à ${communeName} maîtrise les projets les plus exigeants avec professionnalisme.`
                },
                {
                    title: "Installation de systèmes d'évacuation",
                    content: "Une évacuation efficace des eaux pluviales protège votre bâtiment. Nous dimensionnons et installons gouttières et descentes selon les règles de l'art."
                },
                {
                    title: "Maintenance préventive",
                    content: "Un entretien régulier évite les réparations coûteuses. Nous proposons des contrats de maintenance adaptés à votre toiture et à votre budget."
                },
                {
                    title: "Conseil en matériaux durables",
                    content: "Le choix des matériaux influence la longévité de votre toiture. Nous vous orientons vers les solutions les plus durables selon votre environnement."
                }
            ]
        },

        variant6: {
            title: `Couvreur zingueur à ${communeName} - Expertise métallique`,
            sections: [
                {
                    title: "Spécialisation en zinguerie fine",
                    content: `La zinguerie demande une précision d'orfèvre. Nos artisans à ${communeName} façonnent et posent tous éléments métalliques avec la minutie requise pour une étanchéité parfaite.`
                },
                {
                    title: "Restauration de toitures zinc",
                    content: "Le zinc offre une durabilité exceptionnelle mais nécessite un savoir-faire spécifique. Nous restaurons et modernisons vos couvertures zinc selon les techniques ancestrales."
                },
                {
                    title: "Création d'éléments décoratifs",
                    content: "Au-delà de la fonction, nous créons des éléments décoratifs en zinc : épis de faîtage, girouettes, habillages de cheminées pour personnaliser votre toiture."
                },
                {
                    title: "Étanchéité haute performance",
                    content: "Les raccords et joints sont cruciaux pour l'étanchéité. Nous maîtrisons toutes les techniques d'assemblage pour une protection optimale contre les infiltrations."
                }
            ]
        },

        variant7: {
            title: `Réparation de toiture à ${communeName} - Intervention rapide`,
            sections: [
                {
                    title: "Diagnostic précis des désordres",
                    content: `Face à un problème de toiture à ${communeName}, nous établissons un diagnostic complet pour identifier les causes et proposer la solution la plus adaptée et économique.`
                },
                {
                    title: "Réparations d'urgence 24h/24",
                    content: "Tempête, grêle, accident : nous intervenons en urgence pour sécuriser votre toiture et éviter l'aggravation des dégâts en attendant la réparation définitive."
                },
                {
                    title: "Remise en conformité",
                    content: "Les normes évoluent. Nous mettons votre toiture aux normes actuelles en matière de sécurité, d'isolation et de performance énergétique."
                },
                {
                    title: "Garantie décennale",
                    content: "Tous nos travaux sont couverts par la garantie décennale. Cette protection vous assure la tranquillité d'esprit sur la qualité et la durabilité de nos interventions."
                }
            ]
        },

        variant8: {
            title: `Installation de toiture à ${communeName} - Neuf et rénovation`,
            sections: [
                {
                    title: "Pose de couvertures neuves",
                    content: `Pour votre construction neuve à ${communeName}, nous installons tous types de couvertures : tuiles, ardoises, zinc, bac acier selon vos goûts et contraintes budgétaires.`
                },
                {
                    title: "Optimisation énergétique",
                    content: "Une toiture moderne contribue aux performances énergétiques. Nous intégrons isolation, ventilation et étanchéité pour un confort optimal été comme hiver."
                },
                {
                    title: "Respect des délais",
                    content: "Nous nous engageons sur des délais réalistes et les respectons. Notre organisation rigoureuse évite les retards et vous permet de planifier sereinement votre projet."
                },
                {
                    title: "Finitions soignées",
                    content: "Les détails font la différence. Nous apportons un soin particulier aux finitions : rives, faîtages, raccords pour un résultat esthétique et durable."
                }
            ]
        },

        variant9: {
            title: `Couverture traditionnelle à ${communeName} - Savoir-faire artisanal`,
            sections: [
                {
                    title: "Préservation du patrimoine bâti",
                    content: `Les techniques traditionnelles de couverture font partie du patrimoine. À ${communeName}, nous perpétuons ces savoir-faire tout en les adaptant aux exigences contemporaines.`
                },
                {
                    title: "Matériaux authentiques",
                    content: "Nous sélectionnons des matériaux de qualité respectant l'authenticité de votre bâtiment : tuiles plates, ardoises naturelles, zinc traditionnel."
                },
                {
                    title: "Formation continue",
                    content: "Nos équipes se forment régulièrement aux évolutions techniques et réglementaires pour vous offrir des prestations conformes aux standards actuels."
                },
                {
                    title: "Conseil personnalisé",
                    content: "Chaque projet mérite une approche personnalisée. Nous vous accompagnons dans vos choix techniques et esthétiques selon vos contraintes et envies."
                }
            ]
        },

        variant10: {
            title: `Étanchéité toiture à ${communeName} - Protection optimale`,
            sections: [
                {
                    title: "Systèmes d'étanchéité modernes",
                    content: `L'étanchéité évolue avec les technologies. À ${communeName}, nous maîtrisons les systèmes les plus performants : membranes, SEL, végétalisation pour tous types de toitures.`
                },
                {
                    title: "Toitures terrasses accessibles",
                    content: "Les toitures terrasses offrent un espace de vie supplémentaire. Nous réalisons l'étanchéité permettant un usage sécurisé : terrasse, jardin, parking."
                },
                {
                    title: "Isolation thermique intégrée",
                    content: "L'étanchéité et l'isolation forment un ensemble cohérent. Nous optimisons ces deux fonctions pour maximiser les performances énergétiques de votre bâtiment."
                },
                {
                    title: "Contrôle qualité rigoureux",
                    content: "L'étanchéité ne tolère aucun défaut. Nous effectuons des contrôles stricts à chaque étape pour garantir une protection parfaite contre les infiltrations."
                }
            ]
        },

        variant11: {
            title: `Charpente couverture à ${communeName} - Structure et protection`,
            sections: [
                {
                    title: "Conception de charpentes sur mesure",
                    content: `Chaque charpente est unique. À ${communeName}, nous concevons et réalisons des structures adaptées à votre architecture, optimisant portées et charges selon les contraintes du site.`
                },
                {
                    title: "Traitement du bois de charpente",
                    content: "Le bois nécessite une protection adaptée. Nous appliquons les traitements préventifs et curatifs selon l'essence utilisée et l'exposition de la charpente."
                },
                {
                    title: "Renforcement de structures",
                    content: "Les charpentes anciennes peuvent nécessiter un renforcement. Nous évaluons la structure existante et proposons les solutions de consolidation appropriées."
                },
                {
                    title: "Innovation et tradition",
                    content: "Nous concilions techniques traditionnelles et innovations modernes pour créer des charpentes alliant authenticité, performance et durabilité."
                }
            ]
        },

        variant12: {
            title: `Toiture écologique à ${communeName} - Solutions durables`,
            sections: [
                {
                    title: "Matériaux écologiques",
                    content: `Le choix de matériaux écologiques contribue au respect de l'environnement. À ${communeName}, nous proposons des solutions durables : tuiles recyclées, isolants biosourcés.`
                },
                {
                    title: "Toitures végétalisées",
                    content: "La végétalisation apporte isolation, biodiversité et gestion des eaux pluviales. Nous concevons des toitures vertes adaptées au climat local et à vos objectifs."
                },
                {
                    title: "Récupération d'eau de pluie",
                    content: "Valorisez l'eau de pluie avec nos systèmes de récupération intégrés. Nous dimensionnons et installons les équipements selon vos besoins d'usage."
                },
                {
                    title: "Performance énergétique",
                    content: "Une toiture performante réduit les consommations énergétiques. Nous optimisons isolation, étanchéité et ventilation pour un bâtiment économe."
                }
            ]
        },

        variant13: {
            title: `Dépannage toiture à ${communeName} - Service d'urgence`,
            sections: [
                {
                    title: "Intervention d'urgence rapide",
                    content: `Face à une urgence toiture à ${communeName}, nous intervenons rapidement pour limiter les dégâts et sécuriser votre habitation en attendant la réparation définitive.`
                },
                {
                    title: "Bâchage et mise en sécurité",
                    content: "En cas de dégâts importants, nous installons des bâches de protection étanches pour protéger l'intérieur de votre maison contre les intempéries."
                },
                {
                    title: "Évaluation des dommages",
                    content: "Nous évaluons l'étendue des dégâts pour établir un plan de réparation prioritaire et vous accompagner dans vos démarches d'assurance."
                },
                {
                    title: "Réparations provisoires",
                    content: "Nous effectuons les réparations provisoires nécessaires pour maintenir l'étanchéité en attendant les réparations définitives selon vos contraintes de planning."
                }
            ]
        },

        variant14: {
            title: `Isolation toiture à ${communeName} - Confort thermique`,
            sections: [
                {
                    title: "Isolation par l'extérieur performante",
                    content: `L'isolation par l'extérieur préserve l'espace habitable. À ${communeName}, nous maîtrisons les techniques d'isolation continue pour éliminer les ponts thermiques.`
                },
                {
                    title: "Choix des isolants adaptés",
                    content: "Chaque isolant a ses propriétés. Nous vous conseillons selon vos objectifs : thermique, acoustique, écologique pour optimiser votre confort et vos économies."
                },
                {
                    title: "Ventilation et étanchéité",
                    content: "Une isolation efficace nécessite une ventilation maîtrisée. Nous concevons des systèmes complets préservant la qualité de l'air intérieur."
                },
                {
                    title: "Amélioration énergétique",
                    content: "L'isolation de toiture peut diviser par deux vos pertes thermiques. Nous vous accompagnons pour optimiser les performances énergétiques de votre logement."
                }
            ]
        },

        variant15: {
            title: `Nettoyage toiture à ${communeName} - Entretien préventif`,
            sections: [
                {
                    title: "Démoussage professionnel sécurisé",
                    content: `Le démoussage préserve l'étanchéité de votre toiture. À ${communeName}, nos équipes interviennent en sécurité pour éliminer mousses, lichens et algues durablement.`
                },
                {
                    title: "Traitement hydrofuge",
                    content: "Après nettoyage, nous appliquons un traitement hydrofuge pour protéger vos matériaux et retarder la repousse des végétaux parasites."
                },
                {
                    title: "Inspection complète",
                    content: "Le nettoyage est l'occasion d'inspecter votre toiture. Nous détectons les désordres naissants pour vous permettre d'anticiper les réparations."
                },
                {
                    title: "Planification d'entretien",
                    content: "Nous vous conseillons sur la fréquence d'entretien adaptée à votre toiture et votre environnement pour préserver sa longévité et son esthétique."
                }
            ]
        },

        variant16: {
            title: `Gouttières à ${communeName} - Évacuation des eaux`,
            sections: [
                {
                    title: "Installation de gouttières sur mesure",
                    content: `Une évacuation efficace protège votre bâtiment. À ${communeName}, nous dimensionnons et installons des systèmes de gouttières adaptés à votre toiture et aux précipitations locales.`
                },
                {
                    title: "Matériaux durables",
                    content: "Zinc, aluminium, cuivre : nous sélectionnons les matériaux selon l'esthétique souhaitée et la durabilité recherchée pour vos gouttières et descentes."
                },
                {
                    title: "Entretien et débouchage",
                    content: "Des gouttières obstruées causent des débordements. Nous assurons l'entretien régulier et le débouchage pour maintenir l'efficacité de l'évacuation."
                },
                {
                    title: "Réparation et remplacement",
                    content: "Gouttières déformées ou percées nécessitent une intervention rapide. Nous réparons ou remplaçons les éléments défaillants pour restaurer l'étanchéité."
                }
            ]
        },

        variant17: {
            title: `Velux fenêtres de toit à ${communeName} - Lumière naturelle`,
            sections: [
                {
                    title: "Pose de fenêtres de toit qualifiée",
                    content: `Gagner en luminosité améliore le confort de vie. À ${communeName}, nous installons tous types de fenêtres de toit en respectant l'étanchéité et l'isolation de votre couverture.`
                },
                {
                    title: "Choix et dimensionnement",
                    content: "Taille, matériaux, ouverture : nous vous conseillons sur le choix optimal selon l'orientation, l'usage des pièces et vos contraintes architecturales."
                },
                {
                    title: "Étanchéité renforcée",
                    content: "L'installation d'une fenêtre de toit nécessite une étanchéité parfaite. Nous maîtrisons les techniques de raccordement pour éviter toute infiltration."
                },
                {
                    title: "Accessoires et automatisation",
                    content: "Volets, stores, motorisation : nous proposons tous les accessoires pour optimiser confort, sécurité et performance énergétique de vos fenêtres de toit."
                }
            ]
        },

        variant18: {
            title: `Ardoise toiture à ${communeName} - Élégance naturelle`,
            sections: [
                {
                    title: "Pose d'ardoise traditionnelle",
                    content: `L'ardoise allie esthétique et longévité exceptionnelle. À ${communeName}, nous maîtrisons la pose traditionnelle et moderne pour valoriser votre patrimoine immobilier.`
                },
                {
                    title: "Sélection des ardoises",
                    content: "Origine, format, épaisseur : nous sélectionnons les ardoises selon l'architecture de votre bâtiment et les contraintes climatiques régionales."
                },
                {
                    title: "Techniques de fixation",
                    content: "La fixation conditionne la durabilité. Nous appliquons les techniques éprouvées : crochets, clous selon la pente et l'exposition de votre toiture."
                },
                {
                    title: "Réparation d'ardoises",
                    content: "Ardoises cassées ou glissées nécessitent un remplacement rapide. Nous intervenons pour maintenir l'étanchéité sans dénaturer l'esthétique de l'ensemble."
                }
            ]
        },

        variant19: {
            title: `Tuiles toiture à ${communeName} - Tradition et modernité`,
            sections: [
                {
                    title: "Pose de tuiles terre cuite",
                    content: `Les tuiles terre cuite offrent une large palette esthétique. À ${communeName}, nous posons tous types de tuiles en respectant les traditions locales et les innovations modernes.`
                },
                {
                    title: "Adaptation au climat local",
                    content: "Forme, couleur, système d'accrochage : nous adaptons le choix des tuiles aux contraintes climatiques et architecturales de votre région."
                },
                {
                    title: "Ventilation sous toiture",
                    content: "Une ventilation adaptée préserve la charpente et optimise les performances thermiques. Nous intégrons les systèmes de ventilation lors de la pose."
                },
                {
                    title: "Entretien et remplacement",
                    content: "Tuiles cassées ou déplacées compromettent l'étanchéité. Nous assurons l'entretien régulier et le remplacement des éléments défaillants."
                }
            ]
        },

        variant20: {
            title: `Couverture métallique à ${communeName} - Performance moderne`,
            sections: [
                {
                    title: "Installation de bacs acier",
                    content: `Le bac acier offre performance et économie. À ${communeName}, nous installons des couvertures métalliques adaptées aux bâtiments industriels, agricoles et résidentiels.`
                },
                {
                    title: "Isolation et étanchéité",
                    content: "Les couvertures métalliques nécessitent une isolation performante. Nous intégrons les systèmes d'isolation et de ventilation pour un confort optimal."
                },
                {
                    title: "Finitions et accessoires",
                    content: "Faîtages, rives, gouttières intégrées : nous soignons les finitions pour garantir l'étanchéité et l'esthétique de votre couverture métallique."
                },
                {
                    title: "Maintenance préventive",
                    content: "Un entretien régulier préserve les performances et la durabilité. Nous proposons des contrats de maintenance adaptés à vos couvertures métalliques."
                }
            ]
        }
    };

    return contentVariants[variant] || contentVariants.variant1;
}

// Services professionnels avec plus de variantes géographiques
export function getProfessionalServices(communeName: string) {
    const charCode = communeName.charCodeAt(0) + communeName.charCodeAt(1 || 0);
    const serviceVariant = (charCode % 5) + 1;

    const serviceVariants = {
        1: {
            title: `Expertise couverture à ${communeName}`,
            subtitle: "Services professionnels certifiés",
            description: "Notre savoir-faire au service de votre patrimoine immobilier"
        },
        2: {
            title: `Solutions toiture ${communeName}`,
            subtitle: "Artisans qualifiés RGE",
            description: "Excellence technique et respect de l'environnement"
        },
        3: {
            title: `Spécialiste couverture ${communeName}`,
            subtitle: "Tradition et innovation",
            description: "Allier techniques ancestrales et technologies modernes"
        },
        4: {
            title: `Entreprise de toiture ${communeName}`,
            subtitle: "Garantie décennale",
            description: "Sécurité et pérennité de vos investissements"
        },
        5: {
            title: `Maître couvreur ${communeName}`,
            subtitle: "Compagnon du Devoir",
            description: "Excellence artisanale et transmission du savoir"
        }
    };

    const baseServices = serviceVariants[serviceVariant];

    return {
        ...baseServices,
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
                        name: `Étanchéité toiture ${communeName}`,
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
                        name: `Dépannage toiture ${communeName}`,
                        description: "Solutions d'urgence toutes intempéries"
                    }
                ]
            }
        ]
    };
}


// Fonction pour générer un texte d'introduction varié
export function getIntroText(communeName, sectionsCount) {
    const intros = [
        `Découvrez notre expertise en couverture à ${communeName}. ${sectionsCount} domaines d'intervention pour répondre à tous vos besoins de toiture.`,
        `Spécialistes de la couverture à ${communeName}, nous maîtrisons ${sectionsCount} aspects essentiels de votre toiture.`,
        `À ${communeName}, notre savoir-faire couvre ${sectionsCount} spécialités de la couverture pour votre tranquillité.`,
        `Professionnels de la toiture à ${communeName} : ${sectionsCount} services spécialisés pour protéger votre habitat.`,
        `Excellence en couverture à ${communeName}. ${sectionsCount} domaines d'expertise au service de votre patrimoine.`,
        `Notre entreprise de couverture à ${communeName} vous accompagne à travers ${sectionsCount} services complets et personnalisés.`,
        `Faites confiance à nos artisans couvreurs à ${communeName} pour ${sectionsCount} prestations de qualité supérieure.`,
        `Experts en toiture à ${communeName}, nous vous proposons ${sectionsCount} solutions adaptées à votre projet.`,
        `Depuis ${communeName}, notre équipe intervient dans ${sectionsCount} domaines de la couverture avec professionnalisme.`,
        `Référence locale à ${communeName}, nous excellons dans ${sectionsCount} métiers de la couverture et zinguerie.`,
        `Couvreurs expérimentés à ${communeName}, nous couvrons ${sectionsCount} aspects de votre projet de toiture.`,
        `Artisans passionnés à ${communeName}, découvrez nos ${sectionsCount} spécialités en couverture traditionnelle et moderne.`,
        `Votre partenaire toiture à ${communeName} pour ${sectionsCount} services techniques de haute qualité.`,
        `Implantés à ${communeName}, nous maîtrisons ${sectionsCount} techniques de couverture pour tous types de bâtiments.`,
        `Professionnels certifiés à ${communeName}, nous vous accompagnons dans ${sectionsCount} domaines de la rénovation de toiture.`
    ];

    // Combine plusieurs facteurs pour plus de diversité
    const factors = [
        communeName.length,
        communeName.charCodeAt(0),
        communeName.charCodeAt(Math.floor(communeName.length / 2)) || 0,
        communeName.charCodeAt(communeName.length - 1),
        sectionsCount
    ];

    const combinedHash = factors.reduce((acc, factor, index) => {
        return acc + (factor * (index + 1) * 17);
    }, 0);

    const selectedIndex = Math.abs(combinedHash) % intros.length;

    return intros[selectedIndex];
}


export function  getSectionIcon(title, index) {
  const iconMap = {
    'restauration': '🔨',
    'charpente': '🏗️',
    'nettoyage': '🧽',
    'fuite': '💧',
    'isolation': '🏠',
    'urgence': '🚨',
    'etancheite': '🛡️',
    'goutieres': '🌊',
    'velux': '☀️',
    'ardoise': '⚫',
    'tuile': '🔴',
    'zinc': '⚪',
    'default': '🏠'
  };

  const titleLower = title.toLowerCase();
  for (const [key, icon] of Object.entries(iconMap)) {
    if (titleLower.includes(key)) {
      return () => <span>{icon}</span>;
    }
  }

  // Icône par défaut basée sur l'index
  const defaultIcons = ['🏠', '🔨', '🛡️', '⚡'];
  return () => <span>{defaultIcons[index % defaultIcons.length]}</span>;
}

// Fonction pour générer des points clés contextuels
export function getKeyPoints(sectionTitle, index) {
  const keyPointsMap = {
    'restauration': ['Diagnostic gratuit', 'Matériaux premium', 'Finitions soignées'],
    'charpente': ['Bois traité', 'Calculs de charge', 'Normes DTU'],
    'nettoyage': ['Produits écologiques', 'Sécurité renforcée', 'Traitement longue durée'],
    'fuite': ['Intervention 24h/24', 'Détection précise', 'Réparation durable'],
    'isolation': ['Économies d\'énergie', 'Confort thermique', 'Pose certifiée'],
    'urgence': ['Disponibilité immédiate', 'Bâchage sécurisé', 'Devis transparent'],
    'default': ['Savoir-faire artisanal', 'Matériaux de qualité', 'Service personnalisé']
  };

  const titleLower = sectionTitle.toLowerCase();
  for (const [key, points] of Object.entries(keyPointsMap)) {
    if (titleLower.includes(key)) {
      return points;
    }
  }

  return keyPointsMap.default;
}

// Fonction pour générer des titres de conclusion variés
export function getConclusionTitle(communeName) {
  const titles = [
    `Votre expert couverture à ${communeName}`,
    `Partenaire de confiance à ${communeName}`,
    `Savoir-faire artisanal à ${communeName}`,
    `Excellence technique à ${communeName}`,
    `Spécialiste reconnu à ${communeName}`
  ];

  const hash = communeName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return titles[hash % titles.length];
}

export function getConclusionText(communeName, sectionsCount) {
  const conclusions = [
    `Forte de son expertise locale, notre équipe intervient rapidement à ${communeName} pour tous vos projets de couverture. Chaque intervention est réalisée selon les plus hauts standards de qualité`,
    `Choisir notre entreprise à ${communeName}, c'est opter pour un savoir-faire reconnu et une approche personnalisée de vos besoins en couverture`,
    `À ${communeName}, nous conjuguons tradition artisanale et techniques modernes pour des réalisations durables et esthétiques`,
    `Notre implantation à ${communeName} nous permet d'intervenir rapidement et de vous accompagner dans la durée pour l'entretien de votre toiture`,
    `Professionnels agréés à ${communeName}, nous vous garantissons des travaux conformes aux normes en vigueur et à vos attentes`
  ];

  const hash = communeName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return conclusions[hash % conclusions.length];
}