import { useEffect } from "react";

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
      url: "https://maji-safi-solutions.com",
      logo: "https://maji-safi-solutions.com/logo.png",
      description:
        "Maji Safi Solutions brings clean water access to underserved communities. Join our mission to provide safe drinking water and sanitation solutions.",
      sameAs: [
        "https://www.facebook.com/majisafisolutions",
        "https://www.twitter.com/majisafisolutions",
        "https://www.instagram.com/majisafisolutions",
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

    const defaultNGOData = {
      "@context": "https://schema.org",
      "@type": "NGO",
      name: "Maji Safi Solutions",
      url: "https://maji-safi-solutions.com",
      description:
        "Maji Safi Solutions is dedicated to providing clean water and sanitation solutions to underserved communities.",
      areaServed: "Africa",
    };

    let structuredData = defaultOrganizationData;

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
