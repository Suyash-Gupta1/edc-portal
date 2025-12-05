'use client'
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

// --- 2. INTERNAL KONAMI HOOK ---
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
// ---------------------------------------------------

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  
  // 3. State for Hacker Modal
  const [isHackerModalOpen, setIsHackerModalOpen] = useState(false);

  // 4. Activate the Konami Code Hook
  useKonamiCode(() => {
    setIsHackerModalOpen(true);
  });

  
  useEffect(() => {
    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);

      
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
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('edc_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edc_user');
  };

  return (
    <>
      <ScrollProgress />
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <AdminDashboard 
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* 5. The Secret Hacker Modal */}
      <HackerModal 
        isOpen={isHackerModalOpen}
        onClose={() => setIsHackerModalOpen(false)}
      />

      <div 
        className={`flex flex-col w-full min-h-screen transition-opacity duration-1000 ${
          isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
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
};

export default App;