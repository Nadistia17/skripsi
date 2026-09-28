import React from 'react';
import { Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { MascotExpression } from '../types';

interface MascotProps {
  speechText?: string;
  expression?: MascotExpression;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showSpeechBubble?: boolean;
}

export const MascotTurtle: React.FC<MascotProps> = ({
  speechText,
  expression = 'senang',
  size = 'md',
  className = '',
  showSpeechBubble = true,
}) => {
  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (speechText) {
      soundManager.speakIndonesian(speechText);
    }
  };

  const sizeDimensions = {
    sm: { w: 72, h: 72 },
    md: { w: 104, h: 104 },
    lg: { w: 140, h: 140 },
  }[size];

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-3 ${className}`}>
      {/* Cartoon Baby Sea Turtle SVG */}
      <div
        className="relative shrink-0 animate-swim drop-shadow-sm select-none"
        style={{ width: sizeDimensions.w, height: sizeDimensions.h }}
        aria-label="Si Penyu - Maskot Kura-Kura Sahabat Bumi"
        role="img"
      >
        <svg
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          {/* Back Flippers */}
          <path
            d="M40 120 C 30 135, 45 148, 58 138 C 65 132, 55 120, 40 120 Z"
            fill="#81C784"
            stroke="#2E7D32"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M120 120 C 130 135, 115 148, 102 138 C 95 132, 105 120, 120 120 Z"
            fill="#81C784"
            stroke="#2E7D32"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Front Flippers (cute baby flippers) */}
          <path
            d={
              expression === 'semangat' || expression === 'bangga'
                ? 'M38 78 C 15 65, 8 40, 24 35 C 38 30, 48 55, 45 78 Z'
                : 'M38 88 C 15 90, 12 110, 26 115 C 40 120, 46 100, 45 88 Z'
            }
            fill="#A5D6A7"
            stroke="#2E7D32"
            strokeWidth="3.5"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />
          <path
            d="M122 88 C 145 90, 148 110, 134 115 C 120 120, 114 100, 115 88 Z"
            fill="#A5D6A7"
            stroke="#2E7D32"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Tiny Tail */}
          <path
            d="M76 138 C 80 148, 84 148, 88 138 Z"
            fill="#81C784"
            stroke="#2E7D32"
            strokeWidth="3"
          />

          {/* Turtle Shell (Dome) */}
          <ellipse
            cx="80"
            cy="90"
            rx="46"
            ry="42"
            fill="#4CAF7A"
            stroke="#2E7D32"
            strokeWidth="4"
          />
          {/* Shell rim highlight */}
          <ellipse
            cx="80"
            cy="90"
            rx="41"
            ry="37"
            fill="none"
            stroke="#66BB6A"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          {/* Shell Pattern Scutes */}
          <path
            d="M80 65 L 94 76 L 94 92 L 80 102 L 66 92 L 66 76 Z"
            fill="#66BB6A"
            stroke="#2E7D32"
            strokeWidth="3"
          />
          <path
            d="M66 76 L 50 72 M 94 76 L 110 72 M 66 92 L 50 96 M 94 92 L 110 96 M 80 102 L 80 120 M 80 65 L 80 50"
            stroke="#2E7D32"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Little Shell Shine */}
          <path
            d="M64 64 C 70 58, 80 56, 88 58"
            stroke="#FFF9EC"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.75"
          />

          {/* Turtle Neck & Head */}
          <path
            d="M70 56 C 70 42, 73 34, 80 34 C 87 34, 90 42, 90 56 Z"
            fill="#A5D6A7"
            stroke="#2E7D32"
            strokeWidth="3"
          />
          <circle
            cx="80"
            cy="36"
            r="23"
            fill="#A5D6A7"
            stroke="#2E7D32"
            strokeWidth="3.5"
          />

          {/* Rosy Cheeks */}
          <circle cx="67" cy="42" r="4.5" fill="#FFAB91" opacity="0.85" />
          <circle cx="93" cy="42" r="4.5" fill="#FFAB91" opacity="0.85" />

          {/* Big Kind Eyes */}
          {expression === 'berpikir' ? (
            <>
              {/* Thinking eyes looking upward */}
              <circle cx="72" cy="33" r="6" fill="#1F2A44" />
              <circle cx="74" cy="31" r="2.2" fill="#FFFFFF" />
              <circle cx="88" cy="33" r="6" fill="#1F2A44" />
              <circle cx="90" cy="31" r="2.2" fill="#FFFFFF" />
            </>
          ) : expression === 'bangga' || expression === 'semangat' ? (
            <>
              {/* Happy squinty curved eyes */}
              <path
                d="M67 35 Q 72 27 77 35"
                stroke="#1F2A44"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M83 35 Q 88 27 93 35"
                stroke="#1F2A44"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Big sparkly friendly eyes */}
              <circle cx="72" cy="34" r="5.5" fill="#1F2A44" />
              <circle cx="74" cy="32.5" r="2.2" fill="#FFFFFF" />
              <circle cx="70.5" cy="36" r="1.1" fill="#FFFFFF" />

              <circle cx="88" cy="34" r="5.5" fill="#1F2A44" />
              <circle cx="90" cy="32.5" r="2.2" fill="#FFFFFF" />
              <circle cx="86.5" cy="36" r="1.1" fill="#FFFFFF" />
            </>
          )}

          {/* Sweet Small Smile */}
          <path
            d={
              expression === 'bangga' || expression === 'semangat'
                ? 'M74 43 Q 80 50 86 43'
                : expression === 'berpikir'
                ? 'M76 44 Q 80 43 84 45'
                : 'M74 43 Q 80 48 86 43'
            }
            stroke="#1F2A44"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Friendly Little Sprout or Leaf on head (symbolizing caring for nature) */}
          <path
            d="M80 15 C 83 20, 81 25, 80 27 C 78 24, 76 20, 80 15 Z"
            fill="#FFD54F"
            stroke="#F57F17"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Speech Bubble */}
      {showSpeechBubble && speechText && (
        <div className="relative max-w-sm sm:max-w-md bg-white border-[3px] border-[#4CAF7A] rounded-[20px] px-4 py-3 shadow-md shadow-[#4CAF7A]/10 text-left transition-all">
          {/* Triangular Pointer pointing to turtle */}
          <div className="hidden sm:block absolute -left-3 top-6 w-0 h-0 border-y-[8px] border-y-transparent border-r-[12px] border-r-[#4CAF7A]" />
          <div className="hidden sm:block absolute -left-2 top-6 w-0 h-0 border-y-[8px] border-y-transparent border-r-[12px] border-r-white" />

          {/* Pointer for mobile (pointing up) */}
          <div className="sm:hidden absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[12px] border-b-[#4CAF7A]" />
          <div className="sm:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-b-[12px] border-b-white" />

          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-extrabold text-[#388E3C] tracking-wide uppercase font-heading flex items-center gap-1">
                <span>Si Penyu Sahabat Bumi</span>
              </div>
              <p className="text-[17px] sm:text-[19px] font-semibold text-[#1F2A44] leading-snug mt-0.5">
                "{speechText}"
              </p>
            </div>

            {/* Audio Button to hear Si Penyu's speech */}
            <button
              onClick={handleListen}
              title="Dengarkan Suara Si Penyu"
              aria-label="Dengarkan suara Si Penyu"
              className="shrink-0 p-2 rounded-full bg-[#FFF9EC] hover:bg-[#FFD54F] border-2 border-[#4CAF7A] text-[#1F2A44] transition-colors focus-visible:outline-2 focus-visible:outline-[#4CAF7A] min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#2E7D32]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
