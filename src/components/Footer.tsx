import React from 'react';
import { ArrowUp, Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-white/5 bg-[#03050a] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand & Rights */}
          <div className="text-center sm:text-start">
            <span className="text-sm font-bold text-white block">
              Ali Murtaza
            </span>
            <p className="text-xs text-slate-500 mt-1">
              © 2026 {t.footer.rights}
            </p>
          </div>

          {/* Tagline */}
          <div className="text-xs text-slate-500 text-center font-mono hidden md:block">
            {t.footer.tagline}
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/muhammadshoaibkhan607-png"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://vercel.com/muhammadshoaibkhan607-png"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Vercel profile"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
};
