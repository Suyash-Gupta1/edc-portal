import React, { useEffect, useRef } from 'react';
import { Code2, Feather, Palette, CalendarCheck, ArrowRight } from 'lucide-react';
import { DomainProps } from '../types';

interface DomainCardProps extends DomainProps {
    index: number;
    setRef: (el: HTMLDivElement | null) => void;
}

// Static Data Configuration
const DOMAINS_DATA = [
    {
      title: "Web Development",
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
      description: "Visualizing concepts into stunning reality. We craft compelling aesthetics that communicate ideas visually and leave a lasting impact.",
      icon: <Palette className="w-8 h-8" />,
      colorClass: "text-pink-500",
      iconBgClass: "bg-pink-500/10",
      iconTextClass: "text-pink-400",
      svgColorClass: "text-pink-500",
      image: "https://images.unsplash.com/photo-1626785774573-4b7993143a26?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Event Management",
      description: "Executing seamless, memorable experiences. From planning to execution, we ensure every event runs perfectly and creates value.",
      icon: <CalendarCheck className="w-8 h-8" />,
      colorClass: "text-orange-500",
      iconBgClass: "bg-orange-500/10",
      iconTextClass: "text-orange-400",
      svgColorClass: "text-orange-500",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
    }
];

const getSvgForDomain = (colorClass: string, index: number) => {
    if (index === 0) { // Web Dev
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
    } else if (index === 1) { // Content
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/></svg>;
    } else if (index === 2) { // Graphics
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>;
    } else { // Event
        return <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className={colorClass}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>;
    }
};

const DomainCard: React.FC<DomainCardProps> = ({ 
  title, description, icon, colorClass, iconBgClass, iconTextClass, svgPath, index, image, setRef
}) => {
  return (
    <div 
      ref={setRef}
      className="stacking-card sticky z-10 w-full origin-top" 
      style={{ top: `${8 + (index * 2)}rem`, zIndex: 10 + index }}
    >
      <div className="domain-card rounded-[2rem] p-6 md:p-12 h-auto md:h-[550px] flex flex-col md:flex-row items-center gap-6 md:gap-10 relative overflow-hidden group border-t border-white/10 transition-colors duration-500 hover:border-[#ccff00]/50 hover:shadow-[0_0_50px_-12px_rgba(204,255,0,0.3)]">
        
        {/* Backgrounds */}
        <div className="absolute inset-0 bg-[#0F0F0F] z-0"></div>
        <div className="absolute inset-0 grid-pattern opacity-20 z-0"></div>
        
        {/* Lime Glow Effect - Radial Gradient */}
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"
            style={{
                background: 'radial-gradient(circle at center, rgba(204,255,0,0.1) 0%, rgba(204,255,0,0.05) 30%, transparent 70%)'
            }}
        ></div>
        
        {/* SVG Decoration */}
        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 z-0 scale-150 origin-bottom-right">
           {svgPath}
        </div>
        
        {/* Left Content */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left pt-2 md:pt-0">
          <div className={`w-14 h-14 md:w-16 md:h-16 ${iconBgClass} rounded-2xl flex items-center justify-center ${iconTextClass} mb-6 md:mb-8 border ${colorClass.replace('text-', 'border-').replace('500', '500/20')} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
             {icon}
          </div>
          <h3 className="text-3xl md:text-5xl font-bold font-display mb-4 md:mb-6 text-white leading-tight">{title}</h3>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-lg">{description}</p>
          
          <button className="mt-8 md:mt-10 text-sm font-bold uppercase tracking-widest text-[#ccff00] flex items-center gap-2 group-hover:gap-4 transition-all">
            Explore Domain <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Image */}
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

  // Scroll Animation Logic
  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const nextCard = cardRefs.current[index + 1];
        
        let scale = 1;
        
        if (nextCard) {
            const rect = card.getBoundingClientRect();
            const nextRect = nextCard.getBoundingClientRect();
            
            // Calculate distance between the top of this card and the top of the next card
            const gap = nextRect.top - rect.top;
            
            // The sticky offset diff is approximately 2rem (32px)
            const minGap = 32;
            
            // Start scaling down when the next card is within this distance
            const animDistance = 600; 

            // Calculate progress: 0 = stacked, 1 = far away
            let progress = (gap - minGap) / animDistance;
            progress = Math.max(0, Math.min(1, progress));
            
            // Scale down to 0.9 as the next card covers it
            scale = 0.9 + (0.1 * progress);
        } else {
             scale = 1;
        }

        card.style.transform = `scale(${scale})`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once to set initial state
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