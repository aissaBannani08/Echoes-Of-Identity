import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getStoryBySlug, getPublishedStories, getRelatedStories } from '@/content/stories';
import StoryClient from '../../gaza/[slug]/StoryClient';

interface Props {
  params: { collection: string; slug: string };
}

export function generateStaticParams() {
  return getPublishedStories().map((s) => ({
    collection: s.collection.toLowerCase().replace(/\s+/g, '-'),
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    return { title: 'Story Not Found | Echoes of Identity' };
  }

  const description = (story.excerpt ?? story.title).slice(0, 155);
  const canonicalUrl = `https://echoesofidentity.org/stories/${params.collection}/${story.slug}`;

  return {
    title: `${story.title} — ${story.name} | Echoes of Identity`,
    description,
    keywords: [
      'oral history',
      story.name,
      story.collection,
      ...story.themes,
      'Echoes of Identity',
    ].join(', '),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${story.title} | Echoes of Identity`,
      description,
      url: canonicalUrl,
      siteName: 'Echoes of Identity',
      images: [
        {
          url: story.coverImage ?? '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: story.coverImageAlt ?? `${story.title} — Echoes of Identity`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    robots: 'index, follow',
  };
}

export default function CollectionStoryPage({ params }: Props) {
  const story = getStoryBySlug(params.slug);

  if (!story) notFound();

  const relatedStories = getRelatedStories(story.slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    author: { '@type': 'Person', name: story.name },
    publisher: {
      '@type': 'Organization',
      name: 'Echoes of Identity',
      url: 'https://echoesofidentity.org',
    },
    description: story.excerpt,
    url: `https://echoesofidentity.org/stories/${params.collection}/${story.slug}`,
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
