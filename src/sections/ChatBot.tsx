import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, X } from 'lucide-react';
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

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Muhil's AI assistant. Ask me about his projects, skills, 100+ LeetCode progress, certifications, or availability for internships!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const userText = text || input.trim();
    if (!userText || isTyping) return;

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
    }, 450 + Math.random() * 350);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-[calc(100vw-2.5rem)] sm:w-[390px] h-[540px] max-h-[80vh] flex flex-col bg-[#070b14]/95 border border-[rgba(34,82,255,0.3)] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(34,82,255,0.15)] backdrop-blur-2xl overflow-hidden mb-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-[rgba(255,255,255,0.08)] bg-[#04060a]/90">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#2252FF] to-[#8B5CF6] flex items-center justify-center text-white shadow-[0_0_12px_rgba(34,82,255,0.4)]">
                  <Bot size={18} />
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#D0FF71] border-2 border-[#04060a]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-white text-sm font-semibold font-['Geist'] leading-none">
                      Muhil AI
                    </h3>
                    <span className="text-[10px] font-['Geist_Mono'] px-1.5 py-0.5 rounded bg-[rgba(34,82,255,0.2)] text-[#2252FF] font-medium">
                      Assistant
                    </span>
                  </div>
                  <p className="text-[rgba(255,255,255,0.45)] text-[11px] font-['Geist_Mono'] mt-1">
                    Ask anything about Muhil's work
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[rgba(255,255,255,0.5)] hover:text-white hover:bg-white/5 transition-colors"
                  aria-label="Close Chatbot"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm font-['Geist']">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isUser
                          ? 'bg-[rgba(34,82,255,0.2)] text-[#2252FF]'
                          : 'bg-white/10 text-white'
                      }`}
                    >
                      {isUser ? <User size={15} /> : <Bot size={15} />}
                    </div>

                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                        isUser
                          ? 'bg-[#2252FF] text-white rounded-tr-none shadow-[0_2px_10px_rgba(34,82,255,0.3)]'
                          : 'bg-[rgba(255,255,255,0.06)] text-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.08)] rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                    <Bot size={15} />
                  </div>
                  <div className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#2252FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-[#2252FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-[#2252FF] rounded-full animate-bounce" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Questions */}
            <div className="px-3.5 py-2 border-t border-[rgba(255,255,255,0.06)] bg-[#04060a]/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <Sparkles size={12} className="text-[#FFCD00] shrink-0 ml-1" />
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="shrink-0 text-[11px] font-['Geist_Mono'] px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.7)] hover:border-[#2252FF] hover:text-white hover:bg-[rgba(34,82,255,0.1)] transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#04060a]/80">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Muhil AI anything..."
                  className="flex-1 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[rgba(255,255,255,0.35)] font-['Geist'] focus:outline-none focus:border-[#2252FF] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-xl bg-[#2252FF] hover:bg-[#1a44e0] text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(34,82,255,0.4)] shrink-0"
                  aria-label="Send Message"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0a0f1d] border border-[rgba(34,82,255,0.4)] text-white shadow-[0_0_25px_rgba(34,82,255,0.3),0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#2252FF] hover:shadow-[0_0_30px_rgba(34,82,255,0.5)] transition-all font-['Geist']"
        aria-label="Toggle Muhil AI Chatbot"
      >
        <div className="relative">
          <span className="text-lg">🤖</span>
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0FF71] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D0FF71]" />
          </span>
        </div>
        <span className="text-xs font-semibold tracking-wide text-white group-hover:text-[#2252FF] transition-colors">
          {isOpen ? 'Close AI' : 'Muhil AI'}
        </span>
      </motion.button>
    </div>
  );
}
