import React, { useState } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { experienceData, educationData } from '../data/experienceData';
import { useLanguage } from '../context/LanguageContext';

export const Experience: React.FC = () => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  return (
    <section id="experience" className="relative py-24 bg-[#05070f] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
            {t.experience.kicker}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.experience.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.experience.subtitle}
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-white/5 backdrop-blur-md mt-8">
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.experience.tabExperience}</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.experience.tabEducation}</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {activeTab === 'experience' && (
            <div className="space-y-8">
              {experienceData.map((item) => {
                const role = lang === 'ur' ? item.urRole : item.role;
                const company = lang === 'ur' ? item.urCompany : item.company;
                const period = lang === 'ur' ? item.urPeriod : item.period;
                const location = lang === 'ur' ? item.urLocation : item.location;
                const type = lang === 'ur' ? item.urType : item.type;
                const achievements = lang === 'ur' ? item.urAchievements : item.achievements;

                return (
                  <div
                    key={item.id}
                    className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/8 backdrop-blur-xl transition-all hover:border-cyan-500/20"
                  >
                    {/* Header Strip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {role}
                        </h3>
                        <p className="text-sm font-medium text-cyan-400 mt-0.5">
                          {company}
                        </p>
                      </div>

                      {/* Unboxed Metadata with Typographic Separators */}
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
                        <span>{period}</span>
                        <span aria-hidden="true">·</span>
                        <span>{location}</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-500">{type}</span>
                      </div>
                    </div>

                    {/* Achievements List */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3">
                        {t.experience.keyDeliverables}
                      </h4>
                      <ul className="space-y-2.5">
                        {achievements.map((ach, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{ach}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Row */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 font-mono">
                      {item.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="text-cyan-300/80">{tech}</span>
                          {idx < item.technologies.length - 1 && (
                            <span className="text-slate-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-8">
              {educationData.map((item) => {
                const degree = lang === 'ur' ? item.urDegree : item.degree;
                const institution = lang === 'ur' ? item.urInstitution : item.institution;
                const period = lang === 'ur' ? item.urPeriod : item.period;
                const location = lang === 'ur' ? item.urLocation : item.location;
                const highlights = lang === 'ur' ? item.urHighlights : item.highlights;

                return (
                  <div
                    key={item.id}
                    className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-white/8 backdrop-blur-xl transition-all hover:border-cyan-500/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {degree}
                        </h3>
                        <p className="text-sm font-medium text-cyan-400 mt-0.5">
                          {institution}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400 shrink-0">
                        <span>{period}</span>
                        <span aria-hidden="true">·</span>
                        <span>{location}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <ul className="space-y-2">
                        {highlights.map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                            <span className="leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
