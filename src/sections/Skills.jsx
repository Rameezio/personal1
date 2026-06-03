import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Code, Database, Cloud,
  GitBranch, Palette, Server, Zap,
  Terminal, Globe, Layers, Package
} from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const skillsData = {
    Frontend: [
      { name: 'React.js', icon: Code, color: 'from-blue-600 to-blue-500', bgColor: 'bg-blue-500/10' },
      { name: 'JavaScript', icon: Terminal, color: 'from-slate-600 to-blue-600', bgColor: 'bg-blue-500/10' },
      { name: 'TypeScript', icon: Code, color: 'from-blue-700 to-blue-500', bgColor: 'bg-blue-500/10' },
      { name: 'HTML5', icon: Globe, color: 'from-blue-800 to-blue-600', bgColor: 'bg-blue-500/10' },
      { name: 'CSS3', icon: Palette, color: 'from-slate-700 to-blue-600', bgColor: 'bg-blue-500/10' },
      { name: 'Tailwind CSS', icon: Palette, color: 'from-sky-600 to-blue-600', bgColor: 'bg-sky-500/10' },
    ],
    Backend: [
      { name: 'Node.js', icon: Server, color: 'from-blue-700 to-blue-500', bgColor: 'bg-blue-500/10' },
      { name: 'Express.js', icon: Server, color: 'from-slate-700 to-slate-600', bgColor: 'bg-slate-500/10' },
      { name: 'REST APIs', icon: Zap, color: 'from-blue-600 to-sky-500', bgColor: 'bg-blue-500/10' },
      { name: 'GraphQL', icon: Layers, color: 'from-blue-800 to-blue-600', bgColor: 'bg-blue-500/10' },
    ],
    Database: [
      { name: 'MongoDB', icon: Database, color: 'from-emerald-800 to-blue-700', bgColor: 'bg-blue-500/10' },
      { name: 'MySQL', icon: Database, color: 'from-blue-800 to-blue-600', bgColor: 'bg-blue-500/10' },
      { name: 'PostgreSQL', icon: Database, color: 'from-blue-900 to-blue-600', bgColor: 'bg-blue-500/10' },
    ],
    DevOps: [
      { name: 'Git', icon: GitBranch, color: 'from-slate-700 to-blue-600', bgColor: 'bg-blue-500/10' },
      { name: 'GitHub', icon: GitBranch, color: 'from-slate-800 to-slate-600', bgColor: 'bg-slate-600/10' },
      { name: 'Docker', icon: Cloud, color: 'from-sky-600 to-blue-600', bgColor: 'bg-blue-500/10' },
      { name: 'CI/CD', icon: Zap, color: 'from-blue-600 to-primary-500', bgColor: 'bg-blue-500/10' },
      { name: 'Vercel', icon: Cloud, color: 'from-slate-800 to-blue-800', bgColor: 'bg-slate-700/10' },
    ],
  };

  const [visibleSections, setVisibleSections] = useState(new Set());
  
  const sectionRefs = useRef({});
  
  useEffect(() => {
    const observers = Object.keys(skillsData).map(category => {
      const element = sectionRefs.current[category];
      if (!element) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(category));
          }
        },
        { threshold: 0.1, triggerOnce: true }
      );
      
      observer.observe(element);
      return observer;
    });
    
    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  return (
    <section id="skills" className="portfolio-section">
      <div className="portfolio-ambient" aria-hidden />
      <div className="portfolio-grid" aria-hidden />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="portfolio-eyebrow"
          >
            <Zap className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} />
            <span className="portfolio-eyebrow-label">Expertise</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-slate-50">
            <span>Technical</span>{' '}
            <span className="bg-gradient-to-r from-slate-50 via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400/95 max-w-3xl mx-auto leading-relaxed font-normal tracking-wide">
            MERN Stack Developer with hands-on experience building real-world applications. Continuously learning and improving.
          </p>
        </motion.div>

        {/* Skills Categories with Pills */}
        <div className="space-y-16">
          {Object.entries(skillsData).map(([category, categorySkills], categoryIndex) => (
            <div
              key={category}
              ref={el => sectionRefs.current[category] = el}
              className="space-y-6"
            >
              {/* Category Label */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={visibleSections.has(category) ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-sky-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.35)]" />
                <h3 className="text-lg font-semibold text-slate-400 uppercase tracking-[0.12em]">
                  {category}
                </h3>
              </motion.div>

              {/* Skill Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={visibleSections.has(category) ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + skillIndex * 0.08,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    className="group"
                  >
                    <div className={`p-3 rounded-xl border border-white/[0.08] ${skill.bgColor} backdrop-blur-sm ring-1 ring-white/[0.04] hover:border-primary-500/30 hover:ring-primary-500/15 hover:shadow-[0_0_24px_-8px_rgba(59,130,246,0.25)] transition-all duration-300 cursor-default`}>
                      <div className="flex flex-col items-center gap-2">
                        {/* Icon with gradient */}
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} p-px shadow-inner shadow-black/30`}>
                          <div className="w-full h-full rounded-[7px] bg-dark-900/95 flex items-center justify-center border border-white/[0.06]">
                            <skill.icon className="w-5 h-5 text-primary-200" strokeWidth={1.75} />
                          </div>
                        </div>
                        
                        {/* Skill name */}
                        <span className="text-xs font-medium text-slate-300/90 text-center group-hover:text-white transition-colors tracking-wide">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20"
        >
          <div className="portfolio-panel portfolio-panel-lg p-8">
            <h3 className="text-xl font-bold text-white mb-8 text-center tracking-tight">Core Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'MERN Stack', desc: 'MongoDB, Express, React, Node', icon: Package, color: 'from-blue-700 to-primary-500' },
                { name: 'Frontend', desc: 'React, TypeScript, Tailwind', icon: Code, color: 'from-sky-600 to-blue-600' },
                { name: 'Backend', desc: 'Node.js, Express, REST APIs', icon: Server, color: 'from-blue-800 to-blue-600' },
                { name: 'DevOps', desc: 'Git, Docker, CI/CD', icon: Cloud, color: 'from-slate-700 to-blue-700' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tech.color} p-px shadow-lg shadow-black/30 group-hover:shadow-primary-500/20 transition-shadow duration-300`}>
                    <div className="w-full h-full rounded-[11px] bg-dark-900/95 flex items-center justify-center border border-white/[0.06]">
                      <tech.icon className="w-8 h-8 text-primary-200" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h4 className="font-bold text-white mb-1 tracking-tight">{tech.name}</h4>
                  <p className="text-xs text-slate-500 tracking-wide">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
