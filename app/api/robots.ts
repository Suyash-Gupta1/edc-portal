import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://edc-portal-git-main-suyash-guptas-projects-29111050.vercel.app?_vercel_share=FBk2JRIQoGl0KduhRIJs0l4ChBNXU0aN'; // REPLACE with actual domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow admin/private routes from being crawled
      disallow: ['/api/admin/', '/admin/', '/private/'], 
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}