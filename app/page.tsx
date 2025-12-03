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

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Check for logged in user on mount and refresh status
  useEffect(() => {
    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      const storedUser = JSON.parse(storedUserStr);
      setUser(storedUser);

      // Fetch fresh status from backend
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