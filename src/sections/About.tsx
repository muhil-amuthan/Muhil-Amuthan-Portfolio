import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Languages, Target, Award, BookOpen, Code2, Trophy } from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function AnimatedCounter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView(0.3);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="about" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              About Me
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1]">
            The Mind Behind<br />The Code
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/profile-photo.jpg"
                  alt="Muhil Amuthan M"
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-[#2252FF]"
                />
                <div>
                  <h3 className="text-xl font-bold text-white font-['Geist']">Muhil Amuthan M</h3>
                  <p className="text-[rgba(255,255,255,0.5)] text-sm font-['Geist_Mono']">
                    B.E. ECE | Minor: Computer Science
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-[rgba(255,255,255,0.7)] text-sm">
                  <GraduationCap size={16} className="text-[#2252FF]" />
                  <span>V.S.B. Engineering College, Karur TN</span>
                </div>
                <div className="flex items-center gap-3 text-[rgba(255,255,255,0.7)] text-sm">
                  <Target size={16} className="text-[#FFCD00]" />
                  <span>CGPA: 7.93 | Expected: 2028</span>
                </div>
                <div className="flex items-center gap-3 text-[rgba(255,255,255,0.7)] text-sm">
                  <MapPin size={16} className="text-[#D0FF71]" />
                  <span>Dindigul, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3 text-[rgba(255,255,255,0.7)] text-sm">
                  <Languages size={16} className="text-[#8B5CF6]" />
                  <span>Tamil, English, German (A1)</span>
                </div>
              </div>

              <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
                <p className="text-[rgba(255,255,255,0.7)] text-[15px] leading-[1.7] font-['Geist'] italic">
                  "I am a passionate engineering student obsessed with building AI systems that solve real-world problems. From federated learning models to full-stack web applications, I love shipping products that create measurable impact."
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Education card */}
            <div className="glass-card p-6 hover:border-[rgba(34,82,255,0.3)] transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(34,82,255,0.15)] flex items-center justify-center group-hover:bg-[rgba(34,82,255,0.25)] transition-colors">
                  <BookOpen size={18} className="text-[#2252FF]" />
                </div>
                <h4 className="text-white font-semibold font-['Geist']">Education</h4>
              </div>
              <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed">
                B.E. Electronics & Communication Engineering with Minor in Computer Science. Coursework: DSA, OOP (Java), Computer Networks, Microcontrollers, ML.
              </p>
            </div>

            {/* Career Goal card */}
            <div className="glass-card p-6 hover:border-[rgba(255,205,0,0.3)] transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,205,0,0.15)] flex items-center justify-center group-hover:bg-[rgba(255,205,0,0.25)] transition-colors">
                  <Target size={18} className="text-[#FFCD00]" />
                </div>
                <h4 className="text-white font-semibold font-['Geist']">Career Goal</h4>
              </div>
              <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed">
                Land a top-tier Software/ML engineering role where I can build at scale. Passionate about AI systems that create real-world impact through federated learning, IoT, and full-stack development.
              </p>
            </div>

            {/* Experience card */}
            <div className="glass-card p-6 hover:border-[rgba(208,255,113,0.3)] transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(208,255,113,0.15)] flex items-center justify-center group-hover:bg-[rgba(208,255,113,0.25)] transition-colors">
                  <Code2 size={18} className="text-[#D0FF71]" />
                </div>
                <h4 className="text-white font-semibold font-['Geist']">Experience</h4>
              </div>
              <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed">
                Technical Presenter & Student Coordinator — IEEE. Presented ML research at CRYPTERA 2026 (CIT) to 100+ engineers. Conducted Java & IoT workshops for 50+ students.
              </p>
            </div>

            {/* Achievement card */}
            <div className="glass-card p-6 hover:border-[rgba(139,92,246,0.3)] transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-[rgba(139,92,246,0.15)] flex items-center justify-center group-hover:bg-[rgba(139,92,246,0.25)] transition-colors">
                  <Trophy size={18} className="text-[#8B5CF6]" />
                </div>
                <h4 className="text-white font-semibold font-['Geist']">Top Achievement</h4>
              </div>
              <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed">
                Top 25 out of 3,700+ teams at Quest Global Ingenium 2026 for CarbonWise — a real-time ML carbon intelligence platform.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Animated Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: Code2, value: 7, suffix: '+', label: 'Projects Built' },
            { icon: Award, value: 80, suffix: '+', label: 'LeetCode Problems' },
            { icon: BookOpen, value: 7, suffix: '', label: 'Certifications' },
            { icon: Trophy, value: 25, suffix: '', label: 'Quest Global Rank', prefix: 'Top ' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-6 text-center group hover:border-[rgba(34,82,255,0.3)] transition-all duration-300">
              <stat.icon size={24} className="mx-auto mb-3 text-[#2252FF] group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-extrabold text-white font-['Geist'] mb-1">
                {stat.prefix || ''}<AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-[rgba(255,255,255,0.4)] font-['Geist_Mono'] uppercase tracking-[1px]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
