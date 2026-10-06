import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CinematicIntroProps {
  onComplete: () => void;
  isExiting: boolean;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete, isExiting }) => {
  const { t, isRtl } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'stars' | 'brand' | 'reveal' | 'ready'>('stars');
  const [progress, setProgress] = useState(0);

  // Canvas particle galaxy animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool with 3D depth simulation
    const count = Math.min(180, Math.floor(width / 8));
    const particles = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 800 + 100, // depth
      size: Math.random() * 2 + 0.8,
      color: Math.random() > 0.4 ? '#06b6d4' : Math.random() > 0.5 ? '#8b5cf6' : '#38bdf8',
      speed: Math.random() * 1.5 + 0.8,
    }));

    let cameraZ = 0;
    const render = () => {
      ctx.fillStyle = 'rgba(5, 7, 15, 0.25)';
      ctx.fillRect(0, 0, width, height);

      cameraZ += 0.8;
      const fov = 400;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let relZ = p.z - (cameraZ * p.speed) % 800;
        if (relZ <= 10) relZ += 800;

        const scale = fov / (fov + relZ);
        const screenX = width / 2 + p.x * scale;
        const screenY = height / 2 + p.y * scale;

        if (screenX >= -20 && screenX <= width + 20 && screenY >= -20 && screenY <= height + 20) {
          const alpha = Math.min(1, Math.max(0.1, (1 - relZ / 800) * 1.2));
          ctx.beginPath();
          ctx.arc(screenX, screenY, Math.max(0.8, p.size * scale * 1.8), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = p.size > 1.5 ? 12 : 4;
          ctx.shadowColor = p.color;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Sequence progression
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('brand'), 700);
    const t2 = setTimeout(() => setPhase('reveal'), 1800);
    const t3 = setTimeout(() => setPhase('ready'), 3000);

    // Progress counter
    const start = Date.now();
    const duration = 4000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        // Automatically initiate transition into hero at completion
        setTimeout(onComplete, 400);
      }
    }, 40);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: isExiting ? 0 : 1,
        scale: isExiting ? 1.08 : 1,
        filter: isExiting ? 'blur(12px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#05070f] overflow-hidden select-none"
    >
      {/* 3D Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Atmospheric Radial Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.12)_0%,rgba(139,92,246,0.06)_40%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Center Cinematic Container */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl px-6 text-center">
        {/* Glowing Geometric Brand Monogram */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotateX: 30 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Concentric rotating rings */}
          <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20 animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-44 h-44 rounded-full border border-dashed border-purple-500/20 animate-[spin_35s_linear_infinite_reverse]" />
          <div className="absolute w-52 h-52 rounded-full border border-cyan-400/10 animate-[spin_50s_linear_infinite]" />

          {/* Monogram Hexagon Badge */}
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-950/90 p-[1px] shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
            <div className="w-full h-full rounded-2xl bg-[#070b18]/80 flex items-center justify-center border border-cyan-500/30">
              <span className="text-3xl font-black tracking-widest bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent font-sans">
                AM
              </span>
            </div>
            {/* Ambient lens flare spot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full blur-[2px] animate-pulse" />
          </div>
        </motion.div>

        {/* Micro Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase !== 'stars' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-8 h-[1px] bg-cyan-500/50" />
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-cyan-400/90 font-medium">
            {t.intro.tag}
          </span>
          <span className="w-8 h-[1px] bg-cyan-500/50" />
        </motion.div>

        {/* Name Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase === 'reveal' || phase === 'ready' ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3"
        >
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            {t.intro.title}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === 'reveal' || phase === 'ready' ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 font-light max-w-md mx-auto mb-8"
        >
          {t.intro.subtitle}
        </motion.p>

        {/* Progress & Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xs flex flex-col items-center gap-3"
        >
          <div className="w-full h-1 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex items-center justify-between w-full text-xs font-mono text-slate-500">
            <span>{t.intro.status}</span>
            <span className="text-cyan-400 font-semibold">{progress}%</span>
          </div>
        </motion.div>

        {/* Interactive Action Buttons */}
        <div className="mt-8 flex items-center gap-4">
          <button
            onClick={onComplete}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 hover:border-cyan-500/40 backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg hover:shadow-cyan-500/10"
          >
            <span>{t.intro.skip}</span>
            <ArrowRight className={`w-3.5 h-3.5 text-cyan-400 ${isRtl ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Cinematic subtle bottom flare */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05070f] to-transparent pointer-events-none" />
    </motion.div>
  );
};
