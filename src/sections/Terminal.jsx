import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Send, Command } from 'lucide-react';

/* ── Commands defined outside component — stable reference ── */
const COMMANDS = {
  help: {
    response: `Available commands:
  help     - Show this help message
  about    - Learn about me
  skills   - View my technical skills
  projects - See my portfolio projects
  contact  - Get my contact information
  clear    - Clear the terminal`,
    delay: 400,
  },
  about: {
    response: `Hi! I'm Rameez — a Full Stack Developer specializing in the MERN stack.
I build full-stack web applications with clean code and modern practices.
Experienced in REST APIs, responsive frontends, and scalable backend systems.
Quick learner, team player, currently expanding into DevOps.`,
    delay: 700,
  },
  skills: {
    response: `Technical Skills:
  Frontend : React.js, JavaScript, HTML, CSS
  Backend  : Node.js, Express.js, REST APIs
  Database : MongoDB
  Tools    : Git, GitHub, Docker (learning)
  Learning : DevOps, deployment practices`,
    delay: 800,
  },
  projects: {
    response: `Featured Projects:
  • Portfolio Website    — React.js, CSS, HTML
  • Task Manager App     — React, Node.js, MongoDB, Express.js
  • E-Commerce Frontend  — React.js, JavaScript
  • REST API Project     — Node.js, Express.js, MongoDB

Scroll to the Projects section to view full details.`,
    delay: 600,
  },
  contact: {
    response: `Get in touch:
  Email    : muhammadrameezy@gmail.com
  Phone    : +92 304 1109928
  Location : Pakistan
  Status   : Available for freelance work`,
    delay: 500,
  },
  clear: { response: null, delay: 0 },
};

const BOOT_SEQUENCE = [
  { type: 'system', text: 'Initializing developer-terminal v1.0.0...' },
  { type: 'system', text: 'Connected. Type "help" to see available commands.' },
];

const Terminal = () => {
  const [input, setInput]       = useState('');
  const [history, setHistory]   = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [booted, setBooted]     = useState(false);
  const terminalRef = useRef(null);
  const inputRef    = useRef(null);

  /* ── Boot sequence on mount ── */
  useEffect(() => {
    let t1, t2, t3, t4;

    t1 = setTimeout(() => {
      setHistory([BOOT_SEQUENCE[0]]);
    }, 400);

    t2 = setTimeout(() => {
      setHistory([BOOT_SEQUENCE[0], BOOT_SEQUENCE[1]]);
    }, 900);

    /* Auto-type and run "help" after boot */
    t3 = setTimeout(() => {
      let typed = '';
      const word = 'help';
      const typeInterval = setInterval(() => {
        typed += word[typed.length];
        setInput(typed);
        if (typed === word) {
          clearInterval(typeInterval);
          t4 = setTimeout(() => {
            setInput('');
            setIsTyping(true);
            setTimeout(() => {
              setHistory(prev => [
                ...prev,
                { type: 'command', text: 'help' },
                { type: 'response', text: COMMANDS.help.response },
              ]);
              setIsTyping(false);
              setBooted(true);
            }, COMMANDS.help.delay);
          }, 300);
        }
      }, 80);
    }, 1400);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  /* ── Auto-scroll ── */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  /* ── Focus input after boot ── */
  useEffect(() => {
    // preventScroll: true — focus without scrolling page to terminal
    if (booted && inputRef.current) inputRef.current.focus({ preventScroll: true });
  }, [booted]);

  /* ── Process command ── */
  const handleCommand = (command) => {
    const cmd = command.toLowerCase().trim();

    if (cmd === 'clear') {
      setHistory([
        { type: 'system', text: 'Terminal cleared.' },
        { type: 'response', text: COMMANDS.help.response },
      ]);
      return;
    }

    const data = COMMANDS[cmd];
    setIsTyping(true);

    setTimeout(() => {
      setHistory(prev => [
        ...prev,
        { type: 'command', text: command },
        {
          type: data ? 'response' : 'error',
          text: data
            ? data.response
            : `Command not found: "${command}". Type "help" for available commands.`,
        },
      ]);
      setIsTyping(false);
    }, data?.delay ?? 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      handleCommand(input.trim());
      setInput('');
    }
  };

  return (
    <section id="terminal" className="portfolio-section">
      <div className="portfolio-ambient" aria-hidden />
      <div className="portfolio-grid"   aria-hidden />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="portfolio-eyebrow" style={{ marginBottom: 0 }}>
              <Command className="w-4 h-4 text-blue-400/90" strokeWidth={1.75} />
              <span className="portfolio-eyebrow-label">Interactive</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 tracking-tight text-slate-50">
            Try The{' '}
            <span className="bg-gradient-to-r from-slate-50 via-blue-200 to-blue-400 bg-clip-text text-transparent">
              Terminal
            </span>
          </h2>
          <p className="text-lg text-slate-400/90 max-w-xl mx-auto tracking-wide">
            Type commands to explore my portfolio interactively
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="portfolio-panel portfolio-panel-lg overflow-hidden"
          onClick={() => inputRef.current?.focus()}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
            </div>
            <div className="flex items-center gap-2 mx-auto">
              <TerminalIcon className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400 font-mono text-xs">rameez@portfolio ~ developer-terminal</span>
            </div>
          </div>

          {/* Output area */}
          <div
            ref={terminalRef}
            className="h-80 overflow-y-auto px-5 py-4 font-mono text-sm space-y-2 cursor-text"
            style={{ scrollbarWidth: 'thin' }}
          >
            {history.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="leading-relaxed whitespace-pre-wrap"
                style={{
                  color:
                    item.type === 'command' ? '#60a5fa'
                    : item.type === 'error'   ? '#f87171'
                    : item.type === 'system'  ? '#64748b'
                    : '#94a3b8',
                }}
              >
                {item.type === 'command' && (
                  <span className="text-emerald-400 mr-1 select-none">❯</span>
                )}
                {item.text}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 text-slate-500"
              >
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </motion.div>
            )}
          </div>

          {/* Input row */}
          <div className="border-t border-white/[0.07] px-5 py-3.5 bg-white/[0.01]">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-sm select-none">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={booted ? 'Type a command...' : ''}
                disabled={isTyping}
                className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono text-sm placeholder:text-slate-600 caret-blue-400"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                type="submit"
                disabled={isTyping || !input.trim()}
                className="p-2 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:bg-blue-500/10 hover:border-blue-500/30 transition-all disabled:opacity-30"
              >
                <Send className="w-4 h-4 text-blue-400" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Hint chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mt-5"
        >
          {['help', 'about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => { setInput(cmd); inputRef.current?.focus(); }}
              className="px-3 py-1 rounded-full font-mono text-xs border border-white/[0.08] text-slate-500 hover:text-blue-300 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all"
            >
              {cmd}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Terminal;
