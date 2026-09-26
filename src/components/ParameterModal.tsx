import React from 'react';

interface ParameterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParameterModal: React.FC<ParameterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-gutter animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container">
        {/* Header */}
        <div className="flex items-center justify-between pb-space-xs border-b border-surface-container/60">
          <div className="flex items-center gap-space-xs">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">tune</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Parameter Prediksi Rinci
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Metrik Algoritma SWALON-Forecasting v4.2
              </p>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-space-sm font-body-sm text-body-sm">
          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container/40">
            <span className="text-on-surface-variant font-medium">Titik Pemantauan</span>
            <span className="font-bold text-on-surface">TPS Pasar Besar (ID: MLG-TPS-009)</span>
          </div>

          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container/40">
            <span className="text-on-surface-variant font-medium">Laju Akumulasi Rata-rata</span>
            <span className="font-bold text-on-surface">142.6 kg/jam</span>
          </div>

          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container/40">
            <span className="text-on-surface-variant font-medium">Faktor Bobot Pasar Basah</span>
            <span className="font-bold text-secondary">x 1.45 (Organik Dominan)</span>
          </div>

          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container/40">
            <span className="text-on-surface-variant font-medium">Tingkat Keyakinan Regresi</span>
            <span className="font-bold text-primary font-mono">R² = 0.942</span>
          </div>

          <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container/40">
            <span className="text-on-surface-variant font-medium">Rekomendasi Armada</span>
            <span className="font-bold text-on-surface">Compactor 8m³ / Dump 6-Roda (Shift Siang)</span>
          </div>

          <div className="p-space-sm rounded-xl bg-primary-fixed/20 border border-primary-fixed flex items-start gap-2 text-xs">
            <span className="material-symbols-outlined text-primary text-base mt-0.5">verified</span>
            <p className="text-on-surface">
              Perhitungan diperbarui secara otomatis setiap siklus 60 detik mengintegrasikan sensor IoT ultrasonik, jadwal ritasi, dan indeks lalu lintas harian Kota Malang.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-space-xs border-t border-surface-container/60">
          <button
            className="px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold hover:bg-primary transition-all shadow-sm"
            onClick={onClose}
          >
            Tutup Rincian
          </button>
        </div>
      </div>
    </div>
  );
};
