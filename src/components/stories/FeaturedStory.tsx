'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Story } from '@/content/stories/types';
import { ArrowRight, Clock } from 'lucide-react';

interface FeaturedStoryProps {
  story: Story;
}

/** Returns a short, pulled pull-quote from the first paragraph of the story */
function getPullQuote(content: string): string {
  const paragraphs = content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);
  // Use the second paragraph for the pull quote (first is often the intro)
  const source = paragraphs[1] ?? paragraphs[0] ?? '';
  return source.length > 220 ? source.slice(0, 217).trimEnd() + '…' : source;
}

export default function FeaturedStory({ story }: FeaturedStoryProps) {
  const pullQuote = getPullQuote(story.content);

  return (
    <section aria-labelledby="featured-story-heading" className="px-6 pb-4 max-w-7xl mx-auto">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-white/5" aria-hidden="true" />
        <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-gold/40 font-bold">
          Featured Story
        </span>
        <div className="h-px flex-1 bg-white/5" aria-hidden="true" />
      </div>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="group relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 border border-white/[0.06] hover:border-gold/20 transition-colors duration-700"
      >
        {/* Editorial typographic panel — left side */}
        <div className="relative flex flex-col justify-between p-10 md:p-14 lg:p-16 bg-white/[0.02] min-h-[420px]">
          {/* Theme labels */}
          <div className="flex gap-2 flex-wrap mb-auto">
            {story.themes.slice(0, 2).map((theme) => (
              <span
                key={theme}
                className="font-inter text-[8px] uppercase tracking-[0.3em] text-gold/50 border border-gold/20 px-3 py-1"
              >
                {theme}
              </span>
            ))}
          </div>

          {/* Title */}
          <div className="mt-10 mb-6">
            <h2
              id="featured-story-heading"
              className="font-cinzel text-3xl md:text-4xl lg:text-5xl text-parchment leading-tight tracking-tight group-hover:text-gold transition-colors duration-500"
            >
              {story.title}
            </h2>
            <p className="font-inter text-[11px] uppercase tracking-[0.3em] text-parchment/30 mt-4">
              — {story.name}
            </p>
          </div>

          {/* Excerpt */}
          <p className="font-cormorant text-lg md:text-xl text-parchment/55 leading-relaxed italic font-light mb-10 max-w-md">
            {story.excerpt}
          </p>

          {/* CTA */}
          <Link
            href={`/stories/gaza/${story.slug}`}
            className="inline-flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.3em] text-gold hover:text-parchment transition-colors group/link focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm"
            aria-label={`Read the full story: ${story.title}`}
          >
            Read the story
            <ArrowRight
              size={14}
              className="transition-transform group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          {story.readingTimeMinutes && (
            <div className="flex items-center gap-1.5 mt-4">
              <Clock size={10} className="text-parchment/20" aria-hidden="true" />
              <span className="font-inter text-[9px] text-parchment/20">
                {story.readingTimeMinutes} min read
              </span>
            </div>
          )}
        </div>

        {/* Right side — pull quote panel */}
        <div className="relative flex flex-col justify-center p-10 md:p-14 lg:p-16 border-t lg:border-t-0 lg:border-l border-white/[0.06] overflow-hidden">
          {/* Large decorative quote mark */}
          <span
            className="absolute top-6 left-8 font-cinzel text-[120px] leading-none text-gold/[0.06] select-none pointer-events-none"
            aria-hidden="true"
          >
            "
          </span>

          <blockquote className="relative z-10">
            <p className="font-cormorant text-xl md:text-2xl lg:text-3xl text-parchment/70 leading-relaxed font-light italic">
              {pullQuote}
            </p>
          </blockquote>

          {/* Corner accent */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-gold/10"
            aria-hidden="true"
          />
        </div>
      </motion.article>
    </section>
  );
}
