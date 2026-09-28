import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { Card } from '../Card';
import { Button3D } from '../Button3D';
import { ProgressBar } from '../ProgressBar';
import { MascotTurtle } from '../MascotTurtle';
import { soundManager } from '../../utils/audio';

interface StoryViewProps {
  onCompleteStory: () => void;
}

export const StoryView: React.FC<StoryViewProps> = ({ onCompleteStory }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const storyPages = [
    {
      pageNumber: 1,
      title: 'Rumah Karang yang Indah',
      badge: 'Bagian 1: Laut yang Damai',
      sentence1: 'Di dasar laut Pulau Harapan yang jernih, Si Penyu kecil berenang gembira bersama ikan warna-warni.',
      sentence2: 'Terumbu karang tumbuh subur menjadi tempat bermain yang sejuk dan aman bagi semua satwa laut.',
      mascotTip: 'Laut yang jernih membuat rumah karang kami tetap sehat dan indah!',
      mascotExp: 'senang' as const,
      illustrationSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full rounded-2xl overflow-hidden" fill="none">
          {/* Water background gradient */}
          <rect width="400" height="240" fill="url(#oceanGrad1)" />
          <defs>
            <linearGradient id="oceanGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E1F5FE" />
              <stop offset="100%" stopColor="#81D4FA" />
            </linearGradient>
          </defs>
          {/* Sunlight beams */}
          <polygon points="40,0 90,0 120,240 20,240" fill="#FFFFFF" fillOpacity="0.25" />
          <polygon points="180,0 230,0 280,240 140,240" fill="#FFFFFF" fillOpacity="0.2" />
          <polygon points="310,0 360,0 390,240 280,240" fill="#FFFFFF" fillOpacity="0.15" />
          {/* Sea floor sand */}
          <path d="M0 190 Q 100 175 200 190 T 400 185 L 400 240 L 0 240 Z" fill="#FFE082" stroke="#FFCA28" strokeWidth="2" />
          {/* Corals */}
          <path d="M40 200 C 40 150 60 140 70 160 C 80 130 100 140 100 200 Z" fill="#FF8A65" stroke="#D84315" strokeWidth="2" />
          <path d="M290 210 C 300 160 320 150 330 170 C 340 140 360 150 370 210 Z" fill="#BA68C8" stroke="#7B1FA2" strokeWidth="2" />
          <path d="M120 205 C 130 180 145 175 155 205 Z" fill="#4DB6AC" stroke="#00796B" strokeWidth="2" />
          {/* Seaweed */}
          <path d="M20 200 Q 10 160 30 130 T 15 90" stroke="#4CAF50" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M380 200 Q 395 160 375 125 T 390 85" stroke="#4CAF50" strokeWidth="6" strokeLinecap="round" fill="none" />
          {/* Swimming baby turtle */}
          <g transform="translate(160, 75) scale(0.75)" className="animate-swim">
            <ellipse cx="60" cy="50" rx="36" ry="28" fill="#4CAF7A" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="22" cy="50" r="16" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="18" cy="46" r="3.5" fill="#1F2A44" />
            <circle cx="17" cy="45" r="1.2" fill="#FFFFFF" />
            <path d="M18 54 Q 22 58 26 54" stroke="#1F2A44" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M50 24 C 65 10 75 15 65 30" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            <path d="M50 76 C 65 90 75 85 65 70" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
          </g>
          {/* Colorful tiny friendly fish */}
          <g transform="translate(70, 90)">
            <ellipse cx="15" cy="10" rx="14" ry="8" fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
            <polygon points="26,10 36,4 36,16" fill="#FFB74D" stroke="#E65100" strokeWidth="1.5" />
            <circle cx="7" cy="8" r="2" fill="#1F2A44" />
          </g>
          <g transform="translate(270, 120)">
            <ellipse cx="12" cy="8" rx="12" ry="7" fill="#4DD0E1" stroke="#00838F" strokeWidth="1.5" />
            <polygon points="22,8 30,3 30,13" fill="#4DD0E1" stroke="#00838F" strokeWidth="1.5" />
            <circle cx="6" cy="6" r="1.5" fill="#1F2A44" />
          </g>
        </svg>
      ),
    },
    {
      pageNumber: 2,
      title: 'Benda Asing yang Menakutkan',
      badge: 'Bagian 2: Bahaya Sampah',
      sentence1: 'Suatu siang, kantong plastik dan botol bekas hanyut terbawa arus ombak ke dekat terumbu karang.',
      sentence2: 'Si Penyu hampir memakannya karena kantong plastik tampak persis seperti ubur-ubur makanan kesukaannya!',
      mascotTip: 'Sampah plastik di laut sangat berbahaya bagi kami satwa laut.',
      mascotExp: 'berpikir' as const,
      illustrationSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full rounded-2xl overflow-hidden" fill="none">
          <rect width="400" height="240" fill="url(#oceanGrad2)" />
          <defs>
            <linearGradient id="oceanGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CFD8DC" />
              <stop offset="100%" stopColor="#90A4AE" />
            </linearGradient>
          </defs>
          <path d="M0 200 Q 150 185 300 200 T 400 195 L 400 240 L 0 240 Z" fill="#D7CCC8" />
          {/* Floating plastic bag resembling jellyfish */}
          <g transform="translate(190, 60)" className="animate-float">
            <path
              d="M30 10 C 15 10 10 30 10 45 C 10 60 20 65 30 65 C 40 65 50 60 50 45 C 50 30 45 10 30 10 Z"
              fill="#FFFFFF"
              fillOpacity="0.7"
              stroke="#90A4AE"
              strokeWidth="2.5"
            />
            <path d="M15 65 Q 12 90 20 105" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fillOpacity="0.6" />
            <path d="M30 65 Q 32 95 30 110" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fillOpacity="0.6" />
            <path d="M45 65 Q 48 90 42 105" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fillOpacity="0.6" />
          </g>
          {/* Floating discarded bottle */}
          <g transform="translate(80, 120) rotate(-25)">
            <rect x="0" y="10" width="40" height="20" rx="6" fill="#B3E5FC" fillOpacity="0.8" stroke="#0288D1" strokeWidth="2" />
            <rect x="-8" y="14" width="8" height="12" rx="2" fill="#0288D1" />
          </g>
          {/* Si Penyu looking worried/cautioned */}
          <g transform="translate(60, 60) scale(0.7)">
            <ellipse cx="60" cy="50" rx="36" ry="28" fill="#81C784" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="22" cy="50" r="16" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="18" cy="46" r="3.5" fill="#1F2A44" />
            <circle cx="20" cy="44" r="1.2" fill="#FFFFFF" />
            <path d="M16 56 Q 22 52 28 55" stroke="#1F2A44" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      pageNumber: 3,
      title: 'Ajakan Bijak 3R',
      badge: 'Bagian 3: Solusi Cerdas',
      sentence1: 'Si Penyu berbisik kepada sahabatnya di daratan: "Ayo kita terapkan 3R agar sampah tidak masuk ke laut!"',
      sentence2: 'Reduce kurangi barang sekali pakai, Reuse pakai kembali wadah, dan Recycle olah sampah jadi bermanfaat.',
      mascotTip: '3R adalah jurus hebat kita: Kurangi, Pakai Lagi, dan Daur Ulang!',
      mascotExp: 'semangat' as const,
      illustrationSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full rounded-2xl overflow-hidden" fill="none">
          <rect width="400" height="240" fill="#E8F5E9" />
          {/* 3 Interactive circles for 3R */}
          <g transform="translate(45, 60)">
            <circle cx="45" cy="45" r="40" fill="#C8E6C9" stroke="#2E7D32" strokeWidth="3" />
            <text x="45" y="42" textAnchor="middle" fill="#1F2A44" fontFamily="Baloo 2" fontWeight="bold" fontSize="16">REDUCE</text>
            <text x="45" y="60" textAnchor="middle" fill="#2E7D32" fontFamily="Nunito" fontWeight="bold" fontSize="12">Kurangi</text>
          </g>
          <g transform="translate(155, 60)">
            <circle cx="45" cy="45" r="40" fill="#B3E5FC" stroke="#0288D1" strokeWidth="3" />
            <text x="45" y="42" textAnchor="middle" fill="#1F2A44" fontFamily="Baloo 2" fontWeight="bold" fontSize="16">REUSE</text>
            <text x="45" y="60" textAnchor="middle" fill="#0288D1" fontFamily="Nunito" fontWeight="bold" fontSize="12">Pakai Lagi</text>
          </g>
          <g transform="translate(265, 60)">
            <circle cx="45" cy="45" r="40" fill="#FFE082" stroke="#FFA000" strokeWidth="3" />
            <text x="45" y="42" textAnchor="middle" fill="#1F2A44" fontFamily="Baloo 2" fontWeight="bold" fontSize="16">RECYCLE</text>
            <text x="45" y="60" textAnchor="middle" fill="#F57F17" fontFamily="Nunito" fontWeight="bold" fontSize="12">Daur Ulang</text>
          </g>
          {/* Cheerful mascot Si Penyu cheering at bottom */}
          <g transform="translate(170, 150) scale(0.65)" className="animate-swim">
            <ellipse cx="60" cy="50" rx="36" ry="28" fill="#4CAF7A" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="60" cy="20" r="16" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="54" cy="18" r="3" fill="#1F2A44" />
            <circle cx="66" cy="18" r="3" fill="#1F2A44" />
            <path d="M56 25 Q 60 29 64 25" stroke="#1F2A44" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        </svg>
      ),
    },
    {
      pageNumber: 4,
      title: 'Gotong Royong Bersih Pantai',
      badge: 'Bagian 4: Aksi Nyata',
      sentence1: 'Anak-anak kelas 4 SD bersama guru datang ke pantai dengan membawa tiga tong sampah warna-warni.',
      sentence2: 'Mereka memasukkan sisa buah ke tong hijau, botol ke tong kuning, dan pecahan lampu ke tong merah.',
      mascotTip: 'Memilah sampah bersama teman-teman terasa sangat seru dan ringan!',
      mascotExp: 'bangga' as const,
      illustrationSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full rounded-2xl overflow-hidden" fill="none">
          <rect width="400" height="240" fill="#FFF8E1" />
          <path d="M0 130 Q 200 110 400 130 L 400 240 L 0 240 Z" fill="#FFE082" />
          {/* Sun */}
          <circle cx="340" cy="50" r="28" fill="#FFD54F" stroke="#FFA000" strokeWidth="3" />
          {/* Three Trash Cans */}
          {/* Green Bin */}
          <g transform="translate(90, 140)">
            <rect x="0" y="10" width="46" height="58" rx="8" fill="#4CAF7A" stroke="#2E7D32" strokeWidth="2.5" />
            <rect x="-4" y="6" width="54" height="10" rx="5" fill="#388E3C" stroke="#2E7D32" strokeWidth="2" />
            <text x="23" y="44" textAnchor="middle" fill="#FFFFFF" fontFamily="Baloo 2" fontWeight="bold" fontSize="11">ORGANIK</text>
          </g>
          {/* Yellow Bin */}
          <g transform="translate(175, 140)">
            <rect x="0" y="10" width="46" height="58" rx="8" fill="#FFD54F" stroke="#FFA000" strokeWidth="2.5" />
            <rect x="-4" y="6" width="54" height="10" rx="5" fill="#FFCA28" stroke="#FFA000" strokeWidth="2" />
            <text x="23" y="44" textAnchor="middle" fill="#1F2A44" fontFamily="Baloo 2" fontWeight="bold" fontSize="10">ANORGANIK</text>
          </g>
          {/* Red/Orange Bin */}
          <g transform="translate(260, 140)">
            <rect x="0" y="10" width="46" height="58" rx="8" fill="#FF9F68" stroke="#E65100" strokeWidth="2.5" />
            <rect x="-4" y="6" width="54" height="10" rx="5" fill="#FF8A50" stroke="#E65100" strokeWidth="2" />
            <text x="23" y="44" textAnchor="middle" fill="#1F2A44" fontFamily="Baloo 2" fontWeight="bold" fontSize="11">B3 KHUSUS</text>
          </g>
        </svg>
      ),
    },
    {
      pageNumber: 5,
      title: 'Lautan Bersih dan Senyum Penyu',
      badge: 'Bagian 5: Rumah Masa Depan',
      sentence1: 'Kini pantai dan laut Pulau Harapan kembali bersinar indah tanpa sampah plastik yang membahayakan.',
      sentence2: 'Si Penyu tersenyum lebar: "Terima kasih anak-anak hebat kelas 4, kalian pahlawan bumi sejati!"',
      mascotTip: 'Kamu sekarang siap mencoba latihan pilah sampah di menu Aktivitas!',
      mascotExp: 'bangga' as const,
      illustrationSvg: (
        <svg viewBox="0 0 400 240" className="w-full h-full rounded-2xl overflow-hidden" fill="none">
          <rect width="400" height="240" fill="url(#oceanGrad5)" />
          <defs>
            <linearGradient id="oceanGrad5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F7FA" />
              <stop offset="100%" stopColor="#4DD0E1" />
            </linearGradient>
          </defs>
          <path d="M0 180 Q 200 160 400 180 L 400 240 L 0 240 Z" fill="#FFF9C4" />
          {/* Happy Turtle with golden star */}
          <g transform="translate(150, 70)" className="animate-float">
            <ellipse cx="50" cy="45" rx="36" ry="28" fill="#4CAF7A" stroke="#2E7D32" strokeWidth="3" />
            <circle cx="16" cy="45" r="16" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            {/* Sparkly eye */}
            <circle cx="12" cy="41" r="3.5" fill="#1F2A44" />
            <circle cx="11" cy="40" r="1.2" fill="#FFFFFF" />
            {/* Happy smile */}
            <path d="M12 49 Q 17 55 22 49" stroke="#1F2A44" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M40 18 C 55 5 65 10 55 25" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
            <path d="M40 72 C 55 85 65 80 55 65" fill="#A5D6A7" stroke="#2E7D32" strokeWidth="3" />
          </g>
          {/* Golden Stars in air */}
          <g transform="translate(80, 50)" className="animate-float">
            <polygon points="15,2 18,10 26,11 20,17 22,25 15,21 8,25 10,17 4,11 12,10" fill="#FFD54F" stroke="#FFA000" strokeWidth="2" />
          </g>
          <g transform="translate(290, 40)" className="animate-float" style={{ animationDelay: '1s' }}>
            <polygon points="15,2 18,10 26,11 20,17 22,25 15,21 8,25 10,17 4,11 12,10" fill="#FFD54F" stroke="#FFA000" strokeWidth="2" />
          </g>
        </svg>
      ),
    },
  ];

  const currentStory = storyPages[currentPage - 1];

  const handleNext = () => {
    if (currentPage < storyPages.length) {
      soundManager.playPop();
      setCurrentPage((prev) => prev + 1);
    } else {
      soundManager.playSuccess();
      onCompleteStory();
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      soundManager.playPop();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleReadAloud = () => {
    const fullText = `${currentStory.title}. ${currentStory.sentence1} ${currentStory.sentence2}`;
    soundManager.speakIndonesian(fullText);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
      {/* Step Progress Bar with turtle mascot */}
      <ProgressBar
        currentStep={currentPage}
        totalSteps={storyPages.length}
        stepLabels={storyPages.map((p) => `Halaman ${p.pageNumber}`)}
        onStepClick={(step) => {
          soundManager.playPop();
          setCurrentPage(step);
        }}
        className="mb-6"
      />

      {/* Main Storybook Frame Card: 24px radius, soft shadow, pastel border */}
      <Card
        borderStyle="solid"
        borderColor="blue"
        className="w-full max-w-3xl overflow-hidden p-6 sm:p-10 mb-6 bg-[#FFFFFF]"
      >
        {/* Chapter Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b-2 border-[#E8DFC8]/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-[#E1F5FE] text-[#0288D1] font-heading font-extrabold text-xs sm:text-sm">
              {currentStory.badge}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#718096]">
              Buku Cerita Bergambar
            </span>
          </div>

          {/* Voice Narration Button: Read Aloud in Indonesian */}
          <button
            onClick={handleReadAloud}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF9EC] hover:bg-[#FFD54F] border-2 border-[#E8DFC8] text-[#1F2A44] font-heading font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            aria-label="Bacakan halaman ini"
            title="Dengarkan Suara Cerita"
          >
            <Volume2 className="w-4 h-4 text-[#2E7D32]" />
            <span>Bacakan Teks</span>
          </button>
        </div>

        {/* Visual Story Illustration Box */}
        <div className="w-full h-52 sm:h-64 mb-6 rounded-2xl border-2 border-[#E8DFC8] overflow-hidden bg-[#F0F7FF] shadow-inner flex items-center justify-center">
          {currentStory.illustrationSvg}
        </div>

        {/* Story Title H2: 32px */}
        <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#1F2A44] font-heading mb-4 text-left leading-tight">
          {currentStory.title}
        </h2>

        {/* Story Sentences: Body 20px, line height 1.6, max 2 lines per block */}
        <div className="space-y-3 text-left mb-6">
          <p className="text-[19px] sm:text-[21px] text-[#1F2A44] font-medium leading-[1.6]">
            {currentStory.sentence1}
          </p>
          <p className="text-[19px] sm:text-[21px] text-[#2C3E50] font-medium leading-[1.6]">
            {currentStory.sentence2}
          </p>
        </div>

        {/* Mascot Speech Bubble Guidance */}
        <div className="pt-2 border-t-2 border-[#E8DFC8]/60">
          <MascotTurtle
            size="sm"
            expression={currentStory.mascotExp}
            speechText={currentStory.mascotTip}
          />
        </div>
      </Card>

      {/* Chunky Page Navigation Actions */}
      <div className="w-full max-w-xl flex items-center justify-between gap-4">
        {/* Previous Button */}
        <Button3D
          variant="white"
          onClick={handlePrev}
          disabled={currentPage === 1}
          icon={<ChevronLeft className="w-6 h-6" />}
          className="min-w-[130px]"
        >
          Sebelumnya
        </Button3D>

        {/* Page Indicator Dot */}
        <div className="text-sm font-bold text-[#718096] font-heading">
          {currentPage} / {storyPages.length}
        </div>

        {/* Next or Finish Button */}
        {currentPage < storyPages.length ? (
          <Button3D
            variant="primary"
            onClick={handleNext}
            icon={<ChevronRight className="w-6 h-6 stroke-[2.5]" />}
            className="min-w-[150px]"
          >
            Halaman Berikut
          </Button3D>
        ) : (
          <Button3D
            variant="accent"
            onClick={handleNext}
            icon={<Sparkles className="w-6 h-6" />}
            className="min-w-[170px]"
          >
            Ayo Mainkan Aktivitas!
          </Button3D>
        )}
      </div>
    </div>
  );
};
