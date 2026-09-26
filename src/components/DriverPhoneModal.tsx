import React, { useState } from 'react';
import { SwalonLogo } from './SwalonLogo';

interface DriverPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTruck: string;
  driverName: string;
  targetNode: string;
  eta: string;
  onSimulateComplete: () => void;
}

export const DriverPhoneModal: React.FC<DriverPhoneModalProps> = ({
  isOpen,
  onClose,
  activeTruck,
  driverName,
  targetNode,
  eta,
  onSimulateComplete
}) => {
  const [currentStep, setCurrentStep] = useState<'menuju-tps' | 'muat-sampah' | 'menuju-fasilitas' | 'selesai'>('menuju-tps');
  const [recordedWeight, setRecordedWeight] = useState('2.4');

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (currentStep === 'menuju-tps') {
      setCurrentStep('muat-sampah');
    } else if (currentStep === 'muat-sampah') {
      setCurrentStep('menuju-fasilitas');
    } else if (currentStep === 'menuju-fasilitas') {
      setCurrentStep('selesai');
      onSimulateComplete();
    } else {
      setCurrentStep('menuju-tps');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative flex flex-col items-center">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface p-2 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center gap-1 text-xs font-semibold px-3"
        >
          <span className="material-symbols-outlined text-base">close</span>
          Tutup Simulasi
        </button>

        {/* Realistic Mobile Device Mockup */}
        <div className="w-[360px] h-[720px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-slate-700/80 flex flex-col relative overflow-hidden select-none border-4 border-slate-800">
          {/* Speaker & Camera Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-800 mr-3"></div>
            <div className="w-10 h-1.5 rounded-full bg-slate-800"></div>
          </div>

          {/* Phone Screen Container */}
          <div className="w-full h-full bg-[#f8f9ff] rounded-[36px] overflow-hidden flex flex-col text-[#0b1c30] relative pt-7">
            {/* Phone Status Bar */}
            <div className="h-6 px-6 flex items-center justify-between text-xs font-semibold text-slate-600 shrink-0">
              <span>09:41</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-sm">signal_cellular_4_bar</span>
                <span className="material-symbols-outlined text-sm">wifi</span>
                <span className="material-symbols-outlined text-sm">battery_full</span>
              </div>
            </div>

            {/* App Header */}
            <div className="bg-[#005d42] text-white p-3.5 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-2.5">
                <SwalonLogo size="sm" showText={false} />
                <div>
                  <h4 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                    SWALON Driver
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </h4>
                  <p className="text-[10px] text-emerald-200">{activeTruck} • {driverName}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-emerald-950 text-[10px] font-bold">
                Online
              </span>
            </div>

            {/* App Body Content */}
            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
              {/* Task Banner */}
              <div className="p-3 rounded-2xl bg-white shadow-sm border border-emerald-100 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                    Instruksi Dispatch Aktif
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">ETA {eta}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Titik Jemput Prioritas:</span>
                  <span className="text-sm font-bold text-slate-900">{targetNode}</span>
                </div>

                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Tujuan Akhir:</span>
                  <span className="font-semibold text-emerald-800">Fasilitas A (Blimbing)</span>
                </div>
              </div>

              {/* Map View Simulation */}
              <div className="h-44 w-full rounded-2xl bg-slate-800 relative overflow-hidden shadow-inner flex flex-col justify-between p-2.5">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-60 filter contrast-125"
                  style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9vYehby5WJ0opS-HWnO9gJ3hf2n35GvPSA3Bmvy_MIxazI3EAMS5Gr8i0aZ7yBCXK0EpW5K1rNf4NweZhOFGL0ssuYuC7EEBj-VOzgOHqYTKBueAraCrpPOi7t1SdQmrT6InElBawLlkYZPCaIzagAirwjqkFZvoaAxPoQoFUHct6BScqCDEM4s2lkkjZrxDR2PSP-lxUOl5H_0EucLhZni3H5i11tJ3xxC75k9mS5QAXyRKFQ6CetQ')` }}
                />
                
                {/* Simulated Turn by turn direction overlay */}
                <div className="relative z-10 bg-black/75 backdrop-blur-md text-white p-2 rounded-xl flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-lg">turn_right</span>
                  </div>
                  <div className="flex flex-col text-left leading-tight">
                    <span className="text-[11px] font-bold">250m • Belok Kanan ke Jl. Soekarno-Hatta</span>
                    <span className="text-[9px] text-emerald-300">Rute A (Tercepat & Minim Emisi)</span>
                  </div>
                </div>

                <div className="relative z-10 self-start bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                  Kecepatan: 28 km/jam
                </div>
              </div>

              {/* Workflow Stepper */}
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Status Eksekusi Rute
                </span>

                <div className="flex flex-col gap-1.5 text-xs">
                  <div className={`p-2 rounded-xl flex items-center justify-between ${
                    currentStep === 'menuju-tps' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-700">near_me</span>
                      <span className="font-semibold">1. Menuju {targetNode}</span>
                    </div>
                    {currentStep !== 'menuju-tps' && <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>}
                  </div>

                  <div className={`p-2 rounded-xl flex items-center justify-between ${
                    currentStep === 'muat-sampah' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-700">scale</span>
                      <span className="font-semibold">2. Timbang Muatan Lapangan</span>
                    </div>
                    {currentStep === 'menuju-fasilitas' || currentStep === 'selesai' ? (
                      <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                    ) : null}
                  </div>

                  {currentStep === 'muat-sampah' && (
                    <div className="pl-6 pr-2 py-1 flex items-center justify-between text-xs bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Hasil Timbang Riil (Ton):</span>
                      <input
                        type="text"
                        value={recordedWeight}
                        onChange={(e) => setRecordedWeight(e.target.value)}
                        className="w-16 px-1.5 py-0.5 bg-white border border-slate-300 rounded text-right font-bold text-emerald-700"
                      />
                    </div>
                  )}

                  <div className={`p-2 rounded-xl flex items-center justify-between ${
                    currentStep === 'menuju-fasilitas' ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'text-slate-600'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-700">recycling</span>
                      <span className="font-semibold">3. Bongkar di Fasilitas A</span>
                    </div>
                    {currentStep === 'selesai' && <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Phone Action Button */}
            <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <button
                onClick={handleNextStep}
                className="w-full py-2.5 rounded-xl bg-[#005d42] hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                {currentStep === 'menuju-tps' && (
                  <>
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Tiba di Lokasi TPS</span>
                  </>
                )}
                {currentStep === 'muat-sampah' && (
                  <>
                    <span className="material-symbols-outlined text-sm">upload</span>
                    <span>Simpan Tonase & Mulai Perjalanan</span>
                  </>
                )}
                {currentStep === 'menuju-fasilitas' && (
                  <>
                    <span className="material-symbols-outlined text-sm">task_alt</span>
                    <span>Konfirmasi Pembongkaran Selesai</span>
                  </>
                )}
                {currentStep === 'selesai' && (
                  <>
                    <span className="material-symbols-outlined text-sm">restart_alt</span>
                    <span>Tugas Selesai • Kembali Siaga</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Home Bar */}
            <div className="h-4 flex items-center justify-center pb-1">
              <div className="w-28 h-1 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
