'use client';

import { motion } from 'framer-motion';

export default function EditorialHero() {
  return (
    <section
      className="relative min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-20 px-6 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Radial background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full h-full rounded-full bg-gold/[0.04] blur-[140px]" />
      </div>

      {/* Thin decorative rule above eyebrow */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-px bg-gold/30 mb-8 origin-left"
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-inter text-[9px] uppercase tracking-[0.55em] text-gold/60 font-bold mb-7 text-center"
      >
        Echoes of Identity · Personal Testimonies
      </motion.p>

      {/* Main headline */}
      <motion.h1
        id="hero-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="font-cinzel text-5xl md:text-7xl lg:text-8xl text-parchment text-center leading-none tracking-tight mb-8 max-w-4xl"
      >
        Stories from{' '}
        <span className="text-gold italic">Gaza</span>
      </motion.h1>

      {/* Intro copy */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-cormorant text-xl md:text-2xl text-parchment/60 text-center max-w-2xl leading-relaxed mb-5 font-light italic"
      >
        Behind every headline is a human life. These are personal stories of family, memory, loss,
        resilience, identity, and the futures people continue to imagine.
      </motion.p>

      {/* Supporting line */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="font-inter text-[11px] text-parchment/35 text-center tracking-wider uppercase"
      >
        First-person accounts, shared in their own words and preserved with care.
      </motion.p>

      {/* Bottom decorative rule */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-16 h-px bg-gold/20 mt-12 origin-right"
        aria-hidden="true"
      />
    </section>
  );
}
