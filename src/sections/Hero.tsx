import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Code2, Sparkles, Terminal } from 'lucide-react';
import { PORTFOLIO_LINKS } from '../data/portfolio';

const rotatingRoles = [
  'ML Engineer Aspirant',
  'Full-Stack Developer',
  'IoT & Embedded Innovator',
  'Java DSA Practitioner',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = rotatingRoles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText.length < current.length) {
      timer = setTimeout(() => {
        setTypedText(current.slice(0, typedText.length + 1));
      }, 70);
    } else if (!isDeleting && typedText.length === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText.length > 0) {
      timer = setTimeout(() => {
        setTypedText(current.slice(0, typedText.length - 1));
      }, 40);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* Subtle background ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(34, 82, 255, 0.4), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left Hero Content */}
          <div className="flex-1 w-full max-w-[680px] text-center lg:text-left">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(34,82,255,0.08)] border border-[rgba(34,82,255,0.25)] text-xs font-['Geist_Mono'] text-[rgba(255,255,255,0.85)] mb-6 shadow-[0_0_15px_rgba(34,82,255,0.1)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#D0FF71] animate-pulse" />
              <span>Available for Technical Internships &amp; Collaborations</span>
            </motion.div>

            {/* Candidate Name */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Geist'] leading-[1.08] mb-3">
                MUHIL AMUTHAN M
              </h1>
            </motion.div>

            {/* Core Professional Identity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mb-4"
            >
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[rgba(255,255,255,0.9)] font-['Geist']">
                B.E. ECE Student | ML Engineer Aspirant | Full-Stack Developer | IoT Innovator
              </h2>
            </motion.div>

            {/* Typewriter Dynamic Interest */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 mb-6 justify-center lg:justify-start"
            >
              <Terminal size={16} className="text-[#2252FF]" />
              <span className="text-sm sm:text-base font-['Geist_Mono'] text-[#2252FF] font-medium">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            {/* Concise Mission Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="text-[rgba(255,255,255,0.7)] text-base sm:text-lg font-['Geist'] leading-relaxed mb-8 max-w-[600px] mx-auto lg:mx-0"
            >
              I build practical applications that combine Machine Learning, Full-Stack Development, and IoT to solve real-world problems.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3.5 mb-8 justify-center lg:justify-start"
            >
              <button
                onClick={() => handleScroll('projects')}
                className="group bg-[#2252FF] hover:bg-[#1a44e0] text-white px-6 py-3 rounded-xl font-['Geist'] text-sm font-semibold flex items-center gap-2 transition-all duration-200 shadow-[0_0_25px_rgba(34,82,255,0.4)] hover:shadow-[0_0_35px_rgba(34,82,255,0.6)] active:scale-95"
              >
                <span>View Projects</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={PORTFOLIO_LINKS.resume}
                download="Muhil_Amuthan_Resume.pdf"
                className="glass-card px-5 py-3 rounded-xl text-white font-['Geist'] text-sm font-medium flex items-center gap-2 hover:border-[rgba(255,205,0,0.4)] hover:bg-[rgba(255,205,0,0.06)] transition-all duration-200 active:scale-95"
                aria-label="Download Resume PDF"
              >
                <Download size={16} className="text-[#FFCD00]" />
                <span>Download Resume</span>
              </a>
            </motion.div>

            {/* Verified Profile Links (Hero Integration) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.6 }}
              className="flex flex-wrap items-center gap-2.5 justify-center lg:justify-start pt-2 border-t border-[rgba(255,255,255,0.08)]"
            >
              <span className="text-xs font-['Geist_Mono'] text-[rgba(255,255,255,0.4)] uppercase tracking-wider mr-1">
                Profiles:
              </span>

              <a
                href={PORTFOLIO_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] hover:border-white hover:bg-white/5 text-white text-xs font-['Geist'] font-medium transition-colors"
                aria-label="Muhil's GitHub Profile"
              >
                <Github size={14} />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[rgba(34,82,255,0.3)] bg-[rgba(34,82,255,0.05)] hover:border-[#2252FF] hover:bg-[rgba(34,82,255,0.15)] text-white text-xs font-['Geist'] font-medium transition-colors"
                aria-label="Muhil's LinkedIn Profile"
              >
                <Linkedin size={14} className="text-[#2252FF]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PORTFOLIO_LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[rgba(255,161,22,0.3)] bg-[rgba(255,161,22,0.05)] hover:border-[#FFA116] hover:bg-[rgba(255,161,22,0.12)] text-white text-xs font-['Geist'] font-medium transition-colors"
                aria-label="Muhil's LeetCode Profile"
              >
                <Code2 size={14} className="text-[#FFA116]" />
                <span>LeetCode</span>
                <span className="ml-0.5 text-[10px] font-['Geist_Mono'] px-1.5 py-0.2 rounded bg-[rgba(255,161,22,0.2)] text-[#FFA116] font-bold">
                  100+ Solved
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative shrink-0"
          >
            <div className="relative w-[240px] h-[310px] sm:w-[280px] sm:h-[370px] lg:w-[320px] lg:h-[420px]">
              {/* Outer decorative card border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2252FF]/30 via-transparent to-[#8B5CF6]/30 p-[1px] shadow-[0_0_50px_rgba(34,82,255,0.2)]">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#070b14]">
                  <img
                    src="/Profile_Picture_New.jpeg"
                    alt="Muhil Amuthan M — B.E. ECE Student & ML Engineer Aspirant"
                    className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02]"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Verified Student Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-[#030305]/90 border border-[rgba(255,255,255,0.15)] shadow-lg flex items-center gap-2">
                <Sparkles size={12} className="text-[#FFCD00]" />
                <span className="text-[11px] font-['Geist_Mono'] text-white font-medium">
                  3rd Year • B.E. ECE (2024–2028)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section 6: Verified Achievement Statistics Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 sm:mt-20 pt-8 border-t border-[rgba(255,255,255,0.06)] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          <div className="glass-card p-5 text-center group hover:border-[rgba(255,161,22,0.4)] transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFA116] font-['Geist'] mb-1">
              100+
            </div>
            <div className="text-xs sm:text-sm text-white font-['Geist'] font-medium mb-0.5">
              LeetCode Problems Solved
            </div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)] font-['Geist_Mono']">
              Java Data Structures &amp; Algorithms
            </div>
          </div>

          <div className="glass-card p-5 text-center group hover:border-[rgba(208,255,113,0.4)] transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#D0FF71] font-['Geist'] mb-1">
              16+
            </div>
            <div className="text-xs sm:text-sm text-white font-['Geist'] font-medium mb-0.5">
              GitHub Repositories
            </div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)] font-['Geist_Mono']">
              Public Open-Source Projects
            </div>
          </div>

          <div className="glass-card p-5 text-center group hover:border-[rgba(255,205,0,0.4)] transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFCD00] font-['Geist'] mb-1">
              Top 25
            </div>
            <div className="text-xs sm:text-sm text-white font-['Geist'] font-medium mb-0.5">
              Quest Global Ingenium 2026
            </div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)] font-['Geist_Mono']">
              Selected from 3,700+ Teams
            </div>
          </div>

          <div className="glass-card p-5 text-center group hover:border-[rgba(34,82,255,0.4)] transition-all">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2252FF] font-['Geist'] mb-1">
              3rd Year
            </div>
            <div className="text-xs sm:text-sm text-white font-['Geist'] font-medium mb-0.5">
              B.E. ECE (2024 – 2028)
            </div>
            <div className="text-[11px] text-[rgba(255,255,255,0.4)] font-['Geist_Mono']">
              V.S.B. Engineering College
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
