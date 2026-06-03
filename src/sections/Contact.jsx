import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, CheckCircle, Sparkles, Github, Instagram, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID  = 'site1';
const EMAILJS_TEMPLATE_ID = 'template_ccmpkpj';
const EMAILJS_PUBLIC_KEY  = 'tcJKuqggmkrnNvC9V';

const Contact = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedFields, setFocusedFields] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (field) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusedFields(prev => ({ ...prev, [field]: formData[field].length > 0 }));
  };

  const isFieldActive = (field) => {
    return focusedFields[field] || formData[field].length > 0;
  };

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:       formData.name,
          from_name:  formData.name,
          from_email: formData.email,
          message:    formData.message,
          title:      'Portfolio Contact',
        },
        EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setFocusedFields({ name: false, email: false, message: false });
      setTimeout(() => setIsSubmitted(false), 4000);

    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Message failed to send. Please try again or email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Github,    name: 'GitHub',    href: 'https://github.com/Rameezio'                            },
    { icon: Linkedin,  name: 'LinkedIn',  href: 'https://www.linkedin.com/in/muhammad-rameez-1707702b2'  },
    { icon: Instagram, name: 'Instagram', href: 'https://instagram.com/rameezio'                         },
    { icon: Mail,      name: 'Email',     href: 'mailto:muhammadrameezy@gmail.com'                       },
  ];

  return (
    <section id="contact" className="portfolio-section">
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
            <Sparkles className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} />
            <span className="portfolio-eyebrow-label">Get in Touch</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 tracking-tight text-slate-50">
            <span className="text-slate-50">Let&apos;s</span>{' '}
            <span className="bg-gradient-to-r from-slate-50 via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400/95 font-normal max-w-3xl mx-auto leading-relaxed tracking-wide">
            Have a project in mind? Let's collaborate and create something amazing together
          </p>
        </motion.div>

        {/* Centered Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="portfolio-panel portfolio-panel-lg p-8">
            <h3 className="text-2xl font-bold mb-8 text-white text-center flex items-center justify-center gap-3 tracking-tight">
              <Send className="w-5 h-5 text-primary-400" strokeWidth={1.75} />
              Get In Touch
            </h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-primary-400 mx-auto mb-4" strokeWidth={1.25} />
                <h4 className="text-xl font-semibold text-white mb-2">Message Sent!</h4>
                <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input with Floating Label */}
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={() => handleBlur('name')}
                    required
                    className="w-full px-4 py-4 rounded-lg text-white bg-white/[0.04] border border-white/[0.08] focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:shadow-lg focus:shadow-primary-500/15 transition-all duration-300 text-sm peer"
                    placeholder=" "
                  />
                  <motion.label
                    htmlFor="name"
                    animate={{
                      y: isFieldActive('name') ? -28 : 0,
                      scale: isFieldActive('name') ? 0.85 : 1,
                      color: isFieldActive('name') ? '#3b82f6' : '#9ca3af'
                    }}
                    className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none bg-[#0b101c] px-1"
                  >
                    Your Name
                  </motion.label>
                </div>

                {/* Email Input with Floating Label */}
                <div className="relative">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    required
                    className="w-full px-4 py-4 rounded-lg text-white bg-white/[0.04] border border-white/[0.08] focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:shadow-lg focus:shadow-primary-500/15 transition-all duration-300 text-sm peer"
                    placeholder=" "
                  />
                  <motion.label
                    htmlFor="email"
                    animate={{
                      y: isFieldActive('email') ? -28 : 0,
                      scale: isFieldActive('email') ? 0.85 : 1,
                      color: isFieldActive('email') ? '#3b82f6' : '#9ca3af'
                    }}
                    className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none bg-[#0b101c] px-1"
                  >
                    Email Address
                  </motion.label>
                </div>

                {/* Message Input with Floating Label */}
                <div className="relative">
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={() => handleBlur('message')}
                    required
                    rows={5}
                    className="w-full px-4 py-4 rounded-lg text-white bg-white/[0.04] border border-white/[0.08] focus:border-primary-500 focus:ring-1 focus:ring-primary-500/30 focus:shadow-lg focus:shadow-primary-500/15 transition-all duration-300 text-sm resize-none peer"
                    placeholder=" "
                  />
                  <motion.label
                    htmlFor="message"
                    animate={{
                      y: isFieldActive('message') ? -28 : 0,
                      scale: isFieldActive('message') ? 0.85 : 1,
                      color: isFieldActive('message') ? '#3b82f6' : '#9ca3af'
                    }}
                    className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-300 pointer-events-none bg-[#0b101c] px-1"
                  >
                    Your Message
                  </motion.label>
                </div>

                {/* Error message */}
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg text-white font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/35 ring-1 ring-white/10"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-slate-500 text-sm mb-4 tracking-wide">Or connect with me on social media</p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-primary-500/10 hover:border-primary-500/35 transition-all duration-300 flex items-center justify-center group ring-1 ring-transparent hover:ring-primary-500/20"
                >
                  <social.icon className="w-5 h-5 text-slate-400 group-hover:text-primary-300 transition-colors" strokeWidth={1.75} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
