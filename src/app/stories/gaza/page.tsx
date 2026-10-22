import type { Metadata } from 'next';
import { getPublishedStories, getFeaturedStory } from '@/content/stories';
import GazaClient from './GazaClient';

export const metadata: Metadata = {
  title: 'Stories from Gaza | Echoes of Identity',
  description:
    'First-person testimonies from people in Gaza. Stories of family, memory, resilience, identity, and the futures people continue to imagine — shared in their own words and preserved with care.',
  keywords:
    'Gaza stories, personal testimonies, oral history, Palestine, family, resilience, identity, Echoes of Identity',
  alternates: {
    canonical: 'https://echoesofidentity.org/stories/gaza',
  },
  openGraph: {
    title: 'Stories from Gaza | Echoes of Identity',
    description:
      'First-person testimonies from people in Gaza — stories of family, memory, resilience, and hope.',
    url: 'https://echoesofidentity.org/stories/gaza',
    siteName: 'Echoes of Identity',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stories from Gaza — Echoes of Identity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stories from Gaza | Echoes of Identity',
    description: 'First-person testimonies — stories of family, memory, resilience, and hope.',
    images: ['/og-image.jpg'],
  },
};

export default function GazaStoriesPage() {
  const stories = getPublishedStories();
  const featuredStory = getFeaturedStory();

  return <GazaClient stories={stories} featuredStory={featuredStory} />;
}
