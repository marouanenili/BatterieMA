import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        // Ignore les erreurs ESLint pendant le build Vercel
        ignoreDuringBuilds: true,
    },
    images: {
        // Autorise les domaines externes d’images
        domains: ["www.riampa-auto.com"],
    },
};

export default nextConfig;
