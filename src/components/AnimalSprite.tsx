import React from 'react';
import { AnimalId, AccessoryType } from '../types';

interface AnimalSpriteProps {
  animalId: AnimalId;
  accessory?: AccessoryType;
  className?: string;
  isWalking?: boolean;
  isHopping?: boolean;
}

export const AnimalSprite: React.FC<AnimalSpriteProps> = ({
  animalId,
  accessory,
  className = 'w-24 h-24 sm:w-28 sm:h-28',
  isWalking = false,
  isHopping = false
}) => {
  // Render accessory SVG on the animal
  const renderAccessory = () => {
    if (!accessory) return null;

    switch (accessory) {
      case 'sprout':
        return (
          <g className="origin-center animate-wiggle" transform="translate(48, 6)">
            {/* Green leaf sprout on head */}
            <path
              d="M12 18 C12 10 18 6 24 6 C24 14 18 18 12 18 Z"
              fill="#48BB78"
              stroke="#276749"
              strokeWidth="1.5"
            />
            <path
              d="M12 18 C12 12 6 8 0 9 C1 16 7 18 12 18 Z"
              fill="#68D391"
              stroke="#276749"
              strokeWidth="1.5"
            />
            <path d="M12 18 L12 24" stroke="#276749" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'ribbon':
        return (
          <g transform="translate(68, 14)">
            {/* Cute pink bow */}
            <path
              d="M-8 -6 C-14 -12 -18 -4 -8 0 C-18 4 -14 12 -8 6 Z"
              fill="#ED64A6"
              stroke="#97266D"
              strokeWidth="1.5"
            />
            <path
              d="M8 -6 C14 -12 18 -4 8 0 C18 4 14 12 8 6 Z"
              fill="#ED64A6"
              stroke="#97266D"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="0" r="4" fill="#F687B3" stroke="#97266D" strokeWidth="1.5" />
            <path d="M-2 4 L-5 12" stroke="#97266D" strokeWidth="2" strokeLinecap="round" />
            <path d="M2 4 L5 12" stroke="#97266D" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'glasses':
        return (
          <g transform="translate(36, 42)">
            {/* Modern round retro glasses */}
            <circle cx="10" cy="0" r="9" fill="none" stroke="#2D3748" strokeWidth="2.5" />
            <circle cx="34" cy="0" r="9" fill="none" stroke="#2D3748" strokeWidth="2.5" />
            <path d="M19 0 L25 0" stroke="#2D3748" strokeWidth="2" />
            <path d="M1 0 L-6 -2" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
            <path d="M43 0 L50 -2" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />
          </g>
        );

      case 'crown':
        return (
          <g transform="translate(48, 8)">
            {/* Golden mini crown */}
            <path
              d="M0 16 L4 0 L12 8 L20 0 L24 16 Z"
              fill="#ECC94B"
              stroke="#B7791F"
              strokeWidth="1.5"
            />
            <circle cx="4" cy="0" r="2" fill="#E53E3E" />
            <circle cx="12" cy="8" r="2" fill="#3182CE" />
            <circle cx="20" cy="0" r="2" fill="#E53E3E" />
            <rect x="0" y="16" width="24" height="4" rx="1" fill="#D69E2E" stroke="#B7791F" strokeWidth="1" />
          </g>
        );

      case 'necklace':
        return (
          <g transform="translate(50, 78)">
            {/* Vitamin capsule pendant */}
            <path d="M-14 -4 C-6 6 6 6 14 -4" fill="none" stroke="#CBD5E0" strokeWidth="1.5" />
            <rect x="-4" y="0" width="8" height="6" rx="3" fill="#E53E3E" />
            <rect x="-4" y="6" width="8" height="6" rx="3" fill="#FAF089" />
            <line x1="-4" y1="6" x2="4" y2="6" stroke="#FFFFFF" strokeWidth="0.8" />
          </g>
        );

      case 'heart':
        return (
          <g transform="translate(68, 16)">
            {/* Red heart hairpin */}
            <path
              d="M0 6 C-4 0 -10 2 -10 8 C-10 14 0 20 0 20 C0 20 10 14 10 8 C10 2 4 0 0 6 Z"
              fill="#E53E3E"
              stroke="#9B2C2C"
              strokeWidth="1.5"
            />
          </g>
        );

      case 'sleepmask':
        return (
          <g transform="translate(36, 40)">
            {/* Sleep mask over eyes */}
            <rect x="0" y="-8" width="46" height="16" rx="8" fill="#5A67D8" stroke="#3C366B" strokeWidth="2" />
            {/* Closed eye embroidery */}
            <path d="M8 0 Q14 6 20 0" fill="none" stroke="#EBF4FF" strokeWidth="2" strokeLinecap="round" />
            <path d="M26 0 Q32 6 38 0" fill="none" stroke="#EBF4FF" strokeWidth="2" strokeLinecap="round" />
            {/* Strap */}
            <path d="M0 0 L-6 0" stroke="#3C366B" strokeWidth="2" />
            <path d="M46 0 L52 0" stroke="#3C366B" strokeWidth="2" />
          </g>
        );

      default:
        return null;
    }
  };

  // Specific animal SVG vectors with pure transparent background
  const renderAnimalBody = () => {
    switch (animalId) {
      case 'quokka':
        return (
          <g id="quokka-body">
            {/* Tail */}
            <path
              d="M26 84 C14 88 10 74 16 68 C22 64 26 72 26 84 Z"
              fill="#8C5832"
              stroke="#5D381E"
              strokeWidth="2.5"
            />
            {/* Body */}
            <ellipse
              cx="60"
              cy="74"
              rx="28"
              ry="32"
              fill="#A0693E"
              stroke="#5D381E"
              strokeWidth="3"
            />
            {/* Belly highlight */}
            <ellipse cx="60" cy="76" rx="18" ry="22" fill="#DDB088" />

            {/* Left Ear */}
            <ellipse
              cx="38"
              cy="28"
              rx="9"
              ry="11"
              fill="#8C5832"
              stroke="#5D381E"
              strokeWidth="2.5"
              transform="rotate(-15 38 28)"
            />
            <ellipse cx="38" cy="28" rx="5" ry="7" fill="#E8BFA3" transform="rotate(-15 38 28)" />

            {/* Right Ear */}
            <ellipse
              cx="82"
              cy="28"
              rx="9"
              ry="11"
              fill="#8C5832"
              stroke="#5D381E"
              strokeWidth="2.5"
              transform="rotate(15 82 28)"
            />
            <ellipse cx="82" cy="28" rx="5" ry="7" fill="#E8BFA3" transform="rotate(15 82 28)" />

            {/* Head */}
            <ellipse
              cx="60"
              cy="44"
              rx="27"
              ry="24"
              fill="#A0693E"
              stroke="#5D381E"
              strokeWidth="3"
            />

            {/* Quokka Chubby Cheeks */}
            <ellipse cx="44" cy="50" rx="12" ry="10" fill="#B77B4D" />
            <ellipse cx="76" cy="50" rx="12" ry="10" fill="#B77B4D" />

            {/* Rosy blush */}
            <ellipse cx="42" cy="52" rx="4" ry="2.5" fill="#E2847A" opacity="0.6" />
            <ellipse cx="78" cy="52" rx="4" ry="2.5" fill="#E2847A" opacity="0.6" />

            {/* Eyes - joyful shiny eyes */}
            <ellipse cx="48" cy="42" rx="3.5" ry="4" fill="#2A160C" />
            <circle cx="49.5" cy="40.5" r="1.5" fill="#FFFFFF" />
            <ellipse cx="72" cy="42" rx="3.5" ry="4" fill="#2A160C" />
            <circle cx="73.5" cy="40.5" r="1.5" fill="#FFFFFF" />

            {/* Snout & Smile - signature happy Quokka smile */}
            <ellipse cx="60" cy="49" rx="7" ry="5.5" fill="#DDB088" />
            <path
              d="M57 47 C58 45 62 45 63 47 C63 49 57 49 57 47 Z"
              fill="#2A160C"
            />
            {/* W-smile */}
            <path
              d="M54 52 Q57 56 60 52 Q63 56 66 52"
              fill="none"
              stroke="#2A160C"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Little Paws holding vitamin or curled at chest */}
            <ellipse
              cx="50"
              cy="68"
              rx="5"
              ry="7"
              fill="#8C5832"
              stroke="#5D381E"
              strokeWidth="2"
              transform="rotate(25 50 68)"
            />
            <ellipse
              cx="70"
              cy="68"
              rx="5"
              ry="7"
              fill="#8C5832"
              stroke="#5D381E"
              strokeWidth="2"
              transform="rotate(-25 70 68)"
            />

            {/* Vitamin Bottle in paws */}
            <g transform="translate(54, 62)">
              <rect x="0" y="4" width="12" height="15" rx="3" fill="#FAF089" stroke="#B7791F" strokeWidth="1.5" />
              <rect x="2" y="0" width="8" height="4" rx="1.5" fill="#ED8936" stroke="#9C4221" strokeWidth="1" />
              <circle cx="6" cy="11" r="2.5" fill="#E53E3E" />
            </g>

            {/* Feet */}
            <ellipse
              cx="46"
              cy="102"
              rx="8"
              ry="5"
              fill="#7A4B29"
              stroke="#5D381E"
              strokeWidth="2"
            />
            <ellipse
              cx="74"
              cy="102"
              rx="8"
              ry="5"
              fill="#7A4B29"
              stroke="#5D381E"
              strokeWidth="2"
            />
          </g>
        );

      case 'redpanda':
        return (
          <g id="redpanda-body">
            {/* Fluffy Striped Tail */}
            <path
              d="M24 76 C8 70 4 88 18 96 C28 102 36 90 28 78 Z"
              fill="#C05621"
              stroke="#7B341E"
              strokeWidth="2.5"
            />
            {/* Tail stripes */}
            <path d="M12 76 Q18 84 12 90" stroke="#7B341E" strokeWidth="3" fill="none" />
            <path d="M18 82 Q24 90 18 96" stroke="#FBD38D" strokeWidth="3" fill="none" />

            {/* Body */}
            <ellipse cx="60" cy="74" rx="27" ry="29" fill="#DD6B20" stroke="#7B341E" strokeWidth="3" />
            <ellipse cx="60" cy="78" rx="19" ry="22" fill="#2D3748" />

            {/* Left Ear with white fluff */}
            <path d="M34 32 L46 16 L50 34 Z" fill="#C05621" stroke="#7B341E" strokeWidth="2.5" />
            <path d="M38 30 L45 20 L48 30 Z" fill="#FFFFFF" />

            {/* Right Ear with white fluff */}
            <path d="M86 32 L74 16 L70 34 Z" fill="#C05621" stroke="#7B341E" strokeWidth="2.5" />
            <path d="M82 30 L75 20 L72 30 Z" fill="#FFFFFF" />

            {/* Head */}
            <ellipse cx="60" cy="44" rx="28" ry="23" fill="#DD6B20" stroke="#7B341E" strokeWidth="3" />

            {/* White face markings */}
            <ellipse cx="44" cy="44" rx="10" ry="12" fill="#FFFFFF" />
            <ellipse cx="76" cy="44" rx="10" ry="12" fill="#FFFFFF" />
            <path d="M54 36 L66 36 L60 48 Z" fill="#FFFFFF" />

            {/* Red tear drop streaks from eyes */}
            <path d="M46 44 L44 56" stroke="#9C4221" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M74 44 L76 56" stroke="#9C4221" strokeWidth="2.5" strokeLinecap="round" />

            {/* Eyes */}
            <circle cx="48" cy="42" r="3.5" fill="#1A202C" />
            <circle cx="49" cy="41" r="1.2" fill="#FFFFFF" />
            <circle cx="72" cy="42" r="3.5" fill="#1A202C" />
            <circle cx="73" cy="41" r="1.2" fill="#FFFFFF" />

            {/* Nose & Mouth */}
            <ellipse cx="60" cy="48" rx="3.5" ry="2.5" fill="#1A202C" />
            <path d="M57 52 Q60 55 63 52" fill="none" stroke="#1A202C" strokeWidth="1.8" strokeLinecap="round" />

            {/* Little cup of warm tea in paws */}
            <ellipse cx="50" cy="72" rx="5" ry="6" fill="#2D3748" stroke="#1A202C" strokeWidth="1.5" />
            <ellipse cx="70" cy="72" rx="5" ry="6" fill="#2D3748" stroke="#1A202C" strokeWidth="1.5" />
            <g transform="translate(54, 66)">
              <rect x="0" y="2" width="12" height="10" rx="2" fill="#ED8936" stroke="#9C4221" strokeWidth="1" />
              <path d="M4 -2 Q6 -5 4 -7" stroke="#CBD5E0" strokeWidth="1" fill="none" />
              <path d="M8 -2 Q10 -5 8 -7" stroke="#CBD5E0" strokeWidth="1" fill="none" />
            </g>

            {/* Feet */}
            <ellipse cx="46" cy="101" rx="7" ry="5" fill="#1A202C" />
            <ellipse cx="74" cy="101" rx="7" ry="5" fill="#1A202C" />
          </g>
        );

      case 'bunny':
        return (
          <g id="bunny-body">
            {/* Puffy Tail */}
            <circle cx="32" cy="86" r="8" fill="#F7FAFC" stroke="#CBD5E0" strokeWidth="2" />

            {/* Long Ears */}
            <ellipse cx="46" cy="18" rx="8" ry="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" transform="rotate(-8 46 18)" />
            <ellipse cx="46" cy="18" rx="4.5" ry="14" fill="#FED7E2" transform="rotate(-8 46 18)" />

            <ellipse cx="74" cy="18" rx="8" ry="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" transform="rotate(8 74 18)" />
            <ellipse cx="74" cy="18" rx="4.5" ry="14" fill="#FED7E2" transform="rotate(8 74 18)" />

            {/* Body */}
            <ellipse cx="60" cy="74" rx="26" ry="28" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
            <ellipse cx="60" cy="78" rx="16" ry="19" fill="#FFF5F5" />

            {/* Head */}
            <ellipse cx="60" cy="46" rx="26" ry="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />

            {/* Sparkle cheeks */}
            <circle cx="42" cy="52" r="4" fill="#FBB6CE" opacity="0.6" />
            <circle cx="78" cy="52" r="4" fill="#FBB6CE" opacity="0.6" />

            {/* Eyes - sparkling large anime bunny eyes */}
            <ellipse cx="48" cy="44" rx="4" ry="4.5" fill="#4A5568" />
            <circle cx="47" cy="42" r="1.8" fill="#FFFFFF" />
            <circle cx="50" cy="46" r="0.8" fill="#FFFFFF" />

            <ellipse cx="72" cy="44" rx="4" ry="4.5" fill="#4A5568" />
            <circle cx="71" cy="42" r="1.8" fill="#FFFFFF" />
            <circle cx="74" cy="46" r="0.8" fill="#FFFFFF" />

            {/* Pink twitch nose & mouth */}
            <polygon points="58,50 62,50 60,53" fill="#F687B3" />
            <path d="M57 54 Q60 57 63 54" fill="none" stroke="#A0AEC0" strokeWidth="1.8" strokeLinecap="round" />

            {/* Little paws holding beauty mist */}
            <ellipse cx="49" cy="68" rx="5" ry="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <ellipse cx="71" cy="68" rx="5" ry="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />

            {/* Feet */}
            <ellipse cx="45" cy="100" rx="9" ry="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
            <ellipse cx="75" cy="100" rx="9" ry="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          </g>
        );

      case 'sloth':
        return (
          <g id="sloth-body">
            {/* Sloth Body */}
            <ellipse cx="60" cy="74" rx="28" ry="26" fill="#A0AEC0" stroke="#4A5568" strokeWidth="3" />
            <ellipse cx="60" cy="76" rx="18" ry="18" fill="#E2E8F0" />

            {/* Round Head */}
            <circle cx="60" cy="46" r="23" fill="#CBD5E0" stroke="#4A5568" strokeWidth="3" />

            {/* Face mask patch */}
            <path
              d="M42 40 C36 44 38 56 46 54 C54 52 50 42 42 40 Z"
              fill="#718096"
            />
            <path
              d="M78 40 C84 44 82 56 74 54 C66 52 70 42 78 40 Z"
              fill="#718096"
            />

            {/* Sleepy half-closed eyes */}
            <path d="M42 47 Q46 51 50 47" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 47 Q74 51 78 47" fill="none" stroke="#1A202C" strokeWidth="2.5" strokeLinecap="round" />

            {/* Soft smiling snout */}
            <ellipse cx="60" cy="51" rx="8" ry="6" fill="#EDF2F7" />
            <ellipse cx="60" cy="49" rx="3" ry="2" fill="#2D3748" />
            <path d="M57 53 Q60 56 63 53" fill="none" stroke="#2D3748" strokeWidth="1.8" strokeLinecap="round" />

            {/* Long slow arms */}
            <path d="M38 68 Q30 76 34 84" stroke="#718096" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M82 68 Q90 76 86 84" stroke="#718096" strokeWidth="7" strokeLinecap="round" fill="none" />

            {/* Feet */}
            <ellipse cx="48" cy="98" rx="8" ry="5" fill="#718096" />
            <ellipse cx="72" cy="98" rx="8" ry="5" fill="#718096" />
          </g>
        );

      case 'tiger':
        return (
          <g id="tiger-body">
            {/* Long Tail with tip */}
            <path d="M26 78 Q10 82 14 96 Q20 102 24 94" stroke="#ED8936" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M12 90 L16 94" stroke="#2D3748" strokeWidth="3" />

            {/* Body */}
            <ellipse cx="60" cy="74" rx="27" ry="28" fill="#F6AD55" stroke="#C05621" strokeWidth="3" />
            <ellipse cx="60" cy="76" rx="17" ry="20" fill="#FFFAF0" />

            {/* Tiger Body Stripes */}
            <path d="M36 70 L44 72" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M84 70 L76 72" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M35 80 L45 81" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M85 80 L75 81" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />

            {/* Round Ears */}
            <circle cx="38" cy="28" r="10" fill="#ED8936" stroke="#C05621" strokeWidth="2.5" />
            <circle cx="38" cy="28" r="5" fill="#2D3748" />
            <circle cx="82" cy="28" r="10" fill="#ED8936" stroke="#C05621" strokeWidth="2.5" />
            <circle cx="82" cy="28" r="5" fill="#2D3748" />

            {/* Head */}
            <circle cx="60" cy="46" r="26" fill="#F6AD55" stroke="#C05621" strokeWidth="3" />

            {/* Forehead stripes (王 marker style) */}
            <path d="M52 26 L68 26" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M55 31 L65 31" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M60 23 L60 34" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cheek fur */}
            <ellipse cx="44" cy="54" rx="10" ry="8" fill="#FFFAF0" />
            <ellipse cx="76" cy="54" rx="10" ry="8" fill="#FFFAF0" />

            {/* Fiery determined eyes */}
            <ellipse cx="48" cy="44" rx="3.5" ry="4" fill="#2D3748" />
            <circle cx="49" cy="42" r="1.2" fill="#FFFFFF" />
            <ellipse cx="72" cy="44" rx="3.5" ry="4" fill="#2D3748" />
            <circle cx="73" cy="42" r="1.2" fill="#FFFFFF" />

            {/* Snout & confident smile */}
            <ellipse cx="60" cy="52" rx="4" ry="3" fill="#C05621" />
            <path d="M56 56 Q60 60 64 56" fill="none" stroke="#2D3748" strokeWidth="2" strokeLinecap="round" />

            {/* Paws */}
            <ellipse cx="48" cy="72" rx="6" ry="7" fill="#F6AD55" stroke="#C05621" strokeWidth="2" />
            <ellipse cx="72" cy="72" rx="6" ry="7" fill="#F6AD55" stroke="#C05621" strokeWidth="2" />

            {/* Feet */}
            <ellipse cx="46" cy="101" rx="8" ry="5" fill="#ED8936" stroke="#C05621" strokeWidth="2" />
            <ellipse cx="74" cy="101" rx="8" ry="5" fill="#ED8936" stroke="#C05621" strokeWidth="2" />
          </g>
        );

      case 'otter':
        return (
          <g id="otter-body">
            {/* Streamlined Tail */}
            <path d="M26 80 C12 86 16 98 28 92 Z" fill="#8C5832" stroke="#5D381E" strokeWidth="2.5" />

            {/* Sleek Body */}
            <ellipse cx="60" cy="74" rx="25" ry="30" fill="#975A38" stroke="#5D381E" strokeWidth="3" />
            <ellipse cx="60" cy="76" rx="16" ry="21" fill="#E8D1BE" />

            {/* Small Round Ears */}
            <circle cx="36" cy="36" r="6" fill="#7B4324" stroke="#5D381E" strokeWidth="2" />
            <circle cx="84" cy="36" r="6" fill="#7B4324" stroke="#5D381E" strokeWidth="2" />

            {/* Head */}
            <ellipse cx="60" cy="46" rx="27" ry="22" fill="#975A38" stroke="#5D381E" strokeWidth="3" />

            {/* Light cream muzzle */}
            <ellipse cx="60" cy="52" rx="15" ry="11" fill="#E8D1BE" />

            {/* Black button nose & whiskers */}
            <ellipse cx="60" cy="46" rx="4.5" ry="3.5" fill="#2A160C" />
            <path d="M56 50 Q60 54 64 50" fill="none" stroke="#2A160C" strokeWidth="2" strokeLinecap="round" />

            {/* Cute whiskers */}
            <path d="M42 50 L34 49" stroke="#5D381E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M42 53 L33 55" stroke="#5D381E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M78 50 L86 49" stroke="#5D381E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M78 53 L87 55" stroke="#5D381E" strokeWidth="1.5" strokeLinecap="round" />

            {/* Kind, glossy eyes */}
            <circle cx="48" cy="41" r="3.5" fill="#2A160C" />
            <circle cx="49" cy="40" r="1.3" fill="#FFFFFF" />
            <circle cx="72" cy="41" r="3.5" fill="#2A160C" />
            <circle cx="73" cy="40" r="1.3" fill="#FFFFFF" />

            {/* Paws holding jade guasha massage stone */}
            <ellipse cx="50" cy="70" rx="5" ry="6" fill="#7B4324" stroke="#5D381E" strokeWidth="1.5" />
            <ellipse cx="70" cy="70" rx="5" ry="6" fill="#7B4324" stroke="#5D381E" strokeWidth="1.5" />
            <path
              d="M56 64 C60 62 66 65 64 72 C62 76 56 74 56 64 Z"
              fill="#68D391"
              stroke="#2F855A"
              strokeWidth="1.5"
            />

            {/* Feet */}
            <ellipse cx="46" cy="102" rx="7" ry="4" fill="#7B4324" stroke="#5D381E" strokeWidth="2" />
            <ellipse cx="74" cy="102" rx="7" ry="4" fill="#7B4324" stroke="#5D381E" strokeWidth="2" />
          </g>
        );

      case 'parrotbill':
        return (
          <g id="parrotbill-body">
            {/* Little Tail Feathers */}
            <path d="M24 74 L14 78 L20 84 Z" fill="#D69E2E" stroke="#975A16" strokeWidth="2" />

            {/* Super Round Chubby Baepsae Body */}
            <circle cx="60" cy="62" r="34" fill="#FAF089" stroke="#D69E2E" strokeWidth="3" />
            <ellipse cx="60" cy="68" rx="22" ry="24" fill="#FFFDF0" />

            {/* Tiny Wing */}
            <path
              d="M32 60 C26 68 34 76 44 72 C46 66 38 58 32 60 Z"
              fill="#ECC94B"
              stroke="#B7791F"
              strokeWidth="2"
            />

            {/* Rosy round cheeks */}
            <circle cx="44" cy="62" r="4.5" fill="#FEB2B2" opacity="0.7" />
            <circle cx="76" cy="62" r="4.5" fill="#FEB2B2" opacity="0.7" />

            {/* Beady Black Eyes */}
            <circle cx="48" cy="52" r="3.5" fill="#1A202C" />
            <circle cx="49" cy="50.5" r="1.3" fill="#FFFFFF" />
            <circle cx="72" cy="52" r="3.5" fill="#1A202C" />
            <circle cx="73" cy="50.5" r="1.3" fill="#FFFFFF" />

            {/* Tiny Orange Beak */}
            <polygon points="56,56 64,56 60,62" fill="#ED8936" stroke="#C05621" strokeWidth="1.5" />

            {/* Twiggy bird feet */}
            <path d="M50 94 L50 102 M47 102 L53 102" stroke="#744210" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 94 L70 102 M67 102 L73 102" stroke="#744210" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        );

      case 'cat':
        return (
          <g id="cat-body">
            {/* Curled Cat Tail */}
            <path d="M26 80 Q10 82 12 66 Q16 54 22 58" stroke="#4A5568" strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* Body */}
            <ellipse cx="60" cy="74" rx="25" ry="28" fill="#4A5568" stroke="#2D3748" strokeWidth="3" />
            <ellipse cx="60" cy="76" rx="15" ry="19" fill="#EDF2F7" />

            {/* Pointy Left Ear */}
            <polygon points="32,40 44,18 52,38" fill="#4A5568" stroke="#2D3748" strokeWidth="2.5" />
            <polygon points="36,38 44,24 50,36" fill="#FEB2B2" />

            {/* Pointy Right Ear */}
            <polygon points="88,40 76,18 68,38" fill="#4A5568" stroke="#2D3748" strokeWidth="2.5" />
            <polygon points="84,38 76,24 70,36" fill="#FEB2B2" />

            {/* Cat Head */}
            <circle cx="60" cy="46" r="24" fill="#4A5568" stroke="#2D3748" strokeWidth="3" />

            {/* White face patches */}
            <path d="M46 54 C46 44 74 44 74 54 C74 62 46 62 46 54 Z" fill="#EDF2F7" />

            {/* Whiskers */}
            <path d="M40 54 L30 52 M40 57 L29 58" stroke="#CBD5E0" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M80 54 L90 52 M80 57 L91 58" stroke="#CBD5E0" strokeWidth="1.5" strokeLinecap="round" />

            {/* Chic almond-shaped green cat eyes */}
            <ellipse cx="48" cy="44" rx="4" ry="3.5" fill="#48BB78" stroke="#22543D" strokeWidth="1.5" />
            <line x1="48" y1="41" x2="48" y2="47" stroke="#1A202C" strokeWidth="1.8" strokeLinecap="round" />

            <ellipse cx="72" cy="44" rx="4" ry="3.5" fill="#48BB78" stroke="#22543D" strokeWidth="1.5" />
            <line x1="72" y1="41" x2="72" y2="47" stroke="#1A202C" strokeWidth="1.8" strokeLinecap="round" />

            {/* Little pink nose & mouth */}
            <polygon points="58,51 62,51 60,54" fill="#F687B3" />
            <path d="M57 56 Q60 59 63 56" fill="none" stroke="#2D3748" strokeWidth="1.8" strokeLinecap="round" />

            {/* Paws */}
            <ellipse cx="50" cy="72" rx="5" ry="6" fill="#EDF2F7" stroke="#A0AEC0" strokeWidth="1.5" />
            <ellipse cx="70" cy="72" rx="5" ry="6" fill="#EDF2F7" stroke="#A0AEC0" strokeWidth="1.5" />

            {/* Feet */}
            <ellipse cx="46" cy="101" rx="7" ry="4.5" fill="#EDF2F7" stroke="#A0AEC0" strokeWidth="1.5" />
            <ellipse cx="74" cy="101" rx="7" ry="4.5" fill="#EDF2F7" stroke="#A0AEC0" strokeWidth="1.5" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-auto filter drop-shadow-[0_4px_6px_rgba(54,30,20,0.18)] ${className}`}
    >
      <svg
        viewBox="0 0 120 115"
        className={`w-full h-full overflow-visible transition-transform duration-150 ${
          isWalking ? 'animate-waddle' : isHopping ? 'animate-hop' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderAnimalBody()}
        {renderAccessory()}
      </svg>
    </div>
  );
};
