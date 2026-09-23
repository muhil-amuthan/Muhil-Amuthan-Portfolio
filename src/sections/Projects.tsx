import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Award, ExternalLink, Code2, Cpu, Brain, Network, Layers, Sparkles, X, ZoomIn } from 'lucide-react';
import { projects, categories, type Project } from '../data/projects';
import { useInView } from '../hooks/useInView';

/* ─── Image with Fallback and Zoom Trigger ─── */
function ProjectImage({
  src,
  alt,
  project,
  onZoom
}: {
  src: string;
  alt: string;
  project?: Project;
  onZoom?: () => void;
}) {
  const [error, setError] = useState(false);

  const getCategoryIcon = () => {
    if (!project) return <Code2 size={26} />;
    if (project.category.includes('IoT') || project.category.includes('Hardware')) return <Cpu size={26} />;
    if (project.category.includes('AI') || project.category.includes('ML')) return <Brain size={26} />;
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
    <div
      onClick={onZoom}
      className="relative w-full aspect-video overflow-hidden cursor-pointer group"
      title="Click to preview image"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-['Geist_Mono']">
        <ZoomIn size={16} />
        <span>Click to expand</span>
      </div>
    </div>
  );
}

/* ─── Featured Spotlight Card ─── */
function FeaturedCard({
  project,
  index,
  onZoom
}: {
  project: Project;
  index: number;
  onZoom: (proj: Project) => void;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px', amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className={`glass-card p-6 lg:p-8 flex flex-col ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } gap-6 lg:gap-10 items-center border-[rgba(34,82,255,0.25)] hover:border-[rgba(34,82,255,0.5)] transition-all`}
    >
      {/* Visual media */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <ProjectImage
            src={project.image}
            alt={`${project.title} screenshot`}
            project={project}
            onZoom={() => onZoom(project)}
          />
          {project.award && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#FFCD00] text-black px-3 py-1 rounded-full text-xs font-bold font-['Geist_Mono'] shadow-md">
              <Award size={13} />
              <span>{project.award}</span>
            </div>
          )}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-sm border border-white/15 text-[11px] font-['Geist_Mono'] text-white/90">
            {project.badge}
          </div>
        </div>
      </div>

      {/* Narrative & Info */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#2252FF] font-['Geist_Mono'] text-xs uppercase tracking-wider font-semibold">
            <Sparkles size={13} />
            <span>Featured {String(index + 1).padStart(2, '0')}</span>
            <span className="text-white/20">•</span>
            <span className="text-white/60">{project.category}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Geist'] mb-3 tracking-tight">
            {project.title}
          </h3>

          <p className="text-[rgba(255,255,255,0.72)] text-sm sm:text-base leading-relaxed font-['Geist'] mb-5">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-['Geist_Mono'] rounded-md border border-white/10 text-white/80 bg-white/[0.04]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
          {project.github && project.github !== '#' ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-['Geist'] text-xs font-medium px-4 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:border-[#2252FF] hover:bg-[#2252FF]/10 active:scale-95 transition-all min-h-[40px]"
              aria-label={`View ${project.title} on GitHub`}
            >
              <span>GitHub Repository</span>
              <ArrowUpRight size={14} className="text-[#2252FF]" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-white/40 text-xs font-['Geist_Mono'] px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02]">
              Hardware / Embedded Prototype
            </span>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D0FF71] font-['Geist'] text-xs font-medium px-4 py-2.5 rounded-lg bg-[rgba(208,255,113,0.08)] border border-[rgba(208,255,113,0.3)] hover:bg-[rgba(208,255,113,0.18)] active:scale-95 transition-all min-h-[40px]"
              aria-label={`Open ${project.title} live demo`}
            >
              <ExternalLink size={14} />
              <span>Live Application</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Grid Project Card ─── */
function GridProjectCard({
  project,
  onZoom
}: {
  project: Project;
  onZoom: (proj: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.35 }}
      className="glass-card flex flex-col justify-between overflow-hidden border-white/[0.08] hover:border-[#2252FF]/50 transition-all duration-300 group hover:shadow-[0_10px_30px_rgba(34,82,255,0.1)]"
    >
      <div>
        <div className="relative border-b border-white/[0.06]">
          <ProjectImage
            src={project.image}
            alt={`${project.title} preview`}
            project={project}
            onZoom={() => onZoom(project)}
          />
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] font-['Geist_Mono'] text-white/80">
            {project.category}
          </div>
          {project.award && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-[#FFCD00] text-black px-2 py-0.5 rounded-full text-[10px] font-bold font-['Geist_Mono']">
              <Award size={11} />
              <span>Top 25</span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="text-[11px] font-['Geist_Mono'] text-[#2252FF] font-semibold mb-1">
            {project.badge}
          </div>
          <h3 className="text-lg font-bold text-white font-['Geist'] mb-2.5 group-hover:text-[#2252FF] transition-colors">
            {project.title}
          </h3>
          <p className="text-white/60 text-xs leading-relaxed font-['Geist'] mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] font-['Geist_Mono'] rounded bg-white/[0.04] text-white/70 border border-white/[0.06]"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-1.5 py-0.5 text-[10px] font-['Geist_Mono'] text-white/40">
                +{project.tech.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 flex items-center gap-2">
        {project.github && project.github !== '#' ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-white/80 hover:text-white text-xs font-['Geist'] py-2 px-3 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] transition-all min-h-[36px]"
            aria-label={`View ${project.title} on GitHub`}
          >
            <span>GitHub</span>
            <ArrowUpRight size={13} />
          </a>
        ) : (
          <span className="flex-1 text-center py-2 text-[11px] font-['Geist_Mono'] text-white/40 border border-white/5 rounded-lg bg-white/[0.01]">
            Hardware Prototype
          </span>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#D0FF71] text-xs font-['Geist'] py-2 px-3 rounded-lg border border-[rgba(208,255,113,0.25)] bg-[rgba(208,255,113,0.06)] hover:bg-[rgba(208,255,113,0.12)] transition-all min-h-[36px]"
            aria-label={`Open ${project.title} live demo`}
          >
            <ExternalLink size={13} />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════ */

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [zoomedProject, setZoomedProject] = useState<Project | null>(null);
  const { ref: sectionRef, inView } = useInView(0.05);

  const featuredList = projects.filter((p) => p.featured);
  const filteredGrid = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-16 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Engineered &amp; Deployed
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Featured Projects
          </h2>
          <p className="text-[rgba(255,255,255,0.6)] text-base max-w-[620px]">
            Flagship engineering projects spanning Industrial Carbon Intelligence, AI Incident Triage, Embedded Safety Interlocks, and IoT Monitoring.
          </p>
        </motion.div>

        {/* 1. Featured Projects Showcase (4 Spotlight Projects) */}
        <div className="space-y-8 sm:space-y-12 mb-24">
          {featuredList.map((proj, idx) => (
            <FeaturedCard
              key={proj.id}
              project={proj}
              index={idx}
              onZoom={setZoomedProject}
            />
          ))}
        </div>

        {/* 2. All Projects Header & Category Tabs */}
        <div className="pt-12 border-t border-white/[0.08] mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-['Geist_Mono'] text-[#2252FF] uppercase tracking-wider mb-2">
                <span>Comprehensive Archive</span>
                <span className="text-white/20">•</span>
                <span className="text-white/50">{projects.length} Total Projects</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Geist']">
                All Projects
              </h3>
            </div>

            {/* Filter Tabs */}
            <div
              className="flex gap-2 overflow-x-auto pb-2 no-scrollbar"
              role="tablist"
              aria-label="Filter all projects"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  role="tab"
                  aria-selected={activeFilter === cat}
                  className={`px-4 py-2 rounded-lg text-xs font-['Geist_Mono'] transition-all whitespace-nowrap min-h-[38px] ${
                    activeFilter === cat
                      ? 'bg-[#2252FF] text-white shadow-[0_0_16px_rgba(34,82,255,0.4)]'
                      : 'bg-white/[0.04] text-white/60 hover:text-white border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of All Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrid.map((proj) => (
              <GridProjectCard
                key={proj.id}
                project={proj}
                onZoom={setZoomedProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Image Preview Lightbox Modal */}
      <AnimatePresence>
        {zoomedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setZoomedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Project image preview"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-[#070b14] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-[#04060a]">
                <div>
                  <h4 className="text-white font-bold font-['Geist'] text-sm sm:text-base">
                    {zoomedProject.title}
                  </h4>
                  <p className="text-xs font-['Geist_Mono'] text-white/50">
                    {zoomedProject.badge}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {zoomedProject.demo && (
                    <a
                      href={zoomedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[rgba(208,255,113,0.12)] border border-[rgba(208,255,113,0.3)] text-[#D0FF71] text-xs font-['Geist']"
                    >
                      <ExternalLink size={13} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <button
                    onClick={() => setZoomedProject(null)}
                    className="p-1.5 rounded-lg text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                    aria-label="Close image preview"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3 sm:p-4 overflow-auto flex items-center justify-center bg-[#030305] max-h-[calc(92vh-64px)]">
                <img
                  src={zoomedProject.image}
                  alt={zoomedProject.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
