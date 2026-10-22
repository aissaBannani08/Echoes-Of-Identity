'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ClosingSection() {
  return (
    <section
      className="relative py-32 px-6 text-center overflow-hidden border-t border-white/[0.05]"
      aria-labelledby="closing-heading"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Decorative line */}
        <div className="flex items-center gap-4 justify-center mb-10">
          <div className="h-px w-8 bg-gold/20" aria-hidden="true" />
          <span className="font-inter text-[8px] uppercase tracking-[0.5em] text-gold/30">
            Echoes of Identity
          </span>
          <div className="h-px w-8 bg-gold/20" aria-hidden="true" />
        </div>

        <h2
          id="closing-heading"
          className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-parchment leading-tight mb-8"
        >
          Every life holds a story worth hearing.
        </h2>

        <p className="font-cormorant text-xl md:text-2xl text-parchment/45 italic font-light leading-relaxed mb-12">
          These testimonies preserve individual experiences that deserve to be encountered with care.
          Each story offers a glimpse into a person's world, beyond the headlines and beyond the
          assumptions others may make about them.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.3em] text-gold/60 hover:text-gold border border-gold/20 hover:border-gold/50 px-8 py-4 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
          aria-label="Return to the Echoes of Identity home page"
        >
          Return to Echoes of Identity
        </Link>
      </motion.div>
    </section>
  );
}
