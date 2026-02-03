
import React, { useState } from 'react';
import { Notification } from '../types';

interface TopBarProps {
  notifications: Notification[];
  onProfileClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ notifications, onProfileClick, isDarkMode, onToggleTheme }) => {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className={`h-20 border-b ${isDarkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-white/50'} backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-30 transition-colors`}>
      <div className="flex items-center gap-6">
        <div className={`hidden md:flex ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'} rounded-full px-4 py-2 border items-center gap-3`}>
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} tracking-tight uppercase`}>Ecosystem Load: 14%</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <span className="px-2 py-0.5 border border-slate-400/20 rounded">Alt+H: Home</span>
           <span className="px-2 py-0.5 border border-slate-400/20 rounded">Cmd+K: Chat</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button 
          onClick={onToggleTheme}
          className={`p-3 ${isDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-amber-400' : 'bg-slate-100 hover:bg-slate-200 text-indigo-600'} rounded-2xl transition-all border ${isDarkMode ? 'border-slate-800' : 'border-slate-200 shadow-sm'}`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          )}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className={`p-3 ${isDarkMode ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'} rounded-2xl transition-all relative border ${isDarkMode ? 'border-slate-800' : 'border-slate-200 shadow-sm'}`}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notifications.some(n => !n.read) && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-slate-900 rounded-full"></span>
            )}
          </button>

          {showNotifs && (
            <div className={`absolute right-0 mt-4 w-80 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} rounded-3xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 border`}>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-4 px-2">Notifications</h4>
              <div className="space-y-2">
                {notifications.map(n => (
                  <div key={n.id} className={`p-3 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'} rounded-2xl border hover:border-indigo-500 transition-all cursor-pointer`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-bold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{n.title}</span>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onProfileClick}
          className={`flex items-center gap-3 p-1.5 pr-4 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'} hover:opacity-90 border rounded-2xl transition-all group`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-white group-hover:scale-105 transition-transform">
            JD
          </div>
          <div className="text-left hidden sm:block">
            <p className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} leading-none mb-1`}>Jane Doe</p>
            <p className="text-[10px] font-bold text-slate-500 leading-none uppercase">Lvl 42 Citizen</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
