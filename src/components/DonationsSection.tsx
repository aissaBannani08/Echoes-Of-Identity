"use client";

export default function DonationsSection() {
  return <section id="donate" className="w-full border-t border-white/5 bg-[#080C15] px-6 py-20 md:px-12">
    <div className="mx-auto max-w-3xl text-center">
      <span className="mb-3 block font-inter text-xs uppercase tracking-[0.3em] text-gold/70">Support the archive</span>
      <h2 className="font-cormorant text-4xl leading-tight text-[#F5EFE0] md:text-6xl">Help preserve personal histories.</h2>
      <p className="mx-auto mt-6 max-w-xl font-inter text-sm leading-relaxed text-parchment/60">Online donation processing is not currently configured on this website. Contact the project to discuss other ways to support its work.</p>
      <a href="mailto:info@echoesofidentity.org?subject=Supporting%20Echoes%20of%20Identity" className="mt-8 inline-flex min-h-12 items-center justify-center rounded border border-gold/40 px-7 font-cinzel text-xs uppercase tracking-[0.18em] text-gold transition hover:bg-gold/10">Ask about supporting the archive</a>
    </div>
  </section>;
}
