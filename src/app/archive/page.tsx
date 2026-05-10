"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArchiveScene } from "@/components/echoes/archive-scene";
import { MemoryConstellation } from "@/components/echoes/memory-constellation";
import { SpotlightMouse } from "@/components/ui/spotlight";
import { Sparkles, ArrowDown, ExternalLink } from "lucide-react";
import Image from "next/image";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

// Reusing data from previous version for consistency
const featuredStories = [
  {
    year: "1948",
    title: "The Exodus of Casablanca",
    location: "Casablanca, Morocco",
    excerpt: "A collection of personal artifacts and oral histories documenting the departure of families from the old Mellah.",
    image: "/images/archive/archive_hero_building.png"
  },
  {
    year: "1962",
    title: "Echoes of Constantine",
    location: "Constantine, Algeria",
    excerpt: "Preserving the musical traditions and culinary heritage of the Jewish-Muslim shared spaces.",
    image: "/images/archive/archive_quote_portrait.png"
  },
  {
    year: "1924",
    title: "The Baghdadi Letters",
    location: "Baghdad, Iraq",
    excerpt: "Correspondence between merchants and families that bridges the gap between old Mesopotamia and the modern world.",
    image: "/images/archive/identity_bg_1778361042192.png"
  }
];

const GrainOverlay = () => (
  <div 
    className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[100]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

export default function ArchivePage() {
  return (
    <main className="w-full bg-[#05070A] min-h-screen text-parchment relative overflow-hidden selection:bg-gold selection:text-midnight">
      <GrainOverlay />
      <Navbar />

      {/* SECTION 1: Minimal Intro with Background */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
        {/* MemoryConstellation Background with Photo */}
        <div className="absolute inset-0 z-0 opacity-60">
           <MemoryConstellation usePhoto={true} />
        </div>
        
        <div className="absolute inset-0 z-10 pointer-events-none">
           <SpotlightMouse className="from-gold/5 via-transparent to-transparent" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center relative z-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold/30" />
            <span className="font-inter text-[9px] uppercase tracking-[0.6em] text-gold/60 font-bold italic">Volume I</span>
            <div className="h-px w-8 bg-gold/30" />
          </div>
          
          <h1 className="font-cinzel text-5xl md:text-8xl leading-none mb-4 tracking-tighter drop-shadow-2xl">
            Archive
          </h1>
          <p className="font-cormorant text-lg md:text-2xl text-parchment/40 italic font-light drop-shadow-md">
            "Echoes that bridge the silence of time."
          </p>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 opacity-20 z-20"
        >
          <span className="font-inter text-[8px] uppercase tracking-[0.4em]">Scroll to enter</span>
          <ArrowDown size={12} />
        </motion.div>
      </section>

      {/* SECTION 2: Interactive Memory Constellation */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#05070A] to-transparent z-20" />
        <ArchiveScene />
      </section>

      {/* SECTION 3: Featured Oral Histories */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="font-cinzel text-4xl text-white mb-3">Featured Records</h2>
            <div className="h-0.5 w-16 bg-gold" />
          </div>
          <p className="font-inter text-parchment/40 text-[11px] max-w-xs font-light uppercase tracking-wider">
            Selected archives from the MENA diaspora across generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredStories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 shadow-2xl border border-white/5">
                <Image 
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 brightness-50 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-all duration-700" />
                <div className="absolute top-4 left-4 font-cinzel text-xl text-gold/80">
                  [{story.year}]
                </div>
              </div>
              
              <h3 className="font-cinzel text-xl text-parchment mb-3 group-hover:text-gold transition-colors tracking-tight">
                {story.title}
              </h3>
              <p className="font-inter text-parchment/40 text-[11px] leading-relaxed mb-4 font-light">
                {story.excerpt}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: Migration and Identity Themes */}
      <section className="py-24 relative overflow-hidden bg-black/40">
        <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
           <div className="w-full lg:w-1/2">
             <div className="relative aspect-square max-w-sm mx-auto rounded-xl overflow-hidden border border-white/5 shadow-3xl group">
                <div className="absolute inset-0 z-0">
                   <MemoryConstellation isInteractive={true} usePhoto={true} photoPath="/memory.jpeg" />
                </div>
                {/* Subtle vignette for the box */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
             </div>
           </div>
           
           <div className="w-full lg:w-1/2">
             <span className="font-inter text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-4 block font-bold">Themes</span>
             <h2 className="font-cinzel text-4xl md:text-5xl text-white mb-8 leading-tight">
               Identity & <br /> <span className="text-gold italic">Preservation</span>
             </h2>
             
             <div className="space-y-8">
               {[
                 { title: "Inherited Memory", desc: "How stories of the MENA region are passed down through generations." },
                 { title: "Cultural Resilience", desc: "The preservation of traditions in the face of displacement." },
                 { title: "Sacred Spaces", desc: "Documenting shared heritage across faith and culture." }
               ].map((theme, i) => (
                 <div key={i} className="flex gap-4 group">
                   <div className="text-gold/20 font-cinzel text-xl pt-1">0{i+1}</div>
                   <div>
                     <h4 className="font-cinzel text-base text-white mb-1 group-hover:text-gold transition-colors tracking-wide">{theme.title}</h4>
                     <p className="font-inter text-parchment/30 text-[11px] leading-relaxed max-w-sm font-light">{theme.desc}</p>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* SECTION 5: Contribution CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto px-6 relative z-10"
        >
          <h2 className="font-cinzel text-4xl md:text-6xl text-parchment mb-8">Add your voice to the archive.</h2>
          <p className="font-inter text-parchment/60 mb-12 text-base md:text-lg leading-relaxed font-light">
            Every story matters. Join our living museum by contributing your records, photographs, or personal testimonies.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <GlassButton 
              className="font-cinzel text-xs tracking-[0.3em] uppercase px-12 py-6"
            >
              Become a Contributor
            </GlassButton>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
      
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 15s linear infinite;
        }
      `}</style>
    </main>
  );
}
