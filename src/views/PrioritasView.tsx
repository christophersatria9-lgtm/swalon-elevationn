import React, { useState } from 'react';
import { TPSNode, NavTab } from '../types';

interface PrioritasViewProps {
  nodes: TPSNode[];
  onOpenDetailModal: (node: TPSNode) => void;
  onNavigateTab: (tab: NavTab) => void;
  onSendFieldAlert: () => void;
}

interface PriorityDetailData {
  title: string;
  location: string;
  scoreText: string;
  scoreNum: number;
  scoreColor: string;
  bgColor: string;
  onBgColor: string;
  volumeText: string;
  volumeWidth: string;
  rateText: string;
  rateWidth: string;
  capacityText: string;
  capacityWidth: string;
  timeText: string;
  timeWidth: string;
  zoneText: string;
  zoneWidth: string;
}

const PRIORITY_DATA_MAP: Record<string, PriorityDetailData> = {
  'tps-pasar-besar': {
    title: 'Dasar Penentuan Prioritas: TPS Pasar Besar',
    location: 'Kecamatan Klojen, Titik Jaringan Simpul #08-KLJ',
    scoreText: 'Prioritas Tinggi (Skor 86/100)',
    scoreNum: 86,
    scoreColor: 'text-error',
    bgColor: 'bg-error-container',
    onBgColor: 'text-on-error-container',
    volumeText: '82%',
    volumeWidth: '82%',
    rateText: '74%',
    rateWidth: '74%',
    capacityText: '91% (Kritis)',
    capacityWidth: '91%',
    timeText: '61% (6 jam)',
    timeWidth: '61%',
    zoneText: '70% (Pasar Tradisional & Grosir)',
    zoneWidth: '70%'
  },
  'tps-lowokwaru': {
    title: 'Dasar Penentuan Prioritas: TPS Lowokwaru',
    location: 'Kecamatan Lowokwaru, Titik Jaringan Simpul #14-LKW',
    scoreText: 'Prioritas Tinggi (Skor 78/100)',
    scoreNum: 78,
    scoreColor: 'text-error',
    bgColor: 'bg-error-container',
    onBgColor: 'text-on-error-container',
    volumeText: '84%',
    volumeWidth: '84%',
    rateText: '62%',
    rateWidth: '62%',
    capacityText: '88% (Kritis)',
    capacityWidth: '88%',
    timeText: '85% (6 jam tertahan)',
    timeWidth: '85%',
    zoneText: '58% (Hunian Mahasiswa & Kost)',
    zoneWidth: '58%'
  },
  'tps-sukun': {
    title: 'Dasar Penentuan Prioritas: TPS Sukun',
    location: 'Kecamatan Sukun, Titik Jaringan Simpul #03-SKN',
    scoreText: 'Prioritas Sedang (Skor 59/100)',
    scoreNum: 59,
    scoreColor: 'text-on-surface',
    bgColor: 'bg-surface-container-high',
    onBgColor: 'text-on-surface',
    volumeText: '67%',
    volumeWidth: '67%',
    rateText: '54%',
    rateWidth: '54%',
    capacityText: '73%',
    capacityWidth: '73%',
    timeText: '40% (2.5 jam)',
    timeWidth: '40%',
    zoneText: '60% (Pemukiman Campuran Industri Rumah)',
    zoneWidth: '60%'
  },
  'tps-kedungkandang': {
    title: 'Dasar Penentuan Prioritas: TPS Kedungkandang',
    location: 'Kecamatan Kedungkandang, Titik Jaringan Simpul #21-KDK',
    scoreText: 'Prioritas Rendah (Skor 42/100)',
    scoreNum: 42,
    scoreColor: 'text-secondary',
    bgColor: 'bg-secondary-container',
    onBgColor: 'text-on-secondary-container',
    volumeText: '49%',
    volumeWidth: '49%',
    rateText: '38%',
    rateWidth: '38%',
    capacityText: '52%',
    capacityWidth: '52%',
    timeText: '30% (1.5 jam)',
    timeWidth: '30%',
    zoneText: '45% (Suburban Berpenduduk Rendah)',
    zoneWidth: '45%'
  }
};

export const PrioritasView: React.FC<PrioritasViewProps> = ({
  nodes,
  onOpenDetailModal,
  onNavigateTab,
  onSendFieldAlert
}) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('tps-pasar-besar');
  const [filterType, setFilterType] = useState<'semua' | 'kritis' | 'zona-klojen'>('semua');

  const selectedData = PRIORITY_DATA_MAP[selectedNodeKey] || PRIORITY_DATA_MAP['tps-pasar-besar'];

  const rows = [
    {
      id: 'tps-pasar-besar',
      priorityRank: 1,
      name: 'TPS Pasar Besar',
      subdistrict: 'Klojen, Kota Malang',
      risk: 'Tinggi',
      fill: 91,
      weight: '2.3t',
      capacityRemainingPct: '8%',
      capacityRemainingTons: '0,2 ton',
      criticalEta: '38 menit',
      criticalSub: 'ke overload',
      reason: 'Laju timbulan tinggi & jam puncak pasar',
      criticalRankColor: 'bg-error text-on-error',
      riskBadgeColor: 'bg-error-container text-on-error-container',
      riskDotColor: 'bg-error'
    },
    {
      id: 'tps-lowokwaru',
      priorityRank: 2,
      name: 'TPS Lowokwaru',
      subdistrict: 'Lowokwaru, Malang',
      risk: 'Tinggi',
      fill: 84,
      weight: '1.9t',
      capacityRemainingPct: '12%',
      capacityRemainingTons: '0,4 ton',
      criticalEta: '52 menit',
      criticalSub: '',
      reason: 'Belum diangkut selama 6 jam',
      criticalRankColor: 'bg-error-container text-error',
      riskBadgeColor: 'bg-error-container text-on-error-container',
      riskDotColor: 'bg-error'
    },
    {
      id: 'tps-sukun',
      priorityRank: 3,
      name: 'TPS Sukun',
      subdistrict: 'Sukun, Malang Selatan',
      risk: 'Sedang',
      fill: 67,
      weight: '1.4t',
      capacityRemainingPct: '27%',
      capacityRemainingTons: '0,8 ton',
      criticalEta: '1j 20m',
      criticalSub: '',
      reason: 'Aktivitas kawasan meningkat',
      criticalRankColor: 'bg-surface-container-high text-on-surface',
      riskBadgeColor: 'bg-surface-container-high text-on-surface-variant',
      riskDotColor: 'bg-outline'
    },
    {
      id: 'tps-kedungkandang',
      priorityRank: 4,
      name: 'TPS Kedungkandang',
      subdistrict: 'Kedungkandang, Malang Timur',
      risk: 'Rendah',
      fill: 49,
      weight: '1.1t',
      capacityRemainingPct: '48%',
      capacityRemainingTons: '1,3 ton',
      criticalEta: '2j 10m',
      criticalSub: '',
      reason: 'Kapasitas masih aman',
      criticalRankColor: 'bg-primary-fixed text-on-primary-fixed',
      riskBadgeColor: 'bg-secondary-container text-on-secondary-container',
      riskDotColor: 'bg-secondary'
    }
  ];

  const filteredRows = rows.filter((r) => {
    if (filterType === 'kritis') return r.id === 'tps-pasar-besar' || r.id === 'tps-lowokwaru';
    if (filterType === 'zona-klojen') return r.id === 'tps-pasar-besar';
    return true;
  });

  const handleDownloadCSV = () => {
    const headers = ['Peringkat', 'Nama TPS', 'Kecamatan', 'Risiko', 'Keterisian', 'Estimasi Berat', 'Sisa Kapasitas', 'Waktu Kritis', 'Alasan'];
    const csvContent = [
      headers.join(','),
      ...filteredRows.map(r => [
        r.priorityRank,
        `"${r.name}"`,
        `"${r.subdistrict}"`,
        `"${r.risk}"`,
        `"${r.fill}%"`,
        `"${r.weight}"`,
        `"${r.capacityRemainingPct} (${r.capacityRemainingTons})"`,
        `"${r.criticalEta}"`,
        `"${r.reason}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SWALON_Triage_Kota_Malang_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      <div className="px-3 sm:px-4 md:px-6 lg:px-gutter-lg py-4 sm:py-margin-md flex flex-col gap-4 sm:gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="px-space-sm py-space-xs rounded bg-surface-container-high text-primary font-label-md text-label-md font-bold tracking-wider">
                JARINGAN LOGISTIK SPASIAL
              </span>
              <span className="px-space-sm py-space-xs rounded bg-error-container text-on-error-container font-label-md text-label-md font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                PROTOTIPE — DATA SIMULASI
              </span>
            </div>
            <h1 className="text-2xl sm:text-headline-xl font-bold tracking-tight text-on-surface">
              Prioritas Pengangkutan
            </h1>
            <p className="text-xs sm:text-body-md text-on-surface-variant max-w-2xl">
              Menentukan titik yang perlu ditangani terlebih dahulu berdasarkan kondisi jaringan, laju timbulan waktu-nyata, dan ambang batas saturasi kota.
            </p>
          </div>

          <div className="flex items-center gap-space-sm flex-wrap">
            <div className="flex items-center gap-space-xs px-3 sm:px-space-md py-1.5 sm:py-space-sm rounded-xl bg-surface-container-low shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-error text-xl">warning</span>
              <div className="flex flex-col text-left">
                <span className="font-label-md text-[10px] sm:text-label-md text-on-surface-variant leading-none">
                  Status Kritis
                </span>
                <span className="font-title-sm text-xs sm:text-title-sm text-on-surface font-bold">4 Titik Segera</span>
              </div>
            </div>

            <div className="flex items-center gap-space-xs px-3 sm:px-space-md py-1.5 sm:py-space-sm rounded-xl bg-surface-container-low shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-xl">near_me</span>
              <div className="flex flex-col text-left">
                <span className="font-label-md text-[10px] sm:text-label-md text-on-surface-variant leading-none">
                  Armada Siaga
                </span>
                <span className="font-title-sm text-xs sm:text-title-sm text-on-surface font-bold">2 Unit Radius 5 KM</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('optimasi-rute')}
              className="px-3 sm:px-space-md py-2 sm:py-space-sm rounded-xl bg-primary text-on-primary font-title-sm text-xs sm:text-title-sm font-semibold flex items-center gap-1.5 hover:bg-tertiary-container transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-base">alt_route</span>
              <span>Buka Rute Instan</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards (2 cols on mobile, 4 cols on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-space-md">
          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/50">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Beban Timbulan Terkini
              </span>
              <span className="font-data-metric text-data-metric text-on-surface font-bold mt-space-xs">
                88.4%
              </span>
              <span className="font-label-md text-label-md text-error flex items-center gap-1 mt-1 font-semibold">
                <span className="material-symbols-outlined text-sm">trending_up</span> +14% laju 2 jam terakhir
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">delete_sweep</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/50">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Titik Pantau Terhubung
              </span>
              <span className="font-data-metric text-data-metric text-on-surface font-bold mt-space-xs">
                18 TPS
              </span>
              <span className="font-label-md text-label-md text-secondary flex items-center gap-1 mt-1 font-semibold">
                <span className="material-symbols-outlined text-sm">sensors</span> Seluruh IoT terkalibrasi
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">hub</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/50">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Tenggat Saturasi Tercepat
              </span>
              <span className="font-data-metric text-data-metric text-error font-bold mt-space-xs">
                38 Mnt
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant mt-1 font-medium">
                TPS Pasar Besar (Klojen)
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">hourglass_top</span>
            </div>
          </div>

          <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-surface-container/50">
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Efisiensi Rute Jaringan
              </span>
              <span className="font-data-metric text-data-metric text-secondary font-bold mt-space-xs">
                94.2%
              </span>
              <span className="font-label-md text-label-md text-secondary flex items-center gap-1 mt-1 font-semibold">
                <span className="material-symbols-outlined text-sm">speed</span> Penghematan 18 km
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">route</span>
            </div>
          </div>
        </div>

        {/* Content Layout: Table & Inspector */}
        <div className="flex flex-col lg:flex-row gap-space-lg items-start">
          {/* Left Column: Triage Matrix Table (7/12) */}
          <div className="w-full lg:w-7/12 flex flex-col gap-space-md">
            {/* Filter buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm p-space-sm bg-surface-container-lowest rounded-xl shadow-sm border border-surface-container/50">
              <div className="flex items-center gap-space-xs overflow-x-auto">
                <button
                  onClick={() => setFilterType('semua')}
                  className={`px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-colors ${
                    filterType === 'semua'
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Semua Tingkat (4)
                </button>
                <button
                  onClick={() => setFilterType('kritis')}
                  className={`px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-colors ${
                    filterType === 'kritis'
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Hanya Kritis / Tinggi (2)
                </button>
                <button
                  onClick={() => setFilterType('zona-klojen')}
                  className={`px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-colors ${
                    filterType === 'zona-klojen'
                      ? 'bg-primary text-on-primary shadow-sm font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Kawasan Pasar & Komersial
                </button>
              </div>

              <div className="flex items-center gap-space-xs px-space-sm">
                <span className="material-symbols-outlined text-sm text-outline">tune</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                  Multi-bobot V3.2
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden flex flex-col border border-surface-container/50">
              <div className="p-space-md bg-surface-container-low flex items-center justify-between border-b border-surface-container/60">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-lg">format_list_numbered</span>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    Matriks Triage Prioritas Jaringan
                  </span>
                </div>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Pilih baris untuk rincian formula algoritma
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                      <th className="py-space-sm px-space-md font-bold">Prioritas</th>
                      <th className="py-space-sm px-space-md font-bold">Titik TPS</th>
                      <th className="py-space-sm px-space-md font-bold">Risiko</th>
                      <th className="py-space-sm px-space-md font-bold">Volume</th>
                      <th className="py-space-sm px-space-md font-bold">Sisa Kapasitas</th>
                      <th className="py-space-sm px-space-md font-bold">Waktu Kritis</th>
                      <th className="py-space-sm px-space-md font-bold">Alasan Utama</th>
                      <th className="py-space-sm px-space-md text-right font-bold">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-surface-container/50">
                    {filteredRows.map((r) => {
                      const isSelected = selectedNodeKey === r.id;
                      const targetNodeObj = nodes.find(n => n.id === r.id) || nodes[0];
                      return (
                        <tr
                          key={r.id}
                          onClick={() => setSelectedNodeKey(r.id)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? 'bg-primary-fixed/25' : 'hover:bg-surface-container-low'
                          }`}
                        >
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-title-sm text-title-sm font-bold shadow-xs ${r.criticalRankColor}`}>
                              {r.priorityRank}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className="font-title-sm text-title-sm font-bold text-on-surface">
                                {r.name}
                              </span>
                              <span className="font-label-md text-label-md text-on-surface-variant">
                                {r.subdistrict}
                              </span>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full font-label-md text-label-md font-bold ${r.riskBadgeColor}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${r.riskDotColor}`}></span>
                              {r.risk}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <div className="flex flex-col gap-1 w-24">
                              <div className="flex justify-between font-label-md text-label-md font-bold text-error">
                                <span>{r.fill}%</span>
                                <span className="text-on-surface-variant font-normal">{r.weight}</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    r.fill >= 80 ? 'bg-error' : r.fill >= 60 ? 'bg-amber-500' : 'bg-secondary'
                                  }`}
                                  style={{ width: `${r.fill}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className={`font-label-lg text-label-lg font-bold ${
                              r.fill >= 85 ? 'text-error' : 'text-on-surface'
                            }`}>
                              {r.capacityRemainingPct}
                            </span>
                            <span className="font-label-md text-label-md text-on-surface-variant block">
                              {r.capacityRemainingTons}
                            </span>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap">
                            <span className={`font-label-lg text-label-lg font-bold flex items-center gap-1 ${
                              r.fill >= 85 ? 'text-error' : 'text-on-surface'
                            }`}>
                              <span className="material-symbols-outlined text-sm">schedule</span> {r.criticalEta}
                            </span>
                            {r.criticalSub && (
                              <span className="font-label-md text-label-md text-on-surface-variant">
                                {r.criticalSub}
                              </span>
                            )}
                          </td>
                          <td className="py-space-md px-space-md max-w-xs">
                            <p className="truncate font-body-sm text-body-sm text-on-surface-variant" title={r.reason}>
                              {r.reason}
                            </p>
                          </td>
                          <td className="py-space-md px-space-md whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-space-xs">
                              <button
                                className="px-space-sm py-1 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-high transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenDetailModal(targetNodeObj);
                                }}
                              >
                                Detail
                              </button>
                              {r.priorityRank === 1 && (
                                <button
                                  className="px-space-sm py-1 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-tertiary-container transition-colors shadow-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigateTab('optimasi-rute');
                                  }}
                                >
                                  Optimasi
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-space-md bg-surface-container-low flex items-center justify-between border-t border-surface-container/60">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Menampilkan {filteredRows.length} dari 18 simpul logistik Kota Malang
                </span>
                <div
                  className="flex items-center gap-space-xs font-label-md text-label-md text-primary font-bold cursor-pointer hover:underline"
                  onClick={handleDownloadCSV}
                >
                  <span>Unduh Rekap Triage CSV</span>
                  <span className="material-symbols-outlined text-sm">download</span>
                </div>
              </div>
            </div>

            {/* Protocol Banner with photograph */}
            <div className="p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center gap-space-md border border-surface-container/50">
              <div
                className="w-full md:w-48 h-32 rounded-xl bg-cover bg-center shrink-0 shadow-sm border border-surface-container"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDv-cYyWLWVI0KZJ2se3eY4aoKwsantycDMZdKYFNPoDmsrgaBqYy__-oDeRXr2w_NXson9psZjWaN7iB11UzPTT27mWp0E-7_06oMfvzwo2yzu0OUqQGX1fHvbuj_4RN67hR6IgyuoYQyQHjB1V1WkHT1-MmP9B3Cxn_V_L7gDSMl1PYK4yY23jysEJbWLtgGsiZ5TDy38vj1q3j1KQ1MUYL567SH3xYc8F-JnP-5G_uyah4xKx0YFjg')`
                }}
              />
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-base">info</span>
                  <span className="font-label-lg text-label-lg font-bold text-on-surface">
                    Protokol Penanganan Kawasan Padat
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  TPS Pasar Besar dan kawasan komersial lingkar pusat kota diprioritaskan sebelum pukul 10:00 WIB untuk mencegah kemacetan jalur distribusi bahan pokok serta tumpukan di badan jalan raya.
                </p>
                <div className="flex items-center gap-space-md mt-1 flex-wrap">
                  <span className="font-label-md text-label-md text-secondary font-bold">
                    Frekuensi Hari Ini: 3 Pengangkutan Selesai
                  </span>
                  <span className="text-outline font-label-md">•</span>
                  <span className="font-label-md text-label-md text-outline">Target Nol-Overflow 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Algorithmic Causality Inspector (5/12) */}
          <div className="w-full lg:w-5/12 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-lg flex flex-col gap-space-md border border-surface-container/60">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                    Analisis Kausalitas Algoritma
                  </span>
                  <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-0.5">
                    {selectedData.title}
                  </h2>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {selectedData.location}
                  </span>
                </div>
                <div className="p-space-xs rounded-lg bg-surface-container">
                  <span className="material-symbols-outlined text-primary">analytics</span>
                </div>
              </div>

              {/* Composite Card with Circular Gauge */}
              <div className={`p-space-md rounded-2xl ${selectedData.bgColor} ${selectedData.onBgColor} flex items-center justify-between transition-all shadow-sm`}>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md uppercase tracking-wider font-semibold">
                    Hasil Komposit Multi-Faktor
                  </span>
                  <span className={`font-title-sm text-title-sm font-bold ${selectedData.scoreColor}`}>
                    {selectedData.scoreText}
                  </span>
                </div>
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-black/15"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className={selectedData.scoreColor}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${selectedData.scoreNum}, 100`}
                      strokeLinecap="round"
                      strokeWidth="4"
                    />
                  </svg>
                  <span className="absolute font-title-sm text-title-sm font-bold text-on-surface">
                    {selectedData.scoreNum}
                  </span>
                </div>
              </div>

              {/* Parameter Bars */}
              <div className="flex flex-col gap-space-sm">
                <span className="font-label-md text-label-md text-outline uppercase tracking-wider font-semibold">
                  Bobot Skor Parameter Real-Time
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Volume Terisi</span>
                    <span className="text-error font-bold">{selectedData.volumeText}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-error rounded-full transition-all duration-500"
                      style={{ width: selectedData.volumeWidth }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Laju Timbulan (Sensor Akumulatif)</span>
                    <span className="text-on-surface font-bold">{selectedData.rateText}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: selectedData.rateWidth }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Sisa Kapasitas (Ambang Bahaya)</span>
                    <span className="text-error font-bold">{selectedData.capacityText}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-error rounded-full transition-all duration-500"
                      style={{ width: selectedData.capacityWidth }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Waktu Sejak Pengangkutan Terakhir</span>
                    <span className="text-on-surface font-bold">{selectedData.timeText}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-primary-container rounded-full transition-all duration-500"
                      style={{ width: selectedData.timeWidth }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-md text-label-md">
                    <span className="text-on-surface font-semibold">Karakteristik Kawasan (Sentra Komersial)</span>
                    <span className="text-on-surface font-bold">{selectedData.zoneText}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: selectedData.zoneWidth }}
                    />
                  </div>
                </div>
              </div>

              {/* Policy Note */}
              <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container">
                <div className="flex items-center gap-space-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-base">policy</span>
                  <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
                    Catatan Kebijakan Operasional
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  &quot;Skor digunakan sebagai alat bantu untuk menyusun prioritas operasional, bukan keputusan otomatis.&quot;
                </p>
              </div>

              {/* Action buttons */}
              <div className="pt-space-xs flex flex-col gap-space-sm">
                <button
                  onClick={() => onNavigateTab('optimasi-rute')}
                  className="w-full py-space-sm px-space-md rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-space-xs hover:bg-tertiary-container transition-all shadow-sm active:scale-98"
                >
                  <span className="material-symbols-outlined text-lg">alt_route</span>
                  <span>Lanjutkan ke Optimasi Rute</span>
                </button>
                <button
                  onClick={onSendFieldAlert}
                  className="w-full py-space-sm px-space-md rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs hover:bg-surface-container-high transition-colors"
                >
                  <span className="material-symbols-outlined text-base">send_to_mobile</span>
                  <span>Kirim Notifikasi Siaga ke Tim Lapangan</span>
                </button>
              </div>
            </div>

            {/* Quick Radius Coverage Map */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-space-md flex flex-col gap-space-sm border border-surface-container/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
                  <span className="font-title-sm text-title-sm font-bold text-on-surface">
                    Peta Radius Jangkauan Cepat
                  </span>
                </div>
                <span className="font-label-md text-label-md text-secondary font-bold">Klojen - Sukun</span>
              </div>

              <div
                className="w-full h-44 rounded-xl bg-cover bg-center shadow-inner relative overflow-hidden border border-surface-container"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpVCWy-cgyK-xTgd7Np90VzsRj-MKV6eQfQYM-HVr8Hrp_h7MNEzCayAFuk6a9RDs-KKO7gbKEntjl2Bn6OK5hPI9ahOzLwLInif5yyPI2mdjo_l1Trq5LopOR7W_RuAj-CFAHOPZT4Jox2fA4dq9s8Ld-vUKKCdkBptDz0HkGj8TY18UBO44rz25Vzdk8DCx_AL03DvZMR_NsGuzaqy1gWKOm1RQYbBJ74vST9f56tRIeK8lX6o1W0Q')`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-transparent to-transparent flex items-end p-space-md">
                  <div className="flex items-center gap-space-sm text-on-primary">
                    <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                    <span className="font-label-md text-label-md font-bold">
                      Radius Prioritas 1: Armada N-8120-EP berada di Jl. Merdeka (1.2 km)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md pt-1">
                <span>Estimasi Tiba: ~8 menit jika diberangkatkan sekarang</span>
                <span className="font-bold text-primary">Truk Compactor 6 m³</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
