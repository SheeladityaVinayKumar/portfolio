import { PORTFOLIO_DATA } from "@/data/portfolioData";

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export class AIAgentEngine {
  private data = PORTFOLIO_DATA;

  public respond(query: string): string {
    const q = query.toLowerCase().trim();

    // 1. Specific Project: SankalpTaru HUGE Mobile App
    if (
      q.includes("huge") ||
      q.includes("sankalptaru") ||
      q.includes("sankalptau") ||
      ((q.includes("mobile") || q.includes("app")) && (q.includes("notification") || q.includes("permission") || q.includes("tree")))
    ) {
      if (
        q.includes("link") ||
        q.includes("url") ||
        q.includes("download") ||
        q.includes("store") ||
        q.includes("play") ||
        q.includes("ios") ||
        q.includes("android")
      ) {
        return `📱 **SankalpTaru HUGE Mobile App Links:**
• **Google Play Store**: [Download on Google Play](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• **Apple App Store**: [Download on Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)

In this production mobile app, Sheeladitya resolved critical push-notification delivery issues and fixed mobile permission pop-ups (camera, storage, geolocation) for environmental plantation drives.`;
      }

      return `For the **SankalpTaru Huge Mobile App**, Sheeladitya resolved critical push-notification delivery failures and fixed mobile permission pop-up issues, ensuring users receive real-time updates on tree plantation drives with proper runtime permissions.

📱 **Live App Downloads:**
• [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)`;
    }

    // 2. Specific Project: Talent Evaluator & AI Mentor
    if (
      q.includes("talent") ||
      q.includes("evaluator") ||
      q.includes("mentor") ||
      q.includes("onboard")
    ) {
      return `**Talent Evaluator — Onboarding Platform & AI Mentor** is Sheeladitya's highlight project:
• **Structured Onboarding**: Interactive modules, candidate self-assessments, and distinct candidate vs. admin workflows.
• **AI Mentor Concept**: Trainees can ask questions, reason through code blockers, and learn directly from internal engineering documentation.
• **Tech Stack**: React, Next.js, Python, Django & REST APIs.
• **GitHub Repo**: [SheeladityaVinayKumar/talent-evaluator](https://github.com/SheeladityaVinayKumar/talent-evaluator)`;
    }

    // 3. Specific Project: G1 Ground Team App
    if (
      q.includes("g1") ||
      q.includes("ground team") ||
      (q.includes("upload") && q.includes("validation"))
    ) {
      return `In the **G1 Ground Team App**, Sheeladitya introduced client/server image-upload validation checks to prevent corrupted uploads from crashing the app in low-bandwidth field conditions, and resolved a critical authentication login issue for field operators.
*(Note: This is an internal field operations application within ColoredCow/enterprise repository).*`;
    }

    // 4. Specific Project: SankalpTaru Production Website
    if (
      (q.includes("website") || q.includes("wordpress") || q.includes("plugin")) &&
      !q.includes("portfolio")
    ) {
      return `For the **SankalpTaru Production Website**, Sheeladitya maintained and updated WordPress plugins, resolved plugin conflict regressions, and fixed responsive UI layout bugs.
• **Live Platform**: [sankalptaru.org](https://sankalptaru.org)`;
    }

    // 5. Direct Links / URLs Directory
    if (
      q.includes("links") ||
      (q.includes("link") &&
        (q.includes("all") ||
          q.includes("get") ||
          q.includes("app") ||
          q.includes("where") ||
          q.includes("download")))
    ) {
      return `🔗 **Quick Project & Profile Links:**
• 📄 **Resume / CV**: [Open Google Drive Resume](${this.data.profile.resumeUrl})
• 📱 **SankalpTaru HUGE (Android)**: [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• 🍏 **SankalpTaru HUGE (iOS)**: [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)
• 💻 **Talent Evaluator Repo**: [GitHub Repository](https://github.com/SheeladityaVinayKumar/talent-evaluator)
• 🌐 **SankalpTaru Website**: [sankalptaru.org](https://sankalptaru.org)
• 🐙 **Sheeladitya's GitHub Profile**: [github.com/SheeladityaVinayKumar](${this.data.profile.githubUrl})`;
    }

    // 6. All Projects Overview
    if (
      q.includes("project") ||
      q.includes("built") ||
      q.includes("apps") ||
      q.includes("work") ||
      q.includes("portfolio")
    ) {
      return `Here are Sheeladitya's core projects directly from his resume:

1. 🌟 **Talent Evaluator — Onboarding Platform & AI Mentor**: Structured onboarding with self-assessments and an AI Mentor concept for trainees. ([GitHub Repository](https://github.com/SheeladityaVinayKumar/talent-evaluator))
2. 📱 **SankalpTaru Huge Mobile App**: Resolved push-notification issues and device runtime permission bugs. ([Google Play](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru) · [App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187))
3. 🛡️ **G1 Ground Team App**: Engineered image-upload validation checks and fixed critical login issues. *(Internal production codebase)*
4. 🌐 **SankalpTaru Website**: Managed plugin updates and resolved responsive UI issues. ([Live Website](https://sankalptaru.org))

*Click any project card to view its complete architecture deep-dive!*`;
    }

    // 2. Experience at ColoredCow
    if (q.includes("experience") || q.includes("coloredcow") || q.includes("job") || q.includes("intern") || q.includes("trainee")) {
      return `Sheeladitya worked as a **Software Development Trainee at ColoredCow** (Nov 2025 – Oct 2026):
• **Mobile App Troubleshooting**: Resolved push notifications & permission pop-up issues in the *SankalpTaru Huge* app.
• **Authentication & Validation**: Added image-upload validation checks and fixed a login bug in the *G1 Ground Team* app.
• **Web Platform Maintenance**: Updated plugins on the *SankalpTaru* production website and resolved responsive UI issues.
• **Collaborative Workflows**: Used team-based Git/GitHub workflows, pull request reviews, and incorporated senior code review feedback.`;
    }

    // 3. Technical Skills
    if (q.includes("skill") || q.includes("stack") || q.includes("react") || q.includes("python") || q.includes("django") || q.includes("language") || q.includes("frontend") || q.includes("backend")) {
      return `Here is Sheeladitya's verified technical skillset:
• **Frontend**: React, Next.js, Modern JavaScript (ES6+), HTML5, CSS3, Responsive Design.
• **Backend**: Python, Django, PHP, RESTful APIs, Session & Authentication logic.
• **CMS & Web**: WordPress, Plugin maintenance & updates, UI troubleshooting.
• **Tools & Practices**: Git, GitHub Pull Requests, Code Reviews, Input/Upload Validation, Debugging & Bug Resolution.`;
    }

    // 4. Education
    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("btech") || q.includes("btkit") || q.includes("university")) {
      return `Sheeladitya is pursuing his **Bachelor of Technology (B.Tech) in Computer Science and Engineering** at **BTKIT** (2023–2027 Expected). He pairs academic foundations with practical software development experience.`;
    }

    // 4b. Resume / CV
    if (q.includes("resume") || q.includes("cv")) {
      return `📄 You can view and download Sheeladitya's official resume here:
[Open Sheeladitya's Resume (Google Drive)](${this.data.profile.resumeUrl})

You can also click the **Resume / CV** button in the header navigation or the hero section anytime!`;
    }

    // 5. Hiring & Availability
    if (q.includes("hire") || q.includes("available") || q.includes("opportunity") || q.includes("remote") || q.includes("contact") || q.includes("email") || q.includes("full time")) {
      return `Yes! Sheeladitya is open to **Software Engineer, Full-Stack, and Trainee opportunities** (Remote, Hybrid, or On-site).

📫 **Direct Contact Coordinates:**
• **Email**: ${this.data.profile.email} (Use the "Copy Email" button on this site)
• **Profiles**: Check out his GitHub & LinkedIn in the header and footer.
• You can also send a direct message via the contact form on this site!`;
    }

    // 6. Name query / Easter egg
    if (q.includes("why stranger") || q.includes("name stranger") || q.includes("bgmi") || q.includes("game")) {
      return `My name is **Stranger** — inspired by Sheeladitya's iconic gamer tag in BGMI and competitive games! 🎮

While the handle is 'Stranger', I know everything about Sheeladitya's engineering journey, his experience at ColoredCow, projects like the *Talent Evaluator & AI Mentor*, and his technical stack!`;
    }

    // 7. Greetings
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("who are you") || q.includes("who is")) {
      return `Hello! 👋 I am **Stranger**, the interactive AI representative for **Sheeladitya Vinay Kumar**.

I can answer any questions regarding his software engineering experience at ColoredCow, projects like *Talent Evaluator* and *SankalpTaru*, his React/Next.js/Python stack, or how to get in touch with him.

What would you like to explore?`;
    }

    // Default Fallback
    return `Thank you for asking! As Sheeladitya's AI representative, I can confirm he specializes in **React, Next.js, JavaScript, Python, Django, and WordPress**.

During his time at **ColoredCow**, he worked on real-world projects including the *SankalpTaru Huge* app, *G1 Ground Team* app, and the *Talent Evaluator & AI Mentor* platform.

Feel free to ask me about:
• His **Projects** (Talent Evaluator, SankalpTaru apps)
• His **Work Experience** at ColoredCow
• His **Tech Stack** (Frontend & Backend)
• Or how to **Get in Touch / Hire** him!`;
  }
}

// Sound helper for Web Audio API
export function playBlipSound(freq = 600, duration = 0.08) {
  if (typeof window === "undefined") return;
  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext })
        .webkitAudioContext;
    if (!AudioCtxClass) return;
    const ctx = new AudioCtxClass();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors gracefully
  }
}
