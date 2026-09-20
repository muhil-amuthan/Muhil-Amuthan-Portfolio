import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, ExternalLink, Code2, Cpu, Brain, Network, Layers } from 'lucide-react';
import { projects, categories, type Project } from '../data/projects';

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

/* ─── Image with Fallback ─────────────────────────────── */
function ProjectImage({ src, alt, project }: { src: string; alt: string; project?: Project }) {
  const [error, setError] = useState(false);

  const getCategoryIcon = () => {
    if (!project) return <Code2 size={24} />;
    if (project.category.includes('IoT') || project.category.includes('Hardware')) return <Cpu size={24} />;
    if (project.category.includes('AI/ML')) return <Brain size={24} />;
    if (project.category.includes('Systems')) return <Network size={24} />;
    return <Layers size={24} />;
  };

  if (error || !src) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-[#0c1222] via-[#090d16] to-[#04060a] border border-[rgba(255,255,255,0.06)] flex flex-col items-center justify-center p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,82,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-xl bg-[rgba(34,82,255,0.15)] border border-[rgba(34,82,255,0.3)] flex items-center justify-center mb-3 text-[#2252FF] group-hover:scale-110 group-hover:border-[#2252FF] transition-all duration-300">
            {getCategoryIcon()}
          </div>
          <span className="text-white font-semibold text-sm sm:text-base font-['Geist'] tracking-tight mb-1">
            {project?.title || 'Interactive Project'}
          </span>
          <span className="text-[rgba(255,255,255,0.45)] text-[11px] font-['Geist_Mono'] uppercase tracking-wider">
            {project?.badge || project?.category || 'Project Preview'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

/* ─── Featured Project Card (Large) ───────────────────── */
function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
    >
      {/* Image */}
      <div className="flex-1 w-full">
        <div className="relative group overflow-hidden rounded-2xl">
          <ProjectImage
            src={project.image}
            alt={`${project.title} project preview`}
            project={project}
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
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-['Geist'] mb-3 sm:mb-4">
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

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          {project.github !== '#' && (
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
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D0FF71] font-['Geist'] text-sm group/link"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Grid Project Card (Small) ───────────────────────── */
function GridCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="glass-card overflow-hidden group hover:border-[rgba(34,82,255,0.3)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <ProjectImage
          src={project.image}
          alt={`${project.title} project preview`}
          project={project}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,5,0.9)] via-transparent to-transparent" />
        <div className="absolute top-3 right-3 glass-card px-2.5 py-0.5 text-[10px] font-['Geist_Mono'] text-[rgba(255,255,255,0.7)]">
          {project.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold text-white font-['Geist'] mb-2">
          {project.title}
        </h3>
        <p className="text-[rgba(255,255,255,0.55)] text-sm leading-[1.6] font-['Geist'] mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[10px] font-['Geist_Mono'] rounded-full border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.03)]"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-0.5 text-[10px] font-['Geist_Mono'] text-[rgba(255,255,255,0.35)]">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[rgba(255,255,255,0.7)] hover:text-white text-sm font-['Geist'] transition-colors min-h-[44px]"
              aria-label={`View ${project.title} on GitHub`}
            >
              GitHub
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D0FF71] hover:text-white text-sm font-['Geist'] transition-colors min-h-[44px]"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={13} />
              Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref: sectionRef, inView } = useInView(0.1);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const featured = filtered.filter(p => p.featured);
  const others = filtered.filter(p => !p.featured);

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
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
            Real-world applications combining AI, Web, IoT, and Embedded Systems — each built to solve meaningful problems.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-2 sm:gap-3 mb-10 sm:mb-12 overflow-x-auto pb-2 no-scrollbar"
          role="tablist"
          aria-label="Project category filter"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`px-5 py-2.5 rounded-full text-sm font-['Geist'] transition-all duration-300 whitespace-nowrap min-h-[44px] ${
                activeFilter === cat
                  ? 'bg-[#2252FF] text-white shadow-[0_0_20px_rgba(34,82,255,0.3)]'
                  : 'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.6)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Projects — Large Cards */}
        {featured.length > 0 && (
          <div className="space-y-12 mb-16">
            <AnimatePresence mode="wait">
              {featured.map((project, index) => (
                <FeaturedCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* More Projects — Grid */}
        {others.length > 0 && (
          <>
            {featured.length > 0 && (
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-[2px] bg-[rgba(255,255,255,0.15)]" />
                <span className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
                  More Projects
                </span>
              </div>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {others.map((project, index) => (
                  <GridCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
