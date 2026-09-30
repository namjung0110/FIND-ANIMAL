import React from 'react';
import { X, Star, Check, Plus } from 'lucide-react';
import { OliveProduct } from '../types';
import { soundFx } from '../utils/audio';

interface ProductDetailModalProps {
  product: OliveProduct | null;
  onClose: () => void;
  onToggleBasket?: (product: OliveProduct) => void;
  isInBasket?: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onToggleBasket,
  isInBasket
}) => {
  if (!product) return null;

  const handleClose = () => {
    soundFx.playPop();
    onClose();
  };

  const handleToggle = () => {
    if (onToggleBasket) {
      soundFx.playSparkle();
      onToggleBasket(product);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#361E14]/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#361E14]/15 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#361E14]/50 hover:text-[#361E14] hover:bg-[#FAF5A3] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8C4318] mb-1">
            <span>{product.categoryLabel}</span>
            <span>·</span>
            <span>{product.tag}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#361E14] leading-snug">
            {product.name}
          </h3>
          <p className="text-lg font-extrabold text-[#361E14] mt-1.5">{product.price}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#361E14]/70 mb-6 pb-4 border-b border-[#361E14]/10">
          <div className="flex items-center gap-1 text-[#B45309] font-bold">
            <Star className="w-4 h-4 fill-[#B45309] text-[#B45309]" />
            <span>{product.rating}</span>
          </div>
          <span>·</span>
          <span>리뷰 {product.reviewCount.toLocaleString()}개</span>
          <span>·</span>
          <span className="font-semibold text-[#361E14]">올베 추천</span>
        </div>

        <div className="space-y-4 text-sm text-[#361E14]">
          <div>
            <h4 className="text-xs font-bold text-[#361E14]/50 uppercase mb-1">제품 소개</h4>
            <p className="leading-relaxed bg-[#FFFDF0] p-4 rounded-2xl border border-[#361E14]/10">
              {product.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#361E14]/50 uppercase mb-1">핵심 영양 포인트</h4>
            <div className="flex items-center gap-2 text-[#361E14] bg-[#FAF5A3]/50 p-3.5 rounded-2xl border border-[#361E14]/10">
              <Check className="w-4 h-4 text-[#8C4318] shrink-0" />
              <span className="font-medium text-xs sm:text-sm">{product.highlightBenefit}</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#361E14]/50 uppercase mb-1">섭취 팁</h4>
            <p className="leading-relaxed text-[#361E14]/80 text-xs sm:text-sm bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              {product.howToTake}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#361E14]/10 flex items-center gap-3">
          {onToggleBasket && (
            <button
              onClick={handleToggle}
              className={`flex-1 py-3.5 px-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                isInBasket
                  ? 'bg-[#FAF5A3] text-[#361E14] border border-[#361E14]/20'
                  : 'bg-[#361E14] text-[#FAF5A3] hover:bg-[#25140D] active:scale-[0.98]'
              }`}
            >
              {isInBasket ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{isInBasket ? '장바구니에서 빼기' : '장바구니에 담기'}</span>
            </button>
          )}
          <button
            onClick={handleClose}
            className="py-3.5 px-5 rounded-2xl text-sm font-semibold text-[#361E14] bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
