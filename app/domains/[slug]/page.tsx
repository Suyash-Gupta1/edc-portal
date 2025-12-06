'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DOMAIN_DATA } from '@/lib/domain-data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModal from '@/components/AuthModal';
import { ArrowLeft, Check, LucideIcon, Globe, Server, Database, PenTool, Share2, Search, Layout, Image, Video, Users, Mic, ClipboardList } from 'lucide-react';


const ICON_MAP: Record<string, any> = {
  Globe, Server, Database, PenTool, Share2, Search, Layout, Image, Video, Users, Mic, ClipboardList
};

export default function DomainPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  
  
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
   
    const storedUserStr = localStorage.getItem('edc_user');
    if (storedUserStr) {
      try {
        setUser(JSON.parse(storedUserStr));
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (slug && typeof slug === 'string' && DOMAIN_DATA[slug]) {
        setData(DOMAIN_DATA[slug]);
       
        setTimeout(() => setIsVisible(true), 50);
    }
  }, [slug]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('edc_user');
  };
  
  const handleLoginSuccess = (u: any) => {
    setUser(u);
    localStorage.setItem('edc_user', JSON.stringify(u));
  };

  
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVisible(false);
    setTimeout(() => {
        router.push('/');
    }, 1000);
  };

 
  if (!slug) return null;

  
  const isValidSlug = typeof slug === 'string' && DOMAIN_DATA[slug];

  
  if (!isValidSlug) return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-display font-bold">Domain Not Found</h1>
        <Link href="/" className="mt-4 text-[#ccff00] hover:underline">Go Back</Link>
    </div>
  );

 
  if (!data) return null; 

  return (
    <>
        <AuthModal 
            isOpen={isAuthModalOpen} 
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={handleLoginSuccess}
        />
        
        
        <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <Navbar 
                user={user} 
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onLogout={handleLogout}
                onOpenAdmin={() => {}}
            />

            <div className="min-h-screen bg-[#050505] text-white">
                
                <div className="relative min-h-[80vh] w-full overflow-hidden flex flex-col">
                   
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={data.image} 
                            alt={data.title} 
                            className="w-full h-full object-cover opacity-40" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/80 to-[#050505]"></div>
                    </div>

                    
                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center pt-32 pb-12">
                        
                        <div className="mb-8 md:mb-12">
                            <Link 
                                href="/"
                                onClick={handleBack}
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-[#ccff00] transition-colors uppercase text-xs font-bold tracking-widest group"
                            >
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
                                Back to Home
                            </Link>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-6">
                            {data.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl font-light leading-relaxed border-l-4 pl-6" style={{ borderColor: data.accent }}>
                            {data.subtitle}
                        </p>

                        
                        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl border-t border-white/10 pt-8">
                            {data.stats.map((stat: any, i: number) => (
                                <div key={i}>
                                    <div className="text-3xl md:text-4xl font-bold font-display mb-1" style={{ color: data.accent }}>{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

               
                <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    
                    <div className="lg:col-span-7 space-y-16">
                        <div>
                            <h3 className="text-3xl font-display font-bold mb-6">About the Domain</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">{data.description}</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-display font-bold mb-6">Your Role</h3>
                            <div className="bg-[#111] p-8 rounded-2xl border border-white/5">
                                <p className="text-gray-300 text-lg leading-relaxed">{data.role}</p>
                            </div>
                        </div>
                    </div>

                    
                    <div className="lg:col-span-5">
                        <div className="sticky top-32">
                            <h3 className="text-3xl font-display font-bold mb-8">What You'll Learn</h3>
                            <div className="space-y-6">
                                {data.curriculum.map((item: any, idx: number) => {
                                    const Icon = ICON_MAP[item.icon] || Check;
                                    return (
                                        <div key={idx} className="group bg-[#0A0A0A] p-6 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:translate-x-2">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-lg bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-colors duration-300">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold font-display mb-2">{item.title}</h4>
                                                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-12 p-6 bg-gradient-to-br from-[#ccff00]/10 to-transparent rounded-2xl border border-[#ccff00]/20 text-center">
                                <h4 className="text-white font-bold mb-2">Ready to Join?</h4>
                                <p className="text-sm text-gray-400 mb-6">Applications are open for {data.title}.</p>
                                <button 
                                    onClick={() => setIsAuthModalOpen(true)}
                                    className="w-full py-3 bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold rounded-lg transition-colors"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    </>
  );
}