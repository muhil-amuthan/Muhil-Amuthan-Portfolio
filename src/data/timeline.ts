export interface TimelineEvent {
  year: string;
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2022',
    icon:'10th std',
    title:'Completed 10th Standared',
    description:'Completed 10th standared in Buds Matric Hr Sec School with the 74.6%'
  },
  {
    year: '2024',
    icon: 'GraduationCap',
    title: 'Joined V.S.B. Engineering College',
    description:
      'Started B.E. ECE with a Minor in Computer Science. Began the journey to build AI systems that create real-world impact.',
  },
  {
    year: '2024',
    icon: 'Users',
    title: 'Joined IEEE Student Branch',
    description:
      'Became Student Coordinator, bridging technology and community through workshops and events.',
  },
  {
    year: '2025',
    icon: 'Wifi',
    title: 'In-Plant Training — BSNL India',
    description:
      'Hands-on exposure to telecom network infrastructure, switching systems, and real-time OSI-layer communication technologies in Madurai SSA.',
  },
  {
    year: '2025',
    icon: 'Leaf',
    title: 'Launched PlantGuard AI',
    description:
      'First full-stack CNN web app for plant disease detection — bilingual, production-ready with Tamil/English support.',
  },
  {
    year: '2025',
    icon: 'Ambulance',
    title: 'Built AuraFlow — Emergency Routing',
    description:
      'A* algorithm + IoT system that reduced simulated emergency response times by 20% with geofencing capabilities.',
  },
  {
    year: '2026',
    icon: 'Trophy',
    title: 'TOP 25 / 3700+ Teams — Quest Global Ingenium',
    description:
      'CarbonWise placed in the top 1% at a pan-India competition — a real-time ML carbon intelligence platform.',
    highlight: true,
  },
  {
    year: '2026',
    icon: 'Brain',
    title: 'Architected FedMed-AI',
    description:
      '1000-node federated learning framework for medical-grade privacy in lung cancer detection.',
  },
  {
    year: '2026',
    icon: 'Briefcase',
    title: 'Full Stack Web Development Intern — ElevanceSkills',
    description:
      'Ongoing internship building full-stack web applications and contributing to production-oriented development workflows.',
    highlight: true,
  },
  {
    year: '2026',
    icon: 'Cpu',
    title: 'AI/ML Intern — TECHZY IT SOLUTIONS',
    description:
      'Completed internship project on Food Delivery Time Prediction during June 2026.',
  },
  {
    year: '2026',
    icon: 'Mic',
    title: 'Presented at CRYPTERA 2026 (CIT)',
    description:
      'Presented ML research paper to 100+ engineers and faculty at a national inter-college symposium.',
  },
  {
    year: '2026',
    icon: 'Code2',
    title: '90+ LeetCode Problems Solved',
    description:
      'Consistent DSA practice with 90+ problems solved on LeetCode.',
  },
  {
    year: '2026',
    icon: 'Shield',
    title: 'NASSCOM IoT Gold Certification',
    description:
      'Earned industry-recognized Gold certification in IoT & Digital Transformation.',
  },
  {
    year: '2026',
    icon: 'Cpu',
    title: 'Applied AI Certification — GUVI & HCL',
    description:
      'Completed Applied AI (Statistics to NLP) certification, strengthening foundations in AI, ML, and NLP.',
    highlight: true,
  },
  {
    year: '2026',
    icon: 'GitBranch',
    title: '11+ Public GitHub Repositories',
    description:
      'Built a strong open-source presence with 11+ public repositories across AI/ML and full-stack projects.',
  },
];
