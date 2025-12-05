import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Loader2, ChevronUp, ChevronDown, CheckCircle, Trophy, FileText } from 'lucide-react';
import '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  domain: string;
  reason: string;
  round: number;
  hasSelection: boolean;
  createdAt: string;
}

const ADMIN_KEY_CONST = "EDC_ADMIN_2024";

// Dummy data for fallback
const DUMMY_USERS: UserData[] = [
    { _id: "1", username: "demo_user", email: "demo@example.com", domain: "Web Development", reason: "I love coding and want to build cool things.", round: 0, hasSelection: false, createdAt: new Date().toISOString() },
    { _id: "2", username: "john_doe", email: "john@test.com", domain: "Graphic Design", reason: "Design is my passion.", round: 2, hasSelection: false, createdAt: new Date().toISOString() },
    { _id: "3", username: "jane_smith", email: "jane@test.com", domain: "Content Writing", reason: "Words can change the world.", round: 4, hasSelection: true, createdAt: new Date().toISOString() },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [selectedReason, setSelectedReason] = useState<{username: string, text: string} | null>(null);

  // Effect to fetch users when authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchUsers();
    }
  }, [isAuthenticated, isOpen]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === ADMIN_KEY_CONST) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Admin Key');
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'admin-key': ADMIN_KEY_CONST }
      });
      
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data = await res.json();
      setUsers(data.users);
      setIsOfflineMode(false);
    } catch (err) {
      console.warn("Admin API failed, using dummy data");
      setUsers(DUMMY_USERS);
      setIsOfflineMode(true);
    } finally {
      setLoading(false);
    }
  };

  const updateRound = async (userId: string, newRound: number) => {
    if (newRound < 0 || newRound > 4) return;

    // Optimistic update
    setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, round: newRound, hasSelection: newRound >= 4 } : u
    ));

    if (isOfflineMode) return;

    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'admin-key': ADMIN_KEY_CONST
        },
        body: JSON.stringify({ userId, round: newRound })
      });

      if (!res.ok) throw new Error('Update failed');
    } catch (err) {
      console.error(err);
      alert("Failed to update on server (Offline Mode active)");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-4xl bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
             <ShieldAlert className="w-6 h-6 text-[#ccff00]" />
             <h2 className="text-xl font-bold font-display text-white">Admin Portal</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {!isAuthenticated ? (
            <form onSubmit={handleAuth} className="flex flex-col items-center justify-center h-64 space-y-4">
               <p className="text-gray-400">Please enter the administrative access key.</p>
               <input 
                 type="password" 
                 value={key}
                 onChange={(e) => setKey(e.target.value)}
                 className="bg-black border border-white/20 rounded-lg px-4 py-2 text-white w-64 text-center tracking-widest focus:border-[#ccff00] outline-none"
                 placeholder="ENTER KEY"
               />
               <button type="submit" className="bg-[#ccff00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#bceb00]">
                 Access
               </button>
               {error && <p className="text-red-500 text-sm">{error}</p>}
            </form>
          ) : (
            <div className="space-y-6">
                {isOfflineMode && (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 p-3 rounded-lg text-sm text-center">
                        Backend unavailable. Running in Demo Mode with dummy data. Updates will be local only.
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-500 text-xs uppercase tracking-wider">
                                    <th className="p-4">Candidate</th>
                                    <th className="p-4">Domain</th>
                                    <th className="p-4 text-center">Round</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 text-center">Reason</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">No candidates found.</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-white">{user.username}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </td>
                                            <td className="p-4 text-sm text-gray-300">
                                                <span className={`px-2 py-1 rounded border text-xs ${
                                                    user.domain === 'Web Development' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                                                    user.domain === 'Content Writing' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                                                    user.domain === 'Graphic Design' ? 'border-pink-500/30 text-pink-400 bg-pink-500/10' :
                                                    user.domain === 'Video Editing' ? 'border-rose-500/30 text-rose-400 bg-rose-500/10' :
                                                    'border-orange-500/30 text-orange-400 bg-orange-500/10'
                                                }`}>
                                                    {user.domain}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 font-mono font-bold">
                                                    {user.round}
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                {user.hasSelection ? (
                                                    <span className="inline-flex items-center gap-1 text-[#ccff00] text-xs font-bold uppercase tracking-wide">
                                                        <Trophy className="w-3 h-3" /> Selected
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-500 text-xs uppercase">Processing</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                <button 
                                                    onClick={() => setSelectedReason({ username: user.username, text: user.reason || "No reason provided." })}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                                    title="View Reason"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => updateRound(user._id, user.round - 1)}
                                                        disabled={user.round <= 0}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-400 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
                                                        title="Demote"
                                                    >
                                                        <ChevronDown className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => updateRound(user._id, user.round + 1)}
                                                        disabled={user.round >= 4}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-[#ccff00] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors"
                                                        title="Promote"
                                                    >
                                                        <ChevronUp className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
          )}
        </div>
        
        {/* Reason Modal Overlay - Moved outside the overflow container to prevent scrolling issues */}
        {selectedReason && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                <div 
                    className="bg-[#1a1a1a] border border-white/20 rounded-xl p-6 max-w-lg w-full shadow-2xl relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold font-display text-white">Application Reason</h3>
                        <button onClick={() => setSelectedReason(null)} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Candidate: <span className="text-white font-medium">{selectedReason.username}</span></p>
                    <div className="bg-black/50 p-4 rounded-lg border border-white/5 text-gray-300 text-sm leading-relaxed max-h-60 overflow-y-auto">
                        {selectedReason.text}
                    </div>
                    
                    {/* Backdrop Click to Close logic is handled by parent div, but we stop propagation here so clicking the modal doesn't close it */}
                </div>
                {/* Invisible backdrop for clicking outside to close */}
                <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedReason(null)}></div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;