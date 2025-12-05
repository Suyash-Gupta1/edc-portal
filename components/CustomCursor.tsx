'use client';
import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !cursorDotRef.current) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    // Variables for smooth movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.15;

    const animate = () => {
      const distX = mouseX - cursorX;
      const distY = mouseY - cursorY;
      
      cursorX = cursorX + distX * speed;
      cursorY = cursorY + distY * speed;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Only detect inputs to hide the cursor (fixes text selection), 
    // but REMOVED the button/link hover expansion logic.
    const handleHoverEvents = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        
        const isInput = 
            target.tagName === 'INPUT' || 
            target.tagName === 'TEXTAREA' || 
            target.tagName === 'SELECT' ||
            target.getAttribute('contenteditable') === 'true';

        if (isInput) {
            cursor.classList.add('is-hidden');
            cursorDot.classList.add('is-hidden');
        } else {
            cursor.classList.remove('is-hidden');
            cursorDot.classList.remove('is-hidden');
        }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleHoverEvents);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleHoverEvents);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Hide default cursor only if we aren't on mobile */
        @media (hover: hover) and (pointer: fine) {
            body { cursor: none; }
            a, button, [role="button"] { cursor: none; }
            
            /* Restore native text cursor for inputs */
            input, textarea, select { 
                cursor: text !important; 
            }
        }
        
        .custom-cursor-dot {
            width: 8px;
            height: 8px;
            background-color: white;
            border-radius: 50%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10000;
            pointer-events: none;
            margin-top: -4px;
            margin-left: -4px;
            mix-blend-mode: difference;
            transition: opacity 0.2s ease-in-out;
        }

        .custom-cursor-ring {
            width: 40px;
            height: 40px;
            border: 1px solid rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
            pointer-events: none;
            margin-top: -20px;
            margin-left: -20px;
            mix-blend-mode: difference;
            transition: opacity 0.2s ease-in-out; 
            /* Removed width/height transitions to stop expansion logic */
        }

        /* Hidden State (for Inputs) */
        .custom-cursor-dot.is-hidden,
        .custom-cursor-ring.is-hidden {
            opacity: 0;
        }
        
        @media (max-width: 768px) {
            .custom-cursor-dot, .custom-cursor-ring { display: none; }
            body { cursor: auto; }
        }
      `}</style>

      <div ref={cursorDotRef} className="custom-cursor-dot" />
      <div ref={cursorRef} className="custom-cursor-ring" />
    </>
  );
}