'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Domains from '../components/Domains';
import Footer from '../components/Footer';
import Preloader from '../components/Preloader';
import ScrollProgress from '../components/ScrollProgress';
import AuthModal from '../components/AuthModal';
import AdminDashboard from '../components/AdminDashboard';
import HackerModal from '../components/HackerModal';
// Removed SmoothScroll import

// --- KONAMI CODE LOGIC (Remains the same) ---
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

const useKonamiCode = (action: () => void) => {
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);
      
      if (newInput.join('') === KONAMI_CODE.join('')) {
        action();
        setInput([]); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, action]);
};
// ---------------------------------------------

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isHackerModalOpen, setIsHackerModalOpen] = useState(false);

  // --- Global Scroll Lock State ---
  const isScrollLocked = useMemo(() => {
      return isAuthModalOpen || isAdminModalOpen || isHackerModalOpen;
  }, [isAuthModalOpen, isAdminModalOpen, isHackerModalOpen]);

  useKonamiCode(() => {
    setIsHackerModalOpen(true);
  });

  useEffect(() => {
    // 1. Check User Persistence & Refresh Status (omitted body for brevity)
    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        setUser(storedUser);
        // fetch('/api/auth/status' ... ) logic here
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    // 2. Check Preloader Session
    const hasPreloaded = sessionStorage.getItem('edc_preloaded');
    if (hasPreloaded === 'true') {
      setShowPreloader(false);
      setTimeout(() => { setIsContentVisible(true); }, 100);
    } else {
      setShowPreloader(true);
    }
    
    setIsSessionChecked(true);
  }, []);

  // Effect to hide native scrollbar when modal is open
  useEffect(() => {
    // This part is still necessary to allow scrolling inside modals without moving the background
    document.body.style.overflow = isScrollLocked ? 'hidden' : '';
  }, [isScrollLocked]);


  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setIsContentVisible(true);
    sessionStorage.setItem('edc_preloaded', 'true');
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('edc_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edc_user');
  };

  if (!isSessionChecked) {
    return <div className="min-h-screen w-full bg-[#050505]" />;
  }

  return (
    <>
      <ScrollProgress />
      
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminDashboard 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      <HackerModal 
        isOpen={isHackerModalOpen}
        onClose={() => setIsHackerModalOpen(false)}
      />

      <div 
        className={`flex flex-col w-full min-h-screen transition-opacity duration-1000 ease-out ${
          isContentVisible ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
        }`}
      >
        <Navbar 
          user={user} 
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />
        
        {/* Removed SmoothScroll wrapper */}
        <main className="flex-grow w-full">
            <Hero />
            <Marquee />
            <About />
            <Domains />
        </main>
        <Footer />
      </div>
    </>
  );
}