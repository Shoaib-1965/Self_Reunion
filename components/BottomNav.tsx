
import React from 'react';
import { Page } from '../types';
import { CameraIcon, GalleryIcon, UserIcon } from './Icons';

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'text-purple-400' : 'text-gray-400';
  const glowStyle = isActive ? { filter: 'drop-shadow(0 0 5px #c084fc)' } : {};

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${activeClass} hover:text-purple-300`}
    >
      <div style={glowStyle}>{icon}</div>
      <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  return (
    <nav className="flex-shrink-0 w-full bg-black/30 backdrop-blur-lg border-t border-white/20">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        <NavItem
          icon={<CameraIcon className="w-7 h-7" />}
          label="Create"
          isActive={activePage === Page.UPLOAD || activePage === Page.PROCESSING || activePage === Page.RESULT}
          onClick={() => onNavigate(Page.UPLOAD)}
        />
        <NavItem
          icon={<GalleryIcon className="w-7 h-7" />}
          label="Gallery"
          isActive={activePage === Page.GALLERY}
          onClick={() => onNavigate(Page.GALLERY)}
        />
        <NavItem
          icon={<UserIcon className="w-7 h-7" />}
          label="Profile"
          isActive={activePage === Page.PROFILE}
          onClick={() => onNavigate(Page.PROFILE)}
        />
      </div>
    </nav>
  );
};

export default BottomNav;
