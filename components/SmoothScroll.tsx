'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis with "Luxury" settings
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

    // 2. Animation Frame Loop (Required for Lenis to work smoothly)
    // This links Lenis updates directly to the screen refresh rate (60fps)
    let frameId: number;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 3. Cleanup: Stop the engine and loop when the component unmounts
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