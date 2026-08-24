# Muhil Amuthan M — Portfolio

> A modern, interactive developer portfolio showcasing projects, skills, certifications, and experience. Built with React 19 + TypeScript + Vite and deployed on Vercel.

---

## ✨ Features

- **Hero Section** — Animated introduction with Three.js/WebGL background
- **About** — Bio, stats, and highlights
- **Skills** — Categorized tech stack with animated skill cards
- **Experience** — Timeline of internships and professional experience
- **Projects** — Showcase of key projects with descriptions and links
- **AI Chatbot** — Client-side keyword-matching chatbot for portfolio Q&A
- **Certifications** — Filterable gallery of certifications and credentials
- **Coding Profiles** — LeetCode, GitHub, and other competitive coding platforms
- **Contact** — Contact form (powered by Formspree) + direct contact details
- **Admin Panel** — Password-protected admin dashboard at `/admin`
- **Custom Cursor** — Interactive animated cursor
- **Particle Background** — Animated particle system
- **Loading Screen** — Animated entry experience
- **Responsive** — Fully responsive across all screen sizes

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Animation | Framer Motion + GSAP |
| 3D / WebGL | Three.js + @react-three/fiber + @react-three/drei |
| Routing | React Router DOM v7 |
| Contact Form | Formspree |
| Icons | Lucide React |
| Font | Geist + Geist Mono |
| Deployment | Vercel |

---

## 📁 Project Structure

```
portfolio/
├── public/                  # Static assets (images, resume, certificates)
│   ├── profile-photo.jpg
│   ├── resume.pdf
│   ├── auraflow-emergency.png
│   ├── carbonwise-dashboard.png
│   ├── fedmed-network.png
│   ├── plantguard-app.png
│   └── cert-*.jpg / cred-*.png
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomCursor.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParticleBackground.tsx
│   │   └── Toast.tsx
│   │
│   ├── data/                # Static data and content
│   │   ├── certifications.ts
│   │   ├── chatbot-knowledge.ts
│   │   ├── experience.ts
│   │   ├── portfolio.ts      # Links, stats, contact info
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── timeline.ts
│   │
│   ├── pages/               # Full-page views
│   │   ├── AdminDashboard.tsx
│   │   └── AdminLogin.tsx
│   │
│   ├── sections/            # Homepage sections
│   │   ├── About.tsx
│   │   ├── Certifications.tsx
│   │   ├── ChatBot.tsx
│   │   ├── CodingProfiles.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   │
│   ├── App.tsx              # Root component + routing
│   ├── index.css            # Global styles + CSS variables
│   └── main.tsx             # App entry point
│
├── .env.example             # Environment variable template
├── .gitignore
├── vercel.json              # Vercel SPA routing config
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 or later
- **npm** v9 or later

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/muhil-amuthan/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local

# 4. Edit .env.local and set your admin password
# VITE_ADMIN_PASSWORD=your_password_here

# 5. Start the development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview Production Build Locally

```bash
npm run preview
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_ADMIN_PASSWORD` | Optional | Password for the `/admin` panel. Defaults to the value set at build time. |

> ⚠️ All Vite environment variables must be prefixed with `VITE_` to be accessible in the browser.

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

---

## ☁️ Deployment (Vercel)

This project is configured for zero-config deployment on **Vercel**.

### Deploy via Vercel Dashboard

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repository.
3. Vercel auto-detects Vite — no changes needed to build settings.
4. Add your environment variables in **Project Settings → Environment Variables**:
   - `VITE_ADMIN_PASSWORD` → your chosen admin password
5. Click **Deploy**.

The `vercel.json` in this project handles SPA routing automatically (all routes serve `index.html`).

### Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
```

---

## 📬 Contact Form

The contact form is powered by **[Formspree](https://formspree.io/)** — no backend required. Messages are sent directly from the browser to the Formspree endpoint and forwarded to the configured email address.

---

## 🔐 Admin Panel

The admin panel is accessible at `/admin`. It is:
- **Client-side only** — authentication uses `localStorage`
- **Password-protected** via the `VITE_ADMIN_PASSWORD` environment variable
- Allows managing certifications, achievements, and personal info (changes are stored in `localStorage` and are not persisted between sessions)

---

## 📄 License

This is a personal portfolio project. All rights reserved.

---

## 🤝 Connect

- 📧 [m.muhilamuthan@gmail.com](mailto:m.muhilamuthan@gmail.com)
- 💼 [linkedin.com/in/muhil-amuthan-m](https://linkedin.com/in/muhil-amuthan-m)
- 🐙 [github.com/muhil-amuthan](https://github.com/muhil-amuthan)
- 🧩 [leetcode.com/u/Muhil-Amuthan_M](https://leetcode.com/u/Muhil-Amuthan_M)
