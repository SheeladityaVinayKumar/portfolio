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

    // 1. SankalpTaru Foundation NGO & Ecosystem (E-Commerce Web + Companion Mobile App)
    const isSankalpQuery =
      q.includes("sankalptaru") ||
      q.includes("sankalptau") ||
      q.includes("sankalp") ||
      q.includes("ngo") ||
      q.includes("foundation");

    const isAppSpecific =
      (q.includes("huge") ||
        q.includes("mobile") ||
        q.includes("notification") ||
        q.includes("permission") ||
        q.includes("play store") ||
        q.includes("app store") ||
        q.includes("android") ||
        q.includes("ios")) &&
      !q.includes("website") &&
      !q.includes("wordpress") &&
      !q.includes("ecommerce") &&
      !q.includes("e-commerce");

    const isWebSpecific =
      (q.includes("website") ||
        q.includes("wordpress") ||
        q.includes("plugin") ||
        q.includes("ecommerce") ||
        q.includes("e-commerce") ||
        q.includes("sankalptaru.org") ||
        q.includes("web")) &&
      !q.includes("huge") &&
      !q.includes("notification") &&
      !q.includes("permission");

    if (isSankalpQuery && isAppSpecific) {
      if (
        q.includes("link") ||
        q.includes("url") ||
        q.includes("download") ||
        q.includes("store")
      ) {
        return `📱 **SankalpTaru HUGE Mobile App Links:**
• **Google Play Store**: [Download on Google Play](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• **Apple App Store**: [Download on Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)

This is the companion mobile app to **SankalpTaru Foundation's** e-commerce platform ([sankalptaru.org](https://sankalptaru.org)). Sheeladitya resolved push notification delivery drops and OS permission pop-ups for 50,000+ donors tracking their planted trees.`;
      }

      return `### 📱 SankalpTaru HUGE — Companion Mobile App
Developed for **SankalpTaru Foundation (an IT-enabled environmental NGO)**:

• **Role in Ecosystem**: Serves as the companion mobile app to the NGO's live e-commerce platform ([sankalptaru.org](https://sankalptaru.org)), enabling 50,000+ donors to track their planted trees with live GPS coordinates, photos, and growth reports.
• **Sheeladitya's Engineering Impact**:
  - Diagnosed and resolved critical push-notification delivery drops so donors receive timely plantation updates.
  - Fixed device runtime permission pop-ups (camera, storage, geolocation) across Android and iOS versions.
• **Live App Downloads**:
  - [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
  - [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)`;
    }

    if (isSankalpQuery && isWebSpecific) {
      return `### 🌐 SankalpTaru Foundation — Live E-Commerce Website ([sankalptaru.org](https://sankalptaru.org))
The central digital platform for **SankalpTaru Foundation (Environmental NGO)**:

• **What it is**: A high-traffic environmental e-commerce portal where thousands of individuals, schools, and corporate sponsors purchase tree plantations, sponsor rural agroforestry, and calculate carbon footprints.
• **Sheeladitya's Engineering Impact**:
  - Audited and updated mission-critical WordPress & WooCommerce plugins.
  - Eliminated stylesheet conflict regressions and patched mobile responsive layout glitches across donation and checkout funnels.
  - Preserved **100% production uptime** during live transactions and high-volume plantation drives.
• **Live Platform**: [Visit sankalptaru.org](https://sankalptaru.org)`;
    }

    if (isSankalpQuery) {
      return `### 🌱 SankalpTaru Foundation (Environmental NGO) Ecosystem

**SankalpTaru Foundation** is India's leading IT-enabled environmental NGO foundation. Its digital ecosystem is built around an active **e-commerce website** and a **companion mobile application**.

During his time as an **SDE Intern** at **ColoredCow**, Sheeladitya engineered improvements across both platforms:

1. 🌐 **E-Commerce Website ([sankalptaru.org](https://sankalptaru.org))**:
   • The NGO's live online storefront where users and corporations purchase tree plantations, sponsor agroforestry drives, and calculate carbon footprints.
   • **Sheeladitya's Impact**: Audited CMS/WooCommerce plugins, resolved CSS regressions, and patched responsive checkout UI with **100% production uptime**.

2. 📱 **Companion Mobile App (SankalpTaru HUGE)**:
   • The mobile application for **50,000+ donors** to track their purchased trees with live GPS coordinates, photos, and plantation status updates.
   • **Sheeladitya's Impact**: Diagnosed push-notification delivery drops and fixed runtime permission pop-up blockers (camera, storage, geolocation) across Android and iOS.
   • **App Links**: [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru) · [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)`;
    }

    // 2. Specific Project: G1 Ground Team App
    if (
      q.includes("g1") ||
      q.includes("ground team") ||
      (q.includes("upload") && q.includes("validation"))
    ) {
      return `In the **G1 Ground Team App**, Sheeladitya introduced client/server image-upload validation checks to prevent corrupted uploads from crashing the app in low-bandwidth field conditions, and resolved a critical authentication login issue for field operators.
*(Note: This is an internal field operations application within ColoredCow/enterprise repository).*`;
    }

    // 3. Direct Links / URLs Directory
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
• 🌐 **SankalpTaru NGO E-Commerce**: [sankalptaru.org](https://sankalptaru.org)
• 📱 **SankalpTaru HUGE (Android)**: [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• 🍏 **SankalpTaru HUGE (iOS)**: [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)
• 🐙 **Sheeladitya's GitHub Profile**: [github.com/SheeladityaVinayKumar](${this.data.profile.githubUrl})`;
    }

    // 4. Comparison Table / Matrix
    if (q.includes("table") || q.includes("compare") || q.includes("matrix") || (q.includes("summary") && q.includes("project"))) {
      return `Here is a summary matrix of Sheeladitya's production project work:

| Project / Platform | Organization | Core Stack | Key Impact |
| :--- | :--- | :--- | :--- |
| **SankalpTaru E-Commerce Web** | SankalpTaru NGO ([sankalptaru.org](https://sankalptaru.org)) | WordPress, WooCommerce, PHP | Plugin audits & checkout UI fixes with 100% uptime |
| **SankalpTaru HUGE App** | SankalpTaru NGO (Android & iOS) | Mobile Architecture, Push SDKs | Fixed push notifications & permissions for 50k+ donors |
| **G1 Ground Team App** | Field Operations | Mobile, Auth, Validation | Pre-flight image upload validation & login fix |

*Feel free to ask me for more details on any of these projects!*`;
    }

    // 5. All Projects Overview
    if (
      q.includes("project") ||
      q.includes("built") ||
      q.includes("apps") ||
      q.includes("work") ||
      q.includes("portfolio")
    ) {
      return `Here are Sheeladitya's core projects directly from his resume:

1. 🌐 **SankalpTaru Foundation E-Commerce Website**: Live NGO storefront for tree purchases ([sankalptaru.org](https://sankalptaru.org)) — audited plugins and fixed responsive checkout UI with 100% uptime.
2. 📱 **SankalpTaru HUGE — NGO Companion Mobile App**: Mobile tree tracking companion app for 50,000+ donors — resolved push notification delivery drops and permission pop-ups. ([Google Play](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru) · [App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187))
3. 🛡️ **G1 Ground Team App**: Engineered pre-flight image-upload validation checks and fixed critical login session bugs. *(Internal production codebase)*

*Click any project card to view its complete architecture deep-dive!*`;
    }

    // 6. Experience at ColoredCow
    if (q.includes("experience") || q.includes("coloredcow") || q.includes("job") || q.includes("intern") || q.includes("trainee") || q.includes("sde")) {
      return `Sheeladitya works as a **Software Development Engineer (SDE) Intern at ColoredCow** (Nov 2025 – Present), supporting engineering for **SankalpTaru Foundation (NGO)** and internal field operations:
• **SankalpTaru E-Commerce Web ([sankalptaru.org](https://sankalptaru.org))**: Audited plugins and resolved responsive layout regressions across donation & checkout funnels with 100% uptime.
• **SankalpTaru HUGE Companion Mobile App**: Resolved push notifications & permission pop-up issues for 50,000+ donors on Google Play & App Store.
• **G1 Ground Team App**: Added multi-tier pre-flight image-upload validation checks and fixed authentication login bugs in field operations.
• **Collaborative Workflows**: Used professional team-based Git/GitHub PR reviews and incorporated senior engineering feedback.`;
    }

    // 7. Technical Skills
    if (q.includes("skill") || q.includes("stack") || q.includes("react") || q.includes("python") || q.includes("django") || q.includes("language") || q.includes("web") || q.includes("backend")) {
      return `Here is Sheeladitya's verified technical skillset:
• **Web & UI Systems**: React, Next.js, Modern JavaScript (ES6+), HTML5, CSS3, Responsive Design.
• **Backend**: Python, Django, PHP, RESTful APIs, Session & Authentication logic.
• **CMS & Web Platforms**: WordPress, Plugin maintenance & updates, UI troubleshooting.
• **Tools & Practices**: Git, GitHub Pull Requests, Code Reviews, Input/Upload Validation, Debugging & Bug Resolution.`;
    }

    // 8. Education
    if (q.includes("education") || q.includes("college") || q.includes("degree") || q.includes("btech") || q.includes("btkit") || q.includes("university")) {
      return `Sheeladitya is pursuing his **Bachelor of Technology (B.Tech) in Computer Science and Engineering** at **BTKIT** (2023–2027 Expected). He pairs academic foundations with practical software development experience.`;
    }

    // 9. Resume / CV
    if (q.includes("resume") || q.includes("cv")) {
      return `📄 You can view and download Sheeladitya's official resume here:
[Open Sheeladitya's Resume (Google Drive)](${this.data.profile.resumeUrl})

You can also click the **Resume / CV** button in the header navigation or the hero section anytime!`;
    }

    // Recruiter Pitch / Why Hire Sheeladitya
    if (
      q.includes("why hire") ||
      q.includes("why should") ||
      q.includes("recruiter") ||
      q.includes("pitch") ||
      q.includes("stand out")
    ) {
      return `### 🌟 4 Reasons Sheeladitya Stands Out for Engineering Roles:

1. **Real-World Production Track Record**:
   Unlike candidates with only academic toys, Sheeladitya resolved critical push-notification delivery drops and device permission blockers on live apps with **50,000+ users** (*SankalpTaru Huge* on Google Play & App Store) at ColoredCow.

2. **Full-Stack Engineering Breadth**:
   Hands-on fluency across modern web systems (**React, Next.js, ES6+, Responsive Design**) and server-side ecosystems (**Python, Django, PHP, RESTful APIs**).

3. **Defensive Engineering & Collaboration**:
   Accustomed to professional team Git/GitHub PR workflows, code reviews, pre-flight file validation to eliminate field crashes, and robust authentication.

4. **Self-Directed & Rapid Learner**:
   Engineered high-performance responsive web platforms and embedded full interactive AI agent capabilities into this personal portfolio. He is coachable, humble, and ready to ship on Day 1.

📄 [Download Sheeladitya's Resume PDF](${this.data.profile.resumeUrl})
✉️ [Compose an Email in Gmail](https://mail.google.com/mail/?view=cm&fs=1&to=${this.data.profile.email})`;
    }

    // 10. General Hiring & Availability
    if (q.includes("hire") || q.includes("available") || q.includes("opportunity") || q.includes("remote") || q.includes("contact") || q.includes("email") || q.includes("full time")) {
      return `Yes! Sheeladitya is open to **Software Engineer, Full-Stack Developer, and SDE opportunities** (Remote, Hybrid, or On-site).

📫 **Direct Contact Coordinates:**
• **Email**: ${this.data.profile.email} · [Compose in Gmail](https://mail.google.com/mail/?view=cm&fs=1&to=${this.data.profile.email})
• **Profiles**: Check out his GitHub & LinkedIn in the header and footer.
• You can also send a direct message via the contact form on this site!`;
    }

    // 11. Name query / Easter egg
    if (q.includes("why stranger") || q.includes("name stranger") || q.includes("bgmi") || q.includes("game")) {
      return `My name is **Stranger** — inspired by Sheeladitya's iconic gamer tag in BGMI and competitive games! 🎮

While the handle is 'Stranger', I know everything about Sheeladitya's engineering journey, his experience at ColoredCow, projects like *SankalpTaru* and *G1 Ground Team*, and his technical stack!`;
    }

    // 12. Greetings
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("who are you") || q.includes("who is")) {
      return `Hello! 👋 I am **Stranger**, the interactive AI representative for **Sheeladitya Vinay Kumar**.

I can answer any questions regarding his software engineering experience at ColoredCow, projects like *SankalpTaru Foundation* and *G1 Ground Team*, his React/Next.js/Python stack, or how to get in touch with him.

What would you like to explore?`;
    }

    // Default Fallback
    return `Thank you for asking! As Sheeladitya's AI representative, I can confirm he specializes in **React, Next.js, JavaScript, Python, Django, and WordPress**.

During his time at **ColoredCow**, he worked on real-world production projects including the *SankalpTaru Huge* app, *G1 Ground Team* app, and the *SankalpTaru Foundation* e-commerce web platform.

Feel free to ask me about:
• His **Projects** (SankalpTaru E-Commerce, HUGE app, G1 Ground Team)
• His **Work Experience** at ColoredCow
• His **Tech Stack** (Web, UI & Backend)
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
