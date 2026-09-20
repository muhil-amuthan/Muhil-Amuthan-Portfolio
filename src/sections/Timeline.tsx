import { motion } from 'framer-motion';
import { timelineEvents } from '../data/timeline';
import { useInView } from '../hooks/useInView';
import { Clock, Award } from 'lucide-react';

export default function Timeline() {
  const { ref: sectionRef, inView } = useInView(0.02);

  return (
    <section id="timeline" className="relative py-16 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#FFCD00]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Journey &amp; Milestones
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            My Path So Far
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            Key milestones, hackathons, academic achievements, and projects shaping my technical journey.
          </p>
        </motion.div>

        {/* Timeline Flow */}
        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2252FF] via-[#FFCD00] to-[#D0FF71]" />

          <div className="space-y-6 sm:space-y-8">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 25 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  className={`relative flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-4 md:gap-12`}
                >
                  {/* Glowing Node Dot */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#030305] border-2 z-10 mt-1.5 transition-transform hover:scale-125"
                    style={{
                      borderColor: event.highlight ? '#FFCD00' : 'rgba(255,255,255,0.4)',
                      boxShadow: event.highlight ? '0 0 16px rgba(255, 205, 0, 0.6)' : 'none',
                    }}
                  />

                  {/* Card Content */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${isEven ? 'md:text-right' : 'md:text-left'} w-[calc(100%-2.5rem)]`}>
                    <div
                      className={`glass-card p-5 sm:p-6 transition-all duration-300 hover:border-[rgba(255,205,0,0.4)] ${
                        event.highlight
                          ? 'border-[rgba(255,205,0,0.3)] shadow-[0_0_20px_rgba(255,205,0,0.06)]'
                          : 'border-[rgba(255,255,255,0.08)]'
                      }`}
                    >
                      <div className={`flex items-center gap-2 mb-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                        <span className="flex items-center gap-1.5 text-[#2252FF] text-xs font-['Geist_Mono'] font-semibold bg-[rgba(34,82,255,0.1)] px-2.5 py-0.5 rounded-full border border-[rgba(34,82,255,0.2)]">
                          <Clock size={11} />
                          {event.year}
                        </span>
                        {event.highlight && (
                          <span className="flex items-center gap-1 text-[#FFCD00] text-[11px] font-['Geist_Mono'] font-bold bg-[rgba(255,205,0,0.1)] px-2 py-0.5 rounded-full border border-[rgba(255,205,0,0.25)]">
                            <Award size={11} />
                            Key Milestone
                          </span>
                        )}
                      </div>

                      <h3 className="text-white text-base sm:text-lg font-bold font-['Geist'] mb-2">
                        {event.title}
                      </h3>

                      <p className="text-[rgba(255,255,255,0.65)] text-sm leading-relaxed font-['Geist']">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty balance spacer for alternating desktop layout */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
