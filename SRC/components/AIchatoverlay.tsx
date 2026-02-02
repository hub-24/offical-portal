import React from 'react';

const AIChatOverlay: React.FC<{ onClose: () => void; isDarkMode: boolean }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-8 pointer-events-auto">
      <div className="w-96 h-96 bg-slate-900/90 rounded p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <strong>AI Assistant</strong>
          <button onClick={onClose} className="px-2">Close</button>
        </div>
        <div className="text-sm text-slate-300">Placeholder chat UI</div>
      </div>
    </div>
  );
};

export default AIChatOverlay;
