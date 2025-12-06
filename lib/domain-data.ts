import { Code2, Feather, Palette, CalendarCheck, Globe, Server, Database, PenTool, Share2, Search, Layout, Image, Video, Users, Mic, ClipboardList, Film, Music, Aperture } from 'lucide-react';

export const DOMAIN_DATA: Record<string, any> = {
  "web-development": {
    title: "Web Development",
    subtitle: "Architecting the Digital Future",
    description: "The Web Development domain is the engineering backbone of EDC. We don't just write code; we build scalable ecosystems. From high-performance landing pages to complex internal tools, we ensure the club's digital presence is second to none.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    accent: "#3b82f6", // Blue
    stats: [
      { label: "Projects", value: "15+" },
      { label: "Tech Stack", value: "MERN / Next.js" },
      { label: "Members", value: "20+" }
    ],
    curriculum: [
      {
        title: "Frontend Mastery",
        icon: "Globe",
        desc: "Deep dive into React.js, Next.js, and modern CSS frameworks like Tailwind. Learn to build pixel-perfect, responsive interfaces."
      },
      {
        title: "Backend Engineering",
        icon: "Server",
        desc: "Master Node.js, Express, and serverless architectures. Understand RESTful APIs, authentication, and security best practices."
      },
      {
        title: "Database Management",
        icon: "Database",
        desc: "Design efficient schemas with MongoDB and PostgreSQL. Learn about data modeling, aggregation pipelines, and optimization."
      }
    ],
    role: "As a Web Developer, you will collaborate with designers to bring visuals to life, optimize application performance, and maintain the official EDC portals."
  },
  "content-writing": {
    title: "Content Writing",
    subtitle: "The Voice of Innovation",
    description: "Content is the bridge between ideas and the audience. Our team crafts compelling narratives, press releases, technical blogs, and social media captions that define the brand voice of EDC NIT Durgapur.",
    image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop",
    accent: "#a855f7", // Purple
    stats: [
      { label: "Blogs Published", value: "50+" },
      { label: "Reach", value: "10K+" },
      { label: "Campaigns", value: "12+" }
    ],
    curriculum: [
      {
        title: "Creative Copywriting",
        icon: "PenTool",
        desc: "Learn the art of persuasion. Write catchphrases, slogans, and ad copies that grab attention instantly."
      },
      {
        title: "Social Media Strategy",
        icon: "Share2",
        desc: "Understand algorithm-friendly writing for LinkedIn, Instagram, and Twitter to maximize engagement and reach."
      },
      {
        title: "SEO & Blogging",
        icon: "Search",
        desc: "Master keyword research and on-page SEO to ensure our articles rank high and reach the right audience."
      }
    ],
    role: "As a Content Writer, you will curate newsletters, draft emails for potential sponsors, and manage the editorial calendar for our publications."
  },
  "graphic-design": {
    title: "Graphic Design",
    subtitle: "Visualizing the Unimaginable",
    description: "We are the visual storytellers. The Graphic Design domain blends art with strategy to create stunning posters, merchandise, UI prototypes, and branding assets that leave a lasting visual impact.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop",
    accent: "#ec4899", // Pink
    stats: [
      { label: "Designs Shipped", value: "200+" },
      { label: "Tools", value: "Adobe Suite / Figma" },
      { label: "Brand Kits", value: "5+" }
    ],
    curriculum: [
      {
        title: "UI/UX Design",
        icon: "Layout",
        desc: "Design intuitive user interfaces using Figma. Learn about wireframing, prototyping, and user-centric design principles."
      },
      {
        title: "Digital Illustration",
        icon: "Image",
        desc: "Master Adobe Illustrator to create vector art, mascots, and scalable graphics for web and print."
      },
      {
        title: "Branding",
        icon: "Aperture",
        desc: "Understand color theory, typography, and logo design to build cohesive brand identities for events and startups."
      }
    ],
    role: "As a Graphic Designer, you will define the visual identity of our fests, design merchandise, and create social media assets that pop."
  },
  "event-management": {
    title: "Event Management",
    subtitle: "Orchestrating Excellence",
    description: "The engine that keeps EDC running. The Event Management domain handles logistics, corporate relations, sponsorship drives, and the on-ground execution of Eastern India's largest entrepreneurship summits.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    accent: "#f97316", // Orange
    stats: [
      { label: "Events Hosted", value: "30+" },
      { label: "Footfall", value: "5000+" },
      { label: "Partners", value: "40+" }
    ],
    curriculum: [
      {
        title: "Public Relations",
        icon: "Users",
        desc: "Learn to communicate effectively with stakeholders, guests, and corporate partners to build lasting relationships."
      },
      {
        title: "Public Speaking",
        icon: "Mic",
        desc: "Overcome stage fear and master the art of anchoring and public addressing during major events."
      },
      {
        title: "Logistics & Planning",
        icon: "ClipboardList",
        desc: "Master the operational side of events—from venue management to budgeting and crisis management."
      }
    ],
    role: "As an Event Manager, you will be the face of EDC during events, coordinating teams, handling guests, and ensuring seamless execution."
  },
  "video-editing": {
    title: "Video Editing",
    subtitle: "Crafting Visual Stories",
    description: "Crafting visual stories through motion and sound. We transform raw footage into compelling narratives that capture attention and evoke emotion. From high-energy teasers to cinematic after-movies, we bring the club's moments to life.",
    image: "https://images.unsplash.com/photo-1574717432707-c67885d96459?q=80&w=2667&auto=format&fit=crop",
    accent: "#ef4444", // Red
    stats: [
      { label: "Reels Edited", value: "50+" },
      { label: "Software", value: "Premiere Pro / AE" },
      { label: "Views", value: "100K+" }
    ],
    curriculum: [
      {
        title: "Video Production",
        icon: "Video",
        desc: "Master the basics of cinematography, camera angles, and lighting to capture high-quality footage."
      },
      {
        title: "Post-Production",
        icon: "Film",
        desc: "Learn advanced editing techniques in Premiere Pro, color grading, and transition mastery."
      },
      {
        title: "Motion Graphics & VFX",
        icon: "Aperture",
        desc: "Create stunning motion graphics and visual effects using After Effects to add that extra flair to your edits."
      }
    ],
    role: "As a Video Editor, you will be responsible for creating event teasers, recap reels, and promotional content that drives engagement across our social platforms."
  }
};