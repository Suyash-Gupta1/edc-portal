import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Loader2, ChevronUp, ChevronDown, CheckCircle, Trophy, FileText, Search, Filter, Ban, RefreshCw, Calendar, Save, Star } from 'lucide-react';
import '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  _id: string;
  username: string;
  email: string;
  mobileNumber?: string;
  domain: string;
  reason: string;
  round: number;
  hasSelection: boolean;
  applicationStatus: 'active' | 'rejected';
  createdAt: string;
  
  selfRating?: number;
  responses?: { question: string; answer: string }[];
}

interface ScheduleData {
    round: number;
    description: string;
}

const ADMIN_KEY_CONST = process.env.ADMIN_KEY || "";


const DUMMY_USERS: UserData[] = [
    { _id: "1", username: "demo_user", email: "demo@example.com", mobileNumber: "+91 9876543210", domain: "Web Development", reason: "I love coding.", round: 0, hasSelection: false, applicationStatus: 'active', createdAt: new Date().toISOString(), selfRating: 8, responses: [{ question: "Past project", answer: "Built a todo app" }] },
    { _id: "2", username: "john_doe", email: "john@test.com", mobileNumber: "+91 8888888888", domain: "Graphic Design", reason: "Design is my passion.", round: 2, hasSelection: false, applicationStatus: 'active', createdAt: new Date().toISOString(), selfRating: 9, responses: [] },
    { _id: "3", username: "jane_smith", email: "jane@test.com", mobileNumber: "+91 7777777777", domain: "Content Writing", reason: "Words can change the world.", round: 4, hasSelection: true, applicationStatus: 'active', createdAt: new Date().toISOString(), selfRating: 10, responses: [] },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  
  
  const [selectedApplication, setSelectedApplication] = useState<UserData | null>(null);
  
  
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedules, setSchedules] = useState<ScheduleData[]>([
      { round: 1, description: "" },
      { round: 2, description: "" },
      { round: 3, description: "" },
      { round: 4, description: "" }
  ]);
  const [isSavingSchedules, setIsSavingSchedules] = useState(false);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('All');
  const [filterRound, setFilterRound] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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

  const fetchSchedules = async () => {
      try {
          const res = await fetch('/api/admin/schedules', {
              headers: { 'admin-key': ADMIN_KEY_CONST }
          });
          if (res.ok) {
              const data = await res.json();
              if (data.schedules && data.schedules.length > 0) {
                  
                  const merged = [1, 2, 3, 4].map(r => {
                      const found = data.schedules.find((s: any) => s.round === r);
                      return found ? { round: r, description: found.description } : { round: r, description: "" };
                  });
                  setSchedules(merged);
              }
          }
      } catch (e) {
          console.error("Failed to fetch schedules", e);
      }
  };

  const openScheduleManager = () => {
      fetchSchedules();
      setIsScheduleModalOpen(true);
  };

  const handleScheduleChange = (round: number, text: string) => {
      setSchedules(prev => prev.map(s => s.round === round ? { ...s, description: text } : s));
  };

  const saveSchedules = async () => {
      setIsSavingSchedules(true);
      if (!isOfflineMode) {
          try {
              await fetch('/api/admin/schedules', {
                  method: 'POST',
                  headers: { 
                      'Content-Type': 'application/json',
                      'admin-key': ADMIN_KEY_CONST
                  },
                  body: JSON.stringify({ schedules })
              });
          } catch (e) {
              console.error("Failed to save schedules", e);
          }
      }
      setIsSavingSchedules(false);
      setIsScheduleModalOpen(false);
  };

  const updateRound = async (userId: string, newRound: number) => {
    if (newRound < 0 || newRound > 4) return;

    
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
    }
  };

  const toggleRejection = async (userId: string, currentStatus: 'active' | 'rejected') => {
    const newStatus = currentStatus === 'active' ? 'rejected' : 'active';
    
    setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, applicationStatus: newStatus } : u
    ));

    if (isOfflineMode) return;

    try {
        await fetch('/api/admin/update', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'admin-key': ADMIN_KEY_CONST
            },
            body: JSON.stringify({ userId, applicationStatus: newStatus })
        });
    } catch (err) {
        console.error(err);
    }
  };

  const getRoundCount = (r: number) => users.filter(u => u.round >= r && u.applicationStatus === 'active').length;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (user.mobileNumber && user.mobileNumber.includes(searchTerm));
    const matchesDomain = filterDomain === 'All' || user.domain === filterDomain;
    const matchesRound = user.round >= filterRound;
    return matchesSearch && matchesDomain && matchesRound;
  });

  const stats = {
    total: users.length,
    selected: users.filter(u => u.hasSelection && u.applicationStatus === 'active').length,
    rejected: users.filter(u => u.applicationStatus === 'rejected').length,
    active: users.filter(u => u.applicationStatus === 'active').length
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative w-full max-w-6xl bg-[#09090b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300">
        
        <div className="flex items-center justify-between px-6 py-4 md:px-8 md:py-6 border-b border-white/5 bg-[#0a0a0a] shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#ccff00]/10 flex items-center justify-center border border-[#ccff00]/20">
                <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-[#ccff00]" />
             </div>
             <div>
                <h2 className="text-lg md:text-xl font-bold font-display text-white tracking-tight">Admin Portal</h2>
                <p className="text-[10px] md:text-xs text-gray-500">Recruitment Dashboard</p>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden relative flex flex-col">
          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 overflow-y-auto" data-lenis-prevent="true">
               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                   <ShieldAlert className="w-8 h-8 text-gray-500" />
               </div>
               <div className="text-center">
                   <h3 className="text-2xl font-bold text-white mb-2">Access Restricted</h3>
                   <p className="text-gray-400 max-w-xs mx-auto">Please enter the secure administrative key.</p>
               </div>
               <form onSubmit={handleAuth} className="flex flex-col items-center gap-4 w-full max-w-xs">
                   <input 
                        type="password" 
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-center tracking-[0.5em] focus:border-[#ccff00]/50 outline-none transition-all"
                        placeholder="••••••••"
                   />
                   <button 
                    type="submit" 
                    className="w-full bg-[#ccff00] hover:bg-[#bceb00] text-black font-bold py-3 rounded-xl transition-all"
                   >
                     Verify Access
                   </button>
                   {error && <p className="text-red-400 text-sm bg-red-500/10 px-4 py-2 rounded-lg">{error}</p>}
               </form>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto bg-[#09090b] overscroll-contain" data-lenis-prevent="true">
                <div className="p-4 md:p-8 border-b border-white/5 space-y-6 bg-[#0a0a0a]/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {[
                            { label: 'Total Applicants', value: stats.total, color: 'text-white', bg: 'bg-white/5' },
                            { label: 'Active Candidates', value: stats.active, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                            { label: 'Rejected', value: stats.rejected, color: 'text-red-400', bg: 'bg-red-500/10' },
                            { label: 'Selected', value: stats.selected, color: 'text-[#ccff00]', bg: 'bg-[#ccff00]/10' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/5 ${stat.bg}`}>
                                <div className={`text-xl md:text-2xl font-bold font-display ${stat.color}`}>{stat.value}</div>
                                <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-medium mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-white transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ccff00]/30 transition-all placeholder:text-gray-600"
                                />
                            </div>
                            
                            <div className="flex items-center gap-3">
                                
                                <button 
                                    onClick={openScheduleManager}
                                    className="flex items-center gap-2 bg-[#ccff00] text-black hover:bg-[#bceb00] px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-[0_0_15px_-5px_rgba(204,255,0,0.4)]"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Manage Schedules
                                </button>
                            </div>
                        </div>

                       
                         <div className="w-full overflow-x-auto pb-2 pt-2 border-t border-white/5">
                            <div className="flex items-center gap-4 min-w-max">
                                <div className="flex gap-2">
                                     {['All', 'Web Development', 'Content Writing', 'Graphic Design', 'Video Editing', 'Event Management', 'Consultancy Wing'].map(domain => (
                                        <button
                                            key={domain}
                                            onClick={() => setFilterDomain(domain)}
                                            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                                                filterDomain === domain ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30 hover:text-white'
                                            }`}
                                        >
                                            {domain}
                                        </button>
                                    ))}
                                </div>
                                <div className="w-px h-6 bg-white/10"></div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Qualified For:</span>
                                    {[0, 1, 2, 3, 4].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setFilterRound(r)}
                                            className={`
                                                relative px-3 py-1.5 rounded-full text-xs font-medium transition-all border flex items-center gap-2
                                                ${filterRound === r ? (r === 4 ? 'bg-[#ccff00] text-black border-[#ccff00]' : 'bg-white text-black border-white') : 'bg-transparent text-gray-400 border-white/10'}
                                            `}
                                        >
                                            <span>{r === 0 ? 'Applied' : r === 4 ? 'Selected' : `Round ${r}+`}</span>
                                            <span className={`px-1.5 h-4 rounded-full text-[9px] font-bold ${filterRound === r ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-400'}`}>
                                                {getRoundCount(r)}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-full">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-20">
                            <Loader2 className="w-8 h-8 animate-spin text-[#ccff00]" />
                            <p className="text-gray-500 text-sm">Loading candidates...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead className="bg-[#09090b]">
                                    <tr className="border-b border-white/10 text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                                        <th className="px-6 py-4 w-[25%]">Candidate</th>
                                        <th className="px-4 py-4 w-[15%]">Domain</th>
                                        <th className="px-4 py-4 w-[15%] text-center">Round</th>
                                        <th className="px-4 py-4 w-[10%] text-center">Status</th>
                                        <th className="px-4 py-4 w-[10%] text-center">App</th>
                                        <th className="px-6 py-4 w-[25%] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.map((user) => (
                                        <tr key={user._id} className={`group hover:bg-white/[0.02] transition-colors ${user.applicationStatus === 'rejected' ? 'opacity-40 grayscale' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-white/10 text-xs uppercase shrink-0">
                                                        {user.username.slice(0,2)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white text-sm flex items-center gap-2">
                                                            {user.username}
                                                            {user.hasSelection && <CheckCircle className="w-3 h-3 text-[#ccff00]" />}
                                                        </div>
                                                        <div className="text-xs text-gray-500 font-mono mt-0.5">{user.email}</div>
                                                        <div className="text-xs text-gray-400 font-mono mt-0.5">{user.mobileNumber || '-'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="text-xs text-gray-400">{user.domain}</span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="text-xs font-mono">R{user.round}</div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                {user.applicationStatus === 'rejected' ? (
                                                    <span className="text-red-500 text-[10px] font-bold uppercase border border-red-500/20 bg-red-500/10 px-2 py-0.5 rounded">Rejected</span>
                                                ) : user.hasSelection ? (
                                                    <span className="text-[#ccff00] text-[10px] font-bold uppercase border border-[#ccff00]/20 bg-[#ccff00]/10 px-2 py-0.5 rounded">Selected</span>
                                                ) : (
                                                    <span className="text-blue-400 text-[10px] font-bold uppercase border border-blue-400/20 bg-blue-400/10 px-2 py-0.5 rounded">Active</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <button 
                                                    onClick={() => setSelectedApplication(user)}
                                                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                                                    title="View Full Application"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => toggleRejection(user._id, user.applicationStatus)}
                                                        className={`p-1.5 rounded-md transition-colors ${user.applicationStatus === 'rejected' ? 'text-green-500 hover:bg-green-500/10' : 'text-red-500 hover:bg-red-500/10'}`}
                                                        title={user.applicationStatus === 'rejected' ? "Restore" : "Reject"}
                                                    >
                                                        {user.applicationStatus === 'rejected' ? <RefreshCw className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                                                    </button>
                                                    <div className="w-px h-4 bg-white/10"></div>
                                                    <button 
                                                        onClick={() => updateRound(user._id, user.round - 1)}
                                                        disabled={user.round <= 0 || user.applicationStatus === 'rejected'}
                                                        className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
                                                    >
                                                        <ChevronDown className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => updateRound(user._id, user.round + 1)}
                                                        disabled={user.round >= 4 || user.applicationStatus === 'rejected'}
                                                        className="p-1.5 rounded-md text-gray-400 hover:text-[#ccff00] hover:bg-white/10 disabled:opacity-30"
                                                    >
                                                        <ChevronUp className="w-4 h-4" />
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
            </div>
          )}
        </div>
        
        
        {selectedApplication && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="absolute inset-0 z-[-1]" onClick={() => setSelectedApplication(null)} />
                <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-lg p-0 relative animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                    
                    <div className="p-6 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#121212] z-10 rounded-t-2xl">
                        <div>
                            <h3 className="text-lg font-bold font-display text-white">Application Details</h3>
                            <p className="text-xs text-gray-400">{selectedApplication.username} • {selectedApplication.domain}</p>
                        </div>
                        <button onClick={() => setSelectedApplication(null)} className="text-gray-500 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>

                    <div className="p-6 overflow-y-auto custom-scrollbar overscroll-contain" data-lenis-prevent="true">
                        <div className="space-y-6">
                            
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-300">Self-Rating</span>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-[#ccff00] fill-[#ccff00]" />
                                    <span className="text-xl font-bold font-display text-white">{selectedApplication.selfRating || 0}/10</span>
                                </div>
                            </div>

                            
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-[#ccff00] mb-2">Why Join EDC?</h4>
                                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                                    <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{selectedApplication.reason}</p>
                                </div>
                            </div>

                            
                            {selectedApplication.responses && selectedApplication.responses.map((resp, idx) => (
                                <div key={idx}>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{resp.question}</h4>
                                    <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                                        <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{resp.answer}</p>
                                    </div>
                                </div>
                            ))}
                            
                            {(!selectedApplication.responses || selectedApplication.responses.length === 0) && (
                                <p className="text-center text-gray-600 text-xs italic py-2">No additional questionnaire data available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )}

        
        {isScheduleModalOpen && (
            <div className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="absolute inset-0 z-[-1]" onClick={() => setIsScheduleModalOpen(false)} />
                <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold font-display text-white">Round Schedules</h3>
                            <p className="text-xs text-gray-500 mt-1">Updates here will be visible to ALL candidates in the respective rounds.</p>
                        </div>
                        <button onClick={() => setIsScheduleModalOpen(false)} className="text-gray-500 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2 mb-6 overscroll-contain" data-lenis-prevent="true">
                        {schedules.map((schedule) => (
                            <div key={schedule.round} className="bg-white/5 border border-white/10 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-[#ccff00] uppercase tracking-wider">Round {schedule.round}</span>
                                </div>
                                <textarea
                                    value={schedule.description}
                                    onChange={(e) => handleScheduleChange(schedule.round, e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ccff00]/50 min-h-[80px] resize-y placeholder:text-gray-600"
                                    placeholder={`Instructions for Round ${schedule.round}...`}
                                />
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-white/10">
                        <button 
                            onClick={() => setIsScheduleModalOpen(false)}
                            className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white text-sm font-bold transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={saveSchedules}
                            disabled={isSavingSchedules}
                            className="flex-1 py-3 rounded-xl bg-[#ccff00] text-black hover:bg-[#bceb00] text-sm font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            {isSavingSchedules ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Publish Updates
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