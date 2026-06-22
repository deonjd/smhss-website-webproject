'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Save, LogOut, Key, Loader2, CheckCircle, 
  Settings, Users, Award, Image, BookOpen, Megaphone, 
  HelpCircle, MapPin, Edit3, Eye, FileText, Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // CMS Content States
  const [siteContent, setSiteContent] = useState<any>(null);
  const [faculty, setFaculty] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);

  // Load all content
  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/get-content');
      if (res.ok) {
        const data = await res.json();
        setSiteContent(data['site-content']);
        setFaculty(data['faculty'] || []);
        setAchievements(data['achievements'] || []);
        setGallery(data['gallery'] || []);
        setNews(data['news'] || []);
      } else {
        showToast('Failed to fetch CMS content', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error connecting to API', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Check if user was already authenticated in this session
    const authStatus = sessionStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === 'admin123' || passkey === 'smhss1965') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setError('');
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4A843', '#10B981', '#1E3A5F']
      });
    } else {
      setError('Invalid passkey. Try "admin123".');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const saveContent = async (type: string, data: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      });
      const result = await res.json();
      if (result.success) {
        showToast(`${type} successfully updated!`, 'success');
        // Re-load to make sure state is in sync
        loadData();
        // Trigger small confetti burst on success
        confetti({
          particleCount: 50,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#D4A843', '#10B981']
        });
      } else {
        showToast(result.error || 'Failed to save content', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center flex-col gap-4 text-white">
        <Loader2 className="w-12 h-12 text-[#D4A843] animate-spin" />
        <p className="font-display font-light text-slate-400">Loading school control center...</p>
      </div>
    );
  }

  // PASSKEY GATE
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Dynamic lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#D4A843]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#10B981]/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/10 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#D4A843] to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent/20">
              <Key className="w-8 h-8 text-[#0A1628]" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white mb-2">CMS Admin Console</h1>
            <p className="text-sm text-slate-400">Enter school passkey to edit site content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Passkey</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#D4A843]/50 focus:ring-1 focus:ring-[#D4A843]/50 transition-all font-mono"
                required
              />
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4A843] to-amber-500 hover:from-[#e5b94e] hover:to-amber-600 text-[#0A1628] font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-xl shadow-accent/15"
            >
              Verify Credentials
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-500">SMHSS Murickassery Digital Campus Portal</p>
            <p className="text-[10px] text-slate-600 mt-1">Hint: use "admin123" to access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col lg:flex-row relative">
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border backdrop-blur-xl animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' 
            : 'bg-red-950/80 border-red-500/30 text-red-300'
        }`}>
          <CheckCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-80 bg-slate-950/40 border-r border-white/5 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
            <div className="w-10 h-10 rounded-xl bg-[#D4A843]/10 border border-[#D4A843]/30 flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#D4A843]" />
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-wide text-white uppercase">Control Center</h2>
              <p className="text-[10px] text-slate-500">SMHSS CMS Dashboard</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {[
              { id: 'general', label: 'General & Stats', icon: Settings },
              { id: 'about', label: 'About & Timeline', icon: Compass },
              { id: 'principal', label: "Principal's Desk", icon: FileText },
              { id: 'academics', label: 'Academics Block', icon: BookOpen },
              { id: 'faculty', label: 'Faculty Members', icon: Users },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'gallery', label: 'Media Gallery', icon: Image },
              { id: 'news', label: 'News & Announcements', icon: Megaphone },
              { id: 'admissions', label: 'Admissions & FAQ', icon: HelpCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-[#D4A843] text-[#0A1628] font-bold shadow-lg shadow-accent/10'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <span>Session: Active</span>
            <span className="text-[#10B981]">● Live Dev API</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-slate-400 hover:text-red-400 transition-all text-sm font-semibold"
          >
            <LogOut className="w-4 h-4" />
            Logout Session
          </button>
        </div>
      </aside>

      {/* DASHBOARD CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold tracking-tight">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Editor
            </h1>
            <p className="text-xs text-slate-400 mt-1">Make changes in real-time. Don't forget to save.</p>
          </div>
          <a
            href="/"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> View Live Website
          </a>
        </header>

        {/* 1. GENERAL & STATS TAB */}
        {activeTab === 'general' && siteContent && (
          <div className="space-y-8 max-w-4xl">
            {/* School Details */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">School Profile</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">School Short Name</label>
                  <input
                    type="text"
                    value={siteContent.school.name}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, name: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">School Full Name</label>
                  <input
                    type="text"
                    value={siteContent.school.fullName}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, fullName: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Slogan / Tagline</label>
                  <input
                    type="text"
                    value={siteContent.school.tagline}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, tagline: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Established Year</label>
                  <input
                    type="number"
                    value={siteContent.school.established}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, established: parseInt(e.target.value) || 1965 }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Official Email</label>
                  <input
                    type="email"
                    value={siteContent.school.email}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, email: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Official Phone</label>
                  <input
                    type="text"
                    value={siteContent.school.phone}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, phone: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Official Website</label>
                  <input
                    type="text"
                    value={siteContent.school.website}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, website: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Contact Address</label>
                  <textarea
                    rows={2}
                    value={siteContent.school.address}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      school: { ...siteContent.school, address: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Statistics Dashboard</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Student Count</label>
                  <input
                    type="number"
                    value={siteContent.stats.students}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      stats: { ...siteContent.stats, students: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Teacher Count</label>
                  <input
                    type="number"
                    value={siteContent.stats.teachers}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      stats: { ...siteContent.stats, teachers: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Achievements</label>
                  <input
                    type="number"
                    value={siteContent.stats.achievements}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      stats: { ...siteContent.stats, achievements: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Years of Excellence</label>
                  <input
                    type="number"
                    value={siteContent.stats.yearsOfExcellence}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      stats: { ...siteContent.stats, yearsOfExcellence: parseInt(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => saveContent('site-content', siteContent)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Profile & Statistics
            </button>
          </div>
        )}

        {/* 2. ABOUT & TIMELINE TAB */}
        {activeTab === 'about' && siteContent && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Mission & Vision</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">About Section Description</label>
                  <textarea
                    rows={3}
                    value={siteContent.about.description}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      about: { ...siteContent.about, description: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40 resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Our Mission Statement</label>
                    <textarea
                      rows={4}
                      value={siteContent.about.mission}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, mission: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Our Vision Statement</label>
                    <textarea
                      rows={4}
                      value={siteContent.about.vision}
                      onChange={(e) => setSiteContent({
                        ...siteContent,
                        about: { ...siteContent.about, vision: e.target.value }
                      })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* School History Timeline */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-display font-bold text-lg text-white">Historical Timeline</h3>
                <button
                  onClick={() => {
                    const newTimeline = [...siteContent.about.timeline, { year: '2026', title: 'New Event', description: 'Description' }];
                    setSiteContent({ ...siteContent, about: { ...siteContent.about, timeline: newTimeline } });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-[#D4A843]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Milestone
                </button>
              </div>

              <div className="space-y-4">
                {siteContent.about.timeline.map((event: any, index: number) => (
                  <div key={index} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5 relative group">
                    <div className="w-24 shrink-0">
                      <label className="block text-[10px] text-slate-500 mb-1">Year</label>
                      <input
                        type="text"
                        value={event.year}
                        onChange={(e) => {
                          const newTimeline = [...siteContent.about.timeline];
                          newTimeline[index].year = e.target.value;
                          setSiteContent({ ...siteContent, about: { ...siteContent.about, timeline: newTimeline } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A843]/40 font-mono"
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Title / Milestone</label>
                        <input
                          type="text"
                          value={event.title}
                          onChange={(e) => {
                            const newTimeline = [...siteContent.about.timeline];
                            newTimeline[index].title = e.target.value;
                            setSiteContent({ ...siteContent, about: { ...siteContent.about, timeline: newTimeline } });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A843]/40"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Description</label>
                        <input
                          type="text"
                          value={event.description}
                          onChange={(e) => {
                            const newTimeline = [...siteContent.about.timeline];
                            newTimeline[index].description = e.target.value;
                            setSiteContent({ ...siteContent, about: { ...siteContent.about, timeline: newTimeline } });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4A843]/40"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newTimeline = siteContent.about.timeline.filter((_: any, i: number) => i !== index);
                        setSiteContent({ ...siteContent, about: { ...siteContent.about, timeline: newTimeline } });
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all self-center"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('site-content', siteContent)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Mission, Vision & History
            </button>
          </div>
        )}

        {/* 3. PRINCIPAL MESSAGE TAB */}
        {activeTab === 'principal' && siteContent && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Principal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Principal Name</label>
                  <input
                    type="text"
                    value={siteContent.principal.name}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      principal: { ...siteContent.principal, name: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Principal Photo URL / Path</label>
                  <input
                    type="text"
                    value={siteContent.principal.image}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      principal: { ...siteContent.principal, image: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Welcome Message</label>
                  <textarea
                    rows={12}
                    value={siteContent.principal.message}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      principal: { ...siteContent.principal, message: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40 font-sans leading-relaxed resize-y"
                  />
                  <p className="text-[10px] text-slate-500 mt-2">Use double line breaks (\n\n) to create paragraphs.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => saveContent('site-content', siteContent)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Message
            </button>
          </div>
        )}

        {/* 4. ACADEMICS TAB */}
        {activeTab === 'academics' && siteContent && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Academics Headers</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Section Title</label>
                  <input
                    type="text"
                    value={siteContent.academics.title}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      academics: { ...siteContent.academics, title: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Subtitle</label>
                  <input
                    type="text"
                    value={siteContent.academics.subtitle}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      academics: { ...siteContent.academics, subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
              </div>
            </div>

            {/* Academic Programs List */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Academic Classes & Amenities</h3>
              <div className="space-y-6">
                {siteContent.academics.programs.map((program: any, index: number) => (
                  <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Title</label>
                        <input
                          type="text"
                          value={program.title}
                          onChange={(e) => {
                            const newPrograms = [...siteContent.academics.programs];
                            newPrograms[index].title = e.target.value;
                            setSiteContent({ ...siteContent, academics: { ...siteContent.academics, programs: newPrograms } });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Icon Identifier (graduation, school, flask, book, monitor)</label>
                        <input
                          type="text"
                          value={program.icon}
                          onChange={(e) => {
                            const newPrograms = [...siteContent.academics.programs];
                            newPrograms[index].icon = e.target.value;
                            setSiteContent({ ...siteContent, academics: { ...siteContent.academics, programs: newPrograms } });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={program.description}
                        onChange={(e) => {
                          const newPrograms = [...siteContent.academics.programs];
                          newPrograms[index].description = e.target.value;
                          setSiteContent({ ...siteContent, academics: { ...siteContent.academics, programs: newPrograms } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-2">Highlights (comma separated)</label>
                      <input
                        type="text"
                        value={program.highlights.join(', ')}
                        onChange={(e) => {
                          const newPrograms = [...siteContent.academics.programs];
                          newPrograms[index].highlights = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setSiteContent({ ...siteContent, academics: { ...siteContent.academics, programs: newPrograms } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('site-content', siteContent)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Academics
            </button>
          </div>
        )}

        {/* 5. FACULTY MEMBERS TAB */}
        {activeTab === 'faculty' && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-display font-bold text-lg text-white">Staff Directories</h3>
                <button
                  onClick={() => {
                    const newId = faculty.length > 0 ? Math.max(...faculty.map(f => f.id)) + 1 : 1;
                    const newMember = {
                      id: newId,
                      name: 'New Teacher',
                      designation: 'Subject Teacher',
                      qualification: 'M.Sc, B.Ed',
                      department: 'Science',
                      image: '/images/faculty/placeholder.jpg'
                    };
                    setFaculty([...faculty, newMember]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-[#D4A843]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Staff Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faculty.map((member, index) => (
                  <div key={member.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4 relative group">
                    <button
                      onClick={() => {
                        const updated = faculty.filter(f => f.id !== member.id);
                        setFaculty(updated);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/5 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"
                      title="Delete Teacher"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => {
                            const updated = [...faculty];
                            updated[index].name = e.target.value;
                            setFaculty(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Designation</label>
                          <input
                            type="text"
                            value={member.designation}
                            onChange={(e) => {
                              const updated = [...faculty];
                              updated[index].designation = e.target.value;
                              setFaculty(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Department</label>
                          <input
                            type="text"
                            value={member.department}
                            onChange={(e) => {
                              const updated = [...faculty];
                              updated[index].department = e.target.value;
                              setFaculty(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Qualifications</label>
                          <input
                            type="text"
                            value={member.qualification}
                            onChange={(e) => {
                              const updated = [...faculty];
                              updated[index].qualification = e.target.value;
                              setFaculty(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Photo Path</label>
                          <input
                            type="text"
                            value={member.image}
                            onChange={(e) => {
                              const updated = [...faculty];
                              updated[index].image = e.target.value;
                              setFaculty(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('faculty', faculty)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Faculty Roster
            </button>
          </div>
        )}

        {/* 6. ACHIEVEMENTS TAB */}
        {activeTab === 'achievements' && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-display font-bold text-lg text-white">Honor Roll & Trophies</h3>
                <button
                  onClick={() => {
                    const newId = achievements.length > 0 ? Math.max(...achievements.map(a => a.id)) + 1 : 1;
                    const newAch = {
                      id: newId,
                      year: '2025',
                      title: 'New Award Received',
                      description: 'Milestone description',
                      category: 'academic',
                      icon: 'award'
                    };
                    setAchievements([newAch, ...achievements]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-[#D4A843]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Award
                </button>
              </div>

              <div className="space-y-4">
                {achievements.map((item, index) => (
                  <div key={item.id} className="bg-white/5 p-5 rounded-2xl border border-white/5 relative flex gap-4 items-start">
                    <div className="w-20 shrink-0">
                      <label className="block text-[10px] text-slate-500 mb-1">Year</label>
                      <input
                        type="text"
                        value={item.year}
                        onChange={(e) => {
                          const updated = [...achievements];
                          updated[index].year = e.target.value;
                          setAchievements(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none font-mono"
                      />
                    </div>
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Award Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...achievements];
                            updated[index].title = e.target.value;
                            setAchievements(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Category (academic, sports, arts, service)</label>
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => {
                              const updated = [...achievements];
                              updated[index].category = e.target.value;
                              setAchievements(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Icon (award, trophy, star, heart, brain, leaf, music, cpu)</label>
                          <input
                            type="text"
                            value={item.icon}
                            onChange={(e) => {
                              const updated = [...achievements];
                              updated[index].icon = e.target.value;
                              setAchievements(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-1">Full Description</label>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...achievements];
                            updated[index].description = e.target.value;
                            setAchievements(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const updated = achievements.filter(a => a.id !== item.id);
                        setAchievements(updated);
                      }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all self-center"
                      title="Remove Achievement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('achievements', achievements)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Honor & Achievements
            </button>
          </div>
        )}

        {/* 7. MEDIA GALLERY TAB */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-display font-bold text-lg text-white">Gallery Images</h3>
                <button
                  onClick={() => {
                    const newId = gallery.length > 0 ? Math.max(...gallery.map(g => g.id)) + 1 : 1;
                    const newImg = {
                      id: newId,
                      src: '/images/gallery/placeholder.jpg',
                      alt: 'Photo description',
                      category: 'campus',
                      featured: false
                    };
                    setGallery([newImg, ...gallery]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-[#D4A843]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Photo
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gallery.map((image, index) => (
                  <div key={image.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 space-y-3 relative group">
                    <button
                      onClick={() => {
                        const updated = gallery.filter(g => g.id !== image.id);
                        setGallery(updated);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/5 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all z-10"
                      title="Delete Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center border border-white/5 relative">
                      {/* Placeholder preview if path is placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 to-slate-950 flex items-center justify-center text-[10px] text-slate-500 font-mono">
                        {image.src}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Image URL / Path</label>
                        <input
                          type="text"
                          value={image.src}
                          onChange={(e) => {
                            const updated = [...gallery];
                            updated[index].src = e.target.value;
                            setGallery(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Caption / Alt Text</label>
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) => {
                            const updated = [...gallery];
                            updated[index].alt = e.target.value;
                            setGallery(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-1">Category (campus, events, sports, cultural)</label>
                          <input
                            type="text"
                            value={image.category}
                            onChange={(e) => {
                              const updated = [...gallery];
                              updated[index].category = e.target.value;
                              setGallery(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none font-mono"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <label className="block text-[10px] text-slate-500 mb-1">Featured Image</label>
                          <label className="relative inline-flex items-center cursor-pointer mt-1">
                            <input
                              type="checkbox"
                              checked={image.featured}
                              onChange={(e) => {
                                const updated = [...gallery];
                                updated[index].featured = e.target.checked;
                                setGallery(updated);
                              }}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4A843] peer-checked:after:bg-[#0A1628]"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('gallery', gallery)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Gallery Items
            </button>
          </div>
        )}

        {/* 8. NEWS & ANNOUNCEMENTS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-display font-bold text-lg text-white">News Posts & Bulletins</h3>
                <button
                  onClick={() => {
                    const newId = news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1;
                    const newPost = {
                      id: newId,
                      title: 'New Announcement Title',
                      date: new Date().toISOString().split('T')[0],
                      excerpt: 'Short description for card display',
                      content: 'Detailed message body',
                      category: 'announcement',
                      featured: false
                    };
                    setNews([newPost, ...news]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-[#D4A843]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add News Article
                </button>
              </div>

              <div className="space-y-6">
                {news.map((item, index) => (
                  <div key={item.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4 relative">
                    <button
                      onClick={() => {
                        const updated = news.filter(n => n.id !== item.id);
                        setNews(updated);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/5 hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-all"
                      title="Delete News"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-1">Headline Title</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...news];
                            updated[index].title = e.target.value;
                            setNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Publish Date (YYYY-MM-DD)</label>
                        <input
                          type="text"
                          value={item.date}
                          onChange={(e) => {
                            const updated = [...news];
                            updated[index].date = e.target.value;
                            setNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Category (announcement, event, achievement)</label>
                        <input
                          type="text"
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...news];
                            updated[index].category = e.target.value;
                            setNews(updated);
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none font-mono"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <label className="block text-[10px] text-slate-500 mb-1 font-semibold">Featured on Homepage</label>
                        <label className="relative inline-flex items-center cursor-pointer mt-1">
                          <input
                            type="checkbox"
                            checked={item.featured}
                            onChange={(e) => {
                              const updated = [...news];
                              updated[index].featured = e.target.checked;
                              setNews(updated);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#D4A843] peer-checked:after:bg-[#0A1628]"></div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Brief Excerpt</label>
                      <input
                        type="text"
                        value={item.excerpt}
                        onChange={(e) => {
                          const updated = [...news];
                          updated[index].excerpt = e.target.value;
                          setNews(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Full Article / Announcement Content</label>
                      <textarea
                        rows={3}
                        value={item.content}
                        onChange={(e) => {
                          const updated = [...news];
                          updated[index].content = e.target.value;
                          setNews(updated);
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none resize-y"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('news', news)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save News & Announcements
            </button>
          </div>
        )}

        {/* 9. ADMISSIONS & FAQ TAB */}
        {activeTab === 'admissions' && siteContent && (
          <div className="space-y-8 max-w-4xl">
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Admissions Headers</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Section Title</label>
                  <input
                    type="text"
                    value={siteContent.admissions.title}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      admissions: { ...siteContent.admissions, title: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-2 font-semibold uppercase">Subtitle</label>
                  <input
                    type="text"
                    value={siteContent.admissions.subtitle}
                    onChange={(e) => setSiteContent({
                      ...siteContent,
                      admissions: { ...siteContent.admissions, subtitle: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#D4A843]/40"
                  />
                </div>
              </div>
            </div>

            {/* Admission Steps */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-white/5 pb-3">Admission Process Steps</h3>
              <div className="space-y-4">
                {siteContent.admissions.steps.map((step: any, index: number) => (
                  <div key={step.step} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                    <div className="w-12 text-center shrink-0">
                      <span className="inline-block w-8 h-8 rounded-full bg-[#D4A843]/15 text-[#D4A843] font-bold text-sm flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Step Name</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...siteContent.admissions.steps];
                            newSteps[index].title = e.target.value;
                            setSiteContent({ ...siteContent, admissions: { ...siteContent.admissions, steps: newSteps } });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 mb-1">Step Detail Description</label>
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...siteContent.admissions.steps];
                            newSteps[index].description = e.target.value;
                            setSiteContent({ ...siteContent, admissions: { ...siteContent.admissions, steps: newSteps } });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <h3 className="font-display font-bold text-lg text-white">Admission FAQs</h3>
                <button
                  onClick={() => {
                    const newFaqs = [...siteContent.admissions.faqs, { question: 'Question text', answer: 'Answer details' }];
                    setSiteContent({ ...siteContent, admissions: { ...siteContent.admissions, faqs: newFaqs } });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all text-[#D4A843]"
                >
                  <Plus className="w-3.5 h-3.5" /> Add FAQ
                </button>
              </div>

              <div className="space-y-4">
                {siteContent.admissions.faqs.map((faq: any, index: number) => (
                  <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3 relative group">
                    <button
                      onClick={() => {
                        const newFaqs = siteContent.admissions.faqs.filter((_: any, i: number) => i !== index);
                        setSiteContent({ ...siteContent, admissions: { ...siteContent.admissions, faqs: newFaqs } });
                      }}
                      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-all"
                      title="Remove FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Frequently Asked Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const newFaqs = [...siteContent.admissions.faqs];
                          newFaqs[index].question = e.target.value;
                          setSiteContent({ ...siteContent, admissions: { ...siteContent.admissions, faqs: newFaqs } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Answer</label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...siteContent.admissions.faqs];
                          newFaqs[index].answer = e.target.value;
                          setSiteContent({ ...siteContent, admissions: { ...siteContent.admissions, faqs: newFaqs } });
                        }}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => saveContent('site-content', siteContent)}
              disabled={saving}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4A843] text-[#0A1628] font-bold text-sm hover:bg-[#e5b94e] disabled:opacity-50 transition-all"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Admissions & FAQs
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
