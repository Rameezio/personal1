import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, X, FolderGit, Star } from 'lucide-react';

const ProjectCard = ({ project, index, inView, setSelectedProject }) => {
  const previewGradient = 'from-blue-800 via-blue-600 to-sky-500';
  const cardAccentColor = 'border-primary-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setSelectedProject(project)}
      className="relative p-[2px] rounded-2xl cursor-pointer group hover:z-10 transition-all duration-300 hover:-translate-y-2"
    >
      {/* Glowing Top Border Accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${previewGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Animated Border Layers */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${previewGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`} style={{ zIndex: -1 }}></div>
      <div className="absolute inset-[2px] rounded-2xl bg-dark-900 transition-colors duration-300" style={{ zIndex: -1 }}></div>
      
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute -top-3 -right-3 z-20">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full text-white text-xs font-bold shadow-lg shadow-primary-500/25 ring-1 ring-white/10">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      <div className="h-full p-6 rounded-2xl flex flex-col relative border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.015] backdrop-blur-xl ring-1 ring-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
        {/* Tech Stack Gradient Preview */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <div className={`w-full h-48 bg-gradient-to-br ${previewGradient} opacity-20 flex items-center justify-center border ${cardAccentColor} group-hover:opacity-30 transition-all duration-300`}>
            <div className="text-center">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {project.tech.slice(0, 4).map((tech, i) => (
                  <div key={i} className="w-8 h-8 mx-auto bg-white/10 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{tech.slice(0, 2).toUpperCase()}</span>
                  </div>
                ))}
              </div>
              <div className="text-white/80 text-xs font-medium">{project.tech.length} Technologies</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <span className="text-white font-medium text-sm">View Details</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4 flex-grow text-sm leading-relaxed">{project.description}</p>

        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/[0.04] text-white/85 rounded-full text-xs font-medium border border-primary-500/25 hover:bg-primary-500/10 hover:border-primary-500/40 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group relative p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-primary-500/10 hover:border-primary-500/35 transition-all"
          >
            <Github className="w-5 h-5 text-primary-300/90" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              GitHub
            </span>
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="group relative p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-primary-500/10 hover:border-primary-500/35 transition-all"
          >
            <ExternalLink className="w-5 h-5 text-primary-300/90" />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Live Demo
            </span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-Tech Store',
      description: 'Modern gaming and computer accessories e-commerce website with a premium product-focused layout, responsive design, and smooth shopping experience for gaming and tech enthusiasts.',
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/Rameezio/computer-store-1.git',
      demo: 'https://computer-store-1.vercel.app/',
      featured: true,
    },
    {
      id: 2,
      title: 'Developer Portfolio',
      description: 'Modern personal portfolio website showcasing professional skills, projects, and developer experience. Includes backend functionality for dynamic data and contact features.',
      tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Rameezio/Cortex.git',
      demo: 'https://cortex-ten-kohl.vercel.app/',
      featured: true,
    },
    {
      id: 3,
      title: 'Tuition Platform',
      description: 'Educational web application connecting students with tuition services. Features a professional interface for managing tuition information, student inquiries, and contact form submissions.',
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'],
      github: 'https://github.com/Rameezio/intership1.git',
      demo: 'https://intership1-eight.vercel.app/',
      featured: false,
    },
  ];

  return (
    <section id="projects" className="portfolio-section">
      <div className="portfolio-ambient" aria-hidden />
      <div className="portfolio-grid" aria-hidden />

      <div className="container mx-auto max-w-6xl relative z-10">
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
            <FolderGit className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} />
            <span className="portfolio-eyebrow-label">Portfolio</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-slate-50">
            <span>Featured</span>{' '}
            <span className="bg-gradient-to-r from-slate-50 via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400/95 font-normal max-w-3xl mx-auto leading-relaxed tracking-wide">
            Projects built with the MERN stack and modern web technologies. Practical solutions demonstrating real-world skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              inView={inView}
              setSelectedProject={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="portfolio-panel portfolio-panel-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-dark-200">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-dark-800 border border-primary-500/20 hover:bg-primary-500/10 transition-all"
              >
                <X className="w-5 h-5 text-dark-300" />
              </button>
            </div>

            <div className="w-full h-64 bg-gradient-to-br from-primary-500/20 to-primary-400/10 rounded-xl mb-6 flex items-center justify-center border border-primary-500/10">
              <div className="text-7xl">🚀</div>
            </div>

            <p className="text-dark-400 mb-6 leading-relaxed">{selectedProject.description}</p>

            <div className="mb-6">
              <h4 className="text-lg font-semibold text-dark-200 mb-3">Technology Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded-md text-sm font-medium border border-primary-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-button px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View Code
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
