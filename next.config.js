/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/fcvalue_nextjs',
}

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
