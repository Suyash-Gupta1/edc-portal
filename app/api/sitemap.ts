import { MetadataRoute } from 'next';
import { DOMAIN_DATA } from '@/lib/domain-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://edc-portal-git-main-suyash-guptas-projects-29111050.vercel.app?_vercel_share=FBk2JRIQoGl0KduhRIJs0l4ChBNXU0aN'; // REPLACE with your actual domain

  // 1. Define your static routes
  const routes = [
    '',
    '/about',
    '/team',
    '/events',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Generate dynamic routes from your DOMAIN_DATA
  const domainRoutes = Object.keys(DOMAIN_DATA).map((slug) => ({
    url: `${baseUrl}/domains/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...domainRoutes];
}