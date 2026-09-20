export interface ExperienceEntry {
  id: number;
  role: string;
  company: string;
  period: string;
  status: 'ongoing' | 'completed';
  description: string;
  project?: string;
  certificate?: string;
  tags: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    id: 1,
    role: "Full Stack Web Development Intern",
    company: "Elevence Skills",
    period: "2026 – Present",
    status: "ongoing",
    description: "Currently pursuing a Full Stack Web Development Internship at Elevence Skills, developing web applications and gaining hands-on industry experience in frontend and backend workflows.",
    tags: ["Full Stack", "React", "Web Development", "Ongoing"]
  },
  {
    id: 2,
    role: "Artificial Intelligence & Machine Learning Training",
    company: "Techzy IT Solutions",
    period: "04 June 2026 – 30 June 2026",
    status: "completed",
    description: "Completed a 1-month intensive AI/ML training focused on practical machine learning. Developed a Food Delivery Time Prediction system as the project.",
    project: "Food Delivery Time Prediction",
    certificate: "/cert-techzy.png",
    tags: ["AI/ML", "Machine Learning", "Python"]
  },
  {
    id: 3,
    role: "In-Plant Training",
    company: "BSNL — Madurai Secondary Switching Area",
    period: "16 June 2025 (1 Week)",
    status: "completed",
    description: "Completed in-plant training at Bharat Sanchar Nigam Limited, Madurai Secondary Switching Area. Gained hands-on exposure to telecommunications infrastructure and network operations.",
    certificate: "/cert-bsnl.jpg",
    tags: ["Telecom", "Networking", "In-Plant Training"]
  }
];
