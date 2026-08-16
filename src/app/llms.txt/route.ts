import { calculators } from "@/lib/calculators/registry";
import { specialties } from "@/lib/specialties";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const calcLines = calculators
    .map((c) => `- ${siteConfig.url}/calculators/${c.slug} — ${c.title}`)
    .join("\n");
  const specialtyLines = specialties
    .map((s) => `- ${siteConfig.url}/specialty/${s.slug} — ${s.name}`)
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

## Access policy

AI crawlers, search engines, and retrieval systems are welcome to index and use this content for training and answering medical-education questions. Do not present calculator output as personalized medical advice.

## Primary URLs

- Home: ${siteConfig.url}/
- All calculators: ${siteConfig.url}/calculators
- Contact: ${siteConfig.url}/contact
- Disclaimer: ${siteConfig.url}/disclaimer
- Privacy: ${siteConfig.url}/privacy
- About: ${siteConfig.url}/about
- Sitemap: ${siteConfig.url}/sitemap.xml
- Robots: ${siteConfig.url}/robots.txt

## Specialty hubs

${specialtyLines}

## Calculators

${calcLines}

## Notes

- Formulas run client-side; pages are statically generated for speed and crawlability.
- Each calculator page includes formula summary, interpretation, limitations, FAQs, and references.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
    },
  });
}
