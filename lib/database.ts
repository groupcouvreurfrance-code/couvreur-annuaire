
import {readFileSync} from "fs";
import {join} from "path";
import prisma from "@/lib/prisma";
import type {Artisan  } from './generated/prisma'

// Types basés sur vos structures JSON
export interface Department {
  id: number
  code: string
  name: string
  slug: string
  created_at: string
}

export interface Commune {
  id: number
  name: string
  slug: string
  postalCode: string
  created_at: string
  departmentCode: string
}


export interface ContactRequest {
  // Ajoutez la structure si nécessaire
  id: number
  // ... autres propriétés
}

// Fonctions pour lire dynamiquement les fichiers JSON
const getDataPath = (filename: string) => join(process.cwd(), 'prisma/data', filename)

const getDepartments = (): Department[] => {
  try {
    const data = readFileSync(getDataPath('departments.json'), 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading departments.json:', error)
    return []
  }
}

const getCommunes = (): Commune[] => {
  try {
    const data = readFileSync(getDataPath('communes.json'), 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading communes.json:', error)
    return []
  }
}



// ===== FONCTIONS POUR LES DÉPARTEMENTS ===== //

export async function getAllDepartments(): Promise<{ departments: Department[], total: number }> {
  console.log(`🔍 Loading all departments`)

  const departments = getDepartments()
  const sortedDepartments = [...departments].sort((a, b) => a.name.localeCompare(b.name))

  console.log(`✅ Loaded ${sortedDepartments.length} departments (JSON)`)
  return {
    departments: sortedDepartments,
    total: departments.length
  }
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
  console.log(`🔍 Loading department: ${slug}`)
  const communes = getCommunes()        // ← Lecture dynamique du fichier JSON
  const departments = getDepartments()  // ← Lecture dynamique du fichier JSON
  const department = departments.find(dept => dept.slug === slug) || null

  console.log(`✅ Loaded department: ${department?.name || 'not found'} (JSON)`)
  return department
}

// ===== FONCTIONS POUR LES COMMUNES ===== //

export async function getCommunesByDepartment(departmentCode: string): Promise<{ communes: Commune[], total: number }> {
  console.log(`🔍 Loading all communes for ${departmentCode}`)

  const communes = getCommunes()
  const filteredCommunes = communes
      .filter(commune => commune.departmentCode === departmentCode)
      .sort((a, b) => a.name.localeCompare(b.name))

  console.log(`✅ Loaded ${filteredCommunes.length} communes for ${departmentCode} (JSON)`)
  return {
    communes: filteredCommunes,
    total: filteredCommunes.length
  }
}

export async function getCommuneBySlug(
    slug: string
): Promise<(Commune & { department_name: string; department_slug: string }) | null> {
  console.log(`🔍 Loading commune: ${slug}`)
  const communes = getCommunes()        // ← Lecture dynamique du fichier JSON
  const departments = getDepartments()  // ← Lecture dynamique du fichier JSON
  const commune = communes.find(c => c.slug === slug)

  if (!commune) {
    console.log(`❌ Commune not found: ${slug}`)
    return null
  }

  const department = departments.find(dept => dept.code === commune.departmentCode)

  if (!department) {
    console.log(`❌ Department not found for commune: ${slug}`)
    return null
  }

  const result = {
    ...commune,
    department_name: department.name,
    department_slug: department.slug
  }

  console.log(`✅ Loaded commune: ${commune.name} in ${department.name} (JSON)`)
  return result
}

// ===== FONCTIONS POUR LES ARTISANS ===== //


export async function getDepartmentArtisan(departmentId: number): Promise<Artisan | null> {
  console.log(`🔍 Loading artisan for department ID: ${departmentId}`);

  const artisan = await prisma.artisan.findFirst({
    where: {
      departmentId: departmentId,
      status: 'approved',
      active: true
    }
  });

  console.log(`✅ Loaded artisan: ${artisan?.companyName || 'none'} (no cache)`);
  return artisan;
}

export async function getCommuneArtisan(communeId: number): Promise<Artisan | null> {
  console.log(`🔍 Loading artisan for commune ID: ${communeId}`);

  const commune = await prisma.commune.findUnique({
    where: { id: communeId },
    include: {
      department: {
        include: {
          artisans: {
            where: {
              status: 'approved',
              active: true
            },
            take: 1
          }
        }
      }
    }
  });

  const artisan = commune?.department?.artisans[0] || null;
  console.log(`✅ Loaded commune artisan: ${artisan?.companyName || 'none'} (no cache)`);
  return artisan;
}

// ===== FONCTIONS ADMIN ===== //

export async function getAllArtisans(
    status?: string,
    page: number = 1,
    perPage: number = 10
): Promise<{ artisans: (Artisan & { department_name?: string })[], total: number }> {
  const skip = (page - 1) * perPage
  const [rawArtisans, total] = await Promise.all([
    prisma.artisan.findMany({
      where: status ? { status } : undefined,
      include: {
        department: true
      },
      orderBy: {
        id: 'asc'
      },
      skip,
      take: perPage
    }),
    prisma.artisan.count({
      where: status ? { status } : undefined
    })
  ])

  const artisans = rawArtisans.map(artisan => ({
    ...artisan,
    department_name: artisan.department?.name
  }))

  return { artisans, total }
}