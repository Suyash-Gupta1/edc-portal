'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    // Determines how long the loader stays before sliding up
    const loadingDuration = 800; 
    const intervalTime = 10;
    const steps = loadingDuration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDuration);

    return () => {
      clearInterval(timer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  // SVG Circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <>
      <div 
        className={`
            fixed inset-0 z-[90] flex flex-col items-center justify-center 
            bg-[#050505] transition-transform duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]
            ${isLoading ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
         {/* Subtle Background Grid */}
         <div className="absolute inset-0 z-0 opacity-20" 
              style={{ 
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
                  backgroundSize: '40px 40px' 
              }}>
         </div>

         {/* Center Content - Fades out slightly faster than the slide for a cleaner effect */}
         <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-500 ${isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-[-50px]'}`}>
             
             {/* Circular Dial */}
             <div className="relative w-32 h-32 mb-8">
                {/* Rotating Outer Ring decorative */}
                <div className="absolute inset-[-10px] border border-white/5 rounded-full animate-[spin_4s_linear_infinite]"></div>
                
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle 
                        cx="50" cy="50" r={radius} 
                        fill="none" 
                        stroke="#1a1a1a" 
                        strokeWidth="2" 
                    />
                    {/* Progress Circle */}
                    <circle 
                        cx="50" cy="50" r={radius} 
                        fill="none" 
                        stroke="#ccff00" 
                        strokeWidth="2" 
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        className="transition-all duration-75 ease-out"
                    />
                </svg>
                
                {/* Counter */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold font-display text-white tabular-nums tracking-tighter">
                        {Math.min(100, Math.round(progress))}
                    </span>
                </div>
             </div>

             {/* Text Below */}
             <div className="flex flex-col items-center gap-2 overflow-hidden h-8">
                 <div className="flex gap-3 text-[10px] md:text-xs font-bold font-display tracking-[0.2em] text-gray-500 uppercase">
                    <span className={`transition-all duration-300 ${progress > 15 ? 'text-white translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Ideate</span>
                    <span className={`text-[#ccff00] transition-opacity duration-300 ${progress > 30 ? 'opacity-100' : 'opacity-0'}`}>•</span>
                    <span className={`transition-all duration-300 delay-75 ${progress > 45 ? 'text-white translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Innovate</span>
                    <span className={`text-[#ccff00] transition-opacity duration-300 ${progress > 60 ? 'opacity-100' : 'opacity-0'}`}>•</span>
                    <span className={`transition-all duration-300 delay-150 ${progress > 75 ? 'text-white translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Incubate</span>
                 </div>
             </div>
         </div>
      </div>
      {children}
    </>
  );
}
