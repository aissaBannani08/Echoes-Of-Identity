import HomeClient from "./HomeClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Echoes of Identity | Home",
  description: "An international oral history, cultural preservation, and storytelling initiative documenting the lived experiences of Jewish and Muslim communities worldwide.",
  alternates: {
    canonical: "https://echoesofidentity.org/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Echoes of Identity",
    "alternateName": ["EOI", "Echoes of Identity Initiative"],
    "url": "https://www.echoesofidentity.org",
    "description": "An international oral history, cultural preservation, and storytelling initiative documenting the lived experiences of Jewish and Muslim communities worldwide.",
    "foundingDate": "2023",
    "keywords": "oral history, Jewish community, Muslim community, cultural preservation, storytelling, diaspora, immigration, identity, youth nonprofit",
    "audience": {
      "@type": "Audience",
      "audienceType": "High school students, researchers, historians, educators, Jewish communities, Muslim communities"
    },
    "knowsAbout": [
      "Oral history", "Jewish diaspora", "Muslim diaspora",
      "Cultural preservation", "Intergenerational storytelling",
      "Holocaust testimony", "Immigration narratives",
      "Identity and belonging", "Interfaith coexistence"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
