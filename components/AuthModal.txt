import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, ArrowRight } from 'lucide-react';
import '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  
  const [menuHeight, setMenuHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden'; // Lock body scroll
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50); 
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset'; // Unlock body scroll
      
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  
  useEffect(() => {
    if (!contentRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
            setMenuHeight(entry.contentRect.height);
        }
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, [shouldRender, isLogin, error]);

  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    domain: 'Web Development',
    reason: ''
  });

  // Editing the ts errors

  if (!shouldRender) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const contentType = res.headers.get("content-type");
      let data;
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        throw new Error("Server not available"); 
      }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      
      onLoginSuccess(data.user);
      onClose();
      resetForm();
      setIsLoading(false);

    } catch (err: any) {
      console.warn("Auth Error (Fallback Mode):", err);
      
      const isFallbackError = err.message.includes("Server") || err.message.includes("Failed to fetch") || err.message.includes("404");

      if (isFallbackError) {
         setTimeout(() => {
            const demoUser = {
                username: formData.username || "Demo User",
                email: formData.email,
                phone: formData.phone,
                domain: formData.domain,
                reason: formData.reason,
                hasSelection: false,
                round: 0
            };
            onLoginSuccess(demoUser);
            onClose();
            resetForm();
            setIsLoading(false);
            alert("Backend unavailable. Logged in as Demo User.");
         }, 1500);
      } else {
         setError(err.message || "Failed to connect to server");
         setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
      setFormData({
        username: '',
        email: '',
        phone: '',
        password: '',
        domain: 'Web Development',
        reason: ''
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        style={{ willChange: 'opacity' }}
      ></div>

      
      <div 
        className={`
            relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden
            transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
        `}
        style={{ willChange: 'transform, opacity' }}
      >
         
         <div 
            style={{ height: menuHeight, maxHeight: '85vh' }} 
            className="transition-[height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto custom-scrollbar"
            data-lenis-prevent="true"
         >
            <div ref={contentRef}>
                
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#111] sticky top-0 z-10">
                    <h3 className="text-xl font-display font-bold text-white">
                        {isLogin ? 'Welcome Back' : 'Join the Cell'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
                            {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Username</label>
                            <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                            placeholder="johndoe"
                            required
                            />
                        </div>

                        
                        <div className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${!isLogin ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                                    placeholder="john@example.com"
                                    required={!isLogin}
                                />
                            </div>

                             <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                                    placeholder="+91 9876543210"
                                    required={!isLogin}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-medium ml-1">Password</label>
                            <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                            placeholder="••••••••"
                            required
                            />
                        </div>

                        <div className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${!isLogin ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Interested Domain</label>
                                <div className="relative">
                                    <select
                                        name="domain"
                                        value={formData.domain}
                                        onChange={handleChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Web Development" className="bg-[#121212] text-white">Web Development</option>
                                        <option value="Content Writing" className="bg-[#121212] text-white">Content Writing</option>
                                        <option value="Graphic Design" className="bg-[#121212] text-white">Graphic Design</option>
                                        <option value="Video Editing" className="bg-[#121212] text-white">Video Editing</option>
                                        <option value="Event Management" className="bg-[#121212] text-white">Event Management</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                        <ArrowRight className="w-4 h-4 rotate-90" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Why do you want to join EDC?</label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all min-h-[100px] resize-none"
                                    placeholder="I want to innovate and learn..."
                                    required={!isLogin}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold py-3.5 rounded-xl mt-2 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_-5px_rgba(204,255,0,0.5)]"
                        >
                            {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                            isLogin ? 'Login' : 'Submit Application'
                            )}
                        </button>
                    </form>

                    
                    <div className="mt-6 pt-6 border-t border-white/5 text-center text-sm text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already a member? "}
                    <button 
                        onClick={() => {
                        setIsLogin(!isLogin);
                        setError('');
                        }}
                        className="text-[#ccff00] hover:underline font-medium hover:text-[#eeff80] transition-colors"
                    >
                        {isLogin ? 'Join Now' : 'Login'}
                    </button>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AuthModal;