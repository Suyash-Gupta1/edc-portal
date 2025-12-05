'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Instagram, Linkedin, Twitter, LogOut, Shield, Trophy, Egg, Bird } from 'lucide-react';
import TextHover from './TextHover';

interface User {
  username: string;
  hasSelection: boolean;
  round: number;
}

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onLogout, onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isEggBroken, setIsEggBroken] = useState(false);
  
  const lastScrollY = useRef(0);

 
  const navLinks = [
    { name: 'Home', target: '/' }, 
    { name: 'About', target: '/#about-section' }, 
    { name: 'Domains', target: '/#domains' },
   
  ];

 
  const exploreLinks = [
    { name: 'edc', url: 'https://www.edcnitd.co.in/' },
    { name: 'Events', url: 'https://www.edcnitd.co.in/event/' },
    { name: 'Team', url: 'https://www.edcnitd.co.in/team/' },
  ];

  

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleEggClick = () => {
    if (!isEggBroken) {
      setIsEggBroken(true);
      setTimeout(() => {
        setIsEggBroken(false);
      }, 3000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (isOpen || currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current + 5;
      const isScrollingUp = currentScrollY < lastScrollY.current - 5;

      if (isScrollingDown) setIsVisible(false);
      if (isScrollingUp) setIsVisible(true);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <nav
      className={`
        fixed z-50 left-1/2 -translate-x-1/2 
        border border-white/10 shadow-2xl overflow-hidden
        transform-gpu
        transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
        ${isVisible ? 'top-6 opacity-100' : '-top-32 opacity-0'}
        ${isOpen 
          ? 'w-[95vw] md:w-[90vw] h-[90vh] rounded-[32px] bg-[#0d0d0d]/90 backdrop-blur-xl' 
          : 'w-[90vw] md:w-[32rem] h-[56px] rounded-[32px] delay-100 bg-[#0d0d0d]' 
        }
      `}
    >
      
      <div className="w-full h-[56px] flex items-center justify-between px-5 relative z-20 shrink-0">
        
        
        <button
          onClick={toggleMenu}
          className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white transition-colors group z-50 focus:outline-none"
        >
          <div className="flex flex-col gap-[6px] w-4 h-4 justify-center relative">
            <span
              className={`w-4 h-[1.5px] bg-gray-300 group-hover:bg-white absolute transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-0' : '-translate-y-[3.5px]'
              }`}
            ></span>
            <span
              className={`w-4 h-[1.5px] bg-gray-300 group-hover:bg-white absolute transition-transform duration-300 ${
                isOpen ? '-rotate-45 translate-y-0' : 'translate-y-[3.5px]'
              }`}
            ></span>
          </div>
          <span
            className={`font-display tracking-wide transition-opacity duration-300 ${
              isOpen ? 'opacity-0 hidden' : 'opacity-100'
            }`}
          >
            Menu
          </span>
        </button>

        
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          <Sparkles
            className={`w-5 h-5 text-[#a855f7] fill-[#a855f7] animate-pulse transition-all duration-500 ${
              isOpen ? 'opacity-0 scale-50' : 'scale-100 opacity-100'
            }`}
          />
          <span
            className={`text-xl font-bold font-display tracking-tight absolute transition-all duration-500 delay-100 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            EDC
          </span>
        </div>

       
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <div 
                className={`relative px-4 py-1.5 rounded-full text-sm font-bold font-display transition-all duration-300 flex items-center gap-2 ${
                  user.hasSelection 
                    ? 'bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/50 shadow-[0_0_15px_rgba(204,255,0,0.4)]' 
                    : 'bg-white/5 text-white border border-white/10'
                }`}
              >
                {user.hasSelection && (
                  <span className="absolute inset-0 rounded-full bg-[#ccff00] blur-md opacity-20 animate-pulse"></span>
                )}
                
                <span className="relative z-10 flex items-center gap-2">
                    {user.hasSelection ? <Trophy className="w-3 h-3" /> : null}
                    {user.username}
                </span>

                {!user.hasSelection && user.round > 0 && (
                    <span className="relative z-10 bg-white/20 text-[10px] px-1.5 py-0.5 rounded ml-1">
                        R{user.round}
                    </span>
                )}
              </div>
              
              <button 
                onClick={onLogout}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onOpenAuth} 
              className={`overflow-hidden transition-all duration-500 ${
                isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}
            >
              <div className="bg-[#ccff00] hover:bg-[#bef264] text-black text-xs font-bold px-4 py-2 rounded-full transition-transform active:scale-95 hover:scale-105 duration-200 font-display group whitespace-nowrap">
                <TextHover text="Join Us" />
              </div>
            </button>
          )}
        </div>
      </div>

      
      <div className="w-full h-[calc(100%-56px)] flex flex-col pt-4 md:pt-4 px-6 md:px-12 overflow-y-auto no-scrollbar pb-6 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 h-auto md:h-full pb-10 md:pb-0">
          
         
          <div 
            className={`md:col-span-4 flex flex-col gap-6 md:border-r border-gray-800/50 md:pr-6 transition-all duration-500 ease-out ${
              isOpen ? 'opacity-100 translate-y-0 delay-100' : 'opacity-0 translate-y-8 invisible'
            }`}
          >
            <h3 className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2 mt-4 md:mt-0 font-display">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.target}
                    onClick={toggleMenu}
                    className="text-3xl md:text-2xl text-white font-normal hover:text-gray-200 relative group inline-block font-display"
                  >
                    <TextHover text={item.name} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div 
            className={`md:col-span-3 flex flex-col justify-between md:pl-2 transition-all duration-500 ease-out ${
              isOpen ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8 invisible'
            }`}
          >
            <div>
              <h3 className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-4 font-display">
                Explore
              </h3>
              <ul className="space-y-4">
                {exploreLinks.map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xl md:text-lg text-white font-normal relative group inline-block font-display"
                    >
                      <TextHover text={item.name} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            
            <div className="flex gap-6 md:gap-4 mt-8 md:mt-0 items-center">
              <a href="https://www.instagram.com/edc.nitd" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/company/edcnitd" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://x.com/edcnitd" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>

              <button 
                onClick={handleEggClick}
                className="relative group ml-2"
                title="What's this?"
              >
                {isEggBroken ? (
                  <div className="relative animate-bounce">
                    <Bird className="w-8 h-8 text-red-500" />
                    <div className="absolute -top-12 -left-12 w-32 bg-white text-black text-[10px] font-bold p-2 rounded-lg shadow-xl animate-in fade-in zoom-in duration-300 pointer-events-none">
                        Type the KONAMI code we are listening !
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45"></div>
                    </div>
                  </div>
                ) : (
                  <Egg className="w-5 h-5 text-gray-600 hover:text-[#eab308] transition-colors duration-500 cursor-pointer hover:rotate-12" />
                )}
              </button>
            </div>
          </div>
          
          
          <div 
             className={`md:col-span-5 md:pl-2 mt-6 md:mt-0 flex flex-col items-center justify-between pb-6 transition-all duration-500 ease-out ${
              isOpen ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8 invisible'
            }`}
          >
              <div className="text-center opacity-30 mt-8">
                <Sparkles className="w-20 h-20 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold text-white">Innovation Starts Here</h3>
              </div>

              <div className="w-full flex justify-end">
                <button 
                  onClick={() => { toggleMenu(); onOpenAdmin(); }}
                  className="flex items-center gap-2 text-xs text-gray-600 hover:text-white transition-colors uppercase tracking-widest font-bold px-4 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  <Shield className="w-3 h-3" />
                  Admin Portal
                </button>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;