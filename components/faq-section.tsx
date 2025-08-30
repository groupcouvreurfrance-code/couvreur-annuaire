"use client"
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Home, Shield, Droplets, Thermometer, Euro, AlertTriangle, MapPin, RefreshCw } from 'lucide-react';

const FAQ = () => {
    const [openItems, setOpenItems] = useState(new Set());
    const [activeCategory, setActiveCategory] = useState("");

    const faqData = {
        "Entretien et réparation": {
            icon: <Shield className="w-5 h-5" />,
            questions: [
                {
                    q: "À quelle fréquence faut-il faire vérifier sa toiture ?",
                    a: "Une vérification tous les 2 à 3 ans est recommandée, ou après un épisode de forte intempérie (tempête, grêle, neige)."
                },
                {
                    q: "Comment savoir si ma toiture doit être rénovée ?",
                    a: "Les signes d'alerte sont : infiltrations, tuiles cassées, mousse excessive, affaissement de la charpente ou perte d'isolation."
                },
                {
                    q: "Que faire en cas de fuite sur mon toit ?",
                    a: "Il faut contacter rapidement un couvreur pour un bâchage d'urgence puis une réparation définitive afin d'éviter d'aggraver les dégâts."
                },
                {
                    q: "Combien de temps dure une réparation de toiture ?",
                    a: "Cela dépend de l'ampleur des travaux : une réparation de tuiles peut durer 1 à 2 heures, une rénovation complète plusieurs jours."
                },
                {
                    q: "Est-ce que le couvreur peut intervenir après une tempête ?",
                    a: "Oui, les couvreurs assurent souvent un service d'urgence pour sécuriser et réparer les toitures endommagées par les intempéries."
                },
                {
                    q: "Faut-il remplacer toute la toiture si quelques tuiles sont cassées ?",
                    a: "Pas forcément : un remplacement partiel suffit si le reste de la couverture est en bon état."
                }
            ]
        },
        "Nettoyage & démoussage": {
            icon: <Droplets className="w-5 h-5" />,
            questions: [
                {
                    q: "À quelle fréquence faut-il nettoyer une toiture ?",
                    a: "Un nettoyage tous les 2 à 5 ans est conseillé, selon l'exposition de la maison et la nature du matériau."
                },
                {
                    q: "Quelles méthodes utilisent les couvreurs pour démousser une toiture ?",
                    a: "Ils utilisent généralement un brossage, un nettoyage basse pression, puis l'application d'un traitement anti-mousse et éventuellement d'un hydrofuge."
                },
                {
                    q: "Les produits anti-mousse sont-ils dangereux ?",
                    a: "Les couvreurs utilisent des produits adaptés, non corrosifs pour les matériaux et respectueux de l'environnement lorsqu'ils sont appliqués correctement."
                },
                {
                    q: "Peut-on nettoyer soi-même son toit ?",
                    a: "C'est risqué : danger de chute et risque d'endommager les tuiles avec un jet haute pression. Mieux vaut confier ce travail à un couvreur équipé."
                },
                {
                    q: "Est-il conseillé d'appliquer un hydrofuge après nettoyage ?",
                    a: "Oui, cela permet de protéger durablement la toiture contre l'humidité et les mousses."
                }
            ]
        },
        "Isolation et performance énergétique": {
            icon: <Thermometer className="w-5 h-5" />,
            questions: [
                {
                    q: "Un couvreur peut-il améliorer l'isolation ?",
                    a: "Oui, un couvreur réalise l'isolation par l'intérieur (combles) ou par l'extérieur (sarking)."
                },
                {
                    q: "Quelle est la différence entre isolation intérieure et extérieure ?",
                    a: "L'isolation intérieure est moins coûteuse mais réduit légèrement l'espace habitable. L'isolation extérieure est plus performante mais plus chère."
                },
                {
                    q: "Est-ce que l'isolation de toiture est éligible aux aides ?",
                    a: "Oui, certaines aides comme MaPrimeRénov', l'éco-PTZ ou la TVA réduite à 5,5 % sont accessibles."
                },
                {
                    q: "Combien de temps dure une isolation de toiture ?",
                    a: "Bien réalisée, elle reste efficace 30 à 40 ans."
                }
            ]
        },
        "Matériaux et durabilité": {
            icon: <Home className="w-5 h-5" />,
            questions: [
                {
                    q: "Quelle est la durée de vie d'une toiture en tuiles ?",
                    a: "En moyenne 40 à 50 ans, parfois plus avec un bon entretien."
                },
                {
                    q: "L'ardoise naturelle est-elle plus résistante que les tuiles ?",
                    a: "Oui, l'ardoise naturelle peut durer jusqu'à 100 ans."
                },
                {
                    q: "Quelle toiture est la plus adaptée au climat de votre région ?",
                    a: "Cela dépend : en zone ventée, l'ardoise ou les tuiles mécaniques sont conseillées ; en zone méditerranéenne, les tuiles canal sont privilégiées."
                },
                {
                    q: "Comment choisir entre tuiles mécaniques, plates ou canal ?",
                    a: "Le choix dépend du climat, de l'esthétique régionale et des règles d'urbanisme locales (PLU)."
                },
                {
                    q: "Est-ce que le zinc nécessite beaucoup d'entretien ?",
                    a: "Non, une toiture en zinc est résistante et demande peu d'entretien, mais elle doit être vérifiée régulièrement."
                }
            ]
        },
        "Devis et prix": {
            icon: <Euro className="w-5 h-5" />,
            questions: [
                {
                    q: "Combien coûte l'intervention d'un couvreur ?",
                    a: "Le tarif varie selon la nature des travaux : de 30 à 70 € de l'heure pour de petites réparations, et plusieurs centaines d'euros par m² pour une rénovation complète."
                },
                {
                    q: "Qu'est-ce qui fait varier le prix d'une rénovation ?",
                    a: "Le matériau choisi, la surface, l'accessibilité du toit et la complexité du chantier influencent fortement le prix."
                },
                {
                    q: "Comment obtenir un devis gratuit ?",
                    a: "La plupart des couvreurs proposent un devis gratuit et sans engagement après une visite technique."
                },
                {
                    q: "Est-ce que l'assurance couvre une réparation ?",
                    a: "Oui, si les dégâts sont liés à une tempête, une chute de grêle ou un sinistre reconnu, l'assurance habitation peut prendre en charge tout ou partie des travaux."
                },
                {
                    q: "Existe-t-il des aides financières pour refaire sa toiture ?",
                    a: "Oui, notamment pour l'isolation (MaPrimeRénov', éco-PTZ, CEE) ou la rénovation énergétique."
                }
            ]
        },
        "Sécurité & réglementation": {
            icon: <AlertTriangle className="w-5 h-5" />,
            questions: [
                {
                    q: "Les couvreurs travaillent-ils avec des équipements de sécurité ?",
                    a: "Oui, ils utilisent harnais, échafaudages et protections collectives pour éviter les accidents."
                },
                {
                    q: "Faut-il une autorisation pour rénover sa toiture ?",
                    a: "Une déclaration préalable est obligatoire si l'aspect extérieur change (matériaux, couleur)."
                },
                {
                    q: "Peut-on refaire sa toiture sans permis de construire ?",
                    a: "Oui, sauf si les travaux modifient la structure (ex. surélévation ou création d'ouverture)."
                },
                {
                    q: "Est-il obligatoire de respecter le PLU ?",
                    a: "Oui, le Plan Local d'Urbanisme impose parfois des matériaux ou couleurs précises."
                },
                {
                    q: "Est-ce que le couvreur s'occupe des démarches administratives ?",
                    a: "Certains accompagnent leurs clients dans les déclarations et dossiers d'aides financières."
                }
            ]
        },
        "Urgences et proximité": {
            icon: <MapPin className="w-5 h-5" />,
            questions: [
                {
                    q: "Un couvreur intervient-il en urgence 24h/24 ?",
                    a: "Oui, certains proposent un service de dépannage jour et nuit pour les fuites graves."
                },
                {
                    q: "Combien de temps pour obtenir un dépannage ?",
                    a: "Selon la disponibilité, un couvreur peut intervenir en quelques heures pour sécuriser la toiture."
                },
                {
                    q: "Pourquoi choisir un couvreur local ?",
                    a: "Un couvreur de proximité connaît les matériaux traditionnels et peut intervenir plus rapidement en cas d'urgence."
                },
                {
                    q: "Est-ce que le couvreur se déplace dans votre région ?",
                    a: "Oui, la plupart interviennent dans un rayon de plusieurs kilomètres autour de la commune."
                },
                {
                    q: "Quels sont les délais moyens pour commencer des travaux ?",
                    a: "Selon la saison et la charge de travail, cela peut varier de quelques jours à quelques semaines."
                }
            ]
        }
    };

    // Fonction pour sélectionner une catégorie aléatoire
    const getRandomCategory = () => {
        const categories = Object.keys(faqData);
        return categories[Math.floor(Math.random() * categories.length)];
    };

    // Fonction pour générer une nouvelle catégorie aléatoire
    const generateNewCategory = () => {
        const newCategory = getRandomCategory();
        setActiveCategory(newCategory);
        setOpenItems(new Set()); // Fermer tous les items ouverts
    };

    // Sélectionner une catégorie aléatoire au chargement
    useEffect(() => {
        setActiveCategory(getRandomCategory());
    }, []);

    const toggleItem = (index) => {
        const itemId = `${activeCategory}-${index}`;
        const newOpenItems = new Set(openItems);

        if (newOpenItems.has(itemId)) {
            newOpenItems.delete(itemId);
        } else {
            newOpenItems.add(itemId);
        }

        setOpenItems(newOpenItems);
    };

    // Si la catégorie n'est pas encore définie, afficher un loader
    if (!activeCategory) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-slate-600">Chargement des FAQ...</p>
                </div>
            </div>
        );
    }

    const currentData = faqData[activeCategory];
    const questions = currentData.questions;

    return (
        <div className="min-h-screen bg-white py-8 md:py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 leading-tight">
                        FAQ Couvreur
                    </h1>
                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
                        Découvrez tout ce que vous devez savoir sur les travaux de couverture.
                    </p>
                </div>



                {/* Active Category FAQ */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    {/* Category Header */}
                    <div className="bg-amber-500 p-4 md:p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 text-white rounded-lg p-2">
                                    {currentData.icon}
                                </div>
                                <div>
                                    <h2 className="text-lg md:text-xl font-bold text-white">
                                        FAQ - {activeCategory}
                                    </h2>
                                    <span className="bg-white/20 px-2 py-1 rounded-full text-xs text-white font-medium mt-1 inline-block">
                                        {questions.length} questions
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Questions */}
                    <div className="p-4 md:p-6">
                        <div className="space-y-4">
                            {questions.map((item, index) => {
                                const itemId = `${activeCategory}-${index}`;
                                const isOpen = openItems.has(itemId);

                                return (
                                    <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-300">
                                        <button
                                            onClick={() => toggleItem(index)}
                                            className="w-full p-4 md:p-5 text-left bg-slate-50 hover:bg-slate-100 transition-all duration-200 flex items-center justify-between group"
                                        >
                                            <span className="font-medium text-slate-800 pr-4 group-hover:text-slate-900 text-sm md:text-base">
                                                {item.q}
                                            </span>
                                            {isOpen ? (
                                                <ChevronUp className="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors flex-shrink-0" />
                                            )}
                                        </button>

                                        {isOpen && (
                                            <div className="bg-white border-t border-slate-100">
                                                <div className="p-4 md:p-5 text-slate-700 leading-relaxed animate-in slide-in-from-top-2 duration-300 text-sm md:text-base">
                                                    {item.a}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQ;