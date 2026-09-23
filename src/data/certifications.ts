export const CERTIFICATION_COUNT = 8;

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  image: string;
  pdf?: string;
  category: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    id: 8,
    name: "Pega Internship Certificate",
    issuer: "Pegasystems Worldwide India & SmartBridge",
    year: "September 2026",
    image: "/cert-pega.png",
    pdf: "/Pega.pdf",
    category: "Workflow Automation",
    credentialId: "PEGA-SW-NIP-2026-1000"
  },
  {
    id: 1,
    name: "Applied AI: Statistics to NLP",
    issuer: "GUVI | HCL",
    year: "June 2026",
    image: "/cred-guvi.png",
    category: "AI/ML",
    credentialId: "T79EF01B41148m67i0"
  },
  {
    id: 2,
    name: "Introduction to IoT",
    issuer: "Cisco Networking Academy",
    year: "Nov 2025",
    image: "/cred-cisco.png",
    category: "IoT"
  },
  {
    id: 3,
    name: "Analog Circuits (Elite)",
    issuer: "NPTEL — IIT Bombay",
    year: "Jan–Mar 2026",
    image: "/cred-nptel.jpg",
    category: "Electronics",
    credentialId: "NPTEL26EE23S654900116"
  },
  {
    id: 4,
    name: "IoT & Digital Transformation (Gold)",
    issuer: "NASSCOM FutureSkills Prime",
    year: "Mar 2026",
    image: "/cred-nasscom.png",
    category: "IoT",
    credentialId: "FSP/2026/3/10265869"
  },
  {
    id: 5,
    name: "Introduction to Deep Learning",
    issuer: "Infosys Springboard",
    year: "May 2026",
    image: "/cred-infosys-dl.png",
    category: "AI/ML"
  },
  {
    id: 6,
    name: "Introduction to Artificial Intelligence",
    issuer: "Infosys Springboard",
    year: "May 2026",
    image: "/cred-infosys-ai.png",
    category: "AI/ML"
  },
  {
    id: 7,
    name: "Fundamentals of Generative AI",
    issuer: "AWS Training & Certification",
    year: "July 2026",
    image: "/cred-aws.jpg",
    category: "AI/ML"
  }
];
