/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/console/api/:path*',
        destination: 'http://localhost:5001/console/api/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8800/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
