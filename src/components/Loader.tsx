"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;
    const totalToPreload = 50;

    for (let i = 1; i <= totalToPreload; i++) {
      const img = new window.Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.webp`;
      img.onload = () => {
        loadedCount++;
        const currentProgress = Math.floor((loadedCount / totalToPreload) * 100);
        setProgress((prev) => Math.max(prev, currentProgress));
      };
      img.onerror = () => {
        loadedCount++;
        const currentProgress = Math.floor((loadedCount / totalToPreload) * 100);
        setProgress((prev) => Math.max(prev, currentProgress));
      }
    }
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        onComplete();
      }, 1000); 
    }
  }, [progress, onComplete]);

  const title = "Echoes of Identity";
  const subtitle = "A Living Archive";

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const letterVariants = {
    initial: { opacity: 0, y: 15, rotateX: -90 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  };

  const subtitleVariants = {
    initial: { opacity: 0, letterSpacing: "0.1em" },
    animate: {
      opacity: 1,
      letterSpacing: "0.35em",
      transition: { duration: 2.5, ease: "easeOut", delay: 1.2 }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Cinematic Background Glows */}
        <motion.div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 45% 55%, rgba(201,169,110,0.1) 0%, transparent 70%)",
              "radial-gradient(circle at 55% 45%, rgba(201,169,110,0.2) 0%, transparent 60%)",
            ]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Decorative Floating Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gold/10 blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.04, 0.08],
            x: [0, -40, 0],
            y: [0, 60, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-oud/10 blur-[100px]"
        />

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Title - Split into characters */}
          <div className="flex overflow-hidden mb-6">
            {title.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="font-playfair italic font-medium text-parchment inline-block"
                style={{
                  fontSize: "clamp(1.8rem, 5vw, 4rem)",
                  textShadow: "0 0 40px rgba(201,169,110,0.25)",
                  marginRight: char === " " ? "0.25em" : "-0.02em",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle with expanding letter spacing */}
          <motion.p
            variants={subtitleVariants}
            className="font-inter text-[10px] sm:text-xs text-gold/60 uppercase mb-14 tracking-[0.35em]"
          >
            {subtitle}
          </motion.p>

          {/* Premium Progress Bar */}
          <div className="relative w-64 sm:w-80 h-[1.5px] bg-white/5 rounded-full mb-8 overflow-hidden">
            {/* The progress track */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold/20 via-gold to-gold/20"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                boxShadow: "0 0 15px rgba(201,169,110,0.6)",
              }}
            />
            {/* Shimmering highlight */}
            <motion.div 
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          </div>

          {/* Progress Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-cinzel text-[9px] tracking-[0.4em] text-gold/30 uppercase">
              Synchronizing Archive
            </span>
            <div className="font-inter text-[12px] tabular-nums tracking-[0.25em] text-gold/70">
              {progress}%
            </div>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 2.2, duration: 1.5 }}
          className="absolute bottom-12 font-inter text-[8px] tracking-[0.6em] uppercase text-parchment"
        >
          Voices Across Time
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
