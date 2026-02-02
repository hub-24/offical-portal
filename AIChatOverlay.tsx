
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { streamGemini } from '../services/geminiService';

interface AIChatOverlayProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

const AIChatOverlay: React.FC<AIChatOverlayProps> = ({ onClose, isDarkMode = true }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your HUB-24 intelligence assistant. How can I help you across our Knowledge, Earning, Business, or Impact ecosystems today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    let modelResponse = '';
    const tempMessages = [...messages, userMsg];
    
    try {
      const gen = streamGemini(input);
      for await (const chunk of gen) {
        if (chunk) {
          modelResponse += chunk;
          setMessages([...tempMessages, { role: 'model', text: modelResponse }]);
        }
      }
    } catch (e) {
      setMessages([...tempMessages, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-2xl'} border rounded-3xl flex flex-col max-h-[80vh] overflow-hidden`}>
        <header className={`p-4 border-b ${isDarkMode ? 'border-slate-800 bg-slate-800/50' : 'border-slate-200 bg-slate-50'} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>HUB-24 Assistant</h3>
              <p className="text-xs text-emerald-500 font-medium">Online • Neural Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-[9px] font-black text-slate-400 border border-slate-400/20 px-2 py-0.5 rounded uppercase">ESC to Close</span>
            <button 
              onClick={onClose}
              className={`p-2 ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-600'} rounded-full transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg' 
                  : isDarkMode 
                    ? 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                    : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
              }`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} p-4 rounded-2xl rounded-tl-none`}>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className={`p-4 border-t ${isDarkMode ? 'border-slate-800 bg-slate-800/20' : 'border-slate-200 bg-slate-50'}`}>
          <div className="relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about the ecosystem... (Cmd+K to focus)"
              className={`w-full ${isDarkMode ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-300'} border rounded-2xl pl-4 pr-12 py-3 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${!isDarkMode ? 'text-slate-900' : ''}`}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1.5 p-1.5 text-indigo-500 hover:text-indigo-400 disabled:opacity-30 transition-colors"
            >
              <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AIChatOverlay;
