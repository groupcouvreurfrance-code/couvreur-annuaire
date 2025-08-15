import { unstable_cache } from 'next/cache'
import prisma from './prisma'
import type { Department, Commune, Artisan, ContactRequest } from './generated/prisma'
export type { Department, Commune, Artisan, ContactRequest }

// ===== FONCTIONS CACHÉES ===== //

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

// ⭐ AJOUT DU CACHE POUR getDepartmentArtisan - C'EST LE PLUS IMPORTANT !
export const getDepartmentArtisan = unstable_cache(
    async (departmentId: number): Promise<Artisan | null> => {
      console.log(`🔍 Loading artisan for department ID: ${departmentId}`);

      const artisan = await prisma.artisan.findFirst({
        where: {
          departmentId: departmentId,
          status: 'approved',
          active: true
        }
      });

      console.log(`✅ Loaded artisan: ${artisan?.companyName || 'none'} (cached)`);
      return artisan;
    },
    ['department-artisan'],
    {
      revalidate: 60 * 60 * 6, // 6 heures (plus court car les artisans peuvent changer)
      tags: ['artisans']
    }
);

// ⭐ AJOUT DU CACHE POUR getCommuneArtisan - UTILISÉ DANS LES PAGES COMMUNE !
export const getCommuneArtisan = unstable_cache(
    async (communeId: number): Promise<Artisan | null> => {
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
      console.log(`✅ Loaded commune artisan: ${artisan?.companyName || 'none'} (cached)`);
      return artisan;
    },
    ['commune-artisan'],
    {
      revalidate: 60 * 60 * 6, // 6 heures
      tags: ['artisans']
    }
);

export const getDepartmentsWithStats = unstable_cache(
    async (): Promise<(Department & { artisan_count: number; avg_rating: number })[]> => {
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

      console.log(`✅ Loaded ${result.length} departments with stats (cached)`);
      return result;
    },
    ['departments-with-stats'],
    {
      revalidate: 60 * 30, // 30 minutes
      tags: ['departments', 'artisans']
    }
)

export const getMapData = unstable_cache(
    async () => {
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

      console.log(`✅ Loaded map data for ${result.length} departments (cached)`);
      return result;
    },
    ['map-data'],
    {
      revalidate: 60 * 30, // 30 minutes
      tags: ['departments', 'artisans']
    }
)

// ⭐ BONUS - Cache pour les stats de département (si utilisé)
export const getDepartmentStats = unstable_cache(
    async (departmentId: number) => {
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

      console.log(`✅ Loaded department stats: ${result.has_artisan} artisans (cached)`);
      return result;
    },
    ['department-stats'],
    {
      revalidate: 60 * 60 * 6, // 6 heures
      tags: ['artisans']
    }
);

// ===== FONCTIONS NON CACHÉES (ADMIN/MUTATIONS) ===== //

export async function createContactRequest(data: any) {
  return prisma.contactRequest.create({
    data: {
      artisanId: data.artisan_id,
      clientName: data.client_name,
      clientEmail: data.client_email,
      clientPhone: data.client_phone,
      projectType: data.project_type,
      projectDescription: data.project_description,
      budgetRange: data.budget_range,
      urgency: data.urgency,
      preferredContact: data.preferred_contact,
      status: "new"
    },
    include: {
      artisan: true
    }
  })
}

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
        createdAt: 'desc'
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

export async function updateArtisanStatus(artisanId: number, status: string) {
  if(status==="rejected"){
    return prisma.artisan.delete({
      where: { id: artisanId }
    })
  }
  return prisma.artisan.update({
    where: { id: artisanId },
    data: {
      status,
      updatedAt: new Date()
    }
  })
}

export async function updateArtisanActiveStatus(artisanId: number, active: boolean) {
  return prisma.artisan.update({
    where: { id: artisanId },
    data: {
      active,
      updatedAt: new Date()
    }
  })
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

export async function updateContactRequestStatus(requestId: number, status: string) {
  return prisma.contactRequest.update({
    where: { id: requestId },
    data: { status }
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

export async function deleteArtisan(artisanId: number) {
  return prisma.artisan.delete({
    where: { id: artisanId }
  })
}

export async function createArtisan(data: {
  company_name: string
  contact_name?: string
  email?: string
  phone?: string
  address?: string
  postal_code?: string
  city?: string
  department_id?: number
  website?: string
  description?: string
  services?: string[]
  years_experience?: number
  certifications?: string[]
  insurance_valid?: boolean
  siret?: string
  status?: string
  active?: boolean
}) {
  return prisma.artisan.create({
    data: {
      companyName: data.company_name,
      contactName: data.contact_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      postalCode: data.postal_code,
      city: data.city,
      departmentId: data.department_id,
      website: data.website,
      description: data.description,
      services: data.services || [],
      yearsExperience: data.years_experience,
      certifications: data.certifications || [],
      insuranceValid: data.insurance_valid || false,
      siret: data.siret,
      status: data.status || "pending",
      active: data.active || false
    }
  })
}

export async function updateArtisanInfo(artisanId: number, data: {
  companyName?: string
  contactName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  profileImage?: string
}) {
  const updateData: any = {
    updatedAt: new Date()
  }

  if (data.companyName !== undefined) {
    updateData.companyName = data.companyName
  }
  if (data.contactName !== undefined) {
    updateData.contactName = data.contactName
  }
  if (data.email !== undefined) {
    updateData.email = data.email
  }
  if (data.phone !== undefined) {
    updateData.phone = data.phone
  }
  if (data.address !== undefined) {
    updateData.address = data.address
  }
  if (data.city !== undefined) {
    updateData.city = data.city
  }
  if (data.profileImage !== undefined) {
    updateData.profileImage = data.profileImage
  }

  return prisma.artisan.update({
    where: { id: artisanId },
    data: updateData,
    include: {
      department: true
    }
  })
}