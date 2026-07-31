'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelloKittyIcon, KuromiIcon } from '@/components/ui/SanrioIcons';

interface SecretWindowProps {
  addLove: (n?: number) => void;
  unlockAchievement: (id: string) => void;
}

export default function SecretWindow({ addLove, unlockAchievement }: SecretWindowProps) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);

  const tryPassword = () => {
    const entered = password.toLowerCase().trim();
    if (entered === 'bhondu' || entered === 'bhonduu') {
      setUnlocked(true);
      addLove(10);
      unlockAchievement('strawberry');
      // Magical unlock sound
      try {
        const ctx = new AudioContext();
        [440, 554, 659, 880].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);
          gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.15 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.15);
          osc.stop(ctx.currentTime + i * 0.15 + 0.5);
        });
      } catch {}
      // Confetti
      import('canvas-confetti').then(mod => {
        mod.default({ particleCount: 100, spread: 90, colors: ['#FF6B81', '#F8D7E7', '#FFB6C1'] });
      });
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 select-none">
      <AnimatePresence mode="wait">
        {!unlocked ? (
          <motion.div
            key="locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center w-full flex flex-col items-center py-4"
          >
            <div className="text-4xl mb-3">🔑</div>
            <p className="text-sm text-[#2B2B2B] font-bold mb-1">This room is locked.</p>
            <p className="text-[9px] text-[#8B0000] font-bold mb-4">Enter secret password (bhondu):</p>

            <div className="flex gap-2 items-center justify-center mb-3 w-full max-w-xs">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && tryPassword()}
                placeholder="type bhondu..."
                className={`pixel-btn bg-white text-xs px-3 py-2 w-full text-center text-[#2B2B2B] outline-none ${
                  error ? 'border-red-400 bg-red-50' : ''
                }`}
              />
              <button
                onClick={tryPassword}
                className="pixel-btn pixel-btn-red text-xs px-4 py-2"
              >
                ENTER
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[9px] text-red-500 font-bold"
              >
                Wrong password! Hint: &quot;bhondu&quot; 💕
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="text-center w-full flex flex-col items-center justify-center py-2"
          >
            {/* Sanrio Gift Pass */}
            <div className="relative bg-[#FFF0F5] border-3 border-[#2B2B2B] rounded-md p-6 max-w-sm w-full shadow-[6px_6px_0_#2B2B2B] overflow-hidden">
              {/* Header Badges */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-[#FFB6C1] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <HelloKittyIcon className="w-10 h-10" />
                  <span className="text-xs text-[#8B0000] font-bold tracking-wider uppercase">VIP PASS</span>
                </div>
                <KuromiIcon className="w-10 h-10" />
              </div>

              {/* Title */}
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-2xl text-[#8B0000] font-bold mb-2 font-[family-name:var(--font-hand)]"
              >
                Infinite Use Makeout Card 💋
              </motion.div>

              {/* Content box */}
              <div className="bg-white border-2 border-[#2B2B2B] p-4 rounded-sm text-left mb-4 shadow-[2px_2px_0_#FFB6C1]">
                <p className="font-[family-name:var(--font-hand)] text-lg text-[#2B2B2B] leading-relaxed mb-2 font-bold">
                  Cardholder: Anvi (Bhondu) ❤️
                </p>
                <p className="font-[family-name:var(--font-hand)] text-base text-[#3D2B1F] leading-relaxed">
                  Valid forever. Redeemable anytime, anywhere for unlimited kisses, warm hugs, and long makeout sessions with no expiration date! 💋
                </p>
              </div>

              {/* Footer Stamp */}
              <div className="flex items-center justify-between text-[8px] text-[#8B0000] font-bold tracking-widest uppercase">
                <span>OFFICIAL SANRIO GIFT</span>
                <span>EXPIRY: NEVER</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
