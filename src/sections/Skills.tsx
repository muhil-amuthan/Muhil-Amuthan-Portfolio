import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Layout, Server, Brain, Cpu, Wrench, CheckCircle2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface SkillGroup {
  category: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  accentColor: string;
  badgeBg: string;
  description: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Programming',
    icon: Code,
    accentColor: '#2252FF',
    badgeBg: 'rgba(34,82,255,0.1)',
    description: 'Core languages for algorithm development, systems programming, and backend logic.',
    skills: ['Python', 'Java', 'C', 'SQL', 'Embedded C'],
  },
  {
    category: 'Frontend',
    icon: Layout,
    accentColor: '#D0FF71',
    badgeBg: 'rgba(208,255,113,0.1)',
    description: 'Modern, responsive user interfaces built with modular component systems.',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Responsive UI'],
  },
  {
    category: 'Backend',
    icon: Server,
    accentColor: '#00C0F3',
    badgeBg: 'rgba(0,192,243,0.1)',
    description: 'High-performance RESTful APIs, microservices, and database persistence.',
    skills: ['FastAPI', 'Flask', 'Spring Boot', 'REST APIs', 'Firebase', 'PostgreSQL'],
  },
  {
    category: 'Data / ML',
    icon: Brain,
    accentColor: '#FFCD00',
    badgeBg: 'rgba(255,205,0,0.1)',
    description: 'Predictive modeling, deep learning architectures, and data engineering pipelines.',
    skills: [
      'Machine Learning',
      'Scikit-learn',
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Deep Learning',
      'CNN',
      'Federated Learning',
      'GenAI',
    ],
  },
  {
    category: 'IoT / Embedded',
    icon: Cpu,
    accentColor: '#F97316',
    badgeBg: 'rgba(249,115,22,0.1)',
    description: 'Microcontroller hardware architecture, wireless protocols, and sensor integration.',
    skills: ['ESP32', 'Embedded Systems', 'MQTT', 'ESP-NOW', 'Sensors', 'RFID', 'Relay Interlocks'],
  },
  {
    category: 'Tools',
    icon: Wrench,
    accentColor: '#8B5CF6',
    badgeBg: 'rgba(139,92,246,0.1)',
    description: 'Developer tooling, version control, API testing, and deployment platforms.',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux', 'Vercel', 'IntelliJ IDEA'],
  },
];

export default function Skills() {
  const { ref: sectionRef, inView } = useInView(0.08);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGroups =
    selectedCategory === 'All'
      ? skillGroups
      : skillGroups.filter((g) => g.category === selectedCategory);

  return (
    <section id="skills" className="relative py-16 sm:py-24 lg:py-28" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Skills &amp; Technologies
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] text-base max-w-[620px] font-['Geist']">
            Organized across programming, full-stack development, machine learning, IoT hardware, and engineering tools.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-1 no-scrollbar">
          {['All', ...skillGroups.map((g) => g.category)].map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-['Geist'] font-medium transition-all ${
                  isSelected
                    ? 'bg-[#2252FF] text-white shadow-[0_0_15px_rgba(34,82,255,0.4)]'
                    : 'glass-card text-[rgba(255,255,255,0.7)] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skill Category Cards Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGroups.map((group) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-6 flex flex-col justify-between group hover:border-[rgba(34,82,255,0.35)] hover:shadow-[0_0_25px_rgba(34,82,255,0.1)] transition-all duration-300"
                  style={{
                    borderTop: `2px solid ${group.accentColor}50`,
                  }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            background: group.badgeBg,
                            border: `1px solid ${group.accentColor}30`,
                          }}
                        >
                          <Icon size={20} style={{ color: group.accentColor }} />
                        </div>
                        <h3 className="text-white font-semibold font-['Geist'] text-lg">
                          {group.category}
                        </h3>
                      </div>
                      <span className="text-xs font-['Geist_Mono'] text-[rgba(255,255,255,0.4)]">
                        {group.skills.length} skills
                      </span>
                    </div>

                    <p className="text-[rgba(255,255,255,0.55)] text-xs font-['Geist'] leading-relaxed mb-6">
                      {group.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] text-white text-xs font-['Geist'] transition-colors"
                        >
                          <CheckCircle2 size={12} style={{ color: group.accentColor }} className="opacity-70" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
