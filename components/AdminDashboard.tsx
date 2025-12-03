import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Loader2, ChevronUp, ChevronDown, CheckCircle, Trophy } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  domain: string;
  round: number;
  hasSelection: boolean;
  createdAt: string;
}

const ADMIN_KEY_CONST = "EDC_ADMIN_2024"; // Use same key as backend for client check

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputKey, setInputKey] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchUsers();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple client-side check before making API calls
    if (inputKey === ADMIN_KEY_CONST) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Admin Key");
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'admin-key': inputKey }
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRound = async (userId: string, newRound: number) => {
    if (newRound < 0 || newRound > 4) return; // Limit rounds 0-4
    
    setIsUpdating(userId);
    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'admin-key': inputKey 
        },
        body: JSON.stringify({ userId, round: newRound })
      });
      
      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u._id === userId ? { ...u, round: newRound, hasSelection: newRound >= 4 } : u));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#151515]">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-6 h-6 text-[#ccff00]" />
            <h3 className="text-xl font-display font-bold text-white">Admin Portal</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-hidden p-6">
          {!isAuthenticated ? (
            <div className="h-full flex flex-col items-center justify-center">
              <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                <div className="text-center mb-6">
                    <h4 className="text-white text-lg font-medium">Enter Access Key</h4>
                    <p className="text-gray-500 text-sm">Restricted to core committee members.</p>
                </div>
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white text-center tracking-widest focus:outline-none focus:border-[#ccff00]/50"
                  placeholder="ENTER KEY"
                  autoFocus
                />
                <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Access Dashboard
                </button>
              </form>
            </div>
          ) : (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-gray-400">Total Applicants: <span className="text-white font-bold">{users.length}</span></h4>
                <button onClick={fetchUsers} className="text-xs text-[#ccff00] hover:underline">Refresh List</button>
              </div>

              {isLoading ? (
                <div className="flex-grow flex items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
                </div>
              ) : (
                <div className="flex-grow overflow-y-auto border border-white/10 rounded-lg">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 font-display uppercase text-xs sticky top-0 backdrop-blur-sm z-10">
                      <tr>
                        <th className="p-4">Candidate</th>
                        <th className="p-4">Domain</th>
                        <th className="p-4 text-center">Current Round</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((user) => (
                        <tr key={user._id} className="hover:bg-white/5 transition-colors group">
                          <td className="p-4">
                            <div className="font-bold text-white">{user.username}</div>
                            <div className="text-gray-500 text-xs">{user.email}</div>
                          </td>
                          <td className="p-4">
                            <span className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300 border border-white/5">
                              {user.domain}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                                {/* Round Indicator */}
                                {[1, 2, 3, 4].map((r) => (
                                    <div 
                                        key={r} 
                                        className={`w-2 h-8 rounded-full transition-all duration-300 ${
                                            user.round >= r 
                                            ? r === 4 ? 'bg-[#ccff00] shadow-[0_0_10px_#ccff00]' : 'bg-[#ccff00]/60' 
                                            : 'bg-white/10'
                                        }`}
                                        title={`Round ${r}`}
                                    ></div>
                                ))}
                            </div>
                            <div className="text-center text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-wider">
                                {user.round === 0 ? 'Applied' : user.round === 4 ? 'Selected' : `Round ${user.round}`}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                                <button 
                                    onClick={() => updateRound(user._id, user.round - 1)}
                                    disabled={user.round <= 0 || isUpdating === user._id}
                                    className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="Demote"
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => updateRound(user._id, user.round + 1)}
                                    disabled={user.round >= 4 || isUpdating === user._id}
                                    className="p-2 bg-[#ccff00]/10 text-[#ccff00] rounded hover:bg-[#ccff00]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                    title="Promote"
                                >
                                    {user.round === 3 ? <Trophy className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                                </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;