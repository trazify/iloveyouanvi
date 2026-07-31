'use client';

import { motion } from 'framer-motion';
import type { Achievement } from '@/types';

interface AchievementsWindowProps {
  achievements: Achievement[];
}

export default function AchievementsWindow({ achievements }: AchievementsWindowProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-[8px] text-loveos-muted text-center mb-2">
        ⭐ {unlockedCount}/{achievements.length} Achievements Unlocked
      </div>

      {/* Progress bar */}
      <div className="bg-loveos-beige border-2 border-loveos-win-border h-3 rounded-sm mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-loveos-accent to-loveos-pink"
          initial={{ width: 0 }}
          animate={{ width: `${(unlockedCount / achievements.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="flex-1 overflow-auto grid grid-cols-2 gap-2">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className={`pixel-btn p-3 flex flex-col items-center text-center gap-1 ${
              achievement.unlocked
                ? 'bg-loveos-pink/30 border-loveos-accent'
                : 'bg-loveos-beige/50 opacity-60'
            }`}
          >
            <motion.span
              className="text-2xl"
              animate={achievement.unlocked ? {
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
            >
              {achievement.unlocked ? achievement.icon : '🔒'}
            </motion.span>
            <span className="text-[7px] text-loveos-dark font-bold leading-tight">
              {achievement.unlocked ? achievement.title : '???'}
            </span>
            <span className="text-[6px] text-loveos-muted leading-tight">
              {achievement.description}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
