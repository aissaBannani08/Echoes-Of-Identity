"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MemoryConstellationProps {
  className?: string;
  isInteractive?: boolean;
  usePhoto?: boolean;
  photoPath?: string;
}

export function MemoryConstellation({ 
  className, 
  isInteractive = false,
  usePhoto = false,
  photoPath = "/lantern.png"
}: MemoryConstellationProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const springConfig = { damping: 40, stiffness: 250 };
  const smoothX = useSpring(0, springConfig);
  const smoothY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      smoothX.set(x);
      smoothY.set(y);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full bg-[#020408] overflow-hidden group", className)}>
      
      {/* PHOTO BACKGROUND (Used for either lantern or memory) */}
      {usePhoto && (
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <img 
            src={photoPath} 
            alt="Memory Archive"
            className="w-full h-full object-cover opacity-60 brightness-[0.8] contrast-[1.1]"
          />
        </motion.div>
      )}

      {/* CODE-BASED BUBBLES (Fallback/Default) */}
      {!usePhoto && (
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="bubble-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#C9A96E" stopOpacity="0.3" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <path d="M 200 300 L 450 200 L 700 350 L 850 250 L 600 450 L 350 650 L 650 750 Z" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
            {[
              {cx: 200, cy: 300, r: 25}, {cx: 450, cy: 200, r: 20}, {cx: 700, cy: 350, r: 30},
              {cx: 850, cy: 250, r: 25}, {cx: 600, cy: 450, r: 35}, {cx: 350, cy: 650, r: 25}
            ].map((b, i) => (
              <g key={i}>
                <circle cx={b.cx} cy={b.cy} r={b.r} fill="url(#bubble-glow)" />
                <circle cx={b.cx} cy={b.cy} r="1" fill="white" />
              </g>
            ))}
          </svg>
        </div>
      )}

      {/* LIQUID GLASS EFFECT */}
      {isInteractive && (
        <motion.div 
          className="absolute z-20 pointer-events-none"
          style={{ left: smoothX, top: smoothY, width: 350, height: 350, translateX: "-50%", translateY: "-50%" }}
        >
          <div className="w-full h-full rounded-full border border-white/20 shadow-[0_0_120px_rgba(255,255,255,0.15)] backdrop-blur-[25px] relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-40" />
             <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(255,255,255,0.2)]" />
          </div>
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white rounded-full blur-[4px] opacity-60" />
        </motion.div>
      )}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
