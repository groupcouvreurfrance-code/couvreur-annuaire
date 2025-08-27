// lib/actions/admin.ts
'use server'

import {revalidatePath, revalidateTag} from 'next/cache'
import prisma from '@/lib/prisma'
import {invalidateArtisan} from "@/lib/database";




// ===== ACTIONS ARTISANS ===== //

export async function updateArtisanStatus(artisanId: number, status: string) {
    try {
        console.log(`🔄 Updating artisan ${artisanId} status to: ${status}`);

        let result;

        if (status === "rejected") {
            result = await prisma.artisan.delete({
                where: { id: artisanId }
            })
        } else {
            result = await prisma.artisan.update({
                where: { id: artisanId },
                data: {
                    status,
                    updatedAt: new Date()
                }
            })
        }

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidateTag('artisan');
        revalidateTag('department');
        revalidateTag('artisans-global')


        console.log(`✅ Artisan ${artisanId} status updated successfully`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating artisan status:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

export async function updateArtisanActiveStatus(artisanId: number, active: boolean) {
    try {
        console.log(`🔄 Updating artisan ${artisanId} active status to: ${active}`);

        const result = await prisma.artisan.update({
            where: { id: artisanId },
            data: {
                active,
                updatedAt: new Date()
            }
        })

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')

        console.log(`✅ Artisan ${artisanId} active status updated successfully`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating artisan active status:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

export async function deleteArtisan(artisanId: number) {
    try {
        console.log(`🗑️ Deleting artisan ${artisanId}`);

        const result = await prisma.artisan.delete({
            where: { id: artisanId }
        })

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')

        console.log(`✅ Artisan ${artisanId} deleted successfully`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error deleting artisan:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
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
    featured?: boolean
    active?: boolean
}) {
    try {
        console.log(`🆕 Creating new artisan: ${data.company_name}`);

        const result = await prisma.artisan.create({
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
                featured: data.featured || false,
                active: data.active || false
            }
        })

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')

        console.log(`✅ Artisan created successfully: ${result.companyName}`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error creating artisan:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

export async function updateArtisanInfo(artisanId: number, data: {
    companyName?: string
    contactName?: string
    email?: string
    phone?: string
    address?: string
    city?: string
    profileImage?: string
    website?: string
    description?: string
    yearsExperience?: number
    services?: string[]
    featured?: boolean
}) {
    try {
        console.log(`🔄 Updating artisan ${artisanId} info`);

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
        if (data.website !== undefined) {
            updateData.website = data.website
        }
        if (data.description !== undefined) {
            updateData.description = data.description
        }
        if (data.yearsExperience !== undefined) {
            updateData.yearsExperience = data.yearsExperience
        }
        if (data.services !== undefined) {
            updateData.services = data.services
        }
        if (data.featured !== undefined) {
            updateData.featured = data.featured
        }

        const result = await prisma.artisan.update({
            where: { id: artisanId },
            data: updateData,
            include: {
                department: true
            }
        })

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')
        revalidateTag('artisan');
        revalidateTag('department');
        revalidateTag('artisans-global')

        console.log(`✅ Artisan ${artisanId} info updated successfully`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating artisan info:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

// Action spécifique pour mettre à jour uniquement le statut "featured"
export async function updateArtisanFeaturedStatus(artisanId: number, featured: boolean) {
    try {
        console.log(`🔄 Updating artisan ${artisanId} featured status to: ${featured}`);

        const result = await prisma.artisan.update({
            where: { id: artisanId },
            data: {
                featured,
                updatedAt: new Date()
            }
        })

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/artisans')

        console.log(`✅ Artisan ${artisanId} featured status updated successfully`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating artisan featured status:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

// ===== ACTIONS CONTACT REQUESTS ===== //

export async function updateContactRequestStatus(requestId: number, status: string) {
    try {
        console.log(`🔄 Updating contact request ${requestId} status to: ${status}`);

        const result = await prisma.contactRequest.update({
            where: { id: requestId },
            data: { status }
        })

        // 🔄 Revalidate admin pages
        revalidatePath('/admin')
        revalidatePath('/admin/requests')


        console.log(`✅ Contact request ${requestId} status updated successfully`);
        return { success: true, data: result }

    } catch (error) {
        console.error(`❌ Error updating contact request status:`, error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}