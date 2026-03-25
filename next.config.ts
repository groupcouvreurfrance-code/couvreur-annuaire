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
    async rewrites() {
        return {
            beforeFiles: [
                // Bloquer tous les bots AI qui consomment des ressources sans valeur SEO
                {
                    source: '/(.*)',
                    has: [
                        {
                            type: 'header',
                            key: 'user-agent',
                            value: '(?i).*(GPTBot|ChatGPT-User|CCBot|meta-externalagent|anthropic-ai|ClaudeBot|PerplexityBot|oai-searchbot|Bytespider|Applebot-Extended|Baiduspider).*',
                        },
                    ],
                    destination: '/403',
                },
            ],
            afterFiles: [],
            fallback: [],
        };
    },
    experimental: {
        workerThreads: false,
        cpus: 1
    }
};

export default nextConfig;