"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArchivePage() {
  const placeholders = [
    { id: 1, title: "The Weight of a Name", location: "Paris, France", date: "1984" },
    { id: 2, title: "Echoes in the Courtyard", location: "Tunis, Tunisia", date: "1960" },
    { id: 3, title: "A Mother's Recipe", location: "Casablanca, Morocco", date: "1972" },
    { id: 4, title: "Silent Departure", location: "Baghdad, Iraq", date: "1951" },
    { id: 5, title: "Letters from Exile", location: "New York, USA", date: "1990" },
    { id: 6, title: "The Keys We Kept", location: "Algiers, Algeria", date: "1962" },
  ];

  return (
    <main className="w-full bg-midnight min-h-screen text-parchment relative overflow-hidden selection:bg-gold selection:text-midnight">
      {/* Subtle grain texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      <Navbar />

      <div className="pt-40 pb-16 px-6 max-w-5xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-inter text-gold uppercase tracking-[0.3em] text-xs mb-6"
        >
          Historical Records
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-[#F5EFE0] mb-8 tracking-wide drop-shadow-lg"
        >
          Archive
        </motion.h1>
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "80px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gold/50 mx-auto mb-8"
        />
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-inter text-parchment/70 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto"
        >
          A collection of voices and lived experiences
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="max-w-2xl mx-auto border border-oud/30 bg-midnightAlt/40 backdrop-blur-md p-8 text-center mb-24 relative overflow-hidden z-10 mx-6 md:mx-auto"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-oud/30 to-transparent" />
        <p className="font-inter text-gold uppercase tracking-[0.2em] text-[10px] mb-3 opacity-80">System Status</p>
        <p className="font-cormorant text-2xl text-[#F5EFE0] tracking-wide">
          Stories are being collected.<br className="md:hidden"/> The archive will open soon.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto pb-40 relative z-10">
        {placeholders.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 + idx * 0.1 }}
            className="group relative p-[1px] bg-gradient-to-b from-oud/20 to-transparent hover:from-gold/40 transition-colors duration-700 overflow-hidden"
          >
            <div className="bg-[#0A0E18] h-full p-6 flex flex-col justify-between overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="w-full h-56 mb-8 bg-[#0E1520]/80 border border-oud/10 relative overflow-hidden group-hover:border-gold/20 transition-colors duration-700 flex items-center justify-center">
                {/* Abstract blur shapes to represent a muted image */}
                <div className="absolute w-32 h-32 bg-gold/5 rounded-full blur-2xl top-0 left-0 group-hover:bg-gold/10 transition-colors duration-1000 group-hover:scale-110"></div>
                <div className="absolute w-40 h-40 bg-oud/10 rounded-full blur-3xl bottom-0 right-0 group-hover:bg-oud/20 transition-colors duration-1000 group-hover:scale-110"></div>
                <div className="font-inter uppercase tracking-[0.2em] text-[9px] text-parchment/30 relative z-10 border border-parchment/10 px-3 py-1 rounded-sm backdrop-blur-sm">
                  Awaiting Access
                </div>
              </div>
              
              <div className="relative z-20 flex-grow pt-2 border-t border-oud/20 group-hover:border-gold/30 transition-colors duration-700">
                <div className="flex justify-between items-center mb-4 font-inter text-[10px] tracking-[0.15em] uppercase text-gold/60 group-hover:text-gold/90 transition-colors duration-500">
                  <span>{item.date}</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="font-cormorant text-2xl md:text-3xl text-parchment/80 group-hover:text-[#F5EFE0] transition-colors duration-500 leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
