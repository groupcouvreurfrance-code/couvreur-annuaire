import {getAllDepartments} from "@/lib/database";
import {NextResponse} from "next/server";

export async function GET() {
    const baseUrl = 'https://couvreursfrance.fr'
    const { departments } = await getAllDepartments(1, 100)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${departments.map(dept => `  <url>
    <loc>${baseUrl}/departement/${dept.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: { 'Content-Type': 'application/xml' }
    })
}