/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.espncdn.com',
                port: '',
                pathname: '/i/teamlogos/nba/**',
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        appDir: true,
    },
}
