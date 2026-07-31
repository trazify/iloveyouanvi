'use client';

import { motion } from 'framer-motion';

interface ForeverWindowProps {
  lovePercent: number;
  addLove: (n?: number) => void;
}

export default function ForeverWindow({ lovePercent, addLove }: ForeverWindowProps) {
  // Distance inversely proportional to love percent
  const gap = Math.max(0, 200 - (lovePercent / 100) * 200);
  const merged = lovePercent >= 95;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1a1030] to-[#0d0818] overflow-hidden"
      style={{ margin: '-0px', borderRadius: '0 0 4px 4px' }}
    >
      <div className="text-[8px] text-loveos-pink/60 mb-6 text-center tracking-wider">
        ✦ LONG DISTANCE ✦
      </div>

      <div className="relative flex items-center justify-center w-full" style={{ minHeight: '200px' }}>
        {/* Left Room */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ x: merged ? 0 : -gap / 2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="bg-[#2a1a3a] border-2 border-[#4a3a5a] rounded-sm p-4 w-[100px] h-[80px] flex flex-col items-center justify-center relative">
            {/* Window */}
            <div className="absolute top-1 right-1 w-4 h-4 bg-[#3a2a4a] border border-[#5a4a6a] flex items-center justify-center">
              <motion.div
                className="w-2 h-2 bg-yellow-200/60 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
            <span className="text-2xl">🛏️</span>
            <span className="text-[6px] text-loveos-pink/60 mt-1">Your Room</span>
          </div>
          <span className="text-[7px] text-loveos-pink/40 mt-2">Anvi</span>
        </motion.div>

        {/* Connecting Thread */}
        <div className="absolute flex items-center" style={{ width: `${gap + 40}px` }}>
          <motion.div
            className="h-0.5 w-full relative overflow-visible"
            style={{
              background: `linear-gradient(90deg, transparent, #FF6B81, transparent)`,
              opacity: merged ? 0 : 0.8,
            }}
          >
            {/* Hearts on thread */}
            {[0.2, 0.4, 0.6, 0.8].map((pos, i) => (
              <motion.span
                key={i}
                className="absolute text-xs"
                style={{ left: `${pos * 100}%`, top: '-6px' }}
                animate={{ y: [-2, 2, -2], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
              >
                ❤️
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right Room */}
        <motion.div
          className="flex flex-col items-center"
          animate={{ x: merged ? 0 : gap / 2 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="bg-[#2a1a3a] border-2 border-[#4a3a5a] rounded-sm p-4 w-[100px] h-[80px] flex flex-col items-center justify-center relative">
            <div className="absolute top-1 right-1 w-4 h-4 bg-[#3a2a4a] border border-[#5a4a6a] flex items-center justify-center">
              <motion.div
                className="w-2 h-2 bg-blue-200/60 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              />
            </div>
            <span className="text-2xl">🛏️</span>
            <span className="text-[6px] text-loveos-pink/60 mt-1">My Room</span>
          </div>
          <span className="text-[7px] text-loveos-pink/40 mt-2">Me</span>
        </motion.div>
      </div>

      {/* Status Text */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {merged ? (
          <>
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="font-[family-name:var(--font-hand)] text-xl text-loveos-accent"
            >
              No distance remains ❤️
            </motion.p>
            <p className="font-[family-name:var(--font-hand)] text-sm text-loveos-pink/60 mt-1">
              We&apos;re finally home.
            </p>
          </>
        ) : (
          <>
            <p className="font-[family-name:var(--font-hand)] text-lg text-loveos-pink/80">
              {Math.round(gap)} pixels apart...
            </p>
            <p className="text-[7px] text-loveos-pink/40 mt-1">
              Keep exploring to bring us closer ❤️
            </p>
          </>
        )}
      </motion.div>

      {/* Love meter indicator */}
      <div className="mt-4 w-48 bg-[#2a1a3a] border border-[#4a3a5a] h-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-loveos-accent to-loveos-pink rounded-full"
          animate={{ width: `${lovePercent}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-[7px] text-loveos-pink/40 mt-1">
        Love: {lovePercent}%
      </div>
    </div>
  );
}
