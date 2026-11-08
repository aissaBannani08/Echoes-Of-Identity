"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import archiveData from "@/content/story-archive.json";

type ArchiveStory = { slug: string; title: string; collection: string; contributor: string; themes: string[]; summary: string; content: string; source: string; relatedNarratives: { title: string; content: string }[] };
const stories = archiveData as ArchiveStory[];
const PAGE_SIZE = 9;

export default function ArchiveClient() {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("all");
  const [theme, setTheme] = useState("all");
  const [page, setPage] = useState(1);
  const collections = useMemo(() => Array.from(new Set(stories.map((story) => story.collection))), []);
  const themes = useMemo(() => Array.from(new Set(stories.flatMap((story) => story.themes))).sort(), []);
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return stories.filter((story) => {
      const matchesText = !term || [story.title, story.collection, story.contributor, story.summary, story.content, ...story.relatedNarratives.flatMap((draft) => [draft.title, draft.content]), ...story.themes].join(" ").toLocaleLowerCase().includes(term);
      return matchesText && (collection === "all" || story.collection === collection) && (theme === "all" || story.themes.includes(theme));
    });
  }, [query, collection, theme]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => setPage(1), [query, collection, theme]);

  return (
    <main className="min-h-screen bg-[#0D0D1A] text-[#F5F0E8]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-36 md:px-10">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#C9A84C]">Echoes of Identity · Oral History</p>
        <h1 className="font-cinzel text-4xl md:text-6xl">The Story Archive</h1>
        <p className="mt-5 max-w-2xl font-cormorant text-xl text-[#F5F0E8]/70">Personal accounts and interview-based narratives, preserved with their source context.</p>
        <p className="mt-3 text-xs text-[#F5F0E8]/45">41 distinct story pages · 52 supplied narrative drafts represented, with overlapping accounts grouped together.</p>
        <p className="mt-6 text-sm text-[#F5F0E8]/60" aria-live="polite">{filtered.length} {filtered.length === 1 ? "story" : "stories"} · Page {page} of {pages}</p>

        <div className="mt-8 grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_220px]">
          <label className="sr-only" htmlFor="archive-search">Search stories</label>
          <input id="archive-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, themes, or text…" className="rounded border border-white/15 bg-white/[0.04] px-4 py-3 text-sm outline-none transition focus:border-[#C9A84C]" />
          <label className="sr-only" htmlFor="archive-collection">Filter by collection</label>
          <select id="archive-collection" value={collection} onChange={(event) => setCollection(event.target.value)} className="rounded border border-white/15 bg-[#11111f] px-4 py-3 text-sm outline-none focus:border-[#C9A84C]"><option value="all">All collections</option>{collections.map((item) => <option key={item} value={item}>{item}</option>)}</select>
          <label className="sr-only" htmlFor="archive-theme">Filter by theme</label>
          <select id="archive-theme" value={theme} onChange={(event) => setTheme(event.target.value)} className="rounded border border-white/15 bg-[#11111f] px-4 py-3 text-sm outline-none focus:border-[#C9A84C]"><option value="all">All themes</option>{themes.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        </div>

        {visible.length ? <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{visible.map((story) => <Link key={story.slug} href={`/archive/${story.slug}`} className="group flex min-h-64 flex-col rounded border border-white/10 bg-white/[0.025] p-6 transition hover:-translate-y-1 hover:border-[#C9A84C]/60 hover:bg-white/[0.045]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">{story.collection}</span>
          <h2 className="mt-4 font-cinzel text-xl leading-snug transition group-hover:text-[#C9A84C]">{story.title}</h2>
          {story.contributor && <p className="mt-2 text-xs text-[#F5F0E8]/45">Contributor: {story.contributor}</p>}
          <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-[#F5F0E8]/65">{story.summary}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">{story.themes.slice(0, 3).map((item) => <span key={item} className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-[#F5F0E8]/55">{item}</span>)}</div>
        </Link>)}</div> : <p className="mt-12 rounded border border-white/10 p-8 text-center text-[#F5F0E8]/60">No stories match these filters.</p>}

        <nav aria-label="Story archive pages" className="mt-10 flex items-center justify-center gap-5">
          <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1} className="rounded border border-white/15 px-4 py-2 text-sm enabled:hover:border-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-35">Previous</button>
          <span className="text-sm text-[#F5F0E8]/60">{page} / {pages}</span>
          <button type="button" onClick={() => setPage((current) => Math.min(pages, current + 1))} disabled={page >= pages} className="rounded border border-white/15 px-4 py-2 text-sm enabled:hover:border-[#C9A84C] disabled:cursor-not-allowed disabled:opacity-35">Next</button>
        </nav>
      </section>
      <Footer />
    </main>
  );
}
