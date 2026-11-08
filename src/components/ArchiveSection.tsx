"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import archiveData from "@/content/story-archive.json";

const summaries: Record<string, string> = {
  "Gaza": "Six personal accounts of family, displacement, daily life, and hope.",
  "Djerba": "Stories of Jewish identity, education, language, religion, and belonging.",
  "Tunisian Medina": "A shoemaker’s account of craft, work, and knowledge passed between generations.",
  "La Goulette and Tunis": "Interview-based narratives on community, religious life, and shared memory.",
  "Russian-Jewish Immigration": "Six narratives about one family’s migration from the Soviet Union to the United States.",
  "Tunisian Jewish Communities": "Additional interview-based accounts of Jewish life in Djerba, Nabeul, and Tunis."
};
const counts = (archiveData as { collection: string }[]).reduce<Record<string, number>>((result, story) => {
  result[story.collection] = (result[story.collection] ?? 0) + 1;
  return result;
}, {});

export default function ArchiveSection() {
  const collections = Object.entries(counts);
  return <section id="archive" className="relative w-full bg-[#05070A] px-6 py-24 md:px-12">
    <div className="mx-auto max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#C9A84C]">The collection</p>
        <h2 className="font-cormorant text-5xl text-[#F5F0E8] md:text-7xl">Explore the Archive</h2>
        <p className="mx-auto mt-5 max-w-2xl font-inter text-sm leading-relaxed text-parchment/65">Browse the interview-based stories currently available, organized by their source collection.</p>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{collections.map(([name, count], index) => <motion.div key={name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#C9A84C]/50">
        <p className="text-xs uppercase tracking-[0.2em] text-[#C9A84C]">{count} {count === 1 ? "story" : "stories"}</p>
        <h3 className="mt-3 font-cormorant text-3xl text-[#F5F0E8]">{name}</h3>
        <p className="mt-3 min-h-12 font-inter text-sm leading-relaxed text-parchment/55">{summaries[name] ?? "Stories drawn from the supplied oral-history material."}</p>
        <Link href="/archive" className="mt-5 inline-flex min-h-11 items-center text-xs uppercase tracking-[0.18em] text-[#C9A84C] hover:underline">Browse stories →</Link>
      </motion.div>)}</div>
    </div>
  </section>;
}
