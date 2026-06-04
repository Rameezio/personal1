import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Code2,
  Rocket,
  Target,
  Zap,
  Award,
  TrendingUp,
  Clock,
  MapPin,
  Mail,
  Phone,
} from 'lucide-react';

const easeOut = [0.22, 1, 0.36, 1];

const professionalStats = [
  { icon: Award, value: '4+', label: 'Projects Completed' },
  { icon: TrendingUp, value: '3+', label: 'Years Learning' },
  { icon: Code2, value: 'MERN', label: 'Stack Specialized' },
];

const coreValues = [
  { icon: Code2, title: 'Clean Architecture', desc: 'Maintainable, scalable code with proper separation of concerns' },
  { icon: Target, title: 'Problem Solver', desc: 'Systematic approach to complex technical challenges' },
  { icon: Rocket, title: 'Continuous Learning', desc: 'Actively expanding skills in modern web technologies' },
  { icon: Zap, title: 'Efficient Delivery', desc: 'Focused on practical solutions and timely execution' },
];

const timeline = [
  {
    year: '2023',
    title: 'Started the Journey',
    description: 'Learned HTML, CSS, JavaScript from scratch. Built first static websites.',
  },
  {
    year: '2024',
    title: 'Entered MERN Stack',
    description: 'Built full-stack apps with React, Node.js, Express, and MongoDB.',
  },
  {
    year: '2025',
    title: 'Real Projects & Freelancing',
    description: 'Delivered client projects, learned Git, REST APIs, and deployment basics.',
  },
  {
    year: '2026',
    title: 'Going Professional',
    description: 'Working professionally on real-world projects. Now learning DevOps, Docker, and CI/CD.',
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: easeOut },
  },
});

const fadeRight = (delay = 0) => ({
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay, ease: easeOut },
  },
});

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      ref={ref}
      className="portfolio-section"
      style={{
        background: 'linear-gradient(180deg, #04091a 0%, #060910 40%)',
      }}
    >
      <div className="portfolio-ambient" aria-hidden />
      <div className="portfolio-grid" aria-hidden />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="portfolio-eyebrow" style={{ marginBottom: 0 }}>
              <Code2 className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} aria-hidden />
              <span className="portfolio-eyebrow-label">Professional Profile</span>
            </div>
          </div>

          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-slate-50">
              About{' '}
              <span className="bg-gradient-to-r from-slate-50 via-blue-200 to-blue-400 bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(59,130,246,0.15)]">
                Me
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={inView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.2, ease: easeOut }}
              className="absolute -bottom-3 left-1/2 h-px w-[min(12rem,70%)] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-blue-500/55 to-transparent shadow-[0_0_12px_rgba(59,130,246,0.35)]"
            />
          </div>

        </motion.div>

        <motion.div
          variants={fadeUp(0.12)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {professionalStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeUp(0.18 + index * 0.06)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="group relative p-8 rounded-2xl text-center border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_24px_48px_-24px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.04] hover:border-blue-500/25 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.07)_inset,0_28px_56px_-28px_rgba(0,0,0,0.6),0_0_0_1px_rgba(59,130,246,0.08)] hover:ring-blue-500/20 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-white/[0.02] mx-auto mb-5 flex items-center justify-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-blue-500/10 group-hover:border-blue-500/35 group-hover:ring-blue-500/25 transition-all duration-300">
                <stat.icon className="w-7 h-7 text-slate-300 group-hover:text-blue-300/95 transition-colors duration-300" strokeWidth={1.5} aria-hidden />
              </div>
              <div className="text-4xl font-bold tabular-nums tracking-tight text-slate-50 mb-2">
                {stat.value}
              </div>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.12em]">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <div className="relative group">
              <div className="aspect-square rounded-3xl p-px bg-gradient-to-br from-white/[0.14] via-blue-500/20 to-transparent max-w-sm mx-auto lg:max-w-none shadow-[0_32px_64px_-32px_rgba(0,0,0,0.65)] transition-[box-shadow] duration-300 group-hover:shadow-[0_40px_80px_-36px_rgba(59,130,246,0.18)]">
                <div className="w-full h-full rounded-[calc(1.5rem-1px)] overflow-hidden border border-white/[0.06]">
                  <img
                    src="/images/rameez.jpg"
                    alt="Muhammad Rameez"
                    className="w-full h-full object-cover" style={{ objectPosition: 'center 35%', transform: 'scale(0.82)', transformOrigin: 'center 35%' }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl border border-blue-500/30 bg-blue-950/55 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/45 ring-1 ring-blue-400/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:shadow-blue-500/20">
                <Award className="w-10 h-10 text-blue-200/95" strokeWidth={1.5} aria-hidden />
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300/90 leading-relaxed font-normal tracking-wide">
                Passionate MERN Stack Developer with a focus on building scalable web applications. I
                combine clean architecture principles with modern development practices to deliver
                robust and maintainable solutions.
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ring-1 ring-blue-500/10 hover:border-blue-500/30 hover:ring-blue-500/25 transition-all duration-300">
                  <MapPin className="w-4 h-4 text-blue-400/85 shrink-0" strokeWidth={1.75} aria-hidden />
                  <span className="text-slate-300 text-sm font-medium tracking-wide">Pakistan</span>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ring-1 ring-blue-500/10 hover:border-blue-500/30 hover:ring-blue-500/25 transition-all duration-300">
                  <Mail className="w-4 h-4 text-blue-400/85 shrink-0" strokeWidth={1.75} aria-hidden />
                  <span className="text-slate-300 text-sm font-medium tracking-wide">muhammadrameezy@gmail.com</span>
                </div>
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ring-1 ring-blue-500/10 hover:border-blue-500/30 hover:ring-blue-500/25 transition-all duration-300">
                  <Phone className="w-4 h-4 text-blue-400/85 shrink-0" strokeWidth={1.75} aria-hidden />
                  <span className="text-slate-300 text-sm font-medium tracking-wide">+92 304 1109928</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight(0.28)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-slate-50 mb-8 tracking-tight">Core Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreValues.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp(0.34 + index * 0.06)}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="group p-5 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.05] to-white/[0.02] backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_16px_40px_-28px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.04] hover:border-blue-500/25 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_48px_-28px_rgba(59,130,246,0.12)] hover:ring-blue-500/15 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-lg border border-white/[0.08] bg-white/[0.05] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:border-blue-500/35 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_24px_-4px_rgba(59,130,246,0.35)]">
                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-300/95 transition-colors duration-300" strokeWidth={1.75} aria-hidden />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 mb-2 tracking-tight">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed tracking-wide">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_32px_64px_-40px_rgba(0,0,0,0.55)] ring-1 ring-blue-500/10">
              <h3 className="text-2xl font-bold text-slate-50 mb-8 flex items-center gap-3 tracking-tight">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-blue-500/15">
                  <Clock className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} aria-hidden />
                </span>
                Learning Journey
              </h3>

              <div className="relative space-y-0 pl-1">
                <div
                  className="absolute left-[1.625rem] top-3 bottom-3 w-px bg-gradient-to-b from-white/[0.08] via-blue-500/25 to-white/[0.06] shadow-[0_0_8px_rgba(59,130,246,0.25)]"
                  aria-hidden
                />
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp(0.42 + index * 0.07)}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="relative flex gap-4 pb-8 last:pb-0 group"
                  >
                    <div className="relative z-[1] flex shrink-0">
                      <div className="w-11 h-11 rounded-full border border-white/[0.1] bg-[#0b101c] flex items-center justify-center shadow-sm shadow-black/30 ring-1 ring-blue-500/15 transition-all duration-300 group-hover:border-blue-500/40 group-hover:shadow-[0_0_20px_-2px_rgba(59,130,246,0.35)]">
                        <span className="text-[11px] font-semibold tabular-nums tracking-wide text-slate-400 group-hover:text-blue-200/95">
                          {item.year.slice(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-500/[0.08] px-2 py-0.5 text-[11px] font-semibold tabular-nums tracking-wide text-blue-200/90 ring-1 ring-blue-400/10">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-100 mb-2 tracking-tight transition-colors duration-300 group-hover:text-blue-100">
                        {item.title}
                      </h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
