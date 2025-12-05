import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // 1. HARDCODED PRODUCTION DOMAIN
  metadataBase: new URL('https://edc-portal-six.vercel.app'),
  verification: {
    google: 'yQw3nCySjNEQZhHr56v5gTwuTvh5JjQxC8sriM7VQYA',
  },

  icons:{
    icon: '/favicon.ico?',
  },
  
  title: {
    default: 'EDC NIT Durgapur | Entrepreneurship Development Cell',
    template: '%s | EDC NIT Durgapur',
  },
  description: 'The official Entrepreneurship Development Cell of NIT Durgapur. We foster innovation, leadership, and startup culture among students in Eastern India. Join us for Auditions 2026.',
  keywords: ['EDC', 'NIT Durgapur', 'Entrepreneurship', 'Startups', 'Innovation', 'Business Club', 'College Society', 'Auditions 2026'],
  authors: [{ name: 'WebTeam EDC' }],
  creator: 'EDC NIT Durgapur',
  publisher: 'EDC NIT Durgapur',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // 2. UPDATED URL
    url: 'https://edc-portal-six.vercel.app',
    siteName: 'EDC NIT Durgapur',
    title: 'EDC NIT Durgapur - Where Innovation Meets Execution',
    description: 'Join the premier entrepreneurship cell of NIT Durgapur. Explore our domains, events, and initiatives.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EDC NIT Durgapur Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EDC NIT Durgapur',
    description: 'Fostering the spirit of entrepreneurship.',
    images: ['/og-image.jpg'],
    creator: '@edcnitd',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EDC NIT Durgapur',
    // 3. UPDATED URL IN JSON-LD
    url: 'https://edc-portal-six.vercel.app',
    logo: 'https://edc-portal-six.vercel.app/logo.png', // Ensure you have a logo.png in public folder
    sameAs: [
      'https://www.instagram.com/edc.nitd',
      'https://www.linkedin.com/company/edcnitd',
      'https://twitter.com/edcnitd',
      'https://www.facebook.com/edc.nitd',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'edc@nitdgp.ac.in',
      contactType: 'customer support',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>
        <style dangerouslySetInnerHTML={{ __html: `
            body { font-family: 'Inter', sans-serif; background-color: #050505; color: #ffffff; overflow-x: hidden; }
            h1, h2, h3, h4, .font-display { font-family: 'Space Grotesk', sans-serif; }
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #050505; }
            ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
            .marquee-wrapper { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
            .animate-marquee { animation: marquee 10s linear infinite; }
            @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .stacking-card { position: sticky; transition: transform 0.3s ease; transform-origin: center top; }
            .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
            .domain-card { background-color: #0A0A0A; border: 1px solid rgba(255, 255, 255, 0.05); box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5); overflow: hidden; position: relative; }
            .nav-transition { transition: all 0.7s cubic-bezier(0.65, 0, 0.35, 1); }
            .content-transition { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
            .nav-closed { width: 340px; height: 56px; border-radius: 9999px; }
            @media (min-width: 768px) { .nav-closed { width: 420px; } }
            .nav-open { width: 95vw; height: 92vh; border-radius: 32px; }
            @media (min-width: 768px) { .nav-open { max-width: 64rem; height: 550px; } }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .hero-model-container { position: relative; z-index: 150; transition: transform 0.1s linear; padding: 2rem; }
            #hero-section { padding-top: 8rem; min-height: 110vh; }
            .model-inner-height { height: 450px; }
            @media (min-width: 768px) { .model-inner-height { height: 550px; } }
            .visit-us-btn { position: relative; overflow: hidden; z-index: 1; color: white; transition: color 0.5s 0.3s ease-in-out; display: inline-flex; align-items: center; }
            .visit-us-btn i { background-color: white; color: black; border-radius: 50%; padding: 0.25rem; transition: transform 0.3s ease; z-index: 2; }
            .visit-us-btn::before { content: ''; position: absolute; top: 50%; right: 1.5rem; width: 20px; height: 20px; background: #e5e5e5; border-radius: 50%; transform: translate(0, -50%) scale(1); transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); z-index: -1; }
            .visit-us-btn:hover { color: black; }
            .visit-us-btn:hover::before { transform: translate(0, -50%) scale(500); }
            .visit-us-btn span { z-index: 2; }
            .perspective-1000 { perspective: 1000px; }
        `}} />
      </head>
      <body className="antialiased selection:bg-lime-400 selection:text-black flex flex-col min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}