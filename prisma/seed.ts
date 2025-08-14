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

const cities = [
  'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Montpellier', 'Strasbourg',
  'Bordeaux', 'Lille', 'Rennes', 'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Grenoble',
  'Dijon', 'Angers', 'Nîmes', 'Villeurbanne', 'Le Mans', 'Aix-en-Provence', 'Clermont-Ferrand',
  'Brest', 'Tours', 'Amiens', 'Limoges', 'Annecy', 'Boulogne-Billancourt', 'Metz', 'Besançon'
]

const departments = [
  { id: 1, code: '75' }, { id: 2, code: '69' }, { id: 3, code: '13' }, { id: 4, code: '31' },
  { id: 5, code: '06' }, { id: 6, code: '44' }, { id: 7, code: '34' }, { id: 8, code: '67' },
  { id: 9, code: '33' }, { id: 10, code: '59' }, { id: 11, code: '35' }, { id: 12, code: '51' },
  { id: 13, code: '76' }, { id: 14, code: '42' }, { id: 15, code: '83' }, { id: 16, code: '38' }
]

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

async function main() {
  console.log('Début du seeding des artisans...')

  const artisans = []

  for (let i = 1; i <= 95; i++) {
    const department = getRandomElement(departments)
    const city = getRandomElement(cities)
    const postalCode = generatePostalCode(department.code)
    const selectedServices = getRandomElement(services)
    const selectedCertifications = getRandomElement(certifications)
    const yearsExp = getRandomNumber(2, 25)

    const artisan = {
      companyName: `Couvreur ${department.code}`,
      contactName: `Contact Couvreur ${department.code}`,
      email: 'groupcouvreurfrance@gmail.com',
      phone: '07 56 83 09 51',
      address: `${getRandomNumber(1, 999)} Rue de la Toiture`,
      postalCode: postalCode,
      city: city,
      departmentId: department.id,
      website: `https://couvreur${department.code}.fr`,
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

  // Insertion en batch pour améliorer les performances
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

  console.log('Seeding terminé ! 95 artisans créés.')
}

main()
    .catch((e) => {
      console.error('Erreur durant le seeding:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })