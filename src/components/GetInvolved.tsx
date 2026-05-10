"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const APPLY_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSehebJoWlzBWEFtyJeUEYBeN0rZcwisa6dUYC0m64R1LdBLPA/viewform?usp=publish-editor";

const items = [
  {
    num: "01",
    title: "Submit a Testimony",
    desc: "Record your own story or that of a family member. We provide a guided process to ensure your history is preserved.",
    action: "Start Submission",
    href: "#",
    bgGradient: "radial-gradient(circle at center, rgba(201,169,110,0.08) 0%, transparent 60%)"
  },
  {
    num: "02",
    title: "Join the Project",
    desc: "Become an interviewer, researcher, or archivist. Help us locate stories that need to be told.",
    action: "Apply Now",
    href: APPLY_LINK,
    bgGradient: "radial-gradient(circle at center, rgba(232,201,122,0.1) 0%, transparent 60%)"
  },
  {
    num: "03",
    title: "Start a Chapter",
    desc: "Launch an Echoes of Identity student chapter in your university or community to build local bridges.",
    action: "Get Started",
    href: "#",
    bgGradient: "radial-gradient(circle at center, rgba(245,239,224,0.05) 0%, transparent 60%)"
  }
];

export default function GetInvolved() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="get-involved" className="w-full bg-[#05070A] py-20 relative overflow-hidden">
      
      {/* Background Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out"
        style={{
          background: hoveredIndex !== null ? items[hoveredIndex].bgGradient : 'transparent'
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:flex md:justify-between md:items-end border-b border-white/10 pb-8"
        >
          <h2 className="font-cormorant text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F5EFE0] to-[#C9A96E] max-w-xl">
            Your Story Deserves to Be Remembered
          </h2>
          <p className="font-inter text-parchment/60 text-[10px] tracking-[0.3em] uppercase mt-6 md:mt-0 font-medium hidden md:block">
            Take Action
          </p>
        </motion.div>

        {/* Interactive List */}
        <div className="flex flex-col border-t border-white/5" onMouseLeave={() => setHoveredIndex(null)}>
          {items.map((item, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.a
                key={i}
                href={item.href}
                target={item.href === APPLY_LINK ? "_blank" : "_self"}
                rel={item.href === APPLY_LINK ? "noopener noreferrer" : ""}
                onMouseEnter={() => setHoveredIndex(i)}
                className={`group block border-b border-white/10 transition-all duration-700 ease-out cursor-pointer relative overflow-hidden ${
                  isDimmed ? "opacity-30" : "opacity-100"
                }`}
              >
                {/* Hover Reveal Highlight Line */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A96E] transform origin-top transition-transform duration-500 ease-out"
                  style={{ transform: isHovered ? "scaleY(1)" : "scaleY(0)" }}
                />

                <div className="py-8 md:py-10 px-4 md:px-6 flex flex-col md:flex-row md:items-start justify-between relative z-10">
                  
                  {/* Number & Title Group */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 w-full md:w-1/2">
                    <span className={`font-inter text-lg transition-colors duration-500 font-light ${isHovered ? "text-[#C9A96E]" : "text-white/20"}`}>
                      {item.num}
                    </span>
                    <h3 className={`font-cormorant text-3xl md:text-4xl lg:text-5xl transition-all duration-500 ${isHovered ? "text-white transform translate-x-3" : "text-white/70"}`}>
                      {item.title}
                    </h3>
                  </div>

                  {/* Expanding Description & CTA */}
                  <div className="w-full md:w-5/12 flex flex-col justify-center mt-4 md:mt-0 overflow-hidden">
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isHovered ? 'auto' : 0, 
                        opacity: isHovered ? 1 : 0 
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="font-inter text-parchment/70 text-base leading-relaxed font-light mb-6 pt-1">
                        {item.desc}
                      </p>
                      <div className="flex items-center gap-3 text-[#C9A96E]">
                        <span className="font-cinzel text-[10px] uppercase tracking-[0.2em]">
                          {item.action}
                        </span>
                        <motion.span 
                          animate={{ x: isHovered ? 8 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="text-lg"
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Arrow Icon */}
                  <motion.div 
                    animate={{ opacity: isHovered ? 0 : 1, x: isHovered ? 15 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden md:flex items-center justify-center absolute right-6 top-1/2 -translate-y-1/2"
                  >
                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                     </svg>
                  </motion.div>

                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
