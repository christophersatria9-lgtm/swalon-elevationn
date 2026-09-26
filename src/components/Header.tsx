import React, { useState } from 'react';
import { SwalonLogo } from './SwalonLogo';

interface HeaderProps {
  onOpenNotifications: () => void;
  unreadCount: number;
  onSearch: (query: string) => void;
  onRefreshData: () => void;
  onOpenHelp: () => void;
  onToggleMobileSidebar: () => void;
  onOpenProfile: () => void;
  operatorName?: string;
  operatorRole?: string;
  operatorAvatar?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  unreadCount,
  onSearch,
  onRefreshData,
  onOpenHelp,
  onToggleMobileSidebar,
  onOpenProfile,
  operatorName = 'Christopher Satria',
  operatorRole = 'Pengelola Operasional',
  operatorAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPfi-SyjkkqXL-DBmqI2k-vYOXMOTAjbUIWJET6abtBUrDNLTn6GPtUp8rBbPgHvRDW3xQ1n1Fg1Pz4X2g5AYBCn27d5yjs6GK5_GZ8yLRDu_NiOB7Hivm4xlQp2AC3rEEKlNSXxcS02rRvogLWb_EIrOZBJ5RBf59-Kg62KDg2EbzuCbqS4Y6GN7isSkLK0m3eLFNa6Sp1FAQvgXRNb94muLdSiG2MxUZnNt9BRCCKJrozG_Cih2kA'
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch(val);
  };

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-30 flex items-center justify-between px-3 sm:px-4 lg:px-gutter-lg border-b border-surface-container/60 transition-all duration-300">
      {/* Left: Hamburger (mobile/tablet), Logo & City Badge & Search */}
      <div className="flex items-center gap-2 sm:gap-space-md">
        {/* Mobile/Tablet Menu Button */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container-low transition-colors"
          title="Buka Navigasi"
          aria-label="Buka Navigasi"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Mobile Brand Mark */}
        <div className="lg:hidden flex items-center">
          <SwalonLogo size="sm" showText={false} />
        </div>

        {/* City Badge */}
        <div className="flex items-center gap-1 sm:gap-space-xs">
          <span className="font-label-lg text-label-lg px-2 sm:px-space-sm py-1 rounded bg-surface-container-high text-primary font-bold tracking-tight whitespace-nowrap text-xs sm:text-sm">
            KOTA MALANG
          </span>
          <span className="hidden md:inline-block font-label-md text-label-md px-space-sm py-1 rounded bg-surface-container-low text-on-surface-variant font-medium whitespace-nowrap">
            PROTOTIPE — DATA SIMULASI
          </span>
        </div>

        {/* Search Bar on Desktop / Tablet */}
        <div className="hidden md:flex relative items-center ml-1 sm:ml-space-sm">
          <span className="material-symbols-outlined absolute left-3 text-outline text-lg">
            search
          </span>
          <input
            className="w-48 lg:w-80 h-9 lg:h-10 pl-9 pr-10 rounded-xl bg-surface-container-low font-body-sm text-xs sm:text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary/30 transition-all"
            placeholder="Cari titik, armada..."
            type="text"
            value={searchValue}
            onChange={handleInputChange}
          />
          <span className="hidden lg:inline-block absolute right-2 font-label-md text-label-md px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium pointer-events-none">
            ⌘K
          </span>
        </div>
      </div>

      {/* Right Controls: Sync status, Notifications, Help, Profile */}
      <div className="flex items-center gap-1.5 sm:gap-space-md lg:gap-space-lg">
        {/* Mobile Search Toggle */}
        <button
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          className="md:hidden p-2 rounded-xl hover:bg-surface-container-low text-on-surface-variant transition-colors"
          title="Cari"
        >
          <span className="material-symbols-outlined text-xl">search</span>
        </button>

        {/* Sync Status Badge (Hidden on very small screens) */}
        <button 
          onClick={onRefreshData}
          className="hidden sm:flex group items-center gap-space-xs hover:bg-surface-container-low px-2 py-1 rounded-lg transition-colors"
          title="Klik untuk sinkronisasi telemetri instan"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="hidden lg:inline-block font-body-sm text-xs text-on-surface-variant group-hover:text-primary transition-colors">
            Data diperbarui 2 menit lalu
          </span>
          <span className="material-symbols-outlined text-sm text-outline group-hover:rotate-180 transition-transform duration-500">
            sync
          </span>
        </button>

        {/* Notifications & Help */}
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
            title="Pusat Notifikasi"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-on-error font-label-md text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={onOpenHelp}
            className="hidden sm:flex p-2 rounded-xl hover:bg-surface-container-low text-on-surface-variant hover:text-on-surface transition-colors"
            title="Bantuan & Petunjuk Penggunaan"
          >
            <span className="material-symbols-outlined text-xl">help</span>
          </button>
        </div>

        {/* Clickable Profile Card / Button */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-2 sm:pl-space-sm border-l border-surface-container hover:bg-surface-container-low/70 py-1 px-1.5 rounded-xl transition-all group text-left cursor-pointer"
          title="Klik untuk kelola profil operator & peran"
        >
          <div className="relative">
            <img
              alt="Profile Operator"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/30 group-hover:ring-primary transition-all"
              src={operatorAvatar}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-white"></span>
          </div>

          <div className="hidden xl:flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="font-title-sm text-xs font-bold text-on-surface group-hover:text-primary transition-colors">
                {operatorName}
              </span>
              <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary transition-colors">
                expand_more
              </span>
            </div>
            <span className="font-label-md text-[10px] text-on-surface-variant leading-none">
              {operatorRole}
            </span>
          </div>
        </button>
      </div>

      {/* Expandable Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="absolute top-16 left-0 right-0 p-3 bg-surface-container-lowest border-b border-surface-container shadow-md md:hidden flex items-center gap-2 animate-in slide-in-from-top-2 duration-200">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-2 text-outline text-lg">search</span>
            <input
              type="text"
              placeholder="Cari titik TPS, armada, fasilitas..."
              value={searchValue}
              onChange={handleInputChange}
              className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
              autoFocus
            />
          </div>
          <button
            onClick={() => setIsMobileSearchOpen(false)}
            className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container text-xs font-semibold"
          >
            Tutup
          </button>
        </div>
      )}
    </header>
  );
};
