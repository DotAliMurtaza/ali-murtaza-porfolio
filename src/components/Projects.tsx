import React, { useState } from 'react';
import { ExternalLink, Github, Eye, Sparkles, Layers, ArrowUpRight, X } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const Projects: React.FC = () => {
  const { lang, t, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'ecommerce' | 'games'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'ecommerce') return project.category === 'ecommerce';
    if (activeTab === 'games') return project.category === 'games';
    return true;
  });

  return (
    <section id="projects" className="relative py-24 bg-[#05070f] overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
              {t.projects.kicker}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              {t.projects.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-white/5 backdrop-blur-md self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.projects.filterAll}
            </button>
            <button
              onClick={() => setActiveTab('ecommerce')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'ecommerce'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.projects.filterEcommerce}
            </button>
            <button
              onClick={() => setActiveTab('games')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'games'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.projects.filterGames}
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const projectTitle = lang === 'ur' ? project.urTitle : project.title;
            const projectCategory = lang === 'ur' ? project.urCategoryLabel : project.categoryLabel;
            const projectDesc = lang === 'ur' ? project.urDescription : project.description;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col rounded-2xl bg-slate-900/40 border border-white/8 hover:border-cyan-500/30 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Media Preview Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      // Fallback gradient container if image fails to render
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Scrim overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Metadata Strip */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-md">
                      {projectCategory}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 bg-slate-950/80 px-2 py-1 rounded-md border border-white/10 backdrop-blur-md tabular-nums">
                      {project.year}
                    </span>
                  </div>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-1.5 shadow-lg"
                    >
                      <span>{t.projects.liveDemo}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-lg text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.projects.details}</span>
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                      {projectTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {projectDesc}
                    </p>
                  </div>

                  <div>
                    {/* Technology Tags (Unboxed Text with Separators per Design Constitution) */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400 mb-5 font-mono">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="hover:text-cyan-300 transition-colors">{tech}</span>
                          {idx < project.technologies.length - 1 && (
                            <span className="text-slate-600" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                      >
                        <span>{t.projects.liveDemo}</span>
                        <ArrowUpRight className={`w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 ${isRtl ? '-scale-x-100' : ''}`} />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`View ${project.title} source code on GitHub`}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/10 p-6 sm:p-8 shadow-2xl">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label={t.projects.closeModal}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {lang === 'ur' ? selectedProject.urCategoryLabel : selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {lang === 'ur' ? selectedProject.urTitle : selectedProject.title}
                </h3>
              </div>

              {/* Modal Image Showcase */}
              <div className="rounded-2xl overflow-hidden mb-6 border border-white/10 aspect-[16/9] bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Long Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                {lang === 'ur' ? selectedProject.urLongDescription : selectedProject.longDescription}
              </p>

              {/* Architectural Highlights */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3">
                  {t.projects.modalHighlights}
                </h4>
                <ul className="space-y-2">
                  {(lang === 'ur' ? selectedProject.urHighlights : selectedProject.highlights).map((hl, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h4 className="text-xs uppercase font-mono text-slate-400 tracking-wider mb-3">
                  {t.projects.modalTechnologies}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-cyan-300 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-2 shadow-md shadow-cyan-400/20"
                >
                  <span>{t.projects.liveDemo}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-white/10 transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>{t.projects.github}</span>
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
