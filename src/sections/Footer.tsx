import { Code2, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PORTFOLIO_LINKS } from '../data/portfolio';

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-[rgba(255,255,255,0.08)] bg-[#030305]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Identity */}
          <div className="text-center md:text-left">
            <span className="text-white font-bold text-lg tracking-wider font-['Geist']">
              MUHIL AMUTHAN M
            </span>
            <p className="text-[rgba(255,255,255,0.55)] text-xs font-['Geist_Mono'] mt-1">
              B.E. ECE Student | ML Engineer Aspirant | Full-Stack Developer | IoT Innovator
            </p>
          </div>

          {/* Social Profiles & Resume */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
            <a
              href={PORTFOLIO_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.5)] hover:text-white transition-colors flex items-center gap-1.5 text-xs font-['Geist_Mono']"
              aria-label="GitHub profile"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <a
              href={PORTFOLIO_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.5)] hover:text-[#2252FF] transition-colors flex items-center gap-1.5 text-xs font-['Geist_Mono']"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href={PORTFOLIO_LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.5)] hover:text-[#FFA116] transition-colors flex items-center gap-1.5 text-xs font-['Geist_Mono']"
              aria-label="LeetCode profile"
            >
              <Code2 size={16} />
              <span>LeetCode (100+)</span>
            </a>
            <a
              href={`mailto:${PORTFOLIO_LINKS.email}`}
              className="text-[rgba(255,255,255,0.5)] hover:text-[#D0FF71] transition-colors flex items-center gap-1.5 text-xs font-['Geist_Mono']"
              aria-label="Email Muhil"
            >
              <Mail size={16} />
              <span>Email</span>
            </a>
            <a
              href={PORTFOLIO_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.5)] hover:text-[#FFCD00] transition-colors flex items-center gap-1.5 text-xs font-['Geist_Mono']"
              aria-label="Download Resume"
            >
              <FileText size={16} />
              <span>Resume</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono']">
              &copy; {new Date().getFullYear()} Muhil Amuthan M. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
