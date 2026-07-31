'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelloKittyIcon,
  KuromiIcon,
  WhiteRoseSVG,
  PinkTulipSVG,
  OrchidSVG,
  SakuraSVG,
} from '@/components/ui/SanrioIcons';

interface FlowersWindowProps {
  addLove: (n?: number) => void;
}

interface FlowerNote {
  id: string;
  name: string;
  meaning: string;
  note: string;
  bgClass: string;
}

const FLOWERS_DATA: FlowerNote[] = [
  {
    id: 'white-rose',
    name: 'White Rose',
    meaning: 'You are my peace',
    note: 'You bring a quiet calm and peace to my life that no one else ever could. Whenever the world gets noisy, you are my safe place, Anvi. ❤️',
    bgClass: 'bg-white',
  },
  {
    id: 'pink-tulip',
    name: 'Pink Tulip',
    meaning: 'Happiness & sweet smiles',
    note: 'Your sweet smile and laugh make even my hardest days feel bright. Being around you feels like pure sunshine and happiness. 🌷',
    bgClass: 'bg-[#FFE5EC]',
  },
  {
    id: 'orchid',
    name: 'Orchid',
    meaning: "You're rare & irreplaceable",
    note: 'You are so uniquely rare and special, Anvi. There is no one else in the world like you, and I am so grateful to have you in my life. 💜',
    bgClass: 'bg-[#F3E8FF]',
  },
  {
    id: 'sakura',
    name: 'Sakura',
    meaning: 'Precious moments',
    note: 'Every single moment I spend yapping, playing games, or on late night calls with you is a memory I treasure forever. 🌸',
    bgClass: 'bg-[#FFF0F5]',
  },
];

export default function FlowersWindow({ addLove }: FlowersWindowProps) {
  const [selectedFlower, setSelectedFlower] = useState<FlowerNote | null>(null);

  const openFlowerNote = (flower: FlowerNote) => {
    setSelectedFlower(flower);
    addLove(3);
    // Bloom chime sound
    try {
      const ctx = new AudioContext();
      [523, 659, 784, 1046].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.3);
      });
    } catch {}
  };

  return (
    <div className="w-full flex flex-col items-center p-2 select-none">
      {/* Sanrio Garden Header */}
      <div className="flex items-center gap-3 mb-3">
        <HelloKittyIcon className="w-12 h-12" />
        <div className="text-center">
          <h3 className="text-lg text-[#8B0000] font-bold font-[family-name:var(--font-hand)]">
            Sanrio Flower Garden 💐
          </h3>
          <p className="text-[8px] text-[#2B2B2B] font-bold tracking-wider">
            Click a flower to open its love note, Anvi ❤️
          </p>
        </div>
        <KuromiIcon className="w-12 h-12" />
      </div>

      {/* Flower Grid */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-3">
        {FLOWERS_DATA.map((flower) => (
          <motion.button
            key={flower.id}
            onClick={() => openFlowerNote(flower)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className={`p-3 border-2 border-[#2B2B2B] rounded-sm text-center flex flex-col items-center justify-between shadow-[3px_3px_0_#2B2B2B] ${flower.bgClass}`}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="mb-1"
            >
              {flower.id === 'white-rose' && <WhiteRoseSVG className="w-14 h-14" />}
              {flower.id === 'pink-tulip' && <PinkTulipSVG className="w-14 h-14" />}
              {flower.id === 'orchid' && <OrchidSVG className="w-14 h-14" />}
              {flower.id === 'sakura' && <SakuraSVG className="w-14 h-14" />}
            </motion.div>
            <div className="text-xs text-[#2B2B2B] font-bold mb-1">{flower.name}</div>
            <div className="font-[family-name:var(--font-hand)] text-xs text-[#8B0000] font-bold leading-tight">
              &ldquo;{flower.meaning}&rdquo;
            </div>
            <div className="mt-1 text-[8px] text-[#8B0000] underline font-bold">
              Read Note 💌
            </div>
          </motion.button>
        ))}
      </div>

      {/* Loving Note Popup Modal */}
      <AnimatePresence>
        {selectedFlower && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#00000055] z-[3000] flex items-center justify-center p-4"
            onClick={() => setSelectedFlower(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="win98-window bg-[#FAF5E8] max-w-sm w-full p-4 border-3 border-[#2B2B2B] shadow-[6px_6px_0_#2B2B2B]"
            >
              <div className="win98-titlebar mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#8B0000] text-xs">❤</span>
                  <span className="text-[#2B2B2B] text-[10px] font-bold">{selectedFlower.name}_note.exe</span>
                </div>
                <button
                  className="win98-close-btn"
                  onClick={() => setSelectedFlower(null)}
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col items-center text-center p-2">
                <div className="mb-2">
                  {selectedFlower.id === 'white-rose' && <WhiteRoseSVG className="w-16 h-16" />}
                  {selectedFlower.id === 'pink-tulip' && <PinkTulipSVG className="w-16 h-16" />}
                  {selectedFlower.id === 'orchid' && <OrchidSVG className="w-16 h-16" />}
                  {selectedFlower.id === 'sakura' && <SakuraSVG className="w-16 h-16" />}
                </div>

                <h4 className="text-lg text-[#8B0000] font-bold font-[family-name:var(--font-hand)] mb-1">
                  For Anvi ❤️
                </h4>

                <div className="content-box w-full mb-4 text-left">
                  <p className="font-[family-name:var(--font-hand)] text-base text-[#3D2B1F] leading-relaxed">
                    {selectedFlower.note}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedFlower(null)}
                  className="pixel-btn pixel-btn-red text-xs px-6 py-2"
                >
                  CLOSE NOTE ❤️
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[8px] text-[#8B0000] font-bold tracking-widest uppercase mt-1">
        ✿ Freshly picked for Anvi ✿
      </p>
    </div>
  );
}
