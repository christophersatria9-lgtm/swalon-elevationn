import React, { useState } from 'react';
import { TPSNode } from '../types';

interface PrediksiViewProps {
  nodes: TPSNode[];
  onOpenDetailModal: (node: TPSNode) => void;
  onOpenParametersModal: () => void;
  onAddToPriority: (nodeName: string) => void;
}

export const PrediksiView: React.FC<PrediksiViewProps> = ({
  nodes,
  onOpenDetailModal,
  onOpenParametersModal,
  onAddToPriority
}) => {
  const [zoneFilter, setZoneFilter] = useState<'semua' | 'pasar' | 'permukiman' | 'pendidikan'>('semua');
  const [selectedHighlight, setSelectedHighlight] = useState<string>('pasar-besar');

  const pasarBesar = nodes.find(n => n.id === 'tps-pasar-besar') || nodes[0];
  const lowokwaru = nodes.find(n => n.id === 'tps-lowokwaru') || nodes[1];
  const sukun = nodes.find(n => n.id === 'tps-sukun') || nodes[2];

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:px-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header Page Context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Prediksi
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                PROTOTIPE — DATA SIMULASI
              </span>
            </div>
            <p className="text-xs sm:text-sm lg:text-body-lg text-on-surface-variant">
              Perkirakan titik yang membutuhkan layanan sebelum terjadi penumpukan.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <div className="px-3 sm:px-space-md py-1.5 sm:py-space-xs rounded-xl bg-surface-container-low flex items-center gap-2 text-on-surface-variant text-xs sm:text-label-lg font-medium border border-surface-container">
              <span className="material-symbols-outlined text-primary text-base">radar</span>
              <span>
                Model AI Prospektif: <strong className="text-on-surface font-semibold">SWALON-Forecasting v4.2</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Banner Prinsip Proaktif SWALON */}
        <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-space-lg shadow-sm border border-surface-container">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-2xl">insights</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  Prinsip Proaktif SWALON
                </span>
                <p className="font-title-sm text-title-sm text-on-surface font-medium leading-relaxed">
                  SWALON tidak hanya melihat titik yang penuh sekarang, tetapi memperkirakan titik yang berisiko penuh sebelum armada berikutnya tiba.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm shrink-0">
              <span className="inline-flex items-center gap-1 text-secondary font-semibold">
                <span className="material-symbols-outlined text-sm">bolt</span>
                Penyegaran Otomatis Tiap 60 Dtk
              </span>
            </div>
          </div>
        </div>

        {/* Split Screen: Peta Risiko (Kiri) & Panel Kondisi 2 Jam Ke Depan (Kanan) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Kolom Kiri: Peta Risiko Kota Malang & Kawasan (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-md border border-surface-container/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
                <div className="flex items-center gap-space-sm">
                  <span className="w-3 h-3 rounded-full bg-error animate-ping"></span>
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">
                    Peta Panas Risiko Timbulan
                  </span>
                  <span className="font-label-md text-label-md px-space-xs py-0.5 rounded bg-surface-container text-on-surface-variant font-semibold">
                    Kota Malang
                  </span>
                </div>

                {/* Filter Zona Timbulan */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setZoneFilter('semua')}
                    className={`px-space-sm py-1 rounded-lg text-label-md font-label-md transition-all ${
                      zoneFilter === 'semua'
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    Semua Kawasan
                  </button>
                  <button
                    onClick={() => setZoneFilter('pasar')}
                    className={`px-space-sm py-1 rounded-lg text-label-md font-label-md transition-all ${
                      zoneFilter === 'pasar'
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    Pasar & Komersial
                  </button>
                  <button
                    onClick={() => setZoneFilter('permukiman')}
                    className={`px-space-sm py-1 rounded-lg text-label-md font-label-md transition-all ${
                      zoneFilter === 'permukiman'
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    Permukiman Padat
                  </button>
                  <button
                    onClick={() => setZoneFilter('pendidikan')}
                    className={`px-space-sm py-1 rounded-lg text-label-md font-label-md transition-all ${
                      zoneFilter === 'pendidikan'
                        ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    Pendidikan/Kampus
                  </button>
                </div>
              </div>

              {/* Peta Interaktif dengan Layer Kartografis Kota Malang */}
              <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-xl overflow-hidden bg-surface-container-low border border-surface-container">
                <div
                  className="absolute inset-0 bg-cover bg-center brightness-95"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGyjYfZYzwMuHIa-JuBmWtec8AKABODEz2GeMBBLfAl4_osSOZxWIkV2dYG0icMaUW7b71Dw8Y1EcDz_RhdibtS9dLs59QgJvfo5HR9G6-8dBHP4C4ydPv3I6ZcXZntc52LUFP7TkgjjLr0gCghIRVvstZ3DkQDiHYGAK8rsFU_uMwINcyH_Yl3Y5sBD9GXkLuiMZuXEKFEXLW6Abo1TD___tWX6HHNxAEmnHfftFBddLdCLRV42rsSg')`
                  }}
                />
                
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/50 via-transparent to-transparent pointer-events-none" />

                {/* Titik Interaktif 1: TPS Pasar Besar */}
                {(zoneFilter === 'semua' || zoneFilter === 'pasar') && (
                  <div
                    className="absolute top-[48%] left-[54%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    onClick={() => {
                      setSelectedHighlight('pasar-besar');
                      onOpenDetailModal(pasarBesar);
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-12 h-12 rounded-full bg-error/30 animate-ping"></span>
                      <span className="absolute w-8 h-8 rounded-full bg-error/50"></span>
                      <div className="relative w-7 h-7 rounded-full bg-error text-on-error flex items-center justify-center font-bold text-xs shadow-md">
                        91%
                      </div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
                      <span className="font-bold">TPS Pasar Besar</span>
                      <span className="text-error-container text-[10px]">Kritis dalam 38 mnt (91%)</span>
                    </div>
                  </div>
                )}

                {/* Titik Interaktif 2: TPS Lowokwaru */}
                {(zoneFilter === 'semua' || zoneFilter === 'pendidikan') && (
                  <div
                    className="absolute top-[28%] left-[42%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    onClick={() => {
                      setSelectedHighlight('lowokwaru');
                      onOpenDetailModal(lowokwaru);
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="absolute w-10 h-10 rounded-full bg-error/25 animate-ping"></span>
                      <div className="relative w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center font-bold text-[11px] shadow-md">
                        84%
                      </div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
                      <span className="font-bold">TPS Lowokwaru</span>
                      <span className="text-error-container text-[10px]">Prediksi 84% (52 mnt)</span>
                    </div>
                  </div>
                )}

                {/* Titik Interaktif 3: TPS Sukun */}
                {(zoneFilter === 'semua' || zoneFilter === 'permukiman') && (
                  <div
                    className="absolute top-[68%] left-[36%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    onClick={() => {
                      setSelectedHighlight('sukun');
                      onOpenDetailModal(sukun);
                    }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-[11px] shadow-md">
                        67%
                      </div>
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
                      <span className="font-bold">TPS Sukun</span>
                      <span className="text-surface-dim text-[10px]">Risiko Sedang: 67% (1j 20m)</span>
                    </div>
                  </div>
                )}

                {/* Titik Interaktif 4: TPS Klojen */}
                {(zoneFilter === 'semua' || zoneFilter === 'pasar') && (
                  <div className="absolute top-[44%] left-[46%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-[10px] shadow-sm">
                      48%
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
                      <span className="font-bold">TPS Klojen</span>
                      <span className="text-secondary-fixed text-[10px]">Normal: 48%</span>
                    </div>
                  </div>
                )}

                {/* Titik Interaktif 5: TPS Kedungkandang */}
                {(zoneFilter === 'semua' || zoneFilter === 'permukiman') && (
                  <div className="absolute top-[62%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-[10px] shadow-sm">
                      52%
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col bg-inverse-surface text-inverse-on-surface px-2.5 py-1.5 rounded-lg shadow-lg text-xs whitespace-nowrap pointer-events-none">
                      <span className="font-bold">TPS Kedungkandang</span>
                      <span className="text-secondary-fixed text-[10px]">Normal: 52%</span>
                    </div>
                  </div>
                )}

                {/* Peta Legend Bar (Docked Bottom) */}
                <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md p-space-sm rounded-xl flex flex-wrap items-center justify-between gap-space-sm text-body-sm font-body-sm shadow-sm border border-surface-container">
                  <div className="flex items-center gap-space-md flex-wrap">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                      Tingkat Risiko:
                    </span>
                    <span className="flex items-center gap-1.5 text-on-surface font-medium text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-error animate-pulse"></span>
                      &gt;85% (Kritis &lt;60 mnt)
                    </span>
                    <span className="flex items-center gap-1.5 text-on-surface font-medium text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                      60%–84% (Sedang)
                    </span>
                    <span className="flex items-center gap-1.5 text-on-surface font-medium text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                      &lt;60% (Optimal)
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant font-medium">GIS Multi-Sektor Dinamis</span>
                </div>
              </div>

              {/* Indikator Rangkuman Wilayah Urban */}
              <div className="grid grid-cols-3 gap-space-sm pt-space-xs text-center">
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Kawasan Terancam Penuh</span>
                  <p className="font-headline-md text-headline-md text-error font-bold mt-0.5">2 Titik</p>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Rata-rata Waktu Kritis</span>
                  <p className="font-headline-md text-headline-md text-on-surface font-bold mt-0.5">45 Menit</p>
                </div>
                <div className="p-space-sm rounded-xl bg-surface-container-low border border-surface-container/40">
                  <span className="font-label-md text-label-md text-outline">Akurasi Prediksi Sistem</span>
                  <p className="font-headline-md text-headline-md text-secondary font-bold mt-0.5">89.4%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Panel "Kondisi 2 Jam Ke Depan" (Span 5) */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-xl">update</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">
                  Kondisi 2 Jam Ke Depan
                </span>
              </div>
              <span className="font-label-md text-label-md px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-bold">
                Simulasi Timbulan
              </span>
            </div>

            {/* Kartu Sorotan Utama: TPS Pasar Besar */}
            <div className={`rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md transition-all border ${
              selectedHighlight === 'pasar-besar' ? 'ring-2 ring-primary border-primary' : 'border-surface-container/60'
            }`}>
              <div className="flex items-start justify-between gap-space-sm">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                      TPS Pasar Besar
                    </h3>
                    <span className="material-symbols-outlined text-error text-lg" title="Akan Penuh Segera">
                      warning
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Kawasan Perdagangan — Pasar Induk Kota
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded-lg bg-error-container text-on-error-container font-label-md text-label-md font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                    Risiko Tinggi
                  </span>
                  <span className="font-label-md text-label-md text-primary font-semibold">Keyakinan AI: 87%</span>
                </div>
              </div>

              {/* Metrik Komparasi Volume */}
              <div className="grid grid-cols-2 gap-space-md p-space-md rounded-xl bg-surface-container-low border border-surface-container/40">
                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-md text-label-md text-outline">Volume Saat Ini</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-data-metric text-data-metric text-on-surface font-bold">72%</span>
                    <span className="font-label-md text-label-md text-on-surface-variant font-medium">(10.8 m³)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>

                <div className="flex flex-col gap-space-xs">
                  <span className="font-label-md text-label-md text-error font-semibold">Prediksi 2 Jam Ke Depan</span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-data-metric text-data-metric text-error font-bold">91%</span>
                    <span className="font-label-md text-label-md text-error font-medium">(13.6 m³)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                    <div className="h-full bg-error rounded-full" style={{ width: '91%' }}></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-space-sm py-space-xs rounded-xl bg-error/10 text-error font-body-sm text-body-sm border border-error/20">
                <span className="flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-base">timer</span>
                  Perkiraan mencapai batas kapasitas:
                </span>
                <span className="font-bold">38 Menit</span>
              </div>

              {/* Tombol Aksi Utama & Sekunder */}
              <div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
                <button
                  onClick={() => onAddToPriority('TPS Pasar Besar')}
                  className="w-full sm:flex-1 py-2.5 px-space-md rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-space-xs hover:bg-primary transition-all shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">notification_important</span>
                  <span>Masukkan ke Prioritas</span>
                </button>
                <button
                  onClick={onOpenParametersModal}
                  className="w-full sm:w-auto py-2.5 px-space-md rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm font-medium hover:bg-surface-container transition-all flex items-center justify-center gap-space-xs border border-surface-container/40"
                >
                  <span className="material-symbols-outlined text-lg">tune</span>
                  <span>Lihat Parameter Timbulan</span>
                </button>
              </div>
            </div>

            {/* Kartu Tambahan 1: TPS Lowokwaru */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-shadow border border-surface-container/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <h4 className="font-title-sm text-title-sm text-on-surface font-bold">TPS Lowokwaru</h4>
                    <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                      Kawasan Kampus & Kos
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Saat ini: <strong className="text-on-surface">68%</strong> • Prediksi:{' '}
                    <strong className="text-error font-semibold">84% dalam 52 menit</strong>
                  </p>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-bold uppercase">
                  Risiko Tinggi
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-low overflow-hidden">
                <div className="h-full bg-error rounded-full" style={{ width: '84%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-surface-container/40">
                <span>Akurasi Model: 85%</span>
                <button
                  onClick={() => onAddToPriority('TPS Lowokwaru')}
                  className="text-primary hover:text-secondary font-bold flex items-center gap-0.5"
                >
                  + Tambah Prioritas
                </button>
              </div>
            </div>

            {/* Kartu Tambahan 2: TPS Sukun */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-shadow border border-surface-container/50">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-space-xs">
                    <h4 className="font-title-sm text-title-sm text-on-surface font-bold">TPS Sukun</h4>
                    <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                      Kawasan Permukiman Warga
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Saat ini: <strong className="text-on-surface">54%</strong> • Prediksi:{' '}
                    <strong className="text-tertiary font-semibold">67% dalam 1 jam 20 menit</strong>
                  </p>
                </div>
                <span className="px-space-sm py-0.5 rounded-full bg-surface-container text-tertiary font-label-md text-label-md font-bold uppercase">
                  Risiko Sedang
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-surface-container-low overflow-hidden">
                <div className="h-full bg-tertiary rounded-full" style={{ width: '67%' }}></div>
              </div>
              <div className="flex items-center justify-between text-xs text-on-surface-variant pt-1 border-t border-surface-container/40">
                <span>Akurasi Model: 81%</span>
                <button
                  onClick={() => onAddToPriority('TPS Sukun')}
                  className="text-primary hover:text-secondary font-bold flex items-center gap-0.5"
                >
                  + Tambah Prioritas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grafik Prediksi Volume Sampah (Waktu vs Volume) */}
        <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Perkiraan Volume Sampah (Waktu vs Volume)
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Simulasi trayek akumulasi beban TPS Pasar Besar sepanjang hari ini
              </p>
            </div>

            {/* Legenda Grafik */}
            <div className="flex flex-wrap items-center gap-space-md text-label-lg font-label-lg">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded bg-primary-container"></span>
                <span className="text-on-surface font-medium">Volume Aktual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-error"></span>
                <span className="text-on-surface font-medium">Volume Prediksi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-error"></span>
                <span className="text-error font-semibold">Batas Kapasitas Kritis (85%)</span>
              </div>
            </div>
          </div>

          {/* Inline SVG Visual Chart (Waktu vs Volume) */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[680px] h-72 relative flex flex-col justify-end">
              <svg className="w-full h-full" fill="none" viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="actualGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#047857" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.02" />
                  </linearGradient>
                  <linearGradient id="predGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ba1a1a" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Garis Grid Horizontal & Label Sumbu Vertikal */}
                <line stroke="#d3e4fe" strokeDasharray="3 3" x1="50" x2="740" y1="20" y2="20" />
                <text className="fill-on-surface-variant font-sans text-[11px]" x="15" y="24">100%</text>

                {/* Garis Batas Kritis 85% */}
                <line stroke="#ba1a1a" strokeDasharray="4 2" strokeWidth="1.5" x1="50" x2="740" y1="50" y2="50" />
                <text className="fill-error font-sans font-bold text-[11px]" x="15" y="54">85%</text>

                <line stroke="#eff4ff" strokeWidth="1.5" x1="50" x2="740" y1="95" y2="95" />
                <text className="fill-on-surface-variant font-sans text-[11px]" x="15" y="99">60%</text>

                <line stroke="#eff4ff" strokeWidth="1.5" x1="50" x2="740" y1="145" y2="145" />
                <text className="fill-on-surface-variant font-sans text-[11px]" x="15" y="149">35%</text>

                <line stroke="#bdc9c1" strokeWidth="1" x1="50" x2="740" y1="200" y2="200" />
                <text className="fill-on-surface-variant font-sans text-[11px]" x="25" y="204">0%</text>

                {/* Area Gradien Aktual (06:00 -> 10:30) */}
                <polygon fill="url(#actualGradient)" points="50,200 50,170 160,150 270,125 380,82 380,200" />

                {/* Area Gradien Prediksi (10:30 -> 18:00) */}
                <polygon fill="url(#predGradient)" points="380,200 380,82 490,42 600,32 710,18 710,200" />

                {/* Garis Volume Aktual (Tegas Hijau Emerald) */}
                <path d="M50,170 L160,150 L270,125 L380,82" stroke="#047857" strokeLinecap="round" strokeWidth="3" />

                {/* Titik-titik Aktual */}
                <circle cx="50" cy="170" fill="#047857" r="4" />
                <circle cx="160" cy="150" fill="#047857" r="4" />
                <circle cx="270" cy="125" fill="#047857" r="4" />

                {/* Posisi Saat Ini (10:30 - 72%) */}
                <circle cx="380" cy="82" fill="#047857" r="6" stroke="#ffffff" strokeWidth="2" />
                <text className="fill-primary font-sans font-bold text-[12px]" x="360" y="70">Saat Ini (72%)</text>
                <line stroke="#047857" strokeDasharray="2 2" x1="380" x2="380" y1="82" y2="200" />

                {/* Garis Volume Prediksi (Putus-putus Oranye/Merah) */}
                <path d="M380,82 L490,42 L600,32 L710,18" stroke="#ba1a1a" strokeDasharray="6 4" strokeLinecap="round" strokeWidth="2.5" />

                {/* Titik Temu Perkiraan Kritis (85% di 11:08) */}
                <circle cx="452" cy="50" fill="#ba1a1a" r="6" stroke="#ffffff" strokeWidth="2" />
                <text className="fill-error font-sans font-bold text-[11px]" x="440" y="38">Kritis 11:08 (38 mnt)</text>
                <circle cx="490" cy="42" fill="#ba1a1a" r="4" />
                <circle cx="600" cy="32" fill="#ba1a1a" r="4" />
                <circle cx="710" cy="18" fill="#ba1a1a" r="4" />

                {/* Sumbu Horizontal Label Waktu */}
                <text className="fill-on-surface-variant font-sans text-[12px]" x="40" y="222">06.00</text>
                <text className="fill-on-surface-variant font-sans text-[12px]" x="150" y="222">08.00</text>
                <text className="fill-on-surface-variant font-sans text-[12px]" x="260" y="222">10.00</text>
                <text className="fill-primary font-sans font-bold text-[12px]" x="370" y="222">10.30</text>
                <text className="fill-on-surface-variant font-sans text-[12px]" x="480" y="222">12.00</text>
                <text className="fill-on-surface-variant font-sans text-[12px]" x="590" y="222">14.00</text>
                <text className="fill-on-surface-variant font-sans text-[12px]" x="700" y="222">16.00</text>
              </svg>
            </div>
          </div>

          {/* Catatan Penting */}
          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm text-on-surface-variant border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-lg">info</span>
            <p className="font-body-sm text-body-sm font-medium">
              <strong>Catatan Penting:</strong> Prediksi merupakan alat bantu pengambilan keputusan dan tetap memerlukan validasi petugas di lapangan sebelum pengerahan armada khusus.
            </p>
          </div>
        </div>

        {/* Bagian Faktor Prediksi (Grid 7 Kartu Faktor) */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col">
            <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
              Variabel Algoritmik
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              7 Parameter Pembentuk Model Prediksi
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Perhitungan probabilitas titik jenuh menggunakan integrasi multi-faktor spasial dan telemetri langsung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-space-sm">
            {/* Faktor 1 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">history</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Riwayat Volume</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Grafik tren historis harian per hari pasar.
                </p>
              </div>
              <span className="font-label-md text-label-md text-secondary font-bold">Tercatat 90 Hari</span>
            </div>

            {/* Faktor 2 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">schedule</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Waktu Angkut</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Durasi sejak ritasi pengangkutan terakhir.
                </p>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-bold">4 Jam 18 Mnt Lalu</span>
            </div>

            {/* Faktor 3 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">inventory_2</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Kapasitas Tersisa</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Sisa ruang kontainer dalam m³ & tonase.
                </p>
              </div>
              <span className="font-label-md text-label-md text-error font-bold">Tersisa 4.2 m³</span>
            </div>

            {/* Faktor 4 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">speed</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Laju Timbulan</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Kg per jam berdasarkan dinamika pedagang.
                </p>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-bold">~140 Kg/Jam</span>
            </div>

            {/* Faktor 5 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">storefront</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Karakteristik Kawasan</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Profil pasar basah, sentra kuliner, kampus.
                </p>
              </div>
              <span className="font-label-md text-label-md text-secondary font-bold">Perniagaan Padat</span>
            </div>

            {/* Faktor 6 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">event_upcoming</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Pola Waktu</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Puncak pasokan pagi, akhir pekan & libur.
                </p>
              </div>
              <span className="font-label-md text-label-md text-on-surface font-bold">Puncak Jam Pagi</span>
            </div>

            {/* Faktor 7 */}
            <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:-translate-y-1 transition-transform border border-surface-container/50">
              <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">sensors</span>
              </div>
              <div>
                <h4 className="font-title-sm text-title-sm text-on-surface font-bold">Sensor Terpasang</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-xs">
                  Ultrasonic volume & berat terintegrasi IoT.
                </p>
              </div>
              <span className="font-label-md text-label-md text-secondary font-bold">IoT Aktif (Online)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
