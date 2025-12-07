import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import TextHover from './TextHover';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
 
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !cardRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      
      const scrollDistance = -sectionRect.top;
      const maxScroll = sectionHeight - windowHeight;
      
      
      let progress = Math.max(0, Math.min(scrollDistance / maxScroll, 1));
      
      
      const scaleDuration = 0.6; 
      const scaleProgress = Math.min(progress / scaleDuration, 1);
      
      
      const easedScale = 1 - Math.pow(1 - scaleProgress, 3);
      
      
      const currentScale = 0.6 + (easedScale * 0.4); 
      
      cardRef.current.style.transform = `scale(${currentScale})`;
      cardRef.current.style.opacity = `${0.6 + (easedScale * 0.8)}`; // Fade in from 0.2 to 1.0

      
      const animatePath = (path: SVGPathElement | null, startP: number, endP: number) => {
        if (!path) return;
        const length = 300;
        
        let p = (progress - startP) / (endP - startP);
        p = Math.max(0, Math.min(p, 1));

        path.style.strokeDashoffset = `${length - (p * length)}`;
        path.style.opacity = p > 0.01 ? '1' : '0';
      };

      animatePath(path1Ref.current, 0.4, 0.55);
      animatePath(path2Ref.current, 0.55, 0.7);
      animatePath(path3Ref.current, 0.7, 0.85);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="about-section" className="relative h-[250vh]">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-4 md:px-6">
        
        
        <div ref={cardRef} className="w-full max-w-5xl origin-center will-change-transform flex flex-col items-center">
            
            <h2 className="text-6xl md:text-8xl font-black font-display text-white text-center mb-12 relative z-0 tracking-tighter uppercase leading-none select-none">
                ABOUT US
            </h2>

           
            <div 
                className="bg-[#C4C4C4] rounded-[2.5rem] w-full p-8 md:p-16 flex flex-col relative z-10 shadow-2xl mx-auto"
            >
                <p className="text-black text-2xl md:text-4xl leading-tight font-light mb-12 font-display">
                We are a vibrant community of hardworking individuals who would like to see an increase in interest of 
                <span className="relative inline-block mx-2 whitespace-nowrap font-medium z-10">
                    entrepreneurship
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[180%] pointer-events-none overflow-visible" viewBox="0 0 200 80" preserveAspectRatio="none">
                    <path 
                        ref={path1Ref}
                        d="M15,45 C30,15 175,10 195,35 C215,65 80,85 15,45" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ strokeDasharray: 300, strokeDashoffset: 300, transition: 'opacity 0.2s' }}
                    />
                    </svg>
                </span> 
                among the students of NIT Durgapur. We organise the second-largest entrepreneurship fest in eastern India and host events like 
                <span className="relative inline-block mx-2 whitespace-nowrap font-medium z-10">
                    Bizcup
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[125%] h-[160%] pointer-events-none overflow-visible" viewBox="0 0 120 60" preserveAspectRatio="none">
                    <path 
                        ref={path2Ref}
                        d="M5,35 C25,5 95,0 115,25 C135,55 35,65 5,35" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ strokeDasharray: 300, strokeDashoffset: 300, transition: 'opacity 0.2s' }}
                    />
                    </svg>
                </span> 
                and 
                <span className="relative inline-block mx-2 whitespace-nowrap font-medium z-10">
                    HultPrize
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[170%] pointer-events-none overflow-visible" viewBox="0 0 140 70" preserveAspectRatio="none">
                    <path 
                        ref={path3Ref}
                        d="M5,40 C30,5 115,0 135,35 C155,70 45,80 5,40" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ strokeDasharray: 300, strokeDashoffset: 300, transition: 'opacity 0.2s' }}
                    />
                    </svg>
                </span> 
                throughout the year
                </p>

               
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;