
import React from 'react';
import { HubType } from '../types';

interface SidebarProps {
  activeHub: HubType;
  onSelectHub: (hub: HubType) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeHub, onSelectHub, isDarkMode }) => {
  const sections = [
    {
      title: 'Main',
      items: [
        { id: HubType.DASHBOARD, label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: HubType.KNOWLEDGE, label: 'Knowledge', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253' },
        { id: HubType.EARNING, label: 'Earning', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2' },
        { id: HubType.BUSINESS, label: 'Business', icon: 'M21 13.255A23.931 23.931 0 0112 15' },
        { id: HubType.IMPACT, label: 'Impact', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364' },
      ]
    },
    {
      title: 'Systems',
      items: [
        { id: HubType.HEALTHCARE, label: 'Health OS', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: HubType.COMMUNITY, label: 'Community', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: HubType.FAMILY, label: 'Family Play', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: HubType.CAREERS, label: 'Jobs', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
      ]
    }
  ];

  return (
    <aside className={`w-20 lg:w-64 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r flex flex-col transition-all overflow-y-auto custom-scrollbar h-screen sticky top-0 z-40 shadow-sm`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
          <span className="font-black text-white text-xl">24</span>
        </div>
        <span className={`hidden lg:block font-black text-2xl tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>HUB-24</span>
      </div>

      <div className="flex-1 mt-4 px-3 space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="hidden lg:block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-3 mb-2">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelectHub(item.id)}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                      activeHub === item.id
                        ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30'
                        : isDarkMode 
                          ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                    <span className="hidden lg:block font-bold text-sm">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800/20 hidden lg:block">
        <div className={`${isDarkMode ? 'bg-slate-950 border-slate-800/50' : 'bg-slate-50 border-slate-200'} rounded-2xl p-4 border`}>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">Network State</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Synchronized</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
