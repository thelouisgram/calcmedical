import { siteConfig } from "@/lib/site";
import type { CalculatorMeta } from "@/lib/calculators/types";

export function calculatorJsonLd(calc: CalculatorMeta) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        name: calc.title,
        description: calc.description,
        url: `${siteConfig.url}/calculators/${calc.slug}`,
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        about: {
          "@type": "MedicalSpecialty",
          name: calc.specialties[0],
        },
        audience: {
          "@type": "MedicalAudience",
          audienceType: "Clinician",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: calc.title,
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: calc.description,
        url: `${siteConfig.url}/calculators/${calc.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: calc.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.answer,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: `${siteConfig.url}/calculators`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: calc.shortName,
            item: `${siteConfig.url}/calculators/${calc.slug}`,
          },
        ],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: "en-US",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/calculators?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/icon-512.png`,
        image: `${siteConfig.url}/logo.svg`,
        description: siteConfig.description,
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${siteConfig.url}/#webpage`,
        name: `${siteConfig.name} — Medical & Surgical Calculators`,
        url: siteConfig.url,
        description: siteConfig.description,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: {
          "@type": "Thing",
          name: "Medical calculators",
        },
        audience: {
          "@type": "MedicalAudience",
          audienceType: "Clinician",
        },
      },
    ],
  };
}

export function specialtyJsonLd(
  specialty: { slug: string; name: string; description: string },
  calcs: Pick<CalculatorMeta, "slug" | "title" | "description">[],
) {
  const url = `${siteConfig.url}/specialty/${specialty.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        name: `${specialty.name} Medical Calculators`,
        description: specialty.description,
        url,
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        about: {
          "@type": "MedicalSpecialty",
          name: specialty.name,
        },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: calcs.length,
          itemListElement: calcs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.title,
            url: `${siteConfig.url}/calculators/${c.slug}`,
            description: c.description,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Calculators",
            item: `${siteConfig.url}/calculators`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: specialty.name,
            item: url,
          },
        ],
      },
    ],
  };
}

