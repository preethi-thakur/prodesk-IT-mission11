/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@reduxjs/toolkit', 'react-redux'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.omdbapi.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Disable image optimization for external URLs if needed
    unoptimized: process.env.NODE_ENV === 'development',
  },
}

export default nextConfig