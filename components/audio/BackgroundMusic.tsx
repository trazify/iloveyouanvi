'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BackgroundMusicProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  // Play audio on first user click if allowed by browser autoplay policy
  useEffect(() => {
    const handleFirstClick = () => {
      setIsPlaying(true);
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, []);

  const toggleMusic = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <>
      {/* Hidden YouTube Iframe Player for LflrE0AZ7ns */}
      <div className="hidden pointer-events-none opacity-0 w-0 h-0 overflow-hidden">
        {isPlaying && (
          <iframe
            ref={playerRef}
            width="10"
            height="10"
            src={`https://www.youtube-nocookie.com/embed/LflrE0AZ7ns?autoplay=1&loop=1&playlist=LflrE0AZ7ns&enablejsapi=1&controls=0&modestbranding=1`}
            title="Background Music"
            allow="autoplay; encrypted-media"
          />
        )}
      </div>

      {/* Floating Sanrio Music Controller */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleMusic}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-12 right-4 z-[9999] pixel-btn bg-[#FFF0F5] border-2 border-[#2B2B2B] px-3 py-1.5 rounded-full flex items-center gap-2 shadow-[3px_3px_0_#2B2B2B]"
      >
        <motion.span
          animate={isPlaying ? { rotate: [0, 15, -15, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-sm"
        >
          🎵
        </motion.span>
        <span className="text-[9px] text-[#8B0000] font-bold tracking-wider">
          {isPlaying ? 'Music: ON 🎶' : 'Music: OFF 🔇'}
        </span>
      </motion.button>
    </>
  );
}
