import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Profiles', href: '/#coding-profiles' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Certifications', href: '/#certifications' },
  { name: 'Timeline', href: '/#timeline' },
  { name: 'ChatBot', href: '/#chatbot' },
  { name: 'Contact', href: '/#contact' },
];

const sectionIds = navLinks.map((l) => l.href.replace('/#', ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  // ---------- Scroll state + progress bar ----------
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ---------- Scroll-spy: highlight the section in view ----------
  useEffect(() => {
    if (location.pathname !== '/') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' } // trigger near viewport middle
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [location.pathname]);

  // ---------- Close mobile menu on route change ----------
  useEffect(() => setMobileOpen(false), [location]);

  // ---------- Body scroll lock + Escape to close ----------
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false);
    if (mobileOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // ---------- Scroll to hash AFTER navigation completes ----------
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      // wait a tick so the target page has rendered
      const id = location.hash.replace('#', '');
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }, [location.pathname, location.hash]);

  // ---------- Smooth anchor helper ----------
  const scrollToSection = useCallback(
    (href: string) => {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate(href); // hash effect above handles the scroll after render
        return;
      }
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    },
    [location.pathname, navigate]
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  const linkClass = (href: string) => {
    const id = href.replace('/#', '');
    const active = location.pathname === '/' && activeSection === id;
    return `text-[13px] font-['Geist'] transition-colors duration-200 relative group whitespace-nowrap ${
      active ? 'text-white' : 'text-[rgba(255,255,255,0.6)] hover:text-white'
    }`;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(3,3,5,0.95)] border-b border-[rgba(255,255,255,0.08)]'
            : 'bg-[rgba(3,3,5,0.8)] border-b border-[rgba(255,255,255,0.04)]'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#2252FF] to-[#8C5AFF] transition-[width] duration-100 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white font-bold text-xl tracking-wider font-['Geist']"
          >
            MUHIL
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={linkClass(link.href)}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-[#2252FF] transition-all duration-300 ${
                    location.pathname === '/' && activeSection === link.href.replace('/#', '')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[rgba(255,255,255,0.7)] hover:text-white text-[13px] font-['Geist'] transition-colors"
              aria-label="View Resume"
            >
              <FileText size={14} className="text-[#FFCD00]" />
              Resume
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="text-white text-[13px] font-['Geist'] border border-[rgba(255,255,255,0.2)] rounded-[24px] px-5 py-2 hover:border-[#2252FF] hover:bg-[rgba(34,82,255,0.1)] transition-all duration-200"
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.06)] active:scale-95 transition-transform"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — staggered entrance */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(3,3,5,0.98)] backdrop-blur-xl flex flex-col items-center justify-center gap-1 lg:hidden overflow-y-auto py-16 px-6">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white text-xl sm:text-2xl font-['Geist'] font-medium hover:text-[#2252FF] transition-colors py-2 px-6 min-h-[44px] flex items-center active:scale-95 touch-manipulation animate-[navIn_0.35s_ease_both]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {link.name}
            </a>
          ))}
          <div
            className="flex flex-col items-center gap-4 mt-4 pt-6 border-t border-[rgba(255,255,255,0.08)] w-48 animate-[navIn_0.35s_ease_both]"
            style={{ animationDelay: `${navLinks.length * 40}ms` }}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white text-base font-['Geist'] border border-[rgba(255,205,0,0.3)] rounded-[24px] px-6 py-2.5 hover:bg-[rgba(255,205,0,0.08)] transition-all"
            >
              <FileText size={16} className="text-[#FFCD00]" />
              Resume
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="text-white text-base font-['Geist'] border border-[rgba(255,255,255,0.2)] rounded-[24px] px-8 py-2.5 hover:border-[#2252FF] transition-all"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}

      {/* One-time keyframe for the stagger animation */}
      <style>{`
        @keyframes navIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
