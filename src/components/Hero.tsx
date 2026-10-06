import React, { useEffect, useRef } from 'react';
import { ArrowDown, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const onResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);

    // Subtle drifting nodes
    const nodeCount = Math.min(45, Math.floor(width / 25));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Dynamic Background Network */}
      <canvas ref={bgCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-start">
            
            {/* Status Live Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-6 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Greeting & Name */}
            <div className="space-y-1 mb-4">
              <span className="text-sm sm:text-base font-mono text-cyan-400/90 tracking-wide">
                {t.hero.greeting}
              </span>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {t.hero.name}
                </span>
              </h1>
            </div>

            {/* Professional Headline */}
            <h2 className="text-lg sm:text-2xl font-semibold text-slate-200 mb-4 max-w-2xl leading-snug">
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {t.hero.title}
              </span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl mb-8 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.hero.ctaProjects}</span>
                <ArrowDown className={`w-4 h-4 ${isRtl ? 'rotate-90' : ''}`} />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-medium text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <span>{t.hero.ctaContact}</span>
              </button>

              <a
                href="https://vercel.com/muhammadshoaibkhan607-png"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full sm:w-auto px-5 py-3 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-transparent hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.hero.ctaVercel}</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

            {/* Proof Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10 w-full max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {t.hero.stats.projects}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.stats.projectsLabel}
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {t.hero.stats.experience}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.stats.experienceLabel}
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {t.hero.stats.technologies}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.stats.technologiesLabel}
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  {t.hero.stats.satisfaction}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {t.hero.stats.satisfactionLabel}
                </p>
              </div>
            </div>

          </div>

          {/* Profile & Holographic Visual Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl p-3 bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-transparent border border-white/10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl group">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-indigo-500/20 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              {/* Portrait Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10">
                <img
                  src="/ali.png"
                  alt="Ali Murtaza - Full Stack & AI Developer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback if image fails to render
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/30 to-transparent" />

                {/* Floating Technical Badge Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-medium text-cyan-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Production Ready</span>
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Next.js & AI
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {t.hero.title}
                  </div>
                </div>

                {/* Subtle Corner Markers */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
