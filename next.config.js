/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')

const API_PATH = process.env.NEXT_PUBLIC_API_BASE_URL || 'ENV NOT FOUND'

if (API_PATH === 'ENV NOT FOUND') {
  throw new Error('NEXT_PUBLIC_API_BASE_URL not found in .env*')
}

const nextConfig = {
  async rewrites() {
    //Resolving Cors problem
    return [
      {
        source: '/api/:path*',
        destination: API_PATH + '/:path*',
      },
    ]
  },
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: resolve('./node_modules/react'),
    }
    return config
  },
}

module.exports = nextConfig