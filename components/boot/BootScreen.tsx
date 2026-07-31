'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOOT_MESSAGES } from '@/lib/constants';
import { HelloKittyIcon, KuromiIcon } from '@/components/ui/SanrioIcons';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  // Sequential loading
  useEffect(() => {
    if (currentLine >= BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }, 600);
      return () => clearTimeout(timer);
    }

    const delay = currentLine === 0 ? 600 : 350 + Math.random() * 250;
    const timer = setTimeout(() => {
      setCurrentLine(prev => prev + 1);
      setProgress(((currentLine + 1) / BOOT_MESSAGES.length) * 100);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 bg-[#FAF5E8] desktop-dots flex flex-col items-center justify-center p-4 select-none"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating Petals / Hearts in loading screen */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`loading-heart-${i}`}
              className="absolute text-xl pointer-events-none"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 2 + i * 0.4,
                ease: 'easeInOut',
              }}
            >
              {i % 2 === 0 ? '🌸' : '❤️'}
            </motion.div>
          ))}

          {/* Sanrio Retro Window Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="win98-window w-full max-w-md bg-[#FAF5E8]"
          >
            {/* Titlebar */}
            <div className="win98-titlebar">
              <div className="flex items-center gap-2">
                <span className="text-[#8B0000] text-xs">❤</span>
                <span className="text-[#2B2B2B] text-[10px] font-bold">Sanrio_Loading.exe</span>
              </div>
              <div className="flex gap-1">
                <button className="win98-title-btn">□</button>
                <button className="win98-title-btn">□</button>
                <button className="win98-close-btn">✕</button>
              </div>
            </div>

            {/* Window Content */}
            <div className="p-6 flex flex-col items-center text-center">
              {/* Hello Kitty & Kuromi Bouncing Header */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  <HelloKittyIcon className="w-16 h-16" />
                </motion.div>
                <span className="text-[#8B0000] text-xl font-bold">♥</span>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
                >
                  <KuromiIcon className="w-16 h-16" />
                </motion.div>
              </div>

              {/* Title */}
              <h1 className="text-base text-[#2B2B2B] font-bold tracking-wider mb-1">
                LoveOS v1.0
              </h1>
              <p className="text-[8px] text-[#8B0000] tracking-widest font-bold mb-4 uppercase">
                Sanrio Girlfriend Edition
              </p>

              {/* Text Box */}
              <div className="content-box w-full mb-6 min-h-[100px] flex flex-col items-start justify-center text-left">
                {BOOT_MESSAGES.slice(0, currentLine).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-[9px] font-bold leading-relaxed ${
                      i === BOOT_MESSAGES.length - 1 ? 'text-[#8B0000]' : 'text-[#2B2B2B]'
                    }`}
                  >
                    <span>✿ </span>
                    {msg}
                  </motion.div>
                ))}
              </div>

              {/* Sanrio Style Progress Bar */}
              <div className="w-full bg-white border-3 border-[#2B2B2B] h-6 rounded-sm overflow-hidden p-0.5 shadow-[3px_3px_0_#2B2B2B]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFB6C1] to-[#8CB4E6] rounded-xs"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              {/* Percent */}
              <div className="mt-2 text-[9px] text-[#2B2B2B] font-bold tracking-widest">
                {Math.round(progress)}% — {progress < 100 ? 'LOADING...' : 'READY ❤️'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
