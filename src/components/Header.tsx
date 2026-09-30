import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Trees, BookOpen } from 'lucide-react';
import { OliveBetterLogo } from './OliveBetterLogo';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  currentTab: 'landing' | 'shop' | 'result' | 'farm' | 'encyclopedia';
  basketCount: number;
  farmCount: number;
  onNavigate: (tab: 'landing' | 'shop' | 'farm' | 'encyclopedia') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  basketCount,
  farmCount,
  onNavigate
}) => {
  const [soundEnabled, setSoundEnabled] = useState(soundFx.enabled);

  const toggleSound = () => {
    soundFx.enabled = !soundFx.enabled;
    setSoundEnabled(soundFx.enabled);
    if (soundFx.enabled) {
      soundFx.playPop();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FEFCF0]/95 backdrop-blur-md border-b border-[#361E14]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Olive Better Logo */}
        <button
          onClick={() => {
            soundFx.playPop();
            onNavigate('landing');
          }}
          className="flex items-center text-left hover:opacity-90 transition-opacity cursor-pointer"
        >
          <OliveBetterLogo size="md" />
        </button>

        {/* Zone 2: Clean navigation links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#361E14]/75">
          <button
            onClick={() => {
              soundFx.playPop();
              onNavigate('shop');
            }}
            className={`hover:text-[#361E14] transition-colors cursor-pointer ${
              currentTab === 'shop' ? 'font-black text-[#361E14] underline underline-offset-4' : ''
            }`}
          >
            장바구니 담기
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              onNavigate('farm');
            }}
            className={`hover:text-[#361E14] transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'farm' ? 'font-black text-[#361E14] underline underline-offset-4' : ''
            }`}
          >
            <Trees className="w-4 h-4 text-[#2F482F]" />
            <span>동물 농장</span>
            {farmCount > 0 && (
              <span className="text-[10px] font-bold bg-[#2F482F] text-white px-1.5 py-0.2 rounded-full">
                {farmCount}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              soundFx.playPop();
              onNavigate('encyclopedia');
            }}
            className={`hover:text-[#361E14] transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'encyclopedia' ? 'font-black text-[#361E14] underline underline-offset-4' : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#8C4318]" />
            <span>동물 도감</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Sound & Basket counter) */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? '사운드 끄기' : '사운드 켜기'}
            className="p-2 text-[#361E14]/60 hover:text-[#361E14] hover:bg-[#361E14]/5 rounded-xl transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#2F482F]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              onNavigate('shop');
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#2F482F] text-white font-extrabold text-xs hover:bg-[#233823] transition-colors shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>장바구니 ({basketCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
