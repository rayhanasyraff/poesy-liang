import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
    images: {
        remotePatterns: [new URL('https://mnv07ssja2.ufs.sh/f/**')],
    },
};

export default nextConfig;
