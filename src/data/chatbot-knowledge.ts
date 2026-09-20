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
    keywords: ['projects', 'built', 'made', 'work', 'portfolio', 'carbonwise', 'fedmed', 'plantguard', 'auraflow', 'game coach', 'atm', 'netsentry', 'ppe'],
    response:
      'Muhil has built 12+ innovative projects including:\n\n1. CarbonWise — Real-time ML carbon intelligence platform (Top 25/3700+ teams at Quest Global Ingenium 2026)\n2. Smart PPE Compliance Monitoring — Fail-safe industrial safety system with ESP32 and ESP-NOW\n3. NetSentry-AI — AI-powered Network Incident Triage Assistant\n4. FedMed-AI — Privacy-preserving federated learning for lung cancer detection\n5. PlantGuard AI — Multi-crop disease detection with bilingual UI\n6. EcoGrid Sentinel — ESP32-based environmental monitoring prototype\n7. Carbon-Optimizer — AI-powered carbon reduction platform\n8. AuraFlow — Emergency traffic management with IoT monitoring\n9. Food Delivery Time Prediction — ML prediction project\n10. Student CGPA Prediction — Linear regression ML project\n11. AI Game Coach — Adaptive gameplay performance tracker\n12. ATM Simulation — Full OOP banking system in Java',
  },
  {
    keywords: ['skills', 'know', 'technologies', 'tech stack', 'languages', 'python', 'java', 'javascript', 'react', 'fastapi'],
    response:
      "Muhil's technical skills include:\n\nProgramming: Python, Java, JavaScript, SQL, C\nFrontend: React, HTML/CSS/JS\nBackend: FastAPI, Flask, REST APIs, Spring Boot\nAI/ML: Machine Learning, Deep Learning, CNN, Federated Learning, GenAI/NLP, scikit-learn\nIoT & Engineering: ESP32, ESP-NOW, RFID, Embedded Systems, IoT Architecture, MQTT\nTools/Cloud: Git/GitHub, VS Code, Linux, Vercel",
  },
  {
    keywords: ['carbonwise', 'carbon', 'quest global', 'ingenium', 'award', 'top 25'],
    response:
      'CarbonWise is Muhil\'s flagship project — a real-time grid carbon intelligence system that placed Top 25 out of 3,700+ teams at Quest Global Ingenium 2026! It computes Carbon Intensity across 15-minute intervals using ML, with a FastAPI backend, React dashboard, cloud DB, and AI energy report generator. Live Demo: https://carbon-wise-ma0728.streamlit.app/',
  },
  {
    keywords: ['ppe', 'safety', 'interlock', 'esp-now', 'hardware', 'embedded'],
    response:
      'The Smart PPE Compliance Monitoring system is a fail-safe industrial safety project. It monitors PPE compliance, authenticates workers via RFID, communicates between ESP32 nodes using ESP-NOW, and controls machine access through a safety interlock mechanism with heartbeat monitoring and tamper detection.',
  },
  {
    keywords: ['sih', 'hackathon', 'qualcomm', 'smart india'],
    response:
      'Muhil was shortlisted in the Smart India Hackathon 2026 Internal Hackathon for Hardware Problem SIH26178, organized by Qualcomm Inc. This is a verified achievement — internal hackathon shortlisting only.',
  },
  {
    keywords: ['fedmed', 'federated', 'privacy', 'hospital', 'medical', 'healthcare'],
    response:
      'FedMed-AI is a federated learning framework for privacy-preserving lung cancer detection. It implements differential privacy and secure aggregation protocols to train AI on distributed medical data without sharing patient information.',
  },
  {
    keywords: ['experience', 'internship', 'intern', 'elevence', 'techzy', 'bsnl', 'training'],
    response:
      'Muhil\'s experience includes:\n\n1. Full Stack Web Development Intern — Elevence Skills (2026 – Present, Ongoing)\n2. AI/ML Training — Techzy IT Solutions (June 2026, 1 month)\n   Project: Food Delivery Time Prediction\n3. In-Plant Training — BSNL Madurai SSA (June 2025, 1 Week)\n\nHe is also Technical Presenter & Student Coordinator at IEEE.',
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
      'Muhil is a 3rd-year B.E. Electronics & Communication Engineering student (Minor: Computer Science) at V.S.B Engineering College, Karur. CGPA: 7.93 | Expected Graduation: 2028.',
  },
  {
    keywords: ['leetcode', 'dsa', 'coding', 'problems', 'competitive'],
    response: `Muhil has solved ${PORTFOLIO_STATS.leetcodeProblems} LeetCode problems in Java. Profile: ${PORTFOLIO_LINKS.leetcode}`,
  },
  {
    keywords: ['github', 'repositories', 'repos'],
    response: `Muhil has ${PORTFOLIO_STATS.githubRepos} public GitHub repositories. Profile: ${PORTFOLIO_LINKS.github}`,
  },
  {
    keywords: ['achievements', 'awards', 'milestone', 'journey', 'crypt-era'],
    response:
      "Muhil's key achievements:\n\n- Top 25/3700+ Teams at Quest Global Ingenium 2026\n- Shortlisted in SIH 2026 Internal Hackathon — SIH26178 — Hardware — Qualcomm Inc.\n- 7 Industry Certifications (GUVI, HCL, Cisco, NASSCOM Gold, NPTEL, Infosys, AWS)\n- Research paper presented at CRYPTERA 2026 (CIT)\n- 100+ LeetCode Problems Solved\n- 16+ Public GitHub Repositories\n- IEEE Student Branch Technical Presenter & Coordinator",
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone', 'linkedin', 'github'],
    response:
      `You can reach Muhil at:\n\nEmail: ${PORTFOLIO_LINKS.email}\nPhone: ${PORTFOLIO_LINKS.phone}\nLinkedIn: ${PORTFOLIO_LINKS.linkedin}\nGitHub: ${PORTFOLIO_LINKS.github}\nLeetCode: ${PORTFOLIO_LINKS.leetcode}\nLocation: Dindigul, Tamil Nadu, India`,
  },
  {
    keywords: ['about', 'who', 'tell me about', 'background', 'bio'],
    response:
      'Muhil Amuthan M is a 3rd-year B.E. ECE student with a Minor in Computer Science at V.S.B Engineering College, Karur. He is an aspiring ML Engineer who builds practical projects across Machine Learning, Full-Stack Development, Embedded Systems, and IoT. Currently interning at Elevence Skills, he is comfortable with Python and Java, participates in hackathons, and is actively practicing DSA.',
  },
];

export const defaultResponse =
  "That's an interesting question! I'm Muhil's AI assistant with knowledge about his work, skills, experience, and projects. Try asking about:\n\n• His projects (CarbonWise, PPE Compliance, NetSentry-AI)\n• Technical skills (Python, ML, React, ESP32, etc.)\n• Experience & training\n• Certifications (GUVI, Cisco, NASSCOM, AWS)\n• SIH 2026 achievement\n• Availability for internships\n• Contact information\n\nOr reach Muhil directly at m.muhilamuthan@gmail.com";

export const suggestedQuestions = [
  'What projects has Muhil built?',
  'What are his technical skills?',
  'Tell me about his experience',
  'Is Muhil available for internships?',
  'What certifications does he have?',
];
