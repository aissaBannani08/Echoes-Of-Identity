"use client";

import { useState } from "react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ScrollSequence";
import ArchiveSection from "@/components/ArchiveSection";
import HistoricalContext from "@/components/HistoricalContext";
import MapSection from "@/components/MapSection";
import FaqSection from "@/components/FaqSection";
import GetInvolved from "@/components/GetInvolved";
import DonationsSection from "@/components/DonationsSection";
import Footer from "@/components/Footer";
import SEOKeywords from "@/components/SEOKeywords";

const homeKeywords = [
  "Echoes of Identity", "Jewish oral history", "Muslim oral history", "interfaith storytelling",
  "cultural preservation", "digital archive", "MENA diaspora", "intergenerational stories",
  "youth nonprofit", "community storytelling", "identity and belonging", "cultural heritage",
  "historical preservation", "peace and coexistence", "educational initiative", "storytelling platform"
];


export default function HomeClient() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="w-full bg-midnight min-h-screen text-parchment selection:bg-gold selection:text-midnight">
      {loading ? (
        <Loader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <ScrollSequence />
          <ArchiveSection />
          <HistoricalContext />
          <MapSection />
          <FaqSection />
          <GetInvolved />
          <DonationsSection />
          <Footer />
          <SEOKeywords keywords={homeKeywords} />
        </>
      )}
    </main>
  );
}
