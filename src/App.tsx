/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavItem } from './types';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/views/HomeView';
import { WarmupView } from './components/views/WarmupView';
import { StoryView } from './components/views/StoryView';
import { ActivityView } from './components/views/ActivityView';
import { QuizView } from './components/views/QuizView';
import { WaveFooter } from './components/WaveFooter';
import { DesignSystemModal } from './components/views/DesignSystemModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>('beranda');
  const [isProjectorMode, setIsProjectorMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDesignSystemOpen, setIsDesignSystemOpen] = useState<boolean>(false);

  // Sync mute state with soundManager
  useEffect(() => {
    soundManager.isMuted = isMuted;
    if (isMuted) {
      soundManager.stopSpeech();
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleProjector = () => {
    soundManager.playPop();
    setIsProjectorMode((prev) => !prev);
  };

  const handleStartAdventure = () => {
    setActiveTab('pemanasan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToStory = () => {
    setActiveTab('baca');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteStory = () => {
    setActiveTab('aktivitas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToQuiz = () => {
    setActiveTab('kuis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#FFF9EC] text-[#1F2A44] transition-all duration-300 ${
        isProjectorMode ? 'text-[115%]' : ''
      }`}
    >
      {/* Top Banner for Classroom Projector Mode if active */}
      {isProjectorMode && (
        <div className="bg-[#FFD54F] border-b-2 border-[#FFA000] text-[#1F2A44] px-4 py-1.5 text-center text-xs sm:text-sm font-heading font-bold flex items-center justify-center gap-2">
          <span>Mode Proyektor Kelas Aktif: Teks Diperbesar untuk Keterbacaan Layar Lebar</span>
          <button
            onClick={toggleProjector}
            className="underline text-xs cursor-pointer ml-2 hover:opacity-80"
          >
            (Kembali ke Normal)
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isProjectorMode={isProjectorMode}
        onToggleProjector={toggleProjector}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenDesignSystem={() => setIsDesignSystemOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl mx-auto pt-4 sm:pt-6 pb-2">
        {activeTab === 'beranda' && (
          <HomeView
            onStartAdventure={handleStartAdventure}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'pemanasan' && (
          <WarmupView onContinue={handleContinueToStory} />
        )}

        {activeTab === 'baca' && (
          <StoryView onCompleteStory={handleCompleteStory} />
        )}

        {activeTab === 'aktivitas' && (
          <ActivityView onContinueToQuiz={handleContinueToQuiz} />
        )}

        {activeTab === 'kuis' && <QuizView />}
      </main>

      {/* Floating Ocean Wave & Leaves Decorative Footer */}
      <WaveFooter />

      {/* Interactive Design System Specification Modal */}
      <DesignSystemModal
        isOpen={isDesignSystemOpen}
        onClose={() => setIsDesignSystemOpen(false)}
        isProjectorMode={isProjectorMode}
        onToggleProjector={toggleProjector}
      />
    </div>
  );
}
