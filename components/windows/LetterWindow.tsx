'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_LETTERS } from '@/lib/constants';
import ThemeLetterNote from '@/components/ui/ThemeLetterNote';

interface LetterWindowProps {
  addLove: (n?: number) => void;
  unlockAchievement: (id: string) => void;
}

export default function LetterWindow({ addLove, unlockAchievement }: LetterWindowProps) {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [sealBroken, setSealBroken] = useState<Set<number>>(new Set());

  const breakSeal = (id: number) => {
    if (!sealBroken.has(id)) {
      const updated = new Set(sealBroken);
      updated.add(id);
      setSealBroken(updated);
      setSelectedLetter(id);
      addLove(5);
      // The "important letter" is #3
      if (id === 3) {
        unlockAchievement('safe');
      }
      // Wax seal break sound
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch {}
    } else {
      setSelectedLetter(id);
    }
  };

  const letter = selectedLetter !== null ? LOVE_LETTERS.find(l => l.id === selectedLetter) : null;

  return (
    <div className="h-full flex flex-col">
      <AnimatePresence mode="wait">
        {!letter ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 flex flex-col gap-3 h-full"
          >
            <div className="text-[8px] text-loveos-muted text-center mb-2">
              Click a seal to open a letter ❤️
            </div>
            {LOVE_LETTERS.map((l) => (
              <button
                key={l.id}
                onClick={() => breakSeal(l.id)}
                className="pixel-btn bg-loveos-cream p-3 flex items-center gap-3 text-left hover:bg-loveos-pink/30 transition-colors"
              >
                <div className={`wax-seal w-10 h-10 text-xs ${sealBroken.has(l.id) ? 'opacity-50' : ''}`}>
                  {sealBroken.has(l.id) ? '📜' : '💌'}
                </div>
                <div>
                  <div className="text-[9px] text-loveos-dark font-bold">{l.title}</div>
                  <div className="text-[7px] text-loveos-muted mt-0.5">
                    {sealBroken.has(l.id) ? 'Opened ❤️' : 'Sealed — click to open'}
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`letter-${letter.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="h-full flex flex-col"
          >
            {/* Back button */}
            <div className="bg-loveos-peach/30 border-b-2 border-loveos-win-border px-3 py-1.5">
              <button
                onClick={() => setSelectedLetter(null)}
                className="text-[8px] text-loveos-accent hover:underline"
              >
                ← Back to letters
              </button>
            </div>

            {/* Letter content */}
            <div className="flex-1 overflow-auto bg-[#FAF5E8] p-4">
              <ThemeLetterNote onBack={() => setSelectedLetter(null)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
