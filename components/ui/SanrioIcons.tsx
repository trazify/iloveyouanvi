'use client';

export function HelloKittyIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <path d="M 30 40 L 16 12 Q 12 6, 26 12 L 44 26 Z" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round" />
      <path d="M 90 40 L 104 12 Q 108 6, 94 12 L 76 26 Z" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round" />
      
      {/* Head */}
      <ellipse cx="60" cy="52" rx="44" ry="32" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="4" />

      {/* Red Bow on Left Ear */}
      <g transform="translate(34, 22) rotate(-12)">
        <ellipse cx="-14" cy="0" rx="10" ry="8" fill="#E62E2E" stroke="#2B2B2B" strokeWidth="3" />
        <ellipse cx="14" cy="0" rx="10" ry="8" fill="#E62E2E" stroke="#2B2B2B" strokeWidth="3" />
        <circle cx="0" cy="0" r="7" fill="#E62E2E" stroke="#2B2B2B" strokeWidth="3" />
        <circle cx="-2" cy="-2" r="2" fill="#FFAAAA" />
      </g>

      {/* Eyes */}
      <ellipse cx="40" cy="54" rx="4.5" ry="6" fill="#2B2B2B" />
      <ellipse cx="80" cy="54" rx="4.5" ry="6" fill="#2B2B2B" />

      {/* Nose */}
      <ellipse cx="60" cy="60" rx="4.5" ry="3" fill="#FFC107" stroke="#2B2B2B" strokeWidth="2" />

      {/* Whiskers Left */}
      <path d="M 20 48 L 4 46" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 18 56 L 2 56" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 20 64 L 5 66" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />

      {/* Whiskers Right */}
      <path d="M 100 48 L 116 46" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 102 56 L 118 56" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 100 64 L 115 66" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />

      {/* Body & Blue Dress */}
      <path d="M 40 82 L 36 106 C 36 110, 84 110, 84 106 L 80 82 Z" fill="#2563EB" stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round" />
      {/* Yellow Shirt Sleeves */}
      <ellipse cx="38" cy="88" rx="6" ry="8" fill="#FFC107" stroke="#2B2B2B" strokeWidth="3" />
      <ellipse cx="82" cy="88" rx="6" ry="8" fill="#FFC107" stroke="#2B2B2B" strokeWidth="3" />
      {/* Paws */}
      <ellipse cx="48" cy="108" rx="8" ry="6" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3" />
      <ellipse cx="72" cy="108" rx="8" ry="6" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3" />
    </svg>
  );
}

export function KuromiIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Jester Hat Point Left */}
      <path d="M 38 42 L 12 12 Q 6 6, 18 6 L 48 26 Z" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="10" cy="10" r="5" fill="#FF69B4" stroke="#2B2B2B" strokeWidth="2.5" />

      {/* Jester Hat Point Right */}
      <path d="M 82 42 L 108 12 Q 114 6, 102 6 L 72 26 Z" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="110" cy="10" r="5" fill="#FF69B4" stroke="#2B2B2B" strokeWidth="2.5" />

      {/* Head Oval */}
      <ellipse cx="60" cy="54" rx="42" ry="30" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="4" />

      {/* Black Hood Overlay */}
      <path d="M 18 52 C 22 28, 98 28, 102 52 C 102 34, 86 22, 60 22 C 34 22, 18 34, 18 52 Z" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="3.5" />

      {/* Pink Skull Emblem */}
      <g transform="translate(60, 30)">
        <ellipse cx="0" cy="0" rx="7" ry="5.5" fill="#FF69B4" stroke="#2B2B2B" strokeWidth="2" />
        <circle cx="-2.5" cy="-1" r="1.2" fill="#2B2B2B" />
        <circle cx="2.5" cy="-1" r="1.2" fill="#2B2B2B" />
        <path d="M -2 3 L 2 3" stroke="#2B2B2B" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* Eyes */}
      <path d="M 34 50 Q 42 44 46 56 Q 38 58 34 50" fill="#2B2B2B" stroke="#2B2B2B" strokeWidth="1" />
      <circle cx="42" cy="51" r="1.6" fill="#FFFFFF" />

      <path d="M 86 50 Q 78 44 74 56 Q 82 58 86 50" fill="#2B2B2B" stroke="#2B2B2B" strokeWidth="1" />
      <circle cx="78" cy="51" r="1.6" fill="#FFFFFF" />

      {/* W-Smile */}
      <path d="M 52 62 Q 56 66 60 62 Q 64 66 68 62" stroke="#2B2B2B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Cheeks */}
      <ellipse cx="30" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.8" />
      <ellipse cx="90" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.8" />

      {/* Body & Jester Collar */}
      <path d="M 42 80 L 38 104 C 38 108, 82 108, 82 104 L 78 80 Z" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="4" strokeLinejoin="round" />
      {/* Pink Jester Points on Collar */}
      <path d="M 44 80 L 52 90 L 60 80 L 68 90 L 76 80" stroke="#FF69B4" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Devil Tail */}
      <path d="M 80 98 Q 98 100 96 112 L 102 110 L 96 116 L 92 108 L 96 112" stroke="#2B2B2B" strokeWidth="3" fill="#FF69B4" />

      {/* Feet */}
      <ellipse cx="48" cy="106" rx="7" ry="5" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="3" />
      <ellipse cx="72" cy="106" rx="7" ry="5" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="3" />
    </svg>
  );
}

export function SanrioHuggingIcon({ className = "w-28 h-24" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Floating Heart */}
      <path d="M 80 20 Q 70 8 58 18 Q 48 30 80 50 Q 112 30 102 18 Q 90 8 80 20 Z" fill="#FF69B4" stroke="#2B2B2B" strokeWidth="3" />

      {/* Hello Kitty on Left */}
      <g transform="translate(20, 20)">
        <ellipse cx="40" cy="40" rx="30" ry="22" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3.5" />
        <ellipse cx="28" cy="42" rx="3" ry="4" fill="#2B2B2B" />
        <ellipse cx="52" cy="42" rx="3" ry="4" fill="#2B2B2B" />
        <ellipse cx="40" cy="47" rx="3" ry="2" fill="#FFC107" stroke="#2B2B2B" strokeWidth="1.5" />
        <circle cx="20" cy="24" r="6" fill="#E62E2E" stroke="#2B2B2B" strokeWidth="2" />
        {/* Kitty Arm Hugging */}
        <path d="M 45 60 C 60 55, 75 65, 70 75" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
      </g>

      {/* Kuromi on Right */}
      <g transform="translate(70, 20)">
        <ellipse cx="40" cy="40" rx="30" ry="22" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3.5" />
        <path d="M 12 38 C 16 20, 64 20, 68 38 C 68 25, 56 16, 40 16 C 24 16, 12 25, 12 38 Z" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="3" />
        <ellipse cx="28" cy="42" rx="3" ry="4" fill="#2B2B2B" />
        <ellipse cx="52" cy="42" rx="3" ry="4" fill="#2B2B2B" />
        <path d="M 34 47 Q 40 51 46 47" stroke="#2B2B2B" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Kuromi Arm Hugging */}
        <path d="M 35 60 C 20 55, 5 65, 10 75" fill="#1F1F1F" stroke="#2B2B2B" strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ── Floral Vector Icons ── */

export function WhiteRoseSVG({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 45 L 40 75" stroke="#2D5A27" strokeWidth="4" strokeLinecap="round" />
      <path d="M 40 58 Q 25 50 30 42 C 38 48 40 58 40 58 Z" fill="#4E8B42" stroke="#2B2B2B" strokeWidth="2" />
      <path d="M 40 64 Q 55 56 50 48 C 42 54 40 64 40 64 Z" fill="#4E8B42" stroke="#2B2B2B" strokeWidth="2" />
      {/* Rose Petals (Pure White with Crisp Border) */}
      <circle cx="40" cy="32" r="18" fill="#FFFFFF" stroke="#2B2B2B" strokeWidth="3" />
      <path d="M 32 25 Q 40 38 48 25 Q 40 42 32 25 Z" fill="#F8F8F8" stroke="#2B2B2B" strokeWidth="2.5" />
      <circle cx="40" cy="30" r="7" fill="#FFF5F7" stroke="#2B2B2B" strokeWidth="2" />
    </svg>
  );
}

export function PinkTulipSVG({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 45 L 40 75" stroke="#2D5A27" strokeWidth="4" strokeLinecap="round" />
      <path d="M 40 55 Q 20 48 25 38 C 35 45 40 55 40 55 Z" fill="#4E8B42" stroke="#2B2B2B" strokeWidth="2" />
      {/* Tulip Petals */}
      <path d="M 24 38 Q 20 15 40 15 Q 60 15 56 38 Q 40 48 24 38 Z" fill="#FFB6C1" stroke="#2B2B2B" strokeWidth="3" />
      <path d="M 32 38 Q 40 22 48 38 Z" fill="#FF69B4" stroke="#2B2B2B" strokeWidth="2.5" />
    </svg>
  );
}

export function OrchidSVG({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 45 L 40 75" stroke="#2D5A27" strokeWidth="4" strokeLinecap="round" />
      {/* Orchid Petals */}
      <circle cx="40" cy="20" r="12" fill="#E6E6FA" stroke="#2B2B2B" strokeWidth="2.5" />
      <circle cx="25" cy="32" r="12" fill="#D8BFD8" stroke="#2B2B2B" strokeWidth="2.5" />
      <circle cx="55" cy="32" r="12" fill="#D8BFD8" stroke="#2B2B2B" strokeWidth="2.5" />
      <path d="M 33 34 Q 40 46 47 34 Q 40 28 33 34 Z" fill="#BA55D3" stroke="#2B2B2B" strokeWidth="2.5" />
      <circle cx="40" cy="32" r="4" fill="#FFD707" stroke="#2B2B2B" strokeWidth="1.5" />
    </svg>
  );
}

export function SakuraSVG({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 40 45 L 40 75" stroke="#2D5A27" strokeWidth="4" strokeLinecap="round" />
      {/* 5 Petals */}
      <g transform="translate(40,30)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path d="M 0 0 C -10 -18, -4 -25, 0 -22 C 4 -25, 10 -18, 0 0 Z" fill="#FFC0CB" stroke="#2B2B2B" strokeWidth="2" />
          </g>
        ))}
        <circle cx="0" cy="0" r="4" fill="#FF69B4" stroke="#2B2B2B" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

export function CuteCatIllustration({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <HelloKittyIcon className="w-full h-full drop-shadow-md" />
    </div>
  );
}
