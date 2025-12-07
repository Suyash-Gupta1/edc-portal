'use client';
import React, { useEffect, useRef } from 'react';

export default function NoiseOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  //gives some bg feel @codegrid

  useEffect(() => {
    if (!containerRef.current) return;

    const layers = Array.from(containerRef.current.querySelectorAll('.parallax-layer')) as HTMLElement[];
    let animationFrameId: number;

    const render = () => {
      const scrollY = window.scrollY;
      
      layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '0.1');
        layer.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${mouseRef.current.x}px`);
        containerRef.current.style.setProperty('--mouse-y', `${mouseRef.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    animationFrameId = requestAnimationFrame(render);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      
     
      <div 
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            transform: 'translateZ(0)',
        }}
      />

      
      <div 
        className="absolute inset-0 z-[2]"
        style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(204, 255, 0, 0.04), transparent 80%)`,
            willChange: 'background',
        }}
      />

      
      <div 
        className="absolute inset-[-50%] w-[200%] h-[200%] opacity-[0.04] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', 
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          transform: 'translateZ(0)',
        }}
      />

      
      <div 
        className="parallax-layer absolute top-[10%] left-[5%] opacity-[0.05] text-white z-0"
        data-speed="0.15"
        style={{ willChange: 'transform' }}
      >
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.2" strokeDasharray="4 4" />
        </svg>
      </div>

      
      <div 
        className="parallax-layer absolute top-[30%] right-[10%] opacity-[0.08] text-[#ccff00] z-0"
        data-speed="-0.1"
        style={{ willChange: 'transform' }}
      >
         <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
           <path d="M50 20v60M20 50h60" stroke="currentColor" strokeWidth="1" />
         </svg>
      </div>

      
      <div 
        className="parallax-layer absolute bottom-[15%] left-[20%] opacity-[0.04] text-white z-0"
        data-speed="0.08"
        style={{ willChange: 'transform' }}
      >
        <svg width="250" height="250" viewBox="0 0 100 100" fill="none">
          <rect x="25" y="25" width="50" height="50" stroke="currentColor" strokeWidth="0.2" transform="rotate(15 50 50)" />
        </svg>
      </div>

     
      <div 
        className="parallax-layer absolute top-[60%] right-[25%] opacity-[0.03] text-white z-0"
        data-speed="-0.05"
        style={{ willChange: 'transform' }}
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <path d="M30 30 L10 50 L30 70 M70 30 L90 50 L70 70" strokeWidth="0.5" strokeLinecap="round" />
        </svg>
      </div>

      
      <div 
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #050505 100%)',
        }}
      />
    </div>
  );
}