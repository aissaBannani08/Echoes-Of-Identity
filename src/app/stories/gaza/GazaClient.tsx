'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialHero from '@/components/stories/EditorialHero';
import FeaturedStory from '@/components/stories/FeaturedStory';
import StoryGrid from '@/components/stories/StoryGrid';
import ClosingSection from '@/components/stories/ClosingSection';
import type { Story } from '@/content/stories/types';

interface GazaClientProps {
  stories: Story[];
  featuredStory: Story | null;
}

export default function GazaClient({ stories, featuredStory }: GazaClientProps) {
  return (
    <main
      className="w-full bg-midnight min-h-screen text-parchment selection:bg-gold selection:text-midnight"
      id="main-content"
    >
      <Navbar />

      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-midnight focus:px-4 focus:py-2 focus:font-inter focus:text-xs focus:uppercase focus:tracking-wider"
      >
        Skip to main content
      </a>

      {/* Editorial Hero */}
      <EditorialHero />

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-white/[0.05]" aria-hidden="true" />
      </div>

      {/* Featured Story */}
      {featuredStory && (
        <div className="py-16">
          <FeaturedStory story={featuredStory} />
        </div>
      )}

      {/* Story Collection Grid */}
      <StoryGrid stories={stories} featuredSlug={featuredStory?.slug} />

      {/* Closing Section */}
      <ClosingSection />

      <Footer />
    </main>
  );
}
