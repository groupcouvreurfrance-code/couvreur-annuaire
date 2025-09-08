import prisma from "@/lib/prisma";
import type {Artisan  } from './generated/prisma'
import {revalidateTag, unstable_cache} from "next/cache";
import communes from '../public/data/communes.json'
import departments from '../public/data/departments.json'
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
  id: number
  // ... autres propriétés
}

// Types étendus pour les artisans avec infos département
export type ArtisanWithDepartment = Artisan & {
  department?: {
    id: number
    name: string
    code: string
    slug: string
  }
}



// ===== FONCTIONS POUR LES DÉPARTEMENTS ===== //

export async function getAllDepartments(): Promise<{ departments: Department[], total: number }> {
  console.log(`🔍 Loading all departments`)

  const sortedDepartments = [...departments].sort((a, b) => a.name.localeCompare(b.name))

  console.log(`✅ Loaded ${sortedDepartments.length} departments (JSON)`)
  return {
    departments: sortedDepartments,
    total: departments.length
  }
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
  console.log(`🔍 Loading department: ${slug}`)

  const department = departments.find(dept => dept.slug === slug) || null

  console.log(`✅ Loaded department: ${department?.name || 'not found'} (JSON)`)
  return department
}

// ===== FONCTIONS POUR LES COMMUNES ===== //

export async function getCommunesByDepartment(departmentCode: string): Promise<{ communes: Commune[], total: number }> {
  console.log(`🔍 Loading all communes for ${departmentCode}`)


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

// ===== CACHE GLOBAL DES ARTISANS (LA CLÉ DE L'OPTIMISATION) ===== //

/**
 * Cache global de TOUS les artisans actifs et approuvés
 * Mise en cache pendant 6h, invalidé uniquement par revalidateTag
 */
export const getAllActiveArtisans = unstable_cache(
    async (): Promise<ArtisanWithDepartment[]> => {
      console.log(`🔍 [DB] Loading ALL active artisans - CACHE MISS`)

      const artisans = await prisma.artisan.findMany({
        where: {
          status: 'approved',
          active: true
        },
        include: {
          department: {
            select: {
              id: true,
              name: true,
              code: true,
              slug: true
            }
          }
        },
        orderBy: {
          id: 'asc'
        }
      })

      console.log(`✅ [DB] Loaded ${artisans.length} active artisans from database`)
      return artisans
    },
    ['all-active-artisans'], // clé de cache unique
    {
      revalidate: 8760 * 60 * 60, // 6 heures
      tags: ['artisans-global']
    }
)
export const getAllArtisans = unstable_cache(
    async (
        status?: string,
        page: number = 1,
        perPage: number = 10
    ): Promise<{ artisans: (Artisan & { department_name?: string })[], total: number }> => {
      const skip = (page - 1) * perPage

      const [rawArtisans, total] = await Promise.all([
        prisma.artisan.findMany({
          where: status ? { status } : undefined,
          include: {
            department: true
          },
          orderBy: {
            id: "asc"
          },
          skip,
          take: perPage
        }),
        prisma.artisan.count({
          where: status ? { status } : undefined
        })
      ])

      // on ajoute department_name directement
      const artisans = rawArtisans.map(a => ({
        ...a,
        department_name: a.department?.name
      }))

      return { artisans, total }
    },
    // clé du cache → tu peux mettre une clé unique + args
    ["getAllArtisans"],
    {
      revalidate: 8760 * 60 * 60, // durée en secondes avant revalidation
      tags: ["artisans"] // utile pour invalider plus tard avec revalidateTag("artisans")
    }
)
/**
 * Wrapper avec logs pour le cache global
 */
export async function getAllActiveArtisansWithLogs(): Promise<ArtisanWithDepartment[]> {
  console.log(`🔍 [CACHE] Checking global artisans cache`)

  const startTime = Date.now()
  const artisans = await getAllActiveArtisans()
  const duration = Date.now() - startTime

  if (duration < 10) {
    console.log(`⚡ [CACHE] Global artisans cache HIT - Retrieved ${artisans.length} artisans in ${duration}ms`)
  } else {
    console.log(`🐌 [DB] Global artisans database query - Retrieved ${artisans.length} artisans in ${duration}ms`)
  }

  return artisans
}

// ===== FONCTIONS OPTIMISÉES UTILISANT LE CACHE GLOBAL ===== //

/**
 * Récupère un artisan pour un département en utilisant le cache global
 */
export async function getDepartmentArtisan(departmentId: number): Promise<Artisan | null> {
  console.log(`🔍 [OPTIMIZED] Getting artisan for department ID: ${departmentId} via global cache`)

  const allArtisans = await getAllActiveArtisansWithLogs()
  const artisan = allArtisans.find(a => a.departmentId === departmentId) || null

  console.log(`✅ [OPTIMIZED] Found artisan for department ${departmentId}: ${artisan?.companyName || 'none'}`)
  return artisan
}

/**
 * Récupère un artisan pour une commune en utilisant le cache global
 */
export async function getCommuneArtisan(communeId: number): Promise<Artisan | null> {
  console.log(`🔍 [OPTIMIZED] Getting artisan for commune ID: ${communeId} via global cache`)

  // D'abord récupérer la commune pour avoir son departmentCode

  const commune = communes.find(c => c.id === communeId)

  if (!commune) {
    console.log(`❌ Commune not found: ${communeId}`)
    return null
  }

  // Trouver le département correspondant

  const department = departments.find(d => d.code === commune.departmentCode)

  if (!department) {
    console.log(`❌ Department not found for commune: ${communeId}`)
    return null
  }

  // Utiliser le cache global pour trouver l'artisan
  const allArtisans = await getAllActiveArtisansWithLogs()
  const artisan = allArtisans.find(a => a.departmentId === department.id) || null

  console.log(`✅ [OPTIMIZED] Found artisan for commune ${communeId} (dept ${department.name}): ${artisan?.companyName || 'none'}`)
  return artisan
}


export function invalidateGlobalArtisanCache() {
  console.log(`🔄 [CACHE] Invalidating global artisans cache`)
  revalidateTag('artisans-global')
}

/**
 * Garde l'ancienne fonction pour la compatibilité
 * @deprecated Utiliser invalidateGlobalArtisanCache() à la place
 */
export function invalidateArtisan() {
  invalidateGlobalArtisanCache()
}

// ===== FONCTIONS UTILITAIRES ===== //

/**
 * Vérifier si un département a un artisan (sans faire de requête DB)
 */
export async function departmentHasArtisan(departmentId: number): Promise<boolean> {
  const allArtisans = await getAllActiveArtisansWithLogs()
  return allArtisans.some(a => a.departmentId === departmentId)
}

/**
 * Compter le nombre d'artisans actifs (sans requête DB)
 */
export async function getActiveArtisansCount(): Promise<number> {
  const allArtisans = await getAllActiveArtisansWithLogs()
  return allArtisans.length
}
