import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import TextHover from './TextHover';
import '../types';

const Hero: React.FC = () => {
  const modelViewerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const modelViewer = modelViewerRef.current;
      const container = containerRef.current;

      if (!modelViewer || !container) return;

      // Logic derived from original HTML script
      const maxScrollDistance = 600;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / maxScrollDistance, 1);

      // Rotation Logic
      const theta = progress * 120;

      // Zoom/Enlarge Logic
      const baseRadius = 14;
      const targetRadius = 5;
      const radius = baseRadius - progress * (baseRadius - targetRadius);

      // Horizontal Movement Logic
      // Shifted starting position to the right by 8vw
      const startShiftVW = 8; 
      const maxTravelVW = -25; // Increased travel slightly to compensate for right shift
      const currentShiftVW = startShiftVW + (progress * maxTravelVW);

      // Apply Camera Updates
      modelViewer.setAttribute('camera-orbit', `${theta}deg 90deg ${radius}m`);

      // Apply CSS translation - Only on Large Desktop (>= 1024px)
      // Updated from 768px to 1024px to prevent translation on tablets/mobile
      if (window.innerWidth >= 1024) {
        container.style.transform = `translateX(${currentShiftVW}vw)`;
      } else {
        container.style.transform = `translateX(0px)`;
      }

      // FOV reduction
      const baseFov = 30;
      const targetFov = 20;
      const fov = baseFov - progress * (baseFov - targetFov);
      modelViewer.setAttribute('field-of-view', `${fov}deg`);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call to set positions
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero-section" className="relative pt-32 pb-20 flex items-center justify-center min-h-[110vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.03),transparent_60%)]"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full relative z-10">
        {/* Text on Left */}
        <div className="space-y-8 order-1 z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[0.9] tracking-tighter">
            ENTREPRENEURSHIP
            <br />
            DEVELOPMENT
            <br />
            <span className="text-[#ccff00]">CELL</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
            Turning ideas into reality. Where innovation meets execution.
          </p>
          
          <button className="group relative flex items-center gap-4 bg-transparent border border-white/20 pl-8 pr-2 py-2 rounded-full transition-all duration-300 hover:border-transparent w-fit overflow-hidden">
            {/* Expanding Background Circle */}
            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[25] z-0 origin-center will-change-transform"></div>
            
            {/* Text */}
            <span className="relative z-10 text-white font-medium group-hover:text-black transition-colors duration-300">
                <TextHover text="Visit Us" />
            </span>
            
            {/* Icon Container */}
            <div className="relative z-10 w-10 h-10 flex items-center justify-center bg-white rounded-full text-black">
                <div className="relative overflow-hidden w-4 h-4">
                    <ArrowDown className="w-4 h-4 absolute inset-0 transition-transform duration-300 group-hover:translate-y-full" />
                    <ArrowDown className="w-4 h-4 absolute inset-0 -translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                </div>
            </div>
          </button>
        </div>

        {/* 3D Model on Right */}
        <div
          ref={containerRef}
          id="model-wrapper"
          className="hero-model-container order-2 model-inner-height w-full flex items-center justify-center perspective-1000"
        >
          <div className="absolute bottom-10 w-3/4 h-20 bg-[#ccff00]/10 blur-[60px] rounded-[100%] transform rotate-x-60"></div>
          {/* @ts-ignore */}
          <model-viewer
            ref={modelViewerRef}
            src="https://modelviewer.dev/shared-assets/models/RobotExpressive.glb"
            alt="A 3D model of a robot"
            disable-zoom
            shadow-intensity="2"
            exposure="0.8"
            camera-orbit="0deg 90deg 14m"
            field-of-view="30deg"
            style={{ background: 'transparent', zIndex: 200, width: '100%', height: '100%' }}
          >
            {/* @ts-ignore */}
          </model-viewer>
        </div>
      </div>
    </section>
  );
};

export default Hero;