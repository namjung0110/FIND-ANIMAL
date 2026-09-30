import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CoverLanding } from './components/CoverLanding';
import { BasketPickerView } from './components/BasketPickerView';
import { ResultCardView } from './components/ResultCardView';
import { WellnessFarmView } from './components/WellnessFarmView';
import { CharacterEncyclopedia } from './components/CharacterEncyclopedia';
import { AnimalCustomizerModal } from './components/AnimalCustomizerModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ConfettiCanvas } from './components/Confetti';
import { OliveBetterLogo } from './components/OliveBetterLogo';
import { AnimalId, OliveProduct, FarmAnimal } from './types';
import { CHARACTERS } from './data/characters';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'landing' | 'shop' | 'result' | 'farm' | 'encyclopedia'>('landing');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    'prod-immune-shot',
    'prod-glutathione-film',
    'prod-bagel-chips'
  ]);
  const [resultAnimal, setResultAnimal] = useState<AnimalId>('quokka');
  const [modalProduct, setModalProduct] = useState<OliveProduct | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Load farm animals from localStorage
  const [farmAnimals, setFarmAnimals] = useState<FarmAnimal[]>(() => {
    try {
      const saved = localStorage.getItem('olive_farm_animals_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial farm animal
    return [
      {
        instanceId: 'initial-quokka',
        animalId: 'quokka',
        name: '당당 쿼카',
        title: '무한 긍정 비타민 충전러',
        nickname: '비타민 쿼카',
        accessory: 'sprout',
        moodBadge: '갓생모드',
        image: '/src/assets/images/quokka_holding_vitamin_1790584709786.jpg',
        stickerImage: '/src/assets/images/quokka_sticker_avatar_1790585536832.jpg',
        addedAt: Date.now() - 100000,
        quote: '일단 땀 흘리고 비타민 원샷하면 세상 모든 고민이 가벼워져요!'
      }
    ];
  });

  // Save farm animals whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('olive_farm_animals_v2', JSON.stringify(farmAnimals));
    } catch {
      // ignore
    }
  }, [farmAnimals]);

  const handleToggleProduct = (id: string) => {
    soundFx.playPop();
    if (selectedProductIds.includes(id)) {
      setSelectedProductIds(selectedProductIds.filter((item) => item !== id));
    } else {
      if (selectedProductIds.length >= 6) {
        soundFx.playBoing();
        alert('장바구니에는 최대 6개까지 담을 수 있어요!');
        return;
      }
      setSelectedProductIds([...selectedProductIds, id]);
    }
  };

  const handleClearBasket = () => {
    setSelectedProductIds([]);
  };

  const handleAnalyzeBasket = (winner: AnimalId) => {
    setResultAnimal(winner);
    setCurrentTab('result');
    setShowConfetti(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setShowConfetti(false), 4500);

    // Automatically set the analyzed animal as the active farm animal
    const char = CHARACTERS[winner];
    const analyzedAnimal: FarmAnimal = {
      instanceId: `my-animal-${winner}`,
      animalId: winner,
      name: char.name,
      title: char.title,
      nickname: char.name,
      accessory: 'sprout',
      moodBadge: '갓생모드',
      image: char.holdingImage || char.image,
      stickerImage: char.stickerImage || char.image,
      addedAt: Date.now(),
      quote: char.quote
    };

    setFarmAnimals((prev) => {
      // Remove any initial-quokka placeholder and any previous instance of this animal
      const others = prev.filter((a) => a.instanceId !== 'initial-quokka' && a.animalId !== winner);
      return [analyzedAnimal, ...others];
    });
  };

  const handleSaveToFarm = (newAnimal: FarmAnimal) => {
    setFarmAnimals((prev) => {
      // Replace existing animal with newly customized animal
      const others = prev.filter(
        (a) => a.instanceId !== 'initial-quokka' && a.instanceId !== newAnimal.instanceId && a.animalId !== newAnimal.animalId
      );
      return [newAnimal, ...others];
    });
    setIsCustomizerOpen(false);
    setCurrentTab('farm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddFriendAnimal = () => {
    soundFx.playSparkle();
    const friends = [
      { id: 'redpanda' as AnimalId, nickname: '지우의 포근 레서판다', acc: 'ribbon' as const, badge: '힐링타임' },
      { id: 'bunny' as AnimalId, nickname: '민서의 빛나는 토끼', acc: 'glasses' as const, badge: '뽀송뽀송' },
      { id: 'otter' as AnimalId, nickname: '서연의 명상 수달', acc: 'sprout' as const, badge: '유유자적' },
      { id: 'tiger' as AnimalId, nickname: '준호의 열정 호랑이', acc: 'crown' as const, badge: '갓생모드' },
      { id: 'parrotbill' as AnimalId, nickname: '다은의 루틴 뱁새', acc: 'necklace' as const, badge: '갓생루틴' },
      { id: 'cat' as AnimalId, nickname: '시크 냥이', acc: 'heart' as const, badge: '산책러버' }
    ];

    const pick = friends[Math.floor(Math.random() * friends.length)];
    const char = CHARACTERS[pick.id];

    const friendAnimal: FarmAnimal = {
      instanceId: `friend-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      animalId: pick.id,
      name: char.name,
      title: char.title,
      nickname: pick.nickname,
      accessory: pick.acc,
      moodBadge: pick.badge,
      image: char.holdingImage || char.image,
      stickerImage: char.stickerImage || char.holdingImage || char.image,
      addedAt: Date.now(),
      quote: char.quote
    };

    setFarmAnimals((prev) => [friendAnimal, ...prev]);
  };

  const handleClearFarm = () => {
    setFarmAnimals([]);
  };

  return (
    <div className="min-h-screen bg-[#FEFCF0] text-[#361E14] flex flex-col font-sans selection:bg-[#2F482F] selection:text-white">
      {showConfetti && <ConfettiCanvas />}

      {/* Header with Olive Better Oval Logo and Pale Cream Theme */}
      <Header
        currentTab={currentTab}
        basketCount={selectedProductIds.length}
        farmCount={farmAnimals.length}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Screen Views */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <CoverLanding
            onStart={() => {
              setCurrentTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenFarm={() => {
              setCurrentTab('farm');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenEncyclopedia={() => {
              setCurrentTab('encyclopedia');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            farmCount={farmAnimals.length}
          />
        )}

        {currentTab === 'shop' && (
          <BasketPickerView
            selectedProductIds={selectedProductIds}
            onToggleProduct={handleToggleProduct}
            onClearBasket={handleClearBasket}
            onAnalyzeBasket={handleAnalyzeBasket}
            onOpenProductDetail={(prod) => setModalProduct(prod)}
            onBackToLanding={() => {
              soundFx.playPop();
              setCurrentTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'result' && (
          <ResultCardView
            animalId={resultAnimal}
            onRetest={() => {
              setCurrentTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCustomizer={() => setIsCustomizerOpen(true)}
            onGoToFarm={() => {
              setCurrentTab('farm');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenProductDetail={(prod) => setModalProduct(prod)}
          />
        )}

        {currentTab === 'farm' && (
          <WellnessFarmView
            farmAnimals={farmAnimals}
            onAddFriendAnimal={handleAddFriendAnimal}
            onGoToShop={() => {
              soundFx.playPop();
              setCurrentTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearFarm={handleClearFarm}
            onSelectAnimalDetail={(id) => {
              setResultAnimal(id);
              setCurrentTab('result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'encyclopedia' && (
          <CharacterEncyclopedia
            onSelectCharacter={(id) => {
              setResultAnimal(id);
              setCurrentTab('result');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBack={() => {
              soundFx.playPop();
              setCurrentTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Animal Dress-up & Customizer Modal */}
      <AnimalCustomizerModal
        character={CHARACTERS[resultAnimal] || CHARACTERS.quokka}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSaveToFarm={handleSaveToFarm}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onToggleBasket={(prod) => handleToggleProduct(prod.id)}
        isInBasket={modalProduct ? selectedProductIds.includes(modalProduct.id) : false}
      />

      {/* Clean Footer */}
      <footer className="mt-16 py-8 border-t border-[#361E14]/10 bg-white/40 text-xs text-[#361E14]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <OliveBetterLogo size="sm" showText={false} />
            <span className="font-extrabold text-[#361E14]">Olive Better</span>
            <span>·</span>
            <span>올베 장바구니 웰니스 동물 성향 찾기</span>
          </div>

          <div className="flex items-center gap-4 text-[#361E14]/60 font-medium">
            <button
              onClick={() => {
                soundFx.playPop();
                setCurrentTab('farm');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#361E14] transition-colors cursor-pointer"
            >
              내 웰니스 농장
            </button>
            <span>·</span>
            <button
              onClick={() => {
                soundFx.playPop();
                setCurrentTab('encyclopedia');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#361E14] transition-colors cursor-pointer"
            >
              동물 도감 전체보기
            </button>
            <span>·</span>
            <span>© 2026 Olive Better. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
