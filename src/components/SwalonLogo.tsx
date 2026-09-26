import React from 'react';

interface SwalonLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'dark' | 'light';
}

export const SwalonLogo: React.FC<SwalonLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'dark'
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7 min-w-7',
    md: 'w-8.5 h-8.5 min-w-8.5',
    lg: 'w-10 h-10 min-w-10'
  };

  const svgDimensions = {
    sm: 18,
    md: 22,
    lg: 26
  };

  const textSizes = {
    sm: 'text-sm font-bold',
    md: 'text-base font-bold',
    lg: 'text-lg font-bold'
  };

  const subTextSizes = {
    sm: 'text-[9px] tracking-wider',
    md: 'text-[10px] tracking-wider',
    lg: 'text-[11px] tracking-wider'
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Simple, Professional Geometric Monogram Emblem */}
      <div
        className={`${iconDimensions[size]} rounded-xl bg-gradient-to-br from-[#005d42] to-[#014732] shadow-sm flex items-center justify-center shrink-0 border border-emerald-500/20 transition-transform duration-200 hover:scale-[1.03]`}
      >
        <svg
          width={svgDimensions[size]}
          height={svgDimensions[size]}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Smart Route Loop forming 'S' for SWALON & Circular Logistics */}
          {/* Route path: upper clockwise loop to center, then lower counter-clockwise loop */}
          <path
            d="M17.5 7.5C17.5 5.57 15.43 4 12.5 4C9.57 4 7.5 5.57 7.5 7.5C7.5 9.43 9.2 10.5 12 11.5C14.8 12.5 16.5 13.57 16.5 15.5C16.5 17.43 14.43 19 11.5 19C8.57 19 6.5 17.43 6.5 15.5"
            stroke="#ffffff"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Origin waypoint node (Start/Depot) */}
          <circle cx="17.5" cy="7.5" r="2" fill="#34d399" />
          {/* Destination waypoint node (TPA/Facility) */}
          <circle cx="6.5" cy="15.5" r="2" fill="#6ee7b7" />
          {/* Center coordination pulse */}
          <circle cx="12" cy="11.5" r="1.1" fill="#ffffff" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none justify-center">
          <div className="flex items-center gap-1.5">
            <span
              className={`${textSizes[size]} tracking-tight ${
                isLight ? 'text-white' : 'text-slate-900 font-extrabold'
              }`}
            >
              SWALON
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
          </div>
          <span
            className={`${subTextSizes[size]} font-semibold uppercase mt-0.5 ${
              isLight ? 'text-emerald-200/80' : 'text-slate-500'
            }`}
          >
            Smart Waste Logistics
          </span>
        </div>
      )}
    </div>
  );
};
