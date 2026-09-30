export type AnimalId =
  | 'quokka'
  | 'redpanda'
  | 'bunny'
  | 'sloth'
  | 'tiger'
  | 'otter'
  | 'parrotbill'
  | 'cat';

export type AccessoryType =
  | 'sprout'
  | 'ribbon'
  | 'glasses'
  | 'crown'
  | 'necklace'
  | 'heart'
  | 'sleepmask';

export interface FarmAnimal {
  instanceId: string;
  animalId: AnimalId;
  name: string;
  title: string;
  nickname: string;
  accessory: AccessoryType;
  moodBadge: string;
  image: string;
  stickerImage?: string;
  addedAt: number;
  x?: number;
  y?: number;
  direction?: 'left' | 'right';
  quote: string;
}

export interface OliveProduct {
  id: string;
  name: string;
  category: 'energy' | 'innerbeauty' | 'healing' | 'body' | 'snack';
  categoryLabel: string;
  tag: string;
  badge?: string;
  price: string;
  originalPrice?: string;
  discountRate?: string;
  description: string;
  howToTake: string;
  image: string;
  rating: number;
  reviewCount: number;
  highlightBenefit: string;
}

export interface CharacterProfile {
  id: AnimalId;
  name: string;
  animal: string;
  title: string;
  subtitle: string;
  hashtags: string[];
  quote: string;
  image: string;
  holdingImage?: string;
  stickerImage?: string;
  accentColor: string;
  badgeBg: string;
  cardBg: string;
  borderAccent: string;
  personality: string[];
  strength: string;
  weakness: string;
  traitDetails: {
    workout: string;
    soulFood: string;
    peakTime: string;
    restType: string;
  };
  balanceSummary: {
    overallGrade: string;
    energy: number;
    routine: number;
    beauty: number;
    mindfulness: number;
    chemiMateName: string;
    chemiMateAnimal: string;
    synergyScore: number;
  };
  bestMatch: {
    id: AnimalId;
    name: string;
    animal: string;
    reason: string;
  };
  worstMatch: {
    id: AnimalId;
    name: string;
    animal: string;
    reason: string;
  };
  prescription: string;
  recommendedProductIds: string[];
  stats: {
    energy: number;
    mindfulness: number;
    routine: number;
    beauty: number;
  };
}
