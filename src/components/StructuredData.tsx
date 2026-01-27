import { useEffect } from "react";
import { SITE_LINKS, SOCIAL_LINKS } from "@/constants/links";

interface StructuredDataProps {
  type: "Organization" | "LocalBusiness" | "NGO";
  data?: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const defaultOrganizationData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Maji Safi Solutions",
      url: SITE_LINKS.baseUrl,
      logo: SITE_LINKS.logo,
      description:
        "Maji Safi Solutions brings clean water access to underserved communities. Join our mission to provide safe drinking water and sanitation solutions.",
      sameAs: [
        SOCIAL_LINKS.facebook,
        SOCIAL_LINKS.twitter,
        SOCIAL_LINKS.instagram,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "info@majisafisolutions.com",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "KE",
        addressRegion: "Kenya",
      },
    };

    const defaultNGOData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Maji Safi Solutions",
      url: SITE_LINKS.baseUrl,
      description:
        "Maji Safi Solutions is dedicated to providing clean water and sanitation solutions to underserved communities.",
      areaServed: "Africa",
    };

    let structuredData: Record<string, unknown> = defaultOrganizationData;

    if (type === "NGO") {
      structuredData = defaultNGOData;
    }

    if (data) {
      structuredData = { ...structuredData, ...data };
    }

    // Remove existing schema if present
    let script = document.querySelector(
      'script[type="application/ld+json"]',
    ) as HTMLScriptElement;
    if (script) {
      script.remove();
    }

    // Create and append new schema
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      script?.remove();
    };
  }, [type, data]);

  return null;
}
