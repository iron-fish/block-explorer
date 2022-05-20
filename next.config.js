/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolve } = require('path')

const nextConfig = {
  async rewrites() {
    //Resolving Cors problem
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL + '/:path*',
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
