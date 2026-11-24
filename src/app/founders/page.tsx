// src/app/founders/page.tsx


import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

export const metadata: Metadata = {
  title: "The People Behind Echoes of Identity",
  description: "Meet co‑founders Aissa B. and Emma S., the visionaries shaping Echoes of Identity.",
  robots: "index, follow",
};

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-midnight text-parchment selection:bg-gold selection:text-midnight">
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 70%, rgba(125,78,36,0.08) 0%, transparent 55%),
            #0E1520`
        }}
      />

      <Navbar />

      <section className="max-w-4xl mx-auto py-20 px-4 md:px-8 space-y-12">
        <h1 className="text-5xl md:text-6xl font-cinzel text-gold text-center mb-8">
          The People Behind Echoes of Identity
        </h1>

        {/* Intro paragraph */}
        <p className="text-lg font-inter text-parchment/80 text-center">
          Echoes of Identity is a collaborative, youth‑led initiative preserving the oral histories of Jewish and Muslim
          communities worldwide. It was founded by two friends who share a deep commitment to cultural memory and social
          justice.
        </p>

        {/* Shared vision section */}
        <section className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-gold/10">
          <h2 className="text-3xl font-cinzel text-gold mb-4 text-center">
            A Shared Vision, A Shared Responsibility
          </h2>
          <p className="font-inter text-parchment/70 leading-relaxed text-center">
                As co-founders, Aissa and Emma share a commitment to preserving stories, celebrating cultural heritage, and making sure that voices and experiences are not forgotten. Echoes of Identity reflects their shared belief in the importance of history, memory, and understanding between communities.
          </p>
        </section>

        {/* Founder bios - using initials‑based graphics */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Aissa B. */}
          <article className="relative rounded-2xl overflow-hidden border border-white/5 bg-black/40 backdrop-blur-xl p-8">
            {/* Decorative circular badge */}
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold/10 blur-3xl" />
            <div className="flex flex-col items-center space-y-4">
              {/* Initials avatar */}
              <div className="w-24 h-24 rounded-full bg-gold/30 flex items-center justify-center text-2xl font-cinzel text-midnight">
                AB
              </div>
              <h3 className="text-2xl font-cinzel text-gold">Aissa B.</h3>
              <p className="font-inter text-parchment/70 text-center">
                Aissa B. is a student at Manar High School in Tunisia. He has a strong interest in history, identity, and the personal stories that connect people to their past. He believes that preserving people's memories and experiences is important to helping future generations understand different cultures and communities.
              </p>
            </div>
          </article>

          {/* Emma S. */}
          <article className="relative rounded-2xl overflow-hidden border border-white/5 bg-black/40 backdrop-blur-xl p-8">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold/10 blur-3xl" />
            <div className="flex flex-col items-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-gold/30 flex items-center justify-center text-2xl font-cinzel text-midnight">
                ES
              </div>
              <h3 className="text-2xl font-cinzel text-gold">Emma S.</h3>
              <p className="font-inter text-parchment/70 text-center">
                Emma S. is a student at Bronx Science High School in New York. She has a strong interest in history, cultural heritage, and the stories that shape people's identities. She believes that listening to different perspectives and preserving personal experiences can help people better understand one another.
              </p>
            </div>
          </article>
        </div>

        {/* Call‑to‑action */}
        <div className="flex justify-center mt-8">
          <GlassButton
            size="lg"
            className="font-cinzel uppercase tracking-wider text-midnight bg-gold hover:bg-gold/80 transition"
          >
            Join the Archive →
          </GlassButton>
        </div>
      </section>

      <Footer />
    </main>
  );
}
