import type { Metadata } from 'next';
import { getPublishedStories, getAllThemes, getAllCollections } from '@/content/stories';
import StoriesClient from './StoriesClient';

export const metadata: Metadata = {
  title: 'Stories | Echoes of Identity',
  description:
    'Personal testimonies, oral histories, and lived experiences from Gaza, Djerba, Tunisia, and beyond — preserved in their own words, across cultures and generations.',
  keywords:
    'oral history, personal testimony, Gaza, Djerba, Tunisia, identity, memory, immigration, Echoes of Identity',
  alternates: {
    canonical: 'https://echoesofidentity.org/stories',
  },
  openGraph: {
    title: 'Stories | Echoes of Identity',
    description:
      'Personal testimonies and oral histories — preserved across cultures and generations.',
    url: 'https://echoesofidentity.org/stories',
    siteName: 'Echoes of Identity',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Echoes of Identity Stories' }],
    locale: 'en_US',
    type: 'website',
  },
};

export default function StoriesPage() {
  const stories = getPublishedStories();
  const allThemes = getAllThemes();
  const allCollections = getAllCollections();

  return (
    <StoriesClient stories={stories} allThemes={allThemes} allCollections={allCollections} />
  );
}
