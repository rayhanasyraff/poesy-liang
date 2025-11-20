import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
    images: {
        remotePatterns: [new URL('https://mnv07ssja2.ufs.sh/f/**')],
    },
    async rewrites() {
        return [
            // Case-insensitive routing for /RTC/ -> /rtc/
            {
                source: '/RTC/:path*',
                destination: '/rtc/:path*',
            },
            // Case-insensitive routing for /projects/
            {
                source: '/PROJECTS/:path*',
                destination: '/projects/:path*',
            },
            {
                source: '/Projects/:path*',
                destination: '/projects/:path*',
            },
            // Case-insensitive routing for /rtc/ variations
            {
                source: '/Rtc/:path*',
                destination: '/rtc/:path*',
            },
        ];
    },
};

export default nextConfig;
