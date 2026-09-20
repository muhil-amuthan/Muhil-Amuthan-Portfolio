import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, ExternalLink, Code2, Cpu, Brain, Network, Layers } from 'lucide-react';
import { projects, categories, type Project } from '../data/projects';
import { useInView } from '../hooks/useInView';

/* ─── Image with Fallback ─────────────────────────────── */
function ProjectImage({ src, alt, project }: { src: string; alt: string; project?: Project }) {
  const [error, setError] = useState(false);

  const getCategoryIcon = () => {
    if (!project) return <Code2 size={26} />;
    if (project.category.includes('IoT') || project.category.includes('Hardware')) return <Cpu size={26} />;
    if (project.category.includes('AI/ML')) return <Brain size={26} />;
    if (project.category.includes('Systems')) return <Network size={26} />;
    return <Layers size={26} />;
  };

  if (error || !src) {
    return (
      <div className="w-full aspect-video bg-gradient-to-br from-[#0c1222] via-[#090d16] to-[#04060a] border border-[rgba(255,255,255,0.06)] flex flex-col items-center justify-center p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,82,255,0.18),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-xl bg-[rgba(34,82,255,0.15)] border border-[rgba(34,82,255,0.3)] flex items-center justify-center mb-3 text-[#2252FF] group-hover:scale-110 group-hover:border-[#2252FF] transition-all duration-300">
            {getCategoryIcon()}
          </div>
          <span className="text-white font-semibold text-base sm:text-lg font-['Geist'] tracking-tight mb-1">
            {project?.title || 'Interactive Project'}
          </span>
          <span className="text-[rgba(255,255,255,0.45)] text-xs font-['Geist_Mono'] uppercase tracking-wider">
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

/* ─── Alternating Project Card (One by One) ───────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '200px 0px', amount: 0.01 }}
      transition={{ duration: 0.4 }}
      className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-5 sm:gap-8 lg:gap-12 items-center`}
    >
      {/* 1. Mobile-only Project Header: Name & Category First */}
      <div className="w-full lg:hidden">
        <div className="flex items-center gap-2 mb-2 text-[#2252FF] font-['Geist_Mono'] text-xs uppercase tracking-wider">
          <span>Project {String(index + 1).padStart(2, '0')}</span>
          <span className="text-[rgba(255,255,255,0.2)]">/</span>
          <span className="text-[rgba(255,255,255,0.5)]">{project.category}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Geist'] tracking-tight">
          {project.title}
        </h3>
      </div>

      {/* 2. Project Picture Side */}
      <div className="flex-1 w-full">
        <div className="relative group overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(34,82,255,0.4)] transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <ProjectImage
            src={project.image}
            alt={`${project.title} project preview`}
            project={project}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,5,0.7)] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Award ribbon */}
          {project.award && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-[rgba(255,205,0,0.95)] text-[#030305] px-3.5 py-1.5 rounded-full text-xs font-bold font-['Geist_Mono'] shadow-lg backdrop-blur-sm">
              <Award size={14} />
              {project.award}
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-4 right-4 glass-card px-3 py-1 text-xs font-['Geist_Mono'] text-[rgba(255,255,255,0.85)] border border-[rgba(255,255,255,0.12)]">
            {project.badge}
          </div>
        </div>
      </div>

      {/* 3. Content Side: Name (Desktop), Explanation & 4. Links */}
      <div className="flex-1 w-full">
        {/* Desktop-only Project Header */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-2 text-[#2252FF] font-['Geist_Mono'] text-xs uppercase tracking-wider">
            <span>Project {String(index + 1).padStart(2, '0')}</span>
            <span className="text-[rgba(255,255,255,0.2)]">/</span>
            <span className="text-[rgba(255,255,255,0.5)]">{project.category}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Geist'] mb-3 sm:mb-4 tracking-tight">
            {project.title}
          </h3>
        </div>

        {/* 3. Explanation of the Project */}
        <p className="text-[rgba(255,255,255,0.7)] text-base leading-[1.75] font-['Geist'] mb-6">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-['Geist_Mono'] rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.03)] hover:border-[rgba(34,82,255,0.3)] transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-['Geist'] text-sm px-4 py-2.5 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.04)] hover:border-[#2252FF] hover:text-white active:scale-95 transition-all duration-300 min-h-[44px]"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <span className="relative">
                View on GitHub
                <span className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-[#2252FF] origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-300" />
              </span>
              <ArrowUpRight size={16} className="transition-transform" />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D0FF71] font-['Geist'] text-sm px-4 py-2.5 rounded-lg bg-[rgba(208,255,113,0.08)] border border-[rgba(208,255,113,0.25)] hover:bg-[rgba(208,255,113,0.15)] active:scale-95 transition-all duration-300 min-h-[44px]"
              aria-label={`Open ${project.title} live demo`}
            >
              <ExternalLink size={15} />
              <span>Live Demo</span>
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
          className="flex gap-2 sm:gap-3 mb-12 sm:mb-16 overflow-x-auto pb-2 no-scrollbar"
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

        {/* All Projects Arranged One-by-One (Alternating Left & Right) */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          <AnimatePresence>
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
