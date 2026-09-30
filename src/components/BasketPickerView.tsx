import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, RefreshCw, Plus, Check, ArrowRight, Eye, X } from 'lucide-react';
import { OLIVE_PRODUCTS } from '../data/products';
import { CHARACTERS } from '../data/characters';
import { OliveProduct, AnimalId } from '../types';
import { soundFx } from '../utils/audio';

interface BasketPickerViewProps {
  selectedProductIds: string[];
  onToggleProduct: (id: string) => void;
  onClearBasket: () => void;
  onAnalyzeBasket: (winnerAnimal: AnimalId) => void;
  onOpenProductDetail: (product: OliveProduct) => void;
  onBackToLanding: () => void;
}

export const BasketPickerView: React.FC<BasketPickerViewProps> = ({
  selectedProductIds,
  onToggleProduct,
  onClearBasket,
  onAnalyzeBasket,
  onOpenProductDetail,
  onBackToLanding
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'energy' | 'innerbeauty' | 'healing' | 'body' | 'snack'>('all');

  const filteredProducts =
    categoryFilter === 'all'
      ? OLIVE_PRODUCTS
      : OLIVE_PRODUCTS.filter((p) => p.category === categoryFilter);

  const selectedProducts = selectedProductIds
    .map((id) => OLIVE_PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as OliveProduct[];

  // Product affinities for accurate character mapping
  const PRODUCT_AFFINITIES: Record<string, Partial<Record<AnimalId, number>>> = {
    'prod-immune-shot': { quokka: 8, tiger: 6, parrotbill: 2 },
    'prod-glutathione-film': { bunny: 9, cat: 5 },
    'prod-sleep-mist': { sloth: 9, redpanda: 6 },
    'prod-guasha-tool': { otter: 9, redpanda: 4, bunny: 3 },
    'prod-kombucha-lemon': { cat: 8, otter: 5, redpanda: 4 },
    'prod-gummy-tin': { parrotbill: 9, bunny: 4 },
    'prod-magnesium-night': { sloth: 7, redpanda: 7 },
    'prod-bagel-chips': { tiger: 8, parrotbill: 5, quokka: 4 }
  };

  // Determine winning animal based on selected items
  const calculateResultAnimal = (): AnimalId => {
    const scores: Record<AnimalId, number> = {
      quokka: 0,
      redpanda: 0,
      bunny: 0,
      sloth: 0,
      tiger: 0,
      otter: 0,
      parrotbill: 0,
      cat: 0
    };

    selectedProductIds.forEach((id) => {
      // Direct affinity points
      const affinities = PRODUCT_AFFINITIES[id];
      if (affinities) {
        Object.entries(affinities).forEach(([animal, pts]) => {
          scores[animal as AnimalId] += pts;
        });
      }

      // Check character recommended item lists
      Object.entries(CHARACTERS).forEach(([animalId, char]) => {
        if (char.recommendedProductIds.includes(id)) {
          scores[animalId as AnimalId] += 3;
        }
      });
    });

    let maxScore = -1;
    let winner: AnimalId = 'quokka';
    (Object.keys(scores) as AnimalId[]).forEach((a) => {
      if (scores[a] > maxScore) {
        maxScore = scores[a];
        winner = a;
      }
    });

    return winner;
  };

  const handleStartAnalysis = () => {
    if (selectedProductIds.length < 3) {
      soundFx.playBoing();
      alert('상품을 3개 이상 담아주세요!');
      return;
    }
    soundFx.playSuccessChime();
    const winner = calculateResultAnimal();
    onAnalyzeBasket(winner);
  };

  const isReady = selectedProductIds.length >= 3;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Navigation Back button */}
      <div className="mb-4">
        <button
          onClick={onBackToLanding}
          className="text-xs sm:text-sm font-bold text-[#361E14]/70 hover:text-[#361E14] inline-flex items-center gap-1.5"
        >
          ← 처음으로 돌아가기
        </button>
      </div>

      {/* Top Filter Category Pills matching Screenshot 1 */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => {
            soundFx.playPop();
            setCategoryFilter('all');
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
            categoryFilter === 'all'
              ? 'bg-[#2F482F] text-white shadow-xs'
              : 'bg-white/80 text-[#361E14]/70 hover:text-[#361E14] border border-[#361E14]/10'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setCategoryFilter('energy');
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
            categoryFilter === 'energy'
              ? 'bg-[#2F482F] text-white shadow-xs'
              : 'bg-white/80 text-[#361E14]/70 hover:text-[#361E14] border border-[#361E14]/10'
          }`}
        >
          비타민 & 면역
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setCategoryFilter('innerbeauty');
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
            categoryFilter === 'innerbeauty'
              ? 'bg-[#2F482F] text-white shadow-xs'
              : 'bg-white/80 text-[#361E14]/70 hover:text-[#361E14] border border-[#361E14]/10'
          }`}
        >
          이너뷰티
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setCategoryFilter('healing');
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
            categoryFilter === 'healing'
              ? 'bg-[#2F482F] text-white shadow-xs'
              : 'bg-white/80 text-[#361E14]/70 hover:text-[#361E14] border border-[#361E14]/10'
          }`}
        >
          슬립 & 힐링
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setCategoryFilter('body');
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
            categoryFilter === 'body'
              ? 'bg-[#2F482F] text-white shadow-xs'
              : 'bg-white/80 text-[#361E14]/70 hover:text-[#361E14] border border-[#361E14]/10'
          }`}
        >
          바디 & 디톡스
        </button>
        <button
          onClick={() => {
            soundFx.playPop();
            setCategoryFilter('snack');
          }}
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors whitespace-nowrap ${
            categoryFilter === 'snack'
              ? 'bg-[#2F482F] text-white shadow-xs'
              : 'bg-white/80 text-[#361E14]/70 hover:text-[#361E14] border border-[#361E14]/10'
          }`}
        >
          클린스낵
        </button>
      </div>

      {/* Main 2-Column Layout: Products (Left) + Cart Sidebar (Right) matching Screenshot 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Product Grid (8 cols on desktop) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredProducts.map((prod) => {
              const isSelected = selectedProductIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#361E14]/10 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    {/* Product Photo with Badge */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {prod.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-amber-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          {prod.badge}
                        </span>
                      )}
                      <button
                        onClick={() => {
                          soundFx.playPop();
                          onOpenProductDetail(prod);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-[#361E14]/70 hover:text-[#361E14] shadow-xs transition-colors"
                        title="상세정보 보기"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="text-[11px] font-bold text-[#8C4318] mb-1">
                        {prod.tag}
                      </div>
                      <h3 className="font-extrabold text-sm sm:text-base text-[#361E14] leading-snug mb-1">
                        {prod.name}
                      </h3>
                      <p className="text-xs text-[#361E14]/65 line-clamp-2 leading-relaxed mb-3">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add Button */}
                  <div className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-sm sm:text-base font-black text-[#361E14]">
                      {prod.price}
                    </span>

                    <button
                      onClick={() => {
                        soundFx.playPop();
                        onToggleProduct(prod.id);
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FAF5A3] text-[#361E14] border border-[#361E14]/20'
                          : 'bg-[#2F482F] hover:bg-[#233823] text-white shadow-xs'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>담김</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>담기</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sticky Shopping Bag Sidebar matching Screenshot 1 (4 cols) */}
        <div className="lg:col-span-4 sticky top-20">
          <div className="bg-white rounded-2xl p-5 border border-[#361E14]/15 shadow-sm">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#361E14]/10 mb-4">
              <div className="flex items-center gap-1.5 font-bold text-sm text-[#361E14]">
                <ShoppingBag className="w-4 h-4 text-[#2F482F]" />
                <span>담은 아이템</span>
              </div>

              {selectedProductIds.length > 0 && (
                <button
                  onClick={() => {
                    soundFx.playPop();
                    onClearBasket();
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>비우기</span>
                </button>
              )}
            </div>

            {/* Empty State vs Selected Items List */}
            {selectedProducts.length === 0 ? (
              <div className="py-10 text-center flex flex-col items-center">
                <ShoppingCart className="w-10 h-10 text-slate-300 mb-2 stroke-1" />
                <p className="text-xs font-bold text-slate-500 mb-1">
                  아직 담긴 아이템이 없습니다.
                </p>
                <p className="text-[11px] text-slate-400 max-w-[200px] leading-relaxed">
                  아이템을 3개 이상 담아 분석을 시작해보세요.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 mb-5">
                {selectedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#FFFDF0] border border-[#361E14]/10 text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#361E14]/10"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#361E14] truncate">
                          {prod.name}
                        </div>
                        <div className="text-[11px] font-semibold text-[#8C4318]">
                          {prod.price}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleProduct(prod.id)}
                      className="p-1 text-slate-400 hover:text-rose-500 rounded-lg transition-colors"
                      title="삭제"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Item Counter */}
            <div className="flex items-center justify-between text-xs font-bold text-[#361E14]/70 mb-3 pt-3 border-t border-[#361E14]/10">
              <span>담은 아이템</span>
              <span className="font-mono text-[#361E14] font-black">
                {selectedProductIds.length} / 6개
              </span>
            </div>

            {/* Analysis CTA Button */}
            <button
              onClick={handleStartAnalysis}
              disabled={!isReady}
              className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                isReady
                  ? 'bg-[#2F482F] hover:bg-[#233823] text-white shadow-md shadow-[#2F482F]/20 cursor-pointer active:scale-[0.98]'
                  : 'bg-[#C2D6C0] text-white cursor-not-allowed'
              }`}
            >
              {isReady ? (
                <>
                  <span>내 동물 알아보기</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <span>아이템 3개 이상 담아주세요 ({selectedProductIds.length}/3)</span>
              )}
            </button>

            {/* Bottom Caption */}
            <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
              담으신 취향을 바탕으로 나만의 동물을 찾아요
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
