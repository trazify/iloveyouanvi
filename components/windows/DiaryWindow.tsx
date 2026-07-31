'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DIARY_ENTRIES } from '@/lib/constants';

interface DiaryWindowProps {
  addLove: (n?: number) => void;
  unlockAchievement: (id: string) => void;
}

export default function DiaryWindow({ addLove, unlockAchievement }: DiaryWindowProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [readPages, setReadPages] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState(1);

  const entry = DIARY_ENTRIES[currentPage];

  const markRead = (page: number) => {
    if (!readPages.has(page)) {
      const updated = new Set(readPages);
      updated.add(page);
      setReadPages(updated);
      addLove(3);
      if (updated.size >= DIARY_ENTRIES.length) {
        unlockAchievement('favourite');
      }
    }
  };

  const goToPage = (next: number) => {
    if (next < 0 || next >= DIARY_ENTRIES.length) return;
    setDirection(next > currentPage ? 1 : -1);
    setCurrentPage(next);
    markRead(next);
    // Page flip sound
    try {
      const ctx = new AudioContext();
      const bufferSize = 4096;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 1000);
      }
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buffer;
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch {}
  };

  return (
    <div className="h-full flex flex-col">
      {/* Notebook Header */}
      <div className="bg-loveos-peach/50 border-b-2 border-loveos-win-border px-4 py-2 flex items-center justify-between">
        <span className="text-[8px] text-loveos-dark">
          📖 Page {currentPage + 1} of {DIARY_ENTRIES.length}
        </span>
        <div className="flex gap-1">
          {DIARY_ENTRIES.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${
                i === currentPage ? 'bg-loveos-accent' : readPages.has(i) ? 'bg-loveos-pink' : 'bg-loveos-beige'
              }`}
              onClick={() => goToPage(i)}
            />
          ))}
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ x: direction * 300, opacity: 0, rotateY: direction * 30 }}
            animate={{ x: 0, opacity: 1, rotateY: 0 }}
            exit={{ x: direction * -300, opacity: 0, rotateY: direction * -30 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute inset-0 p-6 paper-texture"
          >
            {/* Lined paper effect */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e8c4c444 27px, #e8c4c444 28px)',
                backgroundPosition: '0 50px',
              }}
            />
            {/* Red margin line */}
            <div className="absolute top-0 bottom-0 left-[60px] w-px bg-loveos-accent/20" />

            <div className="relative z-10 pl-[50px]">
              <div className="text-[8px] text-loveos-accent mb-2 tracking-wider">
                ✦ {entry.date}
              </div>
              <p className="font-[family-name:var(--font-hand)] text-lg text-loveos-dark/90 leading-[28px]">
                {entry.content}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="bg-loveos-peach/30 border-t-2 border-loveos-win-border px-4 py-2 flex items-center justify-between">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="pixel-btn bg-loveos-cream text-[8px] px-3 py-1 disabled:opacity-30"
        >
          ← Prev
        </button>
        <span className="text-[7px] text-loveos-muted">
          {readPages.size}/{DIARY_ENTRIES.length} read
        </span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === DIARY_ENTRIES.length - 1}
          className="pixel-btn bg-loveos-cream text-[8px] px-3 py-1 disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
