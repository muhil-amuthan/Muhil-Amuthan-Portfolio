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
}

export const projects: Project[] = [
  {
    id: 1,
    title: "CarbonWise",
    badge: "AI/ML + Full-Stack",
    description: "An end-to-end real-time ML web application that computes Carbon Intensity (CI) across 15-minute intervals. Features a FastAPI backend, React frontend, cloud database integration, and an AI natural-language energy report generator.",
    tech: ["Python", "FastAPI", "React", "Machine Learning", "Cloud DB"],
    github: "https://github.com/muhil-amuthan",
    category: "AI/ML",
    image: "/carbonwise-dashboard.png",
    award: "Top 25 / 3700+ Teams — Quest Global Ingenium 2026"
  },
  {
    id: 2,
    title: "FedMed-AI",
    badge: "AI/ML",
    description: "A federated learning framework simulating 1,000 hospital nodes with zero patient data leakage. Implements differential privacy and secure aggregation protocols for medical-grade security in lung cancer detection.",
    tech: ["Python", "Federated Learning", "Differential Privacy", "CNN"],
    github: "https://github.com/muhil-amuthan",
    category: "AI/ML",
    image: "/fedmed-network.png"
  },
  {
    id: 3,
    title: "PlantGuard AI",
    badge: "AI/ML + Full-Stack",
    description: "Full-stack CNN web app detecting plant diseases from leaf images. Returns confidence score, severity analysis, treatment plan & prevention tips. Bilingual UI (Tamil/English) with scan history dashboard.",
    tech: ["Python", "Flask", "Deep Learning", "CNN", "HTML/CSS/JS"],
    github: "https://github.com/muhil-amuthan",
    category: "AI/ML",
    image: "/plantguard-app.png"
  },
  {
    id: 4,
    title: "AuraFlow",
    badge: "IoT + AI",
    description: "Emergency traffic management system using A* Search algorithm for optimal emergency routing with 5km geofencing. Reduced simulated response times by 20%. Includes real-time IoT water quality monitoring subsystem.",
    tech: ["Python", "A* Algorithm", "IoT", "Geofencing"],
    github: "https://github.com/muhil-amuthan",
    category: "IoT",
    image: "/auraflow-emergency.png"
  },
  {
    id: 5,
    title: "AI Game Coach",
    badge: "AI/Full-Stack",
    description: "Tracks gameplay performance, analyzes improvement trends, and recommends personalized session targets. Built with intelligent AI logic for adaptive coaching feedback.",
    tech: ["HTML", "JavaScript", "AI Logic"],
    github: "https://github.com/muhil-amuthan",
    category: "Full-Stack",
    image: "/carbonwise-dashboard.png"
  },
  {
    id: 6,
    title: "ATM Simulation System",
    badge: "Java",
    description: "Full OOP banking simulation in Java covering core transaction logic, inheritance, polymorphism, and exception handling. Demonstrates clean software architecture principles.",
    tech: ["Java", "OOP", "Core Java"],
    github: "https://github.com/muhil-amuthan",
    category: "Java",
    image: "/fedmed-network.png"
  }
];

export const categories = ["All", "AI/ML", "Full-Stack", "IoT", "Java"];
