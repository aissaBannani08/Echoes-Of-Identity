const APPLY_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSehebJoWlzBWEFtyJeUEYBeN0rZcwisa6dUYC0m64R1LdBLPA/viewform?usp=publish-editor";

export default function GetInvolved() {
  return (
    <section id="get-involved" className="w-full bg-midnight py-32 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-cormorant text-5xl md:text-7xl text-[#F5EFE0] mb-6">
          Your Story Deserves <br /> to Be Remembered
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">

          {/* Card 1 */}
          <div className="p-8 border border-oud/20 hover:border-gold/50 transition-colors bg-white/[0.01]">
            <h3 className="font-cormorant text-3xl text-gold mb-4">Submit a Testimony</h3>
            <p className="font-inter text-parchment/60 mb-8 text-sm leading-relaxed">
              Record your own story or that of a family member. We provide a guided
              process to ensure your history is preserved.
            </p>
            <button className="text-gold font-inter text-sm border-b border-gold pb-1 hover:text-[#E8C97A] hover:border-[#E8C97A] transition-colors duration-300">
              Start Submission
            </button>
          </div>

          {/* Card 2 — featured, ONLY Apply Now redirects */}
          <div className="p-8 border border-gold/40 bg-gold/5 hover:bg-gold/10 transition-colors relative mt-4 md:-mt-4 mb-4 md:-mb-4">
            <h3 className="font-cormorant text-3xl text-[#F5EFE0] mb-4">Join the Project</h3>
            <p className="font-inter text-parchment/80 mb-8 text-sm leading-relaxed">
              Become an interviewer, researcher, or archivist. Help us locate
              stories that need to be told.
            </p>
            <a
              href={APPLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 bg-gold text-midnight font-inter font-medium tracking-wide hover:bg-[#E8C97A] transition-colors text-center"
            >
              Apply Now
            </a>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-oud/20 hover:border-gold/50 transition-colors bg-white/[0.01]">
            <h3 className="font-cormorant text-3xl text-gold mb-4">Start a Chapter</h3>
            <p className="font-inter text-parchment/60 mb-8 text-sm leading-relaxed">
              Launch an Echoes of Identity student chapter in your university or
              community to build local bridges.
            </p>
            <button className="text-gold font-inter text-sm border-b border-gold pb-1 hover:text-[#E8C97A] hover:border-[#E8C97A] transition-colors duration-300">
              Get Started
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
