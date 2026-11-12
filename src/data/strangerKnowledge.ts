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
      "Software Development Engineer (SDE) Intern at ColoredCow (20 Nov 2025 – 30 Sep 2026) building and fixing features across a client's e-commerce platform for a non-profit in environmental conservation — from storefront and product pages through checkout to order handling — and web pages for ColoredCow's own site using AI-enabled processes from design to published page. Tested every change end to end before release, traced behaviour mismatches to root cause, and shipped on schedule in a working engineering team. Also resolved push notifications, permission prompts, login, image-upload validation, and UI issues across mobile apps and websites, using AI-assisted development daily in collaborative Git/GitHub workflows."
  },

  metrics: [
    {
      value: "10 Months",
      label: "Software Engineering Experience",
      detail: "20 Nov 2025 – 30 Sep 2026 · ColoredCow",
      accent: "indigo" as const
    },
    {
      value: "3 Production Projects",
      label: "Real-world Applications & Ecosystems",
      detail: "Non-profit environmental conservation e-commerce platform & mobile apps",
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
        { name: "HTML5 & Semantic Web", featured: true },
        { name: "CSS3 / Modern UI", featured: true },
        { name: "Responsive Layouts", featured: true },
        { name: "UI Troubleshooting", featured: true }
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
        { name: "RESTful APIs", featured: true },
        { name: "Login & Auth Functionality", featured: true },
        { name: "Session Handling", featured: true }
      ]
    },
    {
      title: "CMS & Web Platforms",
      icon: "🌐",
      subtitle: "Plugin architecture & website maintenance",
      skills: [
        { name: "WordPress", featured: true },
        { name: "Plugin Updates & Audit", featured: true },
        { name: "UI Fixes & Styling Patches", featured: true },
        { name: "Cross-Browser Compatibility", featured: true },
        { name: "Workflow Optimization", featured: true }
      ]
    },
    {
      title: "Tools & Development Practices",
      icon: "🛠️",
      subtitle: "AI-assisted dev, version control & QA",
      skills: [
        { name: "Git", featured: true },
        { name: "GitHub Pull Requests", featured: true },
        { name: "AI-Assisted Development", featured: true },
        { name: "Issue Resolution", featured: true },
        { name: "End-to-End Testing", featured: true },
        { name: "Input & Image Validation", featured: true },
        { name: "Push Notifications", featured: true },
        { name: "Permission Prompts", featured: true }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "web-ecommerce-platform",
      title: "Non-Profit E-Commerce Platform & Web Architecture",
      subtitle: "Environmental Conservation Storefront · Purchase Journey, Checkout & Order Handling",
      category: "web",
      categoryLabel: "Non-Profit E-Commerce Platform",
      badge: "ColoredCow Engineering",
      badgeAccent: "amber",
      image: "",
      impactMetric: "Maintained 100% production uptime across storefront, checkout and order handling",
      summary:
        "Built and fixed features across a non-profit environmental conservation e-commerce platform's storefront and purchase journey — from product pages through checkout to order handling. Audited mission-critical CMS plugins, eliminated stylesheet conflicts, and patched mobile responsive bugs.",
      tech: ["WordPress", "E-Commerce Architecture", "PHP", "JavaScript", "Plugin Maintenance", "Responsive UI"],
      overview:
        "Built and fixed features for a client's e-commerce platform serving a non-profit in environmental conservation. Worked across the storefront and full purchase journey — product pages, checkout, and order handling — testing every change end to end before release. Where platform behaviour didn't match the requirement, traced the cause and saw it through to a fix.",
      problem:
        "Outdated plugins caused checkout conflicts and security vulnerabilities, while legacy CSS rules distorted mobile responsiveness during high-traffic user events.",
      solution:
        "Executed systematic plugin updates, sanitized legacy hook calls, resolved conflicting stylesheet rules across checkout pages, traced cause to fix, and validated responsive layout integrity end to end.",
      highlights: [
        "Built/fixed features across storefront and purchase journey (product pages → checkout → order handling) for a non-profit environmental conservation client.",
        "Tested every change end to end before release and traced behaviour mismatches to root cause.",
        "Maintained continuous uptime during live production plugin updates and e-commerce transactions.",
        "Troubleshot and fixed multi-device CSS breakpoint glitches across key landing & checkout pages.",
        "Shipped on schedule and kept the team informed in a working engineering team.",
        "Collaborated via GitHub PR workflows incorporating senior engineering reviews."
      ],
      repoType: "client",
      accessNote: "Production Enterprise Platform"
    },
    {
      id: "mobile-companion-app",
      title: "Enterprise Mobile Companion App & Push Notification System",
      subtitle: "Mobile Tracking App · Push Notifications & Runtime Permissions",
      category: "mobile",
      categoryLabel: "Companion Mobile App",
      badge: "ColoredCow Engineering",
      badgeAccent: "emerald",
      image: "",
      impactMetric: "Restored push notifications & device permissions across 50,000+ app users",
      summary:
        "Maintained and debugged enterprise companion mobile applications, enabling 50,000+ users to track real-time data with GPS coordinates. Diagnosed and resolved push-notification delivery drops and device permission blockers on Google Play and App Store.",
      tech: ["Mobile Architecture", "Push Notifications", "Runtime Permissions", "Git / GitHub"],
      overview:
        "Maintained and debugged enterprise companion mobile applications, allowing contributors to track data via GPS and receive activity updates. Resolved critical push notification delivery drops and OS permission pop-up issues.",
      problem:
        "Users experienced silent notification delivery failures after orders, alongside runtime permission pop-up crashes on newer mobile OS versions.",
      solution:
        "Diagnosed push-notification handler lifecycles, ensured reliable token synchronization with user order profiles, and refactored device runtime permission workflows.",
      highlights: [
        "Restored push notification delivery reliability for engagement across Android and iOS.",
        "Fixed runtime permission prompts for camera, storage, and geolocation services.",
        "Conducted thorough testing across diverse Android and iOS device configurations.",
        "Integrated seamlessly with team Git/GitHub workflows following reviewer feedback."
      ],
      repoType: "client",
      accessNote: "Mobile App · Live on Google Play & App Store"
    },
    {
      id: "corporate-web-platform",
      title: "ColoredCow Corporate Web Platform — UI & Responsive Updates",
      subtitle: "Corporate Web Platform · AI-Enabled Design-to-Published Pages",
      category: "web",
      categoryLabel: "Corporate Web Platform",
      badge: "ColoredCow Engineering",
      badgeAccent: "indigo",
      image: "",
      impactMetric: "Built web pages using AI-enabled processes from design through to published page",
      summary:
        "Built web pages for ColoredCow's corporate website using AI-enabled processes, taking each page from design through to a published page. Implemented modern UI updates, optimized responsive layouts, and audited web components for cross-browser compatibility.",
      tech: ["Web Architecture", "UI / UX", "Responsive Design", "Frontend Development", "AI-Assisted Development", "Git / GitHub"],
      overview:
        "Built web pages for ColoredCow's own web presence using AI-enabled processes — owning each page from design through to published page — alongside frontend updates, responsive UI enhancements, and cross-device performance.",
      problem:
        "Maintaining high design fidelity, fast asset loading, and flawless mobile responsiveness across diverse device viewports was essential for brand engagement.",
      solution:
        "Used AI-assisted development daily to build pages from design to published, optimized frontend components, refined CSS styling and layout breakpoints, and verified responsive rendering across mobile and desktop browsers.",
      highlights: [
        "Built web pages using AI-enabled processes, owning each page from design through to published page.",
        "Used AI-assisted development every day — how ColoredCow builds today.",
        "Updated and refined UI components across web portals for seamless cross-device rendering.",
        "Enhanced mobile responsiveness and layout stability across diverse viewport dimensions.",
        "Collaborated with engineering teams via GitHub pull requests and design reviews.",
        "Ensured high performance standards and clean semantic markup."
      ],
      repoType: "client",
      accessNote: "Corporate Web Platform"
    },
    {
      id: "ground-team-mobile-app",
      title: "Field Operations & Ground Team Mobile App",
      subtitle: "Image-Upload Validation & Login Authentication Fix",
      category: "mobile",
      categoryLabel: "Field Operations & Mobile",
      badge: "ColoredCow Engineering",
      badgeAccent: "cyan",
      image: "",
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
      accessNote: "Internal Team App · Not for Public Use"
    }
  ] as ProjectItem[],

  experience: [
    {
      role: "Software Development Engineer (SDE) Intern",
      company: "ColoredCow",
      period: "20 November 2025 – 30 September 2026",
      type: "Internship",
      points: [
        "Successfully completed Software Engineering Internship at ColoredCow (20 Nov 2025 – 30 Sep 2026), earning formal internship completion recognition.",
        "Built and fixed features for a client's e-commerce platform built for a non-profit working in environmental conservation — across the storefront and purchase journey, from product pages through checkout to order handling.",
        "Tested every change end to end before release; where platform behaviour didn't match the requirement, traced the cause and saw it through to a fix. Audited mission-critical CMS plugins and patched responsive layout bugs with 100% production uptime.",
        "Built web pages for ColoredCow's own website using AI-enabled processes, taking each page from design through to a published page — using AI-assisted development every day, which is how ColoredCow builds today.",
        "Shipped on schedule, kept the team informed, and gained real experience building software inside a working engineering team.",
        "Maintained and debugged enterprise companion mobile applications, resolving critical push-notification delivery drops and device permission blockers (camera, storage, geolocation) across 50,000+ users on Google Play and App Store.",
        "Engineered client-side pre-flight image upload validation (file size constraints, MIME integrity checks) and debugged session authentication in internal field operations apps, preventing app crashes in low-bandwidth regions.",
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
      title: "AI-Assisted Development",
      desc: "Used AI-enabled processes daily at ColoredCow — built web pages from design through to published page and shipped in a working team."
    },
    {
      title: "End-to-End Testing & Root-Cause Analysis",
      desc: "Tested every change end to end before release; traced behaviour mismatches to root cause and saw them through to a fix."
    },
    {
      title: "Collaborative Version Control",
      desc: "Daily Git/GitHub workflows, pull requests, code reviews, and iterative feedback refinement. Shipped on schedule and kept the team informed."
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
