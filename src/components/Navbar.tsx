"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Archive", href: "/archive" },
    { name: "History", href: pathname === "/" ? "#historical-context" : "/#historical-context" },
    { name: "Testimonies", href: pathname === "/" ? "#get-involved" : "/#get-involved" },
  ];

  return (
    <div className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto flex items-center gap-6 px-6 py-3 rounded-full border transition-all duration-500",
          "bg-black/40 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          scrolled ? "scale-95 translate-y-[-10px]" : "scale-100"
        )}
      >
        {/* LOGO - 4 Dots Style */}
        <Link href="/" className="flex items-center justify-center mr-2 group">
          <div className="grid grid-cols-2 gap-1 transition-transform group-hover:rotate-180 duration-700">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-gold/80" />
            ))}
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-parchment/60 hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3 ml-4">
          <Link href="/#donations">
            <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 font-inter text-[10px] font-bold uppercase tracking-widest text-parchment/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
              Donate
            </div>
          </Link>
          
          <Link href="/archive">
            <GlassButton 
              size="sm" 
              className="font-inter text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 h-auto rounded-full bg-white text-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Archive
            </GlassButton>
          </Link>
        </div>
      </motion.nav>
    </div>
  );
}
