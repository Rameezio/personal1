import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import BackgroundWaves  from '../components/hero/BackgroundWaves';
import AnimatedOrb      from '../components/hero/AnimatedOrb';
import FloatingTechCard from '../components/hero/FloatingTechCard';

/* ─── CTA Buttons (inline — too small for own file) ─── */
const CTAButtons = () => (
  <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2" style={{ pointerEvents:'auto' }}>
    <a href="#projects" className="hero-btn-primary" style={{ display:'inline-flex', alignItems:'center', textDecoration:'none' }}>
      <svg className="hero-btn-arrow-up" viewBox="0 0 16 16" fill="none" style={{ width:15, height:15, marginRight:8, flexShrink:0, transition:'transform 0.28s ease' }}>
        <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      View My Work
    </a>
    <a href="#contact" className="hero-btn-secondary" style={{ display:'inline-flex', alignItems:'center', textDecoration:'none' }}>
      Get In Touch
      <svg className="hero-btn-arrow-right" viewBox="0 0 16 16" fill="none" style={{ width:15, height:15, marginLeft:8, flexShrink:0, transition:'transform 0.28s ease' }}>
        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  </div>
);

/* ─── Tech Icons ──────────────────────────────────────── */
const MongoDBIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path
      d="M12 2C12 2 6.5 9.5 6.5 14.2C6.5 17.4 8.96 20 12 20C15.04 20 17.5 17.4 17.5 14.2C17.5 9.5 12 2 12 2Z"
      fill="#4DB33D"
    />
    <line x1="12" y1="20" x2="12" y2="23" stroke="#4DB33D" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ReactIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <circle cx="12" cy="12" r="2.3" fill="#61DAFB" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)" />
  </svg>
);

const ExpressIcon = () => (
  <span
    style={{
      color: '#e2e8f0',
      fontWeight: 900,
      fontSize: 13,
      fontStyle: 'italic',
      letterSpacing: '-0.5px',
      fontFamily: "'Courier New', monospace",
      userSelect: 'none',
      lineHeight: 1,
    }}
  >
    ex
  </span>
);

const NodeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
    <path d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z" stroke="#539E43" strokeWidth="1.3" fill="none" />
    <text
      x="12" y="14.5"
      textAnchor="middle"
      fill="#539E43"
      fontSize="5.5"
      fontWeight="bold"
      fontFamily="monospace"
    >
      JS
    </text>
  </svg>
);

/* ─── Tech card data ─────────────────────────────────── */
const TECH_CARDS = [
  {
    name: 'MongoDB',
    Icon: MongoDBIcon,
    iconBg: 'rgba(77,179,61,0.16)',
    glowColor: 'rgba(77,179,61,0.52)',
    borderGlow: 'rgba(77,179,61,0.48)',
    floatAnim: 'cardFloat1',
    floatDelay: '0s',
    entryDelay: 1.4,
    pos: { top: '18%', left: '2%' },
  },
  {
    name: 'Express.js',
    Icon: ExpressIcon,
    iconBg: 'rgba(200,200,200,0.1)',
    glowColor: 'rgba(200,200,200,0.32)',
    borderGlow: 'rgba(200,200,200,0.28)',
    floatAnim: 'cardFloat2',
    floatDelay: '0.7s',
    entryDelay: 1.65,
    pos: { top: '18%', right: '2%' },
  },
  {
    name: 'React',
    Icon: ReactIcon,
    iconBg: 'rgba(97,218,251,0.13)',
    glowColor: 'rgba(97,218,251,0.52)',
    borderGlow: 'rgba(97,218,251,0.48)',
    floatAnim: 'cardFloat3',
    floatDelay: '1.3s',
    entryDelay: 1.9,
    pos: { bottom: '18%', left: '2%' },
  },
  {
    name: 'Node.js',
    Icon: NodeIcon,
    iconBg: 'rgba(140,200,75,0.13)',
    glowColor: 'rgba(140,200,75,0.48)',
    borderGlow: 'rgba(140,200,75,0.44)',
    floatAnim: 'cardFloat4',
    floatDelay: '2s',
    entryDelay: 2.15,
    pos: { bottom: '18%', right: '2%' },
  },
];

/* ─── Fade-in wrapper variants ───────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

/* ══════════════════════════════════════════════════════
   Hero Section
══════════════════════════════════════════════════════ */
export default function Hero() {
  const [show, setShow] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShow(true), 300);
    const t2 = setTimeout(() => setShowContent(true), 750);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: '#04091a',
      }}
    >
      {/* ── Background (waves, particles, glows) ── */}
      <BackgroundWaves />

      {/* Subtle overlay to darken slightly */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'rgba(4,9,26,0.22)',
        }}
      />

      {/* ══ Main 2-column layout ══ */}
      <div
        className="absolute inset-0 z-20 flex flex-col lg:flex-row items-center justify-center lg:justify-start pt-24 lg:pt-0 px-6 md:px-12 lg:px-20"
        style={{ maxWidth: 1440, margin: '0 auto', left: 0, right: 0, gap: 'clamp(24px, 4vw, 60px)' }}
      >
        {/* ── LEFT: Text content ── */}
        <div
          className="w-full flex flex-col items-center lg:items-start text-center lg:text-left"
          style={{ maxWidth: 580, gap: 'clamp(14px, 1.8vw, 22px)' }}
        >
          {/* Available badge */}
          <motion.div {...fadeUp(show ? 0 : 99)} animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 9999,
                background: 'rgba(37,99,235,0.13)',
                border: '1px solid rgba(59,130,246,0.32)',
                boxShadow: '0 0 22px rgba(59,130,246,0.12)',
                color: '#bfdbfe', fontSize: 13, fontWeight: 600, letterSpacing: '0.04em',
                userSelect: 'none',
              }}
            >
              <span
                style={{
                  display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
                  background: '#60a5fa',
                  boxShadow: '0 0 10px rgba(96,165,250,0.95)',
                  animation: 'pulse 2s ease-in-out infinite',
                  flexShrink: 0,
                }}
              />
              Available for work
            </span>
          </motion.div>

          {/* Hi, I'm Rameez */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 18 }}
            transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
            style={{
              margin: 0,
              color: '#94a3b8',
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            Hi, I&apos;m{' '}
            <span style={{ color: '#f1f5f9', fontWeight: 700 }}>Rameez</span>
          </motion.p>

          {/* MERN STACK + DEVELOPER */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: show ? 1 : 0, y: show ? 0 : 28 }}
            transition={{ duration: 0.68, delay: 0.24, ease: 'easeOut' }}
            style={{ lineHeight: 0.92, userSelect: 'none' }}
          >
            {/* MERN STACK — solid white */}
            <div
              style={{
                fontSize: 'clamp(2rem, 7vw, 5.4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                color: '#f8fafc',
                textShadow: '0 0 40px rgba(59,130,246,0.18)',
              }}
            >
              MERN STACK
            </div>

            {/* DEVELOPER — animated gradient */}
            <div
              style={{
                fontSize: 'clamp(2rem, 7vw, 5.4rem)',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '-0.025em',
                backgroundImage:
                  'linear-gradient(90deg, #60a5fa 0%, #a78bfa 38%, #38bdf8 65%, #60a5fa 100%)',
                backgroundSize: '300% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'heroGradientFlow 5s linear infinite',
              }}
            >
              DEVELOPER
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 16 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{
              margin: 0,
              color: 'rgba(147,197,253,0.72)',
              fontSize: 'clamp(0.88rem, 1.4vw, 1.1rem)',
              fontWeight: 500,
              textTransform: 'lowercase',
              letterSpacing: '0.025em',
            }}
          >
            building reliable web applications with clean code
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 16 }}
            transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
          >
            <CTAButtons />
          </motion.div>
        </div>

        {/* ── RIGHT: Orb + Tech Cards (desktop only) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.65 }}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 560,
            pointerEvents: 'none',
          }}
          className="hidden lg:flex"
        >
          {/* Right stage — glow + floating tech cards */}
          <div style={{ position: 'relative', width: 420, height: 420, flexShrink: 0 }}>

            {/* Soft ambient glow in the center */}
            <AnimatedOrb />

            {/* Floating Tech Cards */}
            {TECH_CARDS.map(({ name, pos, ...rest }) => (
              <div
                key={name}
                style={{ position: 'absolute', pointerEvents: 'auto', ...pos }}
              >
                <FloatingTechCard name={name} {...rest} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div
        style={{
          position: 'absolute', bottom: 28, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: showContent ? 0.42 : 0,
          transition: 'opacity 0.8s ease 2.2s',
          pointerEvents: 'none', zIndex: 25,
        }}
      >
        <span
          style={{ color: '#64748b', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, rgba(96,165,250,0.55), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
