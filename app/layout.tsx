import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrepreneurship Development Cell',
  description: 'EDC NIT Durgapur Landing Page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Tailwind CSS (CDN for simplicity as per original setup) */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Model Viewer */}
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"></script>

        {/* Global Styles */}
        <style dangerouslySetInnerHTML={{ __html: `
            body {
                font-family: 'Inter', sans-serif;
                background-color: #050505;
                color: #ffffff;
                overflow-x: hidden; 
            }

            h1, h2, h3, h4, .font-display {
                font-family: 'Space Grotesk', sans-serif;
            }

            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: #050505; }
            ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }

            /* --- Marquee Animation --- */
            .marquee-wrapper {
                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
            .animate-marquee {
                animation: marquee 10s linear infinite;
            }
            @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }

            /* --- Stacking Cards --- */
            .stacking-card {
                position: sticky;
                transition: transform 0.3s ease;
                transform-origin: center top;
            }
            
            .glass-card {
                background: rgba(255, 255, 255, 0.03);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }

            .domain-card {
                background-color: #0A0A0A;
                border: 1px solid rgba(255, 255, 255, 0.05);
                box-shadow: 0 20px 40px -10px rgba(0,0,0,0.5);
                overflow: hidden;
                position: relative;
            }

            /* --- Navbar Animations --- */
            .nav-transition {
                transition: all 0.7s cubic-bezier(0.65, 0, 0.35, 1);
            }
            .content-transition {
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .nav-closed {
                width: 340px;
                height: 56px;
                border-radius: 9999px;
            }
            @media (min-width: 768px) {
                .nav-closed {
                    width: 420px;
                }
            }
            .nav-open {
                width: 95vw;
                height: 92vh;
                border-radius: 32px;
            }
            @media (min-width: 768px) {
                .nav-open {
                    max-width: 64rem;
                    height: 550px;
                }
            }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            
            /* Model Container */
            .hero-model-container {
                position: relative;
                z-index: 150; 
                transition: transform 0.1s linear; 
                padding: 2rem; 
            }
            
            #hero-section {
                padding-top: 8rem; 
                min-height: 110vh; 
            }

            .model-inner-height {
                height: 450px;
            }
            @media (min-width: 768px) {
                .model-inner-height {
                    height: 550px;
                }
            }

            /* --- Visit Us Button Hover Effect --- */
            .visit-us-btn {
                position: relative;
                overflow: hidden; 
                z-index: 1; 
                color: white; 
                transition: color 0.5s 0.3s ease-in-out; 
                display: inline-flex; 
                align-items: center;
            }
            
            .visit-us-btn i {
                background-color: white; 
                color: black;
                border-radius: 50%;
                padding: 0.25rem;
                transition: transform 0.3s ease;
                z-index: 2; 
            }

            .visit-us-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                right: 1.5rem; 
                width: 20px; 
                height: 20px;
                background: #e5e5e5; 
                border-radius: 50%;
                transform: translate(0, -50%) scale(1); 
                transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
                z-index: -1; 
            }
            
            .visit-us-btn:hover {
                color: black; 
            }

            .visit-us-btn:hover::before {
                transform: translate(0, -50%) scale(500); 
            }
            
            .visit-us-btn span {
                z-index: 2;
            }
            
            .perspective-1000 {
                perspective: 1000px;
            }
        `}} />
      </head>
      <body className="antialiased selection:bg-lime-400 selection:text-black flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}