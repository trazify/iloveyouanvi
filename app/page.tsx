'use client';

import { useState, useCallback } from 'react';
import type { AppPhase } from '@/types';
import BootScreen from '@/components/boot/BootScreen';
import GuidedExperience from '@/components/desktop/GuidedExperience';
import FinalScene from '@/components/effects/FinalScene';
import ParticleCanvas from '@/components/effects/ParticleCanvas';
import CursorTrail from '@/components/effects/CursorTrail';
import KittyCompanion from '@/components/kitty/KittyCompanion';
import AchievementToast from '@/components/ui/AchievementToast';
import { ACHIEVEMENTS } from '@/lib/constants';
import type { Achievement } from '@/types';

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('boot');
  const [lovePercent, setLovePercent] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(
    ACHIEVEMENTS.map(a => ({ ...a }))
  );
  const [toastAchievement, setToastAchievement] = useState<Achievement | null>(null);
  const [kittyClicks, setKittyClicks] = useState(0);

  const addLove = useCallback((amount: number = 5) => {
    setLovePercent(prev => Math.min(prev + amount, 100));
  }, []);

  const unlockAchievement = useCallback((id: string) => {
    setAchievements(prev => {
      const existing = prev.find(a => a.id === id);
      if (!existing || existing.unlocked) return prev;
      const updated = prev.map(a =>
        a.id === id ? { ...a, unlocked: true } : a
      );
      const achievement = updated.find(a => a.id === id)!;
      setToastAchievement(achievement);
      setTimeout(() => setToastAchievement(null), 3500);
      return updated;
    });
    addLove(5);
  }, [addLove]);

  const handleKittyClick = useCallback(() => {
    const newCount = kittyClicks + 1;
    setKittyClicks(newCount);
    if (newCount >= 5) {
      unlockAchievement('bhonduu');
    }
  }, [kittyClicks, unlockAchievement]);

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <ParticleCanvas />
      <CursorTrail />

      {phase === 'boot' && (
        <BootScreen onComplete={() => setPhase('desktop')} />
      )}

      {(phase === 'hello' || phase === 'desktop') && (
        <GuidedExperience
          onCompleteFinale={() => setPhase('finale')}
          addLove={addLove}
          unlockAchievement={unlockAchievement}
        />
      )}

      {phase === 'finale' && (
        <FinalScene onRestart={() => {
          setPhase('desktop');
        }} />
      )}

      {phase !== 'boot' && phase !== 'finale' && (
        null
      )}

      <AchievementToast achievement={toastAchievement} />
    </main>
  );
}
