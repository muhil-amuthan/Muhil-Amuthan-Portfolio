import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, FileText, Download, Code2 } from 'lucide-react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const roles = ['AI/ML Engineer', 'Full-Stack Developer', 'Federated Learning Researcher', 'IoT Innovator'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypedText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentRole.slice(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex, roles]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Light leak effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 50% -10%, rgba(0, 60, 255, 0.08), transparent)',
          filter: 'blur(100px)',
          animation: 'pulseGlow 6s ease-in-out infinite alternate',
        }}
      />

      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Aurora gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(2, 19, 33, 0.9), transparent)',
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-8 w-full py-24 pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left content */}
          <div className="flex-1 max-w-[640px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-[2px] h-5 bg-[#FFCD00]" />
              <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
                INNOVATING WITH PURPOSE.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold leading-[1.1] font-['Geist'] luminous-sweep-headline mb-6"
            >
              A Tech-Driven, Collaborative, and Innovation-Focused Engineering Student
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-4"
            >
              <span className="text-[#2252FF] font-['Geist_Mono'] text-lg">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-[rgba(255,255,255,0.7)] text-lg font-['Geist'] leading-relaxed mb-8 max-w-[560px]"
            >
              Hi, I'm <span className="text-white font-semibold">Muhil Amuthan M</span>. An aspiring AI/ML and software engineer passionate about building impactful, scalable solutions that address real-world challenges and create meaningful change.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <button
                onClick={() => handleScroll('projects')}
                className="group bg-[#2252FF] text-white px-7 py-3.5 rounded-lg font-['Geist'] text-[15px] font-medium flex items-center gap-2 hover:bg-[#3952FF] transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,82,255,0.4)]"
              >
                Explore My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScroll('contact')}
                className="glass-card text-white px-5 py-3.5 rounded-lg font-['Geist'] text-sm flex items-center gap-2 hover:border-[rgba(34,82,255,0.4)] hover:shadow-[0_0_20px_rgba(34,82,255,0.15)] transition-all duration-300"
              >
                Let's Talk
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card text-white px-5 py-2.5 rounded-lg font-['Geist'] text-sm flex items-center gap-2 hover:border-[rgba(255,205,0,0.4)] hover:shadow-[0_0_20px_rgba(255,205,0,0.1)] transition-all duration-300"
                aria-label="View Resume PDF"
              >
                <FileText size={15} className="text-[#FFCD00]" />
                View Resume
              </a>
              <a
                href="/resume.pdf"
                download="Muhil_Amuthan_Resume.pdf"
                className="glass-card text-white px-5 py-2.5 rounded-lg font-['Geist'] text-sm flex items-center gap-2 hover:border-[rgba(208,255,113,0.4)] hover:shadow-[0_0_20px_rgba(208,255,113,0.1)] transition-all duration-300"
                aria-label="Download Resume PDF"
              >
                <Download size={15} className="text-[#D0FF71]" />
                Download Resume
              </a>
              <a
                href="https://github.com/muhil-amuthan"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card text-white px-4 py-2.5 rounded-lg font-['Geist'] text-sm flex items-center gap-2 hover:border-[rgba(34,82,255,0.4)] hover:shadow-[0_0_20px_rgba(34,82,255,0.15)] transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={15} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/muhil-amuthan-m"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card text-white px-4 py-2.5 rounded-lg font-['Geist'] text-sm flex items-center gap-2 hover:border-[rgba(34,82,255,0.4)] hover:shadow-[0_0_20px_rgba(34,82,255,0.15)] transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href="https://leetcode.com/u/Muhil-Amuthan_M"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card text-white px-4 py-2.5 rounded-lg font-['Geist'] text-sm flex items-center gap-2 hover:border-[rgba(255,161,22,0.4)] hover:shadow-[0_0_20px_rgba(255,161,22,0.1)] transition-all duration-300"
                aria-label="LeetCode Profile"
              >
                <Code2 size={15} className="text-[#FFA116]" />
                LeetCode
              </a>
            </motion.div>
          </div>

          {/* Right - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative shrink-0"
          >
            <div className="relative w-[280px] h-[360px] lg:w-[340px] lg:h-[440px]">
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(34, 82, 255, 0.3), transparent 70%)',
                  filter: 'blur(40px)',
                  transform: 'scale(1.2)',
                }}
              />
              {/* Orbit ring */}
              <div
                className="absolute inset-[-20px] rounded-full border border-[rgba(34,82,255,0.2)]"
                style={{ animation: 'orbit 20s linear infinite' }}
              />
              {/* Photo */}
              <img
                src="/profile-photo.jpg"
                alt="Muhil Amuthan M — AI/ML Engineer and Full Stack Developer"
                className="relative w-full h-full object-cover object-top rounded-2xl"
                style={{
                  boxShadow: '0 0 60px rgba(34, 82, 255, 0.25), 0 0 120px rgba(34, 82, 255, 0.1)',
                }}
              />
              {/* Floating badges */}
              <div
                className="absolute -top-4 -right-4 glass-card px-3 py-1.5 text-xs font-['Geist_Mono'] text-[#D0FF71]"
                style={{ animation: 'float 3s ease-in-out infinite' }}
              >
                Python
              </div>
              <div
                className="absolute -bottom-4 -left-4 glass-card px-3 py-1.5 text-xs font-['Geist_Mono'] text-[#2252FF]"
                style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}
              >
                React
              </div>
              <div
                className="absolute top-1/2 -right-8 glass-card px-3 py-1.5 text-xs font-['Geist_Mono'] text-[#FFCD00]"
                style={{ animation: 'float 3s ease-in-out infinite 1s' }}
              >
                ML
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { number: '7+', label: 'Innovative Projects' },
            { number: '7', label: 'Certifications Earned' },
            { number: 'Top 25', label: 'Quest Global Ingenium' },
            { number: '80+', label: 'LeetCode Problems' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-extrabold text-white font-['Geist']">{stat.number}</div>
              <div className="text-xs text-[rgba(255,255,255,0.4)] font-['Geist_Mono'] uppercase tracking-[1.5px] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
