import React from 'react';
import { HubType, UserRole } from '../../types';

const Dashboard: React.FC<{ onSelectHub?: (h: HubType)=>void; role?: UserRole; isDarkMode?: boolean }> = () => {
  return <section><h1 className="text-2xl font-bold">Dashboard</h1></section>;
};

export default Dashboard;
