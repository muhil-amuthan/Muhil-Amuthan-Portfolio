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
];
