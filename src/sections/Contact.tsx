import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Phone, Copy, Check, Send, ArrowUpRight, Code2, FileText } from 'lucide-react';
import Toast from '../components/Toast';
import { PORTFOLIO_LINKS } from '../data/portfolio';

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

interface ContactCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  href?: string;
}

function ContactCard({ icon: Icon, label, value, href }: ContactCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="glass-card p-5 group hover:border-[rgba(34,82,255,0.4)] hover:shadow-[0_0_20px_rgba(34,82,255,0.1)] transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-[rgba(34,82,255,0.15)] flex items-center justify-center group-hover:bg-[rgba(34,82,255,0.25)] transition-colors shrink-0">
          <Icon size={18} className="text-[#2252FF]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-0.5">{label}</p>
          <p className="text-white text-sm font-['Geist'] truncate">{value}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="text-[rgba(255,255,255,0.3)] hover:text-[#2252FF] transition-colors shrink-0"
          title="Copy"
        >
          {copied ? <Check size={16} className="text-[#D0FF71]" /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}

const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ||
  (import.meta.env.VITE_FORMSPREE_ID
    ? `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
    : 'https://formspree.io/f/mkjwlovz');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const { ref: sectionRef, inView } = useInView(0.1);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    // Client-side validation
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) {
      setToast({ message: 'Please enter your name.', type: 'error' });
      return;
    }
    if (!email || !EMAIL_REGEX.test(email)) {
      setToast({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    if (!subject) {
      setToast({ message: 'Please enter a subject.', type: 'error' });
      return;
    }
    if (!message) {
      setToast({ message: 'Please enter your message.', type: 'error' });
      return;
    }

    setSending(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          subject,
          _subject: `New Portfolio Message from ${name}: ${subject}`,
          message,
          submittedAt: new Date().toLocaleString(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setToast({
          message: 'Message sent successfully! I will get back to you soon.',
          type: 'success',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorMessage =
          data?.errors?.map((err: { message: string }) => err.message).join(', ') ||
          'Failed to send message. Please try emailing directly to m.muhilamuthan@gmail.com.';
        setToast({ message: errorMessage, type: 'error' });
      }
    } catch {
      setToast({
        message: 'Network error. Please try again or email directly to m.muhilamuthan@gmail.com.',
        type: 'error',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#2252FF]" />
            <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
              Let's Build Something
            </span>
            <span className="w-8 h-[2px] bg-[#2252FF]" />
          </div>
          <h2 className="text-3xl lg:text-[48px] font-bold text-white font-['Geist'] leading-[1.1] mb-4">
            Get in Touch
          </h2>
          <p className="text-[rgba(255,255,255,0.5)] text-base max-w-[560px] mx-auto">
            Open to internships, collaborations, and exciting projects. Let's create something impactful together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <ContactCard icon={Mail} label="Email" value="m.muhilamuthan@gmail.com" href={`mailto:${PORTFOLIO_LINKS.email}`} />
            <ContactCard icon={Linkedin} label="LinkedIn" value="linkedin.com/in/muhil-amuthan-m" href={PORTFOLIO_LINKS.linkedin} />
            <ContactCard icon={Github} label="GitHub" value="github.com/muhil-amuthan" href={PORTFOLIO_LINKS.github} />
            <ContactCard icon={Code2} label="LeetCode" value="leetcode.com/u/Muhil-Amuthan_M" href={PORTFOLIO_LINKS.leetcode} />
            <ContactCard icon={FileText} label="Resume" value="View / Download Resume" href={PORTFOLIO_LINKS.resume} />
            <ContactCard icon={MapPin} label="Location" value="Dindigul, Tamil Nadu, India" />
            <ContactCard icon={Phone} label="Phone" value="+91 9486729719" href="tel:+919486729719" />

            {/* Social Links */}
            <div className="pt-6">
              <p className="text-[rgba(255,255,255,0.4)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-4">
                Also find me on
              </p>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', href: PORTFOLIO_LINKS.github },
                  { name: 'LeetCode', href: PORTFOLIO_LINKS.leetcode },
                  { name: 'LinkedIn', href: PORTFOLIO_LINKS.linkedin },
                  { name: 'Resume', href: PORTFOLIO_LINKS.resume },
                  { name: 'Email', href: `mailto:${PORTFOLIO_LINKS.email}` },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgba(255,255,255,0.5)] hover:text-[#2252FF] text-sm font-['Geist'] flex items-center gap-1 transition-colors"
                  >
                    {link.name}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    disabled={sending}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.3)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    disabled={sending}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.3)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors disabled:opacity-60"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  disabled={sending}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.3)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors disabled:opacity-60"
                  placeholder="What's this about?"
                />
              </div>

              <div className="mb-6">
                <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  disabled={sending}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.3)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors resize-none disabled:opacity-60"
                  placeholder="Tell me about your project, opportunity, or just say hi..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#2252FF] text-white py-3.5 rounded-lg font-['Geist'] text-[15px] font-medium hover:bg-[#3952FF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(34,82,255,0.4)]"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
