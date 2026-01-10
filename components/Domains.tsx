import React, { useEffect, useRef, useState } from 'react';
import { Code2, Feather, Palette, CalendarCheck, ArrowRight, Video } from 'lucide-react';
import { DomainProps } from '../types';

interface DomainCardProps extends DomainProps {
    index: number;
    slug: string;
    setRef: (el: HTMLDivElement | null) => void;
}


const DOMAINS_DATA = [
    {
      title: "Web Development",
      slug: "web-development",
      description: "Architecting the digital future with modern stacks. We build responsive, performant, and scalable applications that drive innovation.",
      icon: <Code2 className="w-8 h-8" />,
      colorClass: "text-blue-500",
      iconBgClass: "bg-blue-500/10",
      iconTextClass: "text-blue-400",
      svgColorClass: "text-blue-500",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Content Writing",
      slug: "content-writing",
      description: "Weaving narratives that inspire, inform, and engage. Our words shape the brand's voice and connect deeply with the audience.",
      icon: <Feather className="w-8 h-8" />,
      colorClass: "text-purple-500",
      iconBgClass: "bg-purple-500/10",
      iconTextClass: "text-purple-400",
      svgColorClass: "text-purple-500",
      image: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Graphic Design",
      slug: "graphic-design",
      description: "Visualizing concepts into stunning reality. We craft compelling aesthetics that communicate ideas visually and leave a lasting impact.",
      icon: <Palette className="w-8 h-8" />,
      colorClass: "text-pink-500",
      iconBgClass: "bg-pink-500/10",
      iconTextClass: "text-pink-400",
      svgColorClass: "text-pink-500",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop"
    },
    {
      title: "Event Management",
      slug: "event-management",
      description: "Executing seamless, memorable experiences. From planning to execution, we ensure every event runs perfectly and creates value.",
      icon: <CalendarCheck className="w-8 h-8" />,
      colorClass: "text-orange-500",
      iconBgClass: "bg-orange-500/10",
      iconTextClass: "text-orange-400",
      svgColorClass: "text-orange-500",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
    },
    {
      title: "Video Editing",
      slug: "video-editing",
      description: "Crafting visual stories through motion and sound. We transform raw footage into compelling narratives that capture attention and evoke emotion.",
      icon: <Video className="w-8 h-8" />,
      colorClass: "text-red-500",
      iconBgClass: "bg-red-500/10",
      iconTextClass: "text-red-400",
      svgColorClass: "text-red-500",
      image: "https://images.unsplash.com/photo-1574717432707-c67885d96459?q=80&w=2667&auto=format&fit=crop"
    },
    {
      title: "Consultancy Wing",
      slug: "Consultancy Wing",
      description: "Crafting visual stories through motion and sound. We transform raw footage into compelling narratives that capture attention and evoke emotion.",
      icon: <Feather className="w-8 h-8" />,
      colorClass: "text-red-500",
      iconBgClass: "bg-red-500/10",
      iconTextClass: "text-red-400",
      svgColorClass: "text-red-500",
      image: "https://images.unsplash.com/photo-1574717432707-c67885d96459?q=80&w=2667&auto=format&fit=crop"
    }
];

const getSvgForDomain = (colorClass: string, index: number) => {
    if (index === 0) { // Web Dev
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
    } else if (index === 1) { // Coooooontent
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>;
    } else if (index === 2) { // Graphics
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>;
    } else if (index === 3) { // Event
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>;
    } else { // Video Editing
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/><line x1="1" y1="10" x2="16" y2="10"/><line x1="5" y1="5" x2="5" y2="19"/></svg>;
    }
};

const DomainCard: React.FC<DomainCardProps> = ({ 
  title, description, icon, colorClass, iconBgClass, iconTextClass, svgPath, index, image, slug, setRef
}) => {
 
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={setRef}
      className="stacking-card sticky z-10 w-full origin-top" 
      style={{ top: `${8 + (index * 2)}rem`, zIndex: 10 + index }}
    >
      <div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="domain-card rounded-[2rem] p-6 md:p-12 h-auto md:h-[550px] flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-hidden group border-t border-white/10 transition-all duration-500 hover:border-white/20 shadow-2xl"
      >
        
        
        <div className="absolute inset-0 bg-[#0F0F0F] z-0"></div>
        <div className="absolute inset-0 grid-pattern opacity-20 z-0"></div>
        
        
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
                background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(204,255,0,0.06), transparent 40%)`
            }}
        ></div>

       
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                mixBlendMode: 'overlay'
            }}
        ></div>
        
        
        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 z-0 scale-150 origin-bottom-right">
           {svgPath}
        </div>
        
        
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left pt-2 md:pt-0">
          <div className={`w-14 h-14 md:w-16 md:h-16 ${iconBgClass} rounded-2xl flex items-center justify-center ${iconTextClass} mb-6 md:mb-8 border ${colorClass.replace('text-', 'border-').replace('500', '500/20')} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              {icon}
          </div>
          <h3 className="text-3xl md:text-5xl font-bold font-display mb-4 md:mb-6 text-white leading-tight">{title}</h3>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">{description}</p>
          
          <a 
            href={`/domains/${slug}`}
            className="mt-8 md:mt-10 text-sm font-bold uppercase tracking-widest text-[#ccff00] flex items-center gap-2 group-hover:gap-4 transition-all"
          >
            Explore Domain <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        
        <div className="relative z-10 w-full md:w-1/2 h-[220px] md:h-full flex items-center justify-center">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 relative group-hover:border-[#ccff00]/30 transition-colors duration-500 shadow-2xl">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};


const Domains: React.FC = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const nextCard = cardRefs.current[index + 1];
        let scale = 1;
        if (nextCard) {
            const rect = card.getBoundingClientRect();
            const nextRect = nextCard.getBoundingClientRect();
            const gap = nextRect.top - rect.top;
            const minGap = 32;
            const animDistance = 600; 
            let progress = (gap - minGap) / animDistance;
            progress = Math.max(0, Math.min(1, progress));
            scale = 0.9 + (0.1 * progress);
        }
        card.style.transform = `scale(${scale})`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-24 px-6 relative" id="domains">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display mb-6">Our Domains</h2>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light">
            Exploring the frontiers of innovation through distinct yet interconnected disciplines.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto space-y-32 pb-40 relative">
        {DOMAINS_DATA.map((domain, index) => (
            <DomainCard 
                key={index}
                {...domain}
                svgPath={getSvgForDomain(domain.svgColorClass, index)}
                index={index} 
                setRef={(el) => { cardRefs.current[index] = el; }}
            />
        ))}
      </div>
    </section>
  );
};

export default Domains;