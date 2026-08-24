import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Award,
  Trophy,
  User,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Toast from '../components/Toast';
import { certifications as defaultCerts } from '../data/certifications';
import { timelineEvents as defaultTimeline } from '../data/timeline';

interface AdminCert {
  id: number;
  name: string;
  issuer: string;
  year: string;
  category: string;
}

interface AdminAchievement {
  id: number;
  year: string;
  title: string;
  description: string;
  highlight: boolean;
}

interface AdminState {
  certs: AdminCert[];
  achievements: AdminAchievement[];
  bio: string;
  headline: string;
  stats: { projects: number; leetcode: number; certifications: number };
}

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'achievements', label: 'Achievements', icon: Trophy },
  { id: 'personal', label: 'Personal Info', icon: User },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAddCert, setShowAddCert] = useState(false);
  const [showAddAch, setShowAddAch] = useState(false);
  const [editingCert, setEditingCert] = useState<number | null>(null);
  const [editingAch, setEditingAch] = useState<number | null>(null);

  const [state, setState] = useState<AdminState>(() => {
    const saved = localStorage.getItem('adminData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return {
      certs: defaultCerts.map(c => ({ id: c.id, name: c.name, issuer: c.issuer, year: c.year, category: c.category })),
      achievements: defaultTimeline.map((t, i) => ({ id: i + 1, year: t.year, title: t.title, description: t.description, highlight: t.highlight || false })),
      bio: 'I am a passionate engineering student obsessed with building AI systems that solve real-world problems. From federated learning models to full-stack web applications, I love shipping products that create measurable impact.',
      headline: 'A Tech-Driven, Collaborative, and Innovation-Focused Engineering Student',
      stats: { projects: 7, leetcode: 55, certifications: 8 },
    };
  });

  const [newCert, setNewCert] = useState({ name: '', issuer: '', year: '', category: 'AI/ML' });
  const [newAch, setNewAch] = useState({ year: '', title: '', description: '', highlight: false });
  const [editCertData, setEditCertData] = useState({ name: '', issuer: '', year: '', category: '' });
  const [editAchData, setEditAchData] = useState({ year: '', title: '', description: '', highlight: false });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'authenticated') {
      navigate('/admin');
    }
  }, [navigate]);

  const saveData = (newState: AdminState) => {
    setState(newState);
    localStorage.setItem('adminData', JSON.stringify(newState));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  const handleAddCert = () => {
    if (!newCert.name || !newCert.issuer || !newCert.year) return;
    const cert: AdminCert = { ...newCert, id: Date.now() };
    const newState = { ...state, certs: [...state.certs, cert] };
    saveData(newState);
    setNewCert({ name: '', issuer: '', year: '', category: 'AI/ML' });
    setShowAddCert(false);
    setToast({ message: 'Certificate added successfully!', type: 'success' });
  };

  const handleDeleteCert = (id: number) => {
    const newState = { ...state, certs: state.certs.filter(c => c.id !== id) };
    saveData(newState);
    setToast({ message: 'Certificate deleted', type: 'success' });
  };

  const handleEditCert = (cert: AdminCert) => {
    setEditingCert(cert.id);
    setEditCertData({ name: cert.name, issuer: cert.issuer, year: cert.year, category: cert.category });
  };

  const handleSaveCert = (id: number) => {
    const newState = {
      ...state,
      certs: state.certs.map(c => c.id === id ? { ...c, ...editCertData } : c)
    };
    saveData(newState);
    setEditingCert(null);
    setToast({ message: 'Certificate updated!', type: 'success' });
  };

  const handleAddAch = () => {
    if (!newAch.title || !newAch.year) return;
    const ach: AdminAchievement = { ...newAch, id: Date.now() };
    const newState = { ...state, achievements: [...state.achievements, ach] };
    saveData(newState);
    setNewAch({ year: '', title: '', description: '', highlight: false });
    setShowAddAch(false);
    setToast({ message: 'Achievement added!', type: 'success' });
  };

  const handleDeleteAch = (id: number) => {
    const newState = { ...state, achievements: state.achievements.filter(a => a.id !== id) };
    saveData(newState);
    setToast({ message: 'Achievement deleted', type: 'success' });
  };

  const handleEditAch = (ach: AdminAchievement) => {
    setEditingAch(ach.id);
    setEditAchData({ year: ach.year, title: ach.title, description: ach.description, highlight: ach.highlight });
  };

  const handleSaveAch = (id: number) => {
    const newState = {
      ...state,
      achievements: state.achievements.map(a => a.id === id ? { ...a, ...editAchData } : a)
    };
    saveData(newState);
    setEditingAch(null);
    setToast({ message: 'Achievement updated!', type: 'success' });
  };

  const handleSavePersonal = () => {
    localStorage.setItem('adminData', JSON.stringify(state));
    setToast({ message: 'Personal info saved!', type: 'success' });
  };

  return (
    <div className="min-h-[100dvh] bg-[#030305] flex">
      {/* Sidebar */}
      <aside className="w-[240px] border-r border-[rgba(255,255,255,0.06)] flex flex-col fixed h-full">
        <div className="p-6 border-b border-[rgba(255,255,255,0.06)]">
          <span className="text-white font-bold text-lg tracking-wider font-['Geist']">MUHIL</span>
          <p className="text-[rgba(255,255,255,0.4)] text-[10px] font-['Geist_Mono'] mt-1">ADMIN PANEL</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-['Geist'] transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-[rgba(34,82,255,0.15)] text-white border-l-2 border-[#2252FF]'
                  : 'text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-['Geist'] text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,0,0,0.1)] hover:text-red-400 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[240px] p-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold text-white font-['Geist'] mb-8">Dashboard</h2>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {[
                  { label: 'Certificates', value: state.certs.length, icon: Award, color: '#2252FF' },
                  { label: 'Achievements', value: state.achievements.length, icon: Trophy, color: '#FFCD00' },
                  { label: 'Projects', value: state.stats.projects, icon: Sparkles, color: '#D0FF71' },
                ].map((stat) => (
                  <div key={stat.label} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                        <stat.icon size={20} style={{ color: stat.color }} />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white font-['Geist']">{stat.value}</div>
                    <div className="text-xs text-[rgba(255,255,255,0.4)] font-['Geist_Mono'] uppercase tracking-wider mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                <h3 className="text-white font-semibold font-['Geist'] mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                  <button onClick={() => setActiveTab('certificates')} className="flex items-center gap-2 text-[#2252FF] text-sm font-['Geist'] hover:underline">
                    <ChevronRight size={16} />
                    Manage Certificates
                  </button>
                  <button onClick={() => setActiveTab('achievements')} className="flex items-center gap-2 text-[#FFCD00] text-sm font-['Geist'] hover:underline">
                    <ChevronRight size={16} />
                    Manage Achievements
                  </button>
                  <button onClick={() => setActiveTab('personal')} className="flex items-center gap-2 text-[#D0FF71] text-sm font-['Geist'] hover:underline">
                    <ChevronRight size={16} />
                    Edit Personal Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white font-['Geist']">Manage Certificates</h2>
                <button
                  onClick={() => setShowAddCert(!showAddCert)}
                  className="flex items-center gap-2 bg-[#2252FF] text-white px-4 py-2 rounded-lg text-sm font-['Geist'] hover:bg-[#3952FF] transition-colors"
                >
                  <Plus size={16} />
                  Add Certificate
                </button>
              </div>

              {showAddCert && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
                  <h3 className="text-white font-semibold font-['Geist'] mb-4">Add New Certificate</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <input placeholder="Certificate Name" value={newCert.name} onChange={e => setNewCert({...newCert, name: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF]" />
                    <input placeholder="Issuer" value={newCert.issuer} onChange={e => setNewCert({...newCert, issuer: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF]" />
                    <input placeholder="Year" value={newCert.year} onChange={e => setNewCert({...newCert, year: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF]" />
                    <select value={newCert.category} onChange={e => setNewCert({...newCert, category: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]">
                      <option value="AI/ML">AI/ML</option>
                      <option value="IoT">IoT</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Programming">Programming</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleAddCert} className="bg-[#2252FF] text-white px-4 py-2 rounded-lg text-sm font-['Geist'] hover:bg-[#3952FF]">Add</button>
                    <button onClick={() => setShowAddCert(false)} className="text-[rgba(255,255,255,0.5)] px-4 py-2 text-sm hover:text-white">Cancel</button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                {state.certs.map((cert) => (
                  <div key={cert.id} className="glass-card p-4 flex items-center gap-4">
                    {editingCert === cert.id ? (
                      <>
                        <div className="flex-1 grid sm:grid-cols-4 gap-3">
                          <input value={editCertData.name} onChange={e => setEditCertData({...editCertData, name: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]" />
                          <input value={editCertData.issuer} onChange={e => setEditCertData({...editCertData, issuer: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]" />
                          <input value={editCertData.year} onChange={e => setEditCertData({...editCertData, year: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]" />
                          <select value={editCertData.category} onChange={e => setEditCertData({...editCertData, category: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]">
                            <option value="AI/ML">AI/ML</option>
                            <option value="IoT">IoT</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Programming">Programming</option>
                          </select>
                        </div>
                        <button onClick={() => handleSaveCert(cert.id)} className="text-[#D0FF71] hover:text-white"><Save size={16} /></button>
                        <button onClick={() => setEditingCert(null)} className="text-[rgba(255,255,255,0.4)] hover:text-white"><X size={16} /></button>
                      </>
                    ) : (
                      <>
                        <div className="w-10 h-10 rounded-lg bg-[rgba(34,82,255,0.15)] flex items-center justify-center shrink-0">
                          <Award size={18} className="text-[#2252FF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-['Geist'] truncate">{cert.name}</h4>
                          <p className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono']">{cert.issuer} · {cert.year}</p>
                        </div>
                        <button onClick={() => handleEditCert(cert)} className="text-[rgba(255,255,255,0.4)] hover:text-[#2252FF] transition-colors"><Edit3 size={16} /></button>
                        <button onClick={() => handleDeleteCert(cert.id)} className="text-[rgba(255,255,255,0.4)] hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white font-['Geist']">Manage Achievements</h2>
                <button
                  onClick={() => setShowAddAch(!showAddAch)}
                  className="flex items-center gap-2 bg-[#2252FF] text-white px-4 py-2 rounded-lg text-sm font-['Geist'] hover:bg-[#3952FF] transition-colors"
                >
                  <Plus size={16} />
                  Add Achievement
                </button>
              </div>

              {showAddAch && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
                  <h3 className="text-white font-semibold font-['Geist'] mb-4">Add New Achievement</h3>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <input placeholder="Year" value={newAch.year} onChange={e => setNewAch({...newAch, year: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF]" />
                    <input placeholder="Title" value={newAch.title} onChange={e => setNewAch({...newAch, title: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF]" />
                    <textarea placeholder="Description" value={newAch.description} onChange={e => setNewAch({...newAch, description: e.target.value})} className="sm:col-span-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-2 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF] resize-none" rows={2} />
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleAddAch} className="bg-[#2252FF] text-white px-4 py-2 rounded-lg text-sm font-['Geist'] hover:bg-[#3952FF]">Add</button>
                    <button onClick={() => setShowAddAch(false)} className="text-[rgba(255,255,255,0.5)] px-4 py-2 text-sm hover:text-white">Cancel</button>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                {state.achievements.map((ach) => (
                  <div key={ach.id} className={`glass-card p-4 ${ach.highlight ? 'border-[rgba(255,205,0,0.3)]' : ''}`}>
                    {editingAch === ach.id ? (
                      <div className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input value={editAchData.year} onChange={e => setEditAchData({...editAchData, year: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]" />
                          <input value={editAchData.title} onChange={e => setEditAchData({...editAchData, title: e.target.value})} className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]" />
                        </div>
                        <textarea value={editAchData.description} onChange={e => setEditAchData({...editAchData, description: e.target.value})} className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF] resize-none" rows={2} />
                        <div className="flex gap-3">
                          <button onClick={() => handleSaveAch(ach.id)} className="text-[#D0FF71] hover:text-white text-sm flex items-center gap-1"><Save size={14} /> Save</button>
                          <button onClick={() => setEditingAch(null)} className="text-[rgba(255,255,255,0.4)] hover:text-white text-sm flex items-center gap-1"><X size={14} /> Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[rgba(255,205,0,0.15)] flex items-center justify-center shrink-0">
                          <Trophy size={18} className="text-[#FFCD00]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#2252FF] text-xs font-['Geist_Mono']">{ach.year}</span>
                            {ach.highlight && <span className="text-[10px] bg-[rgba(255,205,0,0.2)] text-[#FFCD00] px-2 py-0.5 rounded-full font-['Geist_Mono']">HIGHLIGHT</span>}
                          </div>
                          <h4 className="text-white text-sm font-['Geist'] mb-1">{ach.title}</h4>
                          <p className="text-[rgba(255,255,255,0.5)] text-xs">{ach.description}</p>
                        </div>
                        <button onClick={() => handleEditAch(ach)} className="text-[rgba(255,255,255,0.4)] hover:text-[#2252FF]"><Edit3 size={16} /></button>
                        <button onClick={() => handleDeleteAch(ach.id)} className="text-[rgba(255,255,255,0.4)] hover:text-red-400"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div>
              <h2 className="text-2xl font-bold text-white font-['Geist'] mb-8">Personal Info</h2>

              <div className="space-y-6 max-w-[640px]">
                <div className="glass-card p-6">
                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                    Headline
                  </label>
                  <textarea
                    value={state.headline}
                    onChange={e => setState({...state, headline: e.target.value})}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2252FF] resize-none"
                    rows={2}
                  />
                </div>

                <div className="glass-card p-6">
                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                    Bio
                  </label>
                  <textarea
                    value={state.bio}
                    onChange={e => setState({...state, bio: e.target.value})}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#2252FF] resize-none"
                    rows={4}
                  />
                </div>

                <div className="glass-card p-6">
                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-4 block">
                    Stats
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">Projects</label>
                      <input
                        type="number"
                        value={state.stats.projects}
                        onChange={e => setState({...state, stats: {...state.stats, projects: parseInt(e.target.value) || 0}})}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">LeetCode</label>
                      <input
                        type="number"
                        value={state.stats.leetcode}
                        onChange={e => setState({...state, stats: {...state.stats, leetcode: parseInt(e.target.value) || 0}})}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]"
                      />
                    </div>
                    <div>
                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">Certifications</label>
                      <input
                        type="number"
                        value={state.stats.certifications}
                        onChange={e => setState({...state, stats: {...state.stats, certifications: parseInt(e.target.value) || 0}})}
                        className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSavePersonal}
                  className="flex items-center gap-2 bg-[#2252FF] text-white px-6 py-3 rounded-lg font-['Geist'] text-sm font-medium hover:bg-[#3952FF] transition-colors"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
