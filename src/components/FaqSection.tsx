"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const faqs = [
  { 
    question: "What is Echoes of Identity?", 
    answer: "Echoes of Identity is a youth-led initiative aimed at preserving the human stories of Jewish and Muslim communities worldwide through personal storytelling." 
  },
  { 
    question: "How do I submit a testimony?", 
    answer: "Schedule an interview or use our digital portal to upload personal artifacts and stories directly to the archive." 
  },
  { 
    question: "How do I start a chapter?", 
    answer: "We provide a comprehensive framework and training kit to help you document untold stories in your own university or community." 
  },
  { 
    question: "Is the archive public?", 
    answer: "Yes, the core archive is public. Sensitive testimonies are preserved with restricted access to honor the privacy of storytellers." 
  }
];

export default function FaqSection() {
  return (
    <section id="faq" className="w-full bg-[#05070A] py-32 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-cormorant text-6xl md:text-8xl text-white leading-tight tracking-tighter"
          >
            Liquid <span className="text-gold italic">Clarity</span>
          </motion.h2>
          <p className="font-inter text-parchment/40 text-sm md:text-base max-w-xl mx-auto mt-6 font-light tracking-wide">
            Navigating the depth of our mission through the lens of human experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {faqs.map((faq, index) => (
            <LiquidFaqCard key={index} faq={faq} index={index} />
          ))}
        </div>

      </div>
      
      {/* Global Glass Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="faq-glass" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="3" result="blurredNoise" />
            <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </section>
  );
}

function LiquidFaqCard({ faq, index }: { faq: any, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onClick={() => setIsOpen(!isOpen)}
      className="group relative cursor-pointer"
    >
      {/* Liquid Glass Background */}
      <div className={cn(
        "absolute inset-0 rounded-[40px] transition-all duration-700 ease-out",
        isOpen ? "scale-105" : "scale-100"
      )}>
        {/* Outer Shadow/Glow */}
        <div className="absolute inset-0 rounded-[40px] shadow-[0_0_20px_rgba(201,169,110,0.05),inset_0_0_2px_rgba(255,255,255,0.1)] transition-all duration-700" />
        
        {/* Inner Glass Layer */}
        <div 
          className="absolute inset-0 rounded-[40px] opacity-40 transition-all duration-700"
          style={{ 
            backdropFilter: 'url("#faq-glass") blur(12px)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)'
          }}
        />

        {/* Liquid Border Effect */}
        <div className={cn(
          "absolute inset-0 rounded-[40px] border border-white/5 transition-colors duration-700",
          isOpen ? "border-gold/30" : "group-hover:border-white/20"
        )} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-10 min-h-[160px] flex flex-col justify-center">
        <div className="flex justify-between items-center gap-6">
          <h3 className={cn(
            "font-cormorant text-3xl md:text-4xl transition-colors duration-500 leading-tight",
            isOpen ? "text-gold" : "text-white/80 group-hover:text-white"
          )}>
            {faq.question}
          </h3>
          <motion.div 
            animate={{ rotate: isOpen ? 135 : 0 }}
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center text-xl font-light transition-colors duration-500",
              isOpen ? "border-gold text-gold" : "border-white/10 text-white/20"
            )}
          >
            +
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-inter text-parchment/70 text-lg leading-relaxed mt-8 pt-8 border-t border-white/5 font-light">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mouse Follow / Glow logic can be added here if needed */}
    </motion.div>
  );
}
