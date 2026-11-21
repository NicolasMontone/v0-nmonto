// Renders a JSON-LD <script> in the server-rendered HTML so crawlers and agents
// can parse the site's identity without executing JavaScript.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from static, trusted site data (lib/schema.ts).
      // Escaping "<" still guarantees no value can close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
