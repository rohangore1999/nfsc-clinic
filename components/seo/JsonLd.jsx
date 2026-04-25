/**
 * Renders JSON-LD as a server-side <script> tag so crawlers see it on first byte.
 * Usage:
 *   <JsonLd data={clinicSchema()} />
 */
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
