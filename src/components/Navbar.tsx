"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        scrolled ? "bg-midnight/80 backdrop-blur-md py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="font-cinzel text-lg font-bold tracking-widest text-gold">
          Echoes of Identity
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {["Archive", "Historical Context", "Global Map", "Get Involved", "Donate"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className={`font-inter text-sm transition-colors ${
                item === "Donate"
                  ? "text-gold hover:text-[#E8C97A] font-semibold"
                  : "text-parchment hover:text-gold"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Interactive but no redirect */}
        <button className="px-6 py-2 border border-gold text-gold font-inter text-sm hover:bg-gold hover:text-midnight transition-colors duration-300">
          Enter the Archive
        </button>
      </div>
    </motion.nav>
  );
}
