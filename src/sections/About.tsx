import { motion } from 'framer-motion';
import { GraduationCap, Target, Sparkles, BookOpen } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="about" className="relative py-16 sm:py-24 lg:py-28" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Profile &amp; Background
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white font-['Geist'] leading-[1.1]">
            About Me
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 space-y-6"
          >
            <div className="space-y-4 text-[rgba(255,255,255,0.8)] text-base sm:text-lg font-['Geist'] leading-relaxed">
              <p>
                I am a third-year <span className="text-white font-medium">B.E. Electronics and Communication Engineering</span> student interested in <span className="text-white font-medium">Machine Learning</span>, <span className="text-white font-medium">Full-Stack Development</span>, <span className="text-white font-medium">Embedded Systems</span>, and <span className="text-white font-medium">IoT</span>.
              </p>
              <p className="text-[rgba(255,255,255,0.7)] text-base">
                I enjoy building practical software and hardware solutions that combine intelligent systems with real-world applications. Whether training machine learning models for carbon reduction, architecting full-stack web applications, or designing fail-safe embedded hardware, I focus on building reliable, impactful engineering products.
              </p>
            </div>

            {/* Current Focus Area */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-2 mb-3 text-xs font-['Geist_Mono'] text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
                <Target size={14} className="text-[#FFCD00]" />
                <span>Current Focus</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Machine Learning',
                  'Full-Stack Development',
                  'IoT & Embedded Systems',
                  'Data Structures & Algorithms (Java)',
                ].map((focus) => (
                  <span
                    key={focus}
                    className="px-3.5 py-1.5 rounded-lg bg-[rgba(34,82,255,0.1)] border border-[rgba(34,82,255,0.25)] text-white text-xs sm:text-sm font-['Geist'] font-medium"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Education & Academic Highlights (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Education Card */}
            <div className="glass-card p-6 border-l-2 border-l-[#2252FF]">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap size={20} className="text-[#2252FF]" />
                <h3 className="text-white font-semibold font-['Geist'] text-base">Education</h3>
              </div>
              <div className="space-y-1">
                <div className="text-white font-medium text-sm font-['Geist']">
                  B.E. Electronics and Communication Engineering
                </div>
                <div className="text-[rgba(255,255,255,0.6)] text-xs font-['Geist_Mono']">
                  2024 – 2028 (3rd Year) • CGPA: 7.93
                </div>
                <div className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist'] pt-1">
                  V.S.B. Engineering College, Karur, Tamil Nadu
                </div>
              </div>
            </div>

            {/* Coursework & Foundations */}
            <div className="glass-card p-6 border-l-2 border-l-[#D0FF71]">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen size={20} className="text-[#D0FF71]" />
                <h3 className="text-white font-semibold font-['Geist'] text-base">Core Coursework</h3>
              </div>
              <p className="text-[rgba(255,255,255,0.65)] text-xs sm:text-sm font-['Geist'] leading-relaxed">
                Data Structures &amp; Algorithms, Object-Oriented Programming (Java), Computer Networks, Microcontrollers &amp; Embedded Systems, Analog Circuits, Machine Learning.
              </p>
            </div>

            {/* Engineering Values */}
            <div className="glass-card p-6 border-l-2 border-l-[#FFCD00]">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={20} className="text-[#FFCD00]" />
                <h3 className="text-white font-semibold font-['Geist'] text-base">Engineering Approach</h3>
              </div>
              <p className="text-[rgba(255,255,255,0.65)] text-xs sm:text-sm font-['Geist'] leading-relaxed">
                Clean, maintainable code, test-driven validation, hardware-software integration, and continuous problem-solving practice (100+ LeetCode solved).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
