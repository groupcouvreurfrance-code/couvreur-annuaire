import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
    const baseUrl = 'https://www.couvreur-groupefrance.com'

    // Récupère les communes
    const communes = await prisma.commune.findMany({
        select: { slug: true },
        take: 9000,
        orderBy: { slug: 'asc' }
    })

    // Génère le sitemap avec lastmod = date du jour pour forcer le re-crawl
    const today = new Date().toISOString()

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${communes
        .map(
            commune => `  <url>
    <loc>${baseUrl}/commune/${commune.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
        )
        .join('\n')}
</urlset>
`

    // Retourne le XML avec Content-Type correct et newline final
    return new NextResponse(sitemap + '\n', {
        headers: { 'Content-Type': 'application/xml' }
    })
}
