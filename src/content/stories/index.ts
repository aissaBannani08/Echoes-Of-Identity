/**
 * Gaza Stories — central index
 * Import story data and re-export a typed collection array.
 * Only published stories are surfaced publicly.
 */
import type { Story, StoryCollection, StoryTheme } from './types';
import { rahaf } from './rahaf';
import { aya } from './aya';
import { duha } from './duha';
import { waseem } from './waseem';

export type { Story, StoryCollection, StoryTheme };

/** Master list — order controls landing page sequence (featured story is always promoted separately) */
const ALL_STORIES: Story[] = [rahaf, aya, duha, waseem];

/** Returns only published stories, suitable for public rendering */
export function getPublishedStories(): Story[] {
  return ALL_STORIES.filter((s) => s.published);
}

/** Returns the featured published story, or the first published story if none is marked featured */
export function getFeaturedStory(): Story | null {
  const published = getPublishedStories();
  return published.find((s) => s.featured) ?? published[0] ?? null;
}

/** Returns a single published story by slug, or null if not found / not published */
export function getStoryBySlug(slug: string): Story | null {
  return ALL_STORIES.find((s) => s.slug === slug && s.published) ?? null;
}

/** Returns all valid published slugs — used for generateStaticParams */
export function getPublishedSlugs(): string[] {
  return getPublishedStories().map((s) => s.slug);
}

/** Returns published stories for a given collection */
export function getStoriesByCollection(collection: StoryCollection): Story[] {
  return getPublishedStories().filter((s) => s.collection === collection);
}

/** Returns related published stories (same themes, excluding the current slug) */
export function getRelatedStories(currentSlug: string, limit = 3): Story[] {
  const current = getStoryBySlug(currentSlug);
  if (!current) return [];

  return getPublishedStories()
    .filter((s) => s.slug !== currentSlug)
    .sort((a, b) => {
      const aOverlap = a.themes.filter((t) => current.themes.includes(t)).length;
      const bOverlap = b.themes.filter((t) => current.themes.includes(t)).length;
      return bOverlap - aOverlap;
    })
    .slice(0, limit);
}
