import { useRef, useState, useEffect, Suspense, Component, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { certifications } from '../data/certifications';
import { ExternalLink, Award, Hash, ShieldCheck } from 'lucide-react';
import { useInView } from '../hooks/useInView';

/* WebGL Error Boundary to prevent 3D scene crashes from breaking the whole page */
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('3D WebGL scene error caught safely:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
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

/* Certificate Thumbnail with image fallback */
function CertThumbnail({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0c1222] to-[#04060a] flex flex-col items-center justify-center p-3 text-center">
        <ShieldCheck size={28} className="text-[#2252FF] mb-1 opacity-80" />
        <span className="text-[rgba(255,255,255,0.4)] text-[10px] font-['Geist_Mono'] uppercase">
          Verified Credential
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export default function Certifications() {
  const { ref: sectionRef, inView } = useInView(0.02);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop, { passive: true });
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <section id="certifications" className="relative py-16 sm:py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
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
            Industry-recognized credentials in AI, IoT, and Software Development from leading global organizations.
          </p>
        </motion.div>

        {/* Certification Cards Grid — Mobile & Desktop Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16 sm:mb-20">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
              className="glass-card p-4 group hover:border-[rgba(34,82,255,0.4)] hover:shadow-[0_0_20px_rgba(34,82,255,0.15)] transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative rounded-lg overflow-hidden mb-4 bg-white/5" style={{ aspectRatio: '4/3' }}>
                <CertThumbnail src={cert.image} alt={`${cert.name} certificate`} />
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
                <h3 className="text-white text-sm font-semibold font-['Geist'] leading-snug mb-1 line-clamp-2">
                  {cert.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-1">
                  <Award size={12} className="text-[#2252FF] shrink-0" />
                  <p className="text-[rgba(255,255,255,0.55)] text-[11px] font-['Geist_Mono'] line-clamp-1">
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

                {/* View Certificate button (touch-friendly min 44px) */}
                <div className="mt-auto pt-2 border-t border-[rgba(255,255,255,0.06)]">
                  <button
                    onClick={() => setActiveModal(cert.image)}
                    className="w-full flex items-center justify-center gap-1.5 text-[#2252FF] text-[12px] font-['Geist_Mono'] hover:text-white transition-colors py-2.5 min-h-[44px] hover:bg-[rgba(34,82,255,0.1)] active:scale-95 rounded-lg"
                    aria-label={`View ${cert.name} certificate`}
                  >
                    <ExternalLink size={13} />
                    View Certificate
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 3D Credential Vault (Rendered with WebGLErrorBoundary) */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#2252FF]" />
              <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
                Interactive Credential Vault
              </span>
            </div>
            <div
              className="relative rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.06)]"
              style={{
                height: '420px',
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(2, 19, 33, 0.6), #030305)',
              }}
            >
              <WebGLErrorBoundary
                fallback={
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <ShieldCheck size={48} className="text-[#2252FF] mb-3 opacity-60" />
                    <span className="text-white font-['Geist'] text-base font-semibold mb-1">
                      Credential Vault Verified
                    </span>
                    <span className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono']">
                      All {certifications.length} credentials certified and verified
                    </span>
                  </div>
                }
              >
                {isDesktop && (
                  <Suspense
                    fallback={
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[rgba(255,255,255,0.5)] font-['Geist_Mono'] text-sm">Loading 3D Vault...</div>
                      </div>
                    }
                  >
                    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                      <CredentialScene />
                    </Canvas>
                  </Suspense>
                )}
              </WebGLErrorBoundary>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <p className="text-[rgba(255,255,255,0.35)] text-xs font-['Geist_Mono']">
                  Interactive 3D Credential Vault — Drag to rotate
                </p>
                <p className="text-[rgba(255,255,255,0.25)] text-xs font-['Geist_Mono']">
                  {certifications.length} Credentials
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Certificate viewer"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveModal(null)}
              className="self-end mb-2 text-white/70 hover:text-white font-['Geist_Mono'] text-sm px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all min-h-[44px]"
              aria-label="Close certificate viewer"
            >
              ✕ Close
            </button>
            <img
              src={activeModal}
              alt="Certificate"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
