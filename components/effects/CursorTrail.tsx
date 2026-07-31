'use client';

import { useRef, useEffect } from 'react';

interface Sparkle {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  vx: number;
  vy: number;
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkles = useRef<Sparkle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Add sparkle
      if (Math.random() > 0.6) {
        sparkles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 10,
          y: e.clientY + (Math.random() - 0.5) * 10,
          life: 0,
          maxLife: 20 + Math.random() * 15,
          size: 2 + Math.random() * 3,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1 - 0.5,
        });
      }
    };
    window.addEventListener('mousemove', handleMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparkles.current = sparkles.current.filter(s => s.life < s.maxLife);

      sparkles.current.forEach(s => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;

        const progress = s.life / s.maxLife;
        const alpha = 1 - progress;
        const size = s.size * (1 - progress * 0.5);

        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle = Math.random() > 0.5 ? '#FF6B81' : '#f7d070';

        // Draw 4-point star
        ctx.beginPath();
        const cx = s.x, cy = s.y;
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size * 0.3, cy);
        ctx.lineTo(cx, cy + size);
        ctx.lineTo(cx - size * 0.3, cy);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(cx - size, cy);
        ctx.lineTo(cx, cy + size * 0.3);
        ctx.lineTo(cx + size, cy);
        ctx.lineTo(cx, cy - size * 0.3);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9990]"
    />
  );
}
