import React, { useEffect, useState } from 'react';
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
import Footer from './components/Footer';
import { HubType, Notification, UserRole } from './types';
import { Theme } from './components/ThemeSelector';

// small helper to ensure ads script is present (idempotent)
function ensureAdsScriptPresent() {
  if ((window as any).adsbygoogle) return;
  if (document.getElementById('adsbygoogle-js')) return;
  const s = document.createElement('script');
  s.id = 'adsbygoogle-js';
  s.async = true;
  s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8167320193401713';
  (s as any).crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

const DEFAULT_THEMES: Theme[] = [
  { id: 'blue', label: 'Blue', logo: '/src/assets/logos/logo-12.png', accent: '#0b63ff' },
  { id: 'blu_yellow', label: 'Blue/Yellow', logo: '/src/assets/logos/logo-12.png', accent: '#ffc300' },
  // add other logo variants (you uploaded) - ensure files exist
  { id: 'v5', label: 'Variant 5', logo: '/src/assets/logos/logo-5.png', accent: '#ff8a00' },
  { id: 'v6', label: 'Variant 6', logo: '/src/assets/logos/logo-6.png', accent: '#ff6b6b' }
];

const App: React.FC = () => {
  const [activeHub, setActiveHub] = useState<HubType>(HubType.DASHBOARD);
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('hub24-theme');
    return saved !== null ? saved === 'dark' : true;
  });

  const [themeId, setThemeId] = useState(() => {
    return localStorage.getItem('hub24-accent') || 'blue';
  });

  const currentTheme = DEFAULT_THEMES.find(t => t.id === themeId) || DEFAULT_THEMES[0];

  const notifications: Notification[] = [
    { id: '1', title: 'Payment Wallet Sync', message: 'Online wallet successfully linked to PayPal.', type: 'success', time: '1m ago', read: false },
    { id: '2', title: 'Health OS Update', message: 'New pharmacy inventory report generated.', type: 'info', time: '20m ago', read: false }
  ];

  // Ensure ad script is present and persist theme to root attributes
  useEffect(() => {
    ensureAdsScriptPresent();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', themeId);
    localStorage.setItem('hub24-accent', themeId);
  }, [themeId]);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('hub24-theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  const handleSelectTheme = (id: string) => {
    setThemeId(id);
  };

  const renderHubContent = () => {
    if (!isLoggedIn && activeHub !== HubType.PROFILE) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-12">
          <div className="relative">
            <div className="w-32 h-32 bg-indigo-600 rounded-[3rem] flex items-center justify-center shadow-2xl">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-6xl font-black text-white tracking-tighter italic uppercase">System Lock</h2>
            <p className="text-slate-500 max-w-md font-medium mx-auto">Identity verification required to synchronize your personal node on <span className="text-indigo-500">eldoctooor.ae</span>.</p>
          </div>
          <button onClick={() => setActiveHub(HubType.PROFILE)} className="px-16 py-6 bg-indigo-600 text-white font-black rounded-3xl">Access Ecosystem</button>
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
        <ProfileView onLogin={() => setIsLoggedIn(true)} isLoggedIn={isLoggedIn} role={role} onToggleRole={() => setRole(role === UserRole.USER ? UserRole.OWNER : UserRole.USER)} />
      );
      default: return <Dashboard onSelectHub={setActiveHub} role={role} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar activeHub={activeHub} onSelectHub={setActiveHub} isDarkMode={isDarkMode} />

      <div className="flex-1 flex flex-col">
        <TopBar
          logoPath={currentTheme.logo}
          isDark={isDarkMode}
          onToggleDark={toggleTheme}
          currentThemeId={themeId}
          themes={DEFAULT_THEMES}
          onSelectTheme={handleSelectTheme}
          onProfileClick={() => setActiveHub(HubType.PROFILE)}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="container">
            <AdSlot id="global-header-sync" adSlot="8090293603" className="ad-wrapper" />
            {renderHubContent()}
            <AdSlot id="global-footer-sync" adSlot="2323735685" className="ad-wrapper" />
          </div>
        </main>

        <Footer />
      </div>

      <button
        onClick={() => setIsChatOpen(true)}
        title="AI Assistant (Cmd+K)"
        style={{ position: 'fixed', right: 24, bottom: 24, width: 68, height: 68, borderRadius: 28, background: 'var(--accent)', color: '#fff', zIndex: 40 }}
      >
        AI
      </button>

      {isChatOpen && <AIChatOverlay onClose={() => setIsChatOpen(false)} isDarkMode={isDarkMode} />}
    </div>
  );
};

export default App;