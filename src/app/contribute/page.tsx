import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = { title: "Contribute | Echoes of Identity", description: "Learn about consent, attribution, and how to discuss contributing a story to Echoes of Identity." };

export default function ContributePage() {
  return <main className="min-h-screen bg-[#0D0D1A] text-[#F5F0E8]"><Navbar /><article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
    <Link href="/" className="text-sm text-[#C9A84C] hover:underline">← Home</Link>
    <p className="mt-12 text-xs uppercase tracking-[0.3em] text-[#C9A84C]">Share your story</p>
    <h1 className="mt-4 font-cinzel text-4xl md:text-5xl">Before you contribute</h1>
    <p className="mt-6 font-cormorant text-xl leading-relaxed text-[#F5F0E8]/75">Echoes of Identity preserves personal histories through careful, consent-based storytelling. Please contact the project before sending a testimony, recording, or photograph; this website does not currently provide an in-site story submission form.</p>
    <section className="mt-10 space-y-6 border-t border-white/10 pt-8 text-sm leading-relaxed text-[#F5F0E8]/70">
      <div><h2 className="font-cinzel text-xl text-[#F5F0E8]">Consent and publication</h2><p className="mt-2">Before a story is published, discuss which parts may be shared, whether any recordings or photographs may be used, and how the contribution should be attributed. You may ask to use a preferred name or to leave your public name out. We will confirm the agreed scope before publication.</p></div>
      <div><h2 className="font-cinzel text-xl text-[#F5F0E8]">Corrections or withdrawal</h2><p className="mt-2">You can contact the project to request a correction or discuss withdrawing a published story. We will review the request with you.</p></div>
      <div><h2 className="font-cinzel text-xl text-[#F5F0E8]">Contact</h2><p className="mt-2">To discuss contributing or ask questions about consent, email <a className="text-[#C9A84C] underline" href="mailto:info@echoesofidentity.org?subject=Story%20contribution">info@echoesofidentity.org</a>. Avoid sending material you do not want emailed until you have discussed a suitable way to share it.</p></div>
    </section>
  </article><Footer /></main>;
}
