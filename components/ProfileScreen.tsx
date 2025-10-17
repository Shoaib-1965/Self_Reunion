
import React from 'react';

interface ProfileScreenProps {
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  return (
    <div className="flex flex-col items-center h-full text-center pt-8">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-4 flex items-center justify-center shadow-lg">
        <span className="text-4xl font-bold">U</span>
      </div>
      <h2 className="text-2xl font-semibold">user@example.com</h2>
      <p className="text-gray-400">Member since {new Date().getFullYear()}</p>
      
      <div className="mt-12 w-full max-w-xs space-y-4">
        <button className="w-full py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          Account Settings
        </button>
        <button className="w-full py-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
          Help & Support
        </button>
        <button 
          onClick={onLogout}
          className="w-full py-3 bg-red-500/50 text-red-200 rounded-lg hover:bg-red-500/70 transition-colors mt-8"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
