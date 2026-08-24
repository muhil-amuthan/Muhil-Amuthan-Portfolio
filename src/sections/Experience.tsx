import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Clock, ExternalLink, Tag } from 'lucide-react';
import { experiences } from '../data/experience';

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

export default function Experience() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section id="experience" className="relative py-24 lg:py-32" ref={sectionRef}>
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
              Industry Experience
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Experience &amp; Training
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            Hands-on industry experience in Full Stack Development, AI/ML, and Telecommunications.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2252FF] via-[#8B5CF6] to-[#D0FF71]" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.12 }}
                className="relative pl-16 lg:pl-24"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-[18px] lg:left-[26px] top-6 w-5 h-5 rounded-full border-2 flex items-center justify-center z-10"
                  style={{
                    background: '#030305',
                    borderColor: exp.status === 'ongoing' ? '#2252FF' : '#D0FF71',
                    boxShadow: exp.status === 'ongoing'
                      ? '0 0 16px rgba(34,82,255,0.5)'
                      : '0 0 10px rgba(208,255,113,0.3)',
                  }}
                >
                  {exp.status === 'ongoing' ? (
                    <div className="w-2 h-2 rounded-full bg-[#2252FF] animate-pulse" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[#D0FF71]" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`glass-card p-6 lg:p-8 transition-all duration-300 ${
                    exp.status === 'ongoing'
                      ? 'border-[rgba(34,82,255,0.3)] hover:border-[rgba(34,82,255,0.5)] hover:shadow-[0_0_30px_rgba(34,82,255,0.12)]'
                      : 'hover:border-[rgba(208,255,113,0.2)] hover:shadow-[0_0_20px_rgba(208,255,113,0.06)]'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: exp.status === 'ongoing'
                            ? 'rgba(34,82,255,0.15)'
                            : 'rgba(208,255,113,0.1)',
                        }}
                      >
                        <Briefcase
                          size={18}
                          style={{ color: exp.status === 'ongoing' ? '#2252FF' : '#D0FF71' }}
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-bold font-['Geist'] text-lg leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-[rgba(255,255,255,0.6)] font-['Geist_Mono'] text-sm mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      {exp.status === 'ongoing' ? (
                        <span className="flex items-center gap-1.5 bg-[rgba(34,82,255,0.15)] border border-[rgba(34,82,255,0.4)] text-[#2252FF] text-xs font-['Geist_Mono'] font-bold px-3 py-1.5 rounded-full">
                          <Clock size={11} className="animate-pulse" />
                          ONGOING
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 bg-[rgba(208,255,113,0.1)] border border-[rgba(208,255,113,0.3)] text-[#D0FF71] text-xs font-['Geist_Mono'] font-bold px-3 py-1.5 rounded-full">
                          <CheckCircle2 size={11} />
                          COMPLETED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Period */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[rgba(255,255,255,0.35)] text-xs font-['Geist_Mono'] uppercase tracking-wider">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[rgba(255,255,255,0.65)] text-sm leading-[1.7] font-['Geist'] mb-4">
                    {exp.description}
                  </p>

                  {/* Project highlight */}
                  {exp.project && (
                    <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-[rgba(34,82,255,0.08)] border border-[rgba(34,82,255,0.15)]">
                      <span className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono'] uppercase">Project:</span>
                      <span className="text-[#2252FF] text-sm font-['Geist'] font-semibold">{exp.project}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-['Geist_Mono'] rounded-full border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.5)] bg-[rgba(255,255,255,0.03)]"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Certificate */}
                  {exp.certificate && (
                    <button
                      onClick={() => setActiveModal(exp.certificate!)}
                      className="inline-flex items-center gap-2 text-sm font-['Geist'] text-[rgba(255,255,255,0.6)] hover:text-white border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)] px-4 py-2 rounded-lg transition-all duration-200 hover:bg-[rgba(255,255,255,0.05)]"
                      aria-label={`View ${exp.company} certificate`}
                    >
                      <ExternalLink size={14} />
                      View Certificate
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Lightbox */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
        >
          <div className="relative max-w-3xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white font-['Geist_Mono'] text-sm transition-colors"
              aria-label="Close"
            >
              ✕ Close
            </button>
            <img
              src={activeModal}
              alt="Experience certificate"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
