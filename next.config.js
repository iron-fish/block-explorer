const { resolve } = require('path')

/** @type {import('next').NextConfig} */
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
