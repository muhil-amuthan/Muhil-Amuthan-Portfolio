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
    company: "ElevanceSkills",
    period: "2026 – Present",
    status: "ongoing",
    description: "Currently working as a Full Stack Web Development Intern, building and improving web applications using modern development practices.",
    tags: ["Full Stack", "Web Development", "Ongoing"]
  },
  {
    id: 2,
    role: "Artificial Intelligence & Machine Learning Intern",
    company: "Techzy IT Solutions",
    period: "04 June 2026 – 30 June 2026",
    status: "completed",
    description: "Completed an AI/ML internship focused on practical machine learning. Developed a Food Delivery Time Prediction system as the internship project.",
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
