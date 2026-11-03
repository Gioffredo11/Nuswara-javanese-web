'use client';

import React, { useState, useEffect } from 'react';
import { Award, Flame, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { speakJavanesePhonetics, playLontarClickSound } from '@/lib/audio/woodClick';

interface QuizQuestion {
  prompt: string;
  glyph: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const QUIZ_TIERS = [
  {
    id: 'nglegena',
    title: 'Tier 1: Aksara Nglegena (20 Dasar)',
    questions: [
      {
        prompt: 'Aksara apakah ini?',
        glyph: 'ꦲ',
        options: ['Ha', 'Na', 'Ca', 'Ka'],
        correctAnswer: 'Ha',
        explanation: 'ꦲ melambangkan konsonan Ha (atau vokal A jika di awal kata), melambangkan nafsu urip / purwaka.',
      },
      {
        prompt: 'Aksara apakah ini?',
        glyph: 'ꦏ',
        options: ['Ra', 'Ka', 'Ta', 'Sa'],
        correctAnswer: 'Ka',
        explanation: 'ꦏ melambangkan aksara Ka (Karsa suci manusia).',
      },
      {
        prompt: 'Aksara apakah ini?',
        glyph: 'ꦱ',
        options: ['Wa', 'La', 'Sa', 'Pa'],
        correctAnswer: 'Sa',
        explanation: 'ꦱ melambangkan aksara Sa (Sembah marang Gusti).',
      },
      {
        prompt: 'Manakah aksara Jawa untuk konsonan "Ma"?',
        glyph: 'ꦩ',
        options: ['ꦩ', 'ꦒ', 'ꦧ', 'ꦛ'],
        correctAnswer: 'ꦩ',
        explanation: 'ꦩ adalah aksara Ma (Madep marang tujuan becik).',
      },
      {
        prompt: 'Aksara apakah ini?',
        glyph: 'ꦔ',
        options: ['Nya', 'Tha', 'Nga', 'Dha'],
        correctAnswer: 'Nga',
        explanation: 'ꦔ melambangkan konsonan velar nasal Nga (Ngulati ngelmu luhur).',
      },
    ],
  },
  {
    id: 'sandhangan',
    title: 'Tier 2: Sandhangan & Anuswara',
    questions: [
      {
        prompt: 'Sandhangan vokal apakah yang mengubah bunyi menjadi "-i"?',
        glyph: 'ꦶ',
        options: ['Wulu', 'Suku', 'Taling', 'Pepet'],
        correctAnswer: 'Wulu',
        explanation: 'Sandhangan Wulu (ꦶ) ditulis di atas aksara untuk menghasilkan bunyi vokal i.',
      },
      {
        prompt: 'Apakah fungsi sandhangan Layar (ꦂ)?',
        glyph: 'ꦂ',
        options: ['Konsonan -r mati di akhir', 'Konsonan -ng mati di akhir', 'Konsonan -h aspirasi akhir', 'Pemati vokal'],
        correctAnswer: 'Konsonan -r mati di akhir',
        explanation: 'Layar (ꦂ) diletakkan di atas aksara untuk melambangkan konsonan -r di akhir suku kata.',
      },
      {
        prompt: 'Sandhangan cecak (ꦁ) menghasilkan bunyi:',
        glyph: 'ꦁ',
        options: ['-ng', '-ny', '-m', '-n'],
        correctAnswer: '-ng',
        explanation: 'Cecak (ꦁ) adalah anuswara penanda nasal -ng di akhir suku kata.',
      },
      {
        prompt: 'Bunyi vokal taling (é / è) dilambangkan oleh:',
        glyph: 'ꦺ',
        options: ['ꦺ (Taling)', 'ꦼ (Pepet)', 'ꦸ (Suku)', 'ꦺꦴ (Taling Tarung)'],
        correctAnswer: 'ꦺ (Taling)',
        explanation: 'Taling (ꦺ) diletakkan di depan aksara konsonan untuk menghasilkan bunyi é.',
      },
      {
        prompt: 'Sandhangan Cakra (ꦿ) berfungsi menyisipkan konsonan:',
        glyph: 'ꦿ',
        options: ['-ra-', '-ya-', '-re-', '-wa-'],
        correctAnswer: '-ra-',
        explanation: 'Cakra (ꦿ) disisipkan di bawah aksara untuk menghasilkan gugus konsonan seperti kra, tra, pra.',
      },
    ],
  },
  {
    id: 'pasangan',
    title: 'Tier 3: Pasangan & Pangkon',
    questions: [
      {
        prompt: 'Apakah fungsi Pasangan dalam Aksara Jawa?',
        glyph: '꧀',
        options: [
          'Mematikan vokal aksara sebelumnya dan menyambung konsonan berikutnya',
          'Mengganti huruf kapital',
          'Menandai kalimat tanya',
          'Memperbesar ukuran font'
        ],
        correctAnswer: 'Mematikan vokal aksara sebelumnya dan menyambung konsonan berikutnya',
        explanation: 'Pasangan berfungsi menyambung kata tanpa spasi (scriptio continua) dengan mematikan vokal aksara di depannya.',
      },
      {
        prompt: 'Tanda Pangkon (꧀) pada aksara Jawa digunakan untuk:',
        glyph: '꧀',
        options: ['Mematikan vokal aksara di akhir kalimat / klausa', 'Menambah vokal u', 'Menandai kutipan langsung', 'Menghapus huruf'],
        correctAnswer: 'Mematikan vokal aksara di akhir kalimat / klausa',
        explanation: 'Pangkon (꧀) mematikan vokal aksara pada akhir kalimat sebelum tanda titik (Pada Lungsi).',
      },
      {
        prompt: 'Pasangan aksara manakah ini: ꧀ꦏ?',
        glyph: '꧀ꦏ',
        options: ['Pasangan Ka', 'Pasangan Ta', 'Pasangan Sa', 'Pasangan Na'],
        correctAnswer: 'Pasangan Ka',
        explanation: '꧀ꦏ adalah bentuk pasangan Ka yang ditulis di samping kanan atau bawah aksara sebelumnya.',
      },
      {
        prompt: 'Bagaimanakah penulisan kata "anak" dengan pangkon?',
        glyph: 'ꦲꦤꦏ꧀',
        options: ['ꦲꦤꦏ꧀', 'ꦲꦤꦏ', 'ꦲꦤꦺꦏ', 'ꦲꦤꦸꦏ'],
        correctAnswer: 'ꦲꦤꦏ꧀',
        explanation: 'Kata "anak" diakhiri konsonan k mati menggunakan pangkon: ꦲ (a) + ꦤ (na) + ꦏ꧀ (k).',
      },
      {
        prompt: 'Pasangan aksara manakah yang ditulis sejajar (tidak menggantung di bawah)?',
        glyph: '꧀ꦲ',
        options: ['Pasangan Ha, Sa, Pa', 'Pasangan Da, Ta, Ka', 'Pasangan Ma, Ga, Ba', 'Semua pasangan di bawah'],
        correctAnswer: 'Pasangan Ha, Sa, Pa',
        explanation: 'Pasangan Ha (꧀ꦲ), Sa (꧀ꦱ), dan Pa (꧀ꦥ) ditulis sejajar di samping kanan aksara yang dimatikan.',
      },
    ],
  },
  {
    id: 'murda',
    title: 'Tier 4: Aksara Murda & Swara',
    questions: [
      {
        prompt: 'Kapan Aksara Murda digunakan?',
        glyph: 'ꦑ',
        options: [
          'Nama gelar, tokoh terhormat, raja, dan nama kota penting',
          'Semua huruf pertama kalimat',
          'Hanya untuk angka tahun',
          'Hanya untuk bahasa Sanskerta'
        ],
        correctAnswer: 'Nama gelar, tokoh terhormat, raja, dan nama kota penting',
        explanation: 'Aksara Murda berfungsi seperti huruf kapital kehormatan dalam tradisi keraton dan sastra Jawa.',
      },
      {
        prompt: 'Aksara Swara A mandiri dilambangkan oleh:',
        glyph: 'ꦄ',
        options: ['ꦄ', 'ꦆ', 'ꦈ', 'ꦌ'],
        correctAnswer: 'ꦄ',
        explanation: 'ꦄ adalah Aksara Swara A mandiri untuk kata serapan atau nama diri awal asing.',
      },
      {
        prompt: 'Aksara Murda manakah ini: ꦑ?',
        glyph: 'ꦑ',
        options: ['Murda Ka', 'Murda Na', 'Murda Ta', 'Murda Sa'],
        correctAnswer: 'Murda Ka',
        explanation: 'ꦑ adalah Aksara Murda untuk Ka (contoh: Kartini -> ꦑꦂꦠꦶꦤꦶ).',
      },
      {
        prompt: 'Aksara Swara manakah yang berbunyi "I"?',
        glyph: 'ꦆ',
        options: ['ꦆ', 'ꦄ', 'ꦈ', 'ꦎ'],
        correctAnswer: 'ꦆ',
        explanation: 'ꦆ adalah Aksara Swara untuk vokal mandiri I (contoh: Indonesia -> ꦆꦤ꧀ꦢꦺꦴꦤꦺꦱꦾ).',
      },
      {
        prompt: 'Apakah ciri khas aksara rekan (seperti ꦥ꦳ / Fa)?',
        glyph: 'ꦥ꦳',
        options: ['Mempunyai tanda cecak telu (titik tiga) di atasnya', 'Berbentuk miring', 'Selalu diberi garis bawah', 'Tidak dapat diberi sandhangan'],
        correctAnswer: 'Mempunyai tanda cecak telu (titik tiga) di atasnya',
        explanation: 'Aksara Rekan menggunakan cecak telu (꦳) untuk menyesuaikan bunyi serapan Arab/asing seperti Fa, Kha, Dza, Za, Gha.',
      },
    ],
  },
];

export function WiyataQuizView() {
  const [selectedTierIdx, setSelectedTierIdx] = useState(0);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streakDays, setStreakDays] = useState(1);

  const activeTier = QUIZ_TIERS[selectedTierIdx];
  const question = activeTier.questions[currentQIdx];

  // Daily streak management
  useEffect(() => {
    try {
      const storedStreak = localStorage.getItem('nuswara_wiyata_streak');
      const lastQuizDate = localStorage.getItem('nuswara_wiyata_last_date');
      const today = new Date().toDateString();

      if (storedStreak) {
        const days = parseInt(storedStreak, 10) || 1;
        setStreakDays(days);
      }
      if (lastQuizDate !== today) {
        // Will increment upon quiz round completion
      }
    } catch {}
  }, []);

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    playLontarClickSound();
    setSelectedOption(opt);
    setIsAnswered(true);

    if (opt === question.correctAnswer) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    playLontarClickSound();
    if (currentQIdx < activeTier.questions.length - 1) {
      setCurrentQIdx((q) => q + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      try {
        const today = new Date().toDateString();
        const lastDate = localStorage.getItem('nuswara_wiyata_last_date');
        if (lastDate !== today) {
          const newStreak = streakDays + 1;
          setStreakDays(newStreak);
          localStorage.setItem('nuswara_wiyata_streak', newStreak.toString());
          localStorage.setItem('nuswara_wiyata_last_date', today);
        }
      } catch {}
    }
  };

  const handleRestart = () => {
    playLontarClickSound();
    setCurrentQIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const progressPercent = Math.round(((currentQIdx + (isAnswered ? 1 : 0)) / activeTier.questions.length) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header and Tier Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono tracking-widest bg-[#15803D]/15 text-[#15803D] uppercase font-bold">
              Wiyata & Latihan Mandiri
            </span>
            <span className="text-xs text-[#78716C] dark:text-[#8C857B]">
              Latihan Tanpa Batas • Bebas Gating
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#181615] dark:text-[#F4F1EA]">
            Kuis & Uji Pemahaman Aksara
          </h2>
        </div>

        {/* Daily Streak Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F3EFE6] dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] shadow-sm">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-pulse" />
          <div className="text-xs">
            <span className="font-bold text-[#181615] dark:text-[#F4F1EA]">{streakDays} Hari</span>
            <span className="text-[#78716C] dark:text-[#8C857B] block text-[10px]">Ketekunan Belajar</span>
          </div>
        </div>
      </div>

      {/* Tier Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 border-b border-[#E5DEC9] dark:border-[#2E3340] no-scrollbar">
        {QUIZ_TIERS.map((tier, idx) => (
          <button
            key={tier.id}
            onClick={() => {
              playLontarClickSound();
              setSelectedTierIdx(idx);
              setCurrentQIdx(0);
              setSelectedOption(null);
              setIsAnswered(false);
              setScore(0);
              setIsCompleted(false);
            }}
            className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTierIdx === idx
                ? 'bg-[#B84A27] dark:bg-[#E06D44] text-white shadow-sm'
                : 'bg-[#F3EFE6] dark:bg-[#1A1D24] text-[#57534E] dark:text-[#A8A29E] hover:text-[#181615] dark:hover:text-white'
            }`}
          >
            {tier.title}
          </button>
        ))}
      </div>

      {!isCompleted ? (
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] shadow-xl">
          {/* Progress Bar & Counter */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-[#78716C] dark:text-[#8C857B] mb-2 font-mono">
              <span>Pertanyaan {currentQIdx + 1} dari {activeTier.questions.length}</span>
              <span>Skor Sesi: {score}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#F3EFE6] dark:bg-[#222630] overflow-hidden">
              <div
                className="h-full bg-[#B84A27] dark:bg-[#E06D44] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Glyph & Prompt */}
          <div className="text-center my-6">
            <div className="inline-flex items-center justify-center p-6 rounded-2xl bg-[#FBF9F5] dark:bg-[#121316] border border-[#E5DEC9] dark:border-[#2E3340] shadow-inner mb-4">
              <span className="aksara-jawa text-5xl sm:text-6xl text-[#181615] dark:text-[#F4F1EA]">
                {question.glyph}
              </span>
            </div>
            <h3 className="text-lg font-bold text-[#181615] dark:text-[#F4F1EA]">
              {question.prompt}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === question.correctAnswer;
              let btnClass = 'bg-[#FBF9F5] dark:bg-[#121316] border-[#E5DEC9] dark:border-[#2E3340] text-[#181615] dark:text-[#F4F1EA] hover:border-[#B84A27]';

              if (isAnswered) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200';
                } else if (isSelected) {
                  btnClass = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  disabled={isAnswered}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left font-medium text-sm transition-all active:scale-98 ${btnClass}`}
                >
                  <span className="aksara-jawa text-base">{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-[#F3EFE6] dark:bg-[#222630] border border-[#E5DEC9] dark:border-[#2E3340] mb-6 animate-fadeIn">
              <span className="text-xs font-bold text-[#B84A27] dark:text-[#E06D44] uppercase tracking-wider block mb-1">
                Penjelasan Kaidah:
              </span>
              <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E]">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#B84A27] dark:bg-[#E06D44] hover:bg-[#9A3B1C] dark:hover:bg-[#F0825B] text-white text-sm font-bold shadow-md transition-all active:scale-95"
              >
                <span>{currentQIdx < activeTier.questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Sesi'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Round Completed Summary */
        <div className="text-center p-8 rounded-2xl bg-white dark:bg-[#1A1D24] border border-[#E5DEC9] dark:border-[#2E3340] shadow-xl">
          <div className="w-16 h-16 rounded-full bg-[#15803D]/15 text-[#15803D] flex items-center justify-center mx-auto mb-4">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold font-serif text-[#181615] dark:text-[#F4F1EA] mb-2">
            Sugeng! Babak Selesai
          </h3>
          <p className="text-sm text-[#57534E] dark:text-[#A8A29E] max-w-md mx-auto mb-6">
            Anda berhasil menjawab <span className="font-bold text-[#181615] dark:text-[#F4F1EA]">{score}</span> dari {activeTier.questions.length} soal pada {activeTier.title}.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F3EFE6] dark:bg-[#222630] hover:bg-[#E5DEC9] dark:hover:bg-[#2E3340] text-xs font-semibold text-[#181615] dark:text-[#F4F1EA] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Babak Ini</span>
            </button>

            {selectedTierIdx < QUIZ_TIERS.length - 1 && (
              <button
                onClick={() => {
                  setSelectedTierIdx((idx) => idx + 1);
                  handleRestart();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#B84A27] dark:bg-[#E06D44] hover:bg-[#9A3B1C] text-xs font-bold text-white shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Lanjut ke Tier Berikutnya</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
