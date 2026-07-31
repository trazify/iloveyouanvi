'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HELLO_MESSAGES } from '@/lib/constants';
import { HelloKittyIcon, KuromiIcon } from '@/components/ui/SanrioIcons';

interface HelloWindowProps {
  onComplete: () => void;
}

export default function HelloWindow({ onComplete }: HelloWindowProps) {
  const [currentMsg, setCurrentMsg] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  // Typewriter effect
  useEffect(() => {
    if (currentMsg >= HELLO_MESSAGES.length) {
      setShowButtons(true);
      return;
    }

    const message = HELLO_MESSAGES[currentMsg];
    let charIdx = 0;
    setDisplayText('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIdx < message.length) {
        setDisplayText(message.slice(0, charIdx + 1));
        charIdx++;
        // Typing sound
        try {
          const ctx = new AudioContext();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(300 + Math.random() * 200, ctx.currentTime);
          gain.gain.setValueAtTime(0.015, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.03);
        } catch {}
      } else {
        setIsTyping(false);
        clearInterval(interval);
        // Auto-advance after pause
        setTimeout(() => {
          setCurrentMsg(prev => prev + 1);
        }, 1200);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [currentMsg]);

  const moveNoButton = useCallback(() => {
    setNoPos({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 100,
    });
  }, []);

  return (
    <div className="p-6 flex flex-col items-center text-center h-full">
      {/* Hello Kitty & Kuromi */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-3"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <HelloKittyIcon className="w-16 h-16 drop-shadow-md" />
        <span className="text-loveos-accent text-xl">♥</span>
        <KuromiIcon className="w-16 h-16 drop-shadow-md" />
      </motion.div>

      {/* Message Display */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[120px]">
        <AnimatePresence mode="wait">
          {currentMsg < HELLO_MESSAGES.length && (
            <motion.p
              key={currentMsg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-loveos-dark leading-relaxed max-w-[320px] font-[family-name:var(--font-hand)] text-xl"
            >
              {displayText}
              {isTyping && <span className="animate-pulse text-loveos-accent">|</span>}
            </motion.p>
          )}
        </AnimatePresence>

        {currentMsg >= HELLO_MESSAGES.length && !showButtons && (
          <div className="text-loveos-accent text-sm">❤️</div>
        )}
      </div>

      {/* YES / NO buttons */}
      {showButtons && (
        <motion.div
          className="flex items-center gap-4 mt-4 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={onComplete}
            className="pixel-btn bg-loveos-accent text-white text-[9px] px-6 py-2 hover:bg-loveos-red transition-colors"
          >
            YES ❤️
          </button>

          <motion.button
            className="pixel-btn bg-[#A0B8D8] text-loveos-dark text-[9px] px-6 py-2"
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: 'spring', damping: 10, stiffness: 200 }}
            onMouseEnter={moveNoButton}
            onTouchStart={moveNoButton}
          >
            NO
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
