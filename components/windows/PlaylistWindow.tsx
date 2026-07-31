'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PlaylistWindowProps {
  addLove: (n?: number) => void;
  unlockAchievement: (id: string) => void;
}

const PLAYLIST = [
  { title: 'Our Song', artist: '❤️ Forever', emoji: '💿' },
  { title: 'Late Night Calls', artist: '🌙 Midnight', emoji: '🎵' },
  { title: 'Bhonduu Beats', artist: '🐱 Cute Mix', emoji: '🎶' },
  { title: 'Mwah', artist: '💋 Kiss FM', emoji: '💗' },
  { title: 'Scooter Engine', artist: '🛵 Laugh Track', emoji: '😂' },
];

export default function PlaylistWindow({ addLove, unlockAchievement }: PlaylistWindowProps) {
  const [playing, setPlaying] = useState<number | null>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) {
      setOpened(true);
      unlockAchievement('music');
      addLove(3);
    }
  }, []);

  const togglePlay = (idx: number) => {
    if (playing === idx) {
      setPlaying(null);
    } else {
      setPlaying(idx);
      // Play a little melody
      try {
        const ctx = new AudioContext();
        const melodies = [
          [523, 587, 659],
          [440, 494, 523],
          [392, 440, 494],
          [330, 392, 440],
          [294, 330, 392],
        ];
        const melody = melodies[idx % melodies.length];
        melody.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.2);
          gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.2 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.2);
          osc.stop(ctx.currentTime + i * 0.2 + 0.3);
        });
      } catch {}
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-[#2d1b2d] to-[#1a0a1a]">
      {/* Cassette Player Header */}
      <div className="p-4 flex flex-col items-center">
        {/* Cassette tape visual */}
        <div className="relative bg-[#3d2d3d] border-2 border-[#5d4d5d] rounded-lg p-4 w-full max-w-[280px]">
          <div className="text-[7px] text-loveos-pink text-center mb-2 tracking-wider">
            ♫ LOVE CASSETTE ♫
          </div>
          <div className="flex justify-center gap-6 mb-2">
            {/* Reels */}
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-loveos-pink/30 flex items-center justify-center bg-[#2a1a2a]"
              animate={playing !== null ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <div className="w-3 h-3 rounded-full bg-loveos-pink/40" />
            </motion.div>
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-loveos-pink/30 flex items-center justify-center bg-[#2a1a2a]"
              animate={playing !== null ? { rotate: 360 } : {}}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <div className="w-3 h-3 rounded-full bg-loveos-pink/40" />
            </motion.div>
          </div>
          {/* Equalizer bars */}
          <div className="flex justify-center gap-1 h-4">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-loveos-accent rounded-full"
                animate={playing !== null ? {
                  height: [4, 8 + Math.random() * 12, 4],
                } : { height: 2 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.4 + Math.random() * 0.3,
                  delay: Math.random() * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Now Playing */}
        {playing !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-center"
          >
            <div className="text-[8px] text-loveos-pink/60 tracking-wider">NOW PLAYING</div>
            <div className="text-[10px] text-loveos-pink mt-0.5">
              {PLAYLIST[playing].title} — {PLAYLIST[playing].artist}
            </div>
          </motion.div>
        )}
      </div>

      {/* Track List */}
      <div className="flex-1 overflow-auto px-3 pb-3">
        {PLAYLIST.map((track, idx) => (
          <button
            key={idx}
            onClick={() => togglePlay(idx)}
            className={`w-full flex items-center gap-3 px-3 py-2 mb-1 rounded-sm text-left transition-colors ${
              playing === idx
                ? 'bg-loveos-accent/20 border border-loveos-accent/30'
                : 'hover:bg-white/5 border border-transparent'
            }`}
          >
            <span className="text-lg">{track.emoji}</span>
            <div className="flex-1">
              <div className="text-[9px] text-loveos-pink">{track.title}</div>
              <div className="text-[7px] text-loveos-pink/50">{track.artist}</div>
            </div>
            <span className="text-[10px]">
              {playing === idx ? '⏸' : '▶'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
