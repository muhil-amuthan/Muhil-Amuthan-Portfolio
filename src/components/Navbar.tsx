import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/#home', id: 'home' },
  { name: 'About', href: '/#about', id: 'about' },
  { name: 'Skills', href: '/#skills', id: 'skills' },
  { name: 'Experience', href: '/#experience', id: 'experience' },
  { name: 'Projects', href: '/#projects', id: 'projects' },
  { name: 'Certifications', href: '/#certifications', id: 'certifications' },
  { name: 'Contact', href: '/#contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  // Scroll state + progress bar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') return;
    const sectionIds = navLinks.map((l) => l.id);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  // Body scroll lock + Escape key to close
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // Smooth scroll helper
  const scrollToSection = useCallback(
    (href: string) => {
      const id = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate(href);
        return;
      }
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveSection('home');
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
        setActiveSection(id);
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

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(3,3,5,0.92)] border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[rgba(3,3,5,0.7)] border-b border-[rgba(255,255,255,0.04)]'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#2252FF] to-[#8B5CF6] transition-[width] duration-100 ease-linear pointer-events-none"
          style={{ width: `${progress * 100}%` }}
        />

        <div className="max-w-[1280px] mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2252FF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-sm tracking-wider font-['Geist'] shadow-[0_0_15px_rgba(34,82,255,0.4)] group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="text-white font-bold text-lg tracking-wider font-['Geist'] group-hover:text-[#2252FF] transition-colors">
              MUHIL AMUTHAN
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-[13px] font-['Geist'] transition-all duration-200 relative group whitespace-nowrap py-1 ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-[rgba(255,255,255,0.65)] hover:text-white font-medium'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#2252FF] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[rgba(255,255,255,0.8)] hover:text-white text-[13px] font-['Geist'] font-medium px-3.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,205,0,0.4)] hover:bg-[rgba(255,205,0,0.06)] transition-all"
              aria-label="View Resume PDF"
            >
              <FileText size={14} className="text-[#FFCD00]" />
              Resume
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="text-white text-[13px] font-['Geist'] font-medium bg-[#2252FF] hover:bg-[#1a44e0] px-4 py-1.5 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(34,82,255,0.3)] hover:shadow-[0_0_20px_rgba(34,82,255,0.5)]"
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

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(3,3,5,0.98)] backdrop-blur-2xl flex flex-col items-center justify-center gap-4 lg:hidden overflow-y-auto py-16 px-6">
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xl font-['Geist'] font-medium transition-colors py-2 px-6 min-h-[44px] flex items-center rounded-xl w-full justify-center ${
                    isActive
                      ? 'text-white bg-[rgba(34,82,255,0.15)] border border-[rgba(34,82,255,0.3)] font-semibold'
                      : 'text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-3 mt-4 pt-6 border-t border-[rgba(255,255,255,0.08)] w-64">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white text-sm font-['Geist'] border border-[rgba(255,205,0,0.3)] rounded-xl w-full py-3 hover:bg-[rgba(255,205,0,0.08)] transition-all font-medium"
            >
              <FileText size={16} className="text-[#FFCD00]" />
              View Resume
            </a>
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, '/#contact')}
              className="text-white text-sm font-['Geist'] bg-[#2252FF] rounded-xl w-full py-3 hover:bg-[#1a44e0] transition-all text-center font-medium shadow-[0_0_20px_rgba(34,82,255,0.4)]"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </>
  );
}
