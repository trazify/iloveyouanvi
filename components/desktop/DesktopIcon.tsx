'use client';

import { useState } from 'react';

import { HelloKittyIcon, KuromiIcon } from '@/components/ui/SanrioIcons';

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
  disabled?: boolean;
}

export default function DesktopIcon({ icon, label, onDoubleClick, disabled }: DesktopIconProps) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      className={`flex flex-col items-center gap-1 p-2 rounded-sm w-[84px] transition-all duration-100
        ${selected ? 'bg-loveos-accent/20 border-2 border-loveos-accent/40' : 'hover:bg-loveos-pink/30 border-2 border-transparent'}
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={() => setSelected(true)}
      onDoubleClick={() => {
        if (!disabled) onDoubleClick();
      }}
      onBlur={() => setSelected(false)}
      disabled={disabled}
    >
      <div
        className="text-2xl select-none w-8 h-8 flex items-center justify-center"
        style={{ animation: selected ? 'pixel-bounce 0.4s ease' : undefined }}
      >
        {label === 'Open Me' ? (
          <HelloKittyIcon className="w-8 h-8" />
        ) : label === 'Secret' ? (
          <KuromiIcon className="w-8 h-8" />
        ) : (
          icon
        )}
      </div>
      <span className="text-[7px] text-loveos-dark text-center leading-tight select-none break-words font-bold">
        {label}
      </span>
    </button>
  );
}
