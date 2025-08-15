// lib/db.ts
import { unstable_cache } from 'next/cache'
import prisma from './prisma'
import type { Department, Commune, Artisan, ContactRequest } from './generated/prisma'
export type { Department, Commune, Artisan, ContactRequest }

// ===== FONCTIONS CACHÉES (DONNÉES STATIQUES) ===== //

export const getAllDepartments = unstable_cache(
    async (page: number = 1, perPage: number = 20): Promise<{ departments: Department[], total: number }> => {
      console.log(`🔍 Loading departments page ${page}`);
      const skip = (page - 1) * perPage

      const [departments, total] = await Promise.all([
        prisma.department.findMany({
          orderBy: {
            name: 'asc'
          },
          skip,
          take: perPage
        }),
        prisma.department.count()
      ])

      console.log(`✅ Loaded ${departments.length}/${total} departments (cached)`);
      return { departments, total }
    },
    ['departments'],
    {
      revalidate: 60 * 60 * 24, // 24 heures
      tags: ['departments']
    }
)

export const getDepartmentBySlug = unstable_cache(
    async (slug: string): Promise<Department | null> => {
      console.log(`🔍 Loading department: ${slug}`);

      const department = await prisma.department.findUnique({
        where: {
          slug: slug
        }
      });

      console.log(`✅ Loaded department: ${department?.name || 'not found'} (cached)`);
      return department;
    },
    ['department-by-slug'],
    {
      revalidate: 60 * 60 * 24, // 24 heures
      tags: ['departments']
    }
)

export const getCommunesByDepartment = unstable_cache(
    async (departmentCode: string, page: number = 1, perPage: number = 20): Promise<{ communes: Commune[], total: number }> => {
      console.log(`🔍 Loading communes for ${departmentCode} (page ${page}/${perPage})`);

      const skip = (page - 1) * perPage

      const [communes, total] = await Promise.all([
        prisma.commune.findMany({
          where: { departmentCode },
          orderBy: { name: 'asc' },
          skip,
          take: perPage
        }),
        prisma.commune.count({ where: { departmentCode } })
      ])

      console.log(`✅ Loaded ${communes.length}/${total} communes for ${departmentCode} (cached)`);
      return { communes, total }
    },
    ['communes-by-department-v2'],
    {
      revalidate: 60 * 60 * 12, // 12 heures
      tags: ['communes']
    }
);

export const getCommuneBySlug = unstable_cache(
    async (slug: string): Promise<(Commune & { department_name: string; department_slug: string }) | null> => {
      console.log(`🔍 Loading commune: ${slug}`);

      const commune = await prisma.commune.findUnique({
        where: {
          slug: slug
        },
        include: {
          department: true
        }
      })

      if (!commune) {
        console.log(`❌ Commune not found: ${slug}`);
        return null;
      }

      const result = {
        ...commune,
        department_name: commune.department.name,
        department_slug: commune.department.slug
      };

      console.log(`✅ Loaded commune: ${commune.name} in ${commune.department.name} (cached)`);
      return result;
    },
    ['commune-by-slug'],
    {
      revalidate: 60 * 60 * 12, // 12 heures
      tags: ['communes']
    }
)

// ===== FONCTIONS NON CACHÉES (DONNÉES DYNAMIQUES) ===== //

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

export async function getDepartmentsWithStats(): Promise<(Department & { artisan_count: number; avg_rating: number })[]> {
  console.log(`🔍 Loading departments with stats`);

  const departments = await prisma.department.findMany({
    include: {
      artisans: {
        where: {
          status: 'approved',
          active: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  const result = departments.map(dept => ({
    ...dept,
    artisan_count: dept.artisans.length,
    avg_rating: dept.artisans.reduce((sum, artisan) => sum + artisan.rating, 0) / (dept.artisans.length || 1)
  }));

  console.log(`✅ Loaded ${result.length} departments with stats (no cache)`);
  return result;
}

export async function getMapData() {
  console.log(`🔍 Loading map data`);

  const departments = await prisma.department.findMany({
    select: {
      code: true,
      name: true,
      slug: true,
      artisans: {
        where: {
          status: 'approved',
          active: true
        },
        select: {
          rating: true,
          featured: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  const result = departments.map(dept => ({
    code: dept.code,
    name: dept.name,
    slug: dept.slug,
    artisan_count: dept.artisans.length,
    avg_rating: dept.artisans.reduce((sum, artisan) => sum + artisan.rating, 0) / (dept.artisans.length || 1),
    featured_count: dept.artisans.filter(a => a.featured).length
  }));

  console.log(`✅ Loaded map data for ${result.length} departments (no cache)`);
  return result;
}

export async function getDepartmentStats(departmentId: number) {
  console.log(`🔍 Loading stats for department ID: ${departmentId}`);

  const stats = await prisma.artisan.aggregate({
    where: {
      departmentId: departmentId,
      status: 'approved',
      active: true
    },
    _count: {
      _all: true,
      insuranceValid: true
    },
    _avg: {
      rating: true
    }
  });

  const result = {
    has_artisan: stats._count._all,
    rating: stats._avg.rating || 0,
    insured: stats._count.insuranceValid
  };

  console.log(`✅ Loaded department stats: ${result.has_artisan} artisans (no cache)`);
  return result;
}

// ===== FONCTIONS LECTURE SEULE ADMIN ===== //

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

export async function getAllContactRequests(status?: string): Promise<ContactRequest[]> {
  return prisma.contactRequest.findMany({
    where: status ? { status } : undefined,
    include: {
      artisan: {
        select: {
          companyName: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function getAdminStats() {
  const [
    artisanCounts,
    contactRequestCounts,
    departmentCount,
    communeCount,
    recentRequests
  ] = await Promise.all([
    prisma.artisan.groupBy({
      by: ['status', 'active'],
      _count: true
    }),
    prisma.contactRequest.groupBy({
      by: ['status'],
      _count: true
    }),
    prisma.department.count(),
    prisma.commune.count(),
    prisma.contactRequest.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    })
  ])

  const stats = {
    total_artisans: 0,
    pending_artisans: 0,
    approved_artisans: 0,
    active_artisans: 0,
    total_requests: 0,
    new_requests: 0,
    requests_this_week: recentRequests,
    total_departments: departmentCount,
    total_communes: communeCount
  }

  artisanCounts.forEach(count => {
    stats.total_artisans += count._count
    if (count.status === 'pending') stats.pending_artisans += count._count
    if (count.status === 'approved') stats.approved_artisans += count._count
    if (count.active) stats.active_artisans += count._count
  })

  contactRequestCounts.forEach(count => {
    stats.total_requests += count._count
    if (count.status === 'new') stats.new_requests += count._count
  })

  return stats
}