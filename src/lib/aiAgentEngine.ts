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

    // 1. Enterprise Web & Mobile Platform Ecosystem
    const isPlatformQuery =
      q.includes("platform") ||
      q.includes("app") ||
      q.includes("mobile") ||
      q.includes("web") ||
      q.includes("ecommerce") ||
      q.includes("e-commerce") ||
      q.includes("enterprise") ||
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
        q.includes("web")) &&
      !q.includes("huge") &&
      !q.includes("notification") &&
      !q.includes("permission");

    if (isPlatformQuery && isAppSpecific) {
      if (
        q.includes("link") ||
        q.includes("url") ||
        q.includes("download") ||
        q.includes("store")
      ) {
        return `📱 **Enterprise Companion Mobile App Links:**
• **Google Play Store**: [Download on Google Play](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• **Apple App Store**: [Download on Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)

This is the companion mobile app to enterprise e-commerce platforms. Sheeladitya resolved push notification delivery drops and OS permission pop-ups for 50,000+ users tracking data in real-time.`;
      }

      return `### 📱 Enterprise Companion Mobile App
Developed during SDE internship at ColoredCow:

• **Role in Ecosystem**: Serves as a companion mobile app to live enterprise e-commerce platforms, enabling 50,000+ users to track real-time data with live GPS coordinates, photos, and status reports.
• **Sheeladitya's Engineering Impact**:
  - Diagnosed and resolved critical push-notification delivery drops so users receive timely updates.
  - Fixed device runtime permission pop-ups (camera, storage, geolocation) across Android and iOS versions.
• **Live App Downloads**:
  - [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
  - [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)`;
    }

    if (isPlatformQuery && isWebSpecific) {
      return `### 🌐 Enterprise Live E-Commerce Web Platform
The central digital platform maintained during Sheeladitya's internship:

• **What it is**: A high-traffic enterprise e-commerce portal where thousands of individuals and corporate partners purchase products, sponsor initiatives, and calculate carbon footprints.
• **Sheeladitya's Engineering Impact**:
  - Audited and updated mission-critical WordPress & WooCommerce plugins.
  - Eliminated stylesheet conflict regressions and patched mobile responsive layout glitches across donation and checkout funnels.
  - Preserved **100% production uptime** during live transactions and high-volume traffic drives.`;
    }

    if (isPlatformQuery) {
      return `### 🌱 Enterprise Web & Mobile Platform Ecosystem

Maintained an active **e-commerce web platform** and a **companion mobile application** during Sheeladitya's SDE Internship at **ColoredCow**:

1. 🌐 **E-Commerce Web Platform**:
   • Online storefront where users and corporations purchase products and sponsor initiatives.
   • **Sheeladitya's Impact**: Audited CMS/WooCommerce plugins, resolved CSS regressions, and patched responsive checkout UI with **100% production uptime**.

2. 📱 **Companion Mobile App**:
   • Mobile application for **50,000+ users** to track data with live GPS coordinates, photos, and status updates.
   • **Sheeladitya's Impact**: Diagnosed push-notification delivery drops and fixed runtime permission pop-up blockers (camera, storage, geolocation) across Android and iOS.
   • **App Links**: [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru) · [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)`;
    }

    // 2. Specific Project: Field Operations App
    if (
      q.includes("g1") ||
      q.includes("ground team") ||
      (q.includes("upload") && q.includes("validation"))
    ) {
      return `In the **Field Operations & Ground Team Mobile App**, Sheeladitya introduced client/server image-upload validation checks to prevent corrupted uploads from crashing the app in low-bandwidth field conditions, and resolved a critical authentication login issue for field operators.
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
• 🌐 **Enterprise E-Commerce Web**: [Live Storefront](https://sankalptaru.org)
• 📱 **Enterprise Mobile App (Android)**: [Google Play Store](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru)
• 🍏 **Enterprise Mobile App (iOS)**: [Apple App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187)
• 🐙 **Sheeladitya's GitHub Profile**: [github.com/SheeladityaVinayKumar](${this.data.profile.githubUrl})`;
    }

    // 4. Comparison Table / Matrix
    if (q.includes("table") || q.includes("compare") || q.includes("matrix") || (q.includes("summary") && q.includes("project"))) {
      return `Here is a summary matrix of Sheeladitya's production project work:

| Project / Platform | Organization | Core Stack | Key Impact |
| :--- | :--- | :--- | :--- |
| **Enterprise E-Commerce Web** | Enterprise Web Platform | WordPress, WooCommerce, PHP | Plugin audits & checkout UI fixes with 100% uptime |
| **Companion Mobile App** | Mobile App (Android & iOS) | Mobile Architecture, Push SDKs | Fixed push notifications & permissions for 50k+ users |
| **Field Operations Mobile App** | Field Operations | Mobile, Auth, Validation | Pre-flight image upload validation & login fix |

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

1. 🌐 **Enterprise E-Commerce Website**: Live online storefront — audited plugins and fixed responsive checkout UI with 100% uptime.
2. 📱 **Enterprise Companion Mobile App**: Mobile tracking companion app for 50,000+ users — resolved push notification delivery drops and permission pop-ups. ([Google Play](https://play.google.com/store/apps/details?id=org.sankalptaru.sankalptaru) · [App Store](https://apps.apple.com/in/app/sankalptaru-huge/id1462571187))
3. 🛡️ **Field Operations Mobile App**: Engineered pre-flight image-upload validation checks and fixed critical login session bugs. *(Internal production codebase)*

*Click any project card to view its complete architecture deep-dive!*`;
    }

    // 6. Experience at ColoredCow
    if (q.includes("experience") || q.includes("coloredcow") || q.includes("job") || q.includes("intern") || q.includes("trainee") || q.includes("sde")) {
      return `Sheeladitya works as a **Software Development Engineer (SDE) Intern at ColoredCow** (Nov 2025 – Present), supporting engineering across enterprise web platforms and internal field operations:
• **Enterprise E-Commerce Web**: Audited plugins and resolved responsive layout regressions across donation & checkout funnels with 100% uptime.
• **Companion Mobile App**: Resolved push notifications & permission pop-up issues for 50,000+ users on Google Play & App Store.
• **Field Operations App**: Added multi-tier pre-flight image-upload validation checks and fixed authentication login bugs in field operations.
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
      return `Sheeladitya is pursuing his **Bachelor of Technology (B.Tech) in Computer Science and Engineering** at **BTKIT** (2023–2027). He pairs academic foundations with practical software development experience.`;
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
   Unlike candidates with only academic toys, Sheeladitya resolved critical push-notification delivery drops and device permission blockers on live apps with **50,000+ users** on Google Play & App Store at ColoredCow.

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

While the handle is 'Stranger', I know everything about Sheeladitya's engineering journey, his experience at ColoredCow, projects like enterprise web platforms and field operations apps, and his technical stack!`;
    }

    // 12. Greetings
    if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("who are you") || q.includes("who is")) {
      return `Hello! 👋 I am **Stranger**, the interactive AI representative for **Sheeladitya Vinay Kumar**.

I can answer any questions regarding his software engineering experience at ColoredCow, his React/Next.js/Python stack, or how to get in touch with him.

What would you like to explore?`;
    }

    // Hobbies query
    if (q.includes("hobby") || q.includes("hobbies") || q.includes("interest") || q.includes("free time") || q.includes("spare time")) {
      return `🎮 **Sheeladitya's Personal Interests & Hobbies:**
• **Gaming & Competitive Play**: Long-time BGMI (Battlegrounds Mobile India) enthusiast and tactical shooter player. This sharpens quick decision-making and teamwork under pressure, which he brings to fast-paced software engineering sprints.
*(Note: Sheeladitya is strictly into competitive gaming and does not engage in creative writing, blogging, or playing musical instruments).*`;
    }
    return `Thank you for asking! As Sheeladitya's AI representative, I can confirm he specializes in **React, Next.js, JavaScript, Python, Django, and WordPress**.

During his time at **ColoredCow**, he worked on real-world production projects including mobile apps and enterprise e-commerce web platforms.

Feel free to ask me about:
• His **Projects** (Enterprise Web & Mobile Platforms)
• His **Work Experience** at ColoredCow
• His **Tech Stack** (Web, UI & Backend)
• Or how to **Get in Touch / Hire** him!`;
  }
}
