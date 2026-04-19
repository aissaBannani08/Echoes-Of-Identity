"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Basic image preloader logic: we will "preload" images and step progress.
    // In a real app we might load all 240, but to prevent massive wait times,
    // we'll preload the first 50 frames to ensure immediate smoothness,
    // and let the browser lazily fetch the rest or fetch them in the background.
    
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
      }, 500); // Slight delay for smoothness
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight"
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <h1
          className="font-playfair italic font-medium tracking-wide text-[#F5EFE0] mb-4"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)",
            textShadow: "0 0 40px rgba(201,169,110,0.3)",
          }}
        >
          Echoes of Identity
        </h1>
        <p className="font-inter text-xs tracking-[0.35em] text-gold/70 uppercase mb-8">
          A Living Archive
        </p>

        <div className="w-64 h-px bg-white/10 relative">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        
        <p className="mt-4 font-inter text-xs tracking-widest text-gold">
          Loading {progress}%
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
