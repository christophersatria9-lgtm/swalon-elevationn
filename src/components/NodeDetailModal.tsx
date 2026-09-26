import React from 'react';
import { TPSNode } from '../types';

interface NodeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: TPSNode | null;
  onDispatch: (node: TPSNode) => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({
  isOpen,
  onClose,
  node,
  onDispatch
}) => {
  if (!isOpen || !node) return null;

  const isCritical = node.fillPercentage >= 85;
  const isHigh = node.fillPercentage >= 70 && node.fillPercentage < 85;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full p-space-lg shadow-2xl flex flex-col gap-space-md border border-surface-container">
        {/* Detail Header */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-space-xs">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isCritical ? 'bg-error-container text-error' : 'bg-primary-fixed text-primary'
            }`}>
              <span className="material-symbols-outlined text-xl">insights</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                {node.name}
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                {node.subdistrict}
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

        {/* Detail Body */}
        <div className="flex flex-col gap-space-sm">
          <div className="grid grid-cols-2 gap-space-xs">
            <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col border border-surface-container/40">
              <span className="text-xs text-on-surface-variant font-label-md">Tingkat Keterisian</span>
              <span className={`font-data-metric text-data-metric mt-0.5 ${
                isCritical ? 'text-error' : isHigh ? 'text-amber-600' : 'text-secondary'
              }`}>
                {node.fillPercentage}%
              </span>
            </div>
            <div className="p-space-sm rounded-xl bg-surface-container-low flex flex-col border border-surface-container/40">
              <span className="text-xs text-on-surface-variant font-label-md">Status Operasional</span>
              <span className="font-title-sm text-title-sm text-on-surface font-semibold mt-1 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${
                  isCritical ? 'bg-error animate-ping' : isHigh ? 'bg-amber-500' : 'bg-secondary'
                }`}></span>
                {node.status}
              </span>
            </div>
          </div>

          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-2 text-xs border border-surface-container/40">
            <div className="flex justify-between py-0.5 border-b border-surface-container/50">
              <span className="text-on-surface-variant">Estimasi Berat:</span>
              <span className="font-semibold text-on-surface">{node.weightTons} Ton</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-surface-container/50">
              <span className="text-on-surface-variant">Jendela Waktu / ETA:</span>
              <span className={`font-semibold ${isCritical ? 'text-error font-bold' : 'text-on-surface'}`}>
                {node.etaToFull}
              </span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-surface-container/50">
              <span className="text-on-surface-variant">Kecamatan:</span>
              <span className="font-semibold text-on-surface">{node.subdistrict}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-on-surface-variant">Sensor Terpasang:</span>
              <span className="font-semibold text-secondary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Ultrasonik IoT ({node.sensorStatus})
              </span>
            </div>
          </div>

          {/* Mini Sparkline Metric */}
          <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-low/60 flex flex-col gap-1 border border-surface-container/30">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-label-md">Tren Akumulasi 6 Jam Terakhir</span>
              <span className="font-label-md text-label-md text-primary font-bold">Laju Regresi Stabil</span>
            </div>
            <div className="h-12 w-full flex items-end gap-1.5 pt-2">
              {node.dailyTrend.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                  <div 
                    className={`w-full rounded-t transition-all ${
                      val >= 85 ? 'bg-error' : val >= 70 ? 'bg-amber-500' : 'bg-primary-container'
                    }`}
                    style={{ height: `${val}%` }}
                  />
                  <div className="absolute -top-7 hidden group-hover:flex bg-inverse-surface text-inverse-on-surface text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                    {val}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-outline pt-1">
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>Saat Ini</span>
            </div>
          </div>
        </div>

        {/* Detail Footer */}
        <div className="flex items-center justify-end gap-space-sm pt-space-xs border-t border-surface-container/60">
          <button
            className="py-space-sm px-space-md rounded-xl bg-surface-container-low text-on-surface font-title-sm text-title-sm hover:bg-surface-container transition-colors"
            onClick={onClose}
          >
            Tutup
          </button>
          <button
            className="py-space-sm px-space-md rounded-xl bg-primary-container text-on-primary hover:bg-primary font-title-sm text-title-sm font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
            onClick={() => {
              onClose();
              onDispatch(node);
            }}
          >
            <span className="material-symbols-outlined text-base">alt_route</span>
            <span>Dispatch Truk</span>
          </button>
        </div>
      </div>
    </div>
  );
};
