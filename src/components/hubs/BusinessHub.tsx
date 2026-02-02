import React, { useState } from 'react';
import AdSlot from '../AdSlot';

const BusinessHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'strategy'>('sql');
  const [query, setQuery] = useState(`-- Enterprise Database Interface
SELECT 
  Node_ID,
  Sync_State,
  Uptime_Metric
FROM EcosystemNodes
WHERE Status = 'Active';`);
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const [executing, setExecuting] = useState(false);

  const runQuery = () => {
    setExecuting(true);
    setTimeout(() => {
      setQueryResult([
        { id: 'NODE-SYNC-24', type: 'Knowledge', sync: '99.9%', uptime: '1,424h' },
        { id: 'NODE-HEALTH-01', type: 'Healthcare', sync: '100%', uptime: '840h' },
        { id: 'NODE-MARKET-99', type: 'Community', sync: '94.2%', uptime: '12d' },
        { id: 'NODE-WALLET-PRIME', type: 'Earning', sync: '100%', uptime: 'LIVE' },
      ]);
      setExecuting(false);
    }, 800);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-white mb-2 text-violet-500 tracking-tighter italic">Venture OS</h2>
          <p className="text-slate-400 font-medium tracking-tight">Enterprise Architecture & SQL Server Unified Database Management.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-xl">
          <button onClick={() => setActiveTab('sql')} className={`px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'sql' ? 'bg-violet-600 text-white' : 'text-slate-500'}`}>SQL Server</button>
          <button onClick={() => setActiveTab('strategy')} className={`px-8 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'strategy' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Strategy</button>
        </div>
      </header>

      <AdSlot id="business-top-native" type="native" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
           {activeTab === 'sql' && (
             <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4">
                <div className="p-10 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-violet-600/10 rounded-2xl flex items-center justify-center font-black text-violet-500 text-xl border border-violet-500/20">SQL</div>
                      <div>
                         <h3 className="font-black text-white uppercase tracking-tight leading-none">Database Query Console</h3>
                         <p className="text-[10px] text-emerald-500 font-black tracking-widest uppercase mt-1">CONNECTED: MSSQL_SERVER_NODE_24</p>
                      </div>
                   </div>
                   <div className="flex gap-3">
                      <button className="bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl text-slate-500">History</button>
                      <button className="bg-slate-900 border border-slate-800 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl text-slate-500">Tables</button>
                   </div>
                </div>
                <div className="p-10 space-y-8">
                   <textarea 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    spellCheck={false}
                    className="w-full h-56 bg-slate-950 border border-slate-800 rounded-[2rem] p-8 text-indigo-300 font-mono text-sm focus:ring-4 focus:ring-violet-600/10 focus:border-violet-500 transition-all outline-none resize-none shadow-inner"
                   />
                   <div className="flex justify-between items-center">
                      <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Execute raw SQL commands against the venture DB</p>
                      <button 
                        onClick={runQuery} 
                        disabled={executing}
                        className="bg-violet-600 hover:bg-violet-500 text-white font-black px-14 py-5 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-violet-600/20 disabled:opacity-50"
                      >
                        {executing ? 'Executing Transact-SQL...' : 'Execute Query'}
                      </button>
                   </div>

                   {queryResult.length > 0 && (
                     <div className="mt-10 border border-slate-800 rounded-[2.5rem] overflow-hidden animate-in fade-in slide-in-from-top-4 shadow-2xl bg-slate-950">
                        <table className="w-full text-left">
                          <thead className="bg-slate-900 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800">
                            <tr>
                              <th className="px-8 py-5">Node_ID</th>
                              <th className="px-8 py-5">System_Modality</th>
                              <th className="px-8 py-5">Sync_Factor</th>
                              <th className="px-8 py-5">Uptime</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
                             {queryResult.map((row, idx) => (
                               <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                                  <td className="px-8 py-5 text-indigo-400 font-bold">{row.id}</td>
                                  <td className="px-8 py-5 text-slate-200">{row.type}</td>
                                  <td className="px-8 py-5 text-emerald-500 font-black">{row.sync}</td>
                                  <td className="px-8 py-5 text-slate-500">{row.uptime}</td>
                               </tr>
                             ))}
                          </tbody>
                        </table>
                     </div>
                   )}
                </div>
             </div>
           )}
           <AdSlot id="business-mid-native" type="native" />
        </div>

        <div className="lg:col-span-4 space-y-8">
           <AdSlot id="business-side-1" type="square" />
           <AdSlot id="business-side-2" type="square" />
           <AdSlot id="business-side-3" type="square" />
        </div>
      </div>
      <AdSlot id="business-footer" type="banner" />
    </div>
  );
};

export default BusinessHub;