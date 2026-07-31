'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FINAL_MESSAGE } from '@/lib/constants';
import { HelloKittyIcon, KuromiIcon } from '@/components/ui/SanrioIcons';

interface FinalSceneProps {
  onRestart: () => void;
}

export default function FinalScene({ onRestart }: FinalSceneProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  // Line by line reveal animation
  useEffect(() => {
    if (visibleLines >= FINAL_MESSAGE.length) {
      const timer = setTimeout(() => setShowButtons(true), 1000);
      return () => clearTimeout(timer);
    }

    const currentText = FINAL_MESSAGE[visibleLines];
    const delay = currentText === '' ? 400 : 700;
    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  // Confetti trigger once at start
  useEffect(() => {
    import('canvas-confetti').then(mod => {
      mod.default({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#8B0000', '#FFB6C1', '#FFE5EC', '#FF69B4'],
      });
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[2000] bg-[#FAF5E8] desktop-dots flex flex-col items-center justify-center p-4 select-none overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Gentle Floating Sakura Petals Background */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute text-xl pointer-events-none z-10"
          style={{
            left: `${15 + i * 15}%`,
            top: `-5%`,
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, 15, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'linear',
          }}
        >
          🌸
        </motion.div>
      ))}

      {/* Main Final Love Card Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="win98-window w-full max-w-lg bg-[#FAF5E8] relative z-20 my-auto shadow-[8px_8px_0_#2B2B2B]"
      >
        {/* Titlebar */}
        <div className="win98-titlebar">
          <div className="flex items-center gap-2">
            <span className="text-[#8B0000] text-xs">❤</span>
            <span className="text-[#2B2B2B] text-[10px] font-bold">Our_Forever_Surprise.exe</span>
          </div>
          <div className="flex gap-1">
            <button className="win98-title-btn">□</button>
            <button className="win98-title-btn">□</button>
            <button className="win98-close-btn" onClick={onRestart}>✕</button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 flex flex-col items-center text-center">

          {/* Sanrio Bouncing Characters */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >
              <HelloKittyIcon className="w-16 h-16" />
            </motion.div>
            <motion.span
              className="text-2xl"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              💖
            </motion.span>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
            >
              <KuromiIcon className="w-16 h-16" />
            </motion.div>
          </div>

          {/* White Paper Letter Box with 100% Readability */}
          <div className="relative bg-white border-2 border-[#2B2B2B] rounded-sm p-6 w-full text-left mb-6 shadow-[3px_3px_0_#FFB6C1] max-h-[55vh] overflow-y-auto">
            {/* Horizontal ruled pink lines bg */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #FFD6E0 27px, #FFD6E0 28px)',
                backgroundPosition: '0 20px',
              }}
            />

            <div className="relative z-10">
              {FINAL_MESSAGE.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`font-[family-name:var(--font-hand)] leading-relaxed mb-2.5 ${
                    i === 0 ? 'text-2xl text-[#2B2B2B] font-bold' :
                    i === 1 ? 'text-xl text-[#8B0000] font-bold mb-3' :
                    line === '' ? 'h-2' :
                    line.startsWith('I love you') || line.startsWith('Forever') ? 'text-2xl text-[#8B0000] font-bold pt-2' :
                    line.startsWith('Again') ? 'text-xl text-[#8B0000] font-bold' :
                    'text-lg text-[#3D2B1F]'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Credits & Restart Action */}
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center w-full"
            >
              <p className="text-[9px] text-[#8B0000] font-bold tracking-widest uppercase mb-1">
                Made with infinite love for Anvi ❤️
              </p>
              <p className="text-[7px] text-[#2B2B2B] tracking-wider mb-4 font-bold">
                Happy National Girlfriend&apos;s Day 2026!
              </p>

              <button
                onClick={onRestart}
                className="pixel-btn pixel-btn-red text-xs px-8 py-3 w-full tracking-wider font-bold"
              >
                RETURN TO DESKTOP ❤️
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
