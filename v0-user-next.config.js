/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@vercel/postgres"],
  // Explicitly exclude problematic packages from the server bundle
  experimental: {
    serverComponentsExternalPackages: ["pg", "pg-native", "libpq"],
  },
}

module.exports = nextConfig

