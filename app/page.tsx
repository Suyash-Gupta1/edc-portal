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
import CustomCursor from '../components/CustomCursor';
import '../types'

export default function App() {
  const [isLoading, setIsLoading] = useState(true); 
  const [showContent, setShowContent] = useState(false); 
  
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    // 1. Check User
    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        setUser(storedUser);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }

    // 2. Check Preloader Session
    const hasPreloaded = sessionStorage.getItem('edc_preloaded');
    if (hasPreloaded === 'true') {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 50);
    }
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('edc_preloaded', 'true');
    setTimeout(() => setShowContent(true), 50);
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
        className={`flex flex-col w-full min-h-screen transition-opacity duration-1000 ease-in-out ${
          showContent ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden'
        }`}
      >
        <Navbar 
          user={user} 
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />
        <main className="flex-grow w-full">
          <Hero user={user} onOpenAuth={() => setIsAuthModalOpen(true)} />
          <Marquee />
          <About />
          <Domains />
        </main>
        <Footer />
      </div>

      
        <CustomCursor />
      
    </>
  );
}