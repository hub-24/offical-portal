
import React, { useState } from 'react';
import { UserRole } from '../types';

interface ProfileViewProps {
  onLogin: () => void;
  isLoggedIn: boolean;
  role: UserRole;
  onToggleRole: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogin, isLoggedIn, role, onToggleRole }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-20 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
         <div className="text-center space-y-4">
            <h2 className="text-5xl font-black text-white tracking-tighter">Sync HUB-24</h2>
            <p className="text-slate-400 font-medium tracking-tight">Access the unified ecosystem.</p>
         </div>
         
         <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 opacity-5 blur-3xl"></div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">E-mail Address</label>
               <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@hub-24.os"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" 
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2">Node Key</label>
               <input 
                type="password" 
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium" 
               />
            </div>
            <button 
              onClick={onLogin}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 transition-all text-xs uppercase tracking-[0.3em]"
            >
              Initialize Sync
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white mb-2">Account Hub</h2>
          <p className="text-slate-400 font-medium tracking-tight">Manage your identity and wallet.</p>
        </div>
        <button 
          onClick={onToggleRole}
          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
            role === UserRole.OWNER ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          {role === UserRole.OWNER ? 'Admin Access: ACTIVE' : 'Switch to Owner Mode'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600 opacity-5 blur-3xl"></div>
             <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] mx-auto flex items-center justify-center text-4xl font-black text-white mb-8 shadow-2xl relative z-10 border-4 border-slate-800">
               JD
             </div>
             <h3 className="text-3xl font-black text-white mb-2">Jane Doe</h3>
             <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10">Ecosystem Node • Level 42</p>
             <div className="grid grid-cols-1 gap-4">
                <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center">
                   <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Wallet Balance</p>
                   <p className="text-3xl font-black text-emerald-500">$14,240.00</p>
                </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 space-y-10 shadow-2xl">
           <div className="border-b border-slate-800 pb-8">
              <h4 className="text-2xl font-black mb-1">Node Synchronization</h4>
              <p className="text-sm text-slate-500 font-medium">Configure how your data flows across HUB-24 OS.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Sync Identifier</label>
                 <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-slate-300 font-mono text-sm border-dashed">
                    jane.doe@hub-24.os
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Ecosystem Status</label>
                 <div className="bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-emerald-500 font-black text-sm uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Synchronized
                 </div>
              </div>
           </div>

           <div className="pt-8 flex flex-col md:flex-row gap-4">
              <button className="flex-1 py-4 bg-slate-800 border border-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-750 transition-all">Download Audit Log</button>
              <button className="flex-1 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/10 transition-all">De-initialize Profile</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
