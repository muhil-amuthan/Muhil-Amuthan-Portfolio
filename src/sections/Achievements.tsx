import { motion } from 'framer-motion';
import { Trophy, Award, Code2, Github } from 'lucide-react';
import { achievements } from '../data/achievements';
import { useInView } from '../hooks/useInView';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Trophy,
  Award,
  Code2,
  Github,
};

export default function Achievements() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="achievements" className="relative py-16 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#FFCD00]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Recognition
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Achievements
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            Hackathons and competitions where my projects were recognized.
          </p>
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = iconMap[achievement.icon] || Trophy;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
                className="glass-card p-6 sm:p-8 group hover:shadow-[0_0_30px_rgba(34,82,255,0.08)] transition-all duration-300"
                style={{
                  borderColor: 'rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${achievement.accentColor}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: achievement.badgeColor }}
                  >
                    <IconComponent
                      size={28}
                      className="transition-transform group-hover:scale-110"
                      style={{ color: achievement.accentColor } as React.CSSProperties}
                    />
                  </div>
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-['Geist_Mono'] font-bold border"
                    style={{
                      color: achievement.accentColor,
                      borderColor: `${achievement.accentColor}40`,
                      background: achievement.badgeColor,
                    }}
                  >
                    {achievement.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Geist'] mb-2">
                  {achievement.title}
                </h3>
                <p
                  className="text-base font-['Geist'] font-medium mb-5"
                  style={{ color: achievement.accentColor }}
                >
                  {achievement.subtitle}
                </p>

                {/* Details */}
                <div className="space-y-2">
                  {achievement.details.map((detail) => (
                    <div
                      key={detail}
                      className="flex items-start gap-2 text-[rgba(255,255,255,0.6)] text-sm font-['Geist']"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: `${achievement.accentColor}80` }}
                      />
                      {detail}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
