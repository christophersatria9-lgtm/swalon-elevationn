import React, { useState } from 'react';

interface PembelajaranViewProps {
  onSaveToast?: (title: string, message: string) => void;
}

export const PembelajaranView: React.FC<PembelajaranViewProps> = ({ onSaveToast }) => {
  const [learningRate, setLearningRate] = useState<number>(0.85);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);
  const [cumulativeAccuracy, setCumulativeAccuracy] = useState<number>(96.7);
  const [iterationCount, setIterationCount] = useState<number>(1420);

  const [calibrationHistory, setCalibrationHistory] = useState([
    {
      id: 'cal-1',
      date: '25 Sep 2026 12:00',
      node: 'TPS Pasar Besar',
      predicted: '2.4 Ton',
      actual: '2.32 Ton',
      delta: '-3.3%',
      action: 'Penyesuaian bobot faktor sentra komersial (-0.02)'
    },
    {
      id: 'cal-2',
      date: '25 Sep 2026 10:30',
      node: 'TPS Lowokwaru',
      predicted: '1.9 Ton',
      actual: '1.95 Ton',
      delta: '+2.6%',
      action: 'Koreksi lonjakan akhir pekan kos mahasiswa (+0.03)'
    },
    {
      id: 'cal-3',
      date: '25 Sep 2026 08:15',
      node: 'TPS Sukun',
      predicted: '1.2 Ton',
      actual: '1.18 Ton',
      delta: '-1.6%',
      action: 'Bobot model dipertahankan (Presisi tinggi >98%)'
    }
  ]);

  const handleRunCalibration = () => {
    setIsCalibrating(true);
    setTimeout(() => {
      setIsCalibrating(false);
      setCumulativeAccuracy(prev => +(prev + 0.3).toFixed(1));
      setIterationCount(prev => prev + 1);

      const newLog = {
        id: `cal-${Date.now()}`,
        date: 'Baru saja',
        node: 'TPS Pasar Besar',
        predicted: '2.35 Ton',
        actual: '2.32 Ton',
        delta: '-1.2%',
        action: 'Optimalisasi parameter heuristik VRP-Greedy selesai'
      };

      setCalibrationHistory(prev => [newLog, ...prev]);

      if (onSaveToast) {
        onSaveToast(
          'Kalibrasi Heuristik Berhasil',
          `Model SWALON Learning Engine diperbarui. Akurasi kumulatif meningkat menjadi ${(cumulativeAccuracy + 0.3).toFixed(1)}%.`
        );
      }
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="p-3 sm:p-4 md:p-6 lg:p-gutter-lg flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-headline-xl text-2xl sm:text-headline-xl text-on-surface font-bold tracking-tight">
                Pembelajaran Mesin & Koreksi Heuristik
              </span>
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface-variant font-label-md text-[10px] sm:text-label-md uppercase tracking-wider font-semibold">
                SIKLUS LANGKAH 06 & 07
              </span>
            </div>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-3xl">
              Keputusan berikutnya diperbaiki secara adaptif berdasarkan evaluasi tonase riil jembatan timbang dan waktu tempuh GPS aktual armada.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunCalibration}
              disabled={isCalibrating}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary font-title-sm text-xs sm:text-title-sm font-semibold hover:bg-tertiary-container shadow-md transition-all active:scale-95 disabled:opacity-75"
            >
              <span className={`material-symbols-outlined text-base ${isCalibrating ? 'animate-spin' : ''}`}>
                auto_fix_high
              </span>
              <span>{isCalibrating ? 'Mengalibrasi Model...' : 'Jalankan Kalibrasi Ulang'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-space-xs px-space-md py-space-sm rounded-xl bg-secondary-container/40 text-on-secondary-container font-label-md text-label-md font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Auto-Adaptive Aktif
            </div>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Akurasi Prediksi Kumulatif</span>
            <div className="font-data-metric text-data-metric text-primary font-bold">{cumulativeAccuracy}%</div>
            <span className="text-xs text-secondary font-medium">+2.4% peningkatan setelah 30 hari kalibrasi</span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Deviasi Rata-rata Tonase</span>
            <div className="font-data-metric text-data-metric text-on-surface font-bold">± 48 kg / rit</div>
            <span className="text-xs text-on-surface-variant">Batas toleransi jembatan timbang SNI</span>
          </div>

          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-1 border border-surface-container/60">
            <span className="font-label-md text-label-md text-outline uppercase tracking-wider">Siklus Penyesuaian Selesai</span>
            <div className="font-data-metric text-data-metric text-on-surface font-bold">{iterationCount.toLocaleString()} Iterasi</div>
            <span className="text-xs text-on-surface-variant">Setiap ritasi selesai memperkuat model</span>
          </div>
        </div>

        {/* Calibration Logs Table */}
        <div className="rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col border border-surface-container/60">
          <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container/60">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-lg">history_edu</span>
              <span className="font-title-sm text-title-sm text-on-surface font-bold">
                Log Rekam Kalibrasi Aktual vs Prediksi
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant">
              Diperbarui otomatis dari jembatan timbang Fasilitas A & B
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                  <th className="py-space-sm px-space-md font-bold">Waktu</th>
                  <th className="py-space-sm px-space-md font-bold">Simpul TPS</th>
                  <th className="py-space-sm px-space-md font-bold">Prediksi Awal</th>
                  <th className="py-space-sm px-space-md font-bold">Aktual Riil</th>
                  <th className="py-space-sm px-space-md font-bold">Deviasi</th>
                  <th className="py-space-sm px-space-md font-bold">Tindakan Adaptif Model</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-container/50">
                {calibrationHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-space-md px-space-md text-on-surface-variant">{item.date}</td>
                    <td className="py-space-md px-space-md font-bold text-on-surface">{item.node}</td>
                    <td className="py-space-md px-space-md text-on-surface font-medium">{item.predicted}</td>
                    <td className="py-space-md px-space-md text-primary font-bold">{item.actual}</td>
                    <td className="py-space-md px-space-md">
                      <span className="px-2 py-0.5 rounded-full bg-secondary-container/50 text-on-secondary-container font-mono text-xs font-bold">
                        {item.delta}
                      </span>
                    </td>
                    <td className="py-space-md px-space-md text-on-surface-variant text-xs">{item.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Learning Parameters Control */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-md border border-surface-container/60">
          <div className="flex items-center justify-between">
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
              Konfigurasi Bobot Adaptif SWALON Learning Engine
            </h3>
            <span className="font-label-md text-label-md text-secondary font-bold">
              Tingkat Pembelajaran: {learningRate}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-on-surface-variant">
              <span>Konservatif (0.50)</span>
              <span>Moderat Optimal (0.85)</span>
              <span>Agresif Cepat (1.00)</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.0"
              step="0.05"
              value={learningRate}
              onChange={(e) => setLearningRate(parseFloat(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Tingkat pembelajaran menentukan seberapa cepat algoritma menyesuaikan pola baru (misal perubahan musim buah pasar atau libur semester kampus) terhadap rata-rata historis 90 hari.
          </p>
        </div>
      </div>
    </div>
  );
};
