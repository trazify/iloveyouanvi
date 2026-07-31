'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

interface WindowProps {
  id: string;
  title: string;
  zIndex: number;
  width: number;
  height: number;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

export default function Window({
  id, title, zIndex, width, height, onClose, onFocus, children,
}: WindowProps) {
  const [position, setPosition] = useState(() => {
    // Center with slight random offset
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 768;
    return {
      x: Math.max(40, (vw - width) / 2 + (Math.random() - 0.5) * 100),
      y: Math.max(20, (vh - height) / 2 + (Math.random() - 0.5) * 60 - 40),
    };
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onFocus();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position, onFocus]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: Math.max(0, e.clientX - dragOffset.current.x),
        y: Math.max(0, e.clientY - dragOffset.current.y),
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Touch support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    onFocus();
    setIsDragging(true);
    const touch = e.touches[0];
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  }, [position, onFocus]);

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, touch.clientX - dragOffset.current.x),
        y: Math.max(0, touch.clientY - dragOffset.current.y),
      });
    };

    const handleTouchEnd = () => setIsDragging(false);

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={windowRef}
      className="fixed win98-window bg-loveos-cream"
      style={{
        left: position.x,
        top: position.y,
        width: Math.min(width, typeof window !== 'undefined' ? window.innerWidth - 20 : width),
        height: Math.min(height, typeof window !== 'undefined' ? window.innerHeight - 80 : height),
        zIndex,
      }}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, duration: 0.3 }}
      onMouseDown={() => onFocus()}
    >
      {/* Title Bar */}
      <div
        className="win98-titlebar"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-loveos-red text-[10px]">❤</span>
          <span className="text-loveos-dark text-[8px] truncate select-none font-bold">
            {title}
          </span>
        </div>
        <div className="flex gap-[3px]">
          <button className="win98-title-btn" onClick={(e) => e.stopPropagation()}>
            <span style={{ fontSize: '6px' }}>▬</span>
          </button>
          <button className="win98-title-btn" onClick={(e) => e.stopPropagation()}>
            <span style={{ fontSize: '7px' }}>□</span>
          </button>
          <button
            className="win98-close-btn"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="overflow-auto" style={{ height: 'calc(100% - 28px)' }}>
        {children}
      </div>
    </motion.div>
  );
}
