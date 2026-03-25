import communesData from "../../public/data/communes.json"
import {NextResponse} from "next/server";

// Même logique que generateStaticParams : 50 communes par département
function getSelectedCommunes() {
    const byDept: Record<string, any[]> = {};
    for (const commune of communesData as any[]) {
        const dept = commune.departmentCode;
        if (!byDept[dept]) byDept[dept] = [];
        if (byDept[dept].length < 50) byDept[dept].push(commune);
    }
    return Object.values(byDept).flat();
}

export async function GET() {
    const baseUrl = 'https://www.couvreur-groupefrance.com'
    const communes = getSelectedCommunes();

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
