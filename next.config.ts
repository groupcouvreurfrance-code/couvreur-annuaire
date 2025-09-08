import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // Ignore complètement les erreurs ESLint au build
    },
    typescript: {
        ignoreBuildErrors: true, // Ignore aussi les erreurs TypeScript
    },
    async headers() {
        return [
            {
                // Appliquer à toutes les pages
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'index, follow', // Forcer l'indexation par Google
                    },
                ],
            },
            {
                // Appliquer spécifiquement aux pages de l'annuaire
                source: '/commune/:slug*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=31536000, stale-while-revalidate', // 1 an, aligné avec revalidate
                    },
                ],
            },
            {
                // Appliquer spécifiquement aux pages de l'annuaire
                source: '/departement/:slug*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 's-maxage=31536000, stale-while-revalidate', // 1 an, aligné avec revalidate
                    },
                ],
            },
        ];
    },
};

export default nextConfig;