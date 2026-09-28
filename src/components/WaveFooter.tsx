import React from 'react';
import { Recycle } from 'lucide-react';

export const WaveFooter: React.FC = () => {
  return (
    <footer className="relative w-full overflow-hidden mt-12 pt-8 select-none pointer-events-none">
      {/* Soft floating leaves & stars */}
      <div className="absolute top-0 left-6 text-[#4CAF7A]/30 animate-float">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5 19 5 19C5 19 14 16 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 7C16 7 21 12 18 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-2 right-8 text-[#FFD54F]/40 animate-float" style={{ animationDelay: '1.5s' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      {/* Gentle Ocean Waves Layer 1 */}
      <div className="relative w-[120%] -left-[10%] animate-wave opacity-50">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path
            d="M0,0 C150,50 350,-40 500,20 C650,80 900,-20 1200,30 L1200,120 L0,120 Z"
            fill="#B3E5FC"
          />
        </svg>
      </div>

      {/* Ocean Waves Layer 2 */}
      <div className="relative w-[120%] -left-[5%] -mt-6 sm:-mt-8">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
          <path
            d="M0,20 C200,70 450,-10 700,40 C950,90 1050,10 1200,30 L1200,120 L0,120 Z"
            fill="#4FC3F7"
          />
        </svg>
      </div>

      {/* Ocean Floor Bottom Strip */}
      <div className="bg-[#4FC3F7] py-3 text-center px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 text-[#1F2A44] font-heading font-semibold text-xs sm:text-sm">
          <Recycle className="w-4 h-4 text-[#2E7D32]" />
          <span>Kurangi Sampah, Sayangi Laut Kita Bersama Si Penyu!</span>
          <span className="hidden sm:inline">· Kelas 4 SD</span>
        </div>
      </div>
    </footer>
  );
};
