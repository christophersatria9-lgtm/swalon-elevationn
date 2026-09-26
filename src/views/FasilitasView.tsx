import React, { useState } from 'react';
import { Facility } from '../types';
import { FacilityTelemetryModal } from '../components/FacilityTelemetryModal';

interface FasilitasViewProps {
  facilities: Facility[];
}

export const FasilitasView: React.FC<FasilitasViewProps> = ({ facilities }) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);

  const handleOpenTelemetry = (fac: Facility) => {
    setSelectedFacility(fac);
    setIsTelemetryModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Fasilitas Pengolahan & TPA
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                INFRASTRUKTUR PERSAMPAHAN KOTA MALANG
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
              Pemantauan daya tampung harian, kuota material terpilah, dan aliran residu ke TPA Supit Urang.
            </p>
          </div>

          <div className="flex items-center gap-space-xs px-space-md py-space-sm rounded-xl bg-primary-fixed/30 text-on-primary-fixed font-label-md text-label-md font-bold border border-primary-fixed">
            <span className="material-symbols-outlined text-base text-primary">eco</span>
            Divergensi Residu dari TPA: 38.6%
          </div>
        </div>

        {/* 3 Facility Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {facilities.map((fac) => {
            const isFull = fac.capacityPercentage >= 80;
            return (
              <div
                key={fac.id}
                className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-surface-container/60 gap-space-md"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-label-md text-label-md uppercase tracking-wider text-outline font-semibold">
                        {fac.subdistrict}
                      </span>
                      <h3 className="font-headline-md text-headline-md font-bold text-on-surface mt-0.5">
                        {fac.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{fac.type}</p>
                    </div>
                    <span className={`px-space-sm py-1 rounded-full text-xs font-bold ${
                      isFull ? 'bg-amber-100 text-amber-800' : 'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {fac.status}
                    </span>
                  </div>

                  <div className="mt-space-md p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container/40">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-on-surface-variant font-medium">Kapasitas Terpakai:</span>
                      <span className="font-data-metric text-headline-md font-bold text-on-surface">
                        {fac.capacityPercentage}%
                      </span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-surface-container-highest overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isFull ? 'bg-amber-500' : 'bg-primary-container'}`}
                        style={{ width: `${fac.capacityPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-on-surface-variant pt-1">
                      <span>Sisa Kuota: <strong className="text-primary font-bold">{fac.quotaRemaining}</strong></span>
                      <span>Masuk Hari Ini: <strong>{fac.todayIncomingTons} Ton</strong></span>
                    </div>
                  </div>

                  <div className="mt-space-sm p-space-sm rounded-xl bg-surface-container-low/60 flex items-start gap-2 text-xs border border-surface-container/30">
                    <span className="material-symbols-outlined text-primary text-base mt-0.5">category</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">Fraksi Material Diterima:</span>
                      <span className="text-on-surface-variant">{fac.materialsAccepted}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-space-xs border-t border-surface-container/60">
                  <button
                    onClick={() => handleOpenTelemetry(fac)}
                    className="w-full py-2.5 px-space-md rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-sm text-title-sm font-semibold transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base text-primary">scale</span>
                    <span>Periksa Telemetri Jembatan Timbang</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <FacilityTelemetryModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
        facility={selectedFacility}
      />
    </div>
  );
};
