import React, { useState } from 'react';

interface PengaturanViewProps {
  onSaveToast?: (title: string, message: string) => void;
}

export const PengaturanView: React.FC<PengaturanViewProps> = ({ onSaveToast }) => {
  const [telemetryInterval, setTelemetryInterval] = useState('30');
  const [criticalThreshold, setCriticalThreshold] = useState('85');
  const [autoDispatchEnabled, setAutoDispatchEnabled] = useState(true);
  const [pushNotificationSound, setPushNotificationSound] = useState(true);

  const handleSave = () => {
    if (onSaveToast) {
      onSaveToast(
        'Pengaturan Disimpan',
        `Konfigurasi diperbarui: Interval ${telemetryInterval}s, Ambang Kritis ${criticalThreshold}%, Auto-Dispatch ${autoDispatchEnabled ? 'Aktif' : 'Nonaktif'}.`
      );
    }
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Pengaturan Sistem & Telemetri
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                SWALON ENGINE V2.4
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
              Konfigurasi ambang batas peringatan dini, siklus sinkronisasi IoT, dan integrasi pengemudi lapangan.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-xs sm:text-title-sm font-semibold hover:bg-tertiary-container shadow-md transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base">save</span>
            <span>Simpan Perubahan</span>
          </button>
        </div>

        {/* Setting Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {/* Telemetry & Sampling */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-surface-container/60">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">sensors</span>
              <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                Telemetri Sensor IoT Kota Malang
              </h3>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">
                  Frekuensi Sinkronisasi Data (Detik):
                </label>
                <select
                  value={telemetryInterval}
                  onChange={(e) => setTelemetryInterval(e.target.value)}
                  className="px-3 py-2 bg-surface-container-low rounded-xl text-sm border border-surface-container focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="15">15 Detik (Ultra Real-Time)</option>
                  <option value="30">30 Detik (Standar Prototipe)</option>
                  <option value="60">60 Detik (Hemat Bandwidth)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-on-surface">
                  Batas Ambang Kritis Status Penuh (%):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="70"
                    max="95"
                    value={criticalThreshold}
                    onChange={(e) => setCriticalThreshold(e.target.value)}
                    className="flex-1 accent-primary cursor-pointer"
                  />
                  <span className="font-bold text-error text-sm">{criticalThreshold}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Dispatch & Notifications */}
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-surface-container/60">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-xl">alt_route</span>
              <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                Otomasi Dispatch & Peringatan Lapangan
              </h3>
            </div>

            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
                <div>
                  <span className="text-xs font-bold text-on-surface block">Rekomendasi Auto-Dispatch</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Sistem otomatis menyarankan armada terdekat saat TPS melebihi batas
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={autoDispatchEnabled}
                  onChange={(e) => setAutoDispatchEnabled(e.target.checked)}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-xl">
                <div>
                  <span className="text-xs font-bold text-on-surface block">Suara Notifikasi Darurat</span>
                  <span className="text-[11px] text-on-surface-variant">
                    Bunyi sirene digital pada konsol saat ambang darurat 90% terlampaui
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={pushNotificationSound}
                  onChange={(e) => setPushNotificationSound(e.target.checked)}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
