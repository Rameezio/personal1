import React from 'react';
import { motion } from 'framer-motion';

/*
  FloatingTechCard — smaller, cleaner glassmorphism card.
*/
export default function FloatingTechCard({
  name,
  Icon,
  iconBg,
  glowColor,
  borderGlow,
  floatAnim,
  floatDelay,
  entryDelay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: entryDelay, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        animation: `${floatAnim} 5.5s ease-in-out infinite`,
        animationDelay: floatDelay,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '9px 13px',
          borderRadius: 14,
          minWidth: 128,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow:
            '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)',
          cursor: 'default',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 12px 36px rgba(0,0,0,0.45), 0 0 22px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.12)`;
          e.currentTarget.style.borderColor = borderGlow;
          e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            '0 6px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: iconBg,
            boxShadow: `0 0 14px ${glowColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon />
        </div>

        {/* Label + lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span
            style={{
              color: '#f1f5f9',
              fontSize: 11.5,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '0.01em',
            }}
          >
            {name}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <div style={{ height: 2.5, width: 42, borderRadius: 9999, background: glowColor, opacity: 0.35 }} />
            <div style={{ height: 2.5, width: 28, borderRadius: 9999, background: glowColor, opacity: 0.2  }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
