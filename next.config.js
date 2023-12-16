/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fcvalue.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'arat5724.github.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
}
