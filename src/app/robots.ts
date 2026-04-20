import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/chat', '/favicon.ico', '/icon.png', '/apple-icon.png'],
      disallow: ['/private/'],
    },
    sitemap: 'https://echoes-of-identity.vercel.app/sitemap.xml',
  }
}
