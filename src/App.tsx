/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CinematicIntro } from './components/CinematicIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { SkillsOrbit } from './components/SkillsOrbit';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function PortfolioMain({ onReplayIntro }: { onReplayIntro: () => void }) {
  return (
    <div className="relative min-h-screen bg-[#05070f] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-200">
      <Navbar onReplayIntro={onReplayIntro} />
      <main className="flex-grow">
        <Hero />
        <About />
        <SkillsOrbit />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isIntroExiting, setIsIntroExiting] = useState(false);

  const handleIntroComplete = () => {
    setIsIntroExiting(true);
    // Smooth cinematic transition timing: 700ms to seamlessly cross-dissolve into hero
    setTimeout(() => {
      setShowIntro(false);
      setIsIntroExiting(false);
    }, 700);
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setShowIntro(true);
    setIsIntroExiting(false);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#05070f] font-sans">
        {showIntro && (
          <CinematicIntro
            onComplete={handleIntroComplete}
            isExiting={isIntroExiting}
          />
        )}

        {/* The portfolio is mounted underneath so the transition is fluid with no layout flash */}
        <div
          className={`transition-all duration-1000 ${
            showIntro && !isIntroExiting
              ? 'opacity-0 scale-95 pointer-events-none'
              : 'opacity-100 scale-100'
          }`}
        >
          <PortfolioMain onReplayIntro={handleReplayIntro} />
        </div>
      </div>
    </LanguageProvider>
  );
}
