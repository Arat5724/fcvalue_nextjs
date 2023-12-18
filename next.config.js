/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fcvalue_nextjs',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ssl.nexon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nexon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fco.dn.nexoncdn.co.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fcvalue.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig