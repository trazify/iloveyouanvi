'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HelloKittyIcon, KuromiIcon } from './SanrioIcons';

/* eslint-disable @next/next/no-img-element */

interface ThemeLetterNoteProps {
  onBack?: () => void;
}

const PARAGRAPHS = [
  "I'm not great at saying this stuff out loud, so I made you a page instead — a song, our memories, and a few things I actually mean.",
  "Thank you for picking up the phone every single late night, for the advice I didn't ask for and definitely needed, and for never once making me explain myself twice. You've seen every version of me and stayed for all of them.",
  "I hope today is a good one, and I hope you know that whatever happens next, you've got a person in your corner permanently.",
];

export default function ThemeLetterNote({ onBack }: ThemeLetterNoteProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Animate lines appearing one by one
  useEffect(() => {
    // Small delay for the envelope "opening" feel
    const startTimer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (visibleLines >= PARAGRAPHS.length + 2) return; // +2 for salutation & signature
    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, 600);
    return () => clearTimeout(timer);
  }, [loaded, visibleLines]);

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 select-none">

      {/* Top Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#E2F0D9] text-[#2D5A27] border-2 border-dashed border-[#5A9E52] rounded-full px-4 py-1 text-[9px] font-bold tracking-wider mb-3 shadow-sm flex items-center gap-1.5"
      >
        <span>✿</span>
        <span>one last thing</span>
        <span>✿</span>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl md:text-2xl text-[#2B2B2B] font-bold tracking-tight mb-4 text-center"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        A Note For You
      </motion.h3>

      {/* ── White Paper with Pink Lines ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={loaded ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative bg-white border-2 border-[#D6CBB8] max-w-lg w-full rounded-sm my-2 text-left overflow-hidden"
        style={{
          boxShadow: '8px 8px 0 #2B2B2B',
        }}
      >
        {/* Pink ruled lines background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #FFD6E0 31px, #FFD6E0 32px)',
            backgroundPosition: '0 50px',
          }}
        />

        {/* Left red margin line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#FF9999] opacity-60 pointer-events-none"
          style={{ left: '42px' }}
        />

        {/* Notebook binder holes */}
        <div className="absolute left-2.5 top-10 bottom-10 flex flex-col justify-between pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#F0E8DC] border-2 border-[#D6CBB8]" />
          ))}
        </div>

        {/* Top washi tape left */}
        <div
          className="absolute -top-2 left-12 w-20 h-5 bg-[#FFB366] opacity-80 z-10 rounded-sm"
          style={{ transform: 'rotate(-3deg)' }}
        />
        {/* Top washi tape right */}
        <div
          className="absolute -top-2 right-10 w-20 h-5 bg-[#A8E6CF] opacity-80 z-10 rounded-sm"
          style={{ transform: 'rotate(4deg)' }}
        />

        {/* Hello Kitty sticker top-right corner */}
        <div className="absolute -top-5 -right-4 z-20">
          <HelloKittyIcon className="w-16 h-16 drop-shadow-md" />
        </div>

        {/* Kuromi sticker bottom-left corner */}
        <div className="absolute -bottom-5 -left-4 z-20">
          <KuromiIcon className="w-16 h-16 drop-shadow-md" />
        </div>

        {/* ── Paper Content ── */}
        <div className="relative z-[5] pl-14 pr-6 pt-10 pb-8">

          {/* Salutation */}
          {visibleLines >= 1 && (
            <motion.h4
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl text-[#2B2B2B] font-bold mb-5"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Hey Anvi,
            </motion.h4>
          )}

          {/* Paragraphs */}
          {PARAGRAPHS.map((para, i) => (
            visibleLines >= i + 2 && (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-lg md:text-xl text-[#3D2B1F] mb-4"
                style={{
                  fontFamily: "'Caveat', cursive",
                  lineHeight: '32px',
                }}
              >
                {para}
              </motion.p>
            )
          ))}

          {/* Signature */}
          {visibleLines >= PARAGRAPHS.length + 2 && (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl text-[#8B0000] font-bold pt-3"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              That&apos;s me. I&apos;m the person. ❤️
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* BACK Button */}
      {onBack && visibleLines >= PARAGRAPHS.length + 2 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onBack}
          className="pixel-btn pixel-btn-red text-xs px-8 py-2.5 mt-6"
        >
          BACK
        </motion.button>
      )}
    </div>
  );
}
