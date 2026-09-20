```tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Award,
  Trophy,
  User,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  ChevronRight,
  Sparkles,
  Github,
  Linkedin,
  Code2,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Cpu,
  BrainCircuit,
  Layers,
  Menu,
} from 'lucide-react';

import Toast from '../components/Toast';
import { certifications as defaultCerts } from '../data/certifications';
import { timelineEvents as defaultTimeline } from '../data/timeline';

interface AdminCert {
  id: number;
  name: string;
  issuer: string;
  year: string;
  category: string;
}

interface AdminAchievement {
  id: number;
  year: string;
  title: string;
  description: string;
  highlight: boolean;
}

interface AdminProject {
  id: number;
  name: string;
  description: string;
  technologies: string;
  github: string;
  live: string;
  featured: boolean;
}

interface AdminState {
  certs: AdminCert[];
  achievements: AdminAchievement[];
  projects: AdminProject[];
  bio: string;
  headline: string;
  education: string;
  location: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  email: string;
  skills: string[];
  stats: {
    projects: number;
    leetcode: number;
    certifications: number;
    githubRepos: number;
  };
}

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Briefcase,
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: Award,
  },
  {
    id: 'achievements',
    label: 'Achievements',
    icon: Trophy,
  },
  {
    id: 'personal',
    label: 'Personal Info',
    icon: User,
  },
];

const defaultProjects: AdminProject[] = [
  {
    id: 1,
    name: 'CarbonWise',
    description:
      'AI-powered industrial carbon intelligence platform for monitoring emissions, analyzing operational data and recommending carbon reduction strategies.',
    technologies:
      'React, TypeScript, Spring Boot, Java, Python, FastAPI, PostgreSQL, Machine Learning',
    github: 'https://github.com/muhil-amuthan/CarbonWise-Application',
    live: '',
    featured: true,
  },
  {
    id: 2,
    name: 'NetSentry-AI',
    description:
      'Network security monitoring and alert correlation platform with topology-aware incident analysis and a NOC dashboard.',
    technologies:
      'Python, FastAPI, React, TypeScript, Network Monitoring, REST API',
    github: '',
    live: '',
    featured: true,
  },
  {
    id: 3,
    name: 'EcoGrid Sentinel',
    description:
      'IoT-based environmental and carbon monitoring prototype using ESP32 sensors for real-time sustainability monitoring.',
    technologies:
      'ESP32, IoT, Sensors, MQTT, OLED, DHT11, MQ-135, Embedded C',
    github: '',
    live: '',
    featured: true,
  },
  {
    id: 4,
    name: 'ATM Simulation',
    description:
      'Java console-based ATM application implementing core banking operations and user interaction.',
    technologies: 'Java, OOP, Console Application',
    github: '',
    live: '',
    featured: false,
  },
  {
    id: 5,
    name: 'AI Game Coach',
    description:
      'AI-assisted game coaching application with authentication and intelligent game-related assistance.',
    technologies:
      'Python, Flask, JWT, Gemini API',
    github: '',
    live: '',
    featured: false,
  },
];

const defaultSkills = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'React',
  'Spring Boot',
  'FastAPI',
  'SQL',
  'Machine Learning',
  'Deep Learning',
  'IoT',
  'Embedded Systems',
  'Git',
  'GitHub',
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [showAddCert, setShowAddCert] = useState(false);
  const [showAddAch, setShowAddAch] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  const [editingCert, setEditingCert] = useState<number | null>(null);
  const [editingAch, setEditingAch] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<number | null>(null);

  const [state, setState] = useState<AdminState>(() => {
    const saved = localStorage.getItem('adminData');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        return {
          ...parsed,
          projects: parsed.projects || defaultProjects,
          education:
            parsed.education ||
            'B.E. Electronics & Communication Engineering',
          location: parsed.location || 'Tamil Nadu, India',
          resumeUrl: parsed.resumeUrl || '',
          githubUrl:
            parsed.githubUrl ||
            'https://github.com/muhil-amuthan',
          linkedinUrl:
            parsed.linkedinUrl ||
            'https://www.linkedin.com/',
          leetcodeUrl:
            parsed.leetcodeUrl ||
            'https://leetcode.com/u/Muhil-Amuthan-M/',
          email: parsed.email || 'm.muhilamuthan@gmail.com',
          skills: parsed.skills || defaultSkills,
          stats: {
            projects: parsed.stats?.projects ?? defaultProjects.length,
            leetcode: parsed.stats?.leetcode ?? 85,
            certifications:
              parsed.stats?.certifications ?? parsed.certs?.length ?? 0,
            githubRepos: parsed.stats?.githubRepos ?? 11,
          },
        };
      } catch {
        // Ignore invalid localStorage data
      }
    }

    return {
      certs: defaultCerts.map((c) => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        year: c.year,
        category: c.category,
      })),

      achievements: [
        {
          id: 1,
          year: '2026',
          title: 'Top 25 - Quest Global Ingenium 2026',
          description:
            'Ranked among the Top 25 teams out of 3,700+ participating teams in Quest Global Ingenium 2026.',
          highlight: true,
        },
        ...defaultTimeline
          .filter(
            (t) =>
              !t.title
                .toLowerCase()
                .includes('quest global ingenium')
          )
          .map((t, i) => ({
            id: i + 2,
            year: t.year,
            title: t.title,
            description: t.description,
            highlight: t.highlight || false,
          })),
      ],

      projects: defaultProjects,

      bio:
        'I am Muhil Amuthan M, a 3rd-year B.E. Electronics & Communication Engineering student passionate about Machine Learning, Full-Stack Development, IoT and Embedded Systems. I enjoy building practical solutions that combine software, AI and hardware to solve real-world problems.',

      headline:
        'B.E. ECE Student | ML Engineer Aspirant | Full-Stack Developer | IoT Innovator',

      education:
        'B.E. Electronics & Communication Engineering',

      location: 'Tamil Nadu, India',

      resumeUrl: '',

      githubUrl:
        'https://github.com/muhil-amuthan',

      linkedinUrl:
        'https://www.linkedin.com/',

      leetcodeUrl:
        'https://leetcode.com/u/Muhil-Amuthan-M/',

      email: 'm.muhilamuthan@gmail.com',

      skills: defaultSkills,

      stats: {
        projects: defaultProjects.length,
        leetcode: 85,
        certifications: defaultCerts.length,
        githubRepos: 11,
      },
    };
  });

  const [newCert, setNewCert] = useState({
    name: '',
    issuer: '',
    year: '',
    category: 'AI/ML',
  });

  const [newAch, setNewAch] = useState({
    year: '',
    title: '',
    description: '',
    highlight: false,
  });

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: '',
    github: '',
    live: '',
    featured: false,
  });

  const [editCertData, setEditCertData] = useState({
    name: '',
    issuer: '',
    year: '',
    category: '',
  });

  const [editAchData, setEditAchData] = useState({
    year: '',
    title: '',
    description: '',
    highlight: false,
  });

  const [editProjectData, setEditProjectData] = useState({
    name: '',
    description: '',
    technologies: '',
    github: '',
    live: '',
    featured: false,
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');

    if (auth !== 'authenticated') {
      navigate('/admin');
    }
  }, [navigate]);

  const saveData = (newState: AdminState) => {
    setState(newState);
    localStorage.setItem('adminData', JSON.stringify(newState));
  };

  const showSuccess = (message: string) => {
    setToast({
      message,
      type: 'success',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  // ---------------------------------------------------------
  // CERTIFICATES
  // ---------------------------------------------------------

  const handleAddCert = () => {
    if (!newCert.name || !newCert.issuer || !newCert.year) {
      setToast({
        message: 'Please fill all required certificate fields.',
        type: 'error',
      });
      return;
    }

    const cert: AdminCert = {
      ...newCert,
      id: Date.now(),
    };

    const newState = {
      ...state,
      certs: [...state.certs, cert],
      stats: {
        ...state.stats,
        certifications: state.certs.length + 1,
      },
    };

    saveData(newState);

    setNewCert({
      name: '',
      issuer: '',
      year: '',
      category: 'AI/ML',
    });

    setShowAddCert(false);

    showSuccess('Certificate added successfully!');
  };

  const handleDeleteCert = (id: number) => {
    const newCerts = state.certs.filter((c) => c.id !== id);

    const newState = {
      ...state,
      certs: newCerts,
      stats: {
        ...state.stats,
        certifications: newCerts.length,
      },
    };

    saveData(newState);

    showSuccess('Certificate deleted');
  };

  const handleEditCert = (cert: AdminCert) => {
    setEditingCert(cert.id);

    setEditCertData({
      name: cert.name,
      issuer: cert.issuer,
      year: cert.year,
      category: cert.category,
    });
  };

  const handleSaveCert = (id: number) => {
    const newState = {
      ...state,

      certs: state.certs.map((c) =>
        c.id === id
          ? {
              ...c,
              ...editCertData,
            }
          : c
      ),
    };

    saveData(newState);

    setEditingCert(null);

    showSuccess('Certificate updated!');
  };

  // ---------------------------------------------------------
  // ACHIEVEMENTS
  // ---------------------------------------------------------

  const handleAddAch = () => {
    if (!newAch.title || !newAch.year) {
      setToast({
        message: 'Please enter achievement title and year.',
        type: 'error',
      });
      return;
    }

    const ach: AdminAchievement = {
      ...newAch,
      id: Date.now(),
    };

    const newState = {
      ...state,
      achievements: [...state.achievements, ach],
    };

    saveData(newState);

    setNewAch({
      year: '',
      title: '',
      description: '',
      highlight: false,
    });

    setShowAddAch(false);

    showSuccess('Achievement added!');
  };

  const handleDeleteAch = (id: number) => {
    const newState = {
      ...state,
      achievements: state.achievements.filter(
        (a) => a.id !== id
      ),
    };

    saveData(newState);

    showSuccess('Achievement deleted');
  };

  const handleEditAch = (ach: AdminAchievement) => {
    setEditingAch(ach.id);

    setEditAchData({
      year: ach.year,
      title: ach.title,
      description: ach.description,
      highlight: ach.highlight,
    });
  };

  const handleSaveAch = (id: number) => {
    const newState = {
      ...state,

      achievements: state.achievements.map((a) =>
        a.id === id
          ? {
              ...a,
              ...editAchData,
            }
          : a
      ),
    };

    saveData(newState);

    setEditingAch(null);

    showSuccess('Achievement updated!');
  };

  // ---------------------------------------------------------
  // PROJECTS
  // ---------------------------------------------------------

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) {
      setToast({
        message: 'Project name and description are required.',
        type: 'error',
      });
      return;
    }

    const project: AdminProject = {
      ...newProject,
      id: Date.now(),
    };

    const newProjects = [...state.projects, project];

    const newState = {
      ...state,
      projects: newProjects,
      stats: {
        ...state.stats,
        projects: newProjects.length,
      },
    };

    saveData(newState);

    setNewProject({
      name: '',
      description: '',
      technologies: '',
      github: '',
      live: '',
      featured: false,
    });

    setShowAddProject(false);

    showSuccess('Project added successfully!');
  };

  const handleDeleteProject = (id: number) => {
    const newProjects = state.projects.filter(
      (project) => project.id !== id
    );

    const newState = {
      ...state,
      projects: newProjects,
      stats: {
        ...state.stats,
        projects: newProjects.length,
      },
    };

    saveData(newState);

    showSuccess('Project deleted');
  };

  const handleEditProject = (project: AdminProject) => {
    setEditingProject(project.id);

    setEditProjectData({
      name: project.name,
      description: project.description,
      technologies: project.technologies,
      github: project.github,
      live: project.live,
      featured: project.featured,
    });
  };

  const handleSaveProject = (id: number) => {
    const newState = {
      ...state,

      projects: state.projects.map((project) =>
        project.id === id
          ? {
              ...project,
              ...editProjectData,
            }
          : project
      ),
    };

    saveData(newState);

    setEditingProject(null);

    showSuccess('Project updated!');
  };

  // ---------------------------------------------------------
  // SKILLS
  // ---------------------------------------------------------

  const handleAddSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    if (
      state.skills.some(
        (existingSkill) =>
          existingSkill.toLowerCase() === skill.toLowerCase()
      )
    ) {
      setToast({
        message: 'Skill already exists.',
        type: 'error',
      });
      return;
    }

    const newState = {
      ...state,
      skills: [...state.skills, skill],
    };

    saveData(newState);

    setNewSkill('');

    showSuccess('Skill added!');
  };

  const handleDeleteSkill = (skill: string) => {
    const newState = {
      ...state,
      skills: state.skills.filter(
        (existingSkill) => existingSkill !== skill
      ),
    };

    saveData(newState);

    showSuccess('Skill removed');
  };

  // ---------------------------------------------------------
  // PERSONAL INFORMATION
  // ---------------------------------------------------------

  const handleSavePersonal = () => {
    localStorage.setItem('adminData', JSON.stringify(state));

    showSuccess('Personal information saved!');
  };

  const inputClass =
    "w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-4 py-3 text-sm text-white placeholder-[rgba(255,255,255,0.3)] focus:outline-none focus:border-[#2252FF] transition-colors";

  const smallInputClass =
    "bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2252FF]";

  return (
    <div className="min-h-[100dvh] bg-[#030305] text-white">

      {/* MOBILE HEADER */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#030305] border-b border-[rgba(255,255,255,0.06)] flex items-center justify-between px-5">

        <div>
          <span className="font-bold tracking-wider font-['Geist']">
            MUHIL
          </span>

          <p className="text-[9px] text-[rgba(255,255,255,0.4)] font-['Geist_Mono']">
            ADMIN PANEL
          </p>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white"
        >
          {mobileMenuOpen ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>
      </div>

      {/* SIDEBAR */}

      <aside
        className={`
          w-[240px]
          border-r border-[rgba(255,255,255,0.06)]
          flex flex-col
          fixed
          h-full
          z-40
          bg-[#030305]
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            mobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >

        <div className="p-6 border-b border-[rgba(255,255,255,0.06)] hidden lg:block">

          <span className="text-white font-bold text-lg tracking-wider font-['Geist']">
            MUHIL
          </span>

          <p className="text-[rgba(255,255,255,0.4)] text-[10px] font-['Geist_Mono'] mt-1">
            PORTFOLIO ADMIN
          </p>

        </div>

        <nav className="flex-1 p-4 space-y-1 mt-16 lg:mt-0">

          {sidebarItems.map((item) => (

            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                text-sm
                font-['Geist']
                transition-all
                duration-200
                ${
                  activeTab === item.id
                    ? 'bg-[rgba(34,82,255,0.15)] text-white border-l-2 border-[#2252FF]'
                    : 'text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'
                }
              `}
            >

              <item.icon size={18} />

              {item.label}

            </button>

          ))}

        </nav>

        <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-['Geist'] text-[rgba(255,255,255,0.5)] hover:bg-[rgba(255,0,0,0.1)] hover:text-red-400 transition-all"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="lg:ml-[240px] p-5 lg:p-8 pt-24 lg:pt-8">

        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >

          {/* ================================================= */}
          {/* DASHBOARD */}
          {/* ================================================= */}

          {activeTab === 'dashboard' && (

            <div>

              <div className="mb-8">

                <p className="text-[#2252FF] text-xs font-['Geist_Mono'] uppercase tracking-widest mb-2">
                  Welcome back
                </p>

                <h2 className="text-2xl lg:text-3xl font-bold text-white font-['Geist']">
                  Muhil Amuthan
                </h2>

                <p className="text-[rgba(255,255,255,0.45)] mt-2 text-sm">
                  Manage your portfolio, projects and achievements.
                </p>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">

                {[
                  {
                    label: 'Projects',
                    value: state.stats.projects,
                    icon: Briefcase,
                  },
                  {
                    label: 'LeetCode',
                    value: `${state.stats.leetcode}+`,
                    icon: Code2,
                  },
                  {
                    label: 'GitHub Repos',
                    value: `${state.stats.githubRepos}+`,
                    icon: Github,
                  },
                  {
                    label: 'Certificates',
                    value: state.certs.length,
                    icon: Award,
                  },
                ].map((stat) => (

                  <div
                    key={stat.label}
                    className="glass-card p-5 lg:p-6"
                  >

                    <div className="flex items-center justify-between mb-4">

                      <div className="w-10 h-10 rounded-lg bg-[rgba(34,82,255,0.12)] flex items-center justify-center">

                        <stat.icon
                          size={19}
                          className="text-[#2252FF]"
                        />

                      </div>

                    </div>

                    <div className="text-2xl lg:text-3xl font-bold text-white font-['Geist']">
                      {stat.value}
                    </div>

                    <div className="text-[10px] text-[rgba(255,255,255,0.4)] font-['Geist_Mono'] uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>

                  </div>

                ))}

              </div>

              {/* PROFILE CARD */}

              <div className="glass-card p-6 lg:p-8 mb-6">

                <div className="flex flex-col lg:flex-row gap-6">

                  <div className="w-16 h-16 rounded-2xl bg-[rgba(34,82,255,0.12)] border border-[rgba(34,82,255,0.25)] flex items-center justify-center shrink-0">

                    <BrainCircuit
                      size={30}
                      className="text-[#2252FF]"
                    />

                  </div>

                  <div>

                    <p className="text-xs text-[#2252FF] font-['Geist_Mono'] uppercase tracking-wider mb-2">
                      Current Focus
                    </p>

                    <h3 className="text-xl font-semibold font-['Geist'] mb-2">
                      Machine Learning + Full-Stack + IoT
                    </h3>

                    <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed max-w-3xl">
                      Building practical applications by combining
                      machine learning, backend systems, modern
                      frontend technologies and embedded/IoT systems.
                    </p>

                  </div>

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="glass-card p-6">

                <h3 className="text-white font-semibold font-['Geist'] mb-5">
                  Quick Actions
                </h3>

                <div className="flex flex-wrap gap-4">

                  <button
                    onClick={() => setActiveTab('projects')}
                    className="flex items-center gap-2 text-[#2252FF] text-sm font-['Geist'] hover:underline"
                  >
                    <ChevronRight size={16} />
                    Manage Projects
                  </button>

                  <button
                    onClick={() => setActiveTab('certificates')}
                    className="flex items-center gap-2 text-[#FFCD00] text-sm font-['Geist'] hover:underline"
                  >
                    <ChevronRight size={16} />
                    Manage Certificates
                  </button>

                  <button
                    onClick={() => setActiveTab('achievements')}
                    className="flex items-center gap-2 text-[#D0FF71] text-sm font-['Geist'] hover:underline"
                  >
                    <ChevronRight size={16} />
                    Manage Achievements
                  </button>

                  <button
                    onClick={() => setActiveTab('personal')}
                    className="flex items-center gap-2 text-[#D0FF71] text-sm font-['Geist'] hover:underline"
                  >
                    <ChevronRight size={16} />
                    Edit Profile
                  </button>

                </div>

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* PROJECTS */}
          {/* ================================================= */}

          {activeTab === 'projects' && (

            <div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <div>

                  <h2 className="text-2xl font-bold font-['Geist']">
                    Manage Projects
                  </h2>

                  <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">
                    Add and update your portfolio projects.
                  </p>

                </div>

                <button
                  onClick={() =>
                    setShowAddProject(!showAddProject)
                  }
                  className="flex items-center justify-center gap-2 bg-[#2252FF] text-white px-4 py-2.5 rounded-lg text-sm font-['Geist'] hover:bg-[#3952FF]"
                >

                  <Plus size={16} />

                  Add Project

                </button>

              </div>

              {showAddProject && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="glass-card p-6 mb-6"
                >

                  <h3 className="font-semibold mb-5">
                    Add New Project
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <input
                      placeholder="Project Name"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          name: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Technologies"
                      value={newProject.technologies}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          technologies: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <textarea
                      placeholder="Project Description"
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          description: e.target.value,
                        })
                      }
                      className={`${inputClass} sm:col-span-2 resize-none`}
                      rows={3}
                    />

                    <input
                      placeholder="GitHub URL"
                      value={newProject.github}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          github: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Live Demo URL"
                      value={newProject.live}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          live: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                  </div>

                  <label className="flex items-center gap-2 mt-4 text-sm text-[rgba(255,255,255,0.6)]">

                    <input
                      type="checkbox"
                      checked={newProject.featured}
                      onChange={(e) =>
                        setNewProject({
                          ...newProject,
                          featured: e.target.checked,
                        })
                      }
                    />

                    Featured Project

                  </label>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={handleAddProject}
                      className="bg-[#2252FF] px-4 py-2 rounded-lg text-sm"
                    >
                      Add Project
                    </button>

                    <button
                      onClick={() =>
                        setShowAddProject(false)
                      }
                      className="text-[rgba(255,255,255,0.5)] px-4 py-2 text-sm"
                    >
                      Cancel
                    </button>

                  </div>

                </motion.div>

              )}

              <div className="space-y-4">

                {state.projects.map((project) => (

                  <div
                    key={project.id}
                    className={`glass-card p-5 ${
                      project.featured
                        ? 'border-[rgba(34,82,255,0.3)]'
                        : ''
                    }`}
                  >

                    {editingProject === project.id ? (

                      <div className="space-y-4">

                        <div className="grid sm:grid-cols-2 gap-3">

                          <input
                            value={editProjectData.name}
                            onChange={(e) =>
                              setEditProjectData({
                                ...editProjectData,
                                name: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                          <input
                            value={editProjectData.technologies}
                            onChange={(e) =>
                              setEditProjectData({
                                ...editProjectData,
                                technologies: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                          <textarea
                            value={editProjectData.description}
                            onChange={(e) =>
                              setEditProjectData({
                                ...editProjectData,
                                description: e.target.value,
                              })
                            }
                            className={`${smallInputClass} sm:col-span-2 resize-none`}
                            rows={3}
                          />

                          <input
                            value={editProjectData.github}
                            onChange={(e) =>
                              setEditProjectData({
                                ...editProjectData,
                                github: e.target.value,
                              })
                            }
                            className={smallInputClass}
                            placeholder="GitHub URL"
                          />

                          <input
                            value={editProjectData.live}
                            onChange={(e) =>
                              setEditProjectData({
                                ...editProjectData,
                                live: e.target.value,
                              })
                            }
                            className={smallInputClass}
                            placeholder="Live URL"
                          />

                        </div>

                        <label className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.6)]">

                          <input
                            type="checkbox"
                            checked={
                              editProjectData.featured
                            }
                            onChange={(e) =>
                              setEditProjectData({
                                ...editProjectData,
                                featured: e.target.checked,
                              })
                            }
                          />

                          Featured Project

                        </label>

                        <div className="flex gap-4">

                          <button
                            onClick={() =>
                              handleSaveProject(project.id)
                            }
                            className="text-[#D0FF71] flex items-center gap-1 text-sm"
                          >
                            <Save size={15} />
                            Save
                          </button>

                          <button
                            onClick={() =>
                              setEditingProject(null)
                            }
                            className="text-[rgba(255,255,255,0.4)] flex items-center gap-1 text-sm"
                          >
                            <X size={15} />
                            Cancel
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div className="flex items-start gap-4">

                        <div className="w-11 h-11 rounded-xl bg-[rgba(34,82,255,0.12)] flex items-center justify-center shrink-0">

                          <Layers
                            size={19}
                            className="text-[#2252FF]"
                          />

                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap items-center gap-2 mb-1">

                            <h3 className="font-semibold">
                              {project.name}
                            </h3>

                            {project.featured && (

                              <span className="text-[9px] bg-[rgba(34,82,255,0.15)] text-[#2252FF] px-2 py-1 rounded-full font-['Geist_Mono']">
                                FEATURED
                              </span>

                            )}

                          </div>

                          <p className="text-sm text-[rgba(255,255,255,0.5)] leading-relaxed mb-3">
                            {project.description}
                          </p>

                          <p className="text-[11px] text-[#D0FF71] font-['Geist_Mono']">
                            {project.technologies}
                          </p>

                          <div className="flex gap-4 mt-4">

                            {project.github && (

                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-[rgba(255,255,255,0.5)] hover:text-white"
                              >
                                <Github size={14} />
                                GitHub
                              </a>

                            )}

                            {project.live && (

                              <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-xs text-[rgba(255,255,255,0.5)] hover:text-white"
                              >
                                <ExternalLink size={14} />
                                Live
                              </a>

                            )}

                          </div>

                        </div>

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleEditProject(project)
                            }
                            className="text-[rgba(255,255,255,0.4)] hover:text-[#2252FF]"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteProject(project.id)
                            }
                            className="text-[rgba(255,255,255,0.4)] hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* CERTIFICATES */}
          {/* ================================================= */}

          {activeTab === 'certificates' && (

            <div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <h2 className="text-2xl font-bold font-['Geist']">
                  Manage Certificates
                </h2>

                <button
                  onClick={() =>
                    setShowAddCert(!showAddCert)
                  }
                  className="flex items-center justify-center gap-2 bg-[#2252FF] text-white px-4 py-2 rounded-lg text-sm"
                >

                  <Plus size={16} />

                  Add Certificate

                </button>

              </div>

              {showAddCert && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="glass-card p-6 mb-6"
                >

                  <h3 className="font-semibold mb-4">
                    Add New Certificate
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <input
                      placeholder="Certificate Name"
                      value={newCert.name}
                      onChange={(e) =>
                        setNewCert({
                          ...newCert,
                          name: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Issuer"
                      value={newCert.issuer}
                      onChange={(e) =>
                        setNewCert({
                          ...newCert,
                          issuer: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Year"
                      value={newCert.year}
                      onChange={(e) =>
                        setNewCert({
                          ...newCert,
                          year: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <select
                      value={newCert.category}
                      onChange={(e) =>
                        setNewCert({
                          ...newCert,
                          category: e.target.value,
                        })
                      }
                      className={inputClass}
                    >

                      <option value="AI/ML">
                        AI / ML
                      </option>

                      <option value="Full Stack">
                        Full Stack
                      </option>

                      <option value="IoT">
                        IoT
                      </option>

                      <option value="Electronics">
                        Electronics
                      </option>

                      <option value="Programming">
                        Programming
                      </option>

                    </select>

                  </div>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={handleAddCert}
                      className="bg-[#2252FF] px-4 py-2 rounded-lg text-sm"
                    >
                      Add
                    </button>

                    <button
                      onClick={() =>
                        setShowAddCert(false)
                      }
                      className="text-[rgba(255,255,255,0.5)] px-4 py-2 text-sm"
                    >
                      Cancel
                    </button>

                  </div>

                </motion.div>

              )}

              <div className="space-y-3">

                {state.certs.map((cert) => (

                  <div
                    key={cert.id}
                    className="glass-card p-4"
                  >

                    {editingCert === cert.id ? (

                      <div className="flex flex-col lg:flex-row gap-3">

                        <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">

                          <input
                            value={editCertData.name}
                            onChange={(e) =>
                              setEditCertData({
                                ...editCertData,
                                name: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                          <input
                            value={editCertData.issuer}
                            onChange={(e) =>
                              setEditCertData({
                                ...editCertData,
                                issuer: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                          <input
                            value={editCertData.year}
                            onChange={(e) =>
                              setEditCertData({
                                ...editCertData,
                                year: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                          <select
                            value={editCertData.category}
                            onChange={(e) =>
                              setEditCertData({
                                ...editCertData,
                                category: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          >

                            <option value="AI/ML">
                              AI / ML
                            </option>

                            <option value="Full Stack">
                              Full Stack
                            </option>

                            <option value="IoT">
                              IoT
                            </option>

                            <option value="Electronics">
                              Electronics
                            </option>

                            <option value="Programming">
                              Programming
                            </option>

                          </select>

                        </div>

                        <div className="flex gap-3 items-center">

                          <button
                            onClick={() =>
                              handleSaveCert(cert.id)
                            }
                            className="text-[#D0FF71]"
                          >
                            <Save size={16} />
                          </button>

                          <button
                            onClick={() =>
                              setEditingCert(null)
                            }
                            className="text-[rgba(255,255,255,0.4)]"
                          >
                            <X size={16} />
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-lg bg-[rgba(34,82,255,0.15)] flex items-center justify-center shrink-0">

                          <Award
                            size={18}
                            className="text-[#2252FF]"
                          />

                        </div>

                        <div className="flex-1 min-w-0">

                          <h4 className="text-sm font-['Geist'] truncate">
                            {cert.name}
                          </h4>

                          <p className="text-xs text-[rgba(255,255,255,0.4)] font-['Geist_Mono']">
                            {cert.issuer} · {cert.year} ·{' '}
                            {cert.category}
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            handleEditCert(cert)
                          }
                          className="text-[rgba(255,255,255,0.4)] hover:text-[#2252FF]"
                        >
                          <Edit3 size={16} />
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteCert(cert.id)
                          }
                          className="text-[rgba(255,255,255,0.4)] hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* ACHIEVEMENTS */}
          {/* ================================================= */}

          {activeTab === 'achievements' && (

            <div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                <h2 className="text-2xl font-bold font-['Geist']">
                  Manage Achievements
                </h2>

                <button
                  onClick={() =>
                    setShowAddAch(!showAddAch)
                  }
                  className="flex items-center justify-center gap-2 bg-[#2252FF] text-white px-4 py-2 rounded-lg text-sm"
                >

                  <Plus size={16} />

                  Add Achievement

                </button>

              </div>

              {showAddAch && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="glass-card p-6 mb-6"
                >

                  <h3 className="font-semibold mb-4">
                    Add New Achievement
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">

                    <input
                      placeholder="Year"
                      value={newAch.year}
                      onChange={(e) =>
                        setNewAch({
                          ...newAch,
                          year: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Achievement Title"
                      value={newAch.title}
                      onChange={(e) =>
                        setNewAch({
                          ...newAch,
                          title: e.target.value,
                        })
                      }
                      className={inputClass}
                    />

                    <textarea
                      placeholder="Description"
                      value={newAch.description}
                      onChange={(e) =>
                        setNewAch({
                          ...newAch,
                          description: e.target.value,
                        })
                      }
                      className={`${inputClass} sm:col-span-2 resize-none`}
                      rows={3}
                    />

                  </div>

                  <label className="flex items-center gap-2 mt-4 text-sm text-[rgba(255,255,255,0.6)]">

                    <input
                      type="checkbox"
                      checked={newAch.highlight}
                      onChange={(e) =>
                        setNewAch({
                          ...newAch,
                          highlight: e.target.checked,
                        })
                      }
                    />

                    Mark as highlight

                  </label>

                  <div className="flex gap-3 mt-5">

                    <button
                      onClick={handleAddAch}
                      className="bg-[#2252FF] px-4 py-2 rounded-lg text-sm"
                    >
                      Add
                    </button>

                    <button
                      onClick={() =>
                        setShowAddAch(false)
                      }
                      className="text-[rgba(255,255,255,0.5)] px-4 py-2 text-sm"
                    >
                      Cancel
                    </button>

                  </div>

                </motion.div>

              )}

              <div className="space-y-3">

                {state.achievements.map((ach) => (

                  <div
                    key={ach.id}
                    className={`glass-card p-5 ${
                      ach.highlight
                        ? 'border-[rgba(255,205,0,0.3)]'
                        : ''
                    }`}
                  >

                    {editingAch === ach.id ? (

                      <div className="space-y-3">

                        <div className="grid sm:grid-cols-2 gap-3">

                          <input
                            value={editAchData.year}
                            onChange={(e) =>
                              setEditAchData({
                                ...editAchData,
                                year: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                          <input
                            value={editAchData.title}
                            onChange={(e) =>
                              setEditAchData({
                                ...editAchData,
                                title: e.target.value,
                              })
                            }
                            className={smallInputClass}
                          />

                        </div>

                        <textarea
                          value={editAchData.description}
                          onChange={(e) =>
                            setEditAchData({
                              ...editAchData,
                              description: e.target.value,
                            })
                          }
                          className={`${smallInputClass} w-full resize-none`}
                          rows={3}
                        />

                        <label className="flex items-center gap-2 text-sm text-[rgba(255,255,255,0.6)]">

                          <input
                            type="checkbox"
                            checked={editAchData.highlight}
                            onChange={(e) =>
                              setEditAchData({
                                ...editAchData,
                                highlight:
                                  e.target.checked,
                              })
                            }
                          />

                          Highlight

                        </label>

                        <div className="flex gap-4">

                          <button
                            onClick={() =>
                              handleSaveAch(ach.id)
                            }
                            className="text-[#D0FF71] flex items-center gap-1 text-sm"
                          >
                            <Save size={14} />
                            Save
                          </button>

                          <button
                            onClick={() =>
                              setEditingAch(null)
                            }
                            className="text-[rgba(255,255,255,0.4)] flex items-center gap-1 text-sm"
                          >
                            <X size={14} />
                            Cancel
                          </button>

                        </div>

                      </div>

                    ) : (

                      <div className="flex items-start gap-4">

                        <div className="w-10 h-10 rounded-lg bg-[rgba(255,205,0,0.15)] flex items-center justify-center shrink-0">

                          <Trophy
                            size={18}
                            className="text-[#FFCD00]"
                          />

                        </div>

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap items-center gap-2 mb-1">

                            <span className="text-[#2252FF] text-xs font-['Geist_Mono']">
                              {ach.year}
                            </span>

                            {ach.highlight && (

                              <span className="text-[9px] bg-[rgba(255,205,0,0.2)] text-[#FFCD00] px-2 py-0.5 rounded-full font-['Geist_Mono']">
                                HIGHLIGHT
                              </span>

                            )}

                          </div>

                          <h4 className="text-sm font-semibold mb-1">
                            {ach.title}
                          </h4>

                          <p className="text-xs text-[rgba(255,255,255,0.5)] leading-relaxed">
                            {ach.description}
                          </p>

                        </div>

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleEditAch(ach)
                            }
                            className="text-[rgba(255,255,255,0.4)] hover:text-[#2252FF]"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleDeleteAch(ach.id)
                            }
                            className="text-[rgba(255,255,255,0.4)] hover:text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </div>

                    )}

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* ================================================= */}
          {/* PERSONAL */}
          {/* ================================================= */}

          {activeTab === 'personal' && (

            <div>

              <div className="mb-8">

                <h2 className="text-2xl font-bold font-['Geist']">
                  Personal Information
                </h2>

                <p className="text-sm text-[rgba(255,255,255,0.4)] mt-1">
                  Update the information displayed on your portfolio.
                </p>

              </div>

              <div className="space-y-6 max-w-[800px]">

                {/* HEADLINE */}

                <div className="glass-card p-6">

                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                    Professional Headline
                  </label>

                  <textarea
                    value={state.headline}
                    onChange={(e) =>
                      setState({
                        ...state,
                        headline: e.target.value,
                      })
                    }
                    className={`${inputClass} resize-none`}
                    rows={2}
                  />

                </div>

                {/* BIO */}

                <div className="glass-card p-6">

                  <label className="text-[rgba(255,255,255,0.5)] text-xs font-['Geist_Mono'] uppercase tracking-wider mb-2 block">
                    About Me
                  </label>

                  <textarea
                    value={state.bio}
                    onChange={(e) =>
                      setState({
                        ...state,
                        bio: e.target.value,
                      })
                    }
                    className={`${inputClass} resize-none`}
                    rows={5}
                  />

                </div>

                {/* EDUCATION */}

                <div className="glass-card p-6">

                  <div className="flex items-center gap-2 mb-4">

                    <GraduationCap
                      size={18}
                      className="text-[#2252FF]"
                    />

                    <h3 className="font-semibold">
                      Education
                    </h3>

                  </div>

                  <div className="space-y-4">

                    <input
                      value={state.education}
                      onChange={(e) =>
                        setState({
                          ...state,
                          education: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Degree"
                    />

                    <input
                      value={state.location}
                      onChange={(e) =>
                        setState({
                          ...state,
                          location: e.target.value,
                        })
                      }
                      className={inputClass}
                      placeholder="Location"
                    />

                  </div>

                </div>

                {/* SKILLS */}

                <div className="glass-card p-6">

                  <div className="flex items-center gap-2 mb-5">

                    <Cpu
                      size={18}
                      className="text-[#D0FF71]"
                    />

                    <h3 className="font-semibold">
                      Technical Skills
                    </h3>

                  </div>

                  <div className="flex flex-wrap gap-2 mb-5">

                    {state.skills.map((skill) => (

                      <span
                        key={skill}
                        className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] px-3 py-1.5 rounded-full text-xs"
                      >

                        {skill}

                        <button
                          onClick={() =>
                            handleDeleteSkill(skill)
                          }
                          className="text-[rgba(255,255,255,0.35)] hover:text-red-400"
                        >
                          <X size={12} />
                        </button>

                      </span>

                    ))}

                  </div>

                  <div className="flex gap-2">

                    <input
                      value={newSkill}
                      onChange={(e) =>
                        setNewSkill(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSkill();
                        }
                      }}
                      placeholder="Add a skill..."
                      className={inputClass}
                    />

                    <button
                      onClick={handleAddSkill}
                      className="bg-[#2252FF] px-5 rounded-lg text-sm shrink-0"
                    >
                      Add
                    </button>

                  </div>

                </div>

                {/* LINKS */}

                <div className="glass-card p-6">

                  <h3 className="font-semibold mb-5">
                    Social & Portfolio Links
                  </h3>

                  <div className="space-y-4">

                    <div>

                      <label className="text-xs text-[rgba(255,255,255,0.4)] block mb-2">
                        GitHub
                      </label>

                      <div className="flex items-center gap-2">

                        <Github
                          size={17}
                          className="text-[rgba(255,255,255,0.5)]"
                        />

                        <input
                          value={state.githubUrl}
                          onChange={(e) =>
                            setState({
                              ...state,
                              githubUrl: e.target.value,
                            })
                          }
                          className={inputClass}
                        />

                      </div>

                    </div>

                    <div>

                      <label className="text-xs text-[rgba(255,255,255,0.4)] block mb-2">
                        LinkedIn
                      </label>

                      <div className="flex items-center gap-2">

                        <Linkedin
                          size={17}
                          className="text-[rgba(255,255,255,0.5)]"
                        />

                        <input
                          value={state.linkedinUrl}
                          onChange={(e) =>
                            setState({
                              ...state,
                              linkedinUrl: e.target.value,
                            })
                          }
                          className={inputClass}
                        />

                      </div>

                    </div>

                    <div>

                      <label className="text-xs text-[rgba(255,255,255,0.4)] block mb-2">
                        LeetCode
                      </label>

                      <div className="flex items-center gap-2">

                        <Code2
                          size={17}
                          className="text-[rgba(255,255,255,0.5)]"
                        />

                        <input
                          value={state.leetcodeUrl}
                          onChange={(e) =>
                            setState({
                              ...state,
                              leetcodeUrl: e.target.value,
                            })
                          }
                          className={inputClass}
                        />

                      </div>

                    </div>

                    <div>

                      <label className="text-xs text-[rgba(255,255,255,0.4)] block mb-2">
                        Email
                      </label>

                      <input
                        value={state.email}
                        onChange={(e) =>
                          setState({
                            ...state,
                            email: e.target.value,
                          })
                        }
                        className={inputClass}
                      />

                    </div>

                    <div>

                      <label className="text-xs text-[rgba(255,255,255,0.4)] block mb-2">
                        Resume URL
                      </label>

                      <input
                        value={state.resumeUrl}
                        onChange={(e) =>
                          setState({
                            ...state,
                            resumeUrl: e.target.value,
                          })
                        }
                        className={inputClass}
                        placeholder="https://..."
                      />

                    </div>

                  </div>

                </div>

                {/* STATS */}

                <div className="glass-card p-6">

                  <div className="flex items-center gap-2 mb-5">

                    <Sparkles
                      size={18}
                      className="text-[#D0FF71]"
                    />

                    <h3 className="font-semibold">
                      Portfolio Stats
                    </h3>

                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                    <div>

                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">
                        Projects
                      </label>

                      <input
                        type="number"
                        value={state.stats.projects}
                        onChange={(e) =>
                          setState({
                            ...state,
                            stats: {
                              ...state.stats,
                              projects:
                                parseInt(
                                  e.target.value
                                ) || 0,
                            },
                          })
                        }
                        className={smallInputClass + ' w-full'}
                      />

                    </div>

                    <div>

                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">
                        LeetCode
                      </label>

                      <input
                        type="number"
                        value={state.stats.leetcode}
                        onChange={(e) =>
                          setState({
                            ...state,
                            stats: {
                              ...state.stats,
                              leetcode:
                                parseInt(
                                  e.target.value
                                ) || 0,
                            },
                          })
                        }
                        className={smallInputClass + ' w-full'}
                      />

                    </div>

                    <div>

                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">
                        GitHub Repos
                      </label>

                      <input
                        type="number"
                        value={state.stats.githubRepos}
                        onChange={(e) =>
                          setState({
                            ...state,
                            stats: {
                              ...state.stats,
                              githubRepos:
                                parseInt(
                                  e.target.value
                                ) || 0,
                            },
                          })
                        }
                        className={smallInputClass + ' w-full'}
                      />

                    </div>

                    <div>

                      <label className="text-[rgba(255,255,255,0.4)] text-[10px] uppercase block mb-1">
                        Certifications
                      </label>

                      <input
                        type="number"
                        value={state.stats.certifications}
                        onChange={(e) =>
                          setState({
                            ...state,
                            stats: {
                              ...state.stats,
                              certifications:
                                parseInt(
                                  e.target.value
                                ) || 0,
                            },
                          })
                        }
                        className={smallInputClass + ' w-full'}
                      />

                    </div>

                  </div>

                </div>

                {/* SAVE */}

                <button
                  onClick={handleSavePersonal}
                  className="flex items-center gap-2 bg-[#2252FF] text-white px-6 py-3 rounded-lg font-['Geist'] text-sm font-medium hover:bg-[#3952FF] transition-colors"
                >

                  <Save size={16} />

                  Save Changes

                </button>
              </div>
            </div>

          )}

        </motion.div>

      </main>

      {toast && (

        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />

      )}

    </div>
  );
}
```
