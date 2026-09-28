import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Puzzle, Award, Heart } from 'lucide-react';
import { MascotTurtle } from '../MascotTurtle';
import { Button3D } from '../Button3D';
import { Card } from '../Card';
import { NavItem } from '../../types';

interface HomeViewProps {
  onStartAdventure: () => void;
  onNavigate: (tab: NavItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartAdventure, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center text-center">
      {/* Friendly Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF3D6] border-2 border-[#FFD54F] text-[#1F2A44] font-heading font-bold text-sm sm:text-base mb-4 animate-float">
        <Sparkles className="w-4 h-4 text-[#FFA000]" />
        <span>Buku Cerita & Petualangan Interaktif Siswa Kelas 4 SD</span>
      </div>

      {/* Main Title H1: 40px with Baloo 2 */}
      <h1 className="text-[34px] sm:text-[42px] font-extrabold text-[#1F2A44] leading-[1.2] mb-3 tracking-tight">
        Petualangan Si Penyu:<br className="hidden sm:inline" />
        <span className="text-[#4CAF7A]"> Sahabat Bersih Bumi</span>
      </h1>

      {/* Subtitle Body: 20px with Nunito, short sentences, max 2 lines */}
      <p className="text-[19px] sm:text-[21px] text-[#2C3E50] max-w-xl mb-6 font-medium leading-relaxed">
        Yuk belajar memilah sampah dan aksi 3R bersama Si Penyu! Jaga rumah laut kita tetap asri dan bahagia.
      </p>

      {/* Mascot Si Penyu with friendly speech bubble */}
      <div className="w-full flex justify-center mb-8">
        <MascotTurtle
          size="lg"
          expression="senang"
          speechText="Halo teman-teman! Siapkah kamu jadi Pahlawan Lingkungan hari ini?"
        />
      </div>

      {/* Main Primary Action Button: Pill shape, >60px, 3D pressable, bold label + icon */}
      <div className="w-full max-w-sm mb-12">
        <Button3D
          variant="primary"
          size="large"
          fullWidth
          icon={<ArrowRight className="w-7 h-7 stroke-[2.5]" />}
          onClick={onStartAdventure}
        >
          Mulai Petualangan!
        </Button3D>
      </div>

      {/* 4 Interactive Feature Adventure Cards */}
      <div className="w-full text-left">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-[24px] sm:text-[28px] font-bold text-[#1F2A44] font-heading">
            Peta Petualangan Belajar
          </h2>
          <span className="text-sm font-bold text-[#4CAF7A] flex items-center gap-1">
            <Heart className="w-4 h-4 fill-current" /> Menyenangkan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {/* Card 1: Pemanasan */}
          <Card
            borderStyle="solid"
            borderColor="green"
            interactive
            onClick={() => onNavigate('pemanasan')}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] border-2 border-[#A5D6A7] flex items-center justify-center text-[#2E7D32] shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2E7D32] font-heading uppercase">Langkah 1</div>
              <h3 className="text-[20px] font-bold text-[#1F2A44] font-heading leading-snug">Pemanasan: Kenali Sampah</h3>
              <p className="text-[16px] text-[#4A5568] mt-1 line-clamp-2">
                Temukan beda sampah organik, anorganik, dan B3 yang berbahaya bagi alam.
              </p>
            </div>
          </Card>

          {/* Card 2: Cerita */}
          <Card
            borderStyle="solid"
            borderColor="blue"
            interactive
            onClick={() => onNavigate('baca')}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#E1F5FE] border-2 border-[#B3E5FC] flex items-center justify-center text-[#0288D1] shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0288D1] font-heading uppercase">Langkah 2</div>
              <h3 className="text-[20px] font-bold text-[#1F2A44] font-heading leading-snug">Baca Cerita Bergambar</h3>
              <p className="text-[16px] text-[#4A5568] mt-1 line-clamp-2">
                Kisah Si Penyu dan teman-teman menyelamatkan terumbu karang dari kantong plastik.
              </p>
            </div>
          </Card>

          {/* Card 3: Aktivitas Pilah & 3R */}
          <Card
            borderStyle="dashed"
            borderColor="yellow"
            interactive
            onClick={() => onNavigate('aktivitas')}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFFDE7] border-2 border-[#FFE082] flex items-center justify-center text-[#F57F17] shrink-0">
              <Puzzle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#F57F17] font-heading uppercase">Langkah 3</div>
              <h3 className="text-[20px] font-bold text-[#1F2A44] font-heading leading-snug">Aktivitas Pilah & 3R</h3>
              <p className="text-[16px] text-[#4A5568] mt-1 line-clamp-2">
                Permainan seru memasukkan sampah ke tong yang tepat dan aksi 3R kreatif.
              </p>
            </div>
          </Card>

          {/* Card 4: Kuis Bintang */}
          <Card
            borderStyle="solid"
            borderColor="orange"
            interactive
            onClick={() => onNavigate('kuis')}
            className="flex items-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FFF3E0] border-2 border-[#FFCC80] flex items-center justify-center text-[#E65100] shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#E65100] font-heading uppercase">Langkah 4</div>
              <h3 className="text-[20px] font-bold text-[#1F2A44] font-heading leading-snug">Kuis Bintang Sahabat</h3>
              <p className="text-[16px] text-[#4A5568] mt-1 line-clamp-2">
                Uji pengetahuanmu dan kumpulkan 5 bintang untuk lencana kelas 4!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
