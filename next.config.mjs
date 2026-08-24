/** @type {import('next').NextConfig} */

// The content pages that participate in Accept-based markdown negotiation.
// These must advertise `Vary: Accept` so a CDN never serves the cached HTML
// variant to an agent asking for `text/markdown` (or vice versa).
const NEGOTIATED_PATHS = ["/", "/about", "/career", "/projects", "/contact", "/privacy"]

// Baseline hardening headers applied to every route (defense-in-depth).
const baseSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
]

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
    return [
      {
        source: "/:path*",
        headers: baseSecurityHeaders,
      },
      // Merge `Accept` into Vary at the response layer so it survives regardless
      // of the RSC tokens Next.js adds. Next.js combines multiple `Vary` values.
      ...NEGOTIATED_PATHS.map((source) => ({
        source,
        headers: [{ key: "Vary", value: "Accept, Accept-Encoding" }],
      })),
    ]
  },
}

export default nextConfig
