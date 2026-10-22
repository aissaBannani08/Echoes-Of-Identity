'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Story } from '@/content/stories/types';
import { ArrowRight, Clock } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  index: number;
  /** 'large' = primary editorial treatment; 'small' = supporting preview */
  size?: 'large' | 'small';
}

export default function StoryCard({ story, index, size = 'large' }: StoryCardProps) {
  const isLarge = size === 'large';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col border border-white/[0.05] hover:border-gold/20 transition-all duration-500"
    >
      {/* Top accent line animates on hover */}
      <div
        className="absolute top-0 left-0 h-[1px] w-0 bg-gold/50 group-hover:w-full transition-[width] duration-700"
        aria-hidden="true"
      />

      <div className={`flex flex-col flex-1 ${isLarge ? 'p-8 md:p-10' : 'p-7'}`}>
        {/* Index number */}
        <div
          className="font-cinzel text-[11px] text-gold/20 mb-5 tracking-widest"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Themes */}
        <div className="flex gap-2 flex-wrap mb-6">
          {story.themes.slice(0, isLarge ? 2 : 1).map((theme) => (
            <span
              key={theme}
              className="font-inter text-[8px] uppercase tracking-[0.25em] text-gold/45 border border-gold/15 px-2.5 py-0.5"
            >
              {theme}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className={`font-cinzel text-parchment leading-snug tracking-tight mb-4 group-hover:text-gold transition-colors duration-500 ${
            isLarge ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {story.title}
        </h3>

        {/* Contributor */}
        <p className="font-inter text-[10px] uppercase tracking-[0.3em] text-parchment/30 mb-6">
          — {story.name}
        </p>

        {/* Excerpt */}
        <p
          className={`font-cormorant italic text-parchment/50 leading-relaxed font-light flex-1 ${
            isLarge ? 'text-lg md:text-xl' : 'text-base'
          }`}
        >
          {story.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.05]">
          <Link
            href={`/stories/gaza/${story.slug}`}
            className="inline-flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.25em] text-gold/70 hover:text-gold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm"
            aria-label={`Read ${story.name}'s full story: ${story.title}`}
          >
            Read story
            <ArrowRight
              size={12}
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>

          {story.readingTimeMinutes && (
            <div className="flex items-center gap-1.5">
              <Clock size={9} className="text-parchment/20" aria-hidden="true" />
              <span className="font-inter text-[9px] text-parchment/20">
                {story.readingTimeMinutes} min
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
