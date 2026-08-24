import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

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

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const { ref, inView } = useInView(0.3);

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[rgba(255,255,255,0.8)] text-sm font-['Geist']">{name}</span>
        <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono']">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}

const orbitRows = [
  { text: "PYTHON  +  JAVA  +  JAVASCRIPT  +  SQL  +  C  +  ", color: "#FFFFFF", top: "8%", z: 0, rotate: 0 },
  { text: "REACT  +  HTML/CSS/JS  +  RESPONSIVE UI  +  ", color: "#D0FF71", top: "22%", z: -100, rotate: -20 },
  { text: "FASTAPI  +  FLASK  +  REST APIS  +  JAVA OOP  +  ", color: "#06B6D4", top: "36%", z: -150, rotate: -40 },
  { text: "SQL  +  CLOUD DB  +  DATA MODELING  +  ", color: "#8B5CF6", top: "50%", z: -150, rotate: -60 },
  { text: "MACHINE LEARNING  +  DEEP LEARNING  +  CNN  +  FEDERATED LEARNING  +  GENAI  +  ", color: "#2252FF", top: "64%", z: -100, rotate: -80 },
  { text: "GIT/GITHUB  +  VS CODE  +  DOCKER  +  LINUX  +  AWS  +  ", color: "#FFCD00", top: "78%", z: 0, rotate: -100 },
  { text: "IOT  +  MICROCONTROLLERS  +  EMBEDDED SYSTEMS  +  COMPUTER NETWORKS  +  ", color: "#F97316", top: "92%", z: 0, rotate: -120 },
];

export default function Skills() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden" ref={sectionRef}>
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
              Technical Arsenal
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Skills & Technologies
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            A comprehensive toolkit spanning AI/ML, full-stack development, IoT, and core computer science fundamentals.
          </p>
        </motion.div>

        {/* Holographic Skill Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative h-[400px] mb-16 overflow-hidden rounded-2xl"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(2, 19, 33, 0.6), transparent)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          >
            {orbitRows.map((row, i) => (
              <div
                key={i}
                className="absolute left-[-50%] w-[200%] flex whitespace-nowrap overflow-hidden"
                style={{
                  top: row.top,
                  transform: `translateZ(${row.z}px) rotateY(${row.rotate}deg)`,
                }}
              >
                <div
                  className="flex animate-marquee"
                  style={{ animationDuration: `${20 + i * 3}s`, animationDirection: i % 2 === 0 ? 'normal' : 'reverse' }}
                >
                  {[...Array(4)].map((_, j) => (
                    <span
                      key={j}
                      className="inline-block text-sm font-['Geist_Mono'] px-4 py-2 mx-2 rounded-full border"
                      style={{
                        color: row.color,
                        borderColor: `${row.color}40`,
                        background: 'rgba(255,255,255,0.04)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {row.text}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="glass-card p-6 hover:shadow-[0_0_30px_rgba(34,82,255,0.1)] transition-all duration-300 group"
              style={{ borderTop: `2px solid ${cat.color}40` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}60` }}
                />
                <h3 className="text-white font-semibold font-['Geist']">{cat.category}</h3>
              </div>
              {cat.skills.map((skill, j) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={j * 0.1}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
