import React from 'react';
import { FleetVehicle } from '../types';

interface ArmadaViewProps {
  fleet: FleetVehicle[];
  onOpenDriverPhone: () => void;
  onDispatchFleet: (fleetId: string) => void;
}

export const ArmadaView: React.FC<ArmadaViewProps> = ({
  fleet,
  onOpenDriverPhone,
  onDispatchFleet
}) => {
  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Manajemen Armada Truk
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                18 / 24 BEROPERASI
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
              Pemantauan status operasional armada compactor, dump truck hidrolik, dan arm roll pengangkut sampah Kota Malang.
            </p>
          </div>

          <button
            onClick={onOpenDriverPhone}
            className="flex items-center gap-1.5 px-3 sm:px-space-md py-2 sm:py-space-sm rounded-xl bg-primary text-on-primary font-title-sm text-xs sm:text-title-sm font-semibold hover:bg-tertiary-container shadow-md transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base sm:text-lg">smartphone</span>
            <span>Buka Simulasi Ponsel Petugas</span>
          </button>
        </div>

        {/* 4 Summary Cards (2 cols on mobile, 4 cols on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-space-md">
          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/60">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Total Armada Aktif
              </span>
              <div className="font-data-metric text-data-metric text-on-surface font-bold mt-1">18 Unit</div>
              <span className="text-xs text-secondary font-semibold">75% tingkat utilitas</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/60">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Kapasitas Angkut Total
              </span>
              <div className="font-data-metric text-data-metric text-primary font-bold mt-1">126 Ton</div>
              <span className="text-xs text-on-surface-variant">Daya tampung rotasi 1 hari</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">fitness_center</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/60">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Efisiensi Bahan Bakar
              </span>
              <div className="font-data-metric text-data-metric text-secondary font-bold mt-1">4.2 km / L</div>
              <span className="text-xs text-secondary font-semibold">-18% konsumsi solar via optimasi rute</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_gas_station</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/60">
            <div>
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Jadwal Servis Berkala
              </span>
              <div className="font-data-metric text-data-metric text-on-surface font-bold mt-1">2 Unit</div>
              <span className="text-xs text-on-surface-variant">Depot Bengkel Gadang</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">build</span>
            </div>
          </div>
        </div>

        {/* Fleet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {fleet.map((v) => (
            <div
              key={v.id}
              className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60 gap-space-md"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary font-bold">
                      <span className="material-symbols-outlined text-2xl">local_shipping</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{v.id}</h3>
                      <p className="font-label-md text-label-md text-on-surface-variant font-mono">{v.plate}</p>
                    </div>
                  </div>
                  <span className="px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold">
                    {v.status}
                  </span>
                </div>

                <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container/40">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">Tipe Kendaraan:</span>
                    <span className="font-bold text-on-surface">{v.type}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">Pengemudi:</span>
                    <span className="font-bold text-on-surface">{v.driverName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">Muatan Saat Ini:</span>
                    <span className="font-bold text-primary">{v.currentLoadTons} / {v.maxCapacityTons} Ton</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">Posisi GPS:</span>
                    <span className="font-medium text-on-surface truncate max-w-[180px]">{v.currentLocation}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-on-surface-variant font-medium">Bahan Bakar:</span>
                    <span className="font-bold text-secondary">{v.fuelPercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container/60">
                <button
                  onClick={onOpenDriverPhone}
                  className="flex-1 py-2 px-3 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container font-title-sm text-title-sm font-medium transition-colors text-center"
                >
                  Lihat Ponsel
                </button>
                <button
                  onClick={() => onDispatchFleet(v.id)}
                  className="flex-1 py-2 px-3 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-title-sm text-title-sm font-semibold transition-colors text-center shadow-sm"
                >
                  Tugaskan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
