import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { knowledgeBase, defaultResponse, suggestedQuestions } from '../data/chatbot-knowledge';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (lower.includes(keyword.toLowerCase())) {
        return entry.response;
      }
    }
  }
  return defaultResponse;
}

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

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Muhil's AI assistant. Ask me about his projects, skills, certifications, or anything!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const { ref: sectionRef, inView } = useInView(0.1);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: userText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(userText);
      const botMsg: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  return (
    <section id="chatbot" className="relative py-24 lg:py-32" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:w-[40%]"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#2252FF]" />
              <span className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-[2px]">
                AI Assistant
              </span>
            </div>
            <h2 className="text-3xl lg:text-[40px] font-bold text-white font-['Geist'] leading-[1.1] mb-6">
              Ask Muhil AI
            </h2>
            <p className="text-[rgba(255,255,255,0.65)] text-base leading-[1.7] font-['Geist'] mb-8">
              Can't reach me? Ask my AI clone anything about my work, skills, certifications, projects, or availability for internships and collaborations.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Sparkles, text: 'Instant answers about my portfolio' },
                { icon: Bot, text: '24/7 availability for queries' },
                { icon: User, text: 'Personalized responses about my journey' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(34,82,255,0.15)] flex items-center justify-center">
                    <feature.icon size={16} className="text-[#2252FF]" />
                  </div>
                  <span className="text-[rgba(255,255,255,0.6)] text-sm font-['Geist']">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column — Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-[60%]"
          >
            <div className="glass-outer">
              <div className="glass-mid">
                <div className="glass-inner">
                  {/* Messages Area */}
                  <div
                    ref={messagesContainerRef}
                    className="h-[320px] overflow-y-auto mb-4 space-y-4 pr-2"
                    style={{ background: 'rgba(3, 3, 5, 0.6)', borderRadius: '12px', padding: '16px' }}
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] px-4 py-3 rounded-xl text-sm font-['Geist'] whitespace-pre-line ${
                            msg.sender === 'user'
                              ? 'bg-[#2252FF] text-white rounded-br-sm'
                              : 'bg-[rgba(34,82,255,0.15)] text-[rgba(255,255,255,0.85)] rounded-bl-sm border border-[rgba(34,82,255,0.2)]'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-[rgba(34,82,255,0.15)] px-4 py-3 rounded-xl rounded-bl-sm border border-[rgba(34,82,255,0.2)]">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-[rgba(255,255,255,0.5)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-[rgba(255,255,255,0.5)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-[rgba(255,255,255,0.5)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggested Questions */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="text-xs font-['Geist_Mono'] px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.5)] hover:border-[#2252FF] hover:text-[#2252FF] transition-all duration-200"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask me anything about Muhil..."
                      className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.4)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors"
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isTyping}
                      className="bg-[#2252FF] text-white px-5 py-3 rounded-lg font-['Geist'] text-sm hover:bg-[#3952FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
