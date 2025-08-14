const { PrismaClient } = require('../lib/generated/prisma')
const XLSX = require('xlsx')

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
}

const prisma = new PrismaClient()

async function main() {
  try {
    // Lire le fichier Excel
    const workbook = XLSX.readFile('prisma/data/communes.xlsx')
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const communes = XLSX.utils.sheet_to_json(worksheet)

    console.log(`Importation de ${communes.length} communes...`)

    // Les vrais départements avec leurs noms et slugs
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
      { code: '20', name: 'Corse', slug: 'corse' },
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
    console.log(`Création de ${departments.length} départements...`)

    try {
      // Import des départements avec leurs vrais noms et slugs
      await prisma.department.createMany({
        data: departments,
        skipDuplicates: true,
      })

      // Préparer les données des communes pour l'import en masse
      console.log('Premier enregistrement:', communes[0])
    
      // Créer un ensemble des codes de départements valides
      const validDepartmentCodes = new Set(departments.map(d => d.code))

      const communesToCreate = communes
        .filter(commune => {
          const hasNameAndCode = commune.name && commune.departmentCode
          const code = commune.departmentCode.toString().padStart(2, '0')
          const isValidDepartment = validDepartmentCodes.has(code)
          return hasNameAndCode && isValidDepartment
        })
        .map(commune => {
          const data = {
            name: commune.name,
            slug: slugify(commune.name),
            departmentCode: commune.departmentCode.toString().padStart(2, '0'),
            postalCode: commune.departmentCode.toString().padStart(2, '0') + '000'
          }
          return data
        })

      console.log('Premier enregistrement transformé:', communesToCreate[0])
      console.log(`Préparation de ${communesToCreate.length} communes pour l'import...`)

      // Import des communes
      const result = await prisma.commune.createMany({
        data: communesToCreate,
        skipDuplicates: true, // Ignore les doublons si le nom et le code département sont uniques
      })
      console.log(`${result.count} communes créées avec succès`)
    } catch (error) {
      console.error('Erreur lors de l\'import en masse:', error)
    }
  } catch (error) {
    console.error('Erreur lors de l\'importation:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
