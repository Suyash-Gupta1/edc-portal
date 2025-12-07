'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { Loader2, AlertCircle, CheckCircle2, Circle, Clock, XCircle, Trophy, Sparkles, Calendar, MapPin, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '@/types';

interface StatusData {
    round: number;
    hasSelection: boolean;
    domain: string;
    applicationStatus: 'active' | 'rejected';
    scheduleDescription: string;
}

const ROUNDS_INFO = [
    { title: "Application Received", desc: "We have received your application." },
    { title: "Round 1: Personal Interview", desc: "A general interaction to know you better." },
    { title: "Round 2: Technical/Task", desc: "Domain-specific challenges to test your skills." },
    { title: "Round 3: Final Interview", desc: "Culture fit and final assessment." },
    { title: "Selection", desc: "Welcome to the EDC Family!" }
];

export default function StatusPage() {
  const router = useRouter();
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  useEffect(() => {
    
    const storedUserStr = localStorage.getItem('edc_user');
    if (!storedUserStr) {
        setIsAuthModalOpen(true);
        setLoading(false);
        return;
    }
    
    const parsedUser = JSON.parse(storedUserStr);
    setUser(parsedUser);

   
    fetchStatus(parsedUser.username);

    
    const interval = setInterval(() => {
        fetchStatus(parsedUser.username);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async (username: string) => {
    try {
        const res = await fetch('/api/auth/status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username })
        });
        
        if (res.ok) {
            const data = await res.json();
            if (data.success) {
                setStatus(data.status);
            }
        }
    } catch (e) {
        console.error("Failed to fetch status");
    } finally {
        setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edc_user');
    router.push('/');
  };

  const handleLoginSuccess = (u: any) => {
    setUser(u);
    localStorage.setItem('edc_user', JSON.stringify(u));
    setIsAuthModalOpen(false);
    setLoading(true);
    fetchStatus(u.username);
  };

  
  const renderContent = () => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <Loader2 className="w-10 h-10 animate-spin text-[#ccff00] mb-4" />
                <p className="text-gray-500">Retrieving your journey...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <AlertCircle className="w-12 h-12 text-gray-500 mb-4" />
                <h2 className="text-2xl font-bold font-display text-white mb-2">Login Required</h2>
                <p className="text-gray-400 mb-6">Please login to check your application status.</p>
                <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-6 py-3 bg-[#ccff00] text-black font-bold rounded-full hover:bg-[#bef264] transition-colors"
                >
                    Login Now
                </button>
            </div>
        );
    }

    if (!status) return null;

    
    if (status.applicationStatus === 'rejected') {
        return (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-[#111] border border-red-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5 z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                            <XCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Application Status</h2>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Dear <span className="text-white font-bold">{user.username}</span>,<br/><br/>
                            Thank you for your interest in the Entrepreneurship Development Cell.
                            <br/><br/>
                            After careful consideration, we regret to inform you that we will not be moving forward with your application for the <strong>{status.domain}</strong> domain at this time.
                        </p>
                        <div className="bg-white/5 rounded-xl p-4 w-full">
                            <p className="text-sm text-gray-300 italic">"Failure is simply the opportunity to begin again, this time more intelligently."</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    
    if (status.hasSelection) {
        return (
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-gradient-to-b from-[#1a1a1a] to-black border border-[#ccff00]/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-[0_0_50px_-10px_rgba(204,255,0,0.15)]">
                    {/* Confetti / Sparkles */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-[#ccff00] rounded-full animate-pulse"></div>
                        <div className="absolute top-[30%] right-[20%] w-3 h-3 bg-white rounded-full animate-bounce"></div>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-24 h-24 bg-[#ccff00] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(204,255,0,0.4)] animate-in zoom-in duration-500">
                            <Trophy className="w-12 h-12 text-black" />
                        </div>
                        
                        <h2 className="text-4xl md:text-6xl font-black font-display text-white mb-4 tracking-tighter">
                            CONGRATULATIONS!
                        </h2>
                        
                        <p className="text-xl text-gray-300 mb-8 max-w-xl">
                            Welcome to the team, <span className="text-[#ccff00] font-bold">{user.username}</span>.
                            <br/>You have been selected for the <strong>{status.domain}</strong> domain.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-[#ccff00]" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Status</div>
                                    <div className="font-bold">Official Member</div>
                                </div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-[#ccff00]" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-500 uppercase tracking-wider">Next Steps</div>
                                    <div className="font-bold">Check your Email</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

   
    const nextRoundIndex = Math.min(status.round + 1, 4);
    const nextRoundInfo = ROUNDS_INFO[nextRoundIndex];

    return (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                
                <div className="lg:col-span-2 bg-[#111] border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                            <Clock className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold font-display">Application In Progress</h2>
                            <p className="text-sm text-gray-400">Domain: <span className="text-white">{status.domain}</span></p>
                        </div>
                    </div>

                    
                    <div className="space-y-0 relative pl-4 border-l border-white/10 ml-2">
                        {ROUNDS_INFO.slice(0, 5).map((r, idx) => {
                            
                            const isCompleted = idx <= status.round;
                            const isCurrent = idx === status.round;
                            const isNext = idx === status.round + 1;
                            
                            return (
                                <div key={idx} className={`relative pl-8 pb-10 last:pb-0 group ${isNext ? 'opacity-100' : (isCompleted ? 'opacity-80' : 'opacity-30')}`}>
                                   
                                    <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-[#111] flex items-center justify-center transition-all duration-500
                                        ${isCompleted 
                                            ? 'bg-[#ccff00] text-black scale-100' 
                                            : 'bg-[#222] text-gray-500 scale-75'
                                        }
                                        ${isNext && !isCompleted ? 'ring-2 ring-white/20' : ''}
                                    `}>
                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-4 h-4" />}
                                    </div>

                                    <div>
                                        <h4 className={`text-lg font-bold font-display ${isCompleted ? 'text-white' : 'text-gray-400'}`}>
                                            {r.title}
                                            {isCurrent && <span className="ml-3 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-500/30">Completed</span>}
                                            {isNext && <span className="ml-3 text-[10px] bg-[#ccff00]/20 text-[#ccff00] px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#ccff00]/30 animate-pulse">Up Next</span>}
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-1">{r.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#111] border border-white/10 rounded-3xl p-6 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#ccff00]/10 rounded-lg text-[#ccff00]">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold font-display text-white">Next Round Details</h3>
                        </div>
                        
                        {nextRoundInfo ? (
                            <div className="flex-1 flex flex-col gap-4">
                                <div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">Upcoming Stage</div>
                                    <div className="text-xl font-bold text-white border-l-2 border-[#ccff00] pl-4">
                                        {nextRoundInfo.title.split(':')[0]}
                                    </div>
                                </div>

                                {status.scheduleDescription ? (
                                     <div className="mt-4 bg-[#ccff00]/5 rounded-xl border border-[#ccff00]/20 p-5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-10 bg-[#ccff00]/10 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#ccff00]/20 transition-all"></div>
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-center gap-2 text-xs text-[#ccff00] font-bold mb-3 uppercase tracking-wider">
                                                <Info className="w-3 h-3" />
                                                Instructions
                                            </div>
                                            <p className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                                                {status.scheduleDescription}
                                            </p>
                                        </div>
                                     </div>
                                ) : (
                                    <div className="mt-4 p-6 rounded-xl border border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center text-center gap-3">
                                        <Clock className="w-8 h-8 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-400 font-medium">Schedule Pending</p>
                                            <p className="text-xs text-gray-600 mt-1">
                                                Please check back later. We will update the timing and venue shortly.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-gray-500">Wait for results.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
  };

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

        <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tighter mb-2">
                        Your <span className="text-[#ccff00]">Journey</span>
                    </h1>
                    <p className="text-gray-400 text-lg">Track your recruitment progress.</p>
                </div>
                
                {renderContent()}
            </div>
        </div>

        <Footer />
    </>
  );
}