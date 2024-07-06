/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  staticPageGenerationTimeout: 480,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig