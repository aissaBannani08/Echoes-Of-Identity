export type StoryTheme =
  | 'Family and Motherhood'
  | 'Education and Ambition'
  | 'Home and Belonging'
  | 'Memory and Loss'
  | 'Everyday Life'
  | 'Resilience and Hope'
  | 'Identity and Religion'
  | 'Immigration and Diaspora'
  | 'Craft and Tradition'
  | 'Community and Coexistence'
  | 'Language and Heritage'
  | 'Displacement'
  | 'Hardship and Survival';

export type StoryCollection =
  | 'Gaza'
  | 'Djerba'
  | 'Tunisia'
  | 'Russia'
  | 'La Goulette';

export interface Story {
  /** URL slug — determines the route /stories/[collection]/[slug] */
  slug: string;
  /** Contributor's published name or approved pseudonym */
  name: string;
  /** Editorial title of the story */
  title: string;
  /** Short excerpt for landing page previews (2–4 sentences from the actual text) */
  excerpt: string;
  /** Full first-person or third-person narrative — canonical source, not duplicated elsewhere */
  content: string;
  /** Collection this story belongs to */
  collection: StoryCollection;
  /** Thematic labels */
  themes: StoryTheme[];
  /** Path to approved cover image in /public — null if no approved image */
  coverImage: string | null;
  /** Descriptive alt text for the cover image */
  coverImageAlt: string | null;
  /** If true, this story receives featured editorial treatment on the landing page */
  featured: boolean;
  /** Only published stories are rendered on the public site */
  published: boolean;
  /** ISO date string — omit if not known or not authorized for publication */
  publishedAt?: string;
  /** Estimated reading time in minutes — calculated, not invented */
  readingTimeMinutes?: number;
  /**
   * Internal publication status note — not displayed to visitors.
   * 'approved' = contributor has approved the final wording for publication.
   * 'pending' = received but awaiting editorial sign-off.
   */
  consentStatus: 'approved' | 'pending';
  /**
   * Optional contributor profile slug — groups multiple stories from the same person.
   * If set, a contributor profile section links all their stories together.
   */
  contributorSlug?: string;
  /**
   * Optional location description for display (e.g. "Gaza, Palestine", "Djerba, Tunisia")
   */
  location?: string;
  /**
   * Optional approximate year/period for archival display (e.g. "2024", "1970s–1980s")
   */
  period?: string;
}
