'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    
    const lenis = new Lenis({
      // Increased momentum duration
      duration: 1.5, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Reduced multiplier for a heavier, more controlled feel
      wheelMultiplier: 0.8, 
      touchMultiplier: 2,
    });

   
   
    let frameId: number;
    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}