import { motion } from 'framer-motion';
import { Award, Cpu, Leaf, Code2, Zap } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const highlights = [
  {
    icon: Award,
    text: 'Shortlisted in SIH 2026 Internal Hackathon',
    color: '#2252FF',
  },
  {
    icon: Cpu,
    text: 'Building Smart PPE Compliance System',
    color: '#F97316',
  },
  {
    icon: Leaf,
    text: 'CarbonWise — Top 25 / 3700+ teams',
    color: '#D0FF71',
  },
  {
    icon: Code2,
    text: '100+ LeetCode Problems Solved',
    color: '#FFA116',
  },
  {
    icon: Zap,
    text: 'Exploring Embedded Systems & IoT',
    color: '#8B5CF6',
  },
];

export default function Highlights() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section className="relative py-8 sm:py-12" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#FFCD00]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Recent Highlights
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {highlights.map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card flex items-center gap-2.5 px-4 py-2.5 sm:py-3 hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
                role="listitem"
              >
                <item.icon
                  size={16}
                  style={{ color: item.color }}
                  className="shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[rgba(255,255,255,0.8)] text-sm font-['Geist'] whitespace-nowrap">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
