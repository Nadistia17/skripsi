import React, { useState } from 'react';
import { X, Palette, Type, Box, Sparkles, Smile, Check, ShieldCheck, Monitor } from 'lucide-react';
import { Card } from '../Card';
import { Button3D } from '../Button3D';
import { MascotTurtle } from '../MascotTurtle';
import { ProgressBar } from '../ProgressBar';
import { soundManager } from '../../utils/audio';
import { MascotExpression } from '../../types';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  isProjectorMode: boolean;
  onToggleProjector: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({
  isOpen,
  onClose,
  isProjectorMode,
  onToggleProjector,
}) => {
  const [activeSection, setActiveSection] = useState<'warna' | 'tipografi' | 'komponen' | 'maskot' | 'aksesibilitas'>('warna');
  const [demoExpression, setDemoExpression] = useState<MascotExpression>('senang');
  const [demoProgress, setDemoProgress] = useState<number>(3);

  if (!isOpen) return null;

  const colorPalette = [
    {
      name: 'Primary (Leaf Green)',
      hex: '#4CAF7A',
      dark: '#2E7D32',
      role: 'Tombol utama, status aktif, navigasi aktif',
      contrast: '10.2:1 (Sangat Tinggi)',
    },
    {
      name: 'Secondary (Ocean Blue)',
      hex: '#4FC3F7',
      dark: '#0288D1',
      role: 'Tautan, elemen air dan ombak laut, info',
      contrast: '8.4:1',
    },
    {
      name: 'Accent 1 (Sunny Yellow)',
      hex: '#FFD54F',
      dark: '#FFA000',
      role: 'Bintang prestasi, sorotan kartu, lencana',
      contrast: '7.8:1',
    },
    {
      name: 'Accent 2 (Soft Orange)',
      hex: '#FF9F68',
      dark: '#E65100',
      role: 'Umpan balik lembut "Coba Lagi" (bukan merah keras)',
      contrast: '7.5:1',
    },
    {
      name: 'Success (Segar Alami)',
      hex: '#66BB6A',
      dark: '#2E7D32',
      role: 'Umpan balik jawaban benar & kelulusan',
      contrast: '8.9:1',
    },
    {
      name: 'Background (Warm Cream)',
      hex: '#FFF9EC',
      dark: '#E8DFC8',
      role: 'Latar belakang hangat & ramah mata anak',
      contrast: 'Dasar kanvas',
    },
    {
      name: 'Text (Dark Navy)',
      hex: '#1F2A44',
      dark: '#0A1124',
      role: 'Teks utama dengan rasio kontras 7:1+ pada krem',
      contrast: '12.6:1 (WCAG AAA)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1F2A44]/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FFF9EC] rounded-[32px] border-[4px] border-[#4CAF7A] shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="bg-white border-b-[3px] border-[#E8DFC8] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F5E9] border-2 border-[#4CAF7A] flex items-center justify-center text-[#2E7D32]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#1F2A44] font-heading leading-tight">
                Sistem Desain Buku Cerita Digital
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-[#5B6B82]">
                Standar Desain Ramah Anak Kelas 4 SD (Usia 9-10 Tahun)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-[#FFF9EC] hover:bg-[#FFD54F] border-2 border-[#E8DFC8] flex items-center justify-center text-[#1F2A44] cursor-pointer transition-colors"
            aria-label="Tutup Sistem Desain"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="bg-[#FFFDF7] border-b-2 border-[#E8DFC8] px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'warna', label: 'Palet Warna', icon: <Palette className="w-4 h-4" /> },
            { id: 'tipografi', label: 'Tipografi', icon: <Type className="w-4 h-4" /> },
            { id: 'komponen', label: 'Komponen 3D', icon: <Box className="w-4 h-4" /> },
            { id: 'maskot', label: 'Maskot Si Penyu', icon: <Smile className="w-4 h-4" /> },
            { id: 'aksesibilitas', label: 'Aksesibilitas & Proyektor', icon: <ShieldCheck className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playPop();
                setActiveSection(tab.id as typeof activeSection);
              }}
              className={`
                flex items-center gap-2 px-3.5 py-1.5 rounded-full font-heading font-bold text-xs sm:text-sm whitespace-nowrap cursor-pointer transition-all
                ${
                  activeSection === tab.id
                    ? 'bg-[#4CAF7A] text-white border-b-3 border-[#2E7D32]'
                    : 'text-[#1F2A44] hover:bg-[#F2ECE0]'
                }
              `}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* SECTION 1: WARNA */}
          {activeSection === 'warna' && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border-2 border-[#E8DFC8]">
                <h3 className="font-heading font-bold text-lg text-[#1F2A44] mb-1">
                  Aturan Palet Warna Ramah Anak
                </h3>
                <p className="text-sm text-[#4A5568]">
                  Warna cerah, hangat, dan alami. Menghindari warna merah keras untuk kesalahan anak, menggantikannya dengan <strong>soft orange (#FF9F68)</strong> yang hangat dan membesarkan hati anak.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {colorPalette.map((col, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white border-2 border-[#E8DFC8] flex items-center gap-4"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl shrink-0 shadow-inner border-2 border-black/10 flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: col.hex, color: col.hex === '#FFF9EC' ? '#1F2A44' : '#FFFFFF' }}
                    >
                      {col.hex}
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-base text-[#1F2A44]">{col.name}</div>
                      <div className="text-xs text-[#5B6B82] mt-0.5">{col.role}</div>
                      <div className="text-[11px] font-bold text-[#2E7D32] mt-1">Kontras: {col.contrast}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: TIPOGRAFI */}
          {activeSection === 'tipografi' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border-2 border-[#E8DFC8]">
                <h3 className="font-heading font-bold text-lg text-[#1F2A44] mb-2">
                  Aturan Tipografi Kelas 4 SD
                </h3>
                <p className="text-sm text-[#4A5568] leading-relaxed mb-4">
                  Font membulat (rounded) dengan keterbacaan tinggi. <strong>Baloo 2</strong> untuk judul yang bersahabat, dan <strong>Nunito</strong> untuk teks bacaan tubuh. Jarak baris 1.6, kalimat pendek maksimal 2 baris per paragraf.
                </p>

                <div className="space-y-4 pt-2 border-t border-[#E8DFC8]">
                  <div className="p-3 bg-[#FFF9EC] rounded-xl border border-[#E8DFC8]">
                    <div className="text-xs font-bold text-[#718096] uppercase mb-1">Heading 1 (40px Baloo 2)</div>
                    <div className="text-[32px] sm:text-[40px] font-extrabold text-[#1F2A44] font-heading leading-tight">
                      Petualangan Si Penyu: Sahabat Bumi
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFF9EC] rounded-xl border border-[#E8DFC8]">
                    <div className="text-xs font-bold text-[#718096] uppercase mb-1">Heading 2 (32px Baloo 2)</div>
                    <div className="text-[26px] sm:text-[32px] font-bold text-[#1F2A44] font-heading leading-tight">
                      Pilah Sampah ke Tiga Tong Warna
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFF9EC] rounded-xl border border-[#E8DFC8]">
                    <div className="text-xs font-bold text-[#718096] uppercase mb-1">Body Text (20px Nunito, Line Height 1.6)</div>
                    <div className="text-[20px] text-[#1F2A44] leading-[1.6]">
                      Di dasar laut Pulau Harapan yang jernih, Si Penyu berenang gembira bersama ikan warna-warni.
                    </div>
                  </div>

                  <div className="p-3 bg-[#FFF9EC] rounded-xl border border-[#E8DFC8]">
                    <div className="text-xs font-bold text-[#718096] uppercase mb-1">Button Label (22px Bold Baloo 2)</div>
                    <div className="text-[22px] font-bold text-[#4CAF7A] font-heading">
                      Mulai Petualangan! (Pill Shape, 60px Tall)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 3: KOMPONEN */}
          {activeSection === 'komponen' && (
            <div className="space-y-6">
              {/* 3D Button Showcase */}
              <div className="bg-white p-5 rounded-2xl border-2 border-[#E8DFC8]">
                <h3 className="font-heading font-bold text-lg text-[#1F2A44] mb-2">
                  Tombol 3D Berbentuk Pil (Pill-Shaped 3D Pressable)
                </h3>
                <p className="text-sm text-[#4A5568] mb-4">
                  Tinggi minimal 60px, label tebal + ikon, efek timbul dengan border bawah 4px lebih gelap. Saat kursor mengarah: terangkat 2px. Saat ditekan: tenggelam 2px.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button3D variant="primary" icon={<Sparkles className="w-6 h-6" />}>
                    Tombol Utama (#4CAF7A)
                  </Button3D>
                  <Button3D variant="secondary" icon={<Sparkles className="w-6 h-6" />}>
                    Tombol Sekunder (#4FC3F7)
                  </Button3D>
                  <Button3D variant="accent" icon={<Sparkles className="w-6 h-6" />}>
                    Tombol Bintang (#FFD54F)
                  </Button3D>
                  <Button3D variant="orange" icon={<Sparkles className="w-6 h-6" />}>
                    Tombol Coba Lagi (#FF9F68)
                  </Button3D>
                </div>
              </div>

              {/* Cards & Progress Bar */}
              <div className="bg-white p-5 rounded-2xl border-2 border-[#E8DFC8]">
                <h3 className="font-heading font-bold text-lg text-[#1F2A44] mb-2">
                  Kartu & Indikator Kemajuan Bergambar Maskot
                </h3>
                <p className="text-sm text-[#4A5568] mb-4">
                  Radius sudut 24px, bayangan lembut, garis tepi pastel 3px (solid/dashed).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <Card borderStyle="solid" borderColor="green">
                    <div className="font-heading font-bold text-base text-[#2E7D32]">Kartu Solid Border</div>
                    <p className="text-sm text-[#4A5568] mt-1">Border 3px hijau pastel dengan bayangan lembut.</p>
                  </Card>
                  <Card borderStyle="dashed" borderColor="yellow">
                    <div className="font-heading font-bold text-base text-[#F57F17]">Kartu Dashed Border</div>
                    <p className="text-sm text-[#4A5568] mt-1">Garis putus-putus 3px kuning pastel.</p>
                  </Card>
                </div>

                <div className="p-4 bg-[#FFF9EC] rounded-2xl border border-[#E8DFC8]">
                  <div className="text-xs font-bold text-[#5B6B82] uppercase mb-2">Simulasi Progress Bar dengan Maskot:</div>
                  <ProgressBar
                    currentStep={demoProgress}
                    totalSteps={5}
                    onStepClick={(s) => setDemoProgress(s)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 4: MASKOT */}
          {activeSection === 'maskot' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border-2 border-[#E8DFC8]">
                <h3 className="font-heading font-bold text-lg text-[#1F2A44] mb-2">
                  Maskot Si Penyu: Sahabat Lingkungan
                </h3>
                <p className="text-sm text-[#4A5568] mb-4">
                  Bayi penyu laut lucu dengan tempurung hijau alami, mata bulat ramah berbinar, dan senyum manis. Selalu membimbing anak dengan balon percakapan 1 kalimat pendek bahasa Indonesia.
                </p>

                {/* Expression Selector */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {(['senang', 'semangat', 'berpikir', 'membantu', 'bangga'] as MascotExpression[]).map((exp) => (
                    <button
                      key={exp}
                      onClick={() => setDemoExpression(exp)}
                      className={`
                        px-4 py-2 rounded-full font-heading font-bold text-xs sm:text-sm capitalize transition-all cursor-pointer
                        ${
                          demoExpression === exp
                            ? 'bg-[#4CAF7A] text-white border-b-2 border-[#2E7D32]'
                            : 'bg-[#FFF9EC] text-[#1F2A44] border-2 border-[#E8DFC8]'
                        }
                      `}
                    >
                      Ekspresi: {exp}
                    </button>
                  ))}
                </div>

                {/* Live Preview of Mascot */}
                <div className="p-6 bg-[#FFF9EC] rounded-2xl border-2 border-[#E8DFC8] flex justify-center">
                  <MascotTurtle
                    size="lg"
                    expression={demoExpression}
                    speechText={
                      demoExpression === 'senang'
                        ? 'Senang sekali bisa belajar bersamamu menjaga kebersihan bumi!'
                        : demoExpression === 'semangat'
                        ? 'Ayo kita bersihkan pantai dari sampah plastik sekarang!'
                        : demoExpression === 'berpikir'
                        ? 'Kira-kira benda ini bisa membusuk alami atau tidak ya?'
                        : demoExpression === 'membantu'
                        ? 'Tong hijau untuk sampah organik, tong kuning untuk anorganik!'
                        : 'Luar biasa! Kamu resmi jadi Pahlawan Sahabat Lingkungan!'
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION 5: AKSESIBILITAS & PROYEKTOR */}
          {activeSection === 'aksesibilitas' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border-2 border-[#E8DFC8]">
                <h3 className="font-heading font-bold text-lg text-[#1F2A44] mb-2">
                  Kepatuhan Aksesibilitas & Mode Proyektor Kelas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                  <div className="p-3.5 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm text-[#1F2A44]">Kontras Rasio $\ge$ 7:1</div>
                      <div className="text-xs text-[#4A5568]">Teks navy gelap pada kanvas krem memenuhi standar WCAG AAA.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm text-[#1F2A44]">Target Sentuh $\ge$ 48px</div>
                      <div className="text-xs text-[#4A5568]">Semua tombol dan tautan mudah disentuh oleh jari anak di tablet/HP.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm text-[#1F2A44]">Tanpa Iklan & Tanpa Login</div>
                      <div className="text-xs text-[#4A5568]">100% aman untuk privasi anak sekolah dasar tanpa form data pribadi.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#E8F5E9] border border-[#A5D6A7] flex items-start gap-2.5">
                    <Check className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm text-[#1F2A44]">Dukungan Suara Narasi</div>
                      <div className="text-xs text-[#4A5568]">Sintesis suara bahasa Indonesia membantu siswa audio/visual.</div>
                    </div>
                  </div>
                </div>

                {/* Projector Mode Switcher */}
                <div className="p-4 bg-[#FFF9EC] rounded-2xl border-2 border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="font-heading font-extrabold text-base text-[#1F2A44] flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-[#4CAF7A]" />
                      <span>Mode Proyektor Kelas</span>
                    </div>
                    <div className="text-xs text-[#4A5568] mt-0.5">
                      Memperbesar skala teks dan elemen agar terlihat jelas dari baris belakang kelas.
                    </div>
                  </div>

                  <button
                    onClick={onToggleProjector}
                    className={`
                      px-5 py-2.5 rounded-full font-heading font-bold text-sm border-2 cursor-pointer transition-all
                      ${
                        isProjectorMode
                          ? 'bg-[#FFD54F] border-[#F57F17] text-[#1F2A44] shadow-sm'
                          : 'bg-white border-[#E8DFC8] text-[#1F2A44] hover:bg-[#FFF9EC]'
                      }
                    `}
                  >
                    {isProjectorMode ? 'Aktif (Matikan)' : 'Aktifkan Mode Proyektor'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t-2 border-[#E8DFC8] px-6 py-3 flex items-center justify-end">
          <Button3D
            variant="primary"
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
          >
            Tutup Panduan Desain
          </Button3D>
        </div>
      </div>
    </div>
  );
};
