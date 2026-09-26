import React from 'react';
import { NavTab } from '../types';
import { SwalonLogo } from './SwalonLogo';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenDriverPhone: () => void;
  onOpenNotificationCenter: () => void;
  onOpenProfile: () => void;
  unreadCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  operatorName?: string;
  operatorRole?: string;
  operatorAvatar?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  onOpenDriverPhone,
  onOpenNotificationCenter,
  onOpenProfile,
  unreadCount,
  isOpenMobile,
  onCloseMobile,
  operatorName = 'Christopher Satria',
  operatorRole = 'Pengelola Operasional',
  operatorAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPfi-SyjkkqXL-DBmqI2k-vYOXMOTAjbUIWJET6abtBUrDNLTn6GPtUp8rBbPgHvRDW3xQ1n1Fg1Pz4X2g5AYBCn27d5yjs6GK5_GZ8yLRDu_NiOB7Hivm4xlQp2AC3rEEKlNSXxcS02rRvogLWb_EIrOZBJ5RBf59-Kg62KDg2EbzuCbqS4Y6GN7isSkLK0m3eLFNa6Sp1FAQvgXRNb94muLdSiG2MxUZnNt9BRCCKJrozG_Cih2kA'
}) => {
  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: 'beranda', label: 'Beranda', icon: 'grid_view' },
    { id: 'prediksi', label: 'Prediksi', icon: 'trending_up' },
    { id: 'prioritas', label: 'Prioritas', icon: 'error' },
    { id: 'optimasi-rute', label: 'Optimasi Rute', icon: 'near_me' },
    { id: 'pembelajaran', label: 'Pembelajaran', icon: 'auto_awesome' },
    { id: 'jaringan', label: 'Jaringan', icon: 'hub' },
    { id: 'armada', label: 'Armada', icon: 'local_shipping' },
    { id: 'fasilitas', label: 'Fasilitas', icon: 'warehouse' },
    { id: 'laporan', label: 'Laporan', icon: 'description' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const handleShortcutClick = (action: () => void) => {
    action();
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile/Tablet Backdrop Overlay */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-inverse-surface/40 backdrop-blur-xs lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 lg:z-40 flex flex-col shadow-xl lg:shadow-[0_1px_8px_rgba(0,0,0,0.04)] justify-between select-none transition-transform duration-300 ease-in-out border-r border-surface-container/60 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="p-space-lg flex items-center justify-between border-b border-surface-container/40">
            <div 
              className="cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleNavClick('beranda')}
            >
              <SwalonLogo size="md" />
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
              title="Tutup Menu"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Operational Navigation */}
          <div className="px-space-md my-space-sm">
            <p className="font-label-md text-label-md text-outline uppercase tracking-wider px-space-sm mb-space-xs font-semibold">
              Navigasi Operasional
            </p>
            <nav className="flex flex-col gap-space-xs">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-space-md px-space-md py-2.5 transition-all text-left rounded-xl w-full ${
                      isActive
                        ? 'bg-primary-container text-on-primary font-title-sm text-title-sm shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                    <span className="font-body-md text-body-md font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Shortcuts */}
          <div className="px-space-md mb-space-md">
            <p className="font-label-md text-label-md text-outline uppercase tracking-wider px-space-sm mb-space-xs font-semibold">
              Pintasan Cepat
            </p>
            <nav className="flex flex-col gap-space-xs">
              <button
                onClick={() => handleShortcutClick(onOpenDriverPhone)}
                className="flex items-center justify-between px-space-md py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors w-full group text-left"
              >
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-lg text-primary group-hover:scale-110 transition-transform">
                    smartphone
                  </span>
                  <span className="font-body-md text-body-md">Simulasi Ponsel Petugas</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" title="Sesi Aktif" />
              </button>

              <button
                onClick={() => handleShortcutClick(onOpenNotificationCenter)}
                className="flex items-center justify-between px-space-md py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors w-full group text-left"
              >
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-lg text-amber-600 group-hover:scale-110 transition-transform">
                    notifications_active
                  </span>
                  <span className="font-body-md text-body-md">Pusat Notifikasi</span>
                </div>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-md text-label-md font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* System Status & Clickable Profile Footer Card */}
        <div 
          onClick={() => {
            onOpenProfile();
            onCloseMobile();
          }}
          className="p-space-md m-space-md rounded-2xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container hover:border-primary/40 hover:bg-surface-container transition-all cursor-pointer group"
          title="Klik untuk membuka profil operator"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="font-label-md text-label-md text-secondary font-bold">Sistem Normal (Kota Malang)</span>
            </div>
            <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors">
              manage_accounts
            </span>
          </div>

          <div className="flex items-center gap-2.5 mt-0.5">
            <img
              src={operatorAvatar}
              alt={operatorName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
            />
            <div className="text-left min-w-0">
              <p className="font-title-sm text-xs font-bold text-on-surface leading-tight truncate group-hover:text-primary transition-colors">
                {operatorName}
              </p>
              <p className="font-label-md text-[10px] text-on-surface-variant truncate">{operatorRole}</p>
            </div>
          </div>

          <div className="mt-space-xs pt-space-xs border-t border-surface-container/60 flex items-center justify-between">
            <span className="inline-block px-space-sm py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-md text-[10px] tracking-wider uppercase font-semibold">
              PROTOTIPE — DATA SIMULASI
            </span>
            <span className="text-[10px] text-primary font-bold group-hover:underline">Detail →</span>
          </div>
        </div>
      </aside>
    </>
  );
};
