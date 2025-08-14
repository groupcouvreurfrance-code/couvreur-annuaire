const { PrismaClient } = require('../lib/generated/prisma')
const prisma = new PrismaClient()

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

async function main() {
  console.log('Start seeding departments...')
  
  for (const dept of departments) {
    const department = await prisma.department.upsert({
      where: { code: dept.code },
      update: {},
      create: {
        code: dept.code,
        name: dept.name,
        slug: dept.slug
      }
    })
    console.log(`Created department with code: ${department.code}`)
  }
  
  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
