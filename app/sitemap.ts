import { MetadataRoute } from 'next';

// --- 1. DATA DEFINED LOCALLY TO PREVENT IMPORT ERRORS ---
const DOMAIN_DATA: Record<string, any> = {
  "web-development": { title: "Web Development" },
  "content-writing": { title: "Content Writing" },
  "graphic-design": { title: "Graphic Design" },
  "event-management": { title: "Event Management" },
  "video-editing": { title: "Video Editing" }
};

export default function sitemap(): MetadataRoute.Sitemap {
  // 2. HARDCODED PRODUCTION DOMAIN
  const baseUrl = 'https://edc-portal-six.vercel.app';

  // 3. STATIC ROUTES
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

  // 4. DYNAMIC ROUTES (Generated from local data)
  const domainRoutes = Object.keys(DOMAIN_DATA).map((slug) => ({
    url: `${baseUrl}/domains/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...domainRoutes];
}