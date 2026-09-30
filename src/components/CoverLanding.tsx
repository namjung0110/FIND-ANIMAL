import React from 'react';
import { ArrowRight, Trees, BookOpen } from 'lucide-react';
import { OliveBetterLogo } from './OliveBetterLogo';
import { soundFx } from '../utils/audio';

interface CoverLandingProps {
  onStart: () => void;
  onOpenFarm: () => void;
  onOpenEncyclopedia: () => void;
  farmCount: number;
}

export const CoverLanding: React.FC<CoverLandingProps> = ({
  onStart,
  onOpenFarm,
  onOpenEncyclopedia,
  farmCount
}) => {
  return (
    <div className="min-h-[82vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Brand Logo Badge */}
        <div className="mb-6 transform hover:scale-105 transition-transform cursor-pointer">
          <OliveBetterLogo size="lg" />
        </div>

        {/* Main Clean Eye-catching Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#361E14] tracking-tight leading-[1.15] mb-5 text-balance">
          나는 무슨 동물일까요?
        </h1>

        {/* Friendly Subtitle */}
        <p className="text-base sm:text-xl text-[#361E14]/80 leading-relaxed max-w-lg mb-10 font-medium text-balance">
          올베 장바구니에 좋아하는 것들을 담아보세요.<br className="hidden sm:inline" />
          고른 상품들을 보면 내가 어떤 동물인지 알 수 있어요!
        </p>

        {/* Main Big CTA Button */}
        <div className="w-full max-w-xs space-y-3 mb-12">
          <button
            onClick={() => {
              soundFx.playSuccessChime();
              onStart();
            }}
            className="w-full h-15 rounded-2xl bg-[#2F482F] hover:bg-[#243924] text-white font-extrabold text-lg flex items-center justify-center gap-3 shadow-lg shadow-[#2F482F]/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>동물 알아보기</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {farmCount > 0 && (
            <button
              onClick={() => {
                soundFx.playPop();
                onOpenFarm();
              }}
              className="w-full h-12 rounded-xl bg-white/80 hover:bg-white text-[#361E14] border border-[#361E14]/15 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Trees className="w-4 h-4 text-[#2F482F]" />
              <span>내 동물 농장 가기 ({farmCount}마리)</span>
            </button>
          )}
        </div>

        {/* Secondary Links */}
        <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-[#361E14]/60">
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenFarm();
            }}
            className="hover:text-[#361E14] transition-colors flex items-center gap-1.5"
          >
            <Trees className="w-4 h-4 text-[#2F482F]" />
            <span>동물 농장 둘러보기</span>
          </button>
          <span>·</span>
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenEncyclopedia();
            }}
            className="hover:text-[#361E14] transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-[#8C4318]" />
            <span>동물 도감 8종 전체보기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
