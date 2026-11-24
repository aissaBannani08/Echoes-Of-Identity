'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Story, StoryCollection, StoryTheme } from '@/content/stories/types';

interface StoriesClientProps {
  stories: Story[];
  allThemes: StoryTheme[];
  allCollections: StoryCollection[];
}

const COLLECTION_LABELS: Record<StoryCollection, string> = {
  Gaza: 'Gaza, Palestine',
  Djerba: 'Djerba, Tunisia',
  Tunisia: 'Tunisia',
  Russia: 'Russia',
  'La Goulette': 'La Goulette, Tunisia',
};

const COLLECTION_COLORS: Record<StoryCollection, string> = {
  Gaza: '#C9A84C',
  Djerba: '#7B9E87',
  Tunisia: '#8B6BB1',
  Russia: '#B07070',
  'La Goulette': '#6B8FA8',
};

const STORIES_PER_PAGE = 9;

export default function StoriesClient({ stories, allThemes, allCollections }: StoriesClientProps) {
  const [query, setQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState<StoryCollection | 'All'>('All');
  const [activeTheme, setActiveTheme] = useState<StoryTheme | 'All'>('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = stories;

    if (activeCollection !== 'All') {
      result = result.filter((s) => s.collection === activeCollection);
    }
    if (activeTheme !== 'All') {
      result = result.filter((s) => s.themes.includes(activeTheme as StoryTheme));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.excerpt.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          (s.location?.toLowerCase().includes(q) ?? false) ||
          s.themes.some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  }, [stories, query, activeCollection, activeTheme]);

  const totalPages = Math.ceil(filtered.length / STORIES_PER_PAGE);
  const paginated = filtered.slice((page - 1) * STORIES_PER_PAGE, page * STORIES_PER_PAGE);

  const resetFilters = () => {
    setQuery('');
    setActiveCollection('All');
    setActiveTheme('All');
    setPage(1);
  };

  const handleFilterChange = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <main className="w-full bg-midnight min-h-screen text-parchment selection:bg-gold selection:text-midnight">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="mb-2">
          <span
            className="font-inter text-xs tracking-[0.3em] uppercase text-gold/70"
            aria-label="Section label"
          >
            Archive
          </span>
        </div>
        <h1 className="font-cinzel text-5xl md:text-7xl text-parchment leading-tight mb-6">
          Stories
        </h1>
        <p className="font-cormorant text-xl md:text-2xl text-parchment/70 max-w-2xl leading-relaxed">
          Personal testimonies, oral histories, and lived experiences — preserved in their own
          words, across cultures and generations.
        </p>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-white/[0.05]" aria-hidden="true" />
      </div>

      {/* Search + Filters */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        {/* Search bar */}
        <div className="relative mb-8">
          <label htmlFor="story-search" className="sr-only">
            Search stories
          </label>
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-parchment/40"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx={11} cy={11} r={8} />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            id="story-search"
            type="search"
            value={query}
            onChange={(e) => handleFilterChange(() => setQuery(e.target.value))}
            placeholder="Search by name, theme, location, or keyword…"
            className="w-full bg-white/[0.04] border border-white/10 rounded-sm pl-11 pr-4 py-3.5 font-inter text-sm text-parchment placeholder:text-parchment/30 focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>

        {/* Collection filter */}
        <div className="mb-5">
          <p className="font-inter text-xs tracking-widest uppercase text-parchment/40 mb-3">
            Collection
          </p>
          <div className="flex flex-wrap gap-2">
            {(['All', ...allCollections] as (StoryCollection | 'All')[]).map((col) => (
              <button
                key={col}
                id={`filter-collection-${col.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handleFilterChange(() => setActiveCollection(col))}
                className={`px-4 py-1.5 rounded-sm font-inter text-xs tracking-wider transition-all ${
                  activeCollection === col
                    ? 'bg-gold text-midnight font-medium'
                    : 'bg-white/[0.04] border border-white/10 text-parchment/60 hover:border-gold/30 hover:text-parchment'
                }`}
              >
                {col === 'All' ? 'All Collections' : COLLECTION_LABELS[col as StoryCollection]}
              </button>
            ))}
          </div>
        </div>

        {/* Theme filter */}
        <div className="mb-8">
          <p className="font-inter text-xs tracking-widest uppercase text-parchment/40 mb-3">
            Theme
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              id="filter-theme-all"
              onClick={() => handleFilterChange(() => setActiveTheme('All'))}
              className={`px-4 py-1.5 rounded-sm font-inter text-xs tracking-wider transition-all ${
                activeTheme === 'All'
                  ? 'bg-gold text-midnight font-medium'
                  : 'bg-white/[0.04] border border-white/10 text-parchment/60 hover:border-gold/30 hover:text-parchment'
              }`}
            >
              All Themes
            </button>
            {allThemes.map((theme) => (
              <button
                key={theme}
                id={`filter-theme-${theme.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => handleFilterChange(() => setActiveTheme(theme))}
                className={`px-4 py-1.5 rounded-sm font-inter text-xs tracking-wider transition-all ${
                  activeTheme === theme
                    ? 'bg-gold text-midnight font-medium'
                    : 'bg-white/[0.04] border border-white/10 text-parchment/60 hover:border-gold/30 hover:text-parchment'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="font-inter text-xs text-parchment/40 tracking-wider">
            {filtered.length === 0
              ? 'No stories found'
              : `${filtered.length} ${filtered.length === 1 ? 'story' : 'stories'} found`}
          </p>
          {(query || activeCollection !== 'All' || activeTheme !== 'All') && (
            <button
              onClick={resetFilters}
              className="font-inter text-xs text-gold/60 hover:text-gold transition-colors underline-offset-2 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Story Grid */}
        {paginated.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-cormorant text-2xl text-parchment/40">No stories match your search.</p>
            <button
              onClick={resetFilters}
              className="mt-4 font-inter text-xs text-gold/60 hover:text-gold transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              id="pagination-prev"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 font-inter text-xs tracking-wider text-parchment/50 border border-white/10 rounded-sm hover:border-gold/30 hover:text-parchment disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                id={`pagination-page-${p}`}
                onClick={() => setPage(p)}
                className={`w-9 h-9 font-inter text-xs rounded-sm transition-all ${
                  p === page
                    ? 'bg-gold text-midnight font-medium'
                    : 'text-parchment/50 border border-white/10 hover:border-gold/30 hover:text-parchment'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              id="pagination-next"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 font-inter text-xs tracking-wider text-parchment/50 border border-white/10 rounded-sm hover:border-gold/30 hover:text-parchment disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

function StoryCard({ story }: { story: Story }) {
  const color = COLLECTION_COLORS[story.collection] ?? '#C9A84C';
  const href = `/stories/${story.collection.toLowerCase().replace(/\s+/g, '-')}/${story.slug}`;

  return (
    <Link
      href={href}
      id={`story-card-${story.slug}`}
      className="group block bg-white/[0.02] border border-white/[0.06] rounded-sm p-7 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Collection badge */}
      <div className="flex items-center justify-between mb-5">
        <span
          className="font-inter text-[10px] tracking-[0.25em] uppercase font-medium"
          style={{ color }}
        >
          {COLLECTION_LABELS[story.collection] ?? story.collection}
        </span>
        {story.featured && (
          <span className="font-inter text-[10px] tracking-widest uppercase text-gold/60 bg-gold/10 px-2 py-0.5 rounded-sm">
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h2 className="font-cormorant text-xl text-parchment leading-snug mb-3 group-hover:text-gold transition-colors">
        {story.title}
      </h2>

      {/* Contributor + location */}
      <p className="font-inter text-xs text-parchment/40 mb-4 tracking-wide">
        {story.name}
        {story.location && (
          <>
            {' · '}
            {story.location}
          </>
        )}
        {story.readingTimeMinutes && (
          <>
            {' · '}
            {story.readingTimeMinutes} min read
          </>
        )}
      </p>

      {/* Excerpt */}
      <p className="font-cormorant text-base text-parchment/60 leading-relaxed line-clamp-3 mb-5">
        {story.excerpt}
      </p>

      {/* Themes */}
      <div className="flex flex-wrap gap-1.5">
        {story.themes.slice(0, 3).map((theme) => (
          <span
            key={theme}
            className="font-inter text-[10px] tracking-wider text-parchment/40 border border-white/[0.08] px-2 py-0.5 rounded-sm"
          >
            {theme}
          </span>
        ))}
      </div>

      {/* Read arrow */}
      <div className="mt-5 flex items-center gap-2 text-parchment/30 group-hover:text-gold transition-colors">
        <span className="font-inter text-xs tracking-widest uppercase">Read</span>
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
