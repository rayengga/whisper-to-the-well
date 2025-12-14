/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable serverless functions for API routes
  experimental: {
    serverComponentsExternalPackages: ['@xenova/transformers'],
  },
  // Increase API timeout for model loading (first request)
  serverRuntimeConfig: {
    apiTimeout: 60000, // 60 seconds
  },
}

module.exports = nextConfig
