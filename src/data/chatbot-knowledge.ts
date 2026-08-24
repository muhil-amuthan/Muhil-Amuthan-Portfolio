import { CERTIFICATION_COUNT } from './certifications';
import { PORTFOLIO_LINKS, PORTFOLIO_STATS } from './portfolio';

export interface KnowledgeEntry {
  keywords: string[];
  response: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'namaste', 'hola'],
    response:
      "Hi there! I'm Muhil's AI assistant. Ask me about his projects, skills, certifications, experience, or availability for internships!",
  },
  {
    keywords: ['projects', 'built', 'made', 'work', 'portfolio', 'carbonwise', 'fedmed', 'plantguard', 'auraflow', 'game coach', 'atm'],
    response:
      'Muhil has built 7+ innovative projects including:\n\n1. CarbonWise — Real-time ML carbon intelligence platform (Top 25/3700+ teams at Quest Global Ingenium 2026)\n2. FedMed-AI — Privacy-preserving federated learning for lung cancer detection\n3. PlantGuard AI — Multi-crop disease detection with bilingual UI\n4. AuraFlow — Emergency traffic management with IoT monitoring\n5. AI Game Coach — Adaptive gameplay performance tracker\n6. ATM Simulation — Full OOP banking system in Java',
  },
  {
    keywords: ['skills', 'know', 'technologies', 'tech stack', 'languages', 'python', 'java', 'javascript', 'react', 'fastapi'],
    response:
      "Muhil's technical skills include:\n\nProgramming: Python, Java, JavaScript, SQL, C\nFrontend: React, HTML/CSS/JS\nBackend: FastAPI, Flask, REST APIs, Java OOP\nAI/ML: Machine Learning, Deep Learning, CNN, Federated Learning, GenAI/NLP\nIoT & Engineering: Microcontrollers, IoT Architecture, Embedded Systems, Computer Networks\nTools/Cloud: Git/GitHub, VS Code, Docker, Linux, AWS (GenAI Fundamentals)",
  },
  {
    keywords: ['carbonwise', 'carbon', 'quest global', 'ingenium', 'award', 'top 25'],
    response:
      'CarbonWise is Muhil\'s flagship project — a real-time grid carbon intelligence system that placed Top 25 out of 3,700+ teams at Quest Global Ingenium 2026! It computes Carbon Intensity across 15-minute intervals using ML, with a FastAPI backend, React dashboard, cloud DB, and AI energy report generator.',
  },
  {
    keywords: ['fedmed', 'federated', 'privacy', 'hospital', 'medical', 'healthcare'],
    response:
      'FedMed-AI is a federated learning framework simulating 1,000 hospital nodes with differential privacy — zero patient data ever leaves local systems. It uses secure aggregation protocols for medical-grade lung cancer detection with CNN architecture.',
  },
  {
    keywords: ['experience', 'internship', 'intern', 'elevance', 'techzy', 'bsnl'],
    response:
      'Muhil\'s experience includes:\n\n1. Full Stack Web Development Intern — ElevanceSkills (2026 – Present, Ongoing)\n2. AI/ML Intern — TECHZY IT SOLUTIONS (04 June – 30 June 2026, Completed)\n   Project: Food Delivery Time Prediction\n3. In-Plant Training — BSNL Madurai SSA (June 2025, 1 Week, Completed)\n\nHe is also Technical Presenter & Student Coordinator at IEEE.',
  },
  {
    keywords: ['available', 'hire', 'job', 'opportunity', 'work with', 'collaboration'],
    response:
      `Yes! Muhil is actively looking for internships in Software Engineering, AI/ML, or Full-Stack Development. Reach him at ${PORTFOLIO_LINKS.email} or through the contact form!`,
  },
  {
    keywords: ['certifications', 'certified', 'courses', 'guvi', 'hcl', 'cisco', 'nptel', 'nasscom', 'infosys', 'aws'],
    response:
      `Muhil holds ${CERTIFICATION_COUNT} certifications:\n\n1. Applied AI (Statistics to NLP) — GUVI & HCL\n2. Introduction to IoT — Cisco Networking Academy\n3. Analog Circuits (Elite) — NPTEL, IIT Bombay\n4. IoT & Digital Transformation (Gold) — NASSCOM FutureSkills Prime\n5. Introduction to Deep Learning — Infosys Springboard\n6. Introduction to Artificial Intelligence — Infosys Springboard\n7. Fundamentals of Generative AI — AWS Training & Certification`,
  },
  {
    keywords: ['education', 'college', 'university', 'study', 'cgpa', 'degree', 'vsb'],
    response:
      'Muhil is pursuing B.E. Electronics & Communication Engineering (Minor: Computer Science) at V.S.B. Engineering College, Karur, Tamil Nadu. CGPA: 8.00 | Expected Graduation: 2028.',
  },
  {
    keywords: ['leetcode', 'dsa', 'coding', 'problems', 'competitive'],
    response: `Muhil has solved ${PORTFOLIO_STATS.leetcodeProblems} LeetCode problems. Profile: ${PORTFOLIO_LINKS.leetcode}`,
  },
  {
    keywords: ['github', 'repositories', 'repos'],
    response: `Muhil has ${PORTFOLIO_STATS.githubRepos} public GitHub repositories. Profile: ${PORTFOLIO_LINKS.github}`,
  },
  {
    keywords: ['achievements', 'awards', 'milestone', 'journey', 'crypt-era'],
    response:
      "Muhil's key achievements:\n\n- Top 25/3700+ Teams at Quest Global Ingenium 2026\n- 7 Industry Certifications (GUVI, HCL, Cisco, NASSCOM Gold, NPTEL, Infosys, AWS)\n- Research paper presented at CRYPTERA 2026 (CIT) to 100+ engineers\n- 80+ LeetCode Problems Solved\n- 11+ Public GitHub Repositories\n- IEEE Student Branch Technical Presenter & Coordinator",
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone', 'linkedin', 'github'],
    response:
      `You can reach Muhil at:\n\nEmail: ${PORTFOLIO_LINKS.email}\nPhone: ${PORTFOLIO_LINKS.phone}\nLinkedIn: ${PORTFOLIO_LINKS.linkedin}\nGitHub: ${PORTFOLIO_LINKS.github}\nLeetCode: ${PORTFOLIO_LINKS.leetcode}\nLocation: Dindigul, Tamil Nadu, India`,
  },
  {
    keywords: ['about', 'who', 'tell me about', 'background', 'bio'],
    response:
      'Muhil Amuthan M is a 2nd-year ECE Engineering student with a Minor in Computer Science at V.S.B. Engineering College, Karur. He is a Full Stack Developer and AI/ML-focused engineer passionate about building impactful, scalable solutions across web apps, machine learning, and IoT.',
  },
];

export const defaultResponse =
  "That's an interesting question! I'm Muhil's AI assistant with knowledge about his work, skills, experience, and projects. Try asking about:\n\n• His projects (CarbonWise, FedMed-AI, PlantGuard)\n• Technical skills (Python, ML, React, etc.)\n• Experience & internships\n• Certifications (GUVI, Cisco, NASSCOM, AWS)\n• Availability for internships\n• Contact information\n\nOr reach Muhil directly at m.muhilamuthan@gmail.com";

export const suggestedQuestions = [
  'What projects has Muhil built?',
  'What are his technical skills?',
  'Tell me about his experience',
  'Is Muhil available for internships?',
  'What certifications does he have?',
];
