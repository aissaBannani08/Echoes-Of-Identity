import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import archiveData from "@/content/story-archive.json";

type ArchiveStory = { slug: string; title: string; collection: string; contributor: string; themes: string[]; summary: string; content: string; source: string; relatedNarratives: { title: string; content: string; source: string }[] };
const stories = archiveData as ArchiveStory[];

export function generateStaticParams() { return stories.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = stories.find(({ slug }) => slug === params.slug);
  return story ? { title: `${story.title} | Echoes of Identity`, description: story.summary } : { title: "Story not found | Echoes of Identity" };
}

export default function ArchiveStoryPage({ params }: { params: { slug: string } }) {
  const story = stories.find(({ slug }) => slug === params.slug);
  if (!story) notFound();
  return <main className="min-h-screen bg-[#0D0D1A] text-[#F5F0E8]"><Navbar /><article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
    <Link href="/archive" className="text-sm text-[#C9A84C] hover:underline">← Back to the archive</Link>
    <p className="mt-12 text-xs uppercase tracking-[0.3em] text-[#C9A84C]">{story.collection}</p>
    <h1 className="mt-4 font-cinzel text-3xl leading-tight md:text-5xl">{story.title}</h1>
    {story.contributor && <p className="mt-4 text-sm text-[#F5F0E8]/55">Contributor: {story.contributor}</p>}
    <div className="mt-5 flex flex-wrap gap-2">{story.themes.map((item) => <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#F5F0E8]/65">{item}</span>)}</div>
    <div className="mt-10">{story.content.split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p key={index} className="mb-5 font-cormorant text-lg leading-relaxed text-[#F5F0E8]/85">{paragraph}</p>)}</div>
    {story.relatedNarratives?.length > 0 && <section className="mt-14 border-t border-white/10 pt-8"><h2 className="font-cinzel text-2xl">Related interview narratives</h2><p className="mt-2 text-sm text-[#F5F0E8]/55">These supplied drafts revisit this story’s subject. They are kept together here to avoid presenting overlapping material as separate stories.</p>{story.relatedNarratives.map((account) => <div key={account.title} className="mt-8"><h3 className="font-cinzel text-xl text-[#C9A84C]">{account.title}</h3><div className="mt-4">{account.content.split(/\n\n+/).filter(Boolean).map((paragraph, index) => <p key={index} className="mb-5 font-cormorant text-lg leading-relaxed text-[#F5F0E8]/80">{paragraph}</p>)}</div><p className="mt-3 text-xs text-[#F5F0E8]/40">Source: {account.source}</p></div>)}</section>}
    <p className="mt-10 border-t border-white/10 pt-5 text-xs leading-relaxed text-[#F5F0E8]/45">Source: {story.source}. This page presents the supplied editorial narrative and source notes.</p>
  </article><Footer /></main>;
}
