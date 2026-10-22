'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Story } from '@/content/stories/types';
import { ArrowRight } from 'lucide-react';

interface RelatedStoriesProps {
  stories: Story[];
}

export default function RelatedStories({ stories }: RelatedStoriesProps) {
  if (stories.length === 0) return null;

  return (
    <section
      className="mt-20 pt-16 border-t border-white/[0.06]"
      aria-labelledby="related-heading"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px flex-1 bg-white/[0.04]" aria-hidden="true" />
        <h2
          id="related-heading"
          className="font-inter text-[9px] uppercase tracking-[0.5em] text-gold/40"
        >
          More from the Collection
        </h2>
        <div className="h-px flex-1 bg-white/[0.04]" aria-hidden="true" />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 list-none p-0">
        {stories.map((story, index) => (
          <motion.li
            key={story.slug}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/stories/gaza/${story.slug}`}
              className="group flex flex-col border border-white/[0.05] hover:border-gold/20 p-7 transition-all duration-500 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold h-full"
              aria-label={`Read ${story.name}'s story: ${story.title}`}
            >
              <div className="flex gap-2 flex-wrap mb-5">
                {story.themes.slice(0, 1).map((theme) => (
                  <span
                    key={theme}
                    className="font-inter text-[8px] uppercase tracking-[0.2em] text-gold/40 border border-gold/15 px-2.5 py-0.5"
                  >
                    {theme}
                  </span>
                ))}
              </div>

              <h3 className="font-cinzel text-lg text-parchment leading-snug group-hover:text-gold transition-colors duration-400 mb-3 flex-1">
                {story.title}
              </h3>

              <p className="font-inter text-[10px] uppercase tracking-[0.25em] text-parchment/30 mb-6">
                — {story.name}
              </p>

              <div className="flex items-center gap-2 font-inter text-[9px] uppercase tracking-[0.2em] text-gold/50 group-hover:text-gold transition-colors">
                Read story
                <ArrowRight
                  size={11}
                  className="transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
