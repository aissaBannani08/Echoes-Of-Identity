'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/stories/Breadcrumb';
import RelatedStories from '@/components/stories/RelatedStories';
import ReadingProgress from '@/components/stories/ReadingProgress';
import type { Story } from '@/content/stories/types';
import { Clock, ArrowLeft } from 'lucide-react';

interface StoryClientProps {
  story: Story;
  relatedStories: Story[];
}

/** Splits story content on blank lines and renders each paragraph */
function StoryBody({ content }: { content: string }) {
  const paragraphs = content
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.7, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
          className="font-cormorant text-xl md:text-2xl text-parchment/80 leading-[1.85] font-light"
        >
          {paragraph}
        </motion.p>
      ))}
    </div>
  );
}

export default function StoryClient({ story, relatedStories }: StoryClientProps) {
  return (
    <>
      <ReadingProgress />

      <main
        className="w-full bg-midnight min-h-screen text-parchment selection:bg-gold selection:text-midnight"
        id="story-content"
      >
        {/* Skip link */}
        <a
          href="#story-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-midnight focus:px-4 focus:py-2 focus:font-inter focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Skip to story
        </a>

        <Navbar />

        {/* Story wrapper — constrained reading column */}
        <article className="pt-32 pb-20 px-6 max-w-3xl mx-auto" aria-labelledby="story-title">

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Breadcrumb
              items={[
                { label: 'Stories', href: '/stories/gaza' },
                { label: 'Gaza', href: '/stories/gaza' },
              ]}
              current={story.name}
            />
          </motion.div>

          {/* Collection label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-8 bg-gold/30" aria-hidden="true" />
            <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-gold/50">
              Personal Testimony · Gaza
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            id="story-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-3xl md:text-5xl lg:text-6xl text-parchment leading-tight tracking-tight mb-6"
          >
            {story.title}
          </motion.h1>

          {/* Contributor & meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mb-10 pb-10 border-b border-white/[0.06]"
          >
            <span className="font-inter text-[10px] uppercase tracking-[0.35em] text-parchment/40">
              — {story.name}
            </span>

            {story.readingTimeMinutes && (
              <div className="flex items-center gap-1.5">
                <Clock size={10} className="text-parchment/20" aria-hidden="true" />
                <span className="font-inter text-[9px] text-parchment/25">
                  {story.readingTimeMinutes} min read
                </span>
              </div>
            )}

            {/* Theme tags */}
            <div className="flex gap-2 flex-wrap" aria-label="Story themes">
              {story.themes.map((theme) => (
                <span
                  key={theme}
                  className="font-inter text-[8px] uppercase tracking-[0.2em] text-gold/40 border border-gold/15 px-2.5 py-0.5"
                >
                  {theme}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Story body */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <StoryBody content={story.content} />
          </motion.div>

          {/* Return link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 pt-12 border-t border-white/[0.06]"
          >
            <Link
              href="/stories/gaza"
              className="inline-flex items-center gap-3 font-inter text-[10px] uppercase tracking-[0.3em] text-gold/60 hover:text-gold transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-gold rounded-sm"
              aria-label="Return to the Gaza story collection"
            >
              <ArrowLeft
                size={13}
                className="transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
              Return to collection
            </Link>
          </motion.div>

          {/* Related stories */}
          <RelatedStories stories={relatedStories} />
        </article>

        <Footer />
      </main>
    </>
  );
}
