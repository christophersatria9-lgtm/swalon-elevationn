import React from 'react';
import { LiveAlert } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: LiveAlert[];
  onSelectAlert: (alert: LiveAlert) => void;
  onClearAll: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onSelectAlert,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-inverse-surface/30 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-surface-container-lowest shadow-2xl flex flex-col border-l border-surface-container">
        {/* Header */}
        <div className="p-space-lg flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-2xl">notifications_active</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Pusat Notifikasi
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Peringatan Langsung & Log Telemetri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-space-xs rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Action bar */}
        <div className="px-space-lg py-space-sm bg-surface-container-low flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-medium">
            {alerts.length} Notifikasi Aktif
          </span>
          <button
            onClick={onClearAll}
            className="text-primary hover:text-secondary font-bold hover:underline"
          >
            Tandai Semua Dibaca
          </button>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-sm">
          {alerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-on-surface-variant gap-2">
              <span className="material-symbols-outlined text-4xl text-outline">done_all</span>
              <p className="font-body-md text-body-md">Tidak ada notifikasi baru</p>
              <span className="text-xs text-outline">Seluruh simpul jaringan dalam batas toleransi aman.</span>
            </div>
          ) : (
            alerts.map((alt) => (
              <div
                key={alt.id}
                onClick={() => {
                  onSelectAlert(alt);
                  onClose();
                }}
                className={`p-space-md rounded-xl cursor-pointer transition-all border ${
                  alt.severity === 'darurat'
                    ? 'bg-error-container/20 border-error-container hover:bg-error-container/30'
                    : alt.severity === 'peringatan'
                    ? 'bg-amber-50 border-amber-200 hover:bg-amber-100/70'
                    : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        alt.severity === 'darurat'
                          ? 'bg-error animate-ping'
                          : alt.severity === 'peringatan'
                          ? 'bg-amber-500'
                          : 'bg-secondary'
                      }`}
                    />
                    <span className="font-title-sm text-title-sm font-bold text-on-surface">
                      {alt.nodeName}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface-variant">{alt.time}</span>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface mt-1 leading-snug">
                  {alt.message}
                </p>

                <div className="flex items-center justify-between text-xs text-on-surface-variant pt-2 mt-1 border-t border-black/5">
                  <span className="font-medium">Prediksi muatan: {alt.predictedTons} Ton</span>
                  <span className="text-primary font-bold flex items-center gap-0.5">
                    {alt.actionLabel}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-space-md bg-surface-container-low border-t border-surface-container text-xs text-on-surface-variant text-center">
          Telemetri disinkronisasi setiap 30 detik dari 18 sensor ultrasonik IoT Kota Malang.
        </div>
      </div>
    </div>
  );
};
