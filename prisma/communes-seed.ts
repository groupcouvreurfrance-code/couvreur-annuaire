import { PrismaClient } from '@prisma/client'
import * as XLSX from 'xlsx'
import { slugify } from '../lib/utils'

const prisma = new PrismaClient()

async function main() {
  const workbook = XLSX.readFile('prisma/data/communes.xlsx')
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(sheet)

  console.log(`Importation de ${data.length} communes...`)

  for (const row of data) {
    const name = row['name'] as string
    const departmentCode = String(row['department']).padStart(2, '0')

    // Trouver le département correspondant
    const department = await prisma.department.findFirst({
      where: {
        code: departmentCode
      }
    })

    if (!department) {
      console.warn(`Département ${departmentCode} non trouvé pour la commune ${name}`)
      continue
    }

    // Créer la commune
    await prisma.commune.create({
      data: {
        name,
        slug: slugify(name),
        departmentId: department.id,
      }
    })
  }

  console.log('Import terminé !')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
