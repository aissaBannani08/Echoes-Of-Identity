'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Story, StoryTheme } from '@/content/stories/types';
import StoryCard from './StoryCard';

const THEMES: ('All' | StoryTheme)[] = [
  'All',
  'Family and Motherhood',
  'Education and Ambition',
  'Home and Belonging',
  'Memory and Loss',
  'Everyday Life',
  'Resilience and Hope',
];

interface StoryGridProps {
  stories: Story[];
  /** Slug of the currently featured story — excluded from the grid to avoid duplication */
  featuredSlug?: string;
}

export default function StoryGrid({ stories, featuredSlug }: StoryGridProps) {
  const [activeTheme, setActiveTheme] = useState<'All' | StoryTheme>('All');

  // Exclude featured story from the grid
  const gridStories = useMemo(
    () => stories.filter((s) => s.slug !== featuredSlug),
    [stories, featuredSlug]
  );

  const filteredStories = useMemo(
    () =>
      activeTheme === 'All'
        ? gridStories
        : gridStories.filter((s) => s.themes.includes(activeTheme)),
    [gridStories, activeTheme]
  );

  // Only show filters for themes that actually have stories
  const availableThemes = useMemo(() => {
    return THEMES.filter((theme) => {
      if (theme === 'All') return true;
      return gridStories.some((s) => s.themes.includes(theme));
    });
  }, [gridStories]);

  return (
    <section className="px-6 py-16 max-w-7xl mx-auto" aria-labelledby="collection-heading">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2
            id="collection-heading"
            className="font-cinzel text-3xl md:text-4xl text-parchment mb-3"
          >
            The Collection
          </h2>
          <div className="h-px w-12 bg-gold/50" aria-hidden="true" />
        </div>
        <p className="font-inter text-[11px] uppercase tracking-wider text-parchment/30 max-w-xs">
          Personal testimonies from Gaza, preserved in their own words.
        </p>
      </div>

      {/* Filter controls — only shown if more than one theme available */}
      {availableThemes.length > 2 && (
        <div
          className="flex gap-2 flex-wrap mb-12"
          role="group"
          aria-label="Filter stories by theme"
        >
          {availableThemes.map((theme) => (
            <button
              key={theme}
              onClick={() => setActiveTheme(theme)}
              aria-pressed={activeTheme === theme}
              className={`font-inter text-[9px] uppercase tracking-[0.25em] px-4 py-2 border transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm ${
                activeTheme === theme
                  ? 'border-gold/50 text-gold bg-gold/5'
                  : 'border-white/[0.06] text-parchment/40 hover:border-white/20 hover:text-parchment/70'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <AnimatePresence mode="wait">
        {filteredStories.length > 0 ? (
          <motion.div
            key={activeTheme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
            aria-label="Story collection"
          >
            {filteredStories.map((story, index) => (
              <div key={story.slug} role="listitem">
                <StoryCard
                  story={story}
                  index={index}
                  size={index === 0 ? 'large' : 'small'}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-cormorant italic text-parchment/40 text-lg py-16 text-center"
          >
            No stories match this theme yet.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
