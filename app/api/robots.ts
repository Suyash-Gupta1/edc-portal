import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // 1. HARDCODED PRODUCTION DOMAIN
  const baseUrl = 'https://edc-portal-six.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/admin/', '/admin/', '/private/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}