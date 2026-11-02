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
  impactMetric?: string;
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
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
    linkedinUrl: "https://linkedin.com/in/sheeladitya-vinay-kumar",
    educationBrief: "B.Tech CSE · BTKIT (2023–2027)",
    summary:
      "Software Development Engineer (SDE) Intern at ColoredCow with practical experience resolving application bugs and improving user-facing workflows across mobile apps and websites. Worked on push notifications, permission prompts, login functionality, image-upload validation, website plugin updates, and UI fixes. Familiar with collaborative Git/GitHub workflows and focused on building reliable, maintainable software that solves real user problems."
  },

  metrics: [
    {
      value: "1+ Year",
      label: "Software Engineering Experience",
      detail: "Hands-on software development at ColoredCow",
      accent: "indigo" as const
    },
    {
      value: "3 Production Projects",
      label: "Real-world Applications & Ecosystems",
      detail: "Mobile apps & NGO e-commerce platform",
      accent: "emerald" as const
    },
    {
      value: "Git & PRs",
      label: "Collaborative Engineering",
      detail: "Iterative reviews & team-based workflows",
      accent: "cyan" as const
    },
    {
      value: "50,000+",
      label: "Users Impacted",
      detail: "Donors benefited from push notification & app fixes",
      accent: "amber" as const
    }
  ],

  skillCategories: [
    {
      title: "Web & UI Systems",
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
      id: "sankalptaru-web",
      title: "SankalpTaru Foundation — E-Commerce Website & Platform Architecture",
      subtitle: "SankalpTaru Foundation (NGO) · Live E-Commerce Storefront (sankalptaru.org)",
      category: "web",
      categoryLabel: "NGO E-Commerce Website",
      badge: "ColoredCow Engineering",
      badgeAccent: "amber",
      image: "/assets/images/project-cluster-mesh.jpg",
      impactMetric: "Maintained 100% production uptime during major CMS plugin audits & responsive checkout patches",
      summary:
        "Maintained the high-traffic live e-commerce platform for SankalpTaru Foundation (sankalptaru.org), auditing mission-critical WordPress plugins, eliminating stylesheet conflicts, and patching mobile responsive layout bugs across donation & checkout funnels.",
      tech: ["WordPress", "E-Commerce Architecture", "PHP", "JavaScript", "Plugin Maintenance", "Responsive UI"],
      overview:
        "Managed and updated plugins on the live SankalpTaru Foundation environmental e-commerce website (sankalptaru.org), an IT-enabled NGO platform for tree-planting purchases and carbon offset sponsorships. Resolved plugin deprecations, conflict regressions, and responsive layout issues across donation funnels.",
      problem:
        "Outdated plugins caused checkout conflicts and security vulnerabilities, while legacy CSS rules distorted mobile responsiveness during high-volume plantation drives.",
      solution:
        "Executed systematic plugin updates, sanitized legacy hook calls, resolved conflicting stylesheet rules across checkout pages, and validated responsive layout integrity.",
      highlights: [
        "Maintained continuous uptime during live production plugin updates and e-commerce transactions.",
        "Troubleshot and fixed multi-device CSS breakpoint glitches across key landing & checkout pages.",
        "Enhanced form submission responsiveness and web asset loading times.",
        "Collaborated via GitHub PR workflows incorporating senior engineering reviews."
      ],
      demoUrl: "https://sankalptaru.org",
      repoType: "client",
      accessNote: "Client Production Website (sankalptaru.org)"
    },
    {
      id: "sankalptaru-huge",
      title: "SankalpTaru HUGE — NGO Companion Mobile App",
      subtitle: "SankalpTaru Foundation (NGO) · Mobile Tree Tracking & Push Notifications",
      category: "mobile",
      categoryLabel: "NGO Companion App",
      badge: "ColoredCow Engineering",
      badgeAccent: "emerald",
      image: "/assets/images/project-sankalptaru.jpg",
      impactMetric: "Restored push notifications & device permissions across 50,000+ mobile app donors",
      summary:
        "Maintained and debugged the companion mobile app for SankalpTaru Foundation, enabling 50,000+ donors to track planted trees with GPS coordinates. Diagnosed and resolved push-notification delivery drops and device permission blockers on Google Play and App Store.",
      tech: ["Mobile Architecture", "NGO Ecosystem", "Push Notifications", "Runtime Permissions", "Git / GitHub"],
      overview:
        "Maintained and debugged the companion mobile application (SankalpTaru HUGE) for SankalpTaru Foundation, allowing contributors to track their planted trees via GPS and receive growth updates. Resolved critical push notification delivery drops and OS permission pop-up issues.",
      problem:
        "Donors experienced silent notification delivery failures after orders, alongside runtime permission pop-up crashes on newer mobile OS versions.",
      solution:
        "Diagnosed push-notification handler lifecycles, ensured reliable FCM token synchronization with donor order profiles, and refactored device runtime permission workflows.",
      highlights: [
        "Restored push notification delivery reliability for campaign engagement across Android and iOS.",
        "Fixed runtime permission prompts for camera, storage, and geolocation services.",
        "Conducted thorough testing across diverse Android and iOS device configurations.",
        "Integrated seamlessly with existing team Git/GitHub workflows following reviewer feedback."
      ],
      appUrl: "https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru",
      appStoreUrl: "https://apps.apple.com/in/app/sankalptaru-huge/id1462571187",
      repoType: "client",
      accessNote: "Client Mobile App · Live on Google Play & App Store"
    },
    {
      id: "coloredcow-website",
      title: "ColoredCow Official Website — Platform & UI Updates",
      subtitle: "ColoredCow · Corporate Web Platform (coloredcow.com)",
      category: "web",
      categoryLabel: "Company Web Platform",
      badge: "ColoredCow Engineering",
      badgeAccent: "indigo",
      image: "/assets/images/project-cluster-mesh.jpg",
      impactMetric: "Enhanced UI responsiveness & component reliability across coloredcow.com",
      summary:
        "Contributed to the design, maintenance, and platform updates for ColoredCow's official corporate website (coloredcow.com). Implemented modern UI updates, optimized responsive layouts across desktop and mobile viewports, and audited web components for cross-browser compatibility.",
      tech: ["Web Architecture", "UI / UX", "Responsive Design", "Frontend Development", "Git / GitHub"],
      overview:
        "Contributed to frontend updates and maintenance of ColoredCow's official website (coloredcow.com), focusing on responsive UI enhancements, component consistency, and cross-device performance.",
      problem:
        "Maintaining high design fidelity, fast asset loading, and flawless mobile responsiveness across diverse device viewports was essential for brand engagement.",
      solution:
        "Optimized frontend components, refined CSS styling and layout breakpoints, and verified responsive rendering across mobile and desktop browsers.",
      highlights: [
        "Updated and refined UI components across coloredcow.com for seamless cross-device rendering.",
        "Enhanced mobile responsiveness and layout stability across diverse viewport dimensions.",
        "Collaborated with engineering teams via GitHub pull requests and design reviews.",
        "Ensured high performance standards and clean semantic markup."
      ],
      demoUrl: "https://coloredcow.com",
      repoType: "client",
      accessNote: "Client / Corporate Platform (coloredcow.com)"
    },
    {
      id: "g1-ground-team",
      title: "G1 Ground Team App",
      subtitle: "Client/Server Image-Upload Validation & Login Authentication Fix",
      category: "mobile",
      categoryLabel: "Field Operations & Mobile",
      badge: "ColoredCow Engineering",
      badgeAccent: "cyan",
      image: "/assets/images/project-cluster-mesh.jpg",
      impactMetric: "Eliminated mobile field upload crashes and fixed mission-critical operator login bug",
      summary:
        "Engineered multi-tier image-upload validation checks to safeguard field operations against corrupted uploads in challenging network conditions, and resolved authentication session bugs causing unexpected login failures.",
      tech: ["JavaScript", "Image Upload Validation", "Auth & Login Fixes", "Form Validation", "Debugging"],
      overview:
        "Strengthened reliability for ground field teams by adding rigorous image-upload validation checks and eliminating a persistent authentication login bug.",
      problem:
        "Field agents experienced failed uploads or app freezes when capturing unvalidated, oversized images in low-connectivity areas, alongside intermittent login failures.",
      solution:
        "Introduced client-side image validation (size limits, MIME checks, resolution constraints) before network payload transmission, and debugged session token renewal during login.",
      highlights: [
        "Eliminated upload crashes by introducing pre-flight file validation and sanitization.",
        "Resolved an intermittent authentication failure preventing field operators from logging in.",
        "Improved user error feedback with clear, actionable status messages.",
        "Protected backend API servers from corrupted and oversized multipart payloads."
      ],
      repoType: "internal",
      accessNote: "Internal SankalpTaru Team App · Not for Public Use"
    }
  ] as ProjectItem[],

  experience: [
    {
      role: "Software Development Engineer (SDE) Intern",
      company: "ColoredCow",
      period: "November 2025 – Present",
      type: "Internship",
      points: [
        "Successfully completed Software Engineering Internship at ColoredCow, earning formal internship completion recognition.",
        "Contributed to ColoredCow's official corporate website (coloredcow.com): implemented UI updates, optimized responsive layouts across devices, and enhanced frontend performance.",
        "Maintained client digital platforms for SankalpTaru Foundation (an IT-enabled environmental NGO foundation operating an e-commerce website and companion mobile app):",
        "• E-Commerce Website (sankalptaru.org): Audited mission-critical WordPress plugins, eliminated stylesheet conflicts, and patched mobile responsive layout bugs across donation & checkout funnels with 100% production uptime.",
        "• Companion Mobile App (SankalpTaru HUGE on Google Play & App Store): Diagnosed and resolved critical push-notification delivery drops and device permission pop-up blockers (camera, storage, geolocation) across 50,000+ donors.",
        "Engineered client-side pre-flight image upload validation (file size constraints, MIME integrity checks) and debugged session authentication in the G1 Ground Team app, preventing field app crashes in low-bandwidth regions.",
        "Contributed to clean code standards across team-based Git/GitHub workflows, authoring focused pull requests and actively incorporating senior engineering feedback."
      ]
    }
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Engineering",
    institution: "BTKIT",
    period: "2023–2027",
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
