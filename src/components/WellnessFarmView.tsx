import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Trees,
  UserPlus,
  ArrowLeft,
  ShoppingBag,
  Heart,
  Apple,
  Pill,
  Sparkles,
  Volume2
} from 'lucide-react';
import { FarmAnimal, AccessoryType, AnimalId } from '../types';
import { CHARACTERS } from '../data/characters';
import { soundFx } from '../utils/audio';
import { AnimalSprite } from './AnimalSprite';

interface WellnessFarmViewProps {
  farmAnimals: FarmAnimal[];
  onAddFriendAnimal: () => void;
  onGoToShop: () => void;
  onClearFarm?: () => void;
  onSelectAnimalDetail: (animalId: AnimalId) => void;
}

interface AnimalRoamState {
  instanceId: string;
  x: number; // percentage 10 ~ 85
  y: number; // percentage 25 ~ 80
  targetX: number;
  targetY: number;
  direction: 'left' | 'right';
  state: 'idle' | 'walking' | 'sniffing' | 'sleeping' | 'eating';
  speed: number;
  hopping: boolean;
  speechText: string | null;
  speechTimer: number | null;
  particles: Array<{ id: number; tx: number }>;
}

interface PastureSnack {
  id: string;
  x: number;
  y: number;
  type: 'apple' | 'vitamin';
  createdAt: number;
}

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export const WellnessFarmView: React.FC<WellnessFarmViewProps> = ({
  farmAnimals,
  onAddFriendAnimal,
  onGoToShop,
  onClearFarm,
  onSelectAnimalDetail
}) => {
  // Total petting interactions
  const [petCount, setPetCount] = useState<number>(() => {
    try {
      const v = localStorage.getItem('olive_farm_pet_count');
      return v ? parseInt(v, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Snacks dropped on the pasture
  const [activeSnacks, setActiveSnacks] = useState<PastureSnack[]>([]);
  // Pasture click ripples
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  
  // Roaming state map by instanceId
  const [roamStates, setRoamStates] = useState<Record<string, AnimalRoamState>>({});
  const pastureRef = useRef<HTMLDivElement>(null);

  // Personality dialogue generator - natural Korean quotes without any emojis
  const getAnimalQuotes = useCallback((animal: FarmAnimal): string[] => {
    if (animal.animalId === 'quokka') {
      return [
        `"헤헤! 날 불렀어? 비타민 하나 나눠줄까?"`,
        `"우와! 같이 산책 갈래? 나 지금 텐션 200%야!"`,
        `"간지러워어~ 쓰담쓰담 너무 좋아!"`,
        `"오늘도 지치지 마! 쿼카 파워로 힘내자!"`,
        `"목장 한 바퀴 사뿐사뿐 달리는 중이야"`,
        `"기분 안 좋을 땐 땀 흠뻑 흘리고 활짝 웃기!"`
      ];
    }
    if (animal.animalId === 'redpanda') {
      return [
        `"따뜻한 차 한 잔 마시며 햇볕 쬐는 중이야"`,
        `"포근포근... 이불 속처럼 아늑해서 참 좋다"`,
        `"쓰담쓰담 고마워, 마음이 몽글몽글해져"`
      ];
    }
    if (animal.animalId === 'bunny') {
      return [
        `"톡톡! 내 피부 속광 어때? 투명하지?"`,
        `"달콤한 뷰티 구미 한 알 나눠줄까?"`,
        `"깡총깡총! 오늘따라 가뿐해서 기분 최고야"`
      ];
    }
    if (animal.animalId === 'sloth') {
      return [
        `"으음... 5분만 더 누워있을게..."`,
        `"서두르지 않아도 괜찮아, 내 속도대로 천천히"`,
        `"하아암~ 푹 자고 일어나는 꿀잠이 최고야"`
      ];
    }
    if (animal.animalId === 'tiger') {
      return [
        `"크와앙! 오늘도 갓생 목표 달성하러 간다!"`,
        `"단백질 꽉 채우고 불꽃 인터벌 한 판 더!"`,
        `"파이팅 넘치게 뛰어보자고! 직진!"`
      ];
    }
    if (animal.animalId === 'otter') {
      return [
        `"물 흐르듯 부드럽게~ 괄사 마사지 완료!"`,
        `"둥둥 떠다니는 기분이야, 스트레스 싹 날아가"`,
        `"시원한 콤부차 한 모금 마시면 붓기가 쏙 빠져"`
      ];
    }
    if (animal.animalId === 'parrotbill') {
      return [
        `"오늘 영양제 체크리스트 착착 완료했어?"`,
        `"뱁새 뱁새! 부지런히 아침 루틴 채우는 중!"`,
        `"작은 좋은 습관이 모여서 갓생이 되는 법이야"`
      ];
    }
    if (animal.animalId === 'cat') {
      return [
        `"골골송 부르는 중... 턱 만져주는 건 특별히 허락할게"`,
        `"내 취향은 소중하니까, 마이웨이로 갈래"`,
        `"나한테 딱 맞는 템만 쏙쏙 챙기는 게 최고야"`
      ];
    }
    return [
      `"${animal.nickname}: 오늘 비타민 챙겨먹었어?"`,
      `"${animal.nickname}: 따뜻한 햇살 쬐니까 기분 좋다"`,
      `"${animal.nickname}: 오늘도 즐거운 하루 보내자!"`
    ];
  }, []);

  // Initialize roaming states for any new animals and prune removed animals
  useEffect(() => {
    setRoamStates((prev) => {
      const next: Record<string, AnimalRoamState> = {};
      farmAnimals.forEach((animal, index) => {
        if (prev[animal.instanceId]) {
          next[animal.instanceId] = prev[animal.instanceId];
        } else {
          const cols = Math.min(farmAnimals.length, 4);
          const col = index % cols;
          const row = Math.floor(index / cols);
          const baseX = 15 + col * (70 / Math.max(cols - 1, 1));
          const baseY = 32 + row * 24;

          let speed = 0.45;
          if (animal.animalId === 'sloth') speed = 0.16;
          if (animal.animalId === 'quokka') speed = 0.55;
          if (animal.animalId === 'tiger') speed = 0.65;
          if (animal.animalId === 'parrotbill') speed = 0.6;

          next[animal.instanceId] = {
            instanceId: animal.instanceId,
            x: Math.max(12, Math.min(85, baseX + (Math.random() * 8 - 4))),
            y: Math.max(25, Math.min(80, baseY + (Math.random() * 8 - 4))),
            targetX: baseX,
            targetY: baseY,
            direction: Math.random() > 0.5 ? 'right' : 'left',
            state: 'idle',
            speed,
            hopping: false,
            speechText: null,
            speechTimer: null,
            particles: []
          };
        }
      });
      return next;
    });
  }, [farmAnimals]);

  // Movement ticker: Move walking animals towards targetX, targetY smoothly
  useEffect(() => {
    const moveTimer = setInterval(() => {
      setRoamStates((prev) => {
        let changed = false;
        const next: Record<string, AnimalRoamState> = {};

        Object.keys(prev).forEach((id) => {
          const animal = prev[id];
          if (animal.state === 'walking') {
            const dx = animal.targetX - animal.x;
            const dy = animal.targetY - animal.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 1.2) {
              changed = true;
              next[id] = {
                ...animal,
                x: animal.targetX,
                y: animal.targetY,
                state: Math.random() > 0.4 ? 'sniffing' : 'idle'
              };
            } else {
              changed = true;
              const step = animal.speed;
              const moveX = (dx / dist) * step;
              const moveY = (dy / dist) * step;
              const newDir: 'left' | 'right' = dx > 0.2 ? 'right' : dx < -0.2 ? 'left' : animal.direction;

              next[id] = {
                ...animal,
                x: Math.max(8, Math.min(88, animal.x + moveX)),
                y: Math.max(22, Math.min(80, animal.y + moveY)),
                direction: newDir
              };
            }
          } else {
            next[id] = animal;
          }
        });

        return changed ? next : prev;
      });
    }, 50);

    return () => clearInterval(moveTimer);
  }, []);

  // Autonomous decision loop: Every 2.5 - 4.5 seconds, animals pick new spot or activity
  useEffect(() => {
    const aiTimer = setInterval(() => {
      setRoamStates((prev) => {
        const ids = Object.keys(prev);
        if (ids.length === 0) return prev;

        const next = { ...prev };
        ids.forEach((id) => {
          const current = next[id];
          if (current.hopping || current.state === 'eating') return;

          const rand = Math.random();
          if (current.state !== 'walking') {
            if (rand < 0.58) {
              const newTargetX = Math.max(10, Math.min(85, current.x + (Math.random() * 40 - 20)));
              const newTargetY = Math.max(25, Math.min(78, current.y + (Math.random() * 26 - 13)));
              next[id] = {
                ...current,
                targetX: newTargetX,
                targetY: newTargetY,
                state: 'walking',
                direction: newTargetX > current.x ? 'right' : 'left'
              };
            } else if (rand < 0.78) {
              next[id] = {
                ...current,
                state: 'sniffing'
              };
            } else if (rand < 0.90) {
              next[id] = {
                ...current,
                state: 'sleeping'
              };
            } else {
              next[id] = {
                ...current,
                state: 'idle'
              };
            }
          } else if (rand < 0.16) {
            next[id] = {
              ...current,
              state: 'idle'
            };
          }
        });

        return next;
      });
    }, 3000);

    return () => clearInterval(aiTimer);
  }, []);

  // Check snacks: if snacks exist, animals near them rush to eat
  useEffect(() => {
    if (activeSnacks.length === 0) return;

    const snackInterval = setInterval(() => {
      setActiveSnacks((currentSnacks) => {
        if (currentSnacks.length === 0) return currentSnacks;
        const targetSnack = currentSnacks[0];

        setRoamStates((prev) => {
          const next = { ...prev };
          Object.keys(next).forEach((id) => {
            const an = next[id];
            const dx = targetSnack.x - an.x;
            const dy = targetSnack.y - an.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 8) {
              next[id] = {
                ...an,
                state: 'eating',
                hopping: true,
                speechText: targetSnack.type === 'vitamin' ? '비타민 냠냠! 활력 충전 완료' : '사과 아삭아삭! 상큼해'
              };
            } else {
              next[id] = {
                ...an,
                targetX: targetSnack.x + (Math.random() * 8 - 4),
                targetY: targetSnack.y + (Math.random() * 6 - 3),
                state: 'walking',
                direction: targetSnack.x > an.x ? 'right' : 'left'
              };
            }
          });
          return next;
        });

        if (Date.now() - targetSnack.createdAt > 3800) {
          return currentSnacks.slice(1);
        }
        return currentSnacks;
      });
    }, 600);

    return () => clearInterval(snackInterval);
  }, [activeSnacks]);

  // Click reaction handler for an animal
  const handleAnimalClick = (animal: FarmAnimal) => {
    soundFx.playAnimalReact();

    const newCount = petCount + 1;
    setPetCount(newCount);
    try {
      localStorage.setItem('olive_farm_pet_count', newCount.toString());
    } catch {
      // ignore
    }

    const quotes = getAnimalQuotes(animal);
    const chosenQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Vector heart particles floating up
    const newParticles = [
      { id: Date.now() + 1, tx: -16 },
      { id: Date.now() + 2, tx: 0 },
      { id: Date.now() + 3, tx: 16 }
    ];

    setRoamStates((prev) => {
      const current = prev[animal.instanceId] || {
        instanceId: animal.instanceId,
        x: 50,
        y: 50,
        targetX: 50,
        targetY: 50,
        direction: 'right',
        state: 'idle',
        speed: 0.5,
        hopping: false,
        speechText: null,
        speechTimer: null,
        particles: []
      };

      return {
        ...prev,
        [animal.instanceId]: {
          ...current,
          hopping: true,
          state: 'idle',
          speechText: chosenQuote,
          particles: newParticles
        }
      };
    });

    setTimeout(() => {
      setRoamStates((prev) => {
        if (!prev[animal.instanceId]) return prev;
        return {
          ...prev,
          [animal.instanceId]: {
            ...prev[animal.instanceId],
            hopping: false,
            particles: []
          }
        };
      });
    }, 600);

    setTimeout(() => {
      setRoamStates((prev) => {
        if (!prev[animal.instanceId]) return prev;
        return {
          ...prev,
          [animal.instanceId]: {
            ...prev[animal.instanceId],
            speechText: null
          }
        };
      });
    }, 3800);
  };

  // Click on pasture: animals walk towards the clicked location
  const handlePastureClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.animal-entity') || (e.target as HTMLElement).closest('button')) {
      return;
    }

    if (!pastureRef.current) return;
    const rect = pastureRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top) / rect.height) * 100;

    soundFx.playPop();

    const newRipple: ClickRipple = {
      id: Date.now(),
      x: clickX,
      y: clickY
    };
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 900);

    setRoamStates((prev) => {
      const ids = Object.keys(prev);
      if (ids.length === 0) return prev;

      let closestId = ids[0];
      let minDist = 9999;
      ids.forEach((id) => {
        const a = prev[id];
        const d = Math.sqrt((a.x - clickX) ** 2 + (a.y - clickY) ** 2);
        if (d < minDist) {
          minDist = d;
          closestId = id;
        }
      });

      const closest = prev[closestId];
      return {
        ...prev,
        [closestId]: {
          ...closest,
          targetX: clickX,
          targetY: clickY,
          state: 'walking',
          direction: clickX > closest.x ? 'right' : 'left'
        }
      };
    });
  };

  // Toss a snack onto the meadow
  const handleTossSnack = (type: 'apple' | 'vitamin') => {
    soundFx.playSnackToss();
    const newSnack: PastureSnack = {
      id: `snack-${Date.now()}`,
      x: 35 + Math.random() * 30,
      y: 40 + Math.random() * 25,
      type,
      createdAt: Date.now()
    };
    setActiveSnacks([newSnack]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onGoToShop}
            className="text-xs sm:text-sm font-bold text-[#361E14]/70 hover:text-[#361E14] mb-2 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>장바구니 담으러 가기</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-black text-[#361E14] tracking-tight">
            올베 동물 농장
          </h1>
          <p className="text-xs sm:text-sm text-[#361E14]/70 mt-1">
            동물 친구들이 자유롭게 풀밭을 걸어다녀요. 누르면 폴짝 뛰며 말을 건네요.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Petting heart score badge */}
          <div className="px-3 py-1.5 rounded-xl bg-white border border-[#361E14]/15 text-[#361E14] font-bold text-xs flex items-center gap-1.5 shadow-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>쓰담쓰담 <strong className="font-mono text-[#8C4318]">{petCount}</strong>회</span>
          </div>

          <button
            onClick={() => {
              soundFx.playSparkle();
              onAddFriendAnimal();
            }}
            className="px-3.5 py-2 rounded-xl bg-white border border-[#361E14]/15 hover:bg-[#FAF5A3]/50 text-[#361E14] font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-[#8C4318]" />
            <span>친구 동물 초대</span>
          </button>

          <button
            onClick={onGoToShop}
            className="px-4 py-2 rounded-xl bg-[#2F482F] hover:bg-[#233823] text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#2F482F]/15 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>새 동물 찾기</span>
          </button>
        </div>
      </div>

      {/* Main Farm Pasture Arena (Interactive Meadow) */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-[#361E14]/15 shadow-md bg-[#DDF0D0] select-none">
        {/* Pasture Top Tool Bar */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
          {/* Farm population & instruction */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#361E14] shadow-xs border border-[#361E14]/10">
              <Trees className="w-3.5 h-3.5 text-[#2F482F]" />
              <span>동물 {farmAnimals.length}마리</span>
            </div>

            <div className="hidden sm:inline-flex items-center text-[11px] text-[#361E14]/70 bg-white/85 backdrop-blur-xs px-2.5 py-1 rounded-full border border-[#361E14]/10">
              풀밭을 클릭하면 동물이 다가와요
            </div>
          </div>

          {/* Interactive Pasture Buttons: Feed snacks */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTossSnack('vitamin')}
              className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-[#FAF5A3] text-[#361E14] text-xs font-bold flex items-center gap-1.5 shadow-xs border border-[#361E14]/12 transition-all active:scale-95 cursor-pointer"
              title="비타민을 던져 동물들을 불러모아요"
            >
              <Pill className="w-3.5 h-3.5 text-amber-600" />
              <span>비타민 주기</span>
            </button>

            <button
              onClick={() => handleTossSnack('apple')}
              className="px-3 py-1.5 rounded-full bg-white/95 hover:bg-[#FAF5A3] text-[#361E14] text-xs font-bold flex items-center gap-1.5 shadow-xs border border-[#361E14]/12 transition-all active:scale-95 cursor-pointer"
              title="사과 간식을 던져 동물들을 불러모아요"
            >
              <Apple className="w-3.5 h-3.5 text-rose-500" />
              <span>사과 간식</span>
            </button>
          </div>
        </div>

        {/* The Meadow Field Area (Animals walk directly on the grass with 100% transparent backgrounds) */}
        <div
          ref={pastureRef}
          onClick={handlePastureClick}
          className="relative w-full h-[480px] sm:h-[540px] cursor-crosshair overflow-hidden pt-12"
        >
          {/* Soft Hill Backdrop & Distant Meadow */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-[#CDE6BD] border-b border-[#BEDBB0]" />
          
          {/* Distant farm wooden fence */}
          <div className="absolute top-16 left-0 right-0 flex justify-between px-6 opacity-30 pointer-events-none">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-1.5 h-7 bg-[#78593F] rounded-t-sm" />
                <div className="w-12 h-1 bg-[#78593F]/80 -mt-4" />
              </div>
            ))}
          </div>

          {/* Clean Vector Wild Flower & Grass Accents (No text emojis) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" xmlns="http://www.w3.org/2000/svg">
            {/* Soft grass tufts */}
            <g stroke="#73A364" strokeWidth="1.5" strokeLinecap="round" fill="none">
              <path d="M 60 400 L 58 390 M 60 400 L 64 388 M 60 400 L 68 393" />
              <path d="M 180 280 L 178 270 M 180 280 L 183 268 M 180 280 L 187 273" />
              <path d="M 340 450 L 338 440 M 340 450 L 344 438 M 340 450 L 349 443" />
              <path d="M 650 320 L 648 310 M 650 320 L 654 308 M 650 320 L 659 313" />
              <path d="M 820 420 L 818 410 M 820 420 L 824 408 M 820 420 L 829 413" />
              <path d="M 500 220 L 498 212 M 500 220 L 503 210 M 500 220 L 507 215" />
            </g>
            {/* Small yellow and white daisy flowers */}
            <circle cx="90" cy="340" r="3" fill="#FAF5A3" />
            <circle cx="90" cy="340" r="1.5" fill="#ED8936" />
            <circle cx="260" cy="420" r="3" fill="#FFFFFF" />
            <circle cx="260" cy="420" r="1.5" fill="#FAF5A3" />
            <circle cx="480" cy="360" r="3" fill="#FAF5A3" />
            <circle cx="480" cy="360" r="1.5" fill="#ED8936" />
            <circle cx="740" cy="260" r="3" fill="#FFFFFF" />
            <circle cx="740" cy="260" r="1.5" fill="#FAF5A3" />
            <circle cx="880" cy="370" r="3" fill="#FAF5A3" />
            <circle cx="880" cy="370" r="1.5" fill="#ED8936" />
          </svg>

          {/* Click Ripples (Clean expanding ring pulses) */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#2F482F]/40 animate-ping" />
              <div className="w-4 h-4 -mt-7 mx-auto rounded-full bg-[#2F482F]/30" />
            </div>
          ))}

          {/* Active Snacks on the ground (Clean SVG icons) */}
          {activeSnacks.map((snack) => (
            <div
              key={snack.id}
              style={{ left: `${snack.x}%`, top: `${snack.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-snack-drop flex flex-col items-center"
            >
              {snack.type === 'vitamin' ? (
                <div className="p-2 bg-amber-500 text-white rounded-full shadow-md border border-amber-600">
                  <Pill className="w-5 h-5" />
                </div>
              ) : (
                <div className="p-2 bg-rose-500 text-white rounded-full shadow-md border border-rose-600">
                  <Apple className="w-5 h-5" />
                </div>
              )}
              <div className="w-6 h-1.5 bg-[#361E14]/20 rounded-full mx-auto mt-0.5 blur-[1px]" />
            </div>
          ))}

          {/* Empty state if no animals */}
          {farmAnimals.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <h3 className="text-base sm:text-lg font-bold text-[#361E14] mb-1">
                아직 농장에 모인 동물이 없어요
              </h3>
              <p className="text-xs text-[#361E14]/70 max-w-sm mb-5">
                올베 장바구니에서 상품을 골라 내 동물을 찾은 뒤 데려와보세요.
              </p>
              <button
                onClick={onGoToShop}
                className="px-5 py-2.5 rounded-xl bg-[#2F482F] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                내 동물 찾아보기
              </button>
            </div>
          )}

          {/* Roaming Animals Rendering - ONLY the animal body roams, completely transparent! */}
          {farmAnimals.map((animal) => {
            const roam = roamStates[animal.instanceId] || {
              x: 50,
              y: 50,
              direction: 'right',
              state: 'idle',
              hopping: false,
              speechText: null,
              particles: []
            };

            return (
              <div
                key={animal.instanceId}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnimalClick(animal);
                }}
                style={{
                  left: `${roam.x}%`,
                  top: `${roam.y}%`,
                  transition: roam.state === 'walking' ? 'left 0.12s linear, top 0.12s linear' : 'all 0.3s ease'
                }}
                className="animal-entity absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group select-none flex flex-col items-center pointer-events-auto"
              >
                {/* Floating Heart Particles (Clean Vector SVG) */}
                {roam.particles.map((p) => (
                  <div
                    key={p.id}
                    style={{ '--tx': `${p.tx}px` } as React.CSSProperties}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 pointer-events-none z-40 animate-float-particle"
                  >
                    <Heart className="w-5 h-5 fill-rose-500 text-rose-500 drop-shadow-xs" />
                  </div>
                ))}

                {/* Zzz sleeping bubble (Clean, no emoji) */}
                {roam.state === 'sleeping' && !roam.speechText && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] font-black text-indigo-700 bg-white/95 px-2.5 py-0.5 rounded-full shadow-xs border border-indigo-200 pointer-events-none animate-zzz tracking-wider">
                    Zzz...
                  </div>
                )}

                {/* Sniffing grass indicator (Clean, no emoji) */}
                {roam.state === 'sniffing' && !roam.speechText && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full shadow-xs pointer-events-none">
                    킁킁...
                  </div>
                )}

                {/* Speech Bubble */}
                {roam.speechText && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 bg-white text-[#361E14] text-xs font-bold px-3 py-1.5 rounded-2xl shadow-lg border border-[#361E14]/15 whitespace-nowrap animate-bounce pointer-events-none">
                    {roam.speechText}
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-[#361E14]/15" />
                  </div>
                )}

                {/* Pure Animal Vector Sprite (Zero white paper background! Transparent on grass) */}
                <div
                  style={{
                    transform: roam.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
                  }}
                  className="relative transition-transform duration-200"
                >
                  <AnimalSprite
                    animalId={animal.animalId}
                    accessory={animal.accessory}
                    isWalking={roam.state === 'walking'}
                    isHopping={roam.hopping}
                    className="w-22 h-22 sm:w-26 sm:h-26"
                  />
                </div>

                {/* Soft ground contact shadow under animal feet */}
                <div className="w-14 h-2.5 bg-[#361E14]/18 rounded-full -mt-2 blur-[1.5px]" />

                {/* Minimalist Name Tag (Clean & unobtrusive, non-white-paper look) */}
                <div className="mt-1 text-center bg-[#361E14]/85 text-white backdrop-blur-xs px-2 py-0.5 rounded-full shadow-xs max-w-[100px] mx-auto group-hover:bg-[#2F482F] transition-colors pointer-events-none">
                  <div className="text-[10px] font-bold truncate">
                    {animal.nickname}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Farm Animals Inventory Bar (Residents list) */}
      {farmAnimals.length > 0 && (
        <div className="mt-8 bg-white rounded-3xl p-6 border border-[#361E14]/12 shadow-xs text-left">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm sm:text-base text-[#361E14] flex items-center gap-2">
              <span>목장에 머무는 동물 목록</span>
              <span className="text-xs font-bold text-[#8C4318]">({farmAnimals.length}마리)</span>
            </h3>

            {onClearFarm && (
              <button
                onClick={() => {
                  if (confirm('농장을 새로 비우시겠어요?')) {
                    soundFx.playPop();
                    onClearFarm();
                  }
                }}
                className="text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                초기화
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {farmAnimals.map((animal) => {
              return (
                <div
                  key={animal.instanceId}
                  onClick={() => onSelectAnimalDetail(animal.animalId)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7EE] border border-[#361E14]/10 hover:border-[#2F482F] hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="relative w-12 h-12 rounded-xl bg-white border border-[#361E14]/10 shrink-0 flex items-center justify-center p-1">
                    <AnimalSprite
                      animalId={animal.animalId}
                      accessory={animal.accessory}
                      className="w-10 h-10"
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="font-bold text-xs text-[#361E14] truncate flex items-center gap-1">
                      <span>{animal.nickname}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({animal.name})
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8C4318] truncate font-medium">
                      {animal.title}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2F482F] group-hover:translate-x-0.5 transition-transform">
                    카드 보기 →
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
