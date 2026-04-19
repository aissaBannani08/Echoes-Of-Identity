"use client";

import { motion } from "framer-motion";

export default function ArchiveSection() {
  const cards = [
    { title: "Identity", desc: "Navigating dual heritage matching faith with nationality.", country: "Tunisia 🇹🇳" },
    { title: "Immigration", desc: "The journey to a new world and the memories left behind.", country: "United States 🇺🇸" },
    { title: "Discrimination", desc: "Facing history and finding courage in community.", country: "Ivory Coast 🇨🇮" },
    { title: "Culture", desc: "Preserving recipes, music, and the languages of home.", country: "Morocco 🇲🇦" },
  ];

  return (
    <section id="archive" className="w-full bg-midnight py-32 px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <h2 className="font-cormorant text-4xl md:text-6xl text-gold mb-6">The Archive</h2>
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent mb-6"></div>
          <p className="font-inter text-parchment/70 max-w-2xl text-lg">
            Explore 500+ testimonies. This living archive is organized by the foundational human experiences that connect these communities worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group cursor-pointer border border-oud/30 bg-midnightAlt p-8 hover:border-gold/50 transition-colors duration-500 flex flex-col items-start"
            >
              <div className="text-gold font-inter text-xs tracking-widest uppercase mb-4">{card.country}</div>
              <h3 className="font-cormorant text-2xl text-[#F5EFE0] mb-4">{card.title}</h3>
              <p className="font-inter text-parchment/60 text-sm leading-relaxed flex-grow">
                {card.desc}
              </p>
              <div className="mt-8 flex items-center text-gold text-sm group-hover:text-[#E8C97A] transition-colors">
                <span className="mr-2 uppercase tracking-widest text-[10px]">Read Stories</span>
                →
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
