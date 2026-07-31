'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DESKTOP_ICONS } from '@/lib/constants';
import type { AppPhase, Achievement } from '@/types';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import Window from './Window';
import HelloWindow from '@/components/windows/HelloWindow';
import DiaryWindow from '@/components/windows/DiaryWindow';
import LetterWindow from '@/components/windows/LetterWindow';
import MemoriesWindow from '@/components/windows/MemoriesWindow';
import FlowersWindow from '@/components/windows/FlowersWindow';
import PlaylistWindow from '@/components/windows/PlaylistWindow';
import GiftsWindow from '@/components/windows/GiftsWindow';
import AchievementsWindow from '@/components/windows/AchievementsWindow';
import QuestionsWindow from '@/components/windows/QuestionsWindow';
import SecretWindow from '@/components/windows/SecretWindow';
import ForeverWindow from '@/components/windows/ForeverWindow';

interface DesktopProps {
  phase: AppPhase;
  setPhase: (p: AppPhase) => void;
  lovePercent: number;
  addLove: (n?: number) => void;
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (s: boolean) => void;
}

interface OpenWindow {
  id: string;
  zIndex: number;
}

export default function Desktop({
  phase, setPhase, lovePercent, addLove,
  achievements, unlockAchievement,
  soundEnabled, setSoundEnabled,
}: DesktopProps) {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([]);
  const [maxZ, setMaxZ] = useState(10);
  const [helloComplete, setHelloComplete] = useState(false);

  // Auto open hello window in hello phase
  useEffect(() => {
    if (phase === 'hello' && openWindows.length === 0) {
      openWindow('hello');
      unlockAchievement('smile');
    }
  }, [phase]);

  // Easter egg: type "anvi" to fill screen with hearts
  useEffect(() => {
    let buffer = '';
    const handler = (e: KeyboardEvent) => {
      buffer += e.key.toLowerCase();
      if (buffer.length > 20) buffer = buffer.slice(-20);
      if (buffer.includes('anvi')) {
        buffer = '';
        // Trigger confetti hearts
        import('canvas-confetti').then(mod => {
          const confetti = mod.default;
          const end = Date.now() + 3000;
          const colors = ['#FF6B81', '#F8D7E7', '#FFB6C1', '#FF1493'];
          (function frame() {
            confetti({
              particleCount: 4,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors,
              shapes: ['circle'],
            });
            confetti({
              particleCount: 4,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors,
              shapes: ['circle'],
            });
            if (Date.now() < end) requestAnimationFrame(frame);
          })();
        });
      }
      if (buffer.includes('iloveyou')) {
        buffer = '';
        openWindow('letters');
      }
    };
    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, []);

  const openWindow = useCallback((id: string) => {
    setOpenWindows(prev => {
      const exists = prev.find(w => w.id === id);
      if (exists) {
        const newZ = maxZ + 1;
        setMaxZ(newZ);
        return prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w);
      }
      const newZ = maxZ + 1;
      setMaxZ(newZ);
      return [...prev, { id, zIndex: newZ }];
    });

    // Play window open sound
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }, [maxZ]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    // Play close sound
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(900, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }, []);

  const bringToFront = useCallback((id: string) => {
    const newZ = maxZ + 1;
    setMaxZ(newZ);
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: newZ } : w));
  }, [maxZ]);

  const handleHelloComplete = useCallback(() => {
    setHelloComplete(true);
    setPhase('desktop');
    closeWindow('hello');
  }, [setPhase, closeWindow]);

  const handleIconDoubleClick = useCallback((id: string) => {
    if (phase === 'hello' && !helloComplete && id !== 'hello') return;
    openWindow(id);
  }, [phase, helloComplete, openWindow]);

  const getWindowTitle = (id: string) => {
    const exeNames: Record<string, string> = {
      hello: 'Hello.exe',
      diary: 'Diary.exe',
      memories: 'Memories.exe',
      letters: 'Letters.exe',
      playlist: 'Playlist.exe',
      flowers: 'Garden.exe',
      gifts: 'Gifts.exe',
      achievements: 'Achievements.exe',
      questions: 'Quiz.exe',
      secret: 'Secret.exe',
      forever: 'Forever.exe',
    };
    return exeNames[id] || `${id}.exe`;
  };

  const getWindowSize = (id: string) => {
    switch (id) {
      case 'hello': return { width: 480, height: 360 };
      case 'diary': return { width: 520, height: 460 };
      case 'letters': return { width: 500, height: 480 };
      case 'memories': return { width: 560, height: 440 };
      case 'flowers': return { width: 460, height: 400 };
      case 'playlist': return { width: 420, height: 380 };
      case 'gifts': return { width: 480, height: 400 };
      case 'achievements': return { width: 540, height: 460 };
      case 'questions': return { width: 480, height: 420 };
      case 'secret': return { width: 440, height: 380 };
      case 'forever': return { width: 560, height: 420 };
      default: return { width: 480, height: 400 };
    }
  };

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'hello':
        return <HelloWindow onComplete={handleHelloComplete} />;
      case 'diary':
        return <DiaryWindow addLove={addLove} unlockAchievement={unlockAchievement} />;
      case 'letters':
        return <LetterWindow addLove={addLove} unlockAchievement={unlockAchievement} />;
      case 'memories':
        return <MemoriesWindow addLove={addLove} />;
      case 'flowers':
        return <FlowersWindow addLove={addLove} />;
      case 'playlist':
        return <PlaylistWindow addLove={addLove} unlockAchievement={unlockAchievement} />;
      case 'gifts':
        return <GiftsWindow addLove={addLove} unlockAchievement={unlockAchievement} />;
      case 'achievements':
        return <AchievementsWindow achievements={achievements} />;
      case 'questions':
        return <QuestionsWindow addLove={addLove} unlockAchievement={unlockAchievement} />;
      case 'secret':
        return <SecretWindow addLove={addLove} unlockAchievement={unlockAchievement} />;
      case 'forever':
        return <ForeverWindow lovePercent={lovePercent} addLove={addLove} />;
      default:
        return <div className="p-4 text-[9px]">Coming soon ❤️</div>;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-loveos-bg desktop-dots"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Desktop Icons Grid */}
      <div className="absolute top-4 left-4 grid grid-cols-2 gap-x-6 gap-y-2 z-[1]">
        {DESKTOP_ICONS.map((icon, idx) => (
          <motion.div
            key={icon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phase === 'hello' ? 0 : 0.1 * idx, duration: 0.3 }}
          >
            <DesktopIcon
              icon={icon.icon}
              label={icon.label}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
              disabled={phase === 'hello' && !helloComplete && icon.id !== 'hello'}
            />
          </motion.div>
        ))}
      </div>

      {/* Open Windows */}
      <AnimatePresence>
        {openWindows.map((win) => {
          const size = getWindowSize(win.id);
          return (
            <Window
              key={win.id}
              id={win.id}
              title={getWindowTitle(win.id)}
              zIndex={win.zIndex}
              width={size.width}
              height={size.height}
              onClose={() => closeWindow(win.id)}
              onFocus={() => bringToFront(win.id)}
            >
              {renderWindowContent(win.id)}
            </Window>
          );
        })}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        lovePercent={lovePercent}
        soundEnabled={soundEnabled}
        onSoundToggle={() => setSoundEnabled(!soundEnabled)}
        openWindows={openWindows.map(w => w.id)}
        onWindowClick={bringToFront}
      />
    </motion.div>
  );
}
