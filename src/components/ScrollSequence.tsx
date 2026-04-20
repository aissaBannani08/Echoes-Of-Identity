"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 240;
const LERP = 0.12;

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload all frames
  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      const p = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${p}.webp`;
      imagesRef.current[i - 1] = img;
    }
  }, []);

  // Render loop with lerp smoothing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let currentFloat = 0;
    let lastDrawn = -1;

    const drawFrame = (idx: number) => {
      const img = imagesRef.current[idx];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      ctx.fillStyle = "#0A0E18";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cR = canvas.width / canvas.height;
      const iR = img.naturalWidth / img.naturalHeight;
      let dw, dh, ox, oy;
      if (cR > iR) {
        dw = canvas.width;
        dh = canvas.width / iR;
        ox = 0;
        oy = (canvas.height - dh) / 2;
      } else {
        dw = canvas.height * iR;
        dh = canvas.height;
        ox = (canvas.width - dw) / 2;
        oy = 0;
      }
      ctx.drawImage(img, ox, oy, dw, dh);
    };

    const loop = () => {
      const target = rawFrameIndex.get();
      currentFloat += (target - currentFloat) * LERP;
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFloat)));

      if (frameIdx !== lastDrawn) {
        lastDrawn = frameIdx;
        drawFrame(frameIdx);
      }
      animId = requestAnimationFrame(loop);
    };

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastDrawn = -1;
    };

    window.addEventListener("resize", onResize);
    onResize();
    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, [rawFrameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-midnight">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ willChange: "transform", transform: "translate3d(0, 0, 0)" }}
        />

        {/* Permanent dark overlay at top + bottom to always anchor text */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-midnight/80 via-midnight/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-midnight/95 via-midnight/60 to-transparent" />
        </div>

        {/* Scene layers */}
        <HeroIntro progress={scrollYProgress} />
        <TheOpening progress={scrollYProgress} />
        <ArchiveReveal progress={scrollYProgress} />
        <TheMission progress={scrollYProgress} />
        <TheCall progress={scrollYProgress} />
      </div>
    </div>
  );
}

/* ─── Shared text-shadow style for all visible-on-image text ─── */
const SHARP_SHADOW = "0 2px 14px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)";
const GOLD_GLOW   = "0 0 35px rgba(201,169,110,0.6), 0 2px 14px rgba(0,0,0,1)";

/* ─── Scene 1: Hero ───────────────────────────────────────────── */
function HeroIntro({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0, 0.05, 0.1, 0.15], [1, 1, 0, 0]);
  const y       = useTransform(progress, [0, 0.12], [0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      {/* Dark pill scrim behind the title block */}
      <div
        className="relative flex flex-col items-center px-10 py-8 rounded-sm"
        style={{
          background: "radial-gradient(ellipse at center, rgba(10,14,24,0.65) 0%, transparent 80%)",
        }}
      >
        <h1
          className="font-playfair italic font-medium tracking-wide text-[#F5EFE0]"
          style={{
            fontSize: "clamp(2rem, 8vw, 6rem)",
            textShadow: SHARP_SHADOW,
          }}
        >
          Echoes of Identity
        </h1>

        <h2
          className="font-cormorant text-xl md:text-2xl italic mt-4"
          style={{ color: "#E8C97A", textShadow: GOLD_GLOW }}
        >
          A Living Archive of Voices Across Time
        </h2>

        <p
          className="max-w-xl font-inter text-base md:text-lg leading-relaxed mt-4"
          style={{ color: "rgba(245,239,224,0.92)", textShadow: SHARP_SHADOW }}
        >
          Preserving Jewish and Muslim stories of identity, immigration, culture,
          and discrimination — before they are lost forever.
        </p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className="font-inter text-xs tracking-[0.3em] uppercase"
          style={{ color: "#C9A96E", textShadow: SHARP_SHADOW }}
        >
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-gold/70 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

/* ─── Scene 2: The Opening ────────────────────────────────────── */
function TheOpening({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.1, 0.15, 0.35, 0.4], [0, 1, 1, 0]);
  const x       = useTransform(progress, [0.1, 0.17], [-60, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 w-full md:w-[52%]"
    >
      {/* Left-side frosted scrim */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[52%] pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(10,14,24,0.82) 0%, rgba(10,14,24,0.55) 60%, transparent 100%)",
        }}
      />
      <div className="relative px-8 md:px-20 py-10 md:py-0">
        <h2
          className="font-cormorant text-4xl md:text-5xl text-white tracking-wide mb-5 leading-tight"
          style={{ textShadow: SHARP_SHADOW }}
        >
          Every story is a <br /> piece of history.
        </h2>
        <p
          className="font-inter text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(245,239,224,0.90)", textShadow: SHARP_SHADOW }}
        >
          For generations, Jewish and Muslim communities have carried stories the
          world has never heard. We are here to listen. We are here to remember.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Scene 3: Archive Reveal ─────────────────────────────────── */
function ArchiveReveal({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const x       = useTransform(progress, [0.35, 0.42], [60, 0]);

  return (
    <motion.div
      style={{ opacity, x }}
      className="absolute inset-0 flex flex-col justify-center items-end text-right px-0 md:w-[52%] ml-auto"
    >
      {/* Right-side frosted scrim */}
      <div
        className="absolute inset-y-0 right-0 w-full md:w-[52%] pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(10,14,24,0.82) 0%, rgba(10,14,24,0.55) 60%, transparent 100%)",
        }}
      />
      <div className="relative px-8 md:px-20 py-10 md:py-0">
        <h2
          className="font-cormorant text-4xl md:text-5xl tracking-wide mb-5 leading-tight"
          style={{ color: "#E8C97A", textShadow: GOLD_GLOW }}
        >
          Voices. <br /> One archive.
        </h2>
        <ul
          className="font-inter text-base md:text-lg leading-relaxed space-y-3"
          style={{ color: "rgba(245,239,224,0.92)", textShadow: SHARP_SHADOW }}
        >
          <li>Testimonies from Tunisia, Ivory Coast, the United States, and beyond.</li>
          <li>Stories of immigration, identity, discrimination, and culture.</li>
          <li>Submitted by youth from over 20 chapters worldwide.</li>
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Scene 4: The Mission ────────────────────────────────────── */
function TheMission({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.6, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  const y       = useTransform(progress, [0.6, 0.67], [50, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
    >
      {/* Center dark radial scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 70% at center, rgba(10,14,24,0.75) 0%, transparent 100%)",
        }}
      />
      <div className="relative max-w-2xl">
        <h2
          className="font-cormorant text-4xl md:text-5xl text-white tracking-wide mb-5 leading-tight"
          style={{ textShadow: SHARP_SHADOW }}
        >
          Through stories, we build understanding.
        </h2>
        <p
          className="font-inter text-base md:text-lg leading-relaxed"
          style={{ color: "rgba(245,239,224,0.90)", textShadow: SHARP_SHADOW }}
        >
          We are not just collecting memories. We are building a bridge between
          two communities that share more history than the world acknowledges.
          Every testimony is an act of preservation. Every interview, an act of courage.
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Scene 5: The Call ───────────────────────────────────────── */
function TheCall({ progress }: { progress: any }) {
  const opacity = useTransform(progress, [0.8, 0.86, 1, 1], [0, 1, 1, 1]);
  const scale   = useTransform(progress, [0.8, 0.86], [0.94, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex flex-col items-center justify-end text-center px-6 pb-24"
    >
      {/* High-visibility backdrop for this specific scene */}
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-midnight/90 via-midnight/50 to-transparent pointer-events-none backdrop-blur-md" />
      
      <div className="relative z-10 max-w-4xl px-8 py-10 rounded-2xl bg-midnight/30">
      <h2
        className="font-cormorant text-4xl md:text-5xl text-white tracking-wide mb-3 leading-tight"
        style={{ textShadow: SHARP_SHADOW }}
      >
        Your story deserves to be remembered.
      </h2>
      <p
        className="font-inter text-base md:text-lg mb-10"
        style={{ color: "#E8C97A", textShadow: GOLD_GLOW }}
      >
        Join the archive. Share a testimony. Start a chapter in your country.
      </p>

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        {/* PRIMARY — glowing gold, interactive but no redirect */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-10 py-4 bg-gold text-midnight font-cinzel font-bold text-sm tracking-[0.18em] rounded-sm overflow-hidden group"
          style={{
            boxShadow: "0 0 18px rgba(201,169,110,0.6), 0 0 42px rgba(201,169,110,0.25)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 32px rgba(232,201,122,0.8), 0 0 70px rgba(232,201,122,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 18px rgba(201,169,110,0.6), 0 0 42px rgba(201,169,110,0.25)";
          }}
        >
          {/* shimmer sweep */}
          <span
            className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)",
            }}
          />
          <span className="relative z-10">Enter the Archive</span>
        </motion.button>

        {/* SECONDARY — ghost, interactive but no redirect */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-10 py-4 border border-gold/70 font-inter font-medium text-sm tracking-[0.15em] rounded-sm transition-colors duration-300 hover:bg-gold/10 hover:border-gold"
          style={{ color: "#E8C97A", textShadow: SHARP_SHADOW }}
        >
          Join the Project
        </motion.button>
      </div>

      <p
        className="mt-8 font-inter text-xs tracking-widest uppercase"
        style={{ color: "rgba(245,239,224,0.45)", textShadow: SHARP_SHADOW }}
      >
        It takes one interview to change how history remembers a community.
      </p>
    </div>
  </motion.div>
  );
}
