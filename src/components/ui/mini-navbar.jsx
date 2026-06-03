import React, { useState, useEffect, useRef } from 'react';

/* ─── Nav link with vertical-slide hover animation ─── */
const AnimatedNavLink = ({ href, children, onClick, isActive }) => (
  /*
    a tag is the group trigger — NOT overflow:hidden, so the active dot shows.
    The clipping happens on the inner wrapper div only.
  */
  <a
    href={href}
    onClick={onClick}
    className="group relative"
    style={{ textDecoration: 'none', cursor: 'pointer', userSelect: 'none' }}
  >
    {/* ── Clip window (exactly one line tall) ── */}
    <div style={{ overflow: 'hidden', height: 20 }}>
      {/* ── Sliding stack: default on top, hover below ── */}
      <div
        className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2"
      >
        {/* Visible by default */}
        <div style={{
          height: 20,
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.85rem',
          fontWeight: isActive ? 600 : 500,
          letterSpacing: '0.03em',
          color: isActive ? '#ffffff' : 'rgba(203,213,225,0.78)',
          whiteSpace: 'nowrap',
        }}>
          {children}
        </div>
        {/* Slides into view on hover */}
        <div style={{
          height: 20,
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.03em',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>
          {children}
        </div>
      </div>
    </div>

    {/* Active dot — outside clip div so it's always visible */}
    {isActive && (
      <span style={{
        position: 'absolute',
        bottom: -6,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: '#60a5fa',
        boxShadow: '0 0 8px rgba(96,165,250,0.9), 0 0 14px rgba(96,165,250,0.5)',
      }} />
    )}
  </a>
);

/* ════════════════════════════════════════════════════
   MiniNavbar
════════════════════════════════════════════════════ */
export function MiniNavbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [isRounded, setIsRounded] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const shapeTimeoutRef = useRef(null);

  /* Border-radius: pill when closed, rounded-xl when open */
  useEffect(() => {
    if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current);
    if (isOpen) {
      setIsRounded(false);
    } else {
      shapeTimeoutRef.current = setTimeout(() => setIsRounded(true), 300);
    }
    return () => { if (shapeTimeoutRef.current) clearTimeout(shapeTimeoutRef.current); };
  }, [isOpen]);

  /* Active section detection on scroll */
  useEffect(() => {
    const handleScroll = () => {
      const ids = ['home', 'about', 'skills', 'projects', 'what-i-build', 'contact'];
      const offset = window.scrollY + 130;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (offset >= offsetTop && offset < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  const navLinks = [
    { label: 'Home',         id: 'home'         },
    { label: 'About',        id: 'about'        },
    { label: 'Skills',       id: 'skills'       },
    { label: 'Projects',     id: 'projects'     },
    { label: 'What I Build', id: 'what-i-build' },
    { label: 'Contact',      id: 'contact'      },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(8,13,28,0.85)',
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow:
          '0 8px 32px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(59,130,246,0.14)',
        borderRadius: isRounded ? 9999 : '1rem',
        transition: 'border-radius 0ms, box-shadow 0.3s ease',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        paddingTop: '0.6rem',
        paddingBottom: '0.6rem',
        width: 'calc(100% - 2rem)',
        maxWidth: 700,
        overflow: 'visible',
      }}
    >
      {/* Top flare line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '45%',
          height: 1,
          borderRadius: 9999,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(96,165,250,0.7) 40%, rgba(167,139,250,0.5) 60%, transparent 100%)',
          animation: 'navFlare 3.5s ease-in-out infinite',
        }}
      />

      {/* ── Main row ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Desktop nav */}
        <nav
          className="hidden sm:flex"
          style={{ gap: '1.8rem', alignItems: 'center' }}
        >
          {/* </> Logo + separator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginRight: 4,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#60a5fa',
                textShadow: '0 0 10px rgba(96,165,250,0.7)',
                letterSpacing: '-0.5px',
                userSelect: 'none',
              }}
            >
              &lt;/&gt;
            </span>
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'rgba(96,165,250,0.45)',
                flexShrink: 0,
              }}
            />
          </div>

          {navLinks.map((link) => (
            <AnimatedNavLink
              key={link.id}
              href={`#${link.id}`}
              isActive={activeSection === link.id}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.id);
              }}
            >
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        {/* Mobile: label + hamburger */}
        <div
          className="flex sm:hidden items-center justify-between"
          style={{ width: '100%' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#60a5fa',
                textShadow: '0 0 8px rgba(96,165,250,0.6)',
              }}
            >
              &lt;/&gt;
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(203,213,225,0.55)',
              }}
            >
              Navigate
            </span>
          </div>

          <button
            onClick={() => setIsOpen((p) => !p)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2rem', height: '2rem',
              color: 'rgba(203,213,225,0.9)',
              background: 'none', border: 'none',
              cursor: 'pointer', padding: 0,
            }}
          >
            {isOpen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className="sm:hidden"
        style={{
          width: '100%',
          overflow: 'hidden',
          maxHeight: isOpen ? '340px' : '0px',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.32s ease, opacity 0.25s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        <div
          style={{
            height: 1,
            background: 'rgba(255,255,255,0.07)',
            margin: '0.65rem 0',
          }}
        />
        <nav
          style={{
            display: 'flex', flexDirection: 'column',
            gap: '0.2rem', paddingBottom: '0.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
              style={{
                display: 'block',
                padding: '0.55rem 0.5rem',
                fontSize: '0.88rem',
                fontWeight: activeSection === link.id ? 600 : 500,
                color: activeSection === link.id ? '#fff' : 'rgba(203,213,225,0.8)',
                textAlign: 'center',
                borderRadius: '0.5rem',
                background: activeSection === link.id ? 'rgba(59,130,246,0.1)' : 'transparent',
                transition: 'all 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  activeSection === link.id ? 'rgba(59,130,246,0.1)' : 'transparent';
                e.currentTarget.style.color =
                  activeSection === link.id ? '#fff' : 'rgba(203,213,225,0.8)';
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default MiniNavbar;
