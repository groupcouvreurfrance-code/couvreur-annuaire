import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import * as xlsx from 'xlsx'
import { join } from 'path'

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

async function main() {
  // Lire le fichier Excel
  const workbook = xlsx.readFile('prisma/data/communes.xlsx')
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const communes = xlsx.utils.sheet_to_json(worksheet)

  // Importer chaque commune
  for (const commune of communes) {
    const { name, departmentCode } = commune as any
    
    await prisma.commune.create({
      data: {
        name,
        slug: slugify(name),
        departmentCode,
        postalCode: `${departmentCode}000`, // À ajuster selon vos données
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
