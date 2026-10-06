import React, { useState, useEffect, useRef } from 'react';
import {
  Atom,
  Layers,
  Code2,
  Palette,
  Sparkles,
  Terminal,
  FileCode2,
  Server,
  CloudLightning,
  GitBranch,
  Compass,
  Layout,
  Play,
  Pause,
  Zap,
  Info,
} from 'lucide-react';
import { skillsData } from '../data/skillsData';
import { Skill } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const SkillsOrbit: React.FC = () => {
  const { lang, t, isRtl } = useLanguage();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skillsData[0]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1 = normal, 2 = fast, 0 = paused
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [orbitAngle, setOrbitAngle] = useState(0);

  // Icon mapping
  const getIcon = (name: string, className = 'w-5 h-5') => {
    switch (name) {
      case 'Atom':
        return <Atom className={className} />;
      case 'Layers':
        return <Layers className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'FileCode2':
        return <FileCode2 className={className} />;
      case 'Server':
        return <Server className={className} />;
      case 'CloudLightning':
        return <CloudLightning className={className} />;
      case 'GitBranch':
        return <GitBranch className={className} />;
      case 'Compass':
        return <Compass className={className} />;
      case 'Layout':
        return <Layout className={className} />;
      default:
        return <Code2 className={className} />;
    }
  };

  // Continuous orbital rotation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (speedMultiplier > 0) {
        setOrbitAngle((prev) => (prev + delta * 12 * speedMultiplier) % 360);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [speedMultiplier]);

  const activeDisplay = hoveredSkill || selectedSkill || skillsData[0];

  const filteredSkills = skillsData.filter((skill) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'frontend') return skill.category === 'Frontend';
    if (activeCategory === 'backend') return skill.category === 'Backend & AI';
    if (activeCategory === 'tools') return skill.category === 'Tools & Workflows';
    return true;
  });

  return (
    <section id="skills" className="relative py-24 bg-[#05070f] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
            {t.skills.kicker}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.skills.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Controls Bar: Category Filter + Orbit Speed Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 bg-slate-900/50 p-2 sm:p-2.5 rounded-2xl border border-white/5 backdrop-blur-md max-w-4xl mx-auto">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.skills.filterAll}
            </button>
            <button
              onClick={() => setActiveCategory('frontend')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'frontend'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.skills.filterFrontend}
            </button>
            <button
              onClick={() => setActiveCategory('backend')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'backend'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.skills.filterBackend}
            </button>
            <button
              onClick={() => setActiveCategory('tools')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === 'tools'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.skills.filterTools}
            </button>
          </div>

          {/* Speed / Orbit Toggles */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="hidden md:inline">{t.skills.orbitSpeed}:</span>
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-white/5">
              <button
                onClick={() => setSpeedMultiplier(0)}
                title="Pause Orbit"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  speedMultiplier === 0 ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Pause className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setSpeedMultiplier(1)}
                title="Normal Speed"
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  speedMultiplier === 1 ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setSpeedMultiplier(2)}
                title="2x Fast Speed"
                className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                  speedMultiplier === 2 ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400 hover:text-white'
                }`}
              >
                2x
              </button>
            </div>
          </div>

        </div>

        {/* Orbit Visualization Stage */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Circular Orbit Canvas Container */}
          <div className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] lg:w-[680px] lg:h-[680px] flex items-center justify-center my-4">
            
            {/* Concentric Orbital Tracks */}
            {/* Ring 1 - Core Frontend */}
            <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-full border border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.05)] pointer-events-none" />
            
            {/* Ring 2 - Modern Stack & Backend */}
            <div className="absolute w-[260px] h-[260px] sm:w-[410px] sm:h-[410px] lg:w-[520px] lg:h-[520px] rounded-full border border-dashed border-purple-500/20 pointer-events-none" />
            
            {/* Ring 3 - Tools & Cloud */}
            <div className="absolute w-[320px] h-[320px] sm:w-[510px] sm:h-[510px] lg:w-[650px] lg:h-[650px] rounded-full border border-cyan-400/10 pointer-events-none" />

            {/* Pulsing Core Radar Center Ring */}
            <div className="absolute w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-cyan-500/30 animate-ping opacity-20 pointer-events-none" />

            {/* Orbiting Skill Nodes */}
            {filteredSkills.map((skill) => {
              // Calculate responsive radius based on ring
              let baseRadius = 190;
              if (skill.orbitRing === 1) baseRadius = 110;
              if (skill.orbitRing === 2) baseRadius = 155;
              if (skill.orbitRing === 3) baseRadius = 195;

              // Scale for mobile viewports
              const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
              const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640;
              const multiplier = isDesktop ? 1.6 : isTablet ? 1.25 : 0.78;
              const currentRadius = baseRadius * multiplier;

              // Angle calculation with individual speed variation
              const currentAngle = (skill.initialAngle + orbitAngle * (40 / skill.orbitSpeed)) % 360;
              const rad = (currentAngle * Math.PI) / 180;
              const x = Math.cos(rad) * currentRadius;
              const y = Math.sin(rad) * currentRadius;

              const isSelected = activeDisplay?.id === skill.id;

              return (
                <div
                  key={skill.id}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    transition: speedMultiplier === 0 ? 'transform 0.2s ease-out' : 'none',
                  }}
                  className="absolute z-20"
                >
                  <button
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    aria-label={`Inspect ${skill.name}`}
                    className={`group relative flex items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'scale-125 z-30 shadow-xl'
                        : 'hover:scale-115 hover:z-30'
                    }`}
                  >
                    {/* Node Visual Capsule */}
                    <div
                      className={`p-2.5 sm:p-3 rounded-xl backdrop-blur-xl border transition-all duration-300 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/30'
                          : 'bg-slate-950/85 border-white/10 hover:border-cyan-500/40'
                      }`}
                      style={{
                        borderColor: isSelected ? skill.color : undefined,
                      }}
                    >
                      <div
                        className="transition-colors"
                        style={{ color: skill.color }}
                      >
                        {getIcon(skill.iconName, 'w-4 h-4 sm:w-5 sm:h-5')}
                      </div>
                    </div>

                    {/* Skill Label Tooltip */}
                    <span
                      className={`absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 rounded-md pointer-events-none transition-opacity duration-200 ${
                        isSelected
                          ? 'opacity-100 bg-slate-900 text-cyan-300 border border-cyan-500/30'
                          : 'opacity-0 group-hover:opacity-100 bg-slate-950/90 text-slate-300 border border-white/10'
                      }`}
                    >
                      {skill.name}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* Central Orbital Core / Real-time Display Console */}
            <div className="relative z-10 w-48 sm:w-64 lg:w-72 p-4 sm:p-6 rounded-3xl bg-slate-950/90 border border-white/10 backdrop-blur-2xl shadow-2xl flex flex-col items-center text-center transition-all duration-300">
              {/* Outer Core Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-20 blur-xl pointer-events-none transition-colors duration-500"
                style={{ backgroundColor: activeDisplay.color }}
              />

              {/* Core Icon Badge */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-0.5 mb-3 flex items-center justify-center border shadow-md transition-all duration-300"
                style={{
                  backgroundColor: `${activeDisplay.color}15`,
                  borderColor: `${activeDisplay.color}60`,
                  color: activeDisplay.color,
                }}
              >
                {getIcon(activeDisplay.iconName, 'w-6 h-6 sm:w-7 sm:h-7')}
              </div>

              {/* Active Skill Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                {activeDisplay.name}
              </h3>

              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-3">
                <span>{lang === 'ur' ? activeDisplay.urCategory : activeDisplay.category}</span>
                <span>•</span>
                <span className="text-cyan-400">
                  {lang === 'ur' ? activeDisplay.urExperienceLevel : activeDisplay.experienceLevel}
                </span>
              </div>

              {/* Mastery Level Bar */}
              <div className="w-full space-y-1 mb-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">{t.skills.levelLabel}</span>
                  <span className="font-bold text-white tabular-nums">{activeDisplay.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${activeDisplay.level}%`,
                      backgroundColor: activeDisplay.color,
                    }}
                  />
                </div>
              </div>

              {/* Concise Description */}
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {lang === 'ur' ? activeDisplay.urDescription : activeDisplay.description}
              </p>
            </div>

          </div>

          {/* Quick Responsive Grid for Mobile Accessibility */}
          <div className="w-full mt-6 block sm:hidden">
            <p className="text-center text-xs text-slate-500 mb-3 font-mono">
              {t.skills.mobileTip}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {filteredSkills.slice(0, 6).map((skill) => (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkill(skill)}
                  className={`p-3 rounded-xl border text-start transition-all cursor-pointer ${
                    activeDisplay.id === skill.id
                      ? 'bg-slate-900 border-cyan-400'
                      : 'bg-slate-950/60 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1" style={{ color: skill.color }}>
                    {getIcon(skill.iconName, 'w-4 h-4')}
                    <span className="text-xs font-bold text-white">{skill.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {skill.level}% {t.skills.levelLabel}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
