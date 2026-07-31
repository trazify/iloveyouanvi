'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelloKittyIcon, KuromiIcon } from '@/components/ui/SanrioIcons';

interface KittyCompanionProps {
  onClick: () => void;
  clickCount: number;
}

const KITTY_PHRASES = [
  'Mwah! 💋',
  '❤️',
  'Purrrr~',
  'I love you!',
  'Meow!',
  'Bhonduu~ 🐱',
  '*nuzzle*',
  '🌸',
];

export default function KittyCompanion({ onClick, clickCount }: KittyCompanionProps) {
  const [position, setPosition] = useState(50);
  const [direction, setDirection] = useState(1);
  const [state, setState] = useState<'idle' | 'walk' | 'sleep'>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  // Kitty wanders
  useEffect(() => {
    const wander = setInterval(() => {
      if (Math.random() > 0.6) {
        setState('walk');
        const newDir = Math.random() > 0.5 ? 1 : -1;
        setDirection(newDir);
        setPosition(prev => {
          const next = prev + newDir * (20 + Math.random() * 40);
          return Math.max(5, Math.min(90, next));
        });
        setTimeout(() => setState('idle'), 2000);
      } else if (Math.random() > 0.8) {
        setState('sleep');
        setTimeout(() => setState('idle'), 4000);
      }
    }, 5000);
    return () => clearInterval(wander);
  }, []);

  const handleClick = () => {
    onClick();
    const phrase = KITTY_PHRASES[clickCount % KITTY_PHRASES.length];
    setBubbleText(phrase);
    setShowBubble(true);
    setTimeout(() => setShowBubble(false), 2000);

    // Spawn heart particles
    setHearts(prev => [...prev, { id: Date.now(), x: position }]);
    setTimeout(() => {
      setHearts(prev => prev.slice(1));
    }, 1500);

    // Meow sound
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
  };

  return (
    <div className="fixed bottom-10 left-0 right-0 z-[998] pointer-events-none">
      {/* Heart particles */}
      <AnimatePresence>
        {hearts.map(h => (
          <motion.div
            key={h.id}
            className="absolute text-xl"
            style={{ left: `${h.x}%`, bottom: '40px' }}
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -60 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            className="absolute font-[family-name:var(--font-hand)] text-lg text-loveos-accent bg-white border-2 border-loveos-pink px-3 py-1 rounded-lg shadow-md"
            style={{ left: `${position}%`, bottom: '50px', transform: 'translateX(-50%)' }}
          >
            {bubbleText}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-loveos-pink rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kitty */}
      <motion.button
        className="absolute pointer-events-auto cursor-pointer select-none"
        style={{ left: `${position}%`, transform: `translateX(-50%) scaleX(${direction})` }}
        animate={{
          y: state === 'idle' ? [0, -3, 0] : state === 'sleep' ? [0, -1, 0] : [0, -2, 0, -2, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: state === 'walk' ? 0.4 : 2,
          ease: 'easeInOut',
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-12 h-12 relative flex items-center justify-center">
          {clickCount % 2 === 0 ? (
            <HelloKittyIcon className="w-12 h-12 drop-shadow" />
          ) : (
            <KuromiIcon className="w-12 h-12 drop-shadow" />
          )}
        </div>
        {state === 'sleep' && (
          <motion.span
            className="absolute -top-2 -right-1 text-xs"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            💤
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
