import { PrismaClient } from '../lib/generated/prisma'

const slugify = (text: string): string => {
  return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
}

const prisma = new PrismaClient()

// Les vrais départements avec leurs codes, noms et slugs
const departments = [
  { code: '01', name: 'Ain', slug: 'ain' },
  { code: '02', name: 'Aisne', slug: 'aisne' },
  { code: '03', name: 'Allier', slug: 'allier' },
  { code: '04', name: 'Alpes-de-Haute-Provence', slug: 'alpes-de-haute-provence' },
  { code: '05', name: 'Hautes-Alpes', slug: 'hautes-alpes' },
  { code: '06', name: 'Alpes-Maritimes', slug: 'alpes-maritimes' },
  { code: '07', name: 'Ardèche', slug: 'ardeche' },
  { code: '08', name: 'Ardennes', slug: 'ardennes' },
  { code: '09', name: 'Ariège', slug: 'ariege' },
  { code: '10', name: 'Aube', slug: 'aube' },
  { code: '11', name: 'Aude', slug: 'aude' },
  { code: '12', name: 'Aveyron', slug: 'aveyron' },
  { code: '13', name: 'Bouches-du-Rhône', slug: 'bouches-du-rhone' },
  { code: '14', name: 'Calvados', slug: 'calvados' },
  { code: '15', name: 'Cantal', slug: 'cantal' },
  { code: '16', name: 'Charente', slug: 'charente' },
  { code: '17', name: 'Charente-Maritime', slug: 'charente-maritime' },
  { code: '18', name: 'Cher', slug: 'cher' },
  { code: '19', name: 'Corrèze', slug: 'correze' },
  { code: '21', name: 'Côte-d\'Or', slug: 'cote-dor' },
  { code: '22', name: 'Côtes-d\'Armor', slug: 'cotes-darmor' },
  { code: '23', name: 'Creuse', slug: 'creuse' },
  { code: '24', name: 'Dordogne', slug: 'dordogne' },
  { code: '25', name: 'Doubs', slug: 'doubs' },
  { code: '26', name: 'Drôme', slug: 'drome' },
  { code: '27', name: 'Eure', slug: 'eure' },
  { code: '28', name: 'Eure-et-Loir', slug: 'eure-et-loir' },
  { code: '29', name: 'Finistère', slug: 'finistere' },
  { code: '30', name: 'Gard', slug: 'gard' },
  { code: '31', name: 'Haute-Garonne', slug: 'haute-garonne' },
  { code: '32', name: 'Gers', slug: 'gers' },
  { code: '33', name: 'Gironde', slug: 'gironde' },
  { code: '34', name: 'Hérault', slug: 'herault' },
  { code: '35', name: 'Ille-et-Vilaine', slug: 'ille-et-vilaine' },
  { code: '36', name: 'Indre', slug: 'indre' },
  { code: '37', name: 'Indre-et-Loire', slug: 'indre-et-loire' },
  { code: '38', name: 'Isère', slug: 'isere' },
  { code: '39', name: 'Jura', slug: 'jura' },
  { code: '40', name: 'Landes', slug: 'landes' },
  { code: '41', name: 'Loir-et-Cher', slug: 'loir-et-cher' },
  { code: '42', name: 'Loire', slug: 'loire' },
  { code: '43', name: 'Haute-Loire', slug: 'haute-loire' },
  { code: '44', name: 'Loire-Atlantique', slug: 'loire-atlantique' },
  { code: '45', name: 'Loiret', slug: 'loiret' },
  { code: '46', name: 'Lot', slug: 'lot' },
  { code: '47', name: 'Lot-et-Garonne', slug: 'lot-et-garonne' },
  { code: '48', name: 'Lozère', slug: 'lozere' },
  { code: '49', name: 'Maine-et-Loire', slug: 'maine-et-loire' },
  { code: '50', name: 'Manche', slug: 'manche' },
  { code: '51', name: 'Marne', slug: 'marne' },
  { code: '52', name: 'Haute-Marne', slug: 'haute-marne' },
  { code: '53', name: 'Mayenne', slug: 'mayenne' },
  { code: '54', name: 'Meurthe-et-Moselle', slug: 'meurthe-et-moselle' },
  { code: '55', name: 'Meuse', slug: 'meuse' },
  { code: '56', name: 'Morbihan', slug: 'morbihan' },
  { code: '57', name: 'Moselle', slug: 'moselle' },
  { code: '58', name: 'Nièvre', slug: 'nievre' },
  { code: '59', name: 'Nord', slug: 'nord' },
  { code: '60', name: 'Oise', slug: 'oise' },
  { code: '61', name: 'Orne', slug: 'orne' },
  { code: '62', name: 'Pas-de-Calais', slug: 'pas-de-calais' },
  { code: '63', name: 'Puy-de-Dôme', slug: 'puy-de-dome' },
  { code: '64', name: 'Pyrénées-Atlantiques', slug: 'pyrenees-atlantiques' },
  { code: '65', name: 'Hautes-Pyrénées', slug: 'hautes-pyrenees' },
  { code: '66', name: 'Pyrénées-Orientales', slug: 'pyrenees-orientales' },
  { code: '67', name: 'Bas-Rhin', slug: 'bas-rhin' },
  { code: '68', name: 'Haut-Rhin', slug: 'haut-rhin' },
  { code: '69', name: 'Rhône', slug: 'rhone' },
  { code: '70', name: 'Haute-Saône', slug: 'haute-saone' },
  { code: '71', name: 'Saône-et-Loire', slug: 'saone-et-loire' },
  { code: '72', name: 'Sarthe', slug: 'sarthe' },
  { code: '73', name: 'Savoie', slug: 'savoie' },
  { code: '74', name: 'Haute-Savoie', slug: 'haute-savoie' },
  { code: '75', name: 'Paris', slug: 'paris' },
  { code: '76', name: 'Seine-Maritime', slug: 'seine-maritime' },
  { code: '77', name: 'Seine-et-Marne', slug: 'seine-et-marne' },
  { code: '78', name: 'Yvelines', slug: 'yvelines' },
  { code: '79', name: 'Deux-Sèvres', slug: 'deux-sevres' },
  { code: '80', name: 'Somme', slug: 'somme' },
  { code: '81', name: 'Tarn', slug: 'tarn' },
  { code: '82', name: 'Tarn-et-Garonne', slug: 'tarn-et-garonne' },
  { code: '83', name: 'Var', slug: 'var' },
  { code: '84', name: 'Vaucluse', slug: 'vaucluse' },
  { code: '85', name: 'Vendée', slug: 'vendee' },
  { code: '86', name: 'Vienne', slug: 'vienne' },
  { code: '87', name: 'Haute-Vienne', slug: 'haute-vienne' },
  { code: '88', name: 'Vosges', slug: 'vosges' },
  { code: '89', name: 'Yonne', slug: 'yonne' },
  { code: '90', name: 'Territoire de Belfort', slug: 'territoire-de-belfort' },
  { code: '91', name: 'Essonne', slug: 'essonne' },
  { code: '92', name: 'Hauts-de-Seine', slug: 'hauts-de-seine' },
  { code: '93', name: 'Seine-Saint-Denis', slug: 'seine-saint-denis' },
  { code: '94', name: 'Val-de-Marne', slug: 'val-de-marne' },
  { code: '95', name: 'Val-d\'Oise', slug: 'val-doise' }
]

// Données pour générer des artisans variés
const services = [
  ['Couverture', 'Zinguerie'],
  ['Réparation de toiture', 'Étanchéité'],
  ['Pose de gouttières', 'Isolation'],
  ['Charpente', 'Velux'],
  ['Démoussage', 'Nettoyage toiture'],
  ['Bardage', 'Façade'],
  ['Tuiles', 'Ardoise'],
  ['Toiture terrasse', 'Membrane EPDM'],
]

// Villes principales par département (quelques exemples)
const citiesByDepartment: Record<string, string[]> = {
  '01': ['Bourg-en-Bresse', 'Oyonnax', 'Bellegarde-sur-Valserine'],
  '02': ['Laon', 'Saint-Quentin', 'Soissons'],
  '03': ['Moulins', 'Montluçon', 'Vichy'],
  '04': ['Digne-les-Bains', 'Manosque', 'Sisteron'],
  '05': ['Gap', 'Briançon', 'Embrun'],
  '06': ['Nice', 'Cannes', 'Antibes', 'Grasse'],
  '13': ['Marseille', 'Aix-en-Provence', 'Arles'],
  '31': ['Toulouse', 'Colomiers', 'Tournefeuille'],
  '33': ['Bordeaux', 'Mérignac', 'Pessac'],
  '34': ['Montpellier', 'Béziers', 'Sète'],
  '59': ['Lille', 'Roubaix', 'Tourcoing'],
  '69': ['Lyon', 'Villeurbanne', 'Vénissieux'],
  '75': ['Paris'],
  // Ajouter une ville par défaut pour les départements non listés
}

const descriptions = [
  'Entreprise spécialisée dans la couverture traditionnelle et moderne. Nous intervenons sur tous types de toitures avec un savoir-faire reconnu depuis de nombreuses années.',
  'Couvreur expérimenté proposant des solutions durables pour vos projets de rénovation et construction. Devis gratuit et intervention rapide.',
  'Artisan couvreur qualifié, nous réalisons tous vos travaux de couverture, zinguerie et étanchéité. Matériaux de qualité et finitions soignées.',
  'Spécialiste de la toiture depuis plus de 15 ans, nous vous accompagnons dans tous vos projets. Respect des délais et satisfaction client garantie.',
  'Entreprise familiale de couverture, nous privilégions la qualité et la durabilité de nos interventions. Devis personnalisé et conseils adaptés.'
]

const certifications = [
  ['RGE', 'Qualibat'],
  ['RGE', 'QualiPV'],
  ['Qualibat', 'CSTB'],
  ['RGE', 'Velux Certified'],
  ['QualiPV', 'CSTB'],
  ['RGE'],
  ['Qualibat'],
]

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateSiret(): string {
  const siret = Math.floor(Math.random() * 99999999999999).toString().padStart(14, '0')
  return siret
}

function generatePostalCode(departmentCode: string): string {
  const baseCode = departmentCode.padStart(2, '0')
  const suffix = Math.floor(Math.random() * 999).toString().padStart(3, '0')
  return baseCode + suffix
}

function getCityForDepartment(departmentCode: string): string {
  const cities = citiesByDepartment[departmentCode]
  if (cities && cities.length > 0) {
    return getRandomElement(cities)
  }
  // Ville par défaut si pas de villes spécifiques
  return `Ville du ${departmentCode}`
}

async function main() {
  console.log('Début du seeding des artisans...')

  // 1. Récupérer les départements existants pour avoir les IDs
  console.log('Récupération des départements existants...')
  const existingDepartments = await prisma.department.findMany()
  const departmentMap = new Map(existingDepartments.map(d => [d.code, d.id]))
  console.log(`${existingDepartments.length} départements trouvés dans la base`)

  // 2. Créer les artisans
  console.log('Création des artisans...')
  const artisans = []

  // Créer un artisan pour chaque département dans la liste (en utilisant les IDs de la base)
  for (const departmentData of departments) {
    const departmentId = departmentMap.get(departmentData.code)
    if (!departmentId) {
      console.error(`Département ${departmentData.code} non trouvé dans la base`)
      continue
    }

    const city = getCityForDepartment(departmentData.code)
    const postalCode = generatePostalCode(departmentData.code)
    const selectedServices = getRandomElement(services)
    const selectedCertifications = getRandomElement(certifications)
    const yearsExp = getRandomNumber(2, 25)

    const artisan = {
      companyName: `Couvreur ${departmentData.code} `,
      contactName: `Contact Couvreur ${departmentData.code}`,
      email: 'groupcouvreurfrance@gmail.com',
      phone: '07 56 83 09 51',
      address: `${getRandomNumber(1, 999)} Rue de la Toiture`,
      postalCode: postalCode,
      city: city,
      departmentId: departmentId,
      website: `https://couvreur${departmentData.code}.fr`,
      description: getRandomElement(descriptions),
      services: selectedServices,
      yearsExperience: yearsExp,
      certifications: selectedCertifications,
      insuranceValid: true,
      siret: generateSiret(),
      status: getRandomElement(['pending', 'approved', 'approved', 'approved']), // Plus d'approuvés
      featured: Math.random() < 0.1, // 10% de chance d'être featured
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Entre 3.0 et 5.0
      reviewCount: getRandomNumber(0, 50),
      active: Math.random() < 0.95, // 95% de chance d'être actif
    }

    artisans.push(artisan)
  }

  // Insertion des artisans
  for (const artisan of artisans) {
    try {
      await prisma.artisan.create({
        data: artisan
      })
      console.log(`Artisan ${artisan.companyName} créé avec succès`)
    } catch (error) {
      console.error(`Erreur lors de la création de ${artisan.companyName}:`, error)
    }
  }

  console.log(`Seeding terminé ! ${artisans.length} artisans créés (un par département).`)
}

main()
    .catch((e) => {
      console.error('Erreur durant le seeding:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })