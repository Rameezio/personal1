import React from 'react';

/*
  Soft ambient glow — no icon, no sphere, no rings.
  Just a subtle blue/purple light source on the right side.
*/
export default function AnimatedOrb() {
  return (
    <>
      {/* Wide outer glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 380, height: 380,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(139,92,246,0.07) 50%, transparent 72%)',
          filter: 'blur(55px)',
          animation: 'orbPulse 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Tighter inner glow — brighter center */}
      <div
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 180, height: 180,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(96,165,250,0.22) 0%, rgba(59,130,246,0.1) 55%, transparent 75%)',
          filter: 'blur(28px)',
          animation: 'orbPulse 4s ease-in-out infinite',
          animationDelay: '1s',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
