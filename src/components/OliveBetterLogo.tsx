import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const OliveBetterLogo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base' },
    md: { icon: 38, text: 'text-lg' },
    lg: { icon: 52, text: 'text-2xl' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Exact replica of the Better oval badge */}
      <svg
        width={currentSize.icon}
        height={currentSize.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
        aria-label="Olive Better Logo"
      >
        <g transform="translate(50, 50) rotate(-22) translate(-50, -50)">
          {/* Tilted oval dark chocolate background */}
          <ellipse cx="50" cy="50" rx="38" ry="46" fill="#361E14" />
          
          {/* Stylized butter yellow script 'B' */}
          <path
            d="M36 24 C45 23, 62 25, 62 36 C62 44, 53 47, 47 48 C56 50, 66 54, 66 65 C66 76, 52 78, 38 78 C30 78, 25 76, 25 76 L32 70 C34 70, 37 71, 41 71 C51 71, 57 67, 57 60 C57 52, 48 49, 41 49 L37 49 L39 43 L44 43 C50 43, 54 40, 54 34 C54 29, 49 28, 41 28 C37 28, 33 29, 31 30 Z"
            fill="#FFF8A8"
          />
          {/* Top inner bowl cutout */}
          <path
            d="M44 32 C47 32, 50 33, 50 36 C50 39, 47 41, 42 41 L40 41 L42 32 Z"
            fill="#361E14"
          />
          {/* Bottom inner bowl cutout */}
          <path
            d="M42 54 C47 54, 52 56, 52 61 C52 66, 47 67, 42 67 C39 67, 37 67, 36 66 L38 54 Z"
            fill="#361E14"
          />
        </g>
      </svg>

      {showText && (
        <span className={`font-extrabold tracking-tight text-[#361E14] font-sans ${currentSize.text}`}>
          Olive Better
        </span>
      )}
    </div>
  );
};
