'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MEMORIES } from '@/lib/constants';

interface MemoriesWindowProps {
  addLove: (n?: number) => void;
}

export default function MemoriesWindow({ addLove }: MemoriesWindowProps) {
  const [viewedMemories, setViewedMemories] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const viewMemory = (id: number) => {
    if (!viewedMemories.has(id)) {
      const updated = new Set(viewedMemories);
      updated.add(id);
      setViewedMemories(updated);
      addLove(2);
    }
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="p-4 h-full overflow-auto">
      <div className="grid grid-cols-2 gap-3">
        {MEMORIES.map((memory, idx) => (
          <motion.button
            key={memory.id}
            initial={{ opacity: 0, rotate: idx % 2 === 0 ? -3 : 3 }}
            animate={{ opacity: 1, rotate: idx % 2 === 0 ? -3 : 3 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => viewMemory(memory.id)}
            className="bg-white p-2 shadow-md border border-loveos-beige/50"
            style={{ boxShadow: '3px 3px 8px rgba(0,0,0,0.15)' }}
          >
            {/* Tape */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-yellow-100/80 border border-yellow-200/50 z-10" 
              style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
            />
            
            {/* Photo area */}
            <div
              className="w-full aspect-square rounded-sm flex items-center justify-center mb-2 overflow-hidden relative border border-[#2B2B2B]"
              style={{ backgroundColor: memory.bgColor }}
            >
              {memory.photoUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={memory.photoUrl}
                  alt={memory.caption}
                  className="w-full h-full object-cover rounded-xs hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <motion.span
                  className="text-4xl"
                  animate={expanded === memory.id ? { scale: [1, 1.3, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  {memory.icon}
                </motion.span>
              )}
            </div>

            {/* Caption */}
            <p className="font-[family-name:var(--font-hand)] text-base text-[#2B2B2B] font-bold text-center leading-tight">
              {memory.caption}
            </p>
            <p className="text-[8px] text-[#8B0000] font-bold mt-1 text-center">{memory.date}</p>
          </motion.button>
        ))}
      </div>

      <div className="text-center mt-4 text-[7px] text-loveos-muted">
        {viewedMemories.size}/{MEMORIES.length} memories explored
      </div>
    </div>
  );
}
