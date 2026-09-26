import React from 'react';

interface DispatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  truckId: string;
  targetName: string;
  eta: string;
  destination: string;
  onConfirm: () => void;
}

export const DispatchModal: React.FC<DispatchModalProps> = ({
  isOpen,
  onClose,
  truckId,
  targetName,
  eta,
  destination,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/45 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-0 pb-1">
          <div className="flex items-center gap-space-xs text-primary">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                Konfirmasi Penugasan Armada
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Instruksi Terpadu Navigasi Pengemudi
              </p>
            </div>
          </div>
          <button
            className="p-space-xs rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-space-sm py-space-xs">
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/50">
            <div className="flex justify-between items-center py-1 border-b border-surface-container/60">
              <span className="text-on-surface-variant font-body-sm font-medium">Unit Armada:</span>
              <span className="font-title-sm text-title-sm text-primary font-bold">{truckId}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-surface-container/60">
              <span className="text-on-surface-variant font-body-sm font-medium">Target Penjemputan:</span>
              <span className="font-title-sm text-title-sm text-error font-semibold">{targetName}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-surface-container/60">
              <span className="text-on-surface-variant font-body-sm font-medium">Perkiraan Waktu Tiba:</span>
              <span className="font-title-sm text-title-sm text-secondary font-semibold">{eta}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-on-surface-variant font-body-sm font-medium">Tujuan Pembuangan/Olah:</span>
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">{destination}</span>
            </div>
          </div>

          <div className="flex items-start gap-space-xs p-space-sm rounded-xl bg-secondary-container/25 text-xs text-on-surface-variant border border-secondary-container/40">
            <span className="material-symbols-outlined text-secondary text-base mt-0.5">
              satellite_alt
            </span>
            <p className="leading-relaxed">
              Perintah dispatch langsung dikirimkan ke aplikasi navigasi ponsel pengemudi (Bambang Mulyono) secara real-time via jaringan telemetri SWALON.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container/60">
          <button
            className="py-space-sm px-space-md rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors font-title-sm text-title-sm font-medium"
            onClick={onClose}
          >
            Batalkan
          </button>
          <button
            className="py-space-sm px-space-lg rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all font-title-sm text-title-sm font-semibold flex items-center gap-1.5 shadow-md active:scale-[0.98]"
            onClick={onConfirm}
          >
            <span className="material-symbols-outlined text-base">send</span>
            <span>Konfirmasi Penugasan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
