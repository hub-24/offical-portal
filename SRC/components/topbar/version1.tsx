import React from 'react';
import { Notification } from '../types';

interface Props {
  notifications: Notification[];
  onProfileClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const TopBar: React.FC<Props> = ({ onProfileClick, onToggleTheme }) => {
  return (
    <header className="w-full p-4 flex justify-between items-center">
      <div className="font-bold">HUB-24</div>
      <div className="flex items-center gap-3">
        <button onClick={onToggleTheme} className="px-3 py-1 rounded bg-slate-700">Theme</button>
        <button onClick={onProfileClick} className="px-3 py-1 rounded bg-indigo-600 text-white">Profile</button>
      </div>
    </header>
  );
};

export default TopBar;
