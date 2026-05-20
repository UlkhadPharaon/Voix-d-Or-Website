import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Studio VOIX D'OR Logo"
    >
      <defs>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="50%" stopColor="#F8E79B" />
          <stop offset="100%" stopColor="#8a6e1f" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Left Side: Film Strip Pyramid Edge */}
      <path 
        d="M100 20 L40 160 H70 L115 55 L100 20Z" 
        fill="url(#goldGradient)" 
      />
      {/* Film Strip Holes */}
      <rect x="55" y="140" width="10" height="10" transform="rotate(-22 60 145)" fill="#050505" />
      <rect x="68" y="110" width="10" height="10" transform="rotate(-22 73 115)" fill="#050505" />
      <rect x="81" y="80" width="10" height="10" transform="rotate(-22 86 85)" fill="#050505" />
      <rect x="94" y="50" width="8" height="8" transform="rotate(-22 98 54)" fill="#050505" />

      {/* Right Side: Sound Waves Pyramid Edge */}
      <path 
        d="M105 20 L160 160 H130 L105 100" 
        stroke="url(#goldGradient)" 
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path 
        d="M125 55 C145 75, 150 110, 135 145" 
        stroke="url(#goldGradient)" 
        strokeWidth="4" 
        strokeLinecap="round"
        opacity="0.8"
      />
      <path 
        d="M135 75 C145 90, 145 110, 140 130" 
        stroke="url(#goldGradient)" 
        strokeWidth="3" 
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Monogram "UP" - Could change to match new name but keeping shape abstract */}
      <path 
        d="M85 175 V185 C85 190, 95 190, 95 185 V175" 
        stroke="url(#goldGradient)" 
        strokeWidth="3" 
      />
      <path 
        d="M105 175 V190 H115 C115 182, 115 182, 105 182" 
        stroke="url(#goldGradient)" 
        strokeWidth="3" 
        fill="none"
      />

      {/* Text Label */}
      <text 
        x="100" 
        y="195" 
        textAnchor="middle" 
        fill="url(#goldGradient)" 
        fontFamily="Cinzel, serif" 
        fontSize="14" 
        fontWeight="bold" 
        letterSpacing="2"
      >
        VOIX D'OR
      </text>
    </svg>
  );
};

export default Logo;