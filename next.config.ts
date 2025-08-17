// next.config.ts
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
        ];
    },
};

export default nextConfig;
