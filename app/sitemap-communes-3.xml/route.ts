import prisma from '@/lib/prisma'
import {NextResponse} from "next/server";

export async function GET() {
    const baseUrl = 'https://www.couvreur-groupefrance.com'

    const communes = await prisma.commune.findMany({
        select: { slug: true, createdAt: true },
        skip: 18000,
        take: 9000,
        orderBy: { slug: 'asc' }
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${communes.map(commune => `  <url>
    <loc>${baseUrl}/commune/${commune.slug}</loc>
    <lastmod>${commune.createdAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: { 'Content-Type': 'application/xml' }
    })
}