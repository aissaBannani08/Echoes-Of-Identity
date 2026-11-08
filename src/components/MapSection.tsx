"use client";

import { motion } from "framer-motion";
import archiveData from "@/content/story-archive.json";

const collections = (archiveData as { collection: string }[]).reduce<Record<string, number>>((result, story) => {
  result[story.collection] = (result[story.collection] ?? 0) + 1;
  return result;
}, {});

export default function MapSection() {
  return <section id="global-map" className="relative w-full bg-midnightAlt px-6 py-24 md:px-12">
    <div className="mx-auto max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Source collections</p>
        <h2 className="font-cormorant text-4xl text-[#F5EFE0] md:text-6xl">Stories across communities</h2>
        <p className="mx-auto mt-4 max-w-2xl font-inter text-sm leading-relaxed text-parchment/60">These are the places and collections represented in the materials currently available to the archive.</p>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(collections).map(([name, count], index) => <motion.div key={name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="border border-white/10 bg-white/[0.025] p-6">
        <h3 className="font-cormorant text-2xl text-[#F5EFE0]">{name}</h3><p className="mt-2 font-inter text-xs text-parchment/45">{count} {count === 1 ? "story" : "stories"}</p>
      </motion.div>)}</div>
    </div>
  </section>;
}
