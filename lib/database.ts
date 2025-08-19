
import {readFileSync} from "fs";
import {join} from "path";

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

export interface Artisan {
  id: number
  companyName: string
  contactName: string
  email: string
  phone: string
  address: string
  postalCode: string
  city: string
  departmentId: number
  website: string
  description: string
  services: string[]
  yearsExperience: number
  certifications: string[]
  insurance_valid: boolean
  siret: string
  status: string
  featured: boolean
  rating: number
  reviewCount: number
  active: boolean
  created_at: string
  updated_at: string
  profileImage: string
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

const getArtisans = (): Artisan[] => {
  try {
    const data = readFileSync(getDataPath('artisans.json'), 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading artisans.json:', error)
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
  console.log(`🔍 Loading artisan for department ID: ${departmentId}`)
  const artisans = getArtisans()        // ← Lecture dynamique du fichier JSON
  const artisan = artisans.find(a =>
      a.departmentId === departmentId &&
      a.status === 'approved' &&
      a.active === true
  ) || null

  console.log(`✅ Loaded artisan: ${artisan?.companyName || 'none'} (JSON)`)
  return artisan
}

export async function getCommuneArtisan(communeId: number): Promise<Artisan | null> {
  console.log(`🔍 Loading artisan for commune ID: ${communeId}`)
  const communes = getCommunes()        // ← Lecture dynamique du fichier JSON
  const departments = getDepartments()  // ← Lecture dynamique du fichier JSON
  const commune = communes.find(c => c.id === communeId)

  if (!commune) {
    console.log(`❌ Commune not found: ${communeId}`)
    return null
  }

  const department = departments.find(dept => dept.code === commune.departmentCode)

  if (!department) {
    console.log(`❌ Department not found for commune: ${communeId}`)
    return null
  }
    const artisans = getArtisans()        // ← Lecture dynamique du fichier JSON

  const artisan = artisans.find(a =>
      a.departmentId === department.id &&
      a.status === 'approved' &&
      a.active === true
  ) || null

  console.log(`✅ Loaded commune artisan: ${artisan?.companyName || 'none'} (JSON)`)
  return artisan
}

// ===== FONCTIONS ADMIN ===== //

export async function getAllArtisans(
    status?: string,
    page: number = 1,
    perPage: number = 10
): Promise<{ artisans: (Artisan & { department_name?: string })[], total: number }> {
  console.log(`🔍 Loading all artisans (status: ${status || 'all'}, page: ${page})`)
  const  artisans = getArtisans()
  let filteredArtisans = artisans

  if (status) {
    filteredArtisans = artisans.filter(a => a.status === status)
  }

  const startIndex = (page - 1) * perPage
  const paginatedArtisans = filteredArtisans.slice(startIndex, startIndex + perPage)
  const departments = getDepartments()  // ← Lecture dynamique du fichier JSON
  // Ajouter le nom du département
  const artisansWithDepartment = paginatedArtisans.map(artisan => {
    const department = departments.find(dept => dept.id === artisan.departmentId)
    return {
      ...artisan,
      department_name: department?.name
    }
  })

  console.log(`✅ Loaded ${paginatedArtisans.length}/${filteredArtisans.length} artisans (JSON)`)

  return {
    artisans: artisansWithDepartment,
    total: filteredArtisans.length
  }
}