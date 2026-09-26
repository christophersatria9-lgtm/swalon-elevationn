import React, { useState } from 'react';
import { FleetVehicle } from '../types';

interface OptimasiRuteViewProps {
  fleet: FleetVehicle[];
  onOpenDispatchModal: (truckId: string, targetName: string, eta: string) => void;
  onOpenDriverPhone: () => void;
}

export const OptimasiRuteView: React.FC<OptimasiRuteViewProps> = ({
  fleet,
  onOpenDispatchModal,
  onOpenDriverPhone
}) => {
  const [selectedRoute, setSelectedRoute] = useState<'Rute A' | 'Rute B'>('Rute A');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const mlg07 = fleet.find(f => f.id === 'MLG-07') || fleet[0];

  const handleSyncRoute = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Optimasi Rute
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                PROTOTIPE — DATA SIMULASI
              </span>
              <span className="inline-flex items-center gap-1.5 px-space-sm py-space-xs rounded bg-secondary-container/40 text-on-secondary-container font-label-md text-[10px] sm:text-label-md font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Algoritma VRP-Greedy Aktif
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-3xl">
              Mencocokkan titik prioritas dengan armada, rute, dan fasilitas tujuan secara terintegrasi dan presisi spasial.
            </p>
          </div>

          {/* Quick Context Toolbar */}
          <div className="flex items-center gap-space-sm self-start lg:self-auto flex-wrap">
            <div className="flex items-center gap-space-xs px-3 sm:px-space-md py-1.5 sm:py-space-sm rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-lg">calendar_today</span>
              <span className="font-label-lg text-xs sm:text-label-lg text-on-surface font-semibold">
                Shift Pagi • Kota Malang
              </span>
            </div>
            <button
              onClick={handleSyncRoute}
              className="flex items-center gap-space-xs px-3 sm:px-space-md py-1.5 sm:py-space-sm rounded-xl bg-surface-container-lowest shadow-sm text-on-surface-variant hover:text-on-surface transition-colors border border-surface-container active:scale-95 text-xs sm:text-label-lg font-semibold"
            >
              <span className={`material-symbols-outlined text-lg ${isSyncing ? 'animate-spin text-primary' : ''}`}>
                sync
              </span>
              <span>
                {isSyncing ? 'Menyinkronkan...' : 'Sinkronisasi Jalur'}
              </span>
            </button>
          </div>
        </div>

        {/* MAIN OPERATIONAL GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* LEFT & CENTER: MAP MULTI-LAYER DISPLAY (7 Cols on XL) */}
          <div className="xl:col-span-7 flex flex-col gap-space-md">
            {/* Interactive Map Canvas Card */}
            <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-md flex flex-col border border-surface-container/60">
              {/* Map Overlay Top-Bar */}
              <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-space-sm pointer-events-none">
                <div className="flex items-center gap-space-xs pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-space-xs rounded-xl shadow-sm border border-surface-container">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    Peta Operasional Wilayah Tengah
                  </span>
                  <span className="text-outline text-body-sm font-light">|</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Sektor Lowokwaru – Klojen
                  </span>
                </div>

                {/* Map View Layer Toggles */}
                <div className="flex items-center gap-1 pointer-events-auto bg-surface-container-lowest/95 backdrop-blur-md p-1 rounded-xl shadow-sm border border-surface-container">
                  <button
                    onClick={() => setSelectedRoute('Rute A')}
                    className={`px-space-sm py-space-xs rounded-lg font-label-md text-label-md transition-all ${
                      selectedRoute === 'Rute A'
                        ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    Rute A (Aktif)
                  </button>
                  <button
                    onClick={() => setSelectedRoute('Rute B')}
                    className={`px-space-sm py-space-xs rounded-lg font-label-md text-label-md transition-all ${
                      selectedRoute === 'Rute B'
                        ? 'bg-amber-600 text-white font-bold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    Rute B (Alt)
                  </button>
                  <button
                    onClick={onOpenDriverPhone}
                    className="p-space-xs rounded-lg text-primary hover:bg-surface-container-low"
                    title="Buka Simulasi Ponsel Petugas"
                  >
                    <span className="material-symbols-outlined text-base">smartphone</span>
                  </button>
                </div>
              </div>

              {/* Synthetic Interactive Map Graphic Canvas */}
              <div className="relative w-full h-[340px] sm:h-[420px] md:h-[520px] bg-slate-900 overflow-hidden select-none">
                {/* Simulated City Satellite Base Layer */}
                <div
                  className="absolute inset-0 w-full h-full opacity-65 scale-105 filter contrast-125"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9vYehby5WJ0opS-HWnO9gJ3hf2n35GvPSA3Bmvy_MIxazI3EAMS5Gr8i0aZ7yBCXK0EpW5K1rNf4NweZhOFGL0ssuYuC7EEBj-VOzgOHqYTKBueAraCrpPOi7t1SdQmrT6InElBawLlkYZPCaIzagAirwjqkFZvoaAxPoQoFUHct6BScqCDEM4s2lkkjZrxDR2PSP-lxUOl5H_0EucLhZni3H5i11tJ3xxC75k9mS5QAXyRKFQ6CetQ')`
                  }}
                />

                {/* Dark Ambient Scrim with Spatial Grid Lines */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07131e]/90 via-[#07131e]/40 to-[#07131e]/80"></div>

                {/* SVG Vector Routes Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 700 520" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="routeAGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#047857" />
                      <stop offset="100%" stopColor="#004d34" />
                    </linearGradient>
                    <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Grid Lines */}
                  <path d="M 50 120 L 650 120 M 50 260 L 650 260 M 50 400 L 650 400" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3" />
                  <path d="M 160 30 L 160 480 M 340 30 L 340 480 M 520 30 L 520 480" stroke="#334155" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3" />

                  {/* Route B (Alternate Orange Dashed: Passing Basuki Rahmat) */}
                  <path
                    d="M 180 140 C 230 180, 240 240, 290 280 S 430 330, 480 300 C 530 270, 560 210, 580 180"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth={selectedRoute === 'Rute B' ? 6 : 3}
                    strokeDasharray="8 6"
                    opacity={selectedRoute === 'Rute B' ? 0.95 : 0.4}
                  />

                  {/* Route A (Recommended Green Solid with Glow: Via Jl. Soehat - Blimbing) */}
                  <path
                    d="M 180 140 C 210 110, 290 100, 360 130 S 450 160, 500 130 C 540 105, 560 120, 580 180"
                    fill="none"
                    stroke="url(#routeAGradient)"
                    strokeWidth={selectedRoute === 'Rute A' ? 7 : 3.5}
                    strokeLinecap="round"
                    filter="url(#glowGreen)"
                    opacity={selectedRoute === 'Rute A' ? 1 : 0.45}
                  />

                  {/* Secondary Link to TPA Supit Urang */}
                  <path
                    d="M 360 130 C 330 240, 280 340, 240 440"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2.5"
                    strokeDasharray="5 5"
                    opacity="0.55"
                  />
                </svg>

                {/* MAP NODES / PINS */}
                {/* 1. START POINT: Armada Truk MLG-07 */}
                <div
                  className="absolute left-[180px] top-[140px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                  onClick={onOpenDriverPhone}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-12 h-12 rounded-full bg-secondary/40 animate-ping"></span>
                    <div className="relative w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shadow-lg border-2 border-primary-fixed">
                      <span className="material-symbols-outlined text-xl">local_shipping</span>
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-space-sm bg-surface-container-lowest text-on-surface rounded-xl shadow-xl pointer-events-none border border-surface-container">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-label-md text-label-md text-secondary font-bold">POSISI ARMADA</span>
                      <span className="font-label-md text-label-md px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-semibold">
                        Bergerak
                      </span>
                    </div>
                    <p className="font-title-sm text-title-sm font-bold">Truk MLG-07</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      Jl. Soekarno-Hatta (Kecepatan: 28 km/h)
                    </p>
                  </div>
                </div>

                {/* 2. WAYPOINT 1: TPS Lowokwaru */}
                <div className="absolute left-[360px] top-[130px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center shadow-md border-2 border-white">
                      <span className="material-symbols-outlined text-sm font-bold">delete_forever</span>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-44 p-space-xs bg-surface-container-lowest/95 backdrop-blur rounded-lg shadow-lg pointer-events-none text-center border border-error/30">
                    <span className="font-label-md text-label-md font-bold text-error uppercase">TPS Lowokwaru</span>
                    <p className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Volume Kritis • 1.4 Ton
                    </p>
                  </div>
                </div>

                {/* 3. WAYPOINT 2: TPS Pasar Besar */}
                <div className="absolute left-[290px] top-[280px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
                  <div className="relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md border-2 border-white">
                      <span className="material-symbols-outlined text-sm font-bold">storefront</span>
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-space-xs bg-surface-container-lowest/95 backdrop-blur rounded-lg shadow-lg pointer-events-none text-center border border-amber-300">
                    <span className="font-label-md text-label-md font-bold text-amber-700 uppercase">TPS Pasar Besar</span>
                    <p className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Lalu Lintas Padat (+9 mnt)
                    </p>
                  </div>
                </div>

                {/* 4. DESTINATION 1: Fasilitas Pengolahan A (Blimbing) */}
                <div className="absolute left-[580px] top-[180px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20">
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-10 h-10 rounded-full bg-secondary-fixed-dim/40 animate-pulse"></span>
                    <div className="relative w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shadow-lg border-2 border-secondary-fixed">
                      <span className="material-symbols-outlined text-xl">compost</span>
                    </div>
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-space-sm bg-surface-container-lowest text-on-surface rounded-xl shadow-xl pointer-events-none border border-emerald-300">
                    <span className="font-label-md text-label-md px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-bold uppercase">
                      Tujuan Utama
                    </span>
                    <p className="font-title-sm text-title-sm mt-1 font-bold">Fasilitas A (Blimbing)</p>
                    <p className="font-body-sm text-body-sm text-secondary font-semibold">
                      Sisa Slot: 32% (Siap Terima)
                    </p>
                  </div>
                </div>

                {/* 5. DESTINATION 2: Fasilitas Pengolahan B */}
                <div className="absolute left-[540px] top-[340px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer opacity-85 hover:opacity-100 z-10">
                  <div className="w-8 h-8 rounded-xl bg-surface-container-high text-on-surface flex items-center justify-center shadow border border-slate-600">
                    <span className="material-symbols-outlined text-sm">recycling</span>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 p-space-xs bg-surface-container-lowest rounded shadow-sm text-center">
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Fasilitas B (Kedungkandang)
                    </span>
                  </div>
                </div>

                {/* 6. FINAL DISPOSAL: TPA Supit Urang */}
                <div className="absolute left-[240px] top-[440px] -translate-x-1/2 -translate-y-1/2 group cursor-pointer opacity-70 hover:opacity-100 z-10">
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-sm">terrain</span>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-36 p-space-xs bg-surface-container-lowest rounded shadow-sm text-center">
                    <span className="font-label-md text-label-md text-outline">TPA Supit Urang</span>
                  </div>
                </div>

                {/* Distance & ETA Badge Overlaid on Route A */}
                <div className={`absolute left-[440px] top-[100px] -translate-x-1/2 -translate-y-1/2 z-10 bg-primary text-on-primary px-space-sm py-1 rounded-full shadow-lg flex items-center gap-1.5 font-label-md text-label-md transition-transform ${
                  selectedRoute === 'Rute A' ? 'scale-105 ring-2 ring-primary-fixed' : 'opacity-70'
                }`}>
                  <span className="material-symbols-outlined text-sm">timer</span>
                  <span className="font-bold">4,8 km • 14 mnt</span>
                </div>

                {/* Delay Badge Overlaid on Route B */}
                <div className={`absolute left-[390px] top-[310px] -translate-x-1/2 -translate-y-1/2 z-10 bg-surface-container-lowest text-amber-700 px-space-sm py-1 rounded-full shadow-md flex items-center gap-1.5 font-label-md text-label-md border border-amber-300 transition-transform ${
                  selectedRoute === 'Rute B' ? 'scale-105 ring-2 ring-amber-500' : 'opacity-70'
                }`}>
                  <span className="material-symbols-outlined text-sm text-amber-600">traffic</span>
                  <span className="font-bold">3,9 km • 17 mnt (+3 mnt macet)</span>
                </div>
              </div>

              {/* Map Footer Legend */}
              <div className="p-space-md bg-surface-container-lowest flex flex-wrap items-center justify-between gap-space-md border-t border-surface-container/60">
                <div className="flex flex-wrap items-center gap-space-lg">
                  <div className="flex items-center gap-space-xs">
                    <span className="w-3.5 h-1.5 rounded-full bg-primary"></span>
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Rute A (Rekomendasi Pintar)
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-3.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                      Rute B (Jalur Alternatif)
                    </span>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      TPS Penjemputan Kritis
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
                  <span className="material-symbols-outlined text-sm text-secondary">explore</span>
                  <span>Koordinat Titik Tengah: -7.9421, 112.6322</span>
                </div>
              </div>
            </div>

            {/* FORMULA PENJELASAN LOGISTIK */}
            <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-surface-container/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-xl">account_tree</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    Formula Optimasi Algoritma Multi-Variabel SWALON
                  </span>
                </div>
                <span className="font-label-md text-label-md px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant font-semibold">
                  Engine v2.4
                </span>
              </div>

              {/* Formula Step Visual Cards */}
              <div className="grid grid-cols-2 md:grid-cols-6 items-center gap-2 text-center select-none">
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center border border-surface-container/40">
                  <span className="material-symbols-outlined text-primary mb-1">distance</span>
                  <span className="font-label-md text-label-md text-primary font-bold">RUTE</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Topologi Jalan</span>
                </div>
                <div className="hidden md:flex items-center justify-center font-bold text-outline text-lg">+</div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center border border-surface-container/40">
                  <span className="material-symbols-outlined text-secondary mb-1">local_shipping</span>
                  <span className="font-label-md text-label-md text-secondary font-bold">ARMADA</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Muatan 64%</span>
                </div>
                <div className="hidden md:flex items-center justify-center font-bold text-outline text-lg">+</div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center border border-surface-container/40">
                  <span className="material-symbols-outlined text-tertiary mb-1">eco</span>
                  <span className="font-label-md text-label-md text-tertiary font-bold">MATERIAL</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Organik Murni</span>
                </div>
                <div className="hidden md:flex items-center justify-center font-bold text-outline text-lg">=</div>
                <div className="col-span-2 md:col-span-1 p-space-sm rounded-xl bg-primary-container text-on-primary flex flex-col items-center shadow-sm">
                  <span className="material-symbols-outlined text-primary-fixed mb-1">verified</span>
                  <span className="font-label-md text-label-md font-bold">KEPUTUSAN</span>
                  <span className="font-body-sm text-body-sm text-on-primary-container text-xs">Efisien & Tepat</span>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low text-on-surface-variant flex items-start gap-space-sm border border-surface-container/40">
                <span className="material-symbols-outlined text-primary mt-0.5 text-lg">info</span>
                <p className="font-body-sm text-body-sm leading-relaxed">
                  <strong className="text-on-surface font-semibold">Prinsip Keputusan Cerdas:</strong> Rekomendasi mempertimbangkan jarak, kapasitas armada, jenis material, kondisi lalu lintas real-time, dan daya tampung fasilitas —{' '}
                  <span className="text-primary font-bold">rute terpendek tidak selalu menjadi yang tercepat atau terbaik</span> bagi keberlanjutan siklus kota.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: FLEET RECOMMENDATION & ROUTE COMPARISON (5 Cols on XL) */}
          <div className="xl:col-span-5 flex flex-col gap-space-lg">
            {/* PANEL REKOMENDASI ARMADA TERBAIK */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-md flex flex-col gap-space-md border border-surface-container/60">
              <div className="flex items-center justify-between pb-space-sm border-b border-surface-container/60">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                      Rekomendasi Armada Terbaik
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      {mlg07.id} ({mlg07.plate})
                    </h3>
                  </div>
                </div>
                <span className="px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  Aktif Bergerak
                </span>
              </div>

              {/* Capacity Meter Progress */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/40">
                <div className="flex justify-between items-center">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Kapasitas Muatan Saat Ini
                  </span>
                  <span className="font-data-metric text-headline-md text-primary font-bold">
                    3,2 <span className="font-body-sm text-body-sm font-normal text-on-surface-variant">/ 5,0 Ton</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: '64%' }}
                  />
                </div>
                <div className="flex justify-between items-center font-body-sm text-body-sm mt-1">
                  <span className="text-on-surface-variant">
                    Sisa Ruang: <strong className="text-secondary font-semibold">1,8 Ton</strong>
                  </span>
                  <span className="text-secondary font-medium">Cukup untuk TPS Prioritas (1,4 Ton)</span>
                </div>
              </div>

              {/* Fleet Metric Spec Grid */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Jarak ke Titik Prioritas</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold mt-0.5">3,2 km</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Sektor Lowokwaru</span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Perkiraan Tiba (ETA)</span>
                  <span className="font-title-sm text-title-sm text-primary font-bold mt-0.5">11 Menit</span>
                  <span className="font-body-sm text-body-sm text-secondary text-xs">Kondisi Jalan Lancar</span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Jenis Material Angkut</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold mt-0.5">Organik</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Dekomposisi Cepat</span>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Tujuan Akhir Rute</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold mt-0.5 truncate">
                    Fasilitas A (Blimbing)
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Unit Komposting Kota</span>
                </div>
              </div>

              {/* Operational Driver Status */}
              <div className="flex items-center justify-between p-space-sm rounded-xl bg-surface-container-low border border-surface-container/40">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-primary border border-primary/20">
                    BM
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                      Bambang Mulyono
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      Pengemudi Utama • Jam Kerja 06:00 - 14:00
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl">verified_user</span>
              </div>

              {/* Action Buttons Group */}
              <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
                <button
                  onClick={() => onOpenDispatchModal('Truk MLG-07', 'TPS Lowokwaru', '11 Menit')}
                  className="flex-1 flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary transition-all shadow-md active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>Tugaskan Armada</span>
                </button>
                <button
                  onClick={onOpenDriverPhone}
                  className="flex items-center justify-center gap-space-xs py-space-sm px-space-md rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container transition-all shadow-sm border border-surface-container"
                >
                  <span className="material-symbols-outlined text-lg">smartphone</span>
                  <span>Konsol Petugas</span>
                </button>
              </div>
            </div>

            {/* PERBANDINGAN RUTE MULTI-KRITERIA */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between px-space-xs">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  Perbandingan Evaluasi Rute
                </span>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  2 Alternatif Dinilai
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                {/* KARTU RUTE A (Rekomendasi Sistem) */}
                <div
                  onClick={() => setSelectedRoute('Rute A')}
                  className={`rounded-2xl p-space-md bg-surface-container-lowest shadow-md flex flex-col justify-between cursor-pointer transition-all border ${
                    selectedRoute === 'Rute A'
                      ? 'ring-2 ring-primary border-primary'
                      : 'border-surface-container/60 hover:border-primary/40'
                  }`}
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary font-label-md text-label-md font-bold">
                        Rekomendasi Sistem
                      </span>
                      <span className="w-3 h-3 rounded-full bg-primary"></span>
                    </div>

                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Jalur Rute A</h4>
                      <p className="font-label-md text-label-md text-on-surface-variant">Via Koridor Soehat - Blimbing</p>
                    </div>

                    <div className="flex flex-col gap-space-xs pt-space-xs font-body-sm text-body-sm">
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Total Jarak</span>
                        <span className="font-bold text-on-surface">4,8 km</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Waktu Tempuh</span>
                        <span className="font-bold text-secondary">14 Menit</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Lalu Lintas</span>
                        <span className="text-secondary font-semibold">Normal (Lancar)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Kapasitas Fasilitas</span>
                        <span className="font-semibold text-on-surface">68% (Aman)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-on-surface-variant">Efisiensi Emisi</span>
                        <span className="text-primary font-bold">Optimal (-22% CO2)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low p-space-xs rounded-xl border border-surface-container/40">
                    <span className="font-label-md text-label-md text-primary font-bold">STATUS JALUR TERPILIH</span>
                    <span className="material-symbols-outlined text-primary text-base">task_alt</span>
                  </div>
                </div>

                {/* KARTU RUTE B (Alternatif) */}
                <div
                  onClick={() => setSelectedRoute('Rute B')}
                  className={`rounded-2xl p-space-md bg-surface-container-lowest shadow-sm flex flex-col justify-between cursor-pointer hover:shadow-md transition-all border ${
                    selectedRoute === 'Rute B'
                      ? 'ring-2 ring-amber-500 border-amber-500'
                      : 'border-surface-container/60 opacity-85 hover:opacity-100'
                  }`}
                >
                  <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-label-md font-semibold">
                        Jalur Alternatif
                      </span>
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    </div>

                    <div>
                      <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Jalur Rute B</h4>
                      <p className="font-label-md text-label-md text-on-surface-variant">Via Basuki Rahmat (Tengah Kota)</p>
                    </div>

                    <div className="flex flex-col gap-space-xs pt-space-xs font-body-sm text-body-sm">
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Total Jarak</span>
                        <span className="font-bold text-on-surface">
                          3,9 km <span className="text-secondary font-normal text-xs">(Lebih Pendek)</span>
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Waktu Tempuh</span>
                        <span className="font-bold text-amber-700">17 Menit (+3 mnt)</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Lalu Lintas</span>
                        <span className="text-error font-semibold">Padat / Macet</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-surface-container-low">
                        <span className="text-on-surface-variant">Kapasitas Fasilitas</span>
                        <span className="font-semibold text-on-surface">42% (Sempit)</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-on-surface-variant">Efisiensi Emisi</span>
                        <span className="text-on-surface-variant">Kurang Efisien</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-space-md pt-space-sm flex items-center justify-between bg-surface-container-low p-space-xs rounded-xl text-on-surface-variant border border-surface-container/40">
                    <span className="font-label-md text-label-md">Dapat Dialihkan Jika Darurat</span>
                    <span className="material-symbols-outlined text-base">alt_route</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
