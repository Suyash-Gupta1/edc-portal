'use client';
import React, { useEffect, useState } from 'react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AuthModal from '../../components/AuthModal';
import { Trophy, User as UserIcon, Loader2, Crown, Filter, Search } from 'lucide-react';

interface Candidate {
    _id: string;
    username: string;
    email: string;
    domain: string;
    round: number;
    hasSelection: boolean;
}

export default function ResultsPage() {
  const [users, setUsers] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  
  const [isVisible, setIsVisible] = useState(false);
  
  
  const [activeTab, setActiveTab] = useState<number>(1); 
  const [searchTerm, setSearchTerm] = useState('');

  
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 50);

    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      try {
        setUser(JSON.parse(storedUserStr));
      } catch (e) { console.error(e); }
    }

    fetchResults();
  }, []);

  
  const fetchResults = async () => {
      try {
          const res = await fetch('/api/results');
          const data = await res.json();
          
          if (data.success) {
              setUsers(data.users);
              
              
              const maxRound = Math.max(...data.users.map((u: Candidate) => u.round), 0);
              if (maxRound > 0) {
                  
                  setActiveTab(Math.min(maxRound, 4));
              }
          }
      } catch (e) {
          console.error("Failed to fetch results", e);
      } finally {
          setLoading(false);
      }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edc_user');
  };
  
  const handleLoginSuccess = (u: any) => {
    setUser(u);
    localStorage.setItem('edc_user', JSON.stringify(u));
  };

  
  const displayedUsers = users.filter(u => {
      const meetsRoundCriteria = u.round >= activeTab;
      
      const searchLower = searchTerm.toLowerCase();
      const meetsSearch = u.username.toLowerCase().includes(searchLower) || 
                          u.domain.toLowerCase().includes(searchLower);
                          
      return meetsRoundCriteria && meetsSearch;
  });

  const tabs = [
      { id: 1, label: "Round 1 Qualifiers" },
      { id: 2, label: "Round 2 Qualifiers" },
      { id: 3, label: "Round 3 Qualifiers" },
      { id: 4, label: "Final Selections", icon: Trophy },
  ];

  return (
    <>
        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
        />
        
        <Navbar 
            user={user} 
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
            onOpenAdmin={() => {}}
        />

        <div className={`min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-7xl mx-auto">
                
                
                <div className="mb-12 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tighter mb-4">
                        Recruitment <span className="text-[#ccff00]">Results</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Meet the brilliant minds advancing through our selection process.
                    </p>
                </div>

                
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                    
                    
                    <div className="flex flex-wrap justify-center gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative px-6 py-2.5 rounded-full text-sm font-bold font-display tracking-wide transition-all duration-300
                                    flex items-center gap-2
                                    ${activeTab === tab.id 
                                        ? 'bg-[#ccff00] text-black scale-105 shadow-[0_0_20px_rgba(204,255,0,0.3)]' 
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }
                                `}
                            >
                                {tab.icon && <tab.icon className="w-4 h-4" />}
                                {tab.label}
                                
                                
                                <span className={`
                                    ml-1 text-[10px] px-1.5 py-0.5 rounded-full
                                    ${activeTab === tab.id ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-500'}
                                `}>
                                    {users.filter(u => u.round >= tab.id).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    
                    <div className="relative w-full md:w-64 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-[#ccff00] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search name or domain..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ccff00]/50 transition-all placeholder:text-gray-600"
                        />
                    </div>
                </div>

                
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 min-h-[40vh]">
                        <Loader2 className="w-10 h-10 animate-spin text-[#ccff00] mb-4" />
                        <p className="text-gray-500 animate-pulse">Fetching results...</p>
                    </div>
                ) : (
                    <div className="min-h-[50vh]">
                        {displayedUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 border border-white/5 rounded-3xl bg-white/[0.02]">
                                <Filter className="w-12 h-12 text-gray-700 mb-4" />
                                <p className="text-2xl font-display text-gray-500">No candidates found.</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    {users.length === 0 
                                        ? "No results declared yet. Check back after the round concludes!" 
                                        : "No candidates match this specific filter."}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                                {displayedUsers.map((candidate) => {
                                    const isSelected = candidate.round >= 4;
                                    
                                    return (
                                        <div 
                                            key={candidate._id}
                                            className={`
                                                group relative bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 overflow-hidden
                                                hover:border-white/20 transition-all duration-300 hover:-translate-y-1
                                                ${isSelected ? 'shadow-[0_0_30px_-10px_rgba(204,255,0,0.1)] hover:shadow-[0_0_30px_-5px_rgba(204,255,0,0.2)]' : ''}
                                            `}
                                        >
                                           
                                            <div className="absolute top-0 right-0 p-20 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>

                                            <div className="relative z-10 flex items-start gap-4">
                                                <div className={`
                                                    w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                                    ${isSelected ? 'bg-[#ccff00] text-black' : 'bg-white/10 text-white group-hover:bg-white group-hover:text-black'}
                                                    transition-colors duration-300
                                                `}>
                                                    
                                                    <UserIcon className="w-6 h-6" />
                                                </div>
                                                
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-lg font-bold font-display truncate text-white group-hover:text-[#ccff00] transition-colors">
                                                            {candidate.username}
                                                        </h3>
                                                        {isSelected && <Crown className="w-4 h-4 text-[#ccff00] shrink-0" />}
                                                    </div>
                                                    <p className="text-xs text-gray-500 truncate font-mono mb-3">{candidate.email}</p>
                                                    
                                                    <div className="flex flex-wrap gap-2">
                                                        <span className={`
                                                            inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider
                                                            border ${isSelected ? 'border-[#ccff00]/30 bg-[#ccff00]/10 text-[#ccff00]' : 'border-white/10 bg-white/5 text-gray-400'}
                                                        `}>
                                                            {candidate.domain}
                                                        </span>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border border-white/10 bg-white/5 text-gray-500">
                                                            R{candidate.round}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        <Footer />
    </>
  );
}