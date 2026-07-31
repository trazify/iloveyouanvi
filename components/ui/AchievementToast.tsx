'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Achievement } from '@/types';

interface AchievementToastProps {
  achievement: Achievement | null;
}

export default function AchievementToast({ achievement }: AchievementToastProps) {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          className="fixed top-4 left-1/2 z-[9999] -translate-x-1/2"
          initial={{ y: -80, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -80, opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <div className="pixel-btn bg-loveos-pink flex items-center gap-3 px-4 py-3 min-w-[240px]"
            style={{
              boxShadow: '0 4px 20px rgba(255, 107, 129, 0.4), inset -2px -2px 0 #00000022, inset 2px 2px 0 #ffffff55',
            }}
          >
            <motion.span
              className="text-2xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {achievement.icon}
            </motion.span>
            <div>
              <div className="text-[7px] text-loveos-accent tracking-wider">
                ⭐ ACHIEVEMENT UNLOCKED!
              </div>
              <div className="text-[9px] text-loveos-dark font-bold">
                {achievement.title}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
