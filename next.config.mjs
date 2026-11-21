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
  experimental: {
    viewTransition: true,
  },
  async headers() {
    // Advertises the Markdown twin and the agent guide to clients that read HTTP
    // Link headers (RFC 8288). There is no `Vary: Accept` here on purpose: Vercel
    // serves prerendered pages with their own Vary and drops this one. The
    // Markdown and 406 responses set it themselves.
    const discovery = (markdown) => [
      {
        key: "Link",
        value: `<${markdown}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain"`,
      },
    ]
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      { source: "/", headers: discovery("/index.md") },
      { source: "/inspiration", headers: discovery("/inspiration.md") },
      { source: "/privacy", headers: discovery("/privacy.md") },
    ]
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
