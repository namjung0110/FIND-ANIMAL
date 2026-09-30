import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Check,
  Sprout,
  Glasses,
  Crown,
  Pill,
  Heart,
  Moon,
  Bookmark
} from 'lucide-react';
import { CharacterProfile, AccessoryType, FarmAnimal } from '../types';
import { soundFx } from '../utils/audio';

interface AnimalCustomizerModalProps {
  character: CharacterProfile;
  isOpen: boolean;
  onClose: () => void;
  onSaveToFarm: (farmAnimal: FarmAnimal) => void;
}

export const AnimalCustomizerModal: React.FC<AnimalCustomizerModalProps> = ({
  character,
  isOpen,
  onClose,
  onSaveToFarm
}) => {
  const [nickname, setNickname] = useState(character.name);
  const [accessory, setAccessory] = useState<AccessoryType>('sprout');
  const [moodBadge, setMoodBadge] = useState('갓생모드');

  if (!isOpen) return null;

  const ACCESSORIES: { id: AccessoryType; label: string; renderIcon: () => React.ReactNode }[] = [
    { id: 'sprout', label: '새싹 핀', renderIcon: () => <Sprout className="w-5 h-5 text-emerald-600" /> },
    { id: 'ribbon', label: '리본 핀', renderIcon: () => <Bookmark className="w-5 h-5 text-rose-500" /> },
    { id: 'glasses', label: '선글라스', renderIcon: () => <Glasses className="w-5 h-5 text-slate-800" /> },
    { id: 'crown', label: '미니 왕관', renderIcon: () => <Crown className="w-5 h-5 text-amber-500" /> },
    { id: 'necklace', label: '비타민 펜던트', renderIcon: () => <Pill className="w-5 h-5 text-amber-600" /> },
    { id: 'heart', label: '하트 핀', renderIcon: () => <Heart className="w-5 h-5 fill-rose-500 text-rose-500" /> },
    { id: 'sleepmask', label: '수면 안대', renderIcon: () => <Moon className="w-5 h-5 text-indigo-500" /> }
  ];

  const MOOD_BADGES = [
    '갓생모드',
    '힐링타임',
    '뽀송뽀송',
    '산책러버',
    '유유자적'
  ];

  const handleSave = () => {
    soundFx.playSuccessChime();
    const newAnimal: FarmAnimal = {
      instanceId: `farm-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      animalId: character.id,
      name: character.name,
      title: character.title,
      nickname: nickname.trim() || character.name,
      accessory,
      moodBadge,
      image: character.holdingImage || character.image,
      stickerImage: character.stickerImage || character.image,
      addedAt: Date.now(),
      quote: character.quote
    };

    onSaveToFarm(newAnimal);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#361E14]/40 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#361E14]/15 max-h-[90vh] overflow-y-auto text-left">
        <button
          onClick={() => {
            soundFx.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-[#361E14]/40 hover:text-[#361E14] hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <div className="text-xs font-bold text-[#8C4318] mb-1">
            농장으로 데려가기 전
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#361E14]">
            내 동물 꾸미기
          </h3>
          <p className="text-xs text-[#361E14]/70 mt-1">
            작은 소품을 달아주고 애칭을 지어 농장으로 보내보세요.
          </p>
        </div>

        {/* Live Preview Box */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto my-4 rounded-3xl overflow-hidden shadow-md border-4 border-[#FAF5A3] bg-slate-50 flex items-center justify-center">
          <img
            src={character.holdingImage || character.image}
            alt={character.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          {/* Clean Graphic Accessory Overlay */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 filter drop-shadow-md select-none pointer-events-none p-1.5 bg-white/90 rounded-full shadow-xs">
            {accessory === 'sprout' && <Sprout className="w-6 h-6 text-emerald-600" />}
            {accessory === 'ribbon' && <Bookmark className="w-6 h-6 text-rose-500" />}
            {accessory === 'glasses' && <Glasses className="w-6 h-6 text-slate-800" />}
            {accessory === 'crown' && <Crown className="w-6 h-6 text-amber-500" />}
            {accessory === 'necklace' && <Pill className="w-6 h-6 text-amber-600" />}
            {accessory === 'heart' && <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />}
            {accessory === 'sleepmask' && <Moon className="w-6 h-6 text-indigo-500" />}
          </div>

          {/* Mood Badge Overlay */}
          <div className="absolute bottom-2.5 bg-[#2F482F] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
            {moodBadge}
          </div>
        </div>

        {/* Nickname Input */}
        <div className="mb-5">
          <label className="text-xs font-bold text-[#361E14]/70 block mb-1.5">
            애칭 설정
          </label>
          <input
            type="text"
            value={nickname}
            maxLength={14}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="예: 갓생 쿼카, 뽀송이"
            className="w-full px-4 py-3 rounded-xl border border-[#361E14]/20 text-sm font-bold text-[#361E14] focus:outline-hidden focus:border-[#2F482F] focus:ring-2 focus:ring-[#2F482F]/20"
          />
        </div>

        {/* Accessory Choices */}
        <div className="mb-5">
          <label className="text-xs font-bold text-[#361E14]/70 block mb-2">
            아이템 선택
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {ACCESSORIES.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playPop();
                  setAccessory(item.id);
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer ${
                  accessory === item.id
                    ? 'border-[#2F482F] bg-[#FAF5A3]/50 ring-2 ring-[#2F482F]/20'
                    : 'border-[#361E14]/10 hover:border-[#361E14]/30 bg-slate-50'
                }`}
              >
                <div className="h-7 flex items-center justify-center mb-1">
                  {item.renderIcon()}
                </div>
                <span className="text-[10px] font-bold text-[#361E14] truncate w-full text-center">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood Badge Choices */}
        <div className="mb-6">
          <label className="text-xs font-bold text-[#361E14]/70 block mb-2">
            무드 뱃지
          </label>
          <div className="flex flex-wrap gap-2">
            {MOOD_BADGES.map((b) => (
              <button
                key={b}
                onClick={() => {
                  soundFx.playPop();
                  setMoodBadge(b);
                }}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  moodBadge === b
                    ? 'bg-[#2F482F] text-white border-[#2F482F]'
                    : 'bg-white text-[#361E14]/70 border-[#361E14]/15 hover:border-[#361E14]/40'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#361E14]/10 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#2F482F] hover:bg-[#233823] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#2F482F]/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>이 모습으로 농장에 보내기</span>
          </button>

          <button
            onClick={() => {
              soundFx.playPop();
              onClose();
            }}
            className="py-3.5 px-4 rounded-2xl text-xs font-bold text-[#361E14]/70 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
