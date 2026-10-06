import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Copy, Check, Send, Github, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Contact: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('muhammadshoaibkhan607@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare mailto link as fallback to open email client with the details
    const mailto = `mailto:muhammadshoaibkhan607@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Portfolio Inquiry'
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.open(mailto, '_blank');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#05070f] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2">
            {t.contact.kicker}
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2-Column Split: Direct Channels vs Interactive Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Channel Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/8 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      {t.contact.emailLabel}
                    </span>
                    <a
                      href="mailto:muhammadshoaibkhan607@gmail.com"
                      className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors break-all"
                    >
                      muhammadshoaibkhan607@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  title={t.contact.copyEmailBtn}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <p className="mt-2 text-xs text-emerald-400 font-mono">
                  {t.contact.copiedEmail}
                </p>
              )}
            </div>

            {/* WhatsApp / Phone Channel Card */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/8 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      {t.contact.whatsappLabel}
                    </span>
                    <a
                      href="https://wa.me/923282305470"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm font-semibold text-white hover:text-emerald-300 transition-colors font-mono"
                    >
                      +92 328 2305470
                    </a>
                  </div>
                </div>

                <a
                  href="https://wa.me/923282305470"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Profiles & Location */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/8 backdrop-blur-xl space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  {t.contact.locationLabel}
                </span>
                <span className="text-sm font-medium text-slate-200">
                  {t.contact.locationValue}
                </span>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center gap-4 text-xs font-mono">
                <a
                  href="https://github.com/muhammadshoaibkhan607-png"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href="https://vercel.com/muhammadshoaibkhan607-png"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-cyan-400" />
                  <span>Vercel Projects</span>
                </a>
              </div>
            </div>

          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-white/8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6">
                {t.contact.formTitle}
              </h3>

              {isSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <p className="text-sm font-semibold text-emerald-400">
                    {t.contact.successMsg}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={t.contact.namePlaceholder}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder={t.contact.emailPlaceholder}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.subjectPlaceholder}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder={t.contact.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-400/20"
                  >
                    <span>{isSubmitting ? t.contact.sendingBtn : t.contact.sendBtn}</span>
                    <Send className={`w-4 h-4 ${isRtl ? '-scale-x-100' : ''}`} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
