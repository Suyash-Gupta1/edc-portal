import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [shouldRender, setShouldRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [menuHeight, setMenuHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 50); 
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      
      const timer = setTimeout(() => {
        setShouldRender(false);
        setRegistrationStep(1);
        setError('');
        setIsLogin(false);
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
  }, [shouldRender, isLogin, error, registrationStep]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    domain: 'Web Development',
    reason: ''
  });

  const [questionnaire, setQuestionnaire] = useState({
    rating: 5,
    q1: '', 
    q2: ''  
  });

  if (!shouldRender) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionnaireChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionnaire({ ...questionnaire, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e: React.MouseEvent | React.FormEvent) => {
    e.preventDefault();
    setError('');

    const missingFields = [];
    if (!formData.username) missingFields.push("Username");
    if (!formData.email) missingFields.push("Email");
    if (!formData.mobileNumber) missingFields.push("Mobile Number");
    if (!formData.password) missingFields.push("Password");
    if (!formData.domain) missingFields.push("Domain");
    if (!formData.reason) missingFields.push("Reason");

    if (missingFields.length > 0) {
        setError(`Please fill in: ${missingFields.join(', ')}`);
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    setRegistrationStep(2);
    setTimeout(() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && registrationStep === 1) {
        handleNextStep(e);
        return;
    }

    setIsLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    let payload: any = { ...formData };
    
    if (!isLogin) {
        payload.selfRating = questionnaire.rating;
        payload.responses = [
            { question: "Describe a past project or initiative you are proud of.", answer: questionnaire.q1 },
            { question: "How do you handle disagreements within a team?", answer: questionnaire.q2 }
        ];
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let data;
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        throw new Error("Server error. Please try again."); 
      }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      onLoginSuccess(data.user);
      onClose();
      resetForm();

    } catch (err: any) {
      console.warn("Auth Error:", err);
      setError(err.message || "Failed to connect to server");
      scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      
      if (err.message.includes("Server") || err.message.includes("Failed to fetch")) {
         setTimeout(() => {
            const demoUser = {
                username: formData.username || "Demo User",
                email: formData.email,
                mobileNumber: formData.mobileNumber,
                domain: formData.domain,
                reason: formData.reason,
                hasSelection: false,
                round: 0
            };
            onLoginSuccess(demoUser);
            onClose();
            resetForm();
            alert("Backend unavailable. Logged in as Demo User.");
         }, 1500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
      setFormData({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        domain: 'Web Development',
        reason: ''
      });
      setQuestionnaire({
        rating: 5,
        q1: '',
        q2: ''
      });
      setRegistrationStep(1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      ></div>

      <div 
        className={`
            relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden
            transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'}
        `}
      >
         <div 
            ref={scrollRef}
            style={{ height: menuHeight, maxHeight: '85vh' }} 
            className="transition-[height] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-y-auto custom-scrollbar scroll-smooth"
            data-lenis-prevent="true"
         >
            <div ref={contentRef}>
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#111] sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                         {!isLogin && registrationStep === 2 && (
                            <button 
                                type="button"
                                onClick={() => setRegistrationStep(1)} 
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                         )}
                         <h3 className="text-xl font-display font-bold text-white">
                            {isLogin ? 'Welcome Back' : (registrationStep === 1 ? 'Join the Cell' : 'Final Details')}
                         </h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                           {error}
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        
                        <div className={`${!isLogin && registrationStep === 2 ? 'hidden' : 'block space-y-4'}`}>
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                                    placeholder="johndoe"
                                    required={isLogin || registrationStep === 1} 
                                />
                            </div>

                            {!isLogin && (
                                <>
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
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

                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 delay-75">
                                        <label className="text-sm text-gray-400 font-medium ml-1">Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                                            placeholder="+91 9876543210"
                                            required={!isLogin}
                                        />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 font-medium ml-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all"
                                    placeholder="••••••••"
                                    required={isLogin || registrationStep === 1}
                                />
                            </div>

                            {!isLogin && (
                                <>
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 delay-100">
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
                                                <option value="Consultancy Wing" className="bg-[#121212] text-white">Consultancy Wing</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                <ArrowRight className="w-4 h-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300 delay-150">
                                        <label className="text-sm text-gray-400 font-medium ml-1">Why do you want to join EDC?</label>
                                        <textarea
                                            name="reason"
                                            value={formData.reason}
                                            onChange={handleChange}
                                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all min-h-[80px] resize-none"
                                            placeholder="I want to innovate and learn..."
                                            required={!isLogin}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {!isLogin && registrationStep === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-300">
                                <div className="space-y-4">
                                    <label className="text-sm text-gray-400 font-medium ml-1">
                                        Rate your enthusiasm (0 - 10)
                                    </label>
                                    <div className="flex items-center gap-4 bg-black/30 p-4 rounded-xl border border-white/5">
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="10" 
                                            name="rating"
                                            value={questionnaire.rating}
                                            onChange={handleQuestionnaireChange}
                                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ccff00]"
                                        />
                                        <span className="text-[#ccff00] font-bold font-display text-xl w-8 text-center">{questionnaire.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium ml-1">Describe a past project or initiative you are proud of.</label>
                                    <textarea
                                        name="q1"
                                        value={questionnaire.q1}
                                        onChange={handleQuestionnaireChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all min-h-[100px] resize-none"
                                        placeholder="e.g. I organized a tech fest..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-gray-400 font-medium ml-1">How do you handle disagreements within a team?</label>
                                    <textarea
                                        name="q2"
                                        value={questionnaire.q2}
                                        onChange={handleQuestionnaireChange}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ccff00]/50 focus:bg-white/5 transition-all min-h-[100px] resize-none"
                                        placeholder="I try to understand the other perspective..."
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-4">
                            {!isLogin && registrationStep === 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="w-full bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_-5px_rgba(204,255,0,0.5)]"
                                >
                                    Next Step <ArrowRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] hover:shadow-[0_0_25px_-5px_rgba(204,255,0,0.5)]"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        isLogin ? 'Login' : 'Submit Application'
                                    )}
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5 text-center text-sm text-gray-400">
                    {isLogin ? "Don't have an account? " : "Already a member? "}
                    <button 
                        type="button"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setRegistrationStep(1);
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