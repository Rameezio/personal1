import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

const cards = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 8l3 3-3 3" />
        <path d="M13 14h4" />
      </svg>
    ),
    title: 'Full-Stack Web Apps',
    description:
      'End-to-end applications with auth, real-time features, and scalable MERN architecture built for production.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'REST APIs & Backend',
    description:
      'Clean, documented APIs with proper validation, error handling, middleware, and seamless third-party integrations.',
    tech: ['Node.js', 'Express.js', 'REST', 'JWT'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5z" />
        <path d="M4 13a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6z" />
        <path d="M16 13a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-6z" />
      </svg>
    ),
    title: 'Responsive UI',
    description:
      'Pixel-perfect interfaces that look stunning on every device — from animations to accessibility, every detail counts.',
    tech: ['React.js', 'CSS3', 'Framer Motion', 'HTML5'],
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});

const WhatIBuild = () => {
  return (
    <section id="what-i-build" className="portfolio-section">
      <div className="portfolio-ambient" aria-hidden />
      <div className="portfolio-grid" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp(0)}
          className="text-center mb-20"
        >
          <div className="portfolio-eyebrow">
            <Layers className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} aria-hidden />
            <span className="portfolio-eyebrow-label">What I Build</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-slate-50">
            Turning ideas into{' '}
            <span className="bg-gradient-to-r from-slate-50 via-blue-200 to-blue-400 bg-clip-text text-transparent">
              real products
            </span>
          </h2>

          <p className="text-lg md:text-xl text-slate-400/95 max-w-3xl mx-auto leading-relaxed font-normal tracking-wide">
            Three core specialisations — each delivered with clean code, thoughtful design, and attention to
            performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeUp(0.08 + i * 0.06)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group portfolio-panel portfolio-panel-lg p-8 flex flex-col hover:border-blue-500/25 hover:shadow-[0_28px_56px_-28px_rgba(0,0,0,0.55),0_0_0_1px_rgba(59,130,246,0.08)] transition-all duration-300"
            >
              <div className="text-blue-400/90 mb-6 opacity-90 group-hover:opacity-100 transition-opacity [&_svg]:stroke-current">
                {card.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-50 mb-3 tracking-tight">{card.title}</h3>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1 tracking-wide">{card.description}</p>

              <div className="flex flex-wrap gap-2">
                {card.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-white/[0.08] bg-white/[0.04] text-slate-400 group-hover:border-blue-500/25 group-hover:bg-blue-500/[0.08] group-hover:text-blue-200/90 transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuild;
