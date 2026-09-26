import React, { useState } from 'react';
import { Facility } from '../types';

interface FacilityTelemetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility | null;
}

export const FacilityTelemetryModal: React.FC<FacilityTelemetryModalProps> = ({
  isOpen,
  onClose,
  facility
}) => {
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [scaleZero, setScaleZero] = useState(true);

  if (!isOpen || !facility) return null;

  const handleCalibrate = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setScaleZero(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/45 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 border border-surface-container my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">scale</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                Telemetri Jembatan Timbang Digital
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                {facility.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Digital Scale Display */}
        <div className="p-4 rounded-2xl bg-slate-950 text-emerald-400 font-mono flex flex-col items-center justify-center gap-1 border-2 border-slate-800 shadow-inner">
          <span className="text-[11px] text-slate-400 uppercase tracking-widest">
            INDIKATOR LOAD CELL OTOMATIS (SNI 05-7111)
          </span>
          <div className="text-4xl font-bold tracking-wider py-1">
            {scaleZero ? '0.00' : '5.42'} <span className="text-xl font-normal text-emerald-200">TON</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Tare: 0.00
            </span>
            <span>•</span>
            <span>Status: Siap Menimbang Truk</span>
            <span>•</span>
            <span>Deviasi: ±0.02%</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/40 flex flex-col gap-0.5">
            <span className="text-on-surface-variant font-medium">Total Masuk Hari Ini:</span>
            <span className="font-bold text-base text-primary">{facility.todayIncomingTons} Ton</span>
            <span className="text-[10px] text-secondary">38 Ritasi telah diverifikasi</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/40 flex flex-col gap-0.5">
            <span className="text-on-surface-variant font-medium">Sisa Daya Tampung:</span>
            <span className="font-bold text-base text-on-surface">{facility.quotaRemaining}</span>
            <span className="text-[10px] text-on-surface-variant">Kapasitas terpakai {facility.capacityPercentage}%</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/40 flex flex-col gap-0.5">
            <span className="text-on-surface-variant font-medium">Fraksi Utama:</span>
            <span className="font-bold text-on-surface">{facility.materialsAccepted}</span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container/40 flex flex-col gap-0.5">
            <span className="text-on-surface-variant font-medium">Sertifikat Tera Metrologi:</span>
            <span className="font-bold text-secondary">Aktif (Berlaku s/d Des 2026)</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-container/60">
          <button
            onClick={handleCalibrate}
            disabled={isCalibrating}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <span className={`material-symbols-outlined text-sm ${isCalibrating ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isCalibrating ? 'Mengalibrasi Sensor...' : 'Kalibrasi Titik Nol (Zero)'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary-container text-on-primary font-bold text-xs hover:bg-primary transition-all shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
