import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Loader2, ChevronUp, ChevronDown, CheckCircle, Trophy, FileText, Search, Filter, User as UserIcon, Mail, Calendar } from 'lucide-react';
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

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  // Initialize to 0 (Applied/All) by default
  const [filterRound, setFilterRound] = useState<number>(0);

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

  // Helper to get count for a specific round (Cumulative: >= r)
  // This shows how many people have qualified for at least this round
  const getRoundCount = (r: number) => users.filter(u => u.round >= r).length;

  // Derived State
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = filterDomain === 'All' || user.domain === filterDomain;
    
    // Cumulative Filter: Show users in this round OR higher
    const matchesRound = user.round >= filterRound;
    
    return matchesSearch && matchesDomain && matchesRound;
  });

  const stats = {
    total: users.length,
    selected: users.filter(u => u.hasSelection).length,
    interviewing: users.filter(u => !u.hasSelection && u.round > 0).length,
    new: users.filter(u => u.round === 0).length
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-6xl bg-[#09090b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-[#0a0a0a]">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center border border-[#ccff00]/20">
                <ShieldAlert className="w-5 h-5 text-[#ccff00]" />
             </div>
             <div>
                <h2 className="text-xl font-bold font-display text-white tracking-tight">Admin Portal</h2>
                <p className="text-xs text-gray-500">Recruitment Dashboard</p>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden relative flex flex-col">
          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6">
               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                   <ShieldAlert className="w-8 h-8 text-gray-500" />
               </div>
               <div className="text-center">
                   <h3 className="text-2xl font-bold text-white mb-2">Access Restricted</h3>
                   <p className="text-gray-400 max-w-xs mx-auto">Please enter the secure administrative key to verify your identity.</p>
               </div>
               
               <form onSubmit={handleAuth} className="flex flex-col items-center gap-4 w-full max-w-xs">
                   <div className="relative w-full group">
                        <input 
                            type="password" 
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-center tracking-[0.5em] focus:border-[#ccff00]/50 outline-none transition-all focus:bg-white/5"
                            placeholder="••••••••"
                        />
                   </div>
                   <button 
                    type="submit" 
                    className="w-full bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold py-3 rounded-xl transition-all active:scale-95 shadow-[0_0_20px_-5px_rgba(204,255,0,0.3)] hover:shadow-[0_0_30px_-5px_rgba(204,255,0,0.4)]"
                   >
                     Verify Access
                   </button>
                   {error && <p className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">{error}</p>}
               </form>
            </div>
          ) : (
            <>
                {/* Dashboard Header Stats & Filters */}
                <div className="p-8 border-b border-white/5 space-y-6 bg-[#0a0a0a]/50">
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Applicants', value: stats.total, color: 'text-white', bg: 'bg-white/5' },
                            { label: 'Pending Review', value: stats.new, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'In Rounds', value: stats.interviewing, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                            { label: 'Selected', value: stats.selected, color: 'text-[#ccff00]', bg: 'bg-[#ccff00]/10' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-4 rounded-2xl border border-white/5 ${stat.bg}`}>
                                <div className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</div>
                                <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Filters Container */}
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search candidates..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ccff00]/30 transition-all placeholder:text-gray-600"
                                />
                            </div>
                            
                            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                                {['All', 'Web Development', 'Content Writing', 'Graphic Design', 'Video Editing', 'Event Management'].map(domain => (
                                    <button
                                        key={domain}
                                        onClick={() => setFilterDomain(domain)}
                                        className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                            filterDomain === domain 
                                            ? 'bg-white text-black border-white' 
                                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                        }`}
                                    >
                                        {domain}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Round Pipeline Filter (Knockout Style) */}
                        <div className="w-full overflow-x-auto pb-2 pt-2 border-t border-white/5">
                            <div className="flex items-center gap-3 min-w-max">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mr-2">Qualified For:</span>
                                
                                {[0, 1, 2, 3, 4].map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setFilterRound(r)}
                                        className={`
                                            relative px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-2
                                            ${filterRound === r 
                                                ? (r === 4 ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'bg-white text-black border-white')
                                                : 'bg-transparent text-gray-400 border-white/10 hover:bg-white/5 hover:text-gray-200'
                                            }
                                        `}
                                    >
                                        <span>
                                            {r === 0 ? 'Applied (All)' : r === 4 ? 'Selected' : `Round ${r}+`}
                                        </span>
                                        <span className={`
                                            flex items-center justify-center px-1.5 h-4 rounded-full text-[9px] font-bold min-w-[20px]
                                            ${filterRound === r 
                                                ? 'bg-black/20 text-black' 
                                                : 'bg-white/10 text-gray-400'
                                            }
                                        `}>
                                            {getRoundCount(r)}
                                        </span>
                                    </button>
                                ))}
                                <div className="ml-auto text-[10px] text-gray-500 italic hidden md:block">
                                    *Shows candidates currently in this round or higher
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Area */}
                <div className="flex-1 overflow-y-auto relative bg-[#09090b]">
                    {loading ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
                            <p className="text-gray-500 text-sm">Loading candidates...</p>
                        </div>
                    ) : (
                        <div className="min-w-[800px]">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-[#09090b] z-10 shadow-sm">
                                    <tr className="border-b border-white/10 text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                                        <th className="px-8 py-4 w-[25%]">Candidate</th>
                                        <th className="px-4 py-4 w-[20%]">Domain</th>
                                        <th className="px-4 py-4 w-[15%] text-center">Round</th>
                                        <th className="px-4 py-4 w-[15%] text-center">Status</th>
                                        <th className="px-4 py-4 w-[10%] text-center">Details</th>
                                        <th className="px-8 py-4 w-[15%] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="p-20 text-center">
                                                <div className="flex flex-col items-center gap-3 text-gray-500">
                                                    <Filter className="w-8 h-8 opacity-20" />
                                                    <p>No candidates found matching your criteria.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10 text-gray-400 font-bold text-xs uppercase">
                                                            {user.username.slice(0,2)}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-white text-sm flex items-center gap-2">
                                                                {user.username}
                                                                {user.hasSelection && <CheckCircle className="w-3 h-3 text-[#ccff00]" />}
                                                            </div>
                                                            <div className="text-xs text-gray-500 font-mono mt-0.5">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-medium border ${
                                                        user.domain === 'Web Development' ? 'border-blue-500/20 text-blue-400 bg-blue-500/5' :
                                                        user.domain === 'Content Writing' ? 'border-purple-500/20 text-purple-400 bg-purple-500/5' :
                                                        user.domain === 'Graphic Design' ? 'border-pink-500/20 text-pink-400 bg-pink-500/5' :
                                                        user.domain === 'Video Editing' ? 'border-rose-500/20 text-rose-400 bg-rose-500/5' :
                                                        'border-orange-500/20 text-orange-400 bg-orange-500/5'
                                                    }`}>
                                                        {user.domain}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <div className="inline-flex items-center gap-1">
                                                        {[0,1,2,3,4].map((step) => (
                                                            <div 
                                                                key={step} 
                                                                className={`w-1.5 h-6 rounded-full transition-all duration-300 ${
                                                                    step <= user.round 
                                                                    ? (user.hasSelection ? 'bg-[#ccff00]' : 'bg-white') 
                                                                    : 'bg-white/10'
                                                                } ${step === user.round && !user.hasSelection ? 'animate-pulse' : ''}`}
                                                                title={`Round ${step}`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="text-[10px] text-gray-500 mt-1 font-mono">R{user.round}</div>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    {user.hasSelection ? (
                                                        <div className="inline-flex flex-col items-center gap-1">
                                                            <span className="text-[#ccff00] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 bg-[#ccff00]/10 px-2 py-0.5 rounded-full border border-[#ccff00]/20">
                                                                Selected
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-500 text-[10px] uppercase tracking-wider">In Progress</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button 
                                                        onClick={() => setSelectedReason({ username: user.username, text: user.reason || "No reason provided." })}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"
                                                        title="View Application"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                    </button>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            onClick={() => updateRound(user._id, user.round - 1)}
                                                            disabled={user.round <= 0}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 text-gray-400 hover:text-red-400 disabled:opacity-30 disabled:pointer-events-none transition-all"
                                                            title="Demote"
                                                        >
                                                            <ChevronDown className="w-4 h-4" />
                                                        </button>
                                                        <div className="w-px h-4 bg-white/10 mx-1"></div>
                                                        <button 
                                                            onClick={() => updateRound(user._id, user.round + 1)}
                                                            disabled={user.round >= 4}
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg border border-transparent hover:border-white/10 hover:bg-white/5 text-gray-400 hover:text-[#ccff00] disabled:opacity-30 disabled:pointer-events-none transition-all"
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
            </>
          )}
        </div>
        
        {/* Reason Modal - Completely Isolated Overlay */}
        {selectedReason && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
                {/* Clickable Backdrop */}
                <div 
                    className="absolute inset-0 z-[-1]" 
                    onClick={() => setSelectedReason(null)}
                />
                
                {/* Modal Card */}
                <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,1)] relative flex flex-col max-h-[85%] animate-in zoom-in-95 duration-200">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-white/5">
                        <div>
                            <h3 className="text-lg font-bold font-display text-white">Application Statement</h3>
                            <p className="text-xs text-gray-500 mt-1">Candidate: <span className="text-white">{selectedReason.username}</span></p>
                        </div>
                        <button 
                            onClick={() => setSelectedReason(null)} 
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    
                    {/* Scrollable Content */}
                    <div className="p-6 overflow-y-auto custom-scrollbar">
                        <div className="prose prose-invert prose-sm max-w-none">
                            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-light text-base">
                                {selectedReason.text}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/5 bg-[#161616] rounded-b-2xl flex justify-end">
                        <button 
                            onClick={() => setSelectedReason(null)}
                            className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
