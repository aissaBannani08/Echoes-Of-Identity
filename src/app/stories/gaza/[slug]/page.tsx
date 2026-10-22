import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getStoryBySlug,
  getPublishedSlugs,
  getRelatedStories,
} from '@/content/stories';
import StoryClient from './StoryClient';

interface Props {
  params: { slug: string };
}

/** Pre-generate all published story pages at build time */
export function generateStaticParams() {
  return getPublishedSlugs().map((slug) => ({ slug }));
}

/** Per-story metadata — unique title, description, and canonical URL */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    return {
      title: 'Story Not Found | Echoes of Identity',
    };
  }

  const description = story.excerpt.slice(0, 155);
  const canonicalUrl = `https://echoesofidentity.org/stories/gaza/${story.slug}`;

  return {
    title: `${story.title} — ${story.name} | Stories from Gaza | Echoes of Identity`,
    description,
    keywords: [
      'Gaza personal testimony',
      'oral history',
      story.name,
      ...story.themes,
      'Echoes of Identity',
    ].join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${story.title} | Stories from Gaza`,
      description,
      url: canonicalUrl,
      siteName: 'Echoes of Identity',
      images: [
        {
          url: story.coverImage ?? '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: story.coverImageAlt ?? `${story.title} — ${story.name}, Stories from Gaza`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${story.title} | Echoes of Identity`,
      description,
      images: [story.coverImage ?? '/og-image.jpg'],
    },
    // Structured data hints — added below as JSON-LD in the page
    robots: 'index, follow',
  };
}

export default function StoryPage({ params }: Props) {
  const story = getStoryBySlug(params.slug);

  // Unpublished or non-existent stories return 404
  if (!story) {
    notFound();
  }

  const relatedStories = getRelatedStories(story.slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    author: {
      '@type': 'Person',
      name: story.name,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Echoes of Identity',
      url: 'https://echoesofidentity.org',
    },
    description: story.excerpt,
    url: `https://echoesofidentity.org/stories/gaza/${story.slug}`,
    isPartOf: {
      '@type': 'Collection',
      name: 'Stories from Gaza',
      url: 'https://echoesofidentity.org/stories/gaza',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoryClient story={story} relatedStories={relatedStories} />
    </>
  );
}
