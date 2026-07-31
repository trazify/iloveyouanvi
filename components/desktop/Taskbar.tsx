'use client';

import { useState, useEffect } from 'react';
import { DESKTOP_ICONS } from '@/lib/constants';

interface TaskbarProps {
  lovePercent: number;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  openWindows: string[];
  onWindowClick: (id: string) => void;
}

export default function Taskbar({
  lovePercent, soundEnabled, onSoundToggle, openWindows, onWindowClick,
}: TaskbarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-loveos-taskbar z-[1000] flex items-center px-2 gap-1"
      style={{ borderTop: '4px solid #3D2B1F', boxShadow: 'inset 0 2px 0 #ffffff55' }}
    >
      {/* Start Button */}
      <button className="pixel-btn bg-loveos-accent text-white text-[7px] px-3 py-1 flex items-center gap-1.5 h-7 shrink-0">
        <span className="text-[10px]">❤</span>
        <span>LoveOS</span>
      </button>

      {/* Separator */}
      <div className="w-px h-6 bg-loveos-dark/30 mx-1" />

      {/* Open Window Tabs */}
      <div className="flex-1 flex items-center gap-1 overflow-hidden">
        {openWindows.map(id => {
          const icon = DESKTOP_ICONS.find(i => i.id === id);
          return (
            <button
              key={id}
              onClick={() => onWindowClick(id)}
              className="pixel-btn bg-loveos-cream text-[7px] px-2 py-1 h-7 flex items-center gap-1 truncate max-w-[120px]"
            >
              <span>{icon?.icon}</span>
              <span className="truncate">{icon?.label}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Love Meter Mini */}
        <div className="flex items-center gap-1 text-[7px] text-loveos-dark">
          <span>❤️</span>
          <span>{lovePercent}%</span>
        </div>

        {/* Sound Toggle */}
        <button
          onClick={onSoundToggle}
          className="text-[10px] hover:scale-110 transition-transform"
          title={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-loveos-dark/30" />

        {/* Clock */}
        <div className="bg-loveos-cream border-2 border-loveos-dark/30 px-2 py-0.5 text-[8px] text-loveos-dark"
          style={{ boxShadow: 'inset 1px 1px 0 #00000022' }}
        >
          {time}
        </div>
      </div>
    </div>
  );
}
