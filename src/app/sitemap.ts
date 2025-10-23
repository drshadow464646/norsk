import { MetadataRoute } from 'next';
import { documents } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://yourdomain.com'; // Replace with your actual domain

  // URLs for static pages
  const staticRoutes = ['/', '/archive', '/upload'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));

  // URLs for dynamic document pages (if they had individual pages)
  // Since we use a modal, we will just point to the archive page for discoverability
  // but if each doc had a URL like /document/[id], you would map them here.
  // For now, we are covered by the static routes.

  return [...staticRoutes];
}
