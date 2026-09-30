import { CharacterProfile } from '../types';

export const CHARACTERS: Record<string, CharacterProfile> = {
  quokka: {
    id: 'quokka',
    name: '당당 쿼카',
    animal: '쿼카 (Quokka)',
    title: '무한 긍정 비타민 충전러, 당당 쿼카',
    subtitle: '나의 웰니스 소울 동물',
    quote: '일단 땀 한번 시원하게 흘리고 비타민 마시면 기분 바로 풀려요.',
    hashtags: ['#에너자이저', '#단백질러버', '#행동파', '#기분전환장인'],
    image: '/src/assets/images/quokka_holding_vitamin_1790584709786.jpg',
    holdingImage: '/src/assets/images/quokka_holding_vitamin_1790584709786.jpg',
    stickerImage: '/src/assets/images/quokka_sticker_avatar_1790585536832.jpg',
    accentColor: '#361E14',
    badgeBg: 'bg-[#2F482F] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '신상 비타민이나 건강 간식이 보이면 일단 장바구니에 담고 보는 실행력',
      '친구가 피곤하다고 하면 가방에서 비타민 쓱 꺼내서 건네주는 인간 비타민',
      '기분 다운될 때 가만히 누워있기보다 산책이나 운동으로 털어내는 편'
    ],
    strength: '남다른 회복 탄력성과 사람들을 기분 좋게 만드는 맑은 활력',
    weakness: '텐션이 너무 높아서 가끔 몸이 지친 줄도 모르고 달리다 방전됨',
    traitDetails: {
      workout: '러닝 & 인터벌',
      soulFood: '프로틴 쉐이크',
      peakTime: '오전 08:30',
      restType: '산책 & 환기'
    },
    balanceSummary: {
      overallGrade: '에너지형',
      energy: 95,
      routine: 84,
      beauty: 78,
      mindfulness: 52,
      chemiMateName: '명상 아기수달',
      chemiMateAnimal: '아기수달',
      synergyScore: 98
    },
    bestMatch: {
      id: 'otter',
      name: '명상 아기수달',
      animal: '아기수달',
      reason: '수달 특유의 느긋함이 쿼카의 급한 마음을 부드럽게 가라앉혀 줘요.'
    },
    worstMatch: {
      id: 'sloth',
      name: '느긋한 나무늘보',
      animal: '나무늘보',
      reason: '“나가자!” 외칠 때마다 침대 속으로 5cm씩 더 파고드는 친구라 답답할 수 있어요.'
    },
    prescription: '주 1회는 알람 끄고 소파에서 아무것도 안 하는 완전한 쉼표를 가져보세요.',
    recommendedProductIds: ['prod-immune-shot', 'prod-bagel-chips', 'prod-kombucha-lemon'],
    stats: {
      energy: 95,
      mindfulness: 52,
      routine: 84,
      beauty: 78
    }
  },

  redpanda: {
    id: 'redpanda',
    name: '포근 레서판다',
    animal: '레서판다 (Red Panda)',
    title: '따뜻한 온기 가득 힐링러, 포근 레서판다',
    subtitle: '나의 웰니스 소울 동물',
    quote: '따뜻한 차 한 잔이랑 푹신한 이불만 있으면 하루 피로가 싹 녹아요.',
    hashtags: ['#소확행', '#홈카페러버', '#안온한시간', '#포근한휴식'],
    image: '/src/assets/images/redpanda_real_1790584143695.jpg',
    stickerImage: '/src/assets/images/redpanda_sticker_1790585553275.jpg',
    accentColor: '#8C4318',
    badgeBg: 'bg-[#8C4318] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '북적이는 헬스장보다 내 방에서 잔잔한 음악 틀고 쉬는 시간이 제일 편안함',
      '올베 가면 향기 좋은 미스트나 허브티 코너에서 한참 서성이는 편',
      '자극적인 것보다 속 편하고 은은한 건강 습관을 꾸준히 지향함'
    ],
    strength: '주변 분위기에 휩쓸리지 않고 내 마음의 평온을 지켜내는 멘탈',
    weakness: '한번 실내에 머물기 시작하면 며칠 동안 햇빛 볼 일이 거의 없음',
    traitDetails: {
      workout: '가벼운 스트레칭',
      soulFood: '카모마일 티',
      peakTime: '오후 04:00',
      restType: '음악 & 독서'
    },
    balanceSummary: {
      overallGrade: '안정형',
      energy: 60,
      routine: 74,
      beauty: 80,
      mindfulness: 96,
      chemiMateName: '명상 아기수달',
      chemiMateAnimal: '아기수달',
      synergyScore: 95
    },
    bestMatch: {
      id: 'otter',
      name: '명상 아기수달',
      animal: '아기수달',
      reason: '말을 많이 안 해도 나란히 차 마시며 멍때릴 수 있는 소울메이트예요.'
    },
    worstMatch: {
      id: 'tiger',
      name: '아기호랑이',
      animal: '아기호랑이',
      reason: '호랑이의 불꽃 레이스를 지켜보기만 해도 금방 기가 빨릴 수 있어요.'
    },
    prescription: '누워있을 때 발목 돌리기나 폼롤러 스트레칭 5분만 더해보세요.',
    recommendedProductIds: ['prod-sleep-mist', 'prod-magnesium-night', 'prod-kombucha-lemon'],
    stats: {
      energy: 60,
      mindfulness: 96,
      routine: 74,
      beauty: 80
    }
  },

  bunny: {
    id: 'bunny',
    name: '빛나는 솜토끼',
    animal: '토끼 (Bunny)',
    title: '글루타치온 광채 뷰티 요정, 솜토끼',
    subtitle: '나의 웰니스 소울 동물',
    quote: '건강하게 챙겨 먹어야 안색부터 맑아진다는 걸 누구보다 잘 알아요.',
    hashtags: ['#이너뷰티', '#수분충전', '#속광케어', '#투명한안색'],
    image: '/src/assets/images/bunny_real_1790584169276.jpg',
    stickerImage: '/src/assets/images/bunny_sticker_1790585571440.jpg',
    accentColor: '#9D3E64',
    badgeBg: 'bg-[#9D3E64] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '맛있고 간편한 글루타치온 필름이나 뷰티 구미는 가방 속에 상시 구비',
      '거울 볼 때 잡티보다 피부 속에서 올라오는 은은한 수분감을 중요하게 봄',
      '예쁜 패키지와 기분 좋은 식감까지 갖춘 스마트한 건강템을 선호함'
    ],
    strength: '속부터 차근차근 가꾸는 세심함과 지치지 않는 자기관리 감각',
    weakness: '피부와 영양제는 잘 챙기는데 전신 근력 운동은 은근슬쩍 미루기 일쑤',
    traitDetails: {
      workout: '필라테스 & 요가',
      soulFood: '이너뷰티 구미',
      peakTime: '오전 10:00',
      restType: '반신욕 & 마스크팩'
    },
    balanceSummary: {
      overallGrade: '광채형',
      energy: 78,
      routine: 86,
      beauty: 98,
      mindfulness: 74,
      chemiMateName: '스마트 고양이',
      chemiMateAnimal: '고양이',
      synergyScore: 96
    },
    bestMatch: {
      id: 'cat',
      name: '스마트 고양이',
      animal: '고양이',
      reason: '서로 좋은 신상 뷰티템 정보만 깔끔하게 주고받는 세련된 사이예요.'
    },
    worstMatch: {
      id: 'sloth',
      name: '느긋한 나무늘보',
      animal: '나무늘보',
      reason: '“클렌징하고 자야지!” 하고 흔들어도 이미 코 골고 자고 있어서 속 터짐.'
    },
    prescription: '이너뷰티 섭취와 함께 땀이 살짝 맺히는 유산소 15분을 더하면 안색이 2배 밝아져요.',
    recommendedProductIds: ['prod-glutathione-film', 'prod-gummy-tin', 'prod-guasha-tool'],
    stats: {
      energy: 78,
      mindfulness: 74,
      routine: 86,
      beauty: 98
    }
  },

  sloth: {
    id: 'sloth',
    name: '느긋한 나무늘보',
    animal: '나무늘보 (Sloth)',
    title: '깊은 숙면 수면질 최고주의자, 나무늘보',
    subtitle: '나의 웰니스 소울 동물',
    quote: '세상에서 가장 가성비 좋은 보약은 푹신한 이불 속 꿀잠이에요.',
    hashtags: ['#수면진심', '#꿀잠연구원', '#슬로우라이프', '#완전충전'],
    image: '/src/assets/images/sloth_real_1790584182743.jpg',
    stickerImage: '/src/assets/images/sloth_sticker_1790585668384.jpg',
    accentColor: '#434A6F',
    badgeBg: 'bg-[#434A6F] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '주말에 알람 소리 없이 푹 자고 일어나는 순간이 일주일 중 최고의 행복',
      '베개 미스트, 안대, 마그네슘 등 수면의 질을 높이는 아이템엔 아낌없이 투자',
      '남들이 유행하는 빡빡한 루틴 따라가려다 오히려 스트레스 받아 내 페이스 유지'
    ],
    strength: '깊은 잠으로 피로를 깔끔하게 지워내는 놀라운 자체 충전 능력',
    weakness: '이불 밖으로 나가는 예열 시간이 남들보다 3배 이상 길 수 있음',
    traitDetails: {
      workout: '침대 누워서 스트레칭',
      soulFood: '따뜻한 보리차',
      peakTime: '밤 11:30',
      restType: '암막 커튼 수면'
    },
    balanceSummary: {
      overallGrade: '휴식형',
      energy: 48,
      routine: 62,
      beauty: 80,
      mindfulness: 96,
      chemiMateName: '명상 아기수달',
      chemiMateAnimal: '아기수달',
      synergyScore: 94
    },
    bestMatch: {
      id: 'otter',
      name: '명상 아기수달',
      animal: '아기수달',
      reason: '둘이 만나면 아무 말 없이 누워만 있어도 전혀 어색하지 않은 낮잠 메이트.'
    },
    worstMatch: {
      id: 'quokka',
      name: '당당 쿼카',
      animal: '쿼카',
      reason: '아침 7시부터 러닝 가자고 방문 두드리면 그대로 기절하고 싶어져요.'
    },
    prescription: '기상 직후 창문을 활짝 열고 아침 햇볕을 5분만 받아 생체 시계를 맞춰보세요.',
    recommendedProductIds: ['prod-sleep-mist', 'prod-magnesium-night', 'prod-guasha-tool'],
    stats: {
      energy: 48,
      mindfulness: 96,
      routine: 62,
      beauty: 80
    }
  },

  tiger: {
    id: 'tiger',
    name: '아기호랑이',
    animal: '아기호랑이 (Tiger Cub)',
    title: '열정보스 집중력 파이터, 아기호랑이',
    subtitle: '나의 웰니스 소울 동물',
    quote: '한번 시작했으면 목표치 달성할 때까지 무조건 직진이에요!',
    hashtags: ['#집중력폭발', '#열정보스', '#파워러너', '#성취감도파민'],
    image: '/src/assets/images/tiger_real_1790584193421.jpg',
    stickerImage: '/src/assets/images/tiger_sticker_1790585636345.jpg',
    accentColor: '#B45309',
    badgeBg: 'bg-[#B45309] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '시험이나 중요한 일정이 다가오면 고함량 활력 샷 딱 챙겨 먹고 몰입 모드 진입',
      '운동도 대충 흉내만 내기보다 땀 흠뻑 젖어야 직성이 풀리는 승부욕',
      '도전 과제가 생기면 피하기보다 정면돌파하면서 스스로 성장하는 타입'
    ],
    strength: '짧은 시간에 폭발적인 결과물을 만들어내는 몰입력과 지구력',
    weakness: '에너지를 한 번에 120% 쏟아붓고 며칠간 앓아누울 위험이 있음',
    traitDetails: {
      workout: '웨이트 & 인터벌',
      soulFood: '단백질 베이글칩',
      peakTime: '오후 02:00',
      restType: '찬물 세안 & 파워냅'
    },
    balanceSummary: {
      overallGrade: '도전형',
      energy: 98,
      routine: 88,
      beauty: 72,
      mindfulness: 58,
      chemiMateName: '당당 쿼카',
      chemiMateAnimal: '쿼카',
      synergyScore: 97
    },
    bestMatch: {
      id: 'quokka',
      name: '당당 쿼카',
      animal: '쿼카',
      reason: '함께 운동하고 피로를 털어내며 서로에게 불꽃 자극제가 되어주는 듀오.'
    },
    worstMatch: {
      id: 'redpanda',
      name: '포근 레서판다',
      animal: '레서판다',
      reason: '“조금 쉬엄쉬엄해”라는 말을 들으면 도리어 조급해져서 엇갈리기 쉬워요.'
    },
    prescription: '고함량 부스터를 섭취한 날엔 미지근한 물을 평소보다 두 컵 더 마셔주세요.',
    recommendedProductIds: ['prod-immune-shot', 'prod-bagel-chips', 'prod-kombucha-lemon'],
    stats: {
      energy: 98,
      mindfulness: 58,
      routine: 88,
      beauty: 72
    }
  },

  otter: {
    id: 'otter',
    name: '명상 아기수달',
    animal: '아기수달 (Baby Otter)',
    title: '유유자적 림프 순환 힐러, 명상 아기수달',
    subtitle: '나의 웰니스 소울 동물',
    quote: '강물 흐르듯 부드럽게 마사지하고 나면 몸도 마음도 한결 가벼워져요.',
    hashtags: ['#림프케어', '#붓기정리', '#유유자적', '#스트레스해소'],
    image: '/src/assets/images/otter_real_1790584208304.jpg',
    stickerImage: '/src/assets/images/otter_sticker_1790585600605.jpg',
    accentColor: '#0F766E',
    badgeBg: 'bg-[#0F766E] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '사소한 일에 일희일비하지 않고 물 흐르듯 유연하게 넘기는 긍정 멘탈',
      '샤워 후 시원한 괄사로 목선과 승모근 쓸어내릴 때 하루 중 제일 힐링됨',
      '무리한 다이어트나 억지 계획보다 내 몸 상태를 민감하게 관찰하고 맞춰줌'
    ],
    strength: '혈액순환과 붓기를 제때 풀어내는 유연한 루틴과 높은 스트레스 방어력',
    weakness: '너무 여유롭다 보니 챙겨 먹어야 할 영양제 알람을 무심코 넘길 때가 있음',
    traitDetails: {
      workout: '요가 & 림프 스트레칭',
      soulFood: '시원한 레몬 콤부차',
      peakTime: '저녁 08:30',
      restType: '괄사 쿨링 케어'
    },
    balanceSummary: {
      overallGrade: '유연형',
      energy: 65,
      routine: 74,
      beauty: 90,
      mindfulness: 94,
      chemiMateName: '루틴 뱁새',
      chemiMateAnimal: '뱁새',
      synergyScore: 98
    },
    bestMatch: {
      id: 'parrotbill',
      name: '루틴 뱁새',
      animal: '뱁새',
      reason: '뱁새의 꼼꼼한 영양제 체크 덕분에 수달의 깜빡거리는 습관이 완벽 보완돼요.'
    },
    worstMatch: {
      id: 'tiger',
      name: '아기호랑이',
      animal: '아기호랑이',
      reason: '둥둥 떠있고 싶은데 자꾸 파이팅을 불어넣어서 은근히 피곤해질 수 있어요.'
    },
    prescription: '자주 쓰는 텀블러를 눈에 띄는 곳에 두고 하루 수분 섭취량을 챙겨보세요.',
    recommendedProductIds: ['prod-guasha-tool', 'prod-kombucha-lemon', 'prod-sleep-mist'],
    stats: {
      energy: 65,
      mindfulness: 94,
      routine: 74,
      beauty: 90
    }
  },

  parrotbill: {
    id: 'parrotbill',
    name: '루틴 뱁새',
    animal: '뱁새 (Korean Baepsae)',
    title: '체크리스트 영양 플래너, 루틴 뱁새',
    subtitle: '나의 웰니스 소울 동물',
    quote: '성분표 꼼꼼하게 따져보고 나만의 영양 루틴 채울 때 가장 뿌듯해요.',
    hashtags: ['#체크리스트', '#성분분석러', '#기록형인간', '#스마트루틴'],
    image: '/src/assets/images/baepsae_real_1790584220175.jpg',
    stickerImage: '/src/assets/images/baepsae_sticker_1790585653819.jpg',
    accentColor: '#854D0E',
    badgeBg: 'bg-[#854D0E] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '성분, 함량, 원산지를 비교해보고 가장 가성비 좋고 믿을 만한 템을 선별함',
      '식전/식후에 맞춰 요일별 약통에 영양제를 착착 채워 넣는 정리왕',
      '스마트폰 헬스 앱이나 노션에 내 몸의 컨디션 기록을 남기는 모범생 타입'
    ],
    strength: '작은 습관을 꾸준히 지켜내는 지속력과 스마트한 소비 감각',
    weakness: '계획했던 하루 루틴이 틀어지면 생각보다 스트레스를 많이 받음',
    traitDetails: {
      workout: '규칙적인 아침 산책',
      soulFood: '비타민 구미베어',
      peakTime: '오전 09:00',
      restType: '다이어리 & 체크리스트 정리'
    },
    balanceSummary: {
      overallGrade: '계획형',
      energy: 82,
      routine: 99,
      beauty: 80,
      mindfulness: 78,
      chemiMateName: '명상 아기수달',
      chemiMateAnimal: '아기수달',
      synergyScore: 98
    },
    bestMatch: {
      id: 'otter',
      name: '명상 아기수달',
      animal: '아기수달',
      reason: '뱁새의 팽팽한 긴장감을 수달의 온화한 느긋함이 스르르 녹여줘요.'
    },
    worstMatch: {
      id: 'bunny',
      name: '빛나는 솜토끼',
      animal: '토끼',
      reason: '“이거 패키지가 예뻐서 샀어”라는 토끼에게 성분표 들이밀며 잔소리 장전.'
    },
    prescription: '가끔은 루틴 한두 개를 빼먹어도 “그럴 수 있지” 하고 넘기는 여유를 가져보세요.',
    recommendedProductIds: ['prod-gummy-tin', 'prod-immune-shot', 'prod-bagel-chips'],
    stats: {
      energy: 82,
      mindfulness: 78,
      routine: 99,
      beauty: 80
    }
  },

  cat: {
    id: 'cat',
    name: '스마트 고양이',
    animal: '고양이 (Cat)',
    title: '취향 확고 마이웨이 밸런서, 스마트 고양이',
    subtitle: '나의 웰니스 소울 동물',
    quote: '남들 다 산다고 안 따라 해요. 내 몸에 진짜 맞는 것만 쏙쏙 챙겨요.',
    hashtags: ['#취향확고', '#효율추구', '#마이웨이', '#미니멀웰니스'],
    image: '/src/assets/images/cat_real_1790584235290.jpg',
    stickerImage: '/src/assets/images/cat_sticker_1790585619007.jpg',
    accentColor: '#581C87',
    badgeBg: 'bg-[#581C87] text-white',
    cardBg: 'bg-white',
    borderAccent: 'border-[#361E14]/15',
    personality: [
      '남의 시선이나 대세에 휩쓸리지 않고 내 컨디션과 입맛에 맞는 것만 선택함',
      '제로 슈가, 저당 스낵처럼 깔끔하고 속 편한 구성을 알아서 골라냄',
      '번거로운 단계는 딱 질색이라 하나로 끝나는 고효율 올인원 템을 좋아함'
    ],
    strength: '과소비 없는 스마트한 제품 선별력과 높은 자율성',
    weakness: '귀찮아지면 한동안 모든 건강 관리를 쿨하게 놔버리는 도도한 기복',
    traitDetails: {
      workout: '홈트레이닝',
      soulFood: '제로 콤부차',
      peakTime: '오후 03:00',
      restType: '조용한 혼자만의 시간'
    },
    balanceSummary: {
      overallGrade: '자율형',
      energy: 76,
      routine: 75,
      beauty: 92,
      mindfulness: 86,
      chemiMateName: '빛나는 솜토끼',
      chemiMateAnimal: '토끼',
      synergyScore: 96
    },
    bestMatch: {
      id: 'bunny',
      name: '빛나는 솜토끼',
      animal: '토끼',
      reason: '서로의 취향을 침범하지 않으면서 좋은 아이템만 쿨하게 공유하는 짝꿍.'
    },
    worstMatch: {
      id: 'quokka',
      name: '당당 쿼카',
      animal: '쿼카',
      reason: '너무 파이팅 넘치게 다가오면 조용히 뒷걸음질 치고 싶어져요.'
    },
    prescription: '가방에 쏙 들어가는 스틱형 콤부차나 구미로 기본 컨디션을 가볍게 유지해보세요.',
    recommendedProductIds: ['prod-kombucha-lemon', 'prod-glutathione-film', 'prod-magnesium-night'],
    stats: {
      energy: 76,
      mindfulness: 86,
      routine: 75,
      beauty: 92
    }
  }
};
