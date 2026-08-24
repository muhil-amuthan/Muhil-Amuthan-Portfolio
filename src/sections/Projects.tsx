import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import { projects, categories } from '../data/projects';

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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref: sectionRef, inView } = useInView(0.1);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category.includes(activeFilter));

  return (
    <section id="projects" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Projects That Ship
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Featured Projects
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            Real-world applications combining AI, Web, and IoT — each built to solve meaningful problems.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-['Geist'] transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#2252FF] text-white shadow-[0_0_20px_rgba(34,82,255,0.3)]'
                  : 'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.6)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-12">
          <AnimatePresence mode="wait">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative group overflow-hidden rounded-2xl">
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,5,0.8)] to-transparent opacity-60" />
                    {/* Award ribbon */}
                    {project.award && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-[rgba(255,205,0,0.9)] text-[#030305] px-3 py-1.5 rounded-full text-xs font-bold font-['Geist_Mono']">
                        <Award size={14} />
                        {project.award}
                      </div>
                    )}
                    {/* Category badge */}
                    <div className="absolute top-4 right-4 glass-card px-3 py-1 text-xs font-['Geist_Mono'] text-[rgba(255,255,255,0.8)]">
                      {project.badge}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <h3 className="text-2xl lg:text-3xl font-bold text-white font-['Geist'] mb-4">
                    {project.title}
                  </h3>
                  <p className="text-[rgba(255,255,255,0.65)] text-base leading-[1.7] font-['Geist'] mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-['Geist_Mono'] rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.03)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-['Geist'] text-sm group/link"
                  >
                    <span className="relative">
                      View on GitHub
                      <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-[#2252FF] origin-left scale-x-100 group-hover/link:scale-x-0 transition-transform duration-300" />
                    </span>
                    <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
