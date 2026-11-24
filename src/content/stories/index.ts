// Central registry for all published story modules.
import type { Story, StoryCollection, StoryTheme } from './types';

// Core stories
import { a_presidents_visit_the_attempt_to_have_our_voices_heard } from './a-presidents-visit-the-attempt-to-have-our-voices-heard';
import { aya } from './aya';
import { between_three_worlds_growing_up_jewish_in_djerba } from './between-three-worlds-growing-up-jewish-in-djerba';
import { diaa } from './diaa';
import { djerba_01 } from './djerba-01';
import { djerba_02 } from './djerba-02';
import { djerba_03 } from './djerba-03';
import { djerba_04 } from './djerba-04';
import { djerba_05 } from './djerba-05';
import { djerba_06 } from './djerba-06';
import { duha } from './duha';
import { from_arabic_to_hebrew_discovering_a_connection_through_language_and_faith } from './from-arabic-to-hebrew-discovering-a-connection-through-language-and-faith';
import { marwa } from './marwa';
import { natasha } from './natasha';
import { rahaf } from './rahaf';
import { shoemaker } from './shoemaker';
import { the_lesson_i_never_forgot_friendship_courage_and_humiliation_in_an_arabic_classroom } from './the-lesson-i-never-forgot-friendship-courage-and-humiliation-in-an-arabic-classroom';
import { the_quran_in_the_classroom_a_principal_who_defended_my_right_to_refuse } from './the-quran-in-the-classroom-a-principal-who-defended-my-right-to-refuse';
import { three_years_lost_when_shabbat_came_before_an_examination } from './three-years-lost-when-shabbat-came-before-an-examination';
import { waseem } from './waseem';

// Additional stories extracted from the docx files
import { additional_story_1 } from './additional-story-1';
import { additional_story_2 } from './additional-story-2';
import { additional_story_3 } from './additional-story-3';
import { additional_story_4 } from './additional-story-4';
import { additional_story_5 } from './additional-story-5';
import { additional_story_6 } from './additional-story-6';
import { additional_story_7 } from './additional-story-7';
import { additional_story_8 } from './additional-story-8';
import { additional_story_9 } from './additional-story-9';
import { additional_story_10 } from './additional-story-10';
import { additional_story_11 } from './additional-story-11';
import { additional_story_12 } from './additional-story-12';
import { additional_story_13 } from './additional-story-13';
import { additional_story_14 } from './additional-story-14';
import { additional_story_15 } from './additional-story-15';
import { additional_story_16 } from './additional-story-16';
import { additional_story_17 } from './additional-story-17';
import { additional_story_18 } from './additional-story-18';
import { additional_story_19 } from './additional-story-19';
import { additional_story_20 } from './additional-story-20';
import { additional_story_21 } from './additional-story-21';
import { additional_story_22 } from './additional-story-22';
import { additional_story_23 } from './additional-story-23';
import { additional_story_24 } from './additional-story-24';
import { additional_story_25 } from './additional-story-25';
import { additional_story_26 } from './additional-story-26';
import { additional_story_27 } from './additional-story-27';
import { additional_story_28 } from './additional-story-28';
import { additional_story_29 } from './additional-story-29';
import { additional_story_30 } from './additional-story-30';
import { additional_story_31 } from './additional-story-31';
import { additional_story_32 } from './additional-story-32';
import { additional_story_33 } from './additional-story-33';
import { additional_story_34 } from './additional-story-34';
import { additional_story_35 } from './additional-story-35';
import { additional_story_36 } from './additional-story-36';
import { additional_story_37 } from './additional-story-37';
import { additional_story_38 } from './additional-story-38';
import { additional_story_39 } from './additional-story-39';
import { additional_story_40 } from './additional-story-40';
import { additional_story_41 } from './additional-story-41';
import { additional_story_42 } from './additional-story-42';
import { additional_story_43 } from './additional-story-43';
import { additional_story_44 } from './additional-story-44';
import { additional_story_45 } from './additional-story-45';
import { additional_story_46 } from './additional-story-46';
import { additional_story_47 } from './additional-story-47';
import { additional_story_48 } from './additional-story-48';
import { additional_story_49 } from './additional-story-49';
import { additional_story_50 } from './additional-story-50';

export type { Story, StoryCollection, StoryTheme };

const ALL_STORIES: Story[] = [
  a_presidents_visit_the_attempt_to_have_our_voices_heard,
  aya,
  between_three_worlds_growing_up_jewish_in_djerba,
  diaa,
  djerba_01,
  djerba_02,
  djerba_03,
  djerba_04,
  djerba_05,
  djerba_06,
  duha,
  from_arabic_to_hebrew_discovering_a_connection_through_language_and_faith,
  marwa,
  natasha,
  rahaf,
  shoemaker,
  the_lesson_i_never_forgot_friendship_courage_and_humiliation_in_an_arabic_classroom,
  the_quran_in_the_classroom_a_principal_who_defended_my_right_to_refuse,
  three_years_lost_when_shabbat_came_before_an_examination,
  waseem,
  // Additional stories
  additional_story_1,
  additional_story_2,
  additional_story_3,
  additional_story_4,
  additional_story_5,
  additional_story_6,
  additional_story_7,
  additional_story_8,
  additional_story_9,
  additional_story_10,
  additional_story_11,
  additional_story_12,
  additional_story_13,
  additional_story_14,
  additional_story_15,
  additional_story_16,
  additional_story_17,
  additional_story_18,
  additional_story_19,
  additional_story_20,
  additional_story_21,
  additional_story_22,
  additional_story_23,
  additional_story_24,
  additional_story_25,
  additional_story_26,
  additional_story_27,
  additional_story_28,
  additional_story_29,
  additional_story_30,
  additional_story_31,
  additional_story_32,
  additional_story_33,
  additional_story_34,
  additional_story_35,
  additional_story_36,
  additional_story_37,
  additional_story_38,
  additional_story_39,
  additional_story_40,
  additional_story_41,
  additional_story_42,
  additional_story_43,
  additional_story_44,
  additional_story_45,
  additional_story_46,
  additional_story_47,
  additional_story_48,
  additional_story_49,
  additional_story_50,
];

export function getPublishedStories(): Story[] {
  const published = ALL_STORIES.filter((s) => s.published);
  return [...published.filter((s) => s.featured), ...published.filter((s) => !s.featured)];
}

export function getFeaturedStory(): Story | null {
  const published = getPublishedStories();
  return published.find((s) => s.featured) ?? published[0] ?? null;
}

export function getStoryBySlug(slug: string): Story | null {
  return ALL_STORIES.find((s) => s.slug === slug && s.published) ?? null;
}

export function getPublishedSlugs(): string[] {
  return getPublishedStories().map((s) => s.slug);
}

export function getStoriesByCollection(collection: StoryCollection): Story[] {
  return getPublishedStories().filter((s) => s.collection === collection);
}

export function getStoriesByTheme(theme: StoryTheme): Story[] {
  return getPublishedStories().filter((s) => s.themes.includes(theme));
}

export function getAllCollections(): StoryCollection[] {
  const cols = new Set(getPublishedStories().map((s) => s.collection));
  return Array.from(cols);
}

export function getAllThemes(): StoryTheme[] {
  const themes = new Set<StoryTheme>();
  getPublishedStories().forEach((s) => s.themes.forEach((t) => themes.add(t)));
  return Array.from(themes);
}

export function searchStories(stories: Story[], query: string): Story[] {
  if (!query.trim()) return stories;
  const q = query.toLowerCase();
  return stories.filter((s) => {
    return (
      s.title.toLowerCase().includes(q) ||
      s.excerpt?.toLowerCase().includes(q) ||
      s.name?.toLowerCase().includes(q) ||
      (s.location?.toLowerCase().includes(q) ?? false) ||
      s.themes.some((t) => t.toLowerCase().includes(q)) ||
      s.content.toLowerCase().includes(q)
    );
  });
}

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
