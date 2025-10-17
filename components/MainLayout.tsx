
import React from 'react';
import BottomNav from './BottomNav';
import { Page } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, currentPage, onNavigate }) => {
  return (
    <div className="w-full min-h-screen max-w-md mx-auto flex flex-col bg-[#1a1633]">
      <header className="p-4 text-center">
         <h1 className="text-2xl font-bold tracking-wider" style={{ textShadow: '0 0 10px rgba(173, 216, 230, 0.5)' }}>
            Self Reunion
          </h1>
      </header>
      <main className="flex-grow p-4 overflow-y-auto">
        {children}
      </main>
      <BottomNav activePage={currentPage} onNavigate={onNavigate} />
    </div>
  );
};

export default MainLayout;
