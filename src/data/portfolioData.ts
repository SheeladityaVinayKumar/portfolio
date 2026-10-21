export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: "ai" | "mobile" | "web";
  categoryLabel: string;
  badge: string;
  badgeAccent: "indigo" | "emerald" | "cyan" | "amber";
  image: string;
  summary: string;
  tech: string[];
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics?: string;
  demoUrl?: string;
  githubUrl?: string;
  appUrl?: string;
  appStoreUrl?: string;
  repoType?: "public" | "internal" | "client";
  accessNote?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  subtitle: string;
  skills: { name: string; featured?: boolean }[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Sheeladitya Vinay Kumar",
    shortName: "Sheeladitya",
    title: "Software Engineer",
    headline: "React · Next.js · JavaScript · Python · Django · PHP · WordPress",
    statusText: "Available for Engineering Roles",
    location: "India (Open to Remote, Hybrid & Relocation)",
    email: "sheeladitya04@gmail.com",
    avatar: "/assets/images/sheeladitya.png",
    resumeUrl: "https://drive.google.com/file/d/1jTR9iillcBNF2ypTknpiXkBp7BIO6kzo/view?usp=sharing",
    githubUrl: "https://github.com/SheeladityaVinayKumar",
    linkedinUrl: "https://linkedin.com",
    educationBrief: "B.Tech CSE · BTKIT (2023–2027)",
    summary:
      "Software development trainee with practical experience resolving application bugs and improving user-facing workflows across mobile apps and websites. Worked on push notifications, permission prompts, login functionality, image-upload validation, website plugin updates, and UI fixes. Familiar with collaborative Git/GitHub workflows and focused on building reliable, maintainable software that solves real user problems."
  },

  metrics: [
    {
      value: "1+ Year",
      label: "Practical Trainee Experience",
      detail: "Hands-on software development at ColoredCow",
      accent: "indigo" as const
    },
    {
      value: "4+ Production Projects",
      label: "Real-world Applications & Ecosystems",
      detail: "Mobile apps, AI platform & web systems",
      accent: "emerald" as const
    },
    {
      value: "Git & PRs",
      label: "Collaborative Engineering",
      detail: "Iterative reviews & team-based workflows",
      accent: "cyan" as const
    }
  ],

  skillCategories: [
    {
      title: "Frontend Engineering",
      icon: "✨",
      subtitle: "Component architecture & responsive interfaces",
      skills: [
        { name: "React", featured: true },
        { name: "Next.js", featured: true },
        { name: "JavaScript (ES6+)", featured: true },
        { name: "HTML5 & Semantic Web", featured: false },
        { name: "CSS3 / Modern UI", featured: false },
        { name: "Responsive Layouts", featured: false },
        { name: "UI Troubleshooting", featured: false }
      ]
    },
    {
      title: "Backend & APIs",
      icon: "⚙️",
      subtitle: "Server-side logic, routing & authentication",
      skills: [
        { name: "Python", featured: true },
        { name: "Django", featured: true },
        { name: "PHP", featured: true },
        { name: "RESTful APIs", featured: false },
        { name: "Login & Auth Functionality", featured: false },
        { name: "Session Handling", featured: false }
      ]
    },
    {
      title: "CMS & Web Platforms",
      icon: "🌐",
      subtitle: "Plugin architecture & website maintenance",
      skills: [
        { name: "WordPress", featured: true },
        { name: "Plugin Updates & Audit", featured: false },
        { name: "UI Fixes & Styling Patches", featured: false },
        { name: "Cross-Browser Compatibility", featured: false },
        { name: "Workflow Optimization", featured: false }
      ]
    },
    {
      title: "Tools & Development Practices",
      icon: "🛠️",
      subtitle: "Version control, validation & QA pipelines",
      skills: [
        { name: "Git", featured: true },
        { name: "GitHub Pull Requests", featured: true },
        { name: "Issue Resolution", featured: false },
        { name: "Input & Image Validation", featured: false },
        { name: "Push Notifications", featured: false },
        { name: "Permission Prompts", featured: false }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "talent-evaluator",
      title: "Talent Evaluator — Onboarding Platform & AI Mentor",
      subtitle: "Full-Stack Web Architecture, Structured Learning & Trainee AI Mentor",
      category: "ai",
      categoryLabel: "AI & Full-Stack",
      badge: "Featured Resume Project",
      badgeAccent: "indigo",
      image: "/assets/images/project-talent-evaluator.jpg",
      summary:
        "Engineered a structured onboarding concept featuring interactive learning materials, automated self-assessment quizzes, and distinct candidate versus admin workflows. Designed an AI Mentor concept allowing trainees to ask technical questions, reason through code blockers, and learn directly from internal engineering documentation.",
      tech: ["React", "Next.js", "Python", "Django", "AI Assistant", "REST APIs"],
      overview:
        "Designed and engineered an end-to-end candidate onboarding ecosystem equipped with modular learning paths, automated self-assessments, role-based access for trainees and admins, and an interactive AI Mentor.",
      problem:
        "Traditional onboarding relies on static documentation, causing trainees to get stuck on technical setup and repetitive blockers, which creates a heavy load on senior engineering mentors.",
      solution:
        "Created an AI Mentor concept directly grounded in internal engineering documentation. Trainees can ask questions about codebase structures, reason through programming problems, and receive interactive guided learning in real time.",
      highlights: [
        "Structured modular onboarding journeys with progress tracking and completion milestones.",
        "Candidate self-assessment quiz engine evaluating core programming competencies.",
        "Role-based access separating trainee progress views from administrator evaluation panels.",
        "Interactive AI Mentor assistant concept for on-demand technical guidance."
      ],
      githubUrl: "https://github.com/SheeladityaVinayKumar/talent-evaluator",
      demoUrl: "https://github.com/SheeladityaVinayKumar/talent-evaluator",
      repoType: "public"
    },
    {
      id: "sankalptaru-huge",
      title: "SankalpTaru Huge Mobile App",
      subtitle: "Push Notification Infrastructure & Runtime Permission Fixes",
      category: "mobile",
      categoryLabel: "Mobile Production",
      badge: "ColoredCow Trainee Work",
      badgeAccent: "emerald",
      image: "/assets/images/project-sankalptaru.jpg",
      summary:
        "Investigated and resolved critical push-notification delivery failures and mobile permission pop-up issues. Ensured hundreds of thousands of users receive real-time notifications on environmental plantation drives, with seamless camera and location runtime permissions.",
      tech: ["Mobile Architecture", "Push Notifications", "Runtime Permissions", "JavaScript", "Git / GitHub"],
      overview:
        "Maintained and debugged the flagship SankalpTaru Huge mobile app, resolving critical notification failures and runtime permission pop-up issues.",
      problem:
        "Users experienced silent notification delivery failures and unexpected crashes caused by improper OS runtime permission request timing on newer mobile versions.",
      solution:
        "Diagnosed push-notification handler lifecycles and refactored device runtime permission workflows to prompt users gracefully with contextual explanations.",
      highlights: [
        "Resolved push notification failures, ensuring real-time environmental plantation updates reached users reliably.",
        "Fixed runtime permission prompts for camera, storage, and geolocation services.",
        "Conducted thorough testing across diverse Android and iOS device configurations.",
        "Integrated seamlessly with existing team Git/GitHub workflows following reviewer feedback."
      ],
      appUrl: "https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru",
      appStoreUrl: "https://apps.apple.com/in/app/sankalptaru-huge/id1462571187",
      repoType: "internal",
      accessNote: "ColoredCow / SankalpTaru Production (Enterprise Codebase)"
    },
    {
      id: "g1-ground-team",
      title: "G1 Ground Team App",
      subtitle: "Client/Server Image-Upload Validation & Login Authentication Fix",
      category: "mobile",
      categoryLabel: "Field Operations & Mobile",
      badge: "ColoredCow Trainee Work",
      badgeAccent: "cyan",
      image: "/assets/images/project-cluster-mesh.jpg",
      summary:
        "Engineered robust image-upload validation checks to safeguard field operations against corrupted and oversized uploads in challenging field network conditions. Diagnosed and resolved authentication session bugs that caused unexpected login failures for ground team agents.",
      tech: ["JavaScript", "Image Upload Validation", "Auth & Login Fixes", "Form Validation", "Debugging"],
      overview:
        "Strengthened reliability for ground field teams by adding rigorous image-upload validation checks and eliminating a persistent authentication login bug.",
      problem:
        "Field agents frequently experienced failed uploads or app freezes when capturing unvalidated, oversized images in low-connectivity areas, alongside intermittent login failures.",
      solution:
        "Introduced client-side image validation (size limits, MIME checks, resolution constraints) before network payload transmission, and debugged session token renewal during login.",
      highlights: [
        "Eliminated upload crashes by introducing pre-flight file validation and sanitization.",
        "Resolved an intermittent authentication failure preventing field operators from logging in.",
        "Improved user error feedback with clear, actionable status messages.",
        "Protected backend API servers from corrupted and oversized multipart payloads."
      ],
      repoType: "internal",
      accessNote: "Internal Field Operations App (Confidential Enterprise Repo)"
    },
    {
      id: "sankalptaru-web",
      title: "SankalpTaru Production Website & Plugin Maintenance",
      subtitle: "CMS Plugin Architecture, Layout Troubleshooting & Performance Optimization",
      category: "web",
      categoryLabel: "CMS & Web Ecosystem",
      badge: "ColoredCow Trainee Work",
      badgeAccent: "amber",
      image: "/assets/images/project-fullstack-cloud.jpg",
      summary:
        "Maintained the live SankalpTaru production website by auditing and updating mission-critical plugins. Resolved UI regressions, styling glitches, and cross-browser bugs, improving responsiveness and user workflows for ecological contributors.",
      tech: ["WordPress", "PHP", "JavaScript", "Plugin Updates", "UI Troubleshooting"],
      overview:
        "Managed and updated plugins on the live SankalpTaru production website, resolving plugin deprecations, conflict regressions, and responsive UI issues.",
      problem:
        "Outdated WordPress plugins posed security vulnerabilities, while conflicting CSS rules broke layout responsiveness across mobile and tablet viewports.",
      solution:
        "Executed systematic plugin updates, sanitized legacy hook calls, resolved conflicting stylesheet rules, and validated responsive layout integrity.",
      highlights: [
        "Maintained continuous uptime during live production plugin updates and migrations.",
        "Troubleshot and fixed multi-device CSS breakpoint glitches across key landing pages.",
        "Enhanced form submission responsiveness and front-end asset loading times.",
        "Collaborated via GitHub PR workflows incorporating senior engineering reviews."
      ],
      demoUrl: "https://sankalptaru.org",
      repoType: "client",
      accessNote: "Live Ecological Platform (sankalptaru.org)"
    }
  ] as ProjectItem[],

  experience: [
    {
      role: "Software Development Trainee",
      company: "ColoredCow",
      period: "November 2025 – October 2026",
      type: "Traineeship",
      points: [
        "Resolved a push-notification issue and a permission pop-up issue in the SankalpTaru Huge app.",
        "Added image-upload checks and fixed a login issue in the G1 Ground Team app.",
        "Updated plugins on the SankalpTaru website and fixed UI issues.",
        "Used team-based development and GitHub workflows, incorporating reviewer feedback."
      ]
    }
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Engineering",
    institution: "BTKIT",
    period: "2023–2027 (Expected)",
    description:
      "Rigorous computer science curriculum covering Data Structures, Algorithms, Operating Systems, Database Management Systems, and Software Engineering methodologies."
  },

  developmentPractices: [
    {
      title: "Collaborative Version Control",
      desc: "Daily Git/GitHub workflows, pull requests, code reviews, and iterative feedback refinement."
    },
    {
      title: "Form & Image Upload Validation",
      desc: "Sanitizing inputs and validating image files before upload to protect server endpoints."
    },
    {
      title: "Debugging & Issue Resolution",
      desc: "Systematic root-cause analysis for push notification lifecycles, permissions, and auth flows."
    },
    {
      title: "UI Troubleshooting & Responsiveness",
      desc: "Debugging CSS breakpoint glitches and ensuring cross-browser design fidelity."
    }
  ]
};
