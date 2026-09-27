/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/career", destination: "/", permanent: true },
      { source: "/projects", destination: "/", permanent: true },
      { source: "/contact", destination: "/#elsewhere", permanent: true },
      { source: "/redesign", destination: "/", permanent: false },
    ]
  },
}

export default nextConfig
