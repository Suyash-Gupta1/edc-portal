import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(false); // Default to Join (Register)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    domain: 'Web Development',
    reason: ''
  });

  if (!isOpen) return null;

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

      // Handle non-JSON responses (typically 404 or 500 html pages)
      const contentType = res.headers.get("content-type");
      let data;
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        // Force fallback if response is not JSON (e.g. 404 HTML page)
        throw new Error("Server not available"); 
      }

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Success
      onLoginSuccess(data.user);
      onClose();
      resetForm();

    } catch (err: any) {
      console.warn("Auth Error (Fallback Mode Activated):", err);
      // Fallback: Simulate successful login if backend is missing (Demo Mode)
      if (err.message.includes("Server") || err.message.includes("Failed to fetch") || err.message.includes("404")) {
         setTimeout(() => {
            const demoUser = {
                username: formData.username || "Demo User",
                email: formData.email,
                domain: formData.domain,
                reason: formData.reason,
                hasSelection: false,
                round: 0
            };
            onLoginSuccess(demoUser);
            onClose();
            resetForm();
            alert("Backend unavailable. Logged in as Demo User.");
         }, 1000);
      } else {
         setError(err.message || "Failed to connect to server");
      }
    } finally {
      // If we are not falling back immediately
      if (!error && !isLoading) setIsLoading(false);
    }
  };

  const resetForm = () => {
      setFormData({
        username: '',
        email: '',
        password: '',
        domain: 'Web Development',
        reason: ''
      });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-xl font-display font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Join the Cell'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors"
              placeholder="johndoe"
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Interested Domain</label>
                <select
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors appearance-none"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Event Management">Event Management</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Why do you want to join EDC?</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#ccff00]/50 transition-colors min-h-[80px]"
                  placeholder="I want to innovate and learn..."
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold py-3 rounded-lg mt-6 transition-transform active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              isLogin ? 'Login' : 'Submit Application'
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="p-4 bg-white/5 text-center text-sm text-gray-400">
          {isLogin ? "Don't have an account? " : "Already a member? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-[#ccff00] hover:underline font-medium"
          >
            {isLogin ? 'Join Now' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;