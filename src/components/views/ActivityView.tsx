import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Apple,
  Milk,
  BatteryCharging,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  ShoppingBag,
  Leaf,
  Coffee,
} from 'lucide-react';
import { Card } from '../Card';
import { Button3D } from '../Button3D';
import { MascotTurtle } from '../MascotTurtle';
import { soundManager } from '../../utils/audio';

interface ActivityViewProps {
  onContinueToQuiz: () => void;
}

interface WasteGameItem {
  id: string;
  name: string;
  category: 'organik' | 'anorganik' | 'b3';
  iconNode: React.ReactNode;
  hint: string;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ onContinueToQuiz }) => {
  const [activeTab, setActiveTab] = useState<'pilah' | 'tigaR'>('pilah');

  // --- GAME 1: PILAH SAMPAH ---
  const wasteItems: WasteGameItem[] = [
    {
      id: 'apel',
      name: 'Sisa Apel',
      category: 'organik',
      iconNode: <Apple className="w-8 h-8 text-[#2E7D32]" />,
      hint: 'Sisa buah berasal dari tanaman yang dapat membusuk menjadi kompos.',
    },
    {
      id: 'botol',
      name: 'Botol Plastik',
      category: 'anorganik',
      iconNode: <Milk className="w-8 h-8 text-[#0288D1]" />,
      hint: 'Plastik sulit hancur secara alami, tapi bisa didaur ulang jadi botol baru.',
    },
    {
      id: 'baterai',
      name: 'Baterai Bekas',
      category: 'b3',
      iconNode: <BatteryCharging className="w-8 h-8 text-[#E65100]" />,
      hint: 'Baterai mengandung zat kimia beracun dan harus masuk tong khusus.',
    },
    {
      id: 'daun',
      name: 'Daun Kering',
      category: 'organik',
      iconNode: <Leaf className="w-8 h-8 text-[#2E7D32]" />,
      hint: 'Guguran dedaunan pohon sangat baik untuk pupuk tanah alami.',
    },
    {
      id: 'kaleng',
      name: 'Kaleng Minuman',
      category: 'anorganik',
      iconNode: <Coffee className="w-8 h-8 text-[#F57F17]" />,
      hint: 'Aluminium kaleng bisa dilebur kembali di pabrik daur ulang.',
    },
    {
      id: 'kantong',
      name: 'Kantong Kresek',
      category: 'anorganik',
      iconNode: <ShoppingBag className="w-8 h-8 text-[#0288D1]" />,
      hint: 'Plastik kresek berbahaya bila hanyut ke laut dan dimakan hewan.',
    },
  ];

  const [currentWasteIndex, setCurrentWasteIndex] = useState<number>(0);
  const [sortedCount, setSortedCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'try_again' | null;
    message: string;
  }>({ status: null, message: '' });
  const [stars, setStars] = useState<number>(0);

  const currentItem = wasteItems[currentWasteIndex];

  const handleSelectBin = (selectedBin: 'organik' | 'anorganik' | 'b3') => {
    if (!currentItem) return;

    if (selectedBin === currentItem.category) {
      // Correct!
      soundManager.playSuccess();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4CAF7A', '#FFD54F', '#4FC3F7', '#66BB6A'],
      });
      setFeedback({
        status: 'correct',
        message: `Tepat sekali! ${currentItem.name} dimasukkan ke tong yang benar.`,
      });
      setStars((prev) => prev + 1);

      setTimeout(() => {
        if (currentWasteIndex + 1 < wasteItems.length) {
          setCurrentWasteIndex((prev) => prev + 1);
          setSortedCount((prev) => prev + 1);
          setFeedback({ status: null, message: '' });
        } else {
          setSortedCount((prev) => prev + 1);
          setFeedback({
            status: 'correct',
            message: 'Hore! Semua sampah berhasil dipilah dengan rapi!',
          });
        }
      }, 1300);
    } else {
      // Gentle soft-orange feedback (Never harsh red)
      soundManager.playEncourage();
      setFeedback({
        status: 'try_again',
        message: `Hampir tepat! ${currentItem.hint} Yuk coba tong lainnya!`,
      });
    }
  };

  const handleResetWasteGame = () => {
    soundManager.playPop();
    setCurrentWasteIndex(0);
    setSortedCount(0);
    setFeedback({ status: null, message: '' });
    setStars(0);
  };

  // --- GAME 2: TANTANGAN 3R ---
  const scenarios3R = [
    {
      id: 's1',
      title: 'Aksi 1: Reduce (Mengurangi Sampah)',
      situation: 'Saat jam istirahat sekolah, kamu ingin membeli air minum di kantin. Pilihan terbaik:',
      options: [
        {
          id: 'opt1',
          text: 'Membawa botol minum (tumbler) dari rumah yang bisa diisi ulang',
          isCorrect: true,
          explanation: 'Hebat! Membawa tumbler mengurangi timbulan botol plastik sekali pakai.',
        },
        {
          id: 'opt2',
          text: 'Membeli air mineral botol plastik baru setiap jam istirahat',
          isCorrect: false,
          explanation: 'Yuk coba lagi! Membeli botol plastik setiap hari akan menumpuk sampah plastik.',
        },
      ],
    },
    {
      id: 's2',
      title: 'Aksi 2: Reuse (Menggunakan Kembali)',
      situation: 'Ada kaleng biskuit lebaran yang sudah kosong dan bersih di dapur rumahmu. Sebaiknya:',
      options: [
        {
          id: 'opt1',
          text: 'Menghias kaleng dengan cat warna-warni untuk wadah pensil dan kuas',
          isCorrect: true,
          explanation: 'Pintar! Menggunakan kembali wadah kaleng menghemat pengeluaran dan seru!',
        },
        {
          id: 'opt2',
          text: 'Langsung melemparkannya ke halaman belakang sampai berkarat',
          isCorrect: false,
          explanation: 'Yuk coba lagi! Kaleng yang dibiarkan bisa menampung air hujan dan jadi sarang nyamuk.',
        },
      ],
    },
    {
      id: 's3',
      title: 'Aksi 3: Recycle (Mendaur Ulang)',
      situation: 'Di akhir semester, banyak kertas tugas lama dan kardus bekas yang tak terpakai:',
      options: [
        {
          id: 'opt1',
          text: 'Mengumpulkan dan menyetorkannya ke Bank Sampah untuk didaur ulang',
          isCorrect: true,
          explanation: 'Luar biasa! Kertas bekas di Bank Sampah diolah jadi kertas baru tanpa menebang pohon baru.',
        },
        {
          id: 'opt2',
          text: 'Membakar kertas dan kardus tersebut di samping rumah hingga timbul asap',
          isCorrect: false,
          explanation: 'Yuk coba lagi! Membakar sampah menimbulkan asap pekat yang mencemari udara pernapasan kita.',
        },
      ],
    },
  ];

  const [scenarioStep, setScenarioStep] = useState<number>(0);
  const [selected3ROption, setSelected3ROption] = useState<string | null>(null);
  const [feedback3R, setFeedback3R] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completed3R, setCompleted3R] = useState<boolean>(false);

  const current3R = scenarios3R[scenarioStep];

  const handleChoose3R = (optionId: string, isCorrect: boolean, explanation: string) => {
    setSelected3ROption(optionId);
    if (isCorrect) {
      soundManager.playSuccess();
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#4CAF7A', '#FFD54F', '#4FC3F7'],
      });
      setFeedback3R({ isCorrect: true, text: explanation });
    } else {
      soundManager.playEncourage();
      setFeedback3R({ isCorrect: false, text: explanation });
    }
  };

  const handleNext3R = () => {
    soundManager.playPop();
    if (scenarioStep + 1 < scenarios3R.length) {
      setScenarioStep((prev) => prev + 1);
      setSelected3ROption(null);
      setFeedback3R(null);
    } else {
      setCompleted3R(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
      {/* Title H1 */}
      <h1 className="text-[32px] sm:text-[40px] font-extrabold text-[#1F2A44] leading-tight text-center mb-2">
        Aktivitas: Arena Bermain Lingkungan
      </h1>
      <p className="text-[18px] sm:text-[20px] text-[#4A5568] text-center max-w-xl mb-6">
        Asah kemampuanmu memilah sampah dan memilih aksi 3R yang bijak bersama Si Penyu!
      </p>

      {/* Chunky Tab Selector for the 2 Activities */}
      <div className="flex items-center gap-3 p-1.5 bg-[#FFFDF7] border-[3px] border-[#E8DFC8] rounded-full mb-8 shadow-xs">
        <button
          onClick={() => {
            soundManager.playPop();
            setActiveTab('pilah');
          }}
          className={`
            flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-full font-heading font-bold text-base sm:text-lg transition-all cursor-pointer
            ${
              activeTab === 'pilah'
                ? 'bg-[#4CAF7A] text-white border-b-[4px] border-[#2E7D32] shadow-sm'
                : 'text-[#1F2A44] hover:bg-[#F2ECE0]'
            }
          `}
        >
          <Sparkles className="w-5 h-5" />
          <span>Game 1: Pilah Sampah</span>
        </button>

        <button
          onClick={() => {
            soundManager.playPop();
            setActiveTab('tigaR');
          }}
          className={`
            flex items-center gap-2 px-6 py-3 min-h-[48px] rounded-full font-heading font-bold text-base sm:text-lg transition-all cursor-pointer
            ${
              activeTab === 'tigaR'
                ? 'bg-[#4CAF7A] text-white border-b-[4px] border-[#2E7D32] shadow-sm'
                : 'text-[#1F2A44] hover:bg-[#F2ECE0]'
            }
          `}
        >
          <Layers className="w-5 h-5" />
          <span>Game 2: Aksi 3R</span>
        </button>
      </div>

      {/* Mascot Guidance */}
      <div className="w-full flex justify-center mb-6">
        <MascotTurtle
          size="md"
          expression={feedback.status === 'try_again' ? 'berpikir' : 'semangat'}
          speechText={
            activeTab === 'pilah'
              ? 'Ketuk salah satu dari 3 tong di bawah yang sesuai dengan sampah di tengah!'
              : 'Pilihlah tindakan yang paling bijak dan ramah lingkungan ya, teman!'
          }
        />
      </div>

      {/* ---------------- GAME 1 CONTENT ---------------- */}
      {activeTab === 'pilah' && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          {sortedCount < wasteItems.length ? (
            <Card borderStyle="solid" borderColor="yellow" className="w-full text-center mb-6">
              {/* Score / Progress badge */}
              <div className="flex items-center justify-between mb-4 border-b-2 border-[#E8DFC8]/60 pb-3">
                <span className="text-sm font-bold text-[#2E7D32] font-heading">
                  Sampah ke-{currentWasteIndex + 1} dari {wasteItems.length}
                </span>
                <div className="flex items-center gap-1 text-[#FFA000] font-heading font-bold text-sm">
                  <span>Bintang: {stars}</span>
                  <Award className="w-5 h-5 fill-[#FFD54F] text-[#FFA000]" />
                </div>
              </div>

              {/* Waste Item to be Sorted */}
              <div className="my-4 flex flex-col items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#FFF9EC] border-4 border-[#FFD54F] flex items-center justify-center mb-3 shadow-md animate-float">
                  {currentItem.iconNode}
                </div>
                <h3 className="text-[28px] font-extrabold text-[#1F2A44] font-heading">
                  {currentItem.name}
                </h3>
                <p className="text-[17px] text-[#5B6B82] mt-1 font-medium">
                  Harus dibuang ke tong warna apa ya?
                </p>
              </div>

              {/* Feedback Alert if any */}
              {feedback.status && (
                <div
                  className={`p-3.5 rounded-2xl mb-4 font-heading font-bold text-base transition-all ${
                    feedback.status === 'correct'
                      ? 'bg-[#E8F5E9] border-2 border-[#66BB6A] text-[#2E7D32]'
                      : 'bg-[#FFF3E0] border-2 border-[#FF9F68] text-[#D84315]'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              {/* 3 Trash Can Bins Selection (Buttons) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                {/* Organik Bin */}
                <button
                  onClick={() => handleSelectBin('organik')}
                  className="p-4 rounded-2xl bg-[#4CAF7A] hover:bg-[#43A047] border-b-[5px] border-[#2E7D32] active:border-b-[2px] active:translate-y-[3px] text-white flex flex-col items-center justify-center cursor-pointer transition-all min-h-[90px]"
                >
                  <Apple className="w-7 h-7 mb-1" />
                  <span className="font-heading font-extrabold text-lg">Tong Hijau</span>
                  <span className="text-xs text-white/90 font-medium">Organik (Alami)</span>
                </button>

                {/* Anorganik Bin */}
                <button
                  onClick={() => handleSelectBin('anorganik')}
                  className="p-4 rounded-2xl bg-[#FFD54F] hover:bg-[#FFCA28] border-b-[5px] border-[#FFA000] active:border-b-[2px] active:translate-y-[3px] text-[#1F2A44] flex flex-col items-center justify-center cursor-pointer transition-all min-h-[90px]"
                >
                  <Milk className="w-7 h-7 mb-1" />
                  <span className="font-heading font-extrabold text-lg">Tong Kuning</span>
                  <span className="text-xs text-[#1F2A44]/80 font-medium">Anorganik (Plastik)</span>
                </button>

                {/* B3 Bin */}
                <button
                  onClick={() => handleSelectBin('b3')}
                  className="p-4 rounded-2xl bg-[#FF9F68] hover:bg-[#FF8A50] border-b-[5px] border-[#E65100] active:border-b-[2px] active:translate-y-[3px] text-[#1F2A44] flex flex-col items-center justify-center cursor-pointer transition-all min-h-[90px]"
                >
                  <BatteryCharging className="w-7 h-7 mb-1" />
                  <span className="font-heading font-extrabold text-lg">Tong Merah</span>
                  <span className="text-xs text-[#1F2A44]/80 font-medium">B3 (Berbahaya)</span>
                </button>
              </div>
            </Card>
          ) : (
            /* Celebration Screen when all sorted */
            <Card borderStyle="solid" borderColor="green" className="w-full text-center p-8 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#E8F5E9] text-[#4CAF7A] flex items-center justify-center mx-auto mb-4 border-4 border-[#A5D6A7]">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-[30px] font-extrabold text-[#1F2A44] font-heading mb-2">
                Hebat Sekali! Kamu Lulus Memilah Sampah!
              </h2>
              <p className="text-[19px] text-[#4A5568] max-w-md mx-auto mb-6">
                Kamu telah berhasil membantu Si Penyu menaruh semua jenis sampah di tong yang tepat.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button3D
                  variant="white"
                  icon={<RefreshCw className="w-5 h-5" />}
                  onClick={handleResetWasteGame}
                >
                  Main Lagi
                </Button3D>

                <Button3D
                  variant="primary"
                  icon={<ArrowRight className="w-6 h-6 stroke-[2.5]" />}
                  onClick={() => setActiveTab('tigaR')}
                >
                  Coba Aksi 3R Sekarang!
                </Button3D>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ---------------- GAME 2: 3R CHALLENGE ---------------- */}
      {activeTab === 'tigaR' && (
        <div className="w-full max-w-2xl flex flex-col items-center">
          {!completed3R ? (
            <Card borderStyle="solid" borderColor="blue" className="w-full mb-6">
              <div className="flex items-center justify-between mb-4 border-b-2 border-[#E8DFC8]/60 pb-3">
                <span className="text-xs sm:text-sm font-bold text-[#0288D1] font-heading uppercase">
                  Tantangan {scenarioStep + 1} dari {scenarios3R.length}
                </span>
                <span className="text-xs font-semibold text-[#718096]">
                  Aksi Peduli Lingkungan Kelas 4
                </span>
              </div>

              <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#1F2A44] font-heading mb-2">
                {current3R.title}
              </h2>
              <p className="text-[19px] sm:text-[20px] text-[#2D3748] mb-6 font-medium leading-relaxed">
                {current3R.situation}
              </p>

              {/* 2 Big Choice Buttons */}
              <div className="space-y-3 mb-6">
                {current3R.options.map((opt) => {
                  const isSelected = selected3ROption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleChoose3R(opt.id, opt.isCorrect, opt.explanation)}
                      className={`
                        w-full p-4 sm:p-5 rounded-[20px] border-[3px] text-left transition-all duration-200 cursor-pointer flex items-start gap-3
                        ${
                          isSelected
                            ? opt.isCorrect
                              ? 'bg-[#E8F5E9] border-[#4CAF7A] border-b-[5px] text-[#1F2A44] shadow-md'
                              : 'bg-[#FFF3E0] border-[#FF9F68] border-b-[5px] text-[#1F2A44]'
                            : 'bg-white border-[#E8DFC8] border-b-[4px] hover:bg-[#FFFDF7]'
                        }
                      `}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-xs border-2 ${
                          isSelected && opt.isCorrect
                            ? 'bg-[#4CAF7A] border-[#2E7D32] text-white'
                            : isSelected && !opt.isCorrect
                            ? 'bg-[#FF9F68] border-[#E65100] text-[#1F2A44]'
                            : 'bg-[#FFF9EC] border-[#E8DFC8] text-[#1F2A44]'
                        }`}
                      >
                        {opt.id === 'opt1' ? 'A' : 'B'}
                      </span>
                      <span className="text-[18px] sm:text-[19px] font-semibold leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Banner */}
              {feedback3R && (
                <div
                  className={`p-4 rounded-2xl mb-4 font-heading font-bold text-base sm:text-lg flex items-start gap-2 ${
                    feedback3R.isCorrect
                      ? 'bg-[#E8F5E9] border-2 border-[#66BB6A] text-[#2E7D32]'
                      : 'bg-[#FFF3E0] border-2 border-[#FF9F68] text-[#D84315]'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {feedback3R.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                    ) : (
                      <HelpCircle className="w-5 h-5 text-[#E65100]" />
                    )}
                  </span>
                  <span>{feedback3R.text}</span>
                </div>
              )}

              {/* Next Step Button */}
              {feedback3R && feedback3R.isCorrect && (
                <div className="flex justify-end pt-2">
                  <Button3D
                    variant="primary"
                    onClick={handleNext3R}
                    icon={<ArrowRight className="w-6 h-6 stroke-[2.5]" />}
                  >
                    {scenarioStep + 1 < scenarios3R.length ? 'Aksi Selanjutnya' : 'Selesai Aksi 3R!'}
                  </Button3D>
                </div>
              )}
            </Card>
          ) : (
            /* 3R Finished Celebration */
            <Card borderStyle="solid" borderColor="yellow" className="w-full text-center p-8 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#FFF9C4] text-[#F57F17] flex items-center justify-center mx-auto mb-4 border-4 border-[#FFE082]">
                <Award className="w-12 h-12" />
              </div>
              <h2 className="text-[30px] font-extrabold text-[#1F2A44] font-heading mb-2">
                Luar Biasa! Kamu Juara Aksi 3R!
              </h2>
              <p className="text-[19px] text-[#4A5568] max-w-md mx-auto mb-6">
                Kamu sudah paham cara Mengurangi (Reduce), Menggunakan Ulang (Reuse), dan Mendaur Ulang (Recycle).
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button3D
                  variant="accent"
                  size="large"
                  icon={<Award className="w-6 h-6" />}
                  onClick={onContinueToQuiz}
                >
                  Ikuti Kuis Bintang Sekarang!
                </Button3D>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
