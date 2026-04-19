"use client";

import { motion } from "framer-motion";

export default function MapSection() {
  return (
    <section id="global-map" className="w-full bg-midnightAlt py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 z-10"
        >
          <h2 className="font-cormorant text-4xl md:text-5xl text-[#F5EFE0] mb-4">A Global Effort</h2>
          <p className="font-inter text-gold uppercase tracking-[0.2em] text-sm">Stories from every corner of the world</p>
        </motion.div>

        {/* Abstract Map Representation */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="relative w-full max-w-4xl aspect-[950/620] bg-midnight border border-white/5 rounded-3xl overflow-hidden mx-auto"
        >
          {/* subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Map Image (SVG dimensions 950x620) */}
          <img 
            src="/world-map.svg" 
            alt="World Map" 
            className="absolute top-0 left-0 w-full h-full object-cover opacity-70 mix-blend-screen mix-blend-plus-lighter"
            style={{ filter: "invert(1) opacity(0.8)", pointerEvents: "none" }} 
          />

          {/* Nodes/Countries aligned to the SVG map projection */}
          <Pin top="36%" left="24%" label="United States" delay={0} />
          <Pin top="36%" left="50.4%" label="Tunisia" delay={0.2} />
          <Pin top="45%" left="46.3%" label="Ivory Coast" delay={0.4} />
          <Pin top="38%" left="55.8%" label="Israel/Palestine" delay={0.6} />
          <Pin top="68%" left="82%" label="Australia" delay={0.8} />
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0E1520_100%)] pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}

function Pin({ top, left, label, delay }: { top: string, left: string, label: string, delay: number }) {
  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 + delay, type: "spring" }}
      className="absolute flex flex-col items-center group cursor-pointer"
      style={{ top, left }}
    >
      <div className="w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_rgba(201,169,110,0.8)] relative z-10 group-hover:scale-150 transition-transform"></div>
      <div className="mt-2 font-inter text-xs text-parchment/60 opacity-0 group-hover:opacity-100 transition-opacity absolute top-4 whitespace-nowrap bg-black/50 px-2 py-1 rounded">
        {label}
      </div>
      {/* Pulse effect */}
      <motion.div 
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay }}
        className="absolute w-3 h-3 bg-gold rounded-full z-0"
      ></motion.div>
    </motion.div>
  );
}
