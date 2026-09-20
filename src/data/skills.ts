export interface SkillCategory {
  category: string;
  color: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming',
    color: '#FFFFFF',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'SQL', level: 82 },
      { name: 'C / Embedded C', level: 72 },
    ],
  },

  {
    category: 'Frontend',
    color: '#D0FF71',
    skills: [
      { name: 'HTML / CSS / JavaScript', level: 90 },
      { name: 'React', level: 75 },
      { name: 'TypeScript', level: 65 },
      { name: 'Responsive UI', level: 82 },
    ],
  },

  {
    category: 'Backend',
    color: '#06B6D4',
    skills: [
      { name: 'FastAPI', level: 88 },
      { name: 'Flask', level: 82 },
      { name: 'Spring Boot', level: 68 },
      { name: 'REST APIs', level: 85 },
      { name: 'Firebase', level: 80 },
    ],
  },

  {
    category: 'Database',
    color: '#8B5CF6',
    skills: [
      { name: 'PostgreSQL', level: 78 },
      { name: 'SQL', level: 82 },
      { name: 'Data Modeling', level: 70 },
    ],
  },

  {
    category: 'AI / ML',
    color: '#2252FF',
    skills: [
      { name: 'Machine Learning', level: 75 },
      { name: 'Deep Learning', level: 68 },
      { name: 'GenAI / NLP', level: 58 },
      { name: 'Federated Learning', level: 45 },
      { name: 'Pandas / NumPy / Matplotlib', level: 82 },
      { name: 'scikit-learn', level: 75 },
    ],
  },

  {
    category: 'Tools / Cloud',
    color: '#FFCD00',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'VS Code', level: 92 },
      { name: 'IntelliJ IDEA', level: 80 },
      { name: 'Linux', level: 72 },
      { name: 'Vercel', level: 80 },
      { name: 'Render', level: 78 },
    ],
  },

  {
    category: 'IoT & Engineering',
    color: '#F97316',
    skills: [
      { name: 'ESP32', level: 82 },
      { name: 'Embedded Systems', level: 78 },
      { name: 'ESP-NOW', level: 72 },
      { name: 'RFID', level: 68 },
      { name: 'IoT Architecture', level: 82 },
      { name: 'MQTT', level: 72 },
      { name: 'Computer Networks', level: 78 },
      { name: 'Data Structures & Algorithms', level: 85 },
    ],
  },
];
