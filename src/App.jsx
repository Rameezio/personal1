import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

import { MiniNavbar }  from './components/ui/mini-navbar';
import Hero            from './sections/Hero';
import About           from './sections/About';
import Skills          from './sections/Skills';
import Projects        from './sections/Projects';
import Terminal        from './sections/Terminal';
import WhatIBuild      from './sections/WhatIBuild';
import Contact         from './sections/Contact';
import Footer          from './sections/Footer';
import LoadingScreen   from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lenis smooth scroll — single RAF loop
    const lenis = new Lenis({ lerp: 0.12, smoothWheel: true });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Loading screen — 1.8s (reduced from 2.5s)
    const timer = setTimeout(() => setIsLoading(false), 1800);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-[#060910]">
      <MiniNavbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Terminal />
        <WhatIBuild />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
