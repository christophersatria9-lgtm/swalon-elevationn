import { useState, useCallback, useEffect } from 'react';
import { NavTab, TPSNode, FleetVehicle, LiveAlert } from './types';
import { 
  INITIAL_TPS_NODES, 
  INITIAL_FLEET, 
  INITIAL_FACILITIES, 
  INITIAL_ALERTS 
} from './data/mockData';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DispatchModal } from './components/DispatchModal';
import { NodeDetailModal } from './components/NodeDetailModal';
import { ParameterModal } from './components/ParameterModal';
import { DriverPhoneModal } from './components/DriverPhoneModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ProfileModal, OperatorProfile } from './components/ProfileModal';

import { BerandaView } from './views/BerandaView';
import { PrediksiView } from './views/PrediksiView';
import { PrioritasView } from './views/PrioritasView';
import { OptimasiRuteView } from './views/OptimasiRuteView';
import { PembelajaranView } from './views/PembelajaranView';
import { JaringanView } from './views/JaringanView';
import { ArmadaView } from './views/ArmadaView';
import { FasilitasView } from './views/FasilitasView';
import { LaporanView } from './views/LaporanView';
import { PengaturanView } from './views/PengaturanView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('beranda');

  // App Data States
  const [nodes, setNodes] = useState<TPSNode[]>(INITIAL_TPS_NODES);
  const [fleet, setFleet] = useState<FleetVehicle[]>(INITIAL_FLEET);
  const [alerts, setAlerts] = useState<LiveAlert[]>(INITIAL_ALERTS);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);

  // Mobile and Profile States
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [operatorProfile, setOperatorProfile] = useState<OperatorProfile>({
    name: 'Christopher Satria',
    email: 'christophersatria9@gmail.com',
    role: 'Pengelola Operasional SWALON Kota Malang',
    employeeId: 'SWL-MLG-8809',
    shift: 'Shift Pagi (06:00 - 14:00 WIB)',
    zone: 'Sektor Pusat & Timur (Klojen, Blimbing, Kedungkandang)',
    phone: '+62 812-3456-7890',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPfi-SyjkkqXL-DBmqI2k-vYOXMOTAjbUIWJET6abtBUrDNLTn6GPtUp8rBbPgHvRDW3xQ1n1Fg1Pz4X2g5AYBCn27d5yjs6GK5_GZ8yLRDu_NiOB7Hivm4xlQp2AC3rEEKlNSXxcS02rRvogLWb_EIrOZBJ5RBf59-Kg62KDg2EbzuCbqS4Y6GN7isSkLK0m3eLFNa6Sp1FAQvgXRNb94muLdSiG2MxUZnNt9BRCCKJrozG_Cih2kA'
  });

  // Modals States
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [dispatchDetails, setDispatchDetails] = useState({
    truckId: 'Truk MLG-07',
    targetName: 'TPS Pasar Besar',
    eta: '11 Menit',
    destination: 'Fasilitas A (Blimbing)'
  });

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<TPSNode | null>(null);

  const [isParameterModalOpen, setIsParameterModalOpen] = useState(false);
  const [isDriverPhoneOpen, setIsDriverPhoneOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState<{ visible: boolean; title: string; message: string }>({
    visible: false,
    title: '',
    message: ''
  });

  const showToast = useCallback((title: string, message: string) => {
    setToast({ visible: true, title, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  }, []);

  // Keyboard shortcut: ⌘K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('header input') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleOpenDetailModal = (node: TPSNode) => {
    setSelectedNode(node);
    setIsDetailModalOpen(true);
  };

  const handleOpenDispatchModal = (truckId: string, targetName: string, eta: string) => {
    setDispatchDetails({
      truckId,
      targetName,
      eta,
      destination: 'Fasilitas A (Blimbing)'
    });
    setIsDispatchModalOpen(true);
  };

  const handleConfirmDispatch = () => {
    setIsDispatchModalOpen(false);
    showToast(
      'Armada Berhasil Ditugaskan!',
      `${dispatchDetails.truckId} telah menerima instruksi rute jemput ke ${dispatchDetails.targetName} (ETA ${dispatchDetails.eta}).`
    );

    // Update fleet status
    setFleet(prev => prev.map(f => {
      if (f.id === 'MLG-07' || f.plate.includes('8472')) {
        return {
          ...f,
          status: 'Aktif Bergerak',
          targetNodeId: 'tps-pasar-besar',
          etaMinutes: 11
        };
      }
      return f;
    }));
  };

  const handleSimulateComplete = () => {
    showToast(
      'Pengangkutan Selesai!',
      'Armada Truk MLG-07 telah menyelesaikan ritasi ke Fasilitas A. Jembatan timbang merekam tonase 2.32 Ton.'
    );
    // Lower TPS Pasar Besar volume
    setNodes(prev => prev.map(n => {
      if (n.id === 'tps-pasar-besar') {
        return {
          ...n,
          fillPercentage: 35,
          weightTons: 0.8,
          status: 'Normal',
          etaToFull: 'Aman (>6 jam)'
        };
      }
      return n;
    }));
  };

  const handleRefreshData = () => {
    showToast(
      'Data Telemetri Disinkronkan',
      '18 sensor IoT ultrasonik Kota Malang telah memperbarui data ketinggian sampah.'
    );
  };

  const handleAddToPriority = (nodeName: string) => {
    showToast(
      'Dimasukkan ke Antrean Prioritas',
      `${nodeName} berhasil diangkat ke prioritas tingkat 1 oleh operator.`
    );
  };

  const handleSendFieldAlert = () => {
    showToast(
      'Notifikasi Siaga Terkirim',
      'Instruksi siaga darurat ditransmisikan ke seluruh armada zona Malang Tengah.'
    );
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    const lower = query.toLowerCase();
    const foundNode = nodes.find(n => n.name.toLowerCase().includes(lower));
    if (foundNode) {
      setSelectedNode(foundNode);
      setIsDetailModalOpen(true);
    }
  };

  const handleSaveProfile = (updatedProfile: OperatorProfile) => {
    setOperatorProfile(updatedProfile);
    showToast(
      'Profil Diperbarui',
      `Profil ${updatedProfile.name} (${updatedProfile.role}) berhasil disimpan dalam sistem kendali.`
    );
  };

  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface flex flex-col antialiased">
      {/* Responsive Sidebar (Off-canvas on mobile/tablet, Fixed on desktop) */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenDriverPhone={() => setIsDriverPhoneOpen(true)}
        onOpenNotificationCenter={() => setIsNotificationDrawerOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        unreadCount={unreadNotifications}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        operatorName={operatorProfile.name}
        operatorRole={operatorProfile.role.split('(')[0].trim()}
        operatorAvatar={operatorProfile.avatarUrl}
      />

      {/* Main Content Area - Left Padding 0 on mobile/tablet, 64 (256px) on lg screens */}
      <div className="pl-0 lg:pl-64 flex flex-col min-h-screen transition-all duration-300 w-full overflow-x-hidden">
        {/* Fixed Top Header */}
        <Header
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
          unreadCount={unreadNotifications}
          onSearch={handleSearch}
          onRefreshData={handleRefreshData}
          onOpenHelp={() => showToast('Bantuan SWALON', 'Pusat Kendali Logistik Cerdas Malang - Gunakan tab navigasi untuk berpindah antar modul.')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          operatorName={operatorProfile.name}
          operatorRole={operatorProfile.role.split('(')[0].trim()}
          operatorAvatar={operatorProfile.avatarUrl}
        />

        {/* Dynamic View Container with responsive bottom padding for mobile navbar */}
        <main className="w-full pt-16 pb-20 lg:pb-6 bg-surface min-h-[calc(100vh-4rem)] overflow-x-hidden">
          {currentTab === 'beranda' && (
            <BerandaView
              nodes={nodes}
              fleet={fleet}
              alerts={alerts}
              onOpenDetailModal={handleOpenDetailModal}
              onOpenDispatchModal={handleOpenDispatchModal}
              onNavigateTab={setCurrentTab}
              onRefreshData={handleRefreshData}
            />
          )}

          {currentTab === 'prediksi' && (
            <PrediksiView
              nodes={nodes}
              onOpenDetailModal={handleOpenDetailModal}
              onOpenParametersModal={() => setIsParameterModalOpen(true)}
              onAddToPriority={handleAddToPriority}
            />
          )}

          {currentTab === 'prioritas' && (
            <PrioritasView
              nodes={nodes}
              onOpenDetailModal={handleOpenDetailModal}
              onNavigateTab={setCurrentTab}
              onSendFieldAlert={handleSendFieldAlert}
            />
          )}

          {currentTab === 'optimasi-rute' && (
            <OptimasiRuteView
              fleet={fleet}
              onOpenDispatchModal={handleOpenDispatchModal}
              onOpenDriverPhone={() => setIsDriverPhoneOpen(true)}
            />
          )}

          {currentTab === 'pembelajaran' && (
            <PembelajaranView onSaveToast={showToast} />
          )}

          {currentTab === 'jaringan' && (
            <JaringanView
              nodes={nodes}
              onOpenDetailModal={handleOpenDetailModal}
              onDispatchNode={(node) => handleOpenDispatchModal('Truk MLG-07', node.name, '11 Menit')}
            />
          )}

          {currentTab === 'armada' && (
            <ArmadaView
              fleet={fleet}
              onOpenDriverPhone={() => setIsDriverPhoneOpen(true)}
              onDispatchFleet={(fleetId) => handleOpenDispatchModal(fleetId, 'TPS Pasar Besar', '11 Menit')}
            />
          )}

          {currentTab === 'fasilitas' && (
            <FasilitasView facilities={INITIAL_FACILITIES} />
          )}

          {currentTab === 'laporan' && (
            <LaporanView />
          )}

          {currentTab === 'pengaturan' && (
            <PengaturanView onSaveToast={showToast} />
          )}
        </main>

        {/* Mobile Quick Bottom Navigation Bar for Smart Handheld Experience */}
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md border-t border-surface-container/80 z-30 flex lg:hidden items-center justify-around px-2 shadow-lg">
          <button
            onClick={() => setCurrentTab('beranda')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
              currentTab === 'beranda' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl">grid_view</span>
            <span className="text-[10px] mt-0.5">Beranda</span>
          </button>

          <button
            onClick={() => setCurrentTab('prediksi')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
              currentTab === 'prediksi' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl">trending_up</span>
            <span className="text-[10px] mt-0.5">Prediksi</span>
          </button>

          <button
            onClick={() => setCurrentTab('prioritas')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
              currentTab === 'prioritas' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl">error</span>
            <span className="text-[10px] mt-0.5">Prioritas</span>
          </button>

          <button
            onClick={() => setCurrentTab('optimasi-rute')}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-colors ${
              currentTab === 'optimasi-rute' ? 'text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-xl">near_me</span>
            <span className="text-[10px] mt-0.5">Optimasi</span>
          </button>

          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
            <span className="text-[10px] mt-0.5">Menu</span>
          </button>
        </nav>
      </div>

      {/* Global Interactive Modals */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onSaveProfile={handleSaveProfile}
      />

      <DispatchModal
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        truckId={dispatchDetails.truckId}
        targetName={dispatchDetails.targetName}
        eta={dispatchDetails.eta}
        destination={dispatchDetails.destination}
        onConfirm={handleConfirmDispatch}
      />

      <NodeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        node={selectedNode}
        onDispatch={(node) => handleOpenDispatchModal('Truk MLG-07', node.name, node.etaToFull)}
      />

      <ParameterModal
        isOpen={isParameterModalOpen}
        onClose={() => setIsParameterModalOpen(false)}
      />

      <DriverPhoneModal
        isOpen={isDriverPhoneOpen}
        onClose={() => setIsDriverPhoneOpen(false)}
        activeTruck={dispatchDetails.truckId}
        driverName="Bambang Mulyono"
        targetNode={dispatchDetails.targetName}
        eta={dispatchDetails.eta}
        onSimulateComplete={handleSimulateComplete}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        alerts={alerts}
        onSelectAlert={(alt) => {
          const match = nodes.find(n => n.name === alt.nodeName);
          if (match) handleOpenDetailModal(match);
        }}
        onClearAll={() => {
          setUnreadNotifications(0);
          setAlerts([]);
          showToast('Pusat Notifikasi', 'Seluruh notifikasi telah ditandai dibaca.');
        }}
      />

      {/* Interactive Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-20 lg:bottom-6 right-4 sm:right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5 duration-300 max-w-[90vw] sm:max-w-md">
          <span className="material-symbols-outlined text-secondary-fixed text-2xl shrink-0">check_circle</span>
          <div className="flex flex-col text-left min-w-0">
            <span className="font-title-sm text-xs sm:text-sm font-bold truncate">{toast.title}</span>
            <span className="font-body-sm text-[11px] sm:text-xs text-inverse-on-surface/85 line-clamp-2">{toast.message}</span>
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, visible: false }))}
            className="ml-auto text-slate-400 hover:text-white p-1 shrink-0"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
