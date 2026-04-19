"use client";

import { motion } from "framer-motion";

export default function HistoricalContext() {
  const articles = [
    { title: "The North African Jewish Diaspora", author: "Sarah B." },
    { title: "Shared Roots in Al-Andalus", author: "Omar K." },
    { title: "Holocaust Memory in the MENA Region", author: "Miriam & Youssef" }
  ];

  return (
    <div className="relative">
      {/* Coming Soon overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-parchment/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center px-6"
        >
          {/* Decorative line */}
          <div className="w-16 h-px bg-oud/40 mb-8" />

          <p className="font-inter text-xs tracking-[0.35em] uppercase text-oud/60 mb-4">
            Coming Soon
          </p>

          <h2 className="font-playfair italic text-4xl md:text-5xl text-midnight mb-4">
            Historical Context
          </h2>

          <p className="font-inter text-midnight/50 text-base max-w-sm leading-relaxed">
            Our student-written research library is on its way. Check back soon.
          </p>

          {/* Decorative line */}
          <div className="w-16 h-px bg-oud/40 mt-8" />
        </motion.div>
      </div>

      {/* Original section — blurred/hidden underneath */}
      <section id="historical-context" className="w-full bg-parchment py-32 px-6 md:px-12 text-midnight select-none pointer-events-none">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="md:w-1/3 flex flex-col justify-center"
          >
            <h2 className="font-cormorant text-4xl md:text-5xl font-medium mb-6">Historical Context</h2>
            <p className="font-inter text-midnight/70 text-lg leading-relaxed mb-8">
              To understand the stories, we must understand the history. Read student-written research articles that frame our testimonies within the broader geopolitical landscape.
            </p>
            <button className="self-start text-oud font-semibold border-b border-oud pb-1 hover:text-midnight transition-colors">
              View All Literature
            </button>
          </motion.div>

          <div className="md:w-2/3 flex flex-col gap-6">
            {articles.map((article, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="border-b border-oud/20 pb-6 flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <h3 className="font-cormorant text-2xl group-hover:text-oud transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="font-inter text-sm text-midnight/50 mt-2">By {article.author}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-oud/20 flex items-center justify-center group-hover:bg-oud group-hover:text-parchment transition-all duration-300">
                  →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
