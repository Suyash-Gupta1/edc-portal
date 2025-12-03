import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const duration = 3000; // Total duration in ms
    const interval = 30; // Update interval in ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      const fadeTimer = setTimeout(() => {
        setOpacity(0);
        setTimeout(onComplete, 500); 
      }, 200);
      return () => clearTimeout(fadeTimer);
    }
  }, [count, onComplete]);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-display text-white transition-opacity duration-500 ease-in-out"
      style={{ opacity }}
    >
       <style>{`
         @keyframes wave {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
         .wave-anim {
           animation: wave 2s linear infinite;
         }
         .wave-anim-slow {
           animation: wave 3s linear infinite;
         }
       `}</style>

       <div className="w-full max-w-[600px] px-6 relative">
          <svg viewBox="0 0 400 160" className="w-full h-auto">
             <defs>
               <clipPath id="text-clip">
                  <text 
                    x="50%" 
                    y="50%" 
                    dy=".35em" 
                    textAnchor="middle" 
                    fontSize="130" 
                    fontWeight="800" 
                    fontFamily="Space Grotesk, sans-serif"
                  >
                    EDC
                  </text>
               </clipPath>
             </defs>

             {/* Background Text Outline */}
             <text 
                x="50%" 
                y="50%" 
                dy=".35em" 
                textAnchor="middle" 
                fontSize="130" 
                fontWeight="800" 
                fontFamily="Space Grotesk, sans-serif" 
                fill="#111"
                stroke="#333"
                strokeWidth="1"
             >
               EDC
             </text>

             {/* The Liquid Group */}
             <g clipPath="url(#text-clip)">
                <g style={{ transform: `translateY(${100 - count}%)`, transition: 'transform 0.1s linear' }}>
                   {/* Background Wave */}
                   <path 
                     className="wave-anim-slow" 
                     fill="#404040" 
                     opacity="0.5"
                     transform="translate(0, -10)" 
                     d="M0 25 Q 90 40 180 25 T 360 25 T 540 25 T 720 25 T 900 25 V 200 H 0 Z"
                   />
                   
                   {/* Front Wave (White Foam) */}
                   <path 
                     className="wave-anim" 
                     fill="#ffffff" 
                     d="M0 25 Q 80 10 160 25 T 320 25 T 480 25 T 640 25 T 800 25 V 200 H 0 Z"
                   />
                </g>
             </g>
             
             {/* Text Outline Overlay */}
             <text 
                x="50%" 
                y="50%" 
                dy=".35em" 
                textAnchor="middle" 
                fontSize="130" 
                fontWeight="800" 
                fontFamily="Space Grotesk, sans-serif" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="2"
             >
               EDC
             </text>
          </svg>
       </div>

       {/* Counter */}
       <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 text-6xl md:text-9xl font-bold font-display tabular-nums tracking-tighter text-white">
         {Math.floor(count)}
       </div>
    </div>
  );
};

export default Preloader;