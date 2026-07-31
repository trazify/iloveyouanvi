'use client';

import { motion } from 'framer-motion';

interface LoveMeterProps {
  percent: number;
}

export default function LoveMeter({ percent }: LoveMeterProps) {
  return (
    <motion.div
      className="fixed top-20 right-4 z-[999] flex flex-col items-center gap-1"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <div className="text-[7px] text-loveos-accent tracking-wider">LOVE</div>

      {/* Vertical meter bar */}
      <div className="relative w-5 h-32 bg-loveos-beige border-2 border-loveos-dark/40 rounded-full overflow-hidden"
        style={{ boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.1)' }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-loveos-accent to-loveos-pink rounded-full"
          animate={{ height: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Heart icon */}
      <motion.div
        className="text-xl"
        animate={percent >= 100 ? {
          scale: [1, 1.3, 1],
        } : {
          scale: [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: percent >= 100 ? 0.5 : 1.5 }}
      >
        {percent >= 100 ? '💖' : percent >= 50 ? '❤️' : '🤍'}
      </motion.div>

      <div className="text-[7px] text-loveos-dark">
        {percent}%
      </div>
    </motion.div>
  );
}
