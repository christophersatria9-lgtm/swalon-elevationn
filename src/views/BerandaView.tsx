import React, { useState } from 'react';
import { TPSNode, FleetVehicle, LiveAlert, NavTab } from '../types';
import { DECISION_CYCLE_STEPS } from '../data/mockData';

interface BerandaViewProps {
  nodes: TPSNode[];
  fleet: FleetVehicle[];
  alerts: LiveAlert[];
  onOpenDetailModal: (node: TPSNode) => void;
  onOpenDispatchModal: (truckId: string, targetName: string, eta: string) => void;
  onNavigateTab: (tab: NavTab) => void;
  onRefreshData: () => void;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  nodes,
  fleet,
  alerts,
  onOpenDetailModal,
  onOpenDispatchModal,
  onNavigateTab,
  onRefreshData
}) => {
  const [activeCycleStep, setActiveCycleStep] = useState<number>(2); // Step 03 Prioritas
  const [mapLayerFilter, setMapLayerFilter] = useState<'semua' | 'kritis' | 'armada'>('semua');

  const pasarBesarNode = nodes.find(n => n.id === 'tps-pasar-besar') || nodes[0];
  const lowokwaruNode = nodes.find(n => n.id === 'tps-lowokwaru') || nodes[1];
  const sukunNode = nodes.find(n => n.id === 'tps-sukun') || nodes[2];
  const klojenNode = nodes.find(n => n.id === 'tps-klojen') || nodes[3];
  const kedungkandangNode = nodes.find(n => n.id === 'tps-kedungkandang') || nodes[4];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Banner & Control Room Header Section */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-gutter-lg py-4 sm:py-margin-md flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Hero / Header Row with Operational Badges */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-space-md">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 sm:gap-space-sm mb-1 sm:mb-space-xs flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 sm:px-space-sm py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                PROTOTIPE — DATA SIMULASI
              </span>
              <span className="text-outline-variant font-label-md text-label-md hidden sm:inline">|</span>
              <span className="font-label-md text-[11px] sm:text-label-md text-on-surface-variant">
                Siklus Sinkronisasi: 30 Detik
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-display-lg text-on-surface tracking-tight font-bold">
              Pusat Kendali SWALON
            </h1>
            <p className="text-xs sm:text-sm lg:text-body-lg text-on-surface-variant mt-0.5">
              Pantau kondisi jaringan dan tentukan tindakan berikutnya secara presisi.
            </p>
          </div>

          {/* Quick Action Pill Group */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-space-sm pt-1 lg:pt-0">
            <button
              onClick={onRefreshData}
              className="inline-flex items-center gap-1.5 px-3 sm:px-space-md py-2 sm:py-space-sm rounded-xl bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container-low transition-all text-xs sm:text-title-sm border border-surface-container/60 active:scale-95 font-medium"
            >
              <span className="material-symbols-outlined text-base sm:text-lg text-primary">sync</span>
              <span>Perbarui Data</span>
            </button>
            <button
              onClick={() => onOpenDispatchModal('Truk MLG-07', 'TPS Pasar Besar', '11 Menit')}
              className="inline-flex items-center gap-1.5 px-3 sm:px-space-md py-2 sm:py-space-sm rounded-xl bg-primary-container text-on-primary shadow-sm hover:bg-primary transition-all text-xs sm:text-title-sm font-semibold active:scale-95"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">alt_route</span>
              <span>Jalankan Auto-Dispatch</span>
            </button>
          </div>
        </div>

        {/* 1. 5 KARTU INDIKATOR UTAMA (Grid 2 Kolom di handphone, 3 di tab, 5 di desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-space-md">
          {/* Kartu 1: Titik Dipantau */}
          <div 
            onClick={() => onNavigateTab('jaringan')}
            className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/50 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg text-on-surface-variant group-hover:text-primary transition-colors">
                Titik Dipantau
              </span>
              <span className="p-space-xs rounded-lg bg-surface-container text-primary material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                location_on
              </span>
            </div>
            <div className="mt-space-md">
              <div className="font-data-metric text-data-metric text-on-surface font-bold">128</div>
              <div className="mt-space-xs inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-error-container/40 text-on-surface font-label-md text-label-md">
                <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                <span className="font-semibold text-error">6</span> perlu perhatian
              </div>
            </div>
          </div>

          {/* Kartu 2: Armada Aktif */}
          <div 
            onClick={() => onNavigateTab('armada')}
            className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/50 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg text-on-surface-variant group-hover:text-secondary transition-colors">
                Armada Aktif
              </span>
              <span className="p-space-xs rounded-lg bg-surface-container text-secondary material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                local_shipping
              </span>
            </div>
            <div className="mt-space-md">
              <div className="font-data-metric text-data-metric text-on-surface font-bold">
                18 <span className="text-base font-normal text-on-surface-variant">/ 24</span>
              </div>
              <div className="mt-space-xs inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-md text-label-md">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-semibold">75%</span> aktif beroperasi
              </div>
            </div>
          </div>

          {/* Kartu 3: Pengangkutan Hari Ini */}
          <div 
            onClick={() => onNavigateTab('laporan')}
            className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/50 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg text-on-surface-variant group-hover:text-primary transition-colors">
                Pengangkutan Hari Ini
              </span>
              <span className="p-space-xs rounded-lg bg-surface-container text-primary-container material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                done_all
              </span>
            </div>
            <div className="mt-space-md">
              <div className="font-data-metric text-data-metric text-on-surface font-bold">
                86 <span className="text-base font-normal text-on-surface-variant">rit</span>
              </div>
              <div className="mt-space-xs inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-md text-label-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                <span className="font-semibold">92%</span> tepat waktu
              </div>
            </div>
          </div>

          {/* Kartu 4: Titik Berisiko */}
          <div 
            onClick={() => onNavigateTab('prioritas')}
            className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/50 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg text-on-surface-variant group-hover:text-error transition-colors">
                Titik Berisiko
              </span>
              <span className="p-space-xs rounded-lg bg-error-container text-error material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                warning
              </span>
            </div>
            <div className="mt-space-md">
              <div className="font-data-metric text-data-metric text-error font-bold">7</div>
              <div className="mt-space-xs inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-md text-label-md">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                <span className="font-semibold">3</span> status kritis
              </div>
            </div>
          </div>

          {/* Kartu 5: Aliran Residu ke TPA */}
          <div 
            onClick={() => onNavigateTab('fasilitas')}
            className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/50 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg text-on-surface-variant group-hover:text-primary transition-colors">
                Residu ke TPA
              </span>
              <span className="p-space-xs rounded-lg bg-surface-container-high text-on-surface-variant material-symbols-outlined text-lg group-hover:scale-110 transition-transform">
                delete_sweep
              </span>
            </div>
            <div className="mt-space-md">
              <div className="font-headline-lg text-headline-lg text-on-surface font-bold">Pantau tren</div>
              <div className="mt-space-xs inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-md text-label-md">
                <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                <span>Data simulasi harian</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SIKLUS KEPUTUSAN SWALON (Pipeline Interaktif) */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-xl">all_inclusive</span>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Siklus Keputusan SWALON
                </h2>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Keputusan berikutnya diperbaiki secara adaptif berdasarkan hasil evaluasi keputusan sebelumnya.
              </p>
            </div>
            <span className="font-label-md text-label-md px-space-sm py-1 rounded bg-secondary-container/40 text-on-secondary-container font-semibold w-fit">
              Loop Pembelajaran Aktif
            </span>
          </div>

          {/* Interactive Stepper Track */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-space-xs pt-space-xs">
            {DECISION_CYCLE_STEPS.map((s, idx) => {
              const isActive = activeCycleStep === idx;
              return (
                <div
                  key={s.step}
                  onClick={() => {
                    setActiveCycleStep(idx);
                    if (idx === 1) onNavigateTab('prediksi');
                    if (idx === 2) onNavigateTab('prioritas');
                    if (idx === 3) onNavigateTab('optimasi-rute');
                    if (idx === 5) onNavigateTab('pembelajaran');
                  }}
                  className={`flex flex-col p-space-sm rounded-xl cursor-pointer transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm ring-2 ring-primary/20 scale-[1.02]'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <div className={`flex items-center justify-between font-label-md text-label-md ${
                    isActive ? 'text-secondary-fixed' : 'text-primary'
                  }`}>
                    <span>{s.step}</span>
                    <span className="material-symbols-outlined text-base">{s.icon}</span>
                  </div>
                  <span className={`font-title-sm text-title-sm mt-1 font-semibold ${
                    isActive ? 'text-on-primary' : 'text-on-surface'
                  }`}>
                    {s.title}
                  </span>
                  <span className={`font-body-sm text-body-sm text-[11px] leading-tight mt-0.5 ${
                    isActive ? 'text-primary-fixed' : 'text-on-surface-variant'
                  }`}>
                    {s.subtitle}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Cycle Step Detail Callout */}
          <div className="p-space-sm px-space-md rounded-xl bg-surface-container-low text-xs text-on-surface-variant flex items-center justify-between border border-surface-container/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base">info</span>
              <span>
                <strong>Langkah {DECISION_CYCLE_STEPS[activeCycleStep].step} ({DECISION_CYCLE_STEPS[activeCycleStep].title}):</strong>{' '}
                {DECISION_CYCLE_STEPS[activeCycleStep].description}
              </span>
            </div>
            <button
              onClick={() => {
                if (activeCycleStep === 1) onNavigateTab('prediksi');
                else if (activeCycleStep === 2) onNavigateTab('prioritas');
                else if (activeCycleStep === 3) onNavigateTab('optimasi-rute');
                else if (activeCycleStep === 5) onNavigateTab('pembelajaran');
              }}
              className="text-primary hover:underline font-bold whitespace-nowrap ml-2"
            >
              Buka Modul →
            </button>
          </div>
        </div>

        {/* 3. PETA JARINGAN KOTA MALANG & TITIK BERISIKO + DETAIL LATERAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Interactive Map Panel (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded-2xl shadow-sm p-space-md border border-surface-container/50">
            {/* Map Control Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-xl">map</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Peta Spasial Jaringan Kota Malang
                </h3>
              </div>

              {/* Layer Filter Badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setMapLayerFilter('semua')}
                  className={`font-label-md text-label-md px-space-sm py-1 rounded-lg transition-colors ${
                    mapLayerFilter === 'semua'
                      ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  Semua Titik (128)
                </button>
                <button
                  onClick={() => setMapLayerFilter('kritis')}
                  className={`font-label-md text-label-md px-space-sm py-1 rounded-lg transition-colors flex items-center gap-1 ${
                    mapLayerFilter === 'kritis'
                      ? 'bg-error text-on-error font-bold shadow-sm'
                      : 'bg-error-container text-on-error-container font-semibold'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span> Kritis (3)
                </button>
                <button
                  onClick={() => setMapLayerFilter('armada')}
                  className={`font-label-md text-label-md px-space-sm py-1 rounded-lg transition-colors flex items-center gap-1 ${
                    mapLayerFilter === 'armada'
                      ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                      : 'bg-secondary-container text-on-secondary-container font-semibold'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Armada Aktif (18)
                </button>
              </div>
            </div>

            {/* Simulated Map Stage (SVG Vector Spatial Visualization) */}
            <div className="relative w-full h-[340px] sm:h-[400px] md:h-[470px] rounded-xl bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center border border-slate-800">
              {/* Malang Map Base Texture */}
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-65 filter contrast-125"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9vYehby5WJ0opS-HWnO9gJ3hf2n35GvPSA3Bmvy_MIxazI3EAMS5Gr8i0aZ7yBCXK0EpW5K1rNf4NweZhOFGL0ssuYuC7EEBj-VOzgOHqYTKBueAraCrpPOi7t1SdQmrT6InElBawLlkYZPCaIzagAirwjqkFZvoaAxPoQoFUHct6BScqCDEM4s2lkkjZrxDR2PSP-lxUOl5H_0EucLhZni3H5i11tJ3xxC75k9mS5QAXyRKFQ6CetQ')` }}
              />

              {/* Ambient Scrim & Topographic Grid SVG */}
              <svg className="absolute inset-0 w-full h-full text-emerald-950/40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cityGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" strokeDasharray="3,3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cityGrid)" />
                {/* Route Lines */}
                {/* Recommended Route: Pasar Besar -> Klojen -> Lowokwaru -> Blimbing */}
                <path
                  d="M 230 350 L 360 250 L 490 140 L 450 280"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-pulse"
                />
                {/* Alternate Route: Pasar Besar -> Kedungkandang -> Supit Urang */}
                <path
                  d="M 450 280 L 640 330 L 260 410"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* MAP NODES */}
              {/* 1. TPS Pasar Besar (Kritis 91% - Merah Pulse) */}
              {(mapLayerFilter === 'semua' || mapLayerFilter === 'kritis') && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDetailModal(pasarBesarNode)}
                  style={{ top: '58%', left: '52%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-8 h-8 rounded-full bg-error/40 animate-ping"></span>
                    <span className="w-5 h-5 rounded-full bg-error flex items-center justify-center text-on-error shadow-md">
                      <span className="material-symbols-outlined text-xs">priority_high</span>
                    </span>
                    <div className="absolute left-6 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap border border-error/30">
                      <span className="font-label-md text-label-md text-error font-bold">TPS Pasar Besar</span>
                      <span className="block font-label-md text-label-md text-on-surface-variant font-medium">
                        91% • 45m tersisa
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. TPS Lowokwaru (Risiko Tinggi 84% - Oranye) */}
              {(mapLayerFilter === 'semua' || mapLayerFilter === 'kritis') && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDetailModal(lowokwaruNode)}
                  style={{ top: '26%', left: '58%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-[#f97316] flex items-center justify-center text-white shadow">
                      <span className="material-symbols-outlined text-[10px]">warning</span>
                    </span>
                    <div className="absolute left-5 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap border border-amber-300">
                      <span className="font-label-md text-label-md text-[#c2410c] font-bold">TPS Lowokwaru</span>
                      <span className="block font-label-md text-label-md text-on-surface-variant font-medium">
                        84% • Risiko tinggi
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. TPS Sukun (Sedang 67% - Kuning) */}
              {mapLayerFilter === 'semua' && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDetailModal(sukunNode)}
                  style={{ top: '72%', left: '28%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3.5 h-3.5 rounded-full bg-[#eab308] shadow"></span>
                    <div className="absolute left-4 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap">
                      <span className="font-label-md text-label-md text-[#a16207] font-semibold">TPS Sukun</span>
                      <span className="block font-label-md text-label-md text-on-surface-variant font-medium">
                        67% • Waspada
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. TPS Klojen (Normal 35% - Hijau) */}
              {mapLayerFilter === 'semua' && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDetailModal(klojenNode)}
                  style={{ top: '48%', left: '42%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-secondary shadow"></span>
                    <div className="absolute left-4 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap">
                      <span className="font-label-md text-label-md text-secondary font-semibold">TPS Klojen</span>
                      <span className="block font-label-md text-label-md text-on-surface-variant">
                        35% • Normal
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. TPS Kedungkandang (Normal 49% - Hijau) */}
              {mapLayerFilter === 'semua' && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDetailModal(kedungkandangNode)}
                  style={{ top: '60%', left: '78%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-secondary shadow"></span>
                    <div className="absolute left-4 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap">
                      <span className="font-label-md text-label-md text-secondary font-semibold">
                        TPS Kedungkandang
                      </span>
                      <span className="block font-label-md text-label-md text-on-surface-variant">
                        49% • Normal
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Fasilitas Pengolahan A (Blimbing) */}
              <div
                className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                onClick={() => onNavigateTab('fasilitas')}
                style={{ top: '18%', left: '34%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-6 h-6 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-sm">recycling</span>
                  </span>
                  <div className="absolute left-7 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap border border-emerald-300">
                    <span className="font-label-md text-label-md text-primary font-bold">Fasilitas A (Blimbing)</span>
                    <span className="block font-label-md text-label-md text-on-surface-variant">
                      Kapasitas 68% • Organik
                    </span>
                  </div>
                </div>
              </div>

              {/* 7. Fasilitas Pengolahan B (Kedungkandang) */}
              <div
                className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                onClick={() => onNavigateTab('fasilitas')}
                style={{ top: '68%', left: '74%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-6 h-6 rounded-lg bg-[#ea580c] text-white flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-sm">precision_manufacturing</span>
                  </span>
                  <div className="absolute left-7 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap">
                    <span className="font-label-md text-label-md text-[#c2410c] font-bold">Fasilitas B (Kdkdg)</span>
                    <span className="block font-label-md text-label-md text-on-surface-variant">
                      Kapasitas 82%
                    </span>
                  </div>
                </div>
              </div>

              {/* 8. TPA Supit Urang */}
              <div
                className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                onClick={() => onNavigateTab('fasilitas')}
                style={{ top: '86%', left: '30%' }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-7 h-7 rounded-lg bg-surface-dim text-on-surface flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-sm">domain</span>
                  </span>
                  <div className="absolute left-8 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap">
                    <span className="font-label-md text-label-md text-on-surface font-bold">TPA Supit Urang</span>
                    <span className="block font-label-md text-label-md text-on-surface-variant">
                      Sanitary Landfill Aktif
                    </span>
                  </div>
                </div>
              </div>

              {/* 9. Armada Bergerak: Truk MLG-07 (Menuju Pasar Besar) */}
              {(mapLayerFilter === 'semua' || mapLayerFilter === 'armada') && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDispatchModal('Truk MLG-07', 'TPS Pasar Besar', '11 Menit')}
                  style={{ top: '40%', left: '49%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container shadow-lg flex items-center justify-center ring-2 ring-primary">
                      <span className="material-symbols-outlined text-xs">local_shipping</span>
                    </span>
                    <div className="absolute left-8 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap border border-secondary">
                      <span className="font-label-md text-label-md text-primary font-bold">Truk MLG-07</span>
                      <span className="block font-label-md text-label-md text-secondary font-semibold">
                        Tersedia • OTW Pasar Besar
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 10. Armada Bergerak: Truk MLG-01 */}
              {(mapLayerFilter === 'semua' || mapLayerFilter === 'armada') && (
                <div
                  className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                  onClick={() => onOpenDispatchModal('Truk MLG-01', 'TPS Klojen', '3 Menit')}
                  style={{ top: '52%', left: '36%' }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant shadow flex items-center justify-center">
                      <span className="material-symbols-outlined text-xs">local_shipping</span>
                    </span>
                    <div className="absolute left-6 top-0 bg-surface-container-lowest/95 backdrop-blur px-space-xs py-0.5 rounded shadow text-left whitespace-nowrap">
                      <span className="font-label-md text-label-md text-on-surface-variant font-bold">Truk MLG-01</span>
                      <span className="block font-label-md text-label-md text-on-surface-variant">
                        Muatan 60%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Floating Map Indicator Widget */}
              <div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-space-xs rounded-lg shadow text-xs flex items-center gap-space-sm border border-surface-container">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">GPS Refresh Aktif</span>
                </div>
                <span className="text-outline-variant">|</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Zona 1: Malang Pusat & Sekitar
                </span>
              </div>
            </div>

            {/* Legenda Peta (Clean & Informative) */}
            <div className="flex items-center justify-between flex-wrap gap-space-sm pt-space-md mt-space-xs border-t border-surface-container/50">
              <div className="flex items-center gap-space-md flex-wrap text-xs text-on-surface-variant font-body-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span>Normal (&lt;50%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                  <span>Perlu Perhatian (50-75%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                  <span>Risiko Tinggi / Kritis (&gt;75%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                  <span>Armada Aktif</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-primary"></span>
                  <span>Fasilitas Pengolahan</span>
                </div>
              </div>

              <div className="flex items-center gap-space-sm text-xs text-on-surface-variant font-label-md">
                <div className="flex items-center gap-1">
                  <span className="w-4 h-0.5 bg-primary inline-block"></span>
                  <span>Rute Utama</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-4 h-0.5 border-t border-dashed border-outline inline-block"></span>
                  <span>Rute Alternatif</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Triage Feed & Action Stream (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            {/* Live Alert Feed Header */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm border border-surface-container/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-error text-xl">crisis_alert</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Peringatan Langsung
                  </h3>
                </div>
                <span className="font-label-md text-label-md px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">
                  {alerts.length} Darurat
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Laju akumulasi sampah melampaui batas ambang reguler.
              </p>

              {/* Stream Items */}
              <div className="flex flex-col gap-space-xs mt-space-xs">
                {alerts.map((alt) => {
                  const targetNode = nodes.find(n => n.name === alt.nodeName) || pasarBesarNode;
                  return (
                    <div
                      key={alt.id}
                      onClick={() => onOpenDetailModal(targetNode)}
                      className={`p-space-sm rounded-xl flex flex-col gap-1 cursor-pointer transition-colors border ${
                        alt.severity === 'darurat'
                          ? 'bg-error-container/20 border-error-container/40 hover:bg-error-container/30'
                          : 'bg-surface-container-low border-surface-container/40 hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-title-sm text-title-sm font-semibold ${
                          alt.severity === 'darurat' ? 'text-error' : 'text-on-surface'
                        }`}>
                          {alt.nodeName}
                        </span>
                        <span className="font-label-md text-label-md text-on-surface-variant">
                          {alt.time}
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-tight">
                        {alt.message}
                      </p>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-black/5">
                        <span>Prediksi muatan: {alt.predictedTons} Ton</span>
                        <span className="text-primary font-semibold flex items-center gap-0.5">
                          {alt.actionLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Assistant / Algorithmic Dispatch Prompt */}
            <div className="bg-primary rounded-2xl p-space-md text-on-primary shadow-md flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs text-secondary-fixed">
                <span className="material-symbols-outlined text-xl">psychology</span>
                <span className="font-title-sm text-title-sm tracking-wide uppercase font-bold">
                  Rekomendasi Algoritma
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                Truk <strong>MLG-07</strong> berada di radius 3,2 km dari TPS Pasar Besar dan memiliki ruang muat kosong 4,2 Ton. Penugasan langsung menghemat 18 menit vs menunggu jadwal rutin.
              </p>
              <div className="pt-space-xs">
                <button
                  onClick={() => onOpenDispatchModal('Truk MLG-07', 'TPS Pasar Besar', '11 Menit')}
                  className="w-full py-2.5 px-space-md rounded-xl bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-colors font-title-sm text-title-sm font-semibold flex items-center justify-center gap-space-xs shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  <span>Tugaskan MLG-07 Sekarang</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. PRIORITAS SAAT INI (3 Kartu Keputusan Taktis Cepat) */}
        <div className="flex flex-col gap-space-md pt-space-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                Prioritas Tindakan Saat Ini
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Tiga simpul dan armada dengan urgensi operasional tertinggi.
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('prioritas')}
              className="text-primary font-title-sm text-title-sm hover:underline flex items-center gap-0.5 font-semibold"
            >
              Lihat Semua Antrean Prioritas
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Prioritas 1: Simpul Kritis */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-md text-label-md px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-semibold uppercase tracking-wider">
                    Prioritas 1 • Simpul Kritis
                  </span>
                  <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  TPS Pasar Besar & Lowokwaru
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Akumulasi limbah pasar pagi mencapai ambang batas kritis kapasitas penampungan.
                </p>
                <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-body-sm">Status Estimasi:</span>
                    <span className="font-semibold text-error">Risiko penuh dalam 45 menit</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-body-sm">Volume Prediksi:</span>
                    <span className="font-semibold text-on-surface">2,4 ton limbah tercampur</span>
                  </div>
                </div>
              </div>
              <div className="mt-space-lg pt-space-xs flex items-center gap-space-sm">
                <button
                  onClick={() => onOpenDetailModal(pasarBesarNode)}
                  className="flex-1 py-2 px-space-md rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container transition-colors text-center font-medium"
                >
                  Lihat Detail
                </button>
                <button
                  onClick={() => onNavigateTab('optimasi-rute')}
                  className="flex-1 py-2 px-space-md rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm hover:bg-primary transition-colors text-center font-semibold shadow-sm"
                >
                  Ke Optimasi
                </button>
              </div>
            </div>

            {/* Prioritas 2: Armada Tersedia */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-md text-label-md px-space-sm py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-semibold uppercase tracking-wider">
                    Prioritas 2 • Armada Rekomendasi
                  </span>
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Armada Truk MLG-07
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Dump truck hidrolik 6 roda siap ditugaskan untuk rute evakuasi darurat pasar.
                </p>
                <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-body-sm">Kapasitas Tersedia:</span>
                    <span className="font-semibold text-secondary">4,2 Ton (Tersedia)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-body-sm">Jarak ke Pasar Besar:</span>
                    <span className="font-semibold text-on-surface">3,2 km (~11 menit perjalanan)</span>
                  </div>
                </div>
              </div>
              <div className="mt-space-lg pt-space-xs">
                <button
                  onClick={() => onOpenDispatchModal('Truk MLG-07', 'TPS Pasar Besar', '11 Menit')}
                  className="w-full py-2 px-space-md rounded-xl bg-secondary text-on-secondary font-title-sm text-title-sm hover:bg-primary-container transition-colors flex items-center justify-center gap-space-xs font-semibold shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">assignment_turned_in</span>
                  <span>Tugaskan Armada Ini</span>
                </button>
              </div>
            </div>

            {/* Prioritas 3: Fasilitas Penerima */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-surface-container/50">
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-md text-label-md px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface font-semibold uppercase tracking-wider">
                    Prioritas 3 • Titik Penyaluran
                  </span>
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Fasilitas Pengolahan A
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Unit Komposting & Biodigester Blimbing siap menerima fraksi organik pasar.
                </p>
                <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-body-sm">Kapasitas Aktif:</span>
                    <span className="font-semibold text-on-surface">68% Terisi</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-body-sm">Material Sesuai:</span>
                    <span className="font-semibold text-primary">Organik / Sayur (Kuota 32%)</span>
                  </div>
                </div>
              </div>
              <div className="mt-space-lg pt-space-xs">
                <button
                  onClick={() => onNavigateTab('fasilitas')}
                  className="w-full py-2 px-space-md rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-space-xs font-medium"
                >
                  <span className="material-symbols-outlined text-base">inventory</span>
                  <span>Lihat Daya Tampung</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
