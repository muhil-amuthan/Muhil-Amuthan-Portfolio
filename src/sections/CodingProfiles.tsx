import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Code2, Star, GitFork } from 'lucide-react';

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

const profiles = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: 'Muhil-Amuthan_M',
    url: 'https://leetcode.com/u/Muhil-Amuthan_M',
    stat: '90+',
    statLabel: 'Problems Solved',
    description: 'Consistent problem solving across arrays, strings, dynamic programming, trees, and graphs.',
    accentColor: '#FFA116',
    badgeColor: 'rgba(255,161,22,0.15)',
    borderColor: 'rgba(255,161,22,0.3)',
    icon: Code2,
    tags: ['Arrays', 'Strings', 'Set', 'Hash Tables', ],
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: 'muhil-amuthan',
    url: 'https://github.com/muhil-amuthan',
    stat: '11+',
    statLabel: 'Repositories',
    description: 'Open source projects spanning AI/ML, Full Stack, IoT, and Java — all publicly available.',
    accentColor: '#D0FF71',
    badgeColor: 'rgba(208,255,113,0.1)',
    borderColor: 'rgba(208,255,113,0.25)',
    icon: Github,
    tags: ['AI/ML', 'Full Stack', 'Java', 'IoT', 'Python'],
  },
];

export default function CodingProfiles() {
  const { ref: sectionRef, inView } = useInView(0.1);

  return (
    <section id="coding-profiles" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div id="profiles" className="absolute -top-20" />
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
              Developer Presence
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Coding Profiles
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            Active on competitive programming and open-source platforms. Every line of code, a step forward.
          </p>
        </motion.div>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {profiles.map((profile, index) => (
            <motion.a
              key={profile.id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.15 }}
              className="group glass-card p-8 block transition-all duration-300"
              style={{
                borderColor: 'rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = profile.borderColor;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${profile.badgeColor}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              aria-label={`Visit ${profile.name} profile`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: profile.badgeColor }}
                  >
                    <profile.icon size={28} style={{ color: profile.accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold font-['Geist'] text-xl">
                      {profile.name}
                    </h3>
                    <p className="text-[rgba(255,255,255,0.4)] font-['Geist_Mono'] text-sm">
                      @{profile.handle}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-[rgba(255,255,255,0.3)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  style={{ color: profile.accentColor + '99' }}
                />
              </div>

              {/* Big stat */}
              <div className="mb-5">
                <div
                  className="text-5xl font-extrabold font-['Geist'] mb-1"
                  style={{ color: profile.accentColor }}
                >
                  {profile.stat}
                </div>
                <div className="text-[rgba(255,255,255,0.5)] text-sm font-['Geist_Mono'] uppercase tracking-wider">
                  {profile.statLabel}
                </div>
              </div>

              {/* Description */}
              <p className="text-[rgba(255,255,255,0.6)] text-sm font-['Geist'] leading-relaxed mb-6">
                {profile.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[11px] font-['Geist_Mono'] rounded-full border text-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.03)]"
                    style={{ borderColor: `${profile.accentColor}33` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA row */}
              <div
                className="mt-6 pt-5 border-t flex items-center justify-between"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <span
                  className="text-sm font-['Geist'] font-semibold"
                  style={{ color: profile.accentColor }}
                >
                  Visit Profile →
                </span>
                <div className="flex items-center gap-3 text-[rgba(255,255,255,0.25)] text-xs font-['Geist_Mono']">
                  {profile.id === 'github' && (
                    <>
                      <span className="flex items-center gap-1"><Star size={11} /> Active</span>
                      <span className="flex items-center gap-1"><GitFork size={11} /> Open Source</span>
                    </>
                  )}
                  {profile.id === 'leetcode' && (
                    <>
                      <span className="flex items-center gap-1"><Code2 size={11} /> DSA</span>
                      <span className="flex items-center gap-1"><Star size={11} /> Consistent</span>
                    </>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
