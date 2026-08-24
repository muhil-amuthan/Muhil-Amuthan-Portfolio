import { Code2, Github, Linkedin, Mail, Heart, Coffee } from 'lucide-react';
import { PORTFOLIO_LINKS } from '../data/portfolio';

export default function Footer() {
  const visitorCount = typeof window !== 'undefined'
    ? (() => {
        const count = parseInt(localStorage.getItem('visitorCount') || '0');
        const visited = sessionStorage.getItem('visited');
        if (!visited) {
          localStorage.setItem('visitorCount', String(count + 1));
          sessionStorage.setItem('visited', 'true');
          return count + 1;
        }
        return count;
      })()
    : 0;

  return (
    <footer className="relative py-12 border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <span className="text-white font-bold text-lg tracking-wider font-['Geist']">MUHIL</span>
            <p className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono'] mt-1">
              Code. Learn. Ship. Repeat.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a
              href={PORTFOLIO_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
              aria-label="GitHub profile"
            >
              <Github size={20} />
            </a>
            <a
              href={PORTFOLIO_LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
              aria-label="LeetCode profile"
            >
              <Code2 size={20} />
            </a>
            <a
              href={PORTFOLIO_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${PORTFOLIO_LINKS.email}`}
              className="text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
              aria-label="Email Muhil"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Copyright & Visitor Count */}
          <div className="text-center md:text-right">
            <p className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist'] flex items-center gap-1 justify-center md:justify-end">
              Built with <Heart size={12} className="text-red-500" /> & <Coffee size={12} className="text-[#FFCD00]" /> by Muhil Amuthan
            </p>
            <p className="text-[rgba(255,255,255,0.3)] text-[10px] font-['Geist_Mono'] mt-1">
              &copy; 2026 Muhil Amuthan M | Visitor #{visitorCount}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
