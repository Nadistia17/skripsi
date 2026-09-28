import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, Star, CheckCircle2, HelpCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { Card } from '../Card';
import { Button3D } from '../Button3D';
import { MascotTurtle } from '../MascotTurtle';
import { soundManager } from '../../utils/audio';
import { QuizQuestion } from '../../types';

export const QuizView: React.FC = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'Sampah sisa kulit pisang dan daun gugur termasuk jenis sampah apa?',
      options: [
        { id: 'a', text: 'Sampah Organik (dapat membusuk jadi pupuk)', isCorrect: true },
        { id: 'b', text: 'Sampah Anorganik (plastik dan kaleng)', isCorrect: false },
        { id: 'c', text: 'Sampah B3 yang berbahaya', isCorrect: false },
      ],
      explanation: 'Benar sekali! Sisa buah dan daun berasal dari makhluk hidup sehingga cepat terurai menjadi kompos alami.',
    },
    {
      id: 2,
      question: 'Mengapa kantong plastik yang dibuang ke laut sangat berbahaya bagi Si Penyu?',
      options: [
        { id: 'a', text: 'Penyu mengira plastik itu temannya', isCorrect: false },
        { id: 'b', text: 'Penyu sering mengira plastik adalah ubur-ubur makanan kesukaannya', isCorrect: true },
        { id: 'c', text: 'Plastik membuat air laut menjadi terlalu dingin', isCorrect: false },
      ],
      explanation: 'Tepat! Kantong plastik yang melayang di air laut tampak persis seperti ubur-ubur, sehingga penyu bisa tersedak.',
    },
    {
      id: 3,
      question: 'Tindakan "Reuse" (Menggunakan Kembali) paling tepat dicontohkan dengan:',
      options: [
        { id: 'a', text: 'Mengubah botol plastik bekas menjadi pot tanaman hias', isCorrect: true },
        { id: 'b', text: 'Membuang kantong kresek setelah sekali dipakai', isCorrect: false },
        { id: 'c', text: 'Membakar sampah di kebun sekolah', isCorrect: false },
      ],
      explanation: 'Hebat! Memakai kembali botol plastik jadi pot bunga memperpanjang umur benda dan mencegah sampah menumpuk.',
    },
    {
      id: 4,
      question: 'Baterai bekas dan pecahan lampu bohlam harus dibuang ke tong khusus karena:',
      options: [
        { id: 'a', text: 'Harganya mahal bila dijual lagi', isCorrect: false },
        { id: 'b', text: 'Mengandung zat kimia berbahaya dan beracun (B3)', isCorrect: true },
        { id: 'c', text: 'Dapat membusuk dalam waktu 2 hari', isCorrect: false },
      ],
      explanation: 'Pintar! Baterai dan pecahan lampu beracun, sehingga harus ditangani khusus agar tidak meracuni air dan tanah.',
    },
    {
      id: 5,
      question: 'Langkah sederhana apa yang bisa siswa kelas 4 lakukan setiap hari di sekolah?',
      options: [
        { id: 'a', text: 'Membawa tumbler minum dan kotak bekal sendiri dari rumah', isCorrect: true },
        { id: 'b', text: 'Menghabiskan 5 kantong kresek setiap jajan di kantin', isCorrect: false },
        { id: 'c', text: 'Menimbun botol plastik di dalam laci meja kelas', isCorrect: false },
      ],
      explanation: 'Luar biasa! Membawa tumbler dan tempat makan sendiri adalah aksi nyata Reduce (mengurangi sampah plastik)!',
    },
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('Siswa Hebat Kelas 4');

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optId: string, isCorrect: boolean, explanation: string) => {
    setSelectedOption(optId);
    if (isCorrect) {
      soundManager.playSuccess();
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#4CAF7A', '#FFD54F', '#66BB6A'],
      });
      setFeedback({ isCorrect: true, text: explanation });
      setScore((prev) => prev + 1);
    } else {
      // Gentle soft-orange feedback (never harsh red)
      soundManager.playEncourage();
      setFeedback({
        isCorrect: false,
        text: 'Yuk coba lagi, teman! Pikirkan mana pilihan yang paling ramah dan aman bagi alam.',
      });
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#4CAF7A', '#FFD54F', '#4FC3F7', '#FF9F68'],
      });
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playPop();
    setCurrentIdx(0);
    setSelectedOption(null);
    setFeedback(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-8 flex flex-col items-center">
      {/* Title H1 */}
      <h1 className="text-[32px] sm:text-[40px] font-extrabold text-[#1F2A44] leading-tight text-center mb-2">
        Kuis Bintang: Sahabat Lingkungan
      </h1>
      <p className="text-[18px] sm:text-[20px] text-[#4A5568] text-center max-w-xl mb-6">
        Jawab 5 pertanyaan seru tentang pemilahan sampah dan raih lencana penghargaan!
      </p>

      {/* Mascot Advice */}
      <div className="w-full flex justify-center mb-6">
        <MascotTurtle
          size="md"
          expression={isCompleted ? 'bangga' : feedback?.isCorrect ? 'senang' : 'berpikir'}
          speechText={
            isCompleted
              ? 'Selamat! Kamu resmi menjadi Pahlawan Sahabat Lingkungan Kelas 4!'
              : feedback?.isCorrect
              ? 'Jawabanmu tepat sekali! Ayo lanjut ke soal berikutnya!'
              : feedback && !feedback.isCorrect
              ? 'Tidak apa-apa teman, coba telaah lagi pelan-pelan ya!'
              : 'Baca soalnya dengan teliti ya, teman-teman!'
          }
        />
      </div>

      {!isCompleted ? (
        <Card borderStyle="solid" borderColor="yellow" className="w-full max-w-2xl mb-8">
          {/* Header of Quiz Card */}
          <div className="flex items-center justify-between mb-4 border-b-2 border-[#E8DFC8]/60 pb-3">
            <span className="text-sm font-bold text-[#FFA000] font-heading uppercase flex items-center gap-1.5">
              <Star className="w-5 h-5 fill-[#FFD54F] text-[#FFA000]" />
              Pertanyaan {currentIdx + 1} dari {questions.length}
            </span>

            {/* Stars earned tracker */}
            <div className="flex items-center gap-1">
              {Array.from({ length: questions.length }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < score ? 'fill-[#FFD54F] text-[#FFA000]' : 'text-[#E8DFC8] fill-none'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Text H2: 24-28px */}
          <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#1F2A44] font-heading mb-6 leading-snug">
            {currentQ.question}
          </h2>

          {/* Multiple Choice Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id, opt.isCorrect, currentQ.explanation)}
                  className={`
                    w-full p-4 sm:p-5 rounded-[20px] border-[3px] text-left transition-all duration-150 cursor-pointer flex items-center gap-3
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
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-heading font-extrabold text-sm border-2 ${
                      isSelected && opt.isCorrect
                        ? 'bg-[#4CAF7A] border-[#2E7D32] text-white'
                        : isSelected && !opt.isCorrect
                        ? 'bg-[#FF9F68] border-[#E65100] text-[#1F2A44]'
                        : 'bg-[#FFF9EC] border-[#E8DFC8] text-[#1F2A44]'
                    }`}
                  >
                    {opt.id.toUpperCase()}
                  </span>
                  <span className="text-[18px] sm:text-[19px] font-semibold leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl mb-6 font-heading font-bold text-base sm:text-lg flex items-start gap-2 ${
                feedback.isCorrect
                  ? 'bg-[#E8F5E9] border-2 border-[#66BB6A] text-[#2E7D32]'
                  : 'bg-[#FFF3E0] border-2 border-[#FF9F68] text-[#D84315]'
              }`}
            >
              <span className="shrink-0 mt-0.5">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-[#2E7D32]" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-[#E65100]" />
                )}
              </span>
              <span>{feedback.text}</span>
            </div>
          )}

          {/* Next Button */}
          {feedback && feedback.isCorrect && (
            <div className="flex justify-end">
              <Button3D
                variant="primary"
                onClick={handleNextQuestion}
                icon={<ArrowRight className="w-6 h-6 stroke-[2.5]" />}
              >
                {currentIdx + 1 < questions.length ? 'Pertanyaan Berikut' : 'Lihat Hasil & Lencana!'}
              </Button3D>
            </div>
          )}
        </Card>
      ) : (
        /* Certificate & Final Score Card */
        <Card borderStyle="solid" borderColor="green" className="w-full max-w-2xl text-center p-8 mb-8 bg-white">
          <div className="inline-flex p-4 rounded-full bg-[#FFF9C4] text-[#FFA000] border-4 border-[#FFD54F] mb-4 animate-float">
            <Award className="w-16 h-16" />
          </div>

          <h2 className="text-[32px] sm:text-[36px] font-extrabold text-[#1F2A44] font-heading mb-1">
            Lencana Sahabat Lingkungan
          </h2>
          <p className="text-[17px] text-[#718096] font-semibold mb-6">
            Diberikan kepada Siswa Kelas 4 Sekolah Dasar
          </p>

          {/* Editable Name Field for Certificate */}
          <div className="max-w-md mx-auto mb-6 bg-[#FFF9EC] p-4 rounded-2xl border-2 border-[#E8DFC8]">
            <label htmlFor="studentNameInput" className="block text-xs font-bold text-[#5B6B82] uppercase mb-1 font-heading">
              Nama Siswa:
            </label>
            <input
              id="studentNameInput"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Ketik namamu di sini"
              className="w-full text-center font-heading font-extrabold text-[22px] sm:text-[24px] text-[#2E7D32] bg-white border-2 border-[#A5D6A7] rounded-xl py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#4CAF7A]"
            />
          </div>

          {/* 5 Stars Highlight */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-9 h-9 fill-[#FFD54F] text-[#FFA000] drop-shadow-sm"
              />
            ))}
          </div>

          <div className="bg-[#E8F5E9] p-4 rounded-2xl border-2 border-[#A5D6A7] text-[#2E7D32] font-heading font-bold text-[18px] sm:text-[20px] max-w-md mx-auto mb-8">
            Kamu berhasil menjawab dengan benar dan resmi menjadi Penjaga Kelestarian Laut!
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button3D
              variant="white"
              icon={<RotateCcw className="w-5 h-5" />}
              onClick={handleRestartQuiz}
            >
              Ulangi Kuis
            </Button3D>

            <Button3D
              variant="accent"
              icon={<Sparkles className="w-6 h-6" />}
              onClick={() => {
                soundManager.playSuccess();
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.6 },
                });
              }}
            >
              Rayakan Prestasi!
            </Button3D>
          </div>
        </Card>
      )}
    </div>
  );
};
