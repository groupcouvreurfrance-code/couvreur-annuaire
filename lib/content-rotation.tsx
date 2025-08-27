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
            title: `Couvreur à ${communeName} - Tous travaux de toiture`,
            sections: [
                {
                    title: "Couverture et rénovation de toiture",
                    content: `Spécialiste de la couverture à ${communeName}, nous réalisons tous vos travaux de toiture : pose, rénovation et réparation. Notre équipe intervient sur tous types de matériaux pour assurer l'étanchéité et la solidité de votre toit.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Pose de charpente",
                    content: "La charpente est la structure qui soutient votre toiture. Nous concevons et installons des charpentes en bois traditionnelles ou industrielles, adaptées à votre projet et aux normes en vigueur.",
                    image: "/images/charpente/charpente-1.jpg"
                },
                {
                    title: "Traitement de toiture",
                    content: `Nous appliquons des traitements préventifs et curatifs pour protéger votre toiture à ${communeName}. Hydrofuge, antimousse, fongicide : ces traitements prolongent la durée de vie de votre couverture.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Nettoyage et démoussage",
                    content: "Le nettoyage régulier de votre toiture élimine mousses, lichens et salissures. Cette opération préserve l'étanchéité et l'esthétique de votre couverture tout en évitant les infiltrations.",
                    image: "/images/nettoyage/nettoyage-1.jpg"
                }
            ]
        },

        variant2: {
            title: `Travaux de toiture à ${communeName} - Artisan couvreur`,
            sections: [
                {
                    title: "Revêtement de toiture",
                    content: `Installation et remplacement de tous revêtements de toiture à ${communeName} : tuiles, ardoises, zinc, bac acier. Nous vous conseillons sur le choix du matériau selon votre budget et l'architecture de votre maison.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Étanchéité toit-terrasse",
                    content: "L'étanchéité des toits-terrasses demande une expertise particulière. Nous posons des membranes d'étanchéité adaptées pour créer une protection durable contre les infiltrations d'eau.",
                    image: "/images/couvreur/couvreur-1.jpg"
                },
                {
                    title: "Pose de Velux",
                    content: "Installation de fenêtres de toit pour apporter lumière naturelle et ventilation. Nous réalisons la découpe, la pose et l'étanchéité autour du Velux pour un résultat parfait.",
                    image: "/images/couvreur/couvreur-2.jpg"
                },
                {
                    title: "Isolation de toiture",
                    content: "L'isolation de la toiture réduit les pertes de chaleur. Nous installons des isolants performants par l'intérieur ou l'extérieur pour améliorer votre confort et réduire vos factures énergétiques.",
                    image: "/images/toiture/toiture.jpg"
                }
            ]
        },

        variant3: {
            title: `Réparation de toiture à ${communeName} - Intervention rapide`,
            sections: [
                {
                    title: "Zinguerie et évacuation des eaux",
                    content: `En tant que couvreur-zingueur à ${communeName}, nous installons et réparons gouttières, chéneaux et descentes pluviales. Ces éléments sont essentiels pour évacuer l'eau loin de vos fondations.`,
                    image: "/images/zinc/zinc-1.jpg"
                },
                {
                    title: "Réparation d'infiltrations",
                    content: "Une fuite de toiture doit être réparée rapidement pour éviter les dégâts. Nous localisons l'origine du problème et effectuons la réparation adaptée : tuiles cassées, joints défaillants, solins détériorés.",
                    image: "/images/gouttiere/gouttiere-1.jpg"
                },
                {
                    title: "Entretien préventif",
                    content: "Un entretien régulier évite les grosses réparations. Nous proposons des contrats d'entretien incluant inspection, nettoyage et petites réparations pour maintenir votre toiture en bon état.",
                    image: "/images/gouttiere/gouttiere-2.jpg"
                },
                {
                    title: "Diagnostic de toiture",
                    content: "Avant tous travaux, nous établissons un diagnostic complet de l'état de votre toiture. Cette expertise nous permet de vous proposer les solutions les plus adaptées à votre situation.",
                    image: "/images/toiture/toiture.jpg"
                }
            ]
        },

        variant4: {
            title: `Installation de toiture à ${communeName} - Neuf et rénovation`,
            sections: [
                {
                    title: "Toiture neuve complète",
                    content: `Pour vos constructions neuves à ${communeName}, nous réalisons l'ensemble : charpente, isolation, pare-vapeur, couverture et zinguerie. Un projet clé en main respectant les normes actuelles.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Rénovation de couverture",
                    content: "Remplacement partiel ou total de votre couverture ancienne. Nous conservons les éléments sains et remplaçons les parties détériorées pour redonner une seconde vie à votre toit.",
                    image: "/images/couvreur/couvreur-2.jpg"
                },
                {
                    title: "Mise aux normes",
                    content: "Les réglementations évoluent. Nous mettons votre toiture en conformité avec les normes actuelles d'isolation, de ventilation et de sécurité incendie.",
                    image: "/images/couvreur/couvreur-1.jpg"
                },
                {
                    title: "Surélévation de toiture",
                    content: "Gagner de l'espace habitable en modifiant la pente ou en créant un étage supplémentaire. Nous étudions la faisabilité et réalisons ces travaux complexes.",
                    image: "/images/charpente/charpente-1.jpg"
                }
            ]
        },

        variant5: {
            title: `Étanchéité toiture à ${communeName} - Protection garantie`,
            sections: [
                {
                    title: "Étanchéité membrane",
                    content: `Pose de membranes d'étanchéité sur toits-terrasses et toitures plates à ${communeName}. Nous utilisons des matériaux haute performance : EPDM, bitume modifié, résines liquides selon vos besoins.`,
                    image: "/images/gouttiere-1.jpg/gouttieres-2.jpg"
                },
                {
                    title: "Isolation thermique",
                    content: "L'isolation par l'extérieur (sarking) ou par l'intérieur améliore les performances énergétiques. Nous choisissons la technique selon la configuration de votre toiture.",
                    image: "/images/isolation/isolation-1.jpg"
                },
                {
                    title: "Ventilation de toiture",
                    content: "Une bonne ventilation évite la condensation et préserve la charpente. Installation d'entrées d'air en égout et de sorties en faîtage pour un renouvellement d'air optimal.",
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Écran sous-toiture",
                    content: "L'écran sous-toiture protège l'isolation et la charpente. Nous posons des écrans HPV (haute perméabilité à la vapeur) pour une protection optimale contre les infiltrations.",
                    image: "/images/toiture/toiture.jpg"
                }
            ]
        },

        variant6: {
            title: `Traitement de toiture à ${communeName} - Protection durable`,
            sections: [
                {
                    title: "Traitement hydrofuge",
                    content: `Application de produits hydrofuges sur votre toiture à ${communeName}. Ce traitement protège les matériaux contre l'humidité et prolonge leur durée de vie en évitant l'absorption d'eau.`,
                    image: "/images/nettoyage/nettoyage-2.jpg"
                },
                {
                    title: "Traitement antimousse",
                    content: "Élimination des mousses et lichens puis application d'un traitement préventif. Ce produit empêche la repousse et maintient votre toiture propre plus longtemps.",
                    image: "/images/nettoyage/nettoyage-1.jpg"
                },
                {
                    title: "Démoussage professionnel",
                    content: "Nettoyage complet de la toiture avec des produits adaptés. Nous éliminons toutes les salissures, mousses et dépôts sans endommager les matériaux de couverture.",
                    image: "/images/couvreur/couvreur-2.jpg"
                },
                {
                    title: "Protection longue durée",
                    content: "Nos traitements offrent une protection efficace pendant plusieurs années. Nous adaptons les produits selon le type de couverture et l'exposition de votre toiture.",
                    image: "/images/toiture/toiture.jpg"
                }
            ]
        },

        variant7: {
            title: `Zinguerie à ${communeName} - Évacuation des eaux`,
            sections: [
                {
                    title: "Installation de gouttières",
                    content: `Pose de gouttières en zinc, aluminium ou PVC à ${communeName}. Nous dimensionnons le système selon la surface de votre toit pour une évacuation efficace des eaux pluviales.`,
                    image: "/images/gouttiere/gouttiere-1.jpg"
                },
                {
                    title: "Chéneaux et noues",
                    content: "Réalisation de chéneaux pour toitures plates et de noues pour l'intersection des pans de toiture. Ces ouvrages en zinc assurent une étanchéité parfaite.",
                    image: "/images/gouttiere/gouttiere-2.jpg"
                },
                {
                    title: "Habillage de cheminée",
                    content: "Habillage et étanchéité autour des conduits de cheminée. Nous réalisons les solins et bavettes en zinc pour éviter toute infiltration d'eau.",
                    image: "/images/couvreur/couvreur-1.jpg"
                },
                {
                    title: "Réparation zinguerie",
                    content: "Réparation ou remplacement d'éléments de zinguerie détériorés. Nous intervenons rapidement pour maintenir l'évacuation des eaux et éviter les débordements.",
                    image: "/images/zinc/zinc-2.jpg"
                }
            ]
        },

        variant8: {
            title: `Pose de Velux à ${communeName} - Lumière naturelle`,
            sections: [
                {
                    title: "Installation fenêtre de toit",
                    content: `Pose de Velux et fenêtres de toit à ${communeName}. Nous créons l'ouverture, installons la fenêtre et réalisons l'étanchéité pour apporter lumière et ventilation à vos combles.`,
                    image: "/images/couvreur/couvreur-2.jpg"
                },
                {
                    title: "Raccordement étanche",
                    content: "Le raccordement de la fenêtre à la couverture est crucial. Nous utilisons des bavettes d'étanchéité adaptées à chaque type de couverture : tuiles, ardoises, bac acier.",
                    image: "/images/couvreur/couvreur-1.jpg"
                },
                {
                    title: "Habillage intérieur",
                    content: "Finition soignée à l'intérieur avec habillage en placo et isolation périphérique. Nous réalisons un ensemble esthétique et performant thermiquement.",
                    image: "/images/isolation/isolation-1.jpg"
                },
                {
                    title: "Volets et stores",
                    content: "Installation d'accessoires : volets roulants électriques, stores occultants ou vénitiens. Ces équipements améliorent le confort et la protection solaire.",
                    image: "/images/couvreur/couvreur-2.jpg"
                }
            ]
        },

        variant9: {
            title: `Charpente toiture à ${communeName} - Structure solide`,
            sections: [
                {
                    title: "Charpente traditionnelle",
                    content: `Conception et réalisation de charpentes en bois massif à ${communeName}. Assemblages traditionnels avec tenons, mortaises et chevilles bois pour une structure authentique et durable.`,
                    image: "/images/charpente/charpente-2.jpg"
                },
                {
                    title: "Charpente industrielle",
                    content: "Pose de charpentes à fermettes industrielles. Solution économique et rapide à mettre en œuvre, adaptée aux constructions contemporaines et aux grandes portées.",
                    image: "/images/charpente/charpente-3.jpg"
                },
                {
                    title: "Renforcement structure",
                    content: "Consolidation de charpentes anciennes par ajout de pièces de renfort. Nous préservons l'existant tout en améliorant la résistance selon les normes actuelles.",
                    image: "/images/charpente/charpente-1.jpg"
                },
                {
                    title: "Traitement du bois",
                    content: "Application de traitements préventifs et curatifs contre les insectes xylophages et champignons. Protection indispensable pour la longévité de votre charpente.",
                    image: "/images/couvreur/couvreur-1.jpg"
                }
            ]
        },

        variant10: {
            title: `Isolation toiture à ${communeName} - Confort thermique`,
            sections: [
                {
                    title: "Isolation combles perdus",
                    content: `Isolation de combles non aménageables à ${communeName} par soufflage ou déroulage d'isolant. Cette intervention simple améliore considérablement les performances énergétiques de votre maison.`,
                    image: "/images/isolation/isolation-1.jpg"
                },
                {
                    title: "Isolation rampants",
                    content: "Isolation des rampants de toiture pour combles aménagés. Nous posons l'isolant entre chevrons et sous chevrons pour une isolation continue et performante.",
                    image: "/images/isolation/isolation-2.jpg"
                },
                {
                    title: "Isolation par l'extérieur",
                    content: "Méthode sarking : isolation posée sur la charpente avant la couverture. Cette technique supprime tous les ponts thermiques et préserve l'espace habitable.",
                    image: "/images/couvreur/couvreur-1.jpg"
                },
                {
                    title: "Pare-vapeur étanchéité",
                    content: "Pose de pare-vapeur côté chauffé pour éviter la condensation dans l'isolant. Élément essentiel pour la durabilité de l'isolation et de la charpente.",
                    image: "/images/gouttiere/gouttiere-1.jpg"
                }
            ]
        },

        variant11: {
            title: `Démoussage et traitement toiture à ${communeName} - Protection longue durée`,
            sections: [
                {
                    title: "Inspection et diagnostic toiture",
                    content: `Vérification complète de l'état de votre toiture à ${communeName} : détection des mousses, lichens et algues, repérage des tuiles endommagées et contrôle des points sensibles avant tout traitement.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Nettoyage mécanique professionnel",
                    content: "Brossage et grattage manuel des mousses et lichens, nettoyage à l'eau basse pression pour préserver les matériaux. Nous utilisons également le nettoyage vapeur pour une solution écologique et efficace.",
                    image: "/images/nettoyage/nettoyage-1.jpg"
                },
                {
                    title: "Traitement anti-mousse spécialisé",
                    content: "Application de produits fongicides et algicides adaptés à votre type de couverture. Ce traitement élimine les racines microscopiques et ralentit considérablement la repousse des végétaux parasites.",
                    image: "/images/nettoyage-2.jpg"
                },
                {
                    title: "Traitement hydrofuge et finitions",
                    content: "Pulvérisation d'hydrofuge filmogène ou pénétrant après préparation complète de la surface. Protection durable qui laisse respirer le matériau tout en repoussant l'eau et les salissures.",
                    image: "/images/nettoyage/nettoyage-1.jpg"
                }
            ]
        },

        variant12: {
            title: `Isolation de toiture à ${communeName} - Performance énergétique`,
            sections: [
                {
                    title: "Diagnostic thermique et conseil",
                    content: `Évaluation des pertes de chaleur et mesure des déperditions énergétiques à ${communeName}. Nous contrôlons l'état de la charpente et vous conseillons sur la solution d'isolation la plus adaptée à votre projet.`,
                    image: "/images/isolation/isolation-1.jpg"
                },
                {
                    title: "Isolation par l'intérieur",
                    content: "Pose de laine minérale ou végétale entre ou sous les chevrons avec mise en place de pare-vapeur. Solution efficace pour l'isolation des combles aménagés et non-aménagés sans modifier l'aspect extérieur.",
                    image: "/images/isolation/isolation-2.jpg"
                },
                {
                    title: "Isolation par l'extérieur sarking",
                    content: "Technique sarking avec panneaux isolants posés sur la charpente avant la couverture. Cette méthode préserve l'espace habitable intérieur et assure une isolation continue sans ponts thermiques.",
                    image: "/images/couvreur/couvreur-1.jpg"
                },
                {
                    title: "Étanchéité et ventilation",
                    content: "Installation de pare-vapeur et système de ventilation adapté pour éviter l'humidité et la condensation. Contrôle des points singuliers et finitions pour garantir l'efficacité durable de l'isolation.",
                    image: "/images/toiture/toiture.jpg"
                }
            ]
        },

        variant13: {
            title: `Charpente de toiture à ${communeName} - Étude et rénovation`,
            sections: [
                {
                    title: "Étude et diagnostic charpente",
                    content: `Analyse complète de l'état de votre charpente à ${communeName} : vérification de la solidité, détection d'humidité, d'insectes xylophages et de champignons. Nous établissons un diagnostic précis avec préconisations adaptées à votre structure.`,
                    image: "/images/charpente/charpente-1.jpg"
                },
                {
                    title: "Pose de charpente neuve",
                    content: "Conception et montage de charpentes traditionnelles ou industrielles selon vos besoins. Respect des normes de construction et calculs de charge, avec adaptation possible pour combles aménagés et toitures spécifiques.",
                    image: "/images/charpente/charpente-2.jpg"
                },
                {
                    title: "Rénovation et renforcement",
                    content: "Remplacement ou consolidation des pièces abîmées : pannes, chevrons, solives. Nous renforçons les structures fragilisées et adaptons la charpente aux nouvelles charges ou modifications de toiture.",
                    image: "/images/charpente/charpente-3.jpg"
                },
                {
                    title: "Traitement et protection du bois",
                    content: "Traitements curatifs contre insectes xylophages et champignons, puis application de produits préventifs. Protection complète pour assurer la durabilité de votre charpente face à l'humidité et aux attaques biologiques.",
                    image: "/images/charpente/charpente-1.jpg"
                }
            ]
        },

        variant14: {
            title: `Étanchéité de toiture à ${communeName} - Toit-terrasse et incliné`,
            sections: [
                {
                    title: "Diagnostic et étude d'étanchéité",
                    content: `Analyse des points faibles de votre toiture à ${communeName} : infiltrations, fissures, joints défaillants. Vérification complète de la couverture, solins, noues et abergements avec préconisations sur la solution d'étanchéité adaptée.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Étanchéité toit-terrasses",
                    content: "Pose de membranes bitumineuses ou synthétiques (PVC, EPDM) et application d'étanchéité liquide par résines spécifiques. Possibilité d'aménagement de toitures-terrasses accessibles pour circulation ou jardin.",
                    image: "/images/nettoyage/nettoyage-1.jpg"
                },
                {
                    title: "Étanchéité toitures inclinées",
                    content: "Pose et rénovation des solins, faîtages, noues et raccords métalliques. Étanchéité spécialisée autour des fenêtres de toit, cheminées et lucarnes avec mise en place de sous-toitures pare-pluie.",
                    image: "/images/gouttiere/gouttiere-1.jpg"
                },
                {
                    title: "Réparation et entretien",
                    content: "Détection et colmatage des fuites, remplacement des éléments d'étanchéité endommagés et application de traitements hydrofuges. Contrôle régulier des joints, membranes et évacuations d'eau.",
                    image: "/images/gouttiere/gouttiere-2.jpg"
                }
            ]
        },

        variant15: {
            title: `Pose de fenêtres de toit à ${communeName} - Velux et lucarnes`,
            sections: [
                {
                    title: "Étude et conseil personnalisé",
                    content: `Analyse de la charpente et de la couverture pour définir l'emplacement optimal à ${communeName}. Choix du type d'ouverture adapté et conseils sur la luminosité, ventilation et isolation selon votre projet et le climat local.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Pose de fenêtres de toit Velux",
                    content: "Création de l'ouverture dans la toiture avec respect de la charpente. Installation de Velux manuels, électriques ou solaires avec raccordements d'étanchéité parfaits pour prévenir toute infiltration.",
                    image: "/images/isolation/isolation-1.jpg"
                },
                {
                    title: "Installation de lucarnes traditionnelles",
                    content: "Fabrication et pose de lucarnes (chien-assis, jacobine, rampante) adaptées au style de votre maison. Charpente et couverture sur mesure pour un apport de lumière naturelle et une valorisation esthétique.",
                    image: "/images/charpente/charpente-1.jpg"
                },
                {
                    title: "Rénovation et accessoires",
                    content: "Remplacement d'anciens Velux, mise à niveau des systèmes d'ouverture et amélioration de l'isolation. Pose de volets roulants, stores intérieurs et finitions complètes pour un résultat parfait.",
                    image: "/images/isolation/isolation-2.jpg"
                }
            ]
        },

        // variant16: {
        //     title: `Peinture et revêtement toiture à ${communeName} - Rénovation esthétique`,
        //     sections: [
        //         {
        //             title: "Diagnostic et étude de toiture",
        //             content: `Analyse complète de l'état de votre toiture à ${communeName} : tuiles, ardoises, bac acier ou béton. Détermination des zones nécessitant un traitement avec préconisations adaptées à l'exposition et au climat local.`,
        //             image: "diagnostic-etude-peinture-toiture.jpg"
        //         },
        //         {
        //             title: "Application peinture spécialisée",
        //             content: "Pose de peintures et revêtements spécialisés pour toiture : protection contre l'humidité, UV et mousses. Revêtements acryliques, résine ou hydrofuge coloré adaptés selon le type de matériau de votre couverture.",
        //             image: "application-peinture-revetement-toit.jpg"
        //         },
        //         {
        //             title: "Rénovation et préparation",
        //             content: "Nettoyage préalable complet pour une adhérence optimale, réparation des éléments endommagés et application de plusieurs couches si nécessaire pour une durabilité maximale de la protection.",
        //             image: "renovation-preparation-toiture.jpg"
        //         },
        //         {
        //             title: "Protection et finition esthétique",
        //             content: "Traitement hydrofuge ou imperméabilisant pour prolonger la durée de vie de votre couverture. Mise en valeur esthétique avec possibilité de revêtement coloré pour harmoniser avec l'architecture environnante.",
        //             image: "protection-finition-esthetique-toit.jpg"
        //         }
        //     ]
        // },

        variant17: {
            title: `Urgences toiture à ${communeName} - Intervention 24h/24`,
            sections: [
                {
                    title: "Diagnostic rapide d'urgence",
                    content: `Intervention immédiate à ${communeName} pour identifier les dommages : intempéries, chute d'arbres, tuiles cassées, infiltrations. Évaluation de la sécurité pour éviter tout risque supplémentaire sur votre habitation.`,
                    image: "/images/toiture/toiture.jpg"
                },
                {
                    title: "Réparation d'urgence immédiate",
                    content: "Remplacement temporaire ou définitif des éléments endommagés, colmatage des fuites et réparation des infiltrations. Réfection rapide des solins, rives et éléments de zinguerie affectés pour protéger votre logement.",
                    image: "/images/gouttiere/gouttiere-1.jpg"
                },
                {
                    title: "Protection provisoire sécurisée",
                    content: "Pose de bâches ou membranes temporaires pour sécuriser la toiture contre la pluie et les vents. Protection efficace jusqu'à l'intervention définitive pour prévenir les dégâts supplémentaires sur la structure.",
                    image: "/images/gouttiere/gouttiere-2.jpg"
                },
                {
                    title: "Suivi et réparation définitive",
                    content: "Établissement de rapport détaillé pour les assurances et coordination des démarches. Intervention complète pour rétablir l'étanchéité définitive avec conseils pour prévenir de futurs incidents.",
                    image: "/images/toiture/toiture.jpg"
                }
            ]
        }
    };
    const variants = Object.keys(contentVariants);
    const randomVariant = variants[Math.floor(Math.random() * variants.length)];
    const content = contentVariants[randomVariant];

    return content || contentVariants.variant1;
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