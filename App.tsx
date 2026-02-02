import React, { useState, useEffect } from 'react';
import { HubType, Notification, UserRole } from './types';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AdSlot from './components/AdSlot';
import Dashboard from './components/hubs/Dashboard';
import KnowledgeHub from './components/hubs/KnowledgeHub';
import EarningHub from './components/hubs/EarningHub';
import BusinessHub from './components/hubs/BusinessHub';
import ImpactHub from './components/hubs/ImpactHub';
import HealthcareHub from './components/hubs/HealthcareHub';
import CommunityHub from './components/hubs/CommunityHub';
import FamilyHub from './components/hubs/FamilyHub';
import CareerHub from './components/hubs/CareerHub';
import ProfileView from './components/ProfileView';
import AIChatOverlay from './components/AIChatOverlay';

const App: React.FC = () => {
  const [activeHub, setActiveHub] = useState<HubType>(HubType.DASHBOARD);
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initializing with local storage if available for PWA feel
    const saved = localStorage.getItem('hub24-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const [notifications] = useState<Notification[]>([
    { id: '1', title: 'Payment Wallet Sync', message: 'Online wallet successfully linked to PayPal.', type: 'success', time: '1m ago', read: false },
    { id: '2', title: 'Health OS Update', message: 'New pharmacy inventory report generated.', type: 'info', time: '20m ago', read: false }
  ]);

  // Global Keyboard Shortcuts Engine
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Chat: Cmd+K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsChatOpen(prev => !prev);
      }
      // Dashboard Home: Alt+H
      if (e.altKey && (e.key === 'h' || e.key === 'H')) {
        e.preventDefault();
        setActiveHub(HubType.DASHBOARD);
      }
      // Toggle Theme: Alt+T
      if (e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        toggleTheme();
      }
      // Close Overlays: Escape
      if (e.key === 'Escape') {
        setIsChatOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('hub24-theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  const renderHubContent = () => {
    if (!isLoggedIn && activeHub !== HubType.PROFILE) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-12 animate-in fade-in zoom-in duration-1000">
          <div className="relative">
             <div className="w-32 h-32 bg-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40 border border-white/20">
               <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
             </div>
             <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg border-4 border-[#020617]">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
             </div>
          </div>
          <div className="space-y-4">
            <h2 className={`text-6xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} tracking-tighter italic uppercase`}>System Lock</h2>
            <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} max-w-md font-medium mx-auto text-lg leading-relaxed`}>Identity verification required to synchronize your personal node on <span className="text-indigo-500">eldoctooor.ae</span>.</p>
          </div>
          <button 
            onClick={() => setActiveHub(HubType.PROFILE)} 
            className="px-16 py-6 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-3xl transition-all shadow-2xl shadow-indigo-500/30 uppercase tracking-[0.4em] text-xs hover:scale-105 active:scale-95"
          >
            Access Ecosystem
          </button>
        </div>
      );
    }

    switch (activeHub) {
      case HubType.DASHBOARD: return <Dashboard onSelectHub={setActiveHub} role={role} isDarkMode={isDarkMode} />;
      case HubType.KNOWLEDGE: return <KnowledgeHub />;
      case HubType.EARNING: return <EarningHub role={role} />;
      case HubType.BUSINESS: return <BusinessHub />;
      case HubType.IMPACT: return <ImpactHub />;
      case HubType.HEALTHCARE: return <HealthcareHub />;
      case HubType.COMMUNITY: return <CommunityHub />;
      case HubType.FAMILY: return <FamilyHub />;
      case HubType.CAREERS: return <CareerHub isDarkMode={isDarkMode} />;
      case HubType.PROFILE: return (
        <ProfileView 
          onLogin={() => setIsLoggedIn(true)} 
          isLoggedIn={isLoggedIn} 
          role={role} 
          onToggleRole={() => setRole(role === UserRole.USER ? UserRole.OWNER : UserRole.USER)} 
        />
      );
      default: return <Dashboard onSelectHub={setActiveHub} role={role} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-500 overflow-hidden font-sans selection:bg-indigo-500/30`}> 
      <Sidebar activeHub={activeHub} onSelectHub={setActiveHub} isDarkMode={isDarkMode} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <TopBar 
          notifications={notifications} 
          onProfileClick={() => setActiveHub(HubType.PROFILE)} 
          isDarkMode={isDarkMode} 
          onToggleTheme={toggleTheme} 
        />
        
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar relative bg-transparent">
            <div className="max-w-6xl mx-auto space-y-16 pb-32">
              <AdSlot id="global-header-sync" type="banner" />
              
              {renderHubContent()}
              
              <footer className={`mt-32 pt-16 border-t ${isDarkMode ? 'border-slate-900' : 'border-slate-200'} flex flex-col md:flex-row justify-between items-center gap-10 pb-16`}> 
                 <div className="flex flex-col gap-2 items-center md:items-start">
                    <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mb-1">Production Node</p>
                    <a href="https://www.eldoctooor.ae" target="_blank" rel="noopener noreferrer" className={`font-black tracking-tighter text-3xl transition-all italic hover:scale-105 ${isDarkMode ? 'text-white hover:text-indigo-400' : 'text-slate-900 hover:text-indigo-600'}`}> 
                      ELDOCTOOOR<span className="text-indigo-600">.AE</span>
                    </a>
                    <p className="text-[10px] text-slate-500 font-bold mt-1">© 2024 HUB-24 OS. All Core Systems Synchronized.</p>
                 </div>
                 <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black text-slate-500 uppercase tracking-widest"> 
                    <a href="#" className="hover:text-indigo-500 transition-colors">Privacy Protocols</a>
                    <a href="#" className="hover:text-indigo-500 transition-colors">Ecosystem Rules</a>
                    <a href="#" className="hover:text-indigo-500 transition-colors">Developer SDK</a>
                    <a href="#" className="hover:text-indigo-500 transition-colors">Domain Registry</a>
                 </div>
              </footer>

              <AdSlot id="global-footer-sync" type="banner" className="mt-12 opacity-80" />
            </div>
          </main>

          {/* Monetization Engine - Side Panel */} 
          <aside className={`hidden xl:flex flex-col gap-8 p-8 border-l ${isDarkMode ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200 bg-slate-100/60'} w-[360px] overflow-y-auto custom-scrollbar`}> 
            <div className="flex justify-between items-center px-2"> 
               <h4 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Network Partners</h4> 
               <span className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 text-indigo-500 rounded text-[9px] font-black uppercase border border-indigo-500/20"> 
                 <span className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></span> 
                 Market Live 
               </span>
            </div>
            <AdSlot id="side-p1" type="square" />
            <AdSlot id="side-p2" type="square" />
            <AdSlot id="side-p3" type="square" />
            <AdSlot id="side-p4" type="square" />
            <AdSlot id="side-p5" type="square" />
          </aside>
        </div>

        {/* Global Floating Intelligence Agent */} 
        <button
          onClick={() => setIsChatOpen(true)}
          title="AI Assistant (Cmd+K)"
          className="fixed bottom-12 right-12 w-24 h-24 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(79,70,229,0.5)] flex items-center justify-center transition-all z-40 group hover:scale-110 active:scale-90"
        >
          <div className="absolute inset-0 bg-indigo-400 rounded-[3rem] animate-ping opacity-10"></div>
          <svg className="h-12 w-12 relative z-10 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>

        {isChatOpen && <AIChatOverlay onClose={() => setIsChatOpen(false)} isDarkMode={isDarkMode} />}
      </div>
    </div>
  );
};

export default App;