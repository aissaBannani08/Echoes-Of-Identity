import Link from "next/link";

export default function Footer() {
  return <footer className="w-full border-t border-white/10 bg-midnight px-6 pb-12 pt-16 md:px-12">
    <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
      <div className="md:col-span-1">
        <h2 className="mb-4 font-cormorant text-3xl text-[#F5EFE0]">Echoes of Identity</h2>
        <p className="max-w-sm font-inter text-sm leading-relaxed text-parchment/50">A living archive preserving personal histories and cultural memory.</p>
      </div>
      <div>
        <h3 className="mb-4 font-inter text-xs uppercase tracking-widest text-gold">Explore</h3>
        <ul className="space-y-3 font-inter text-sm text-parchment/70">
          <li><Link href="/archive" className="hover:text-gold">Story archive</Link></li>
          <li><Link href="/#historical-context" className="hover:text-gold">About the project</Link></li>
          <li><Link href="/contribute" className="hover:text-gold">Contribute a story</Link></li>
          <li><a href="mailto:info@echoesofidentity.org" className="hover:text-gold">Contact the project</a></li>
        </ul>
      </div>
      <div>
        <h3 className="mb-4 font-inter text-xs uppercase tracking-widest text-gold">Privacy & consent</h3>
        <details className="group text-sm text-parchment/65">
          <summary className="min-h-11 cursor-pointer list-none py-2 hover:text-gold">Read our privacy and consent information <span aria-hidden="true" className="ml-1 text-gold group-open:hidden">+</span><span aria-hidden="true" className="ml-1 hidden text-gold group-open:inline">−</span></summary>
          <div className="space-y-3 pb-2 text-xs leading-relaxed text-parchment/55">
            <p>If you create a member account, the site processes your account email and profile information through its Supabase integration. Signed-in members can upload a profile avatar to Supabase Storage. People with access to the project’s Supabase account may access information stored there.</p>
            <p>The stories in this archive are public. We use a contributor’s name, preferred name, or no public name according to the attribution agreed for that story. Text, recordings, or photographs should be published only with the contributor’s consent for that use.</p>
            <p>This website currently has no built-in story submission form. Please contact the project before sending a testimony, recording, or photograph. The “Join the Project” application opens a Google Form; information entered there is handled by that service.</p>
            <p>To ask about a story, request a correction, discuss anonymity, or request that a story be withdrawn, email <a className="text-gold underline" href="mailto:info@echoesofidentity.org">info@echoesofidentity.org</a>.</p>
          </div>
        </details>
      </div>
    </div>
    <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-3 border-t border-white/5 pt-6 text-xs text-parchment/35 md:flex-row">
      <p>© {new Date().getFullYear()} Echoes of Identity.</p><p>Preserving personal histories and cultural memory.</p>
    </div>
  </footer>;
}
