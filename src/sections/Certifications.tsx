import { useRef, useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { certifications } from '../data/certifications';
import { timelineEvents } from '../data/timeline';
import { ExternalLink, Award, Hash } from 'lucide-react';

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

/* Credential Plane for 3D sphere */
function CredentialPlane({ position, imageUrl }: { position: [number, number, number]; imageUrl: string }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <planeGeometry args={[1.1, 1.4]} />
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} transparent roughness={0.4} metalness={0.2} />
      </mesh>
    </Float>
  );
}

function CredentialScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y += (Math.sin(t * 0.05) * 0.25 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x = Math.cos(t * 0.03) * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.2) * 0.1;
  });

  const planes: { pos: [number, number, number]; img: string }[] = [
    { pos: [2.3, 1.0, -1.0], img: '/cred-guvi.png' },
    { pos: [-1.8, 1.5, 1.5], img: '/cred-cisco.png' },
    { pos: [0.5, -2.0, 1.8], img: '/cred-nptel.jpg' },
    { pos: [-2.0, -1.0, -1.5], img: '/cred-nasscom.png' },
    { pos: [1.5, 0.5, 2.0], img: '/cred-infosys-dl.png' },
    { pos: [0.0, 2.0, -2.0], img: '/cred-infosys-ai.png' },
    { pos: [-0.5, -0.5, -2.5], img: '/cred-aws.jpg' },
  ];

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshBasicMaterial color="#2252FF" wireframe transparent opacity={0.15} />
        </mesh>
        {planes.map((p, i) => (
          <CredentialPlane key={i} position={p.pos} imageUrl={p.img} />
        ))}
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

/* Category badge color map */
const categoryColors: Record<string, string> = {
  'AI/ML': '#2252FF',
  'IoT': '#D0FF71',
  'Electronics': '#FFCD00',
  'Programming': '#8B5CF6',
};

export default function Certifications() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [showSphere, setShowSphere] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    if (inView) setShowSphere(true);
  }, [inView]);

  return (
    <section id="certifications" className="relative py-24 lg:py-32" ref={sectionRef}>
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
              Certifications Earned
            </span>
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Credentials &amp; Certifications
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px]">
            Industry-recognized credentials in AI, IoT, and Software Development from leading organizations.
          </p>
        </motion.div>

        {/* Certification Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-20"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="glass-card p-4 group hover:border-[rgba(34,82,255,0.4)] hover:shadow-[0_0_20px_rgba(34,82,255,0.15)] transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative rounded-lg overflow-hidden mb-4 bg-white/5" style={{ aspectRatio: '4/3' }}>
                <img
                  src={cert.image}
                  alt={`${cert.name} certificate`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Category badge */}
                <span
                  className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-['Geist_Mono'] font-bold"
                  style={{
                    background: `${categoryColors[cert.category] || '#2252FF'}22`,
                    color: categoryColors[cert.category] || '#2252FF',
                    border: `1px solid ${categoryColors[cert.category] || '#2252FF'}44`,
                  }}
                >
                  {cert.category}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col">
                <h4 className="text-white text-sm font-semibold font-['Geist'] leading-snug mb-1 line-clamp-2">
                  {cert.name}
                </h4>
                <div className="flex items-center gap-1.5 mb-1">
                  <Award size={11} className="text-[#2252FF] shrink-0" />
                  <p className="text-[rgba(255,255,255,0.5)] text-[11px] font-['Geist_Mono'] line-clamp-1">
                    {cert.issuer}
                  </p>
                </div>
                <p className="text-[rgba(255,255,255,0.35)] text-[11px] font-['Geist_Mono'] mb-2">
                  {cert.year}
                </p>
                {cert.credentialId && (
                  <div className="flex items-center gap-1 mb-3">
                    <Hash size={10} className="text-[rgba(255,255,255,0.3)] shrink-0" />
                    <p className="text-[rgba(255,255,255,0.3)] text-[10px] font-['Geist_Mono'] truncate">
                      {cert.credentialId}
                    </p>
                  </div>
                )}

                {/* View Certificate button */}
                <div className="mt-auto pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <button
                    onClick={() => setActiveModal(cert.image)}
                    className="w-full flex items-center justify-center gap-1.5 text-[#2252FF] text-[11px] font-['Geist_Mono'] hover:text-white transition-colors py-1.5 hover:bg-[rgba(34,82,255,0.1)] rounded"
                    aria-label={`View ${cert.name} certificate`}
                  >
                    <ExternalLink size={11} />
                    View Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Credential Sphere */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Interactive Credential Vault
            </span>
          </div>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              height: 'clamp(300px, 50vh, 500px)',
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(2, 19, 33, 0.6), #030305)',
            }}
          >
            {showSphere && (
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[rgba(255,255,255,0.5)] font-['Geist_Mono'] text-sm">Loading 3D Scene...</div>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                  <CredentialScene />
                </Canvas>
              </Suspense>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <p className="text-[rgba(255,255,255,0.35)] text-xs font-['Geist_Mono']">
                Interactive 3D Credential Vault — Drag to rotate
              </p>
              <p className="text-[rgba(255,255,255,0.25)] text-xs font-['Geist_Mono'] hidden sm:block">
                {certifications.length} Credentials
              </p>
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-[2px] bg-[#FFCD00]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Journey &amp; Milestones
            </span>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-white font-['Geist'] mb-12">
            My Path So Far
          </h3>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 md:-translate-x-[1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2252FF] via-[#FFCD00] to-[#D0FF71]" />

            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                  className={`relative flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start gap-6 md:gap-12`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#030305] border-2 border-[#FFCD00] z-10 mt-2"
                    style={event.highlight ? { boxShadow: '0 0 15px rgba(255, 205, 0, 0.5)', borderColor: '#FFCD00' } : {}}
                  />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`glass-card p-5 hover:border-[rgba(255,205,0,0.3)] transition-all duration-300 ${event.highlight ? 'border-[rgba(255,205,0,0.3)]' : ''}`}>
                      <span className="text-[#2252FF] text-xs font-['Geist_Mono'] mb-2 block">
                        {event.year}
                      </span>
                      <h4 className="text-white font-semibold font-['Geist'] mb-2">
                        {event.title}
                      </h4>
                      <p className="text-[rgba(255,255,255,0.6)] text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal Lightbox */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="absolute -top-10 right-0 text-white/60 hover:text-white font-['Geist_Mono'] text-sm transition-colors"
              aria-label="Close certificate viewer"
            >
              ✕ Close
            </button>
            <img
              src={activeModal}
              alt="Certificate"
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
