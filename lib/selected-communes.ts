import communesData from "../public/data/communes.json"

const COMMUNES_PER_DEPT = 50;

// 50 communes par département — utilisé par generateStaticParams ET les pages département
let _selectedSlugs: Set<string> | null = null;

export function getSelectedCommuneSlugs(): Set<string> {
    if (_selectedSlugs) return _selectedSlugs;
    const byDept: Record<string, any[]> = {};
    for (const commune of communesData as any[]) {
        const dept = commune.departmentCode;
        if (!byDept[dept]) byDept[dept] = [];
        if (byDept[dept].length < COMMUNES_PER_DEPT) byDept[dept].push(commune);
    }
    _selectedSlugs = new Set(Object.values(byDept).flat().map(c => c.slug));
    return _selectedSlugs;
}

export function getSelectedCommuneParams() {
    const byDept: Record<string, any[]> = {};
    for (const commune of communesData as any[]) {
        const dept = commune.departmentCode;
        if (!byDept[dept]) byDept[dept] = [];
        if (byDept[dept].length < COMMUNES_PER_DEPT) byDept[dept].push(commune);
    }
    return Object.values(byDept).flat().map((commune: any) => ({
        slug: commune.slug,
    }));
}
