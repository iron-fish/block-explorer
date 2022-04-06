/** @type {import('next').NextConfig} */
const { resolve } = require('path')

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      react: resolve('./node_modules/react')
    }
    return config
  },
}

module.exports = nextConfig