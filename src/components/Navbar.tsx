import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Certifications', href: '/#certifications' },
  { name: 'Profiles', href: '/#coding-profiles' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(3,3,5,0.95)] border-b border-[rgba(255,255,255,0.08)]'
            : 'bg-[rgba(3,3,5,0.8)] border-b border-[rgba(255,255,255,0.04)]'
        }`}
        style={{ backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-white font-bold text-xl tracking-wider font-['Geist']">
            MUHIL
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[rgba(255,255,255,0.6)] hover:text-white text-[13px] font-['Geist'] transition-colors duration-200 relative group whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#2252FF] transition-all duration-300 group-hover:w-full" />
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
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[rgba(3,3,5,0.98)] flex flex-col items-center justify-center gap-6 lg:hidden overflow-y-auto py-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white text-2xl font-['Geist'] font-semibold hover:text-[#2252FF] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col items-center gap-4 mt-4 pt-6 border-t border-[rgba(255,255,255,0.08)] w-48">
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
    </>
  );
}
