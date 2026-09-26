import { TPSNode, FleetVehicle, LiveAlert, Facility } from '../types';

export const INITIAL_TPS_NODES: TPSNode[] = [
  {
    id: 'tps-pasar-besar',
    name: 'TPS Pasar Besar',
    subdistrict: 'Klojen, Kota Malang',
    status: 'Kritis',
    fillPercentage: 91,
    weightTons: 2.4,
    etaToFull: '45 menit',
    minutesToCritical: 38,
    lat: -7.9826,
    lng: 112.6315,
    mapX: 52,
    mapY: 58,
    sensorStatus: 'Online',
    zoneType: 'pasar',
    lastCollectionTime: '4 jam 18 mnt lalu',
    dailyTrend: [35, 48, 60, 75, 85, 91],
    recommendation: 'Perkiraan meluap dalam 45 menit jika tidak segera diangkut.'
  },
  {
    id: 'tps-lowokwaru',
    name: 'TPS Lowokwaru',
    subdistrict: 'Lowokwaru, Malang',
    status: 'Risiko Tinggi',
    fillPercentage: 84,
    weightTons: 1.9,
    etaToFull: '1.5 Jam',
    minutesToCritical: 52,
    lat: -7.9421,
    lng: 112.6152,
    mapX: 58,
    mapY: 26,
    sensorStatus: 'Online',
    zoneType: 'pendidikan',
    lastCollectionTime: '6 jam lalu',
    dailyTrend: [30, 42, 55, 68, 76, 84],
    recommendation: 'Lonjakan limbah pasar & kos terdeteksi oleh sensor ultrasonik.'
  },
  {
    id: 'tps-sukun',
    name: 'TPS Sukun',
    subdistrict: 'Sukun, Malang Selatan',
    status: 'Sedang',
    fillPercentage: 67,
    weightTons: 1.2,
    etaToFull: '3.5 Jam',
    minutesToCritical: 80,
    lat: -7.9945,
    lng: 112.6190,
    mapX: 28,
    mapY: 72,
    sensorStatus: 'Online',
    zoneType: 'permukiman',
    lastCollectionTime: '2.5 jam lalu',
    dailyTrend: [25, 32, 45, 52, 60, 67],
    recommendation: 'Tren peningkatan normal menuju sore hari.'
  },
  {
    id: 'tps-klojen',
    name: 'TPS Klojen',
    subdistrict: 'Klojen, Kota Malang',
    status: 'Normal',
    fillPercentage: 35,
    weightTons: 0.6,
    etaToFull: 'Aman (>6 jam)',
    minutesToCritical: 240,
    lat: -7.9780,
    lng: 112.6340,
    mapX: 42,
    mapY: 48,
    sensorStatus: 'Online',
    zoneType: 'pasar',
    lastCollectionTime: '1.5 jam lalu',
    dailyTrend: [20, 22, 28, 30, 32, 35],
    recommendation: 'Kapasitas aman terkendali.'
  },
  {
    id: 'tps-kedungkandang',
    name: 'TPS Kedungkandang',
    subdistrict: 'Kedungkandang, Malang Timur',
    status: 'Normal',
    fillPercentage: 49,
    weightTons: 1.1,
    etaToFull: 'Aman (5 jam)',
    minutesToCritical: 130,
    lat: -7.9890,
    lng: 112.6580,
    mapX: 78,
    mapY: 60,
    sensorStatus: 'Online',
    zoneType: 'permukiman',
    lastCollectionTime: '3 jam lalu',
    dailyTrend: [22, 28, 35, 41, 45, 49],
    recommendation: 'Ritasi pengangkutan berjalan lancar.'
  }
];

export const INITIAL_FLEET: FleetVehicle[] = [
  {
    id: 'MLG-07',
    plate: 'N 8472 EA',
    driverName: 'Bambang Mulyono',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    type: 'Dump Truck Hidrolik 6 Roda',
    status: 'Aktif Bergerak',
    currentLoadTons: 3.2,
    maxCapacityTons: 5.0,
    currentLocation: 'Jl. Soekarno-Hatta (28 km/h)',
    targetNodeId: 'tps-pasar-besar',
    assignedRoute: 'Rute A',
    etaMinutes: 11,
    shiftHours: '06:00 - 14:00',
    fuelPercentage: 78
  },
  {
    id: 'MLG-01',
    plate: 'N 8101 AB',
    driverName: 'Slamet Riyadi',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    type: 'Compactor Truck 8 m³',
    status: 'Aktif Bergerak',
    currentLoadTons: 4.8,
    maxCapacityTons: 8.0,
    currentLocation: 'Jl. Ijen Boulevard',
    targetNodeId: 'tps-klojen',
    assignedRoute: 'Rute A',
    etaMinutes: 18,
    shiftHours: '06:00 - 14:00',
    fuelPercentage: 85
  },
  {
    id: 'N-8120-EP',
    plate: 'N 8120 EP',
    driverName: 'Hadi Santoso',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    type: 'Truk Compactor 6 m³',
    status: 'Tersedia',
    currentLoadTons: 0.5,
    maxCapacityTons: 6.0,
    currentLocation: 'Jl. Merdeka (Radius 1.2 km)',
    targetNodeId: 'tps-pasar-besar',
    assignedRoute: 'Rute A',
    etaMinutes: 8,
    shiftHours: '07:00 - 15:00',
    fuelPercentage: 92
  },
  {
    id: 'MLG-14',
    plate: 'N 8345 KC',
    driverName: 'Agus Setiawan',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    type: 'Arm Roll Truck 10 m³',
    status: 'Sedang Muat',
    currentLoadTons: 6.1,
    maxCapacityTons: 10.0,
    currentLocation: 'TPS Dinoyo',
    targetNodeId: 'fasilitas-a',
    assignedRoute: 'Rute A',
    etaMinutes: 24,
    shiftHours: '06:00 - 14:00',
    fuelPercentage: 64
  }
];

export const INITIAL_FACILITIES: Facility[] = [
  {
    id: 'fasilitas-a',
    name: 'Fasilitas Pengolahan A (Blimbing)',
    type: 'Unit Komposting & Biodigester',
    subdistrict: 'Blimbing, Kota Malang',
    capacityPercentage: 68,
    quotaRemaining: '32% (3.8 Ton)',
    materialsAccepted: 'Organik / Sayur / Buah',
    status: 'Optimal',
    todayIncomingTons: 28.4
  },
  {
    id: 'fasilitas-b',
    name: 'Fasilitas Pengolahan B (Kedungkandang)',
    type: 'Material Recovery Facility (MRF)',
    subdistrict: 'Kedungkandang, Kota Malang',
    capacityPercentage: 82,
    quotaRemaining: '18% (1.4 Ton)',
    materialsAccepted: 'Anorganik / Plastik / Kertas',
    status: 'Kapasitas Penuh',
    todayIncomingTons: 19.8
  },
  {
    id: 'tpa-supit-urang',
    name: 'TPA Supit Urang',
    type: 'Sanitary Landfill Aktif & Gas Methane Capture',
    subdistrict: 'Sukun, Kota Malang',
    capacityPercentage: 54,
    quotaRemaining: 'Zona Aktif 3 (46% Sisa)',
    materialsAccepted: 'Residu Non-Daur Ulang',
    status: 'Optimal',
    todayIncomingTons: 42.6
  }
];

export const INITIAL_ALERTS: LiveAlert[] = [
  {
    id: 'alt-1',
    nodeName: 'TPS Pasar Besar',
    time: '12:44 WIB',
    message: 'Kapasitas mencapai 91%. Perkiraan meluap dalam 45 menit jika tidak diangkut.',
    severity: 'darurat',
    predictedTons: 2.4,
    actionLabel: 'Tindak →'
  },
  {
    id: 'alt-2',
    nodeName: 'TPS Lowokwaru',
    time: '12:38 WIB',
    message: 'Kapasitas 84%. Lonjakan limbah pasar terdeteksi oleh sensor ultrasonik.',
    severity: 'peringatan',
    predictedTons: 1.9,
    actionLabel: 'Pantau →'
  },
  {
    id: 'alt-3',
    nodeName: 'TPS Sukun',
    time: '12:15 WIB',
    message: 'Kapasitas 67%. Tren peningkatan normal menuju sore hari.',
    severity: 'info',
    predictedTons: 1.2,
    actionLabel: 'Siaga'
  }
];

export const DECISION_CYCLE_STEPS = [
  {
    step: '01',
    title: 'Sensor & Data',
    subtitle: 'Telemetri TPS & IoT',
    icon: 'sensors',
    description: 'Data ultrasonik dan load cell IoT membaca ketinggian volume dan estimasi massa sampah setiap 30 detik secara otonom.'
  },
  {
    step: '02',
    title: 'Prediksi',
    subtitle: 'Laju timbulan sampah',
    icon: 'trending_up',
    description: 'Model machine learning SWALON-Forecasting v4.2 menghitung regresi timbulan dengan mempertimbangkan hari pasar, cuaca, dan jam sibuk.'
  },
  {
    step: '03',
    title: 'Prioritas',
    subtitle: 'Penetapan simpul kritis',
    icon: 'warning',
    description: 'Sistem menyusun antrean triage berbasis multi-kriteria: volume, sisa kapasitas, waktu ke overload, dan kemacetan jalan.'
  },
  {
    step: '04',
    title: 'Optimasi',
    subtitle: 'Alokasi rute & muatan',
    icon: 'alt_route',
    description: 'Algoritma VRP-Greedy mencocokkan armada terdekat dengan kapasitas kosong dan fasilitas pengolahan yang siap menampung.'
  },
  {
    step: '05',
    title: 'Ukur Hasil',
    subtitle: 'Timbang rit & tonase riil',
    icon: 'straighten',
    description: 'Jembatan timbang di fasilitas pengolahan merekam tonase aktual dan durasi pengangkutan yang diunggah oleh aplikasi pengemudi.'
  },
  {
    step: '06',
    title: 'Pembelajaran',
    subtitle: 'Koreksi bobot heuristik',
    icon: 'auto_awesome',
    description: 'Deviasi antara prediksi dan aktual dihitung untuk memperbarui bobot parameter komposit secara otomatis.'
  },
  {
    step: '07',
    title: 'Keputusan +',
    subtitle: 'Siklus berikutnya lebih akurat',
    icon: 'restart_alt',
    description: 'Siklus logistik terus menyempurnakan akurasi ETA, menurunkan emisi armada, dan mencegah penumpukan sampah di ruang publik.'
  }
];
