export interface Achievement {
  id: number;
  title: string;
  subtitle: string;
  details: string[];
  badge: string;
  badgeColor: string;
  accentColor: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "Quest Global Ingenium 2026",
    subtitle: "Top 25 among 3,700+ Teams",
    details: [
      "Project: CarbonWise — Industrial Carbon Intelligence Platform",
      "AI-powered carbon analysis with real-time monitoring",
    ],
    badge: "Top 25",
    badgeColor: "rgba(255,205,0,0.15)",
    accentColor: "#FFCD00",
    icon: "Trophy",
  },
  {
    id: 2,
    title: "100+ LeetCode Problems Solved",
    subtitle: "Data Structures & Algorithms in Java",
    details: [
      "Solved 100+ algorithmic challenges across Arrays, Trees, DP, and Graphs",
      "Continuous competitive coding practice on LeetCode",
    ],
    badge: "100+ Solved",
    badgeColor: "rgba(255,161,22,0.15)",
    accentColor: "#FFA116",
    icon: "Code2",
  },
  {
    id: 3,
    title: "Smart India Hackathon 2026",
    subtitle: "Shortlisted — Internal Hackathon",
    details: [
      "Problem Statement: SIH26178",
      "Category: Hardware",
      "Organization: Qualcomm Inc.",
    ],
    badge: "SIH 2026",
    badgeColor: "rgba(34,82,255,0.15)",
    accentColor: "#2252FF",
    icon: "Award",
  },
  {
    id: 4,
    title: "16+ Public GitHub Repositories",
    subtitle: "Open-Source Engineering Projects",
    details: [
      "Projects across AI/ML, Full-Stack Development, IoT, and Java",
      "All repositories publicly documented and active on GitHub",
    ],
    badge: "16+ Repos",
    badgeColor: "rgba(208,255,113,0.15)",
    accentColor: "#D0FF71",
    icon: "Github",
  },
];
