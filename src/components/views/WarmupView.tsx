import React, { useState } from 'react';
import { Apple, Milk, BatteryCharging, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { Card } from '../Card';
import { Button3D } from '../Button3D';
import { MascotTurtle } from '../MascotTurtle';
import { soundManager } from '../../utils/audio';

interface WarmupViewProps {
  onContinue: () => void;
}

export const WarmupView: React.FC<WarmupViewProps> = ({ onContinue }) => {
  const [activeCategory, setActiveCategory] = useState<'organik' | 'anorganik' | 'b3'>('organik');

  const categories = [
    {
      id: 'organik' as const,
      color: 'hijau',
      title: 'Sampah Organik',
      binColor: 'bg-[#4CAF7A]',
      binBorder: 'border-[#2E7D32]',
      tagBg: 'bg-[#E8F5E9]',
      tagText: 'text-[#2E7D32]',
      icon: <Apple className="w-8 h-8" />,
      sub: 'Berasal dari makhluk hidup',
      description: 'Mudah membusuk dan terurai alami oleh tanah. Sangat bagus dijadikan pupuk kompos penyubur tanaman!',
      examples: ['Sisa kulit buah & sayur', 'Daun dan ranting kering', 'Sisa nasi dan lauk'],
      tipPenyu: 'Sampah organik bisa kita ubah jadi pupuk kompos untuk kebun sekolah!',
      funFact: 'Kulit pisang bisa terurai dalam hitungan beberapa minggu di dalam tanah.',
    },
    {
      id: 'anorganik' as const,
      color: 'kuning',
      title: 'Sampah Anorganik',
      binColor: 'bg-[#FFD54F]',
      binBorder: 'border-[#FFA000]',
      tagBg: 'bg-[#FFF8E1]',
      tagText: 'text-[#F57F17]',
      icon: <Milk className="w-8 h-8 text-[#1F2A44]" />,
      sub: 'Bukan dari makhluk hidup',
      description: 'Sangat sulit membusuk di alam. Plastik butuh hingga 400 tahun untuk hancur, tetapi bisa kita daur ulang jadi barang baru!',
      examples: ['Botol & gelas plastik', 'Kaleng minuman ringan', 'Kardus & wadah kemasan'],
      tipPenyu: 'Teman-teman penyu sering salah mengira plastik terapung sebagai ubur-ubur lezat!',
      funFact: '1 botol plastik yang didaur ulang bisa menghemat energi menyalakan lampu selama 6 jam.',
    },
    {
      id: 'b3' as const,
      color: 'merah',
      title: 'Sampah B3 (Berbahaya)',
      binColor: 'bg-[#FF9F68]',
      binBorder: 'border-[#E65100]',
      tagBg: 'bg-[#FFF3E0]',
      tagText: 'text-[#E65100]',
      icon: <BatteryCharging className="w-8 h-8 text-[#1F2A44]" />,
      sub: 'Bahan Beracun & Berbahaya',
      description: 'Mengandung zat kimia berbahaya bagi manusia dan satwa. Jangan dibuang sembarangan, harus dikelola secara khusus!',
      examples: ['Baterai senter & HP bekas', 'Pecahan kaca bohlam lampu', 'Wadah sisa obat & detergen'],
      tipPenyu: 'Baterai bekas jangan dibakar ya, karena asap kimianya bisa meracuni udara kita.',
      funFact: 'Zat kimia dari 1 baterai yang bocor ke tanah dapat mencemari ribuan liter air bersih.',
    },
  ];

  const currentData = categories.find((c) => c.id === activeCategory)!;

  const handleSelect = (id: 'organik' | 'anorganik' | 'b3') => {
    soundManager.playPop();
    setActiveCategory(id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
      {/* Title H1 */}
      <h1 className="text-[32px] sm:text-[40px] font-extrabold text-[#1F2A44] leading-tight text-center mb-2">
        Pemanasan: Kenali Tiga Jenis Sampah
      </h1>

      {/* Subtitle Body */}
      <p className="text-[18px] sm:text-[20px] text-[#4A5568] text-center max-w-xl mb-6">
        Ketuk salah satu tong sampah di bawah ini untuk mempelajari jenisnya bersama Si Penyu!
      </p>

      {/* Mascot Speech */}
      <div className="w-full flex justify-center mb-6">
        <MascotTurtle
          size="md"
          expression="membantu"
          speechText={currentData.tipPenyu}
        />
      </div>

      {/* Chunky Interactive Category Selector (3 Trash Cans) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={`
                relative p-5 rounded-[24px] border-[3px] transition-all duration-200 text-left cursor-pointer
                flex flex-col items-center text-center
                ${
                  isSelected
                    ? `${cat.binColor} ${cat.binBorder} border-b-[6px] shadow-lg scale-102`
                    : 'bg-white border-[#E8DFC8] border-b-[4px] hover:bg-[#FFFDF7]'
                }
              `}
              aria-pressed={isSelected}
            >
              {/* Circular Bin Icon Container */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-inner ${
                  isSelected ? 'bg-white/90 text-[#1F2A44]' : 'bg-[#FFF9EC] text-[#2E7D32]'
                }`}
              >
                {cat.icon}
              </div>

              <h2 className={`text-[20px] sm:text-[22px] font-extrabold font-heading ${isSelected ? 'text-[#1F2A44]' : 'text-[#1F2A44]'}`}>
                {cat.title}
              </h2>
              <span className={`text-[15px] font-semibold mt-1 ${isSelected ? 'text-[#1F2A44]/80' : 'text-[#718096]'}`}>
                {cat.sub}
              </span>

              {isSelected && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold font-heading bg-white text-[#1F2A44] px-3 py-1 rounded-full shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF7A]" /> Sedang Dipelajari
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Card for Selected Category */}
      <Card
        borderStyle="solid"
        borderColor={activeCategory === 'organik' ? 'green' : activeCategory === 'anorganik' ? 'yellow' : 'orange'}
        className="w-full mb-8"
      >
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold font-heading uppercase ${currentData.tagBg} ${currentData.tagText}`}>
                Warna Tong: {currentData.color.toUpperCase()}
              </span>
              <span className="text-xs font-semibold text-[#718096]">Untuk Kelas 4 SD</span>
            </div>

            <h3 className="text-[26px] sm:text-[28px] font-bold text-[#1F2A44] font-heading mb-2">
              {currentData.title}
            </h3>

            <p className="text-[19px] text-[#2D3748] mb-4 leading-relaxed font-medium">
              {currentData.description}
            </p>

            {/* Examples Grid */}
            <div className="bg-[#FFF9EC] rounded-[18px] p-4 border-2 border-[#E8DFC8] mb-4">
              <div className="text-sm font-bold text-[#1F2A44] font-heading mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[#FFA000]" /> Contoh di Sekitar Kita:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {currentData.examples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2 text-[16px] font-semibold text-[#1F2A44] bg-white px-3 py-2 rounded-xl border border-[#E8DFC8]">
                    <span className="w-2 h-2 rounded-full bg-[#4CAF7A] shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Fun Fact */}
            <div className="flex items-start gap-2.5 text-sm text-[#2D3748] font-medium bg-[#E8F5E9]/60 p-3 rounded-xl border border-[#A5D6A7]">
              <AlertTriangle className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              <span>
                <strong>Tahukah Kamu?</strong> {currentData.funFact}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Single Action Button */}
      <div className="w-full max-w-sm">
        <Button3D
          variant="primary"
          fullWidth
          icon={<ArrowRight className="w-6 h-6 stroke-[2.5]" />}
          onClick={onContinue}
        >
          Lanjut Baca Cerita
        </Button3D>
      </div>
    </div>
  );
};
