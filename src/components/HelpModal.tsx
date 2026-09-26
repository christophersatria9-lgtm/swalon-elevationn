import React from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/45 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 border border-surface-container my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">help_outline</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                Panduan Operasional SWALON
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Pusat Kendali Logistik Cerdas Persampahan Kota Malang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-container text-on-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 text-xs leading-relaxed text-on-surface">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex flex-col gap-1">
            <span className="font-bold text-primary text-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">eco</span>
              Filosofi Sistem: Hubungkan Simpul, Optimalkan Aliran
            </span>
            <p className="text-on-surface-variant">
              SWALON mentransformasi manajemen sampah perkotaan dari pengangkutan pasif berbasis jadwal rutin menjadi sistem logistik proaktif berbasis telemetri sensor IoT, prediksi beban dini, dan alokasi rute dinamis (VRP-Greedy).
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-on-surface">Pintasan Keyboard</span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <span>Fokus Pencarian Cepat</span>
                <kbd className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[10px] font-bold">⌘K / Ctrl+K</kbd>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
                <span>Tutup Dialog / Modal</span>
                <kbd className="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[10px] font-bold">ESC</kbd>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="font-bold text-sm text-on-surface">Alur 4 Langkah Triage Operator</span>
            <ol className="list-decimal pl-4 space-y-1 text-on-surface-variant">
              <li><strong>Pantau Simpul Kritis:</strong> Titik dengan keterisian &gt;85% otomatis memicu peringatan darurat.</li>
              <li><strong>Analisis Kausalitas:</strong> Buka modul Prioritas untuk melihat bobot multi-parameter (volume, laju akumulasi, waktu sejak angkut).</li>
              <li><strong>Jalankan Optimasi:</strong> Sistem membandingkan Rute A (efisien emisi) vs Rute B (alternatif).</li>
              <li><strong>Kirim Dispatch:</strong> Konfirmasi penugasan langsung terkirim ke ponsel pengemudi (Bambang Mulyono).</li>
            </ol>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container text-on-surface-variant">
            <strong>Bantuan Teknis DLH Kota Malang:</strong> Hubungi Unit Layanan Telemetri di extension <strong>#4401</strong> atau radio operasional saluran 12 (143.550 MHz).
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2 border-t border-surface-container/60">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary-container text-on-primary font-bold text-xs hover:bg-primary transition-all shadow-sm"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};
