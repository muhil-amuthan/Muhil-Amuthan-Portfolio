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
      { name: 'Python', level: 92 },
      { name: 'Java(DSA)', level: 85 },
      { name: 'SQL', level: 78 },
      { name: 'C', level: 70 },
    ],
  },
  {
    category: 'Frontend',
    color: '#D0FF71',
    skills: [
      { name: 'React', level: 50 },
      { name: 'HTML/CSS/JS', level: 90 },
      { name: 'Responsive UI', level: 82 },
    ],
  },
  {
    category: 'Backend',
    color: '#06B6D4',
    skills: [
      { name: 'FastAPI', level: 88 },
      { name: 'Flask', level: 82 },
      { name: 'FireBase', level: 85 },
      { name: 'Java (OOP)', level: 85 },
    ],
  },
  {
    category: 'Database',
    color: '#8B5CF6',
    skills: [
      { name: 'SQL', level: 78 },
      
      { name: 'Data Modeling', level: 70 },
    ],
  },
  {
    category: 'AI / ML',
    color: '#2252FF',
    skills: [
      { name: 'Machine Learning', level: 75 },
      { name: 'Deep Learning', level: 70 },
      { name: 'Federated Learning', level: 40 },
      { name: 'Differential Privacy', level: 78 },
      { name: 'GenAI / NLP', level: 50 },
    ],
  },
  {
    category: 'Tools / Cloud',
    color: '#FFCD00',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'VS Code', level: 92 },
      { name: 'IntelliJ', level: 80 },
      
      { name: 'Linux', level: 72 },
      { name: 'AWS (GenAI Fundamentals)', level: 70 },
    ],
  },
  {
    category: 'IoT & Engineering',
    color: '#F97316',
    skills: [
      { name: 'Microcontrollers', level: 80 },
      { name: 'IoT Architecture', level: 82 },
      { name: 'Embedded Systems', level: 75 },
      { name: 'Computer Networks', level: 78 },
      { name: 'Data Structures', level: 88 },
    ],
  },
];
