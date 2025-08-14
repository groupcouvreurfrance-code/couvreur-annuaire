// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // ⬅ Ignore complètement les erreurs ESLint au build
    },
    typescript: {
        ignoreBuildErrors: true, // ⬅ Ignore aussi les erreurs TypeScript
    },
};

export default nextConfig;
