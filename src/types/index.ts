export type NavTab = 
  | 'beranda' 
  | 'prediksi' 
  | 'prioritas' 
  | 'optimasi-rute' 
  | 'pembelajaran' 
  | 'jaringan' 
  | 'armada' 
  | 'fasilitas' 
  | 'laporan' 
  | 'pengaturan';

export interface TPSNode {
  id: string;
  name: string;
  subdistrict: string;
  status: 'Kritis' | 'Risiko Tinggi' | 'Sedang' | 'Normal' | 'Optimal';
  fillPercentage: number;
  weightTons: number;
  etaToFull: string;
  minutesToCritical: number;
  lat: number;
  lng: number;
  mapX: number; // percentage in SVG coordinate
  mapY: number;
  sensorStatus: 'Online' | 'Offline' | 'Calibrating';
  zoneType: 'pasar' | 'permukiman' | 'pendidikan' | 'fasilitas';
  lastCollectionTime: string;
  dailyTrend: number[];
  recommendation?: string;
}

export interface FleetVehicle {
  id: string;
  plate: string;
  driverName: string;
  driverAvatar: string;
  type: string;
  status: 'Aktif Bergerak' | 'Tersedia' | 'Sedang Muat' | 'Standby' | 'Perawatan';
  currentLoadTons: number;
  maxCapacityTons: number;
  currentLocation: string;
  targetNodeId?: string;
  assignedRoute?: 'Rute A' | 'Rute B';
  etaMinutes: number;
  shiftHours: string;
  fuelPercentage: number;
}

export interface LiveAlert {
  id: string;
  nodeName: string;
  time: string;
  message: string;
  severity: 'darurat' | 'peringatan' | 'info';
  predictedTons: number;
  actionLabel: string;
}

export interface Facility {
  id: string;
  name: string;
  type: string;
  subdistrict: string;
  capacityPercentage: number;
  quotaRemaining: string;
  materialsAccepted: string;
  status: 'Optimal' | 'Siap Terima Truk' | 'Kapasitas Penuh';
  todayIncomingTons: number;
}
