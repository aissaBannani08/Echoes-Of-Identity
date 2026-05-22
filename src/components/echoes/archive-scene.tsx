"use client";

import { motion } from "framer-motion";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { MemoryConstellation } from "@/components/echoes/memory-constellation";
import { Sparkles, BookOpen, MapPin, MousePointer2 } from "lucide-react";
import Link from "next/link";

export function ArchiveScene() {
  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black">
      {/* 1. FULL SCREEN IMMERSIVE BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <MemoryConstellation />
      </div>

      {/* 2. OVERLAY CONTENT (CINEMATIC TITLES - SCALED) */}
      <div className="relative z-10 w-full max-w-6xl px-8 md:px-16 pointer-events-none">
        <div className="flex flex-col items-start max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Sparkles size={12} className="text-gold/60 animate-pulse" />
              <span className="font-inter text-[8px] uppercase tracking-[0.5em] text-gold/40 font-bold italic">Volume I</span>
            </div>
            
            <h1 className="font-cinzel text-6xl md:text-8xl text-white leading-[0.85] mb-8 tracking-tighter drop-shadow-2xl">
              The Stories <br /> <span className="text-gold italic drop-shadow-glow-gold/10">We Carry</span>
            </h1>
            
            <p className="font-inter text-white/40 text-base md:text-lg leading-relaxed max-w-md mb-12 font-light drop-shadow-md">
              A suspended constellation of oral histories, migration routes, and inherited identity.
            </p>

            <div className="flex flex-wrap gap-10 mb-12 opacity-60">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gold/80">
                  <MapPin size={12} />
                  <span className="font-inter text-[9px] uppercase tracking-widest font-bold">Migration</span>
                </div>
                <span className="text-white/30 text-[9px] uppercase tracking-widest">Documenting routes</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-gold/80">
                  <BookOpen size={12} />
                  <span className="font-inter text-[9px] uppercase tracking-widest font-bold">Legacy</span>
                </div>
                <span className="text-white/30 text-[9px] uppercase tracking-widest">Inherited identity</span>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="pointer-events-auto"
            >
              <Link href="/archive" passHref legacyBehavior>
                <GlassButton 
                  className="font-cinzel text-[11px] tracking-[0.3em] uppercase min-w-[240px]"
                >
                  Enter the Archive
                  <div className="w-6 h-px bg-white/30" />
                </GlassButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 3. INTERACTION HINT */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-12 right-12 flex items-center gap-4 text-white/20 font-inter text-[9px] uppercase tracking-[0.4em] z-20"
      >
        <MousePointer2 size={12} className="animate-bounce" />
        <span>Interact with the suspended fragments</span>
      </motion.div>

      {/* Vignette to focus on center and left text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-[5]" />
    </section>
  );
}
