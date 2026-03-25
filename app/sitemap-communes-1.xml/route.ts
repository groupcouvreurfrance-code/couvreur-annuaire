import { getSelectedCommuneParams } from "@/lib/selected-communes"
import {NextResponse} from "next/server";

export async function GET() {
    const baseUrl = 'https://www.couvreur-groupefrance.com'
    const communes = getSelectedCommuneParams();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${communes.map(commune => `  <url>
    <loc>${baseUrl}/commune/${commune.slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')}
</urlset>`

    return new NextResponse(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600'
        }
    })
}
