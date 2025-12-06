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
      // Linear interpolation for smooth lag
      const distX = mouseX - cursorX;
      const distY = mouseY - cursorY;
      
      cursorX = cursorX + distX * speed;
      cursorY = cursorY + distY * speed;

      // Use translate3d for GPU acceleration
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleHoverEvents = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        
        const isInput = 
            target.tagName === 'INPUT' || 
            target.tagName === 'TEXTAREA' || 
            target.tagName === 'SELECT' ||
            target.getAttribute('contenteditable') === 'true';

        const isClickable = 
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.closest('a') || 
            target.closest('button') ||
            target.classList.contains('cursor-pointer');

        // 1. Hide/Show Cursor for Inputs (Cursor disappears for text fields)
        if (isInput) {
            cursor.classList.add('is-hidden');
            cursorDot.classList.add('is-hidden');
        } else {
            cursor.classList.remove('is-hidden');
            cursorDot.classList.remove('is-hidden');
        }

        // 2. Expand DOT for Clickables (Inner circle expands, Outer ring remains normal)
        if (isClickable && !isInput) {
            cursorDot.classList.add('is-hovering-dot');
            // Ensure the ring is visible but NOT expanding
            cursor.classList.remove('is-hovering'); 
        } else {
            cursorDot.classList.remove('is-hovering-dot');
            cursor.classList.remove('is-hovering');
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
            background-color: #ccff00; /* Use brand color */
            border-radius: 50%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 10000;
            pointer-events: none; 
            margin-top: -4px;
            margin-left: -4px;
            mix-blend-mode: difference;
            /* Key transition for smooth scale */
            transition: opacity 0.2s ease-in-out, 
                        transform 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                        width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                        height 0.3s cubic-bezier(0.25, 1, 0.5, 1),
                        margin 0.3s cubic-bezier(0.25, 1, 0.5, 1); /* Added margin transition */
        }
        
        /* NEW Hover State for the DOT (Increased Size) */
        .custom-cursor-dot.is-hovering-dot {
            width: 36px; /* Increased from 24px */
            height: 36px; /* Increased from 24px */
            margin-top: -18px; /* Adjusted margin */
            margin-left: -18px; /* Adjusted margin */
            background-color: #ccff00;
            transform: scale(1.0);
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
            /* Only transition opacity and color, not size */
            transition: background-color 0.3s, 
                        border-color 0.3s,
                        opacity 0.2s;
        }

        /* Hover State for the RING: Subtle change only */
        .custom-cursor-ring.is-hovering {
            border-color: rgba(204, 255, 0, 0.5); 
            width: 40px; 
            height: 40px; 
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