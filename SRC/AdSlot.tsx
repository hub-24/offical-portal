
import React from 'react';

interface AdSlotProps {
  id: string;
  type?: 'banner' | 'square' | 'vertical' | 'native';
  className?: string;
}

const AdSlot: React.FC<AdSlotProps> = ({ id, type = 'banner', className = "" }) => {
  const styles = {
    banner: "h-[90px] w-full",
    square: "h-[250px] w-full",
    vertical: "h-[600px] w-full",
    native: "h-auto w-full min-h-[150px]"
  };

  return (
    <div className={`ad-container bg-slate-900/10 dark:bg-slate-900/60 border border-slate-300/40 dark:border-slate-800/40 rounded-2xl overflow-hidden flex flex-col items-center justify-center group relative transition-all hover:border-indigo-500/20 ${styles[type]} ${className}`}>
      <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-slate-100/80 dark:bg-slate-800/80 text-[7px] font-black text-slate-500 uppercase tracking-widest rounded border border-slate-300 dark:border-slate-700 backdrop-blur-sm z-10">
        AD SPACE
      </div>
      
      {/* PLACE YOUR ADSENSE CODE HERE */}
      <div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-800 font-mono text-[9px] uppercase tracking-tighter select-none">
        <svg className="w-6 h-6 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>ADSENSE_ID_{id}</span>
      </div>
      
      {/* 
        INSTRUCTION: To enable real ads, uncomment the following block and replace CA-PUB-ID.
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-YOUR_ADSENSE_ID"
             data-ad-slot={id}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      */}
    </div>
  );
};

export default AdSlot;
