'use client';
import React, { useState, useEffect } from 'react';
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

// --- KONAMI CODE LOGIC ---
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
      // Keep only the last 10 keys
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);
      
      // Check sequence
      if (newInput.join('') === KONAMI_CODE.join('')) {
        action();
        setInput([]); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, action]);
};

export default function App() {
  // showPreloader: Controls if the Preloader component is mounted
  const [showPreloader, setShowPreloader] = useState(true);
  
  // isContentVisible: Controls the opacity fade-in of the main website
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  // isSessionChecked: Prevents rendering until we know if we need the preloader
  const [isSessionChecked, setIsSessionChecked] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isHackerModalOpen, setIsHackerModalOpen] = useState(false);

  // Initialize Konami Code Listener
  useKonamiCode(() => {
    setIsHackerModalOpen(true);
  });

  useEffect(() => {
    // 1. Check User Persistence & Refresh Status
    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        setUser(storedUser);

        // Fetch latest status
        fetch('/api/auth/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: storedUser.username })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                const updatedUser = { ...storedUser, ...data.status };
                setUser(updatedUser);
                localStorage.setItem('edc_user', JSON.stringify(updatedUser));
            }
        })
        .catch(err => console.error("Failed to refresh status", err));

      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    // 2. Check Preloader Session
    const hasPreloaded = sessionStorage.getItem('edc_preloaded');
    if (hasPreloaded === 'true') {
      // VISITED BEFORE:
      // 1. Disable preloader immediately
      setShowPreloader(false);
      // 2. Trigger fade-in animation after a tiny delay to ensure DOM paint
      setTimeout(() => {
          setIsContentVisible(true);
      }, 100);
    } else {
      // FIRST VISIT:
      // Keep preloader active (default state)
      setShowPreloader(true);
    }
    
    // Mark the session check as complete so we can render
    setIsSessionChecked(true);
  }, []);

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

  // Prevent hydration mismatch or flash by waiting for session check
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