import React, { useState } from 'react';
import {
  Share2,
  RotateCcw,
  Copy,
  Check,
  Trees,
  Sparkles,
  ShoppingBag,
  Heart,
  AlertCircle
} from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { OLIVE_PRODUCTS } from '../data/products';
import { AnimalId, OliveProduct } from '../types';
import { soundFx } from '../utils/audio';

interface ResultCardViewProps {
  animalId: AnimalId;
  onRetest: () => void;
  onOpenCustomizer: () => void;
  onGoToFarm: () => void;
  onOpenProductDetail: (product: OliveProduct) => void;
}

export const ResultCardView: React.FC<ResultCardViewProps> = ({
  animalId,
  onRetest,
  onOpenCustomizer,
  onGoToFarm,
  onOpenProductDetail
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const character = CHARACTERS[animalId] || CHARACTERS.quokka;

  const recommendedProducts = character.recommendedProductIds
    .map((id) => OLIVE_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as OliveProduct[];

  const handleCopyLink = () => {
    soundFx.playPop();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopySummary = () => {
    soundFx.playPop();
    const text = `[올리브베러 내 안의 웰니스 동물]\n나랑 꼭 닮은 동물: ${character.title}\n"${character.quote}"\n내 결과 확인하기: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Subtle Label */}
      <div className="flex items-center justify-between text-xs text-[#361E14]/60 mb-3 px-1">
        <div className="flex items-center gap-1.5 font-bold tracking-wider uppercase text-[11px] text-[#2F482F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F482F]" />
          <span>Olive Better · Character Card</span>
        </div>
        <span className="text-[11px] font-medium text-[#361E14]/50">
          내 장바구니 취향 결과
        </span>
      </div>

      {/* Main Character Card (Warm, tactile photocard aesthetic) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#361E14]/12 shadow-sm mb-6 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Column: Photocard with clean, organic frame */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-2xl overflow-hidden shadow-sm border-4 border-[#FAF7EE] bg-slate-50">
              <img
                src={character.holdingImage || character.image}
                alt={character.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-[#2F482F] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                {character.animal.split(' ')[0]}
              </div>
            </div>
            <p className="text-xs text-[#361E14]/60 mt-3 font-medium text-center">
              "{character.quote}"
            </p>
          </div>

          {/* Right Column: Title, Hashtags, Characteristics */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <span className="text-xs font-bold text-[#8C4318] tracking-wider block mb-1">
                {character.subtitle}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#361E14] leading-tight">
                {character.title}
              </h2>

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {character.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-[#FAF7EE] text-[#8C4318] border border-[#361E14]/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Natural Personality Points */}
            <div className="p-4 rounded-2xl bg-[#FAF7EE] border border-[#361E14]/8 text-[#361E14]">
              <h4 className="text-xs font-bold text-[#8C4318] mb-2 flex items-center gap-1.5">
                <span>이런 점이 꼭 닮았어요</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed text-[#361E14]/85">
                {character.personality.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#8C4318] font-bold mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Lifestyle Habits (Friendly trivia pills) */}
            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-[#361E14]/8">
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">선호하는 움직임</div>
                <div className="text-xs font-bold text-[#361E14] truncate">
                  {character.traitDetails.workout}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50/80 border border-[#361E14]/8">
                <div className="text-[10px] text-slate-400 font-semibold mb-0.5">자주 찾는 템</div>
                <div className="text-xs font-bold text-[#361E14] truncate">
                  {character.traitDetails.soulFood}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Friends Chemistry (Best & Worst Match - Natural MBTI style) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
        {character.bestMatch && (
          <div className="bg-white rounded-2xl p-4 border border-[#361E14]/10 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#2F482F] flex items-center justify-center shrink-0 mt-0.5">
              <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#361E14]">
                <span className="text-[#2F482F]">찰떡 케미 친구:</span>
                <span>{character.bestMatch.name}</span>
              </div>
              <p className="text-xs text-[#361E14]/70 mt-1 leading-snug">
                {character.bestMatch.reason}
              </p>
            </div>
          </div>
        )}

        {character.worstMatch && (
          <div className="bg-white rounded-2xl p-4 border border-[#361E14]/10 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#361E14]">
                <span className="text-amber-800">조금 삐걱대는 친구:</span>
                <span>{character.worstMatch.name}</span>
              </div>
              <p className="text-xs text-[#361E14]/70 mt-1 leading-snug">
                {character.worstMatch.reason}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recommended Products (Natural curated lifestyle items) */}
      <div className="mb-6 text-left">
        <div className="flex items-baseline justify-between mb-3 px-1">
          <h3 className="text-base sm:text-lg font-black text-[#361E14]">
            {character.name}와 찰떡인 올베 꿀템
          </h3>
          <span className="text-xs text-slate-400">
            내 취향과 잘 어울리는 아이템이에요
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {recommendedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#361E14]/10 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {prod.badge && (
                    <span className="absolute top-2 left-2 bg-[#361E14]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="p-3.5">
                  <div className="text-[10px] font-bold text-[#8C4318] mb-0.5">
                    {prod.tag}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#361E14] leading-snug mb-1 truncate">
                    {prod.name}
                  </h4>
                  <div className="text-xs font-extrabold text-[#361E14]">
                    {prod.price}
                  </div>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <button
                  onClick={() => {
                    soundFx.playPop();
                    onOpenProductDetail(prod);
                  }}
                  className="w-full py-2 rounded-xl bg-[#FAF7EE] hover:bg-[#2F482F] hover:text-white text-[#361E14] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>상품 보기</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Take Animal to Farm Box */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#2F482F] text-white text-center shadow-md mb-6">
        <h3 className="text-base sm:text-lg font-black mb-1">
          {character.name}를 내 동물 농장에 데려갈까요?
        </h3>
        <p className="text-xs text-emerald-100/90 mb-4">
          소품을 달아주고 애칭을 지어 농장에 함께 모아둘 수 있어요.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-sm mx-auto">
          <button
            onClick={() => {
              soundFx.playPop();
              onOpenCustomizer();
            }}
            className="w-full sm:w-auto flex-1 h-11 px-5 rounded-xl bg-[#FAF5A3] hover:bg-white text-[#361E14] font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#8C4318]" />
            <span>내 동물 꾸미고 데려가기</span>
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              onGoToFarm();
            }}
            className="w-full sm:w-auto h-11 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trees className="w-4 h-4" />
            <span>농장 보러가기</span>
          </button>
        </div>
      </div>

      {/* Share and Retest Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
        <button
          onClick={handleCopyLink}
          className="w-full sm:w-auto flex-1 h-11 px-4 rounded-xl bg-white border border-[#361E14]/15 text-[#361E14] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          {copiedLink ? <Check className="w-4 h-4 text-[#2F482F]" /> : <Copy className="w-4 h-4 text-slate-400" />}
          <span>{copiedLink ? '링크 복사됨' : '링크 복사'}</span>
        </button>

        <button
          onClick={handleCopySummary}
          className="w-full sm:w-auto flex-1 h-11 px-4 rounded-xl bg-[#361E14] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-[#25140D] transition-colors shadow-sm cursor-pointer"
        >
          {copiedText ? <Check className="w-4 h-4 text-[#FAF5A3]" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedText ? '내용 복사됨' : '친구에게 공유'}</span>
        </button>

        <button
          onClick={() => {
            soundFx.playPop();
            onRetest();
          }}
          className="w-full sm:w-auto h-11 px-4 rounded-xl bg-white/80 hover:bg-white text-[#361E14] border border-[#361E14]/15 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-400" />
          <span>다시 담기</span>
        </button>
      </div>
    </div>
  );
};

