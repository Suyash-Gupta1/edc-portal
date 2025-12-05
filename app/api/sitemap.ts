import { MetadataRoute } from 'next';
import { DOMAIN_DATA } from '@/lib/domain-data';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. HARDCODED PRODUCTION DOMAIN
  const baseUrl = 'https://edc-portal-six.vercel.app';

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

  const domainRoutes = Object.keys(DOMAIN_DATA).map((slug) => ({
    url: `${baseUrl}/domains/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...domainRoutes];
}