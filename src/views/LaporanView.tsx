import React, { useState } from 'react';

export const LaporanView: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      
      // Generate clean textual report blob
      const reportContent = `=====================================================
LAPORAN EKSEKUTIF KINERJA LOGISTIK PERSAMPAHAN
SWALON - KOTA MALANG
Tanggal Cetak: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
=====================================================

1. RINGKASAN OPERASIONAL:
   - Total Ritasi Hari Ini: 86 Rit (Target: 90 Rit)
   - Ketepatan Waktu: 92.4% (Tepat Waktu)
   - Total Tonase Terangkut: 142.8 Ton
   - Reduksi Emisi CO2: -22.4% (Efisiensi 428 km)
   - Waktu Respon Overflow: 18.2 Menit

2. STATUS SIMPUL UTAMA:
   - TPS Pasar Besar: Kritis (91% Volume, 2.4 Ton) - OTW Penanganan
   - TPS Lowokwaru: Risiko Tinggi (84% Volume, 1.9 Ton)
   - TPS Sukun: Normal-Waspada (67% Volume, 1.2 Ton)
   - Fasilitas A (Blimbing): Kuota Tersedia 32% (3.8 Ton)
   - Fasilitas B (Kedungkandang): Kuota Tersedia 18% (1.4 Ton)
   - TPA Supit Urang: Sanitary Landfill Aktif

3. ARMADA AKTIF:
   - 18 dari 24 Truk Beroperasi Penuh (75% Utilitas)
   - Konsumsi Solar Rata-rata: 4.2 km/L

Diterbitkan oleh: Pusat Kendali SWALON Kota Malang
Otorisasi: Dinas Lingkungan Hidup (DLH) Kota Malang
=====================================================`;

      const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SWALON_Laporan_Operasional_Malang_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Laporan & Kinerja Operasional
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                KOTA MALANG REKAP BULANAN
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
              Analisis ritasi, ketepatan waktu pengangkutan, penurunan emisi karbon armada, dan diversifikasi limbah daur ulang.
            </p>
          </div>

          <button
            onClick={handleExportReport}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-xs sm:text-title-sm font-semibold hover:bg-tertiary-container shadow-md transition-all active:scale-95"
          >
            <span className={`material-symbols-outlined text-base ${isExporting ? 'animate-spin' : ''}`}>
              {isExporting ? 'sync' : 'download'}
            </span>
            <span>{isExporting ? 'Menyiapkan Laporan...' : 'Unduh Laporan Operasional'}</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-space-md">
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Total Ritasi Hari Ini</span>
            <div className="font-data-metric text-data-metric text-on-surface font-bold">86 Rit</div>
            <span className="text-xs text-secondary font-semibold">92% tepat waktu target operasi</span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Tonase Terangkut</span>
            <div className="font-data-metric text-data-metric text-primary font-bold">142.8 Ton</div>
            <span className="text-xs text-on-surface-variant">Rata-rata 1.66 Ton per rit</span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Reduksi Emisi CO₂</span>
            <div className="font-data-metric text-data-metric text-secondary font-bold">-22.4%</div>
            <span className="text-xs text-secondary font-semibold">Penghematan 428 km rute armada</span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Indeks Respon Overflow</span>
            <div className="font-data-metric text-data-metric text-on-surface font-bold">18.2 Menit</div>
            <span className="text-xs text-secondary font-semibold">Dari deteksi sensor hingga armada tiba</span>
          </div>
        </div>

        {/* Hourly Trend Section */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-surface-container/60">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                Distribusi Ritasi Pengangkutan per Jam
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Grafik perbandingan pengangkutan aktual vs kapasitas puncak armada
              </p>
            </div>
            <span className="font-label-md text-label-md text-primary font-bold">
              Shift Pagi Terpadu (06:00 - 14:00)
            </span>
          </div>

          <div className="h-64 w-full flex items-end gap-3 pt-6 pb-2 px-2 bg-surface-container-low/40 rounded-xl border border-surface-container/40">
            {[
              { hour: '06:00', rit: 8, height: '40%' },
              { hour: '07:00', rit: 14, height: '70%' },
              { hour: '08:00', rit: 18, height: '90%' },
              { hour: '09:00', rit: 16, height: '80%' },
              { hour: '10:00', rit: 12, height: '60%' },
              { hour: '11:00', rit: 9, height: '45%' },
              { hour: '12:00', rit: 5, height: '25%' },
              { hour: '13:00', rit: 4, height: '20%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                <span className="text-[11px] font-bold text-on-surface group-hover:text-primary">{bar.rit} rit</span>
                <div
                  className="w-full bg-primary-container hover:bg-primary rounded-t-lg transition-all"
                  style={{ height: bar.height }}
                />
                <span className="text-xs text-outline">{bar.hour}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
