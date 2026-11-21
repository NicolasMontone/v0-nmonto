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
  async headers() {
    // Advertises the Markdown twin and the agent guide to clients that read HTTP
    // Link headers (RFC 8288), and marks the page URL as varying on Accept.
    const discovery = (markdown) => [
      {
        key: "Link",
        value: `<${markdown}>; rel="alternate"; type="text/markdown", </llms.txt>; rel="describedby"; type="text/plain"`,
      },
      { key: "Vary", value: "Accept" },
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
