'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GIFTS } from '@/lib/constants';

interface GiftsWindowProps {
  addLove: (n?: number) => void;
  unlockAchievement: (id: string) => void;
}

export default function GiftsWindow({ addLove, unlockAchievement }: GiftsWindowProps) {
  const [openedGifts, setOpenedGifts] = useState<Set<number>>(new Set());
  const [revealedGift, setRevealedGift] = useState<number | null>(null);

  const openGift = (id: number) => {
    if (!openedGifts.has(id)) {
      const updated = new Set(openedGifts);
      updated.add(id);
      setOpenedGifts(updated);
      setRevealedGift(id);
      addLove(5);
      // Check if all opened
      if (updated.size >= GIFTS.length) {
        unlockAchievement('hugger');
      }
      // Gift open sound
      try {
        const ctx = new AudioContext();
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
          gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.08);
          osc.stop(ctx.currentTime + i * 0.08 + 0.2);
        });
      } catch {}
      // Confetti
      import('canvas-confetti').then(mod => {
        mod.default({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FF6B81', '#F8D7E7', '#FFB6C1', '#f7d070'],
        });
      });
    } else {
      setRevealedGift(revealedGift === id ? null : id);
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[8px] text-loveos-muted text-center mb-4">
        🎁 Tap a gift to unwrap your surprise! ❤️
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1">
        {GIFTS.map((gift) => {
          const isOpened = openedGifts.has(gift.id);
          const isRevealed = revealedGift === gift.id;

          return (
            <motion.button
              key={gift.id}
              onClick={() => openGift(gift.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className={`pixel-btn flex flex-col items-center justify-center p-4 gap-2 transition-colors ${
                isOpened ? 'bg-loveos-pink/20' : 'bg-loveos-cream'
              }`}
            >
              <motion.div
                className="text-4xl"
                animate={!isOpened ? {
                  y: [0, -4, 0],
                  rotate: [0, -5, 5, 0],
                } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {isOpened ? gift.icon : '🎁'}
              </motion.div>

              <div className="text-[8px] text-loveos-dark">
                {isOpened ? gift.label : '???'}
              </div>

              <AnimatePresence>
                {isRevealed && isOpened && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-[family-name:var(--font-hand)] text-sm text-loveos-accent text-center"
                  >
                    {gift.content}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center mt-3 text-[7px] text-loveos-muted">
        {openedGifts.size}/{GIFTS.length} gifts unwrapped
      </div>
    </div>
  );
}
