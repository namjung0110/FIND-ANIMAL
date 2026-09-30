import React, { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { OLIVE_PRODUCTS } from '../data/products';
import { AnimalId } from '../types';
import { soundFx } from '../utils/audio';

interface CharacterEncyclopediaProps {
  onSelectCharacter: (id: AnimalId) => void;
  onBack: () => void;
}

export const CharacterEncyclopedia: React.FC<CharacterEncyclopediaProps> = ({
  onSelectCharacter,
  onBack
}) => {
  const [filter, setFilter] = useState<'all' | 'energy' | 'healing' | 'beauty' | 'routine'>('all');
  const charactersList = Object.values(CHARACTERS);

  const filteredCharacters = charactersList.filter((c) => {
    if (filter === 'all') return true;
    if (filter === 'energy') return c.id === 'quokka' || c.id === 'tiger';
    if (filter === 'healing') return c.id === 'redpanda' || c.id === 'sloth' || c.id === 'otter';
    if (filter === 'beauty') return c.id === 'bunny' || c.id === 'cat';
    if (filter === 'routine') return c.id === 'parrotbill' || c.id === 'quokka';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBack}
            className="text-xs sm:text-sm font-bold text-[#361E14]/70 hover:text-[#361E14] mb-2 inline-flex items-center gap-1"
          >
            ← 장바구니로 돌아가기
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#361E14] leading-tight">
            올베 동물 도감
          </h1>
          <p className="text-xs sm:text-sm text-[#361E14]/70 mt-1">
            귀여운 동물 8마리의 성향과 즐겨 찾는 올베 아이템을 한눈에 살펴보세요.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-[#361E14] bg-white/80 px-3.5 py-2 rounded-xl border border-[#361E14]/15">
          <BookOpen className="w-4 h-4 text-[#8C4318]" />
          <span>전체 8종 수록</span>
        </div>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center gap-1.5 p-1 bg-white/70 rounded-2xl border border-[#361E14]/10 mb-8 overflow-x-auto">
        <button
          onClick={() => {
            soundFx.playPop();
            setFilter('all');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
            filter === 'all' ? 'bg-[#361E14] text-[#FAF5A3]' : 'text-[#361E14]/70 hover:text-[#361E14]'
          }`}
        >
          전체 8종
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setFilter('energy');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
            filter === 'energy' ? 'bg-[#361E14] text-[#FAF5A3]' : 'text-[#361E14]/70 hover:text-[#361E14]'
          }`}
        >
          활력 & 에너지형
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setFilter('healing');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
            filter === 'healing' ? 'bg-[#361E14] text-[#FAF5A3]' : 'text-[#361E14]/70 hover:text-[#361E14]'
          }`}
        >
          포근 릴렉스형
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setFilter('beauty');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
            filter === 'beauty' ? 'bg-[#361E14] text-[#FAF5A3]' : 'text-[#361E14]/70 hover:text-[#361E14]'
          }`}
        >
          이너뷰티형
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setFilter('routine');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors whitespace-nowrap ${
            filter === 'routine' ? 'bg-[#361E14] text-[#FAF5A3]' : 'text-[#361E14]/70 hover:text-[#361E14]'
          }`}
        >
          계획 & 루틴형
        </button>
      </div>

      {/* Characters Grid with Realistic Animal Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {filteredCharacters.map((char) => {
          const prods = char.recommendedProductIds
            .map((id) => OLIVE_PRODUCTS.find((p) => p.id === id))
            .filter(Boolean) as typeof OLIVE_PRODUCTS;

          return (
            <div
              key={char.id}
              onClick={() => {
                soundFx.playPop();
                onSelectCharacter(char.id);
              }}
              className="bg-white rounded-3xl p-5 border border-[#361E14]/15 hover:border-[#361E14] hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group text-left"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 mb-4 border border-[#361E14]/10">
                  <img
                    src={char.image}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 text-xs font-extrabold px-2.5 py-1 rounded-full bg-white/95 text-[#361E14] shadow-xs">
                    {char.animal.split(' ')[0]}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-[#8C4318] mb-1">
                  <span>{char.hashtags[0]}</span>
                  <span className="mx-1">·</span>
                  <span>{char.hashtags[1]}</span>
                </div>

                <h3 className="font-black text-base text-[#361E14] group-hover:text-[#8C4318] transition-colors leading-snug mb-1">
                  {char.title}
                </h3>

                <p className="text-xs text-[#361E14]/70 line-clamp-2 leading-relaxed mb-4">
                  {char.quote}
                </p>

                <div className="pt-3 border-t border-[#361E14]/10">
                  <span className="text-[11px] font-bold text-[#361E14]/50 block mb-1">
                    올베 대표 추천템
                  </span>
                  <div className="text-xs text-[#361E14] font-medium truncate">
                    {prods[0]?.name || '추천 상품'}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#361E14]/10 flex items-center justify-between text-xs font-bold text-[#8C4318]">
                <span>상세 분석 보기</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
