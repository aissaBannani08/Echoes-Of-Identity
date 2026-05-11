"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function ArchiveSection() {
  const cards = [
    { 
      title: "Identity", 
      desc: "Navigating dual heritage matching faith with nationality.", 
      country: "Tunisia 🇹🇳",
      image: "/images/archive/identity_bg_1778361042192.png",
      spanClass: "md:col-span-2 md:row-span-2"
    },
    { 
      title: "Immigration", 
      desc: "The journey to a new world and the memories left behind.", 
      country: "United States 🇺🇸",
      image: "/images/archive/immigration_bg_1778361098211.png",
      spanClass: "md:col-span-1 md:row-span-1"
    },
    { 
      title: "Discrimination", 
      desc: "Facing history and finding courage in community.", 
      country: "Ivory Coast 🇨🇮",
      image: "/images/archive/discrimination_bg_1778361178704.png",
      spanClass: "md:col-span-1 md:row-span-1"
    },
    { 
      title: "Culture", 
      desc: "Preserving recipes, music, and the languages of home.", 
      country: "Morocco 🇲🇦",
      image: "/images/archive/culture_bg_1778361232792.png",
      spanClass: "md:col-span-2 md:row-span-1"
    },
    { 
      title: "Hardship", 
      desc: "Stories of loss, struggle, and the difficult moments people have lived through.",
      image: "/images/archive/hardship_bg_1778361245383.png",
      spanClass: "md:col-span-1 md:row-span-1"
    },
  ];

  return (
    <section id="archive" className="w-full bg-[#05070A] py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <h2 className="font-cormorant text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] via-[#E8C97A] to-[#C9A96E] mb-6 tracking-wide drop-shadow-sm">
            Curated Voices
          </h2>
          <div className="w-px h-24 bg-gradient-to-b from-[#C9A96E] via-[#C9A96E]/50 to-transparent mb-8"></div>
          <p className="font-inter text-parchment/80 max-w-3xl text-lg md:text-xl font-light leading-relaxed">
            This living archive is organized by the foundational human experiences that connect our communities worldwide. Explore the stories that shape us.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[280px]">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-sm border border-white/5 hover:border-[#C9A96E]/40 transition-colors duration-700 ${card.spanClass}`}
            >
              <Link href="/archive" className="block w-full h-full relative cursor-pointer">
                {/* Background Image */}
                <Image
                  src={card.image}
                  alt={`${card.title}: ${card.desc} - Echoes of Identity cultural preservation project`}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Overlays for contrast and moody feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-[#0A0E18]/20 mix-blend-multiply"></div>

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {card.country && (
                      <span className="inline-block font-inter text-[10px] uppercase tracking-[0.25em] text-[#C9A96E] mb-3 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {card.country}
                      </span>
                    )}
                    
                    <h3 className="font-cormorant text-3xl md:text-4xl text-white mb-3 drop-shadow-lg">
                      {card.title}
                    </h3>
                    
                    <p className="font-inter text-parchment/70 text-sm md:text-base leading-relaxed max-w-md font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Decorative border accent */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A96E] group-hover:w-full transition-all duration-700 ease-out"></div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

