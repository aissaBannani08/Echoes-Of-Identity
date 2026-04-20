"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────────────── */
const ONE_TIME_AMOUNTS = [50, 100, 250, 500, 1000, 2500];
const MONTHLY_AMOUNTS  = [5, 10, 15, 25, 50, 100];
const SUGGESTED_ONCE   = 250;
const SUGGESTED_MONTHLY = 15;

const FAQ_ITEMS = [
  {
    q: "Is my donation secure?",
    a: "Yes. All transactions are encrypted and processed through industry-standard secure payment gateways. Your financial information is never stored on our servers.",
  },
  {
    q: "Do I get a receipt?",
    a: "Absolutely. A tax-deductible receipt will be emailed to you immediately after your donation is processed. Please keep it for your records.",
  },
  {
    q: "How is my personal data handled?",
    a: "We take your privacy seriously. Your data is never sold or shared with third parties. We use it solely to process your donation and send you updates about our work.",
  },
  {
    q: "What is the organization's Tax ID?",
    a: "Our Tax Identification Number (EIN) is available upon request. Please contact us at info@echoesofidentity.org for official documentation.",
  },
  {
    q: "Can I donate via stock or wire transfer?",
    a: "Yes. For gifts of stock, wire transfers, or other non-cash donations, please reach out to our development team directly so we can assist you.",
  },
  {
    q: "Can I donate using Apple Pay or Google Pay?",
    a: "We are actively integrating digital wallet options. Currently we accept all major credit and debit cards. Apple Pay and Google Pay support is coming soon.",
  },
];

/* ─── FAQ Accordion Item ────────────────────────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/8 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-inter text-sm md:text-base font-medium text-parchment/90 group-hover:text-gold transition-colors duration-200">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-4 flex-shrink-0 w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center text-gold text-sm"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-inter text-sm text-parchment/55 leading-relaxed pb-5 pr-8">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Info Icon ─────────────────────────────────────────────────── */
function InfoIcon() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-parchment/30 text-parchment/40 text-[10px] font-bold ml-1.5 cursor-help hover:border-gold/60 hover:text-gold transition-colors duration-200">
      i
    </span>
  );
}

/* ─── Impact Visual Panel ───────────────────────────────────────── */
function ImpactPanel({ monthly }: { monthly: boolean }) {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-0 rounded-2xl overflow-hidden">
      {/* Background gradient canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(201,169,110,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(125,78,36,0.22) 0%, transparent 55%), #0E1520",
        }}
      />

      {/* Decorative grid of "story tiles" */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-2 p-4 opacity-70">
        {[
          { bg: "rgba(201,169,110,0.12)", label: "Tunisia" },
          { bg: "rgba(125,78,36,0.18)",  label: "Ivory Coast" },
          { bg: "rgba(201,169,110,0.08)", label: "United States" },
          { bg: "rgba(125,78,36,0.14)",  label: "Morocco" },
          { bg: "rgba(201,169,110,0.15)", label: "France" },
          { bg: "rgba(125,78,36,0.10)",  label: "Israel" },
        ].map(({ bg, label }, i) => (
          <div
            key={i}
            className="rounded-xl flex items-end p-3"
            style={{ background: bg, border: "1px solid rgba(201,169,110,0.1)" }}
          >
            <span className="font-inter text-[10px] tracking-widest uppercase text-gold/60">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Circular badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-40 h-40 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, rgba(201,169,110,0.5), transparent, rgba(201,169,110,0.5))",
          }}
        />
        <div
          className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center text-center px-4"
          style={{
            background: "#0A0E18",
            border: "1.5px solid rgba(201,169,110,0.5)",
            boxShadow: "0 0 32px rgba(201,169,110,0.2)",
          }}
        >
          <span className="font-cinzel text-[10px] tracking-[0.2em] text-gold uppercase leading-tight">
            Your gift
          </span>
          <span className="font-cormorant text-xl font-bold text-white mt-1 leading-tight">
            changes lives.
          </span>
          <span className="font-cinzel text-[9px] tracking-[0.18em] text-gold/70 uppercase mt-1">
            {monthly ? "Give Monthly" : "Give Today"}
          </span>
        </div>
      </div>

      {/* Stats strip at bottom */}
      <div className="absolute bottom-0 inset-x-0 px-5 py-4 flex justify-between"
        style={{ background: "linear-gradient(to top, rgba(10,14,24,0.9) 0%, transparent 100%)" }}
      >
        {[["500+", "voices"], ["20+", "chapters"], ["8", "countries"]].map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="font-cinzel text-lg text-gold">{n}</div>
            <div className="font-inter text-[10px] tracking-widest uppercase text-parchment/40">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Donations Section ────────────────────────────────────── */
export default function DonationsSection() {
  const [monthly, setMonthly]         = useState(false);
  const [selected, setSelected]       = useState<number | null>(monthly ? SUGGESTED_MONTHLY : SUGGESTED_ONCE);
  const [custom, setCustom]           = useState("");
  const [touched, setTouched]         = useState(false);
  const [dedicate, setDedicate]       = useState(false);

  const amounts = monthly ? MONTHLY_AMOUNTS : ONE_TIME_AMOUNTS;
  const suggested = monthly ? SUGGESTED_MONTHLY : SUGGESTED_ONCE;

  const handleToggle = (isMonthly: boolean) => {
    setMonthly(isMonthly);
    setSelected(isMonthly ? SUGGESTED_MONTHLY : SUGGESTED_ONCE);
    setCustom("");
    setTouched(false);
  };

  const handleSelect = (amt: number) => {
    setSelected(amt);
    setCustom("");
    setTouched(false);
  };

  const handleCustomChange = (v: string) => {
    setCustom(v.replace(/[^0-9.]/g, ""));
    setSelected(null);
  };

  const activeAmount = selected ?? (parseFloat(custom) || null);
  const isInvalid    = touched && !activeAmount;

  const ctaLabel = activeAmount
    ? `Donate $${activeAmount.toLocaleString("en-US", { minimumFractionDigits: 0 })}${monthly ? "/mo" : ""}`
    : "Choose an amount";

  return (
    <section
      id="donate"
      className="w-full bg-[#080C15] py-24 px-6 md:px-12 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="font-inter text-xs tracking-[0.3em] uppercase text-gold/70 mb-3 block">
            Support the Archive
          </span>
          <h2 className="font-cormorant text-4xl md:text-6xl text-[#F5EFE0] leading-tight">
            Give a life-changing gift today.
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* ── LEFT: Donation Form Card ── */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "rgba(14, 21, 32, 0.95)",
              border: "1px solid rgba(201,169,110,0.15)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.45)",
            }}
          >
            {/* Toggle */}
            <div
              className="flex rounded-full p-1 mb-8"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              {[false, true].map((isMonthly) => (
                <button
                  key={String(isMonthly)}
                  onClick={() => handleToggle(isMonthly)}
                  className={`flex-1 py-2.5 rounded-full font-inter text-sm font-medium transition-all duration-300 ${
                    monthly === isMonthly
                      ? "bg-gold text-midnight shadow-md"
                      : "text-parchment/60 hover:text-parchment"
                  }`}
                >
                  {isMonthly ? "Monthly ❤️" : "Give once"}
                </button>
              ))}
            </div>

            {/* Amount grid */}
            <p className="font-inter text-xs tracking-widest uppercase text-parchment/40 mb-4">
              Select an amount
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {amounts.map((amt) => {
                const isActive = selected === amt;
                const isSuggested = amt === suggested;
                return (
                  <motion.button
                    key={amt}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(amt)}
                    className={`relative py-3 rounded-xl font-inter font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-gold text-midnight"
                        : "text-parchment hover:border-gold/60 hover:text-gold"
                    }`}
                    style={{
                      background: isActive ? "#C9A96E" : "rgba(255,255,255,0.04)",
                      border: isActive
                        ? "1.5px solid #C9A96E"
                        : "1.5px solid rgba(255,255,255,0.09)",
                      boxShadow: isActive
                        ? "0 0 16px rgba(201,169,110,0.35)"
                        : "none",
                    }}
                  >
                    ${amt}
                    {isSuggested && !isActive && (
                      <span
                        className="absolute -top-2 left-1/2 -translate-x-1/2 font-inter text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: "rgba(201,169,110,0.15)",
                          border: "1px solid rgba(201,169,110,0.3)",
                          color: "#C9A96E",
                        }}
                      >
                        Popular
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Custom amount */}
            <div className="mb-5">
              <div
                className={`flex items-center rounded-xl overflow-hidden transition-all duration-200 ${
                  isInvalid ? "ring-1 ring-red-500/60" : "focus-within:ring-1 focus-within:ring-gold/50"
                }`}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1.5px solid ${isInvalid ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.09)"}`,
                }}
              >
                <span className="pl-4 pr-2 font-inter text-parchment/50 text-base select-none">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={custom}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  onFocus={() => setSelected(null)}
                  onBlur={() => setTouched(true)}
                  className="flex-1 bg-transparent py-3.5 pr-4 font-inter text-parchment placeholder-parchment/25 text-sm outline-none"
                />
                {custom && (
                  <button
                    onClick={() => { setCustom(""); setTouched(false); }}
                    className="pr-4 text-parchment/30 hover:text-parchment/60 text-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
              <AnimatePresence>
                {isInvalid && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-2 font-inter text-xs text-red-400/80"
                  >
                    Please enter an amount to donate
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Dedicate checkbox */}
            <label className="flex items-center gap-3 mb-8 cursor-pointer group">
              <div
                onClick={() => setDedicate(!dedicate)}
                className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
                  dedicate ? "bg-gold" : "border border-white/20 group-hover:border-gold/50"
                }`}
              >
                {dedicate && (
                  <svg className="w-3 h-3 text-midnight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="font-inter text-sm text-parchment/70 group-hover:text-parchment/90 transition-colors">
                Dedicate my donation
              </span>
              <InfoIcon />
            </label>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTouched(true)}
              className="w-full py-4 rounded-xl font-cinzel font-bold text-sm tracking-[0.15em] transition-all duration-300"
              style={{
                background: activeAmount
                  ? "linear-gradient(135deg, #C9A96E 0%, #E8C97A 100%)"
                  : "rgba(201,169,110,0.15)",
                color: activeAmount ? "#0A0E18" : "#C9A96E",
                border: `1.5px solid ${activeAmount ? "transparent" : "rgba(201,169,110,0.3)"}`,
                boxShadow: activeAmount
                  ? "0 0 24px rgba(201,169,110,0.45), 0 4px 16px rgba(0,0,0,0.3)"
                  : "none",
              }}
            >
              {ctaLabel}
            </motion.button>

            {/* Trust line */}
            <p className="mt-5 font-inter text-[11px] text-parchment/30 text-center flex items-center justify-center gap-1.5">
              <svg className="w-3 h-3 text-parchment/30" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure &amp; encrypted · Tax-deductible receipt sent automatically
            </p>
          </div>

          {/* ── RIGHT: Impact Visual ── */}
          <div className="flex flex-col gap-5">
            <ImpactPanel monthly={monthly} />

            {/* Monthly context blurb */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(14, 21, 32, 0.95)",
                border: "1px solid rgba(201,169,110,0.12)",
              }}
            >
              <p className="font-cormorant text-xl text-[#F5EFE0] leading-snug mb-2">
                {monthly
                  ? "Monthly giving sustains the stories we collect."
                  : "Every single gift helps preserve a voice."}
              </p>
              <p className="font-inter text-xs text-parchment/50 leading-relaxed">
                {monthly
                  ? "When you give monthly, you provide the consistent funding we need to train interviewers, digitize testimonies, and keep the archive freely accessible—month after month, year after year."
                  : "With your support, we’re able to create programs and experiences that bring people together, address real-world challenges, and open doors for communities in need."}
              </p>
            </div>
          </div>

        </div>

        {/* ── FAQ Accordion ── */}
        <div className="mt-20">
          <h3 className="font-cormorant text-3xl md:text-4xl text-[#F5EFE0] mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div
            className="max-w-2xl mx-auto rounded-2xl px-8 py-2"
            style={{
              background: "rgba(14, 21, 32, 0.95)",
              border: "1px solid rgba(201,169,110,0.12)",
            }}
          >
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
