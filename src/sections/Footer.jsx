import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github,    href: 'https://github.com/Rameezio',                              label: 'GitHub'    },
    { icon: Linkedin,  href: 'https://www.linkedin.com/in/muhammad-rameez-1707702b2',   label: 'LinkedIn'  },
    { icon: Instagram, href: 'https://instagram.com/rameezio',                          label: 'Instagram' },
    { icon: Mail,      href: 'mailto:muhammadrameezy@gmail.com',                        label: 'Email'     },
  ];

  return (
    <footer className="border-t border-white/[0.06] bg-[#060910]/95 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-display font-bold gradient-text-hero mb-4 tracking-tight">Rameez</h3>
            <p className="text-dark-400 mb-6 text-sm leading-relaxed tracking-wide">
              MERN Stack Developer building clean, reliable
              web applications with passion and precision.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 rounded-lg bg-dark-800/80 border border-primary-500/25 hover:bg-primary-500/10 hover:border-primary-500/40 transition-all ring-1 ring-transparent hover:ring-primary-500/15"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-primary-400" strokeWidth={1.75} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-xs font-semibold text-dark-200 mb-4 uppercase tracking-[0.14em]">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Skills', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase()}`}
                    whileHover={{ x: 3 }}
                    className="text-dark-400 hover:text-primary-300 transition-colors text-sm tracking-wide"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-xs font-semibold text-dark-200 mb-4 uppercase tracking-[0.14em]">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-dark-400 tracking-wide">muhammadrameezy@gmail.com</p>
              <p className="text-dark-400 tracking-wide">+92 304 1109928</p>
              <p className="text-dark-400 tracking-wide">Pakistan</p>
              <p className="text-primary-400 font-medium">Available for freelance work</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/[0.06]"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-dark-400 text-xs">
              © {currentYear} Portfolio. Made with{' '}
              <Heart className="w-3 h-3 inline text-primary-500 fill-current" strokeWidth={1.5} /> by a passionate developer
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-dark-800/80 border border-primary-500/25 hover:bg-primary-500/10 hover:border-primary-500/40 transition-all ring-1 ring-transparent hover:ring-primary-500/15"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-primary-400" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
