import React, { useState } from 'react';
import { TPSNode } from '../types';

interface JaringanViewProps {
  nodes: TPSNode[];
  onOpenDetailModal: (node: TPSNode) => void;
  onDispatchNode: (node: TPSNode) => void;
}

export const JaringanView: React.FC<JaringanViewProps> = ({
  nodes,
  onOpenDetailModal,
  onDispatchNode
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<string>('Semua');

  const subdistricts = ['Semua', 'Klojen', 'Lowokwaru', 'Sukun', 'Kedungkandang', 'Blimbing'];

  const filteredNodes = nodes.filter((n) => {
    const matchSearch = n.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      n.subdistrict.toLowerCase().includes(searchFilter.toLowerCase());
    const matchSub = selectedSubdistrict === 'Semua' || n.subdistrict.toLowerCase().includes(selectedSubdistrict.toLowerCase());
    return matchSearch && matchSub;
  });

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Jaringan Simpul Persampahan
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                18 TPS & FASILITAS KOTA MALANG
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
              Direktori menyeluruh sensor IoT, tingkat keterisian kapasitas, dan riwayat ritasi seluruh TPS di 5 kecamatan Kota Malang.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <span className="px-space-md py-space-xs rounded-xl bg-primary-fixed/30 text-on-primary-fixed font-label-md text-label-md font-bold flex items-center gap-1.5 border border-primary-fixed">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Semua Sensor IoT Aktif
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-surface-container/60">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {subdistricts.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubdistrict(sub)}
                className={`px-space-md py-1.5 rounded-xl font-label-md text-label-md transition-all whitespace-nowrap ${
                  selectedSubdistrict === sub
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-lg">search</span>
            <input
              type="text"
              placeholder="Cari TPS atau alamat..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
            />
          </div>
        </div>

        {/* Node Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {filteredNodes.map((node) => {
            const isCritical = node.fillPercentage >= 85;
            const isHigh = node.fillPercentage >= 70 && node.fillPercentage < 85;

            return (
              <div
                key={node.id}
                className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-surface-container/60 gap-space-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-title-sm text-title-sm font-bold text-on-surface">{node.name}</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{node.subdistrict}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold uppercase ${
                      isCritical ? 'bg-error-container text-error' : isHigh ? 'bg-amber-100 text-amber-800' : 'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {node.status}
                    </span>
                  </div>

                  <div className="mt-space-md p-space-sm rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container/40">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-on-surface-variant font-medium">Keterisian:</span>
                      <span className={`font-bold ${isCritical ? 'text-error' : 'text-on-surface'}`}>
                        {node.fillPercentage}% ({node.weightTons} Ton)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          isCritical ? 'bg-error' : isHigh ? 'bg-amber-500' : 'bg-primary-container'
                        }`}
                        style={{ width: `${node.fillPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-on-surface-variant pt-1">
                      <span>Waktu ke penuh: <strong>{node.etaToFull}</strong></span>
                      <span className="text-secondary font-medium">IoT: {node.sensorStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-space-sm pt-space-xs border-t border-surface-container/60">
                  <button
                    onClick={() => onOpenDetailModal(node)}
                    className="flex-1 py-2 px-3 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container font-title-sm text-title-sm font-medium transition-colors text-center"
                  >
                    Detail
                  </button>
                  <button
                    onClick={() => onDispatchNode(node)}
                    className="flex-1 py-2 px-3 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-title-sm text-title-sm font-semibold transition-colors text-center shadow-sm"
                  >
                    Dispatch
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
