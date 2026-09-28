import React from 'react';
import { Home, Sparkles, BookOpen, Puzzle, Award, Volume2, VolumeX, Monitor, Palette } from 'lucide-react';
import { NavItem } from '../types';
import { soundManager } from '../utils/audio';

interface NavigationProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
  isProjectorMode: boolean;
  onToggleProjector: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenDesignSystem: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  isProjectorMode,
  onToggleProjector,
  isMuted,
  onToggleMute,
  onOpenDesignSystem,
}) => {
  const navItems: { id: NavItem; label: string; icon: React.ReactNode }[] = [
    {
      id: 'beranda',
      label: 'Beranda',
      icon: <Home className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'pemanasan',
      label: 'Pemanasan',
      icon: <Sparkles className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'baca',
      label: 'Baca',
      icon: <BookOpen className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'aktivitas',
      label: 'Aktivitas',
      icon: <Puzzle className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: 'kuis',
      label: 'Kuis',
      icon: <Award className="w-6 h-6 stroke-[2.5]" />,
    },
  ];

  const handleNavClick = (tab: NavItem) => {
    soundManager.playPop();
    onTabChange(tab);
  };

  return (
    <header className="sticky top-2 z-40 px-3 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="bg-[#FFFDF7] border-[3px] border-[#E8DFC8] rounded-[28px] shadow-[0_6px_20px_-4px_rgba(46,77,59,0.12)] p-2 sm:p-2.5 flex items-center justify-between gap-2">
        {/* Main 5 Navigation Items */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none" aria-label="Navigasi Utama">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5
                  min-h-[48px] rounded-full font-heading font-bold text-base sm:text-lg
                  transition-all duration-200 select-none shrink-0 cursor-pointer
                  ${
                    isActive
                      ? 'bg-[#4CAF7A] text-white border-b-[4px] border-[#2E7D32] shadow-sm shadow-[#4CAF7A]/30 scale-102'
                      : 'text-[#1F2A44] hover:bg-[#F2ECE0] border-b-[4px] border-transparent'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-white' : 'text-[#4CAF7A]'}>
                  {item.icon}
                </span>
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Utility Tools: Projector Mode, Audio, and Design System Guide */}
        <div className="flex items-center gap-1.5 shrink-0 pl-1 border-l-2 border-[#E8DFC8]/70">
          {/* Design System Spec Button */}
          <button
            onClick={onOpenDesignSystem}
            title="Buka Panduan & Sistem Desain (Design System)"
            className="flex items-center gap-1.5 px-3 py-2 min-h-[48px] rounded-full bg-[#FFF9EC] hover:bg-[#FFD54F]/50 border-2 border-[#E8DFC8] text-[#1F2A44] font-heading font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            aria-label="Lihat Sistem Desain"
          >
            <Palette className="w-4 h-4 text-[#4CAF7A]" />
            <span className="hidden lg:inline">Sistem Desain</span>
          </button>

          {/* Mode Proyektor Kelas */}
          <button
            onClick={onToggleProjector}
            title={isProjectorMode ? 'Matikan Mode Proyektor' : 'Aktifkan Mode Proyektor Kelas (Teks Lebih Besar)'}
            className={`
              flex items-center justify-center min-w-[48px] min-h-[48px] p-2 rounded-full border-2 transition-all cursor-pointer
              ${
                isProjectorMode
                  ? 'bg-[#FFD54F] border-[#F57F17] text-[#1F2A44]'
                  : 'bg-[#FFF9EC] border-[#E8DFC8] text-[#5B6B82] hover:bg-[#F2ECE0]'
              }
            `}
            aria-label="Mode Proyektor Kelas"
          >
            <Monitor className="w-5 h-5" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="flex items-center justify-center min-w-[48px] min-h-[48px] p-2 rounded-full bg-[#FFF9EC] border-2 border-[#E8DFC8] text-[#1F2A44] hover:bg-[#F2ECE0] transition-colors cursor-pointer"
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-[#FF9F68]" />
            ) : (
              <Volume2 className="w-5 h-5 text-[#4CAF7A]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
