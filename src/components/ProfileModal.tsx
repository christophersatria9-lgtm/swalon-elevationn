import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (updatedData: OperatorProfile) => void;
}

export interface OperatorProfile {
  name: string;
  email: string;
  role: string;
  employeeId: string;
  shift: string;
  zone: string;
  phone: string;
  avatarUrl: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile
}) => {
  const [profile, setProfile] = useState<OperatorProfile>({
    name: 'Christopher Satria',
    email: 'christophersatria9@gmail.com',
    role: 'Pengelola Operasional SWALON Kota Malang',
    employeeId: 'SWL-MLG-8809',
    shift: 'Shift Pagi (06:00 - 14:00 WIB)',
    zone: 'Sektor Pusat & Timur (Klojen, Blimbing, Kedungkandang)',
    phone: '+62 812-3456-7890',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBPfi-SyjkkqXL-DBmqI2k-vYOXMOTAjbUIWJET6abtBUrDNLTn6GPtUp8rBbPgHvRDW3xQ1n1Fg1Pz4X2g5AYBCn27d5yjs6GK5_GZ8yLRDu_NiOB7Hivm4xlQp2AC3rEEKlNSXxcS02rRvogLWb_EIrOZBJ5RBf59-Kg62KDg2EbzuCbqS4Y6GN7isSkLK0m3eLFNa6Sp1FAQvgXRNb94muLdSiG2MxUZnNt9BRCCKJrozG_Cih2kA'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<OperatorProfile>(profile);
  const [activeRoleMode, setActiveRoleMode] = useState<'operator' | 'supervisor' | 'teknisi'>('operator');

  if (!isOpen) return null;

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    onSaveProfile(editForm);
  };

  const handleRoleSwitch = (mode: 'operator' | 'supervisor' | 'teknisi') => {
    setActiveRoleMode(mode);
    let newRole = 'Pengelola Operasional SWALON Kota Malang';
    let newShift = 'Shift Pagi (06:00 - 14:00 WIB)';
    if (mode === 'supervisor') {
      newRole = 'Supervisor Dinas Lingkungan Hidup (DLH Kota Malang)';
      newShift = 'Pengawasan Penuh 24 Jam';
    } else if (mode === 'teknisi') {
      newRole = 'Koordinator Kalibrasi Sensor IoT & Jaringan Telemetri';
      newShift = 'Shift Lapangan (08:00 - 16:00 WIB)';
    }
    const updated = { ...profile, role: newRole, shift: newShift };
    setProfile(updated);
    setEditForm(updated);
    onSaveProfile(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl flex flex-col gap-4 border border-surface-container my-auto max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-surface">
                Profil Operator Pusat Kendali
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                Identitas Personel & Otoritas Sistem SWALON
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

        {/* Profile Hero Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-primary/10 via-surface-container-low to-secondary-container/20 border border-primary/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="relative shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-white shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary ring-2 ring-white flex items-center justify-center text-white" title="Online Aktif">
              <span className="material-symbols-outlined text-xs font-bold">check</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h4 className="font-headline-md text-headline-md font-bold text-on-surface">
                {profile.name}
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary text-[10px] font-bold uppercase tracking-wider">
                Level 3 • Dispatcher
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-primary">{profile.role}</p>
            <p className="text-xs text-on-surface-variant font-mono">{profile.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
              <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-highest text-on-surface font-semibold">
                NIP: {profile.employeeId}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-secondary-container/50 text-on-secondary-container font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                {profile.shift}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-title-sm text-xs font-semibold shrink-0"
          >
            {isEditing ? 'Batal Edit' : 'Edit Profil'}
          </button>
        </div>

        {/* Quick Role Simulation Switcher */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-outline">
            Simulasi Peran Akses Pengguna
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleRoleSwitch('operator')}
              className={`p-2.5 rounded-xl text-left transition-all border ${
                activeRoleMode === 'operator'
                  ? 'bg-primary-container text-on-primary border-primary shadow-sm font-semibold'
                  : 'bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">tune</span>
                <span>Operator Dispatch</span>
              </div>
              <p className={`text-[10px] mt-0.5 leading-tight ${activeRoleMode === 'operator' ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                Akses penuh kendali armada & rute harian.
              </p>
            </button>

            <button
              onClick={() => handleRoleSwitch('supervisor')}
              className={`p-2.5 rounded-xl text-left transition-all border ${
                activeRoleMode === 'supervisor'
                  ? 'bg-primary-container text-on-primary border-primary shadow-sm font-semibold'
                  : 'bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">verified_user</span>
                <span>Supervisor DLH</span>
              </div>
              <p className={`text-[10px] mt-0.5 leading-tight ${activeRoleMode === 'supervisor' ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                Otorisasi kebijakan & audit residu TPA.
              </p>
            </button>

            <button
              onClick={() => handleRoleSwitch('teknisi')}
              className={`p-2.5 rounded-xl text-left transition-all border ${
                activeRoleMode === 'teknisi'
                  ? 'bg-primary-container text-on-primary border-primary shadow-sm font-semibold'
                  : 'bg-surface-container-low text-on-surface border-surface-container hover:bg-surface-container'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="material-symbols-outlined text-sm">sensors</span>
                <span>Teknisi IoT</span>
              </div>
              <p className={`text-[10px] mt-0.5 leading-tight ${activeRoleMode === 'teknisi' ? 'text-primary-fixed' : 'text-on-surface-variant'}`}>
                Kalibrasi sensor ultrasonik 18 TPS.
              </p>
            </button>
          </div>
        </div>

        {/* Edit Form or Detail Info */}
        {isEditing ? (
          <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-3 border border-surface-container text-xs">
            <h5 className="font-bold text-on-surface text-sm">Perbarui Data Operator</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium">Nama Lengkap:</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-surface-container focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium">Alamat Email:</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-surface-container focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium">Nomor Kontak / WhatsApp:</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-surface-container focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium">Pilihan Shift:</label>
                <select
                  value={editForm.shift}
                  onChange={(e) => setEditForm({ ...editForm, shift: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-surface-container focus:ring-1 focus:ring-primary focus:outline-none"
                >
                  <option value="Shift Pagi (06:00 - 14:00 WIB)">Shift Pagi (06:00 - 14:00 WIB)</option>
                  <option value="Shift Siang (14:00 - 22:00 WIB)">Shift Siang (14:00 - 22:00 WIB)</option>
                  <option value="Shift Malam (22:00 - 06:00 WIB)">Shift Malam (22:00 - 06:00 WIB)</option>
                </select>
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-on-surface-variant font-medium">Wilayah Kerja:</label>
                <input
                  type="text"
                  value={editForm.zone}
                  onChange={(e) => setEditForm({ ...editForm, zone: e.target.value })}
                  className="px-3 py-2 bg-white rounded-xl border border-surface-container focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold hover:bg-surface-container-high"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-xl bg-primary-container text-on-primary font-bold hover:bg-primary"
              >
                Simpan Profil
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 border border-surface-container/40">
              <span className="text-outline font-medium">Wilayah Koordinasi:</span>
              <span className="font-semibold text-on-surface">{profile.zone}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 border border-surface-container/40">
              <span className="text-outline font-medium">Kontak Siaga:</span>
              <span className="font-semibold text-on-surface">{profile.phone}</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 border border-surface-container/40">
              <span className="text-outline font-medium">Waktu Sesi Aktif:</span>
              <span className="font-semibold text-secondary">Terhubung sejak 06:00 WIB (Aktif)</span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-0.5 border border-surface-container/40">
              <span className="text-outline font-medium">Sertifikasi Operasional:</span>
              <span className="font-semibold text-primary">Smart Municipal Dispatcher (DLH)</span>
            </div>
          </div>
        )}

        {/* Operational Statistics */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-outline">
            Kinerja Operator Hari Ini
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container/40">
              <span className="text-[11px] text-on-surface-variant block">Ritasi Didispatch</span>
              <span className="font-bold text-base text-on-surface">86 Rit</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container/40">
              <span className="text-[11px] text-on-surface-variant block">Ketepatan Waktu</span>
              <span className="font-bold text-base text-secondary">92.4%</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container/40">
              <span className="text-[11px] text-on-surface-variant block">Respon Peringatan</span>
              <span className="font-bold text-base text-primary">1.8 Mnt</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container/40">
              <span className="text-[11px] text-on-surface-variant block">Status Audit</span>
              <span className="font-bold text-base text-secondary">Lolos SNI</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-surface-container/60">
          <span className="text-[11px] text-outline">
            Sistem Terautentikasi Konsol SWALON Kota Malang v2.4
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary-container text-on-primary font-bold text-xs hover:bg-primary transition-all shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
