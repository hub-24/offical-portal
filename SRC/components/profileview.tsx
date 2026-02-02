import React from 'react';
import { UserRole } from '../types';

const ProfileView: React.FC<{ onLogin: ()=>void; isLoggedIn: boolean; role: UserRole; onToggleRole: ()=>void }> = ({ onLogin, isLoggedIn, role, onToggleRole }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Profile</h2>
      <p>Logged in: {isLoggedIn ? 'yes' : 'no'}</p>
      <p>Role: {role}</p>
      <div className="mt-4 space-x-2">
        <button onClick={onLogin} className="px-3 py-1 bg-indigo-600 text-white rounded">Login</button>
        <button onClick={onToggleRole} className="px-3 py-1 border rounded">Toggle Role</button>
      </div>
    </div>
  );
};

export default ProfileView;
