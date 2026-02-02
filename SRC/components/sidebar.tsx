import React from 'react';
import { HubType } from '../types';

interface Props {
  activeHub: HubType;
  onSelectHub: (h: HubType) => void;
  isDarkMode: boolean;
}

const Sidebar: React.FC<Props> = () => {
  return (
    <aside className="w-20 p-4 hidden md:flex flex-col gap-4 bg-transparent">
      <div className="text-xs font-black uppercase">HUB-24</div>
    </aside>
  );
};

export default Sidebar;
