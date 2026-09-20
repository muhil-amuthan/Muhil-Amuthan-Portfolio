export interface Project {
  id: number;
  title: string;
  badge: string;
  description: string;
  tech: string[];
  github: string;
  category: string;
  image: string;
  award?: string;
  featured?: boolean;
  demo?: string;
}

export const projects: Project[] = [
  // ═══════════════════════════════════════════════════════════
  //  FEATURED PROJECTS
  // ═══════════════════════════════════════════════════════════
  {
    id: 1,
    title: "CarbonWise",
    badge: "AI/ML + Full-Stack",
    description:
      "An end-to-end real-time ML web application that computes Carbon Intensity (CI) across 15-minute intervals. Features a FastAPI backend, React frontend, cloud database integration, and an AI natural-language energy report generator.",
    tech: ["Python", "FastAPI", "React", "Machine Learning", "Cloud DB"],
    github: "https://github.com/muhil-amuthan/CarbonWise",
    category: "AI/ML",
    image: "/carbonwise-dashboard.png",
    award: "Top 25 / 3700+ Teams — Quest Global Ingenium 2026",
    featured: true,
    demo: "https://carbon-wise-ma0728.streamlit.app/",
  },
  {
    id: 7,
    title: "Smart PPE Compliance Monitoring",
    badge: "Hardware / Embedded",
    description:
      "A fail-safe industrial safety system that monitors PPE compliance, authenticates workers via RFID, communicates between ESP32 nodes using ESP-NOW, and controls machine access through a safety interlock mechanism with heartbeat monitoring and tamper detection.",
    tech: ["ESP32", "Embedded C/C++", "ESP-NOW", "RFID", "Relay", "Machine Interlock"],
    github: "#",
    category: "IoT / Hardware",
    image: "/images/projects/ppe-compliance.png",
    featured: true,
  },
  {
    id: 8,
    title: "NetSentry-AI",
    badge: "AI + Systems",
    description:
      "AI-powered Network Incident Triage Assistant that groups noisy network alerts into incidents, prioritizes their impact, retrieves relevant troubleshooting runbooks, provides evidence-backed recommendations, and escalates unknown incidents to human engineers.",
    tech: ["Python", "FastAPI", "React", "REST APIs"],
    github: "https://github.com/muhil-amuthan/NetSentry-AI",
    category: "Systems",
    image: "/images/projects/netsentry-ai.png",
    featured: true,
  },
  {
    id: 2,
    title: "FedMed-AI",
    badge: "AI/ML",
    description:
      "A federated learning framework for privacy-preserving lung cancer detection. Implements differential privacy and secure aggregation protocols to train AI on distributed medical data without sharing patient information.",
    tech: ["Python", "Federated Learning", "Differential Privacy", "CNN", "TypeScript"],
    github: "https://github.com/muhil-amuthan/FedMed-AI",
    category: "AI/ML",
    image: "/fedmed-network.png",
    featured: true,
  },

  // ═══════════════════════════════════════════════════════════
  //  MORE PROJECTS
  // ═══════════════════════════════════════════════════════════
  {
    id: 9,
    title: "Carbon-Optimizer",
    badge: "AI/ML + Full-Stack",
    description:
      "AI-powered industrial carbon intelligence platform that calculates operational CO₂ emissions and recommends cost-effective sustainability actions to maximize carbon reduction within a fixed budget.",
    tech: ["Python", "FastAPI", "React", "Machine Learning"],
    github: "https://github.com/muhil-amuthan/Carbon-Optimizer",
    category: "AI/ML",
    image: "/images/projects/carbon-optimizer.png",
    demo: "https://carbon-optimizer.vercel.app",
  },
  {
    id: 3,
    title: "PlantGuard AI",
    badge: "AI/ML + Full-Stack",
    description:
      "Full-stack CNN web app detecting plant diseases from leaf images. Returns confidence score, severity analysis, treatment plan & prevention tips. Bilingual UI (Tamil/English) with scan history dashboard.",
    tech: ["Python", "Flask", "Deep Learning", "CNN", "HTML/CSS/JS"],
    github: "https://github.com/muhil-amuthan/Plant-Disease-Detection-Using-Deep-Learning",
    category: "AI/ML",
    image: "/plantguard-app.png",
  },
  {
    id: 10,
    title: "EcoGrid Sentinel",
    badge: "IoT + Embedded",
    description:
      "An ESP32-based environmental monitoring prototype integrating multiple sensors (DHT11, MQ-135, Ultrasonic, Rain, Turbidity), OLED/LCD display, data logging to SD card, relay-based automation, and IoT connectivity.",
    tech: ["ESP32", "Embedded C", "IoT", "Sensors", "OLED", "SD Card"],
    github: "#",
    category: "IoT / Hardware",
    image: "/images/projects/ecogrid-sentinel.png",
  },
  {
    id: 4,
    title: "AuraFlow",
    badge: "IoT + AI",
    description:
      "Emergency traffic management system using A* Search algorithm for optimal emergency routing with 5km geofencing. Includes real-time IoT water quality monitoring subsystem.",
    tech: ["Python", "A* Algorithm", "IoT", "Geofencing"],
    github: "https://github.com/muhil-amuthan/Traffic_master",
    category: "Systems",
    image: "/auraflow-emergency.png",
  },
  {
    id: 11,
    title: "Food Delivery Time Prediction",
    badge: "AI/ML",
    description:
      "Machine learning project to predict food delivery time using Linear Regression and Decision Tree Regression, considering factors like distance, traffic, weather, and courier experience.",
    tech: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
    github: "https://github.com/muhil-amuthan/Food-Delivery-Time-Prediction",
    category: "AI/ML",
    image: "/images/projects/food-delivery-prediction.png",
  },
  {
    id: 12,
    title: "Student CGPA Prediction",
    badge: "AI/ML",
    description:
      "Predicting student CGPA using Linear Regression in Python. Demonstrates fundamental ML concepts including data preprocessing, model training, evaluation, and prediction.",
    tech: ["Python", "scikit-learn", "pandas", "Linear Regression"],
    github: "https://github.com/muhil-amuthan/Student-CGPA-Prediction",
    category: "AI/ML",
    image: "/images/projects/student-cgpa-prediction.png",
  },
  {
    id: 5,
    title: "AI Game Coach",
    badge: "AI / Full-Stack",
    description:
      "Tracks gameplay performance, analyzes improvement trends, and recommends personalized session targets. Built with intelligent AI logic for adaptive coaching feedback.",
    tech: ["HTML", "JavaScript", "AI Logic"],
    github: "https://github.com/muhil-amuthan/AI-Game-Coach",
    category: "Full-Stack",
    image: "/images/projects/ai-game-coach.png",
    demo: "https://ai-game-coach.vercel.app",
  },
  {
    id: 6,
    title: "ATM Simulation System",
    badge: "Java",
    description:
      "Java-based console application demonstrating ATM functionality and transaction logic using OOP principles including inheritance, polymorphism, and exception handling.",
    tech: ["Java", "OOP", "Core Java"],
    github: "https://github.com/muhil-amuthan/ATM-Simulation",
    category: "Full-Stack",
    image: "/images/projects/atm-simulation.png",
  },
];

export const categories = ["All", "AI/ML", "Full-Stack", "IoT / Hardware", "Systems"];
