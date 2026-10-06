import React from 'react';
import { CheckCircle2, Cpu, Zap, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const About: React.FC = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="relative py-24 bg-[#05070f] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag & Title */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
            {t.about.kicker}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            {t.about.lead}
          </p>
        </div>

        {/* 2-Column Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Narrative Prose & Core Facts */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.about.p2}
            </p>

            {/* Core Facts Matrix */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-4">
                {t.about.quickFactsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.about.facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/40 border border-white/5 backdrop-blur-md"
                  >
                    <span className="text-xs text-slate-500 block mb-1 font-mono">
                      {fact.label}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl">
              <h3 className="text-sm uppercase font-mono tracking-wider text-cyan-400 mb-6 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>{t.about.philosophyTitle}</span>
              </h3>

              <div className="space-y-6">
                {t.about.philosophy.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <h4>{item.title}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed ps-3.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
