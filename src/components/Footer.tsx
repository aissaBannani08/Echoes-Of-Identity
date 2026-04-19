export default function Footer() {
  return (
    <footer className="w-full bg-midnight pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="font-cormorant text-3xl text-[#F5EFE0] mb-4">Echoes of Identity</h2>
          <p className="font-inter text-parchment/40 max-w-sm text-sm leading-relaxed">
            A Living Archive of Voices Across Time honoring Jewish and Muslim stories of identity, immigration, culture, and discrimination.
          </p>
        </div>
        
        <div>
          <h4 className="font-inter text-gold text-xs tracking-widest uppercase mb-4">Links</h4>
          <ul className="space-y-3 font-inter text-sm text-parchment/70">
            <li><a href="#archive" className="hover:text-gold transition-colors">Archive</a></li>
            <li><a href="#historical-context" className="hover:text-gold transition-colors">Historical Context</a></li>
            <li><a href="#get-involved" className="hover:text-gold transition-colors">Get Involved</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">About Us</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-inter text-gold text-xs tracking-widest uppercase mb-4">Legal & Social</h4>
          <ul className="space-y-3 font-inter text-sm text-parchment/70">
            <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">TikTok</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-inter text-parchment/30 gap-4">
        <p>© {new Date().getFullYear()} Echoes of Identity. All rights reserved.</p>
        <p>Preserving history frame by frame.</p>
      </div>
    </footer>
  );
}
