import { getPublishedStories } from "@/content/stories";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArchiveClient() {
  const stories = getPublishedStories();
  return (
    <main className="w-full bg-[#05070A] min-h-screen text-parchment relative overflow-hidden selection:bg-gold selection:text-midnight">
      <Navbar />
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h1 className="font-cinzel text-4xl text-white mb-6">All Stories</h1>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <li key={story.slug} className="bg-midnight/30 p-4 rounded-lg hover:bg-midnight/50 transition-colors">
              <Link href={`/stories/${story.collection}/${story.slug}`} className="block">
                <h2 className="font-cinzel text-xl text-parchment mb-2 hover:text-gold transition-colors">{story.title}</h2>
                <p className="font-inter text-parchment/60 text-sm mb-1">{story.excerpt}</p>
                {story.readingTimeMinutes && (
                  <span className="font-inter text-parchment/40 text-xs">~{story.readingTimeMinutes} min read</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </main>
  );
}
