"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAgentModal } from "@/components/AIAgentModal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function Home() {
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const [aiAgentPrompt, setAiAgentPrompt] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profile, experience, education, skillCategories, projects, metrics } = PORTFOLIO_DATA;

  // Show production projects on home page, with link to full projects page
  const featuredProjects = projects;

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      showToast(`✓ Copied email: ${profile.email}`);
    }).catch(() => {
      showToast(`Email: ${profile.email}`);
    });
  };

  const handleOpenAI = (prompt?: string) => {
    setAiAgentPrompt(prompt);
    setIsAIAgentOpen(true);
  };

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("Please fill out all fields before sending.");
      return;
    }

    setIsSubmitting(true);

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
      "8e82e255-a874-46dc-a52e-ba768bc523c7";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          from_name: `${formData.name.trim()} (Portfolio Inquiry)`,
          subject: `Portfolio Message from ${formData.name.trim()}`
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showToast("✓ Thank you! Your message has been sent to Sheeladitya's inbox.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to deliver message.");
      }
    } catch {
      // Graceful fallback: Open Gmail compose with pre-filled message
      showToast("Opening Gmail draft to complete message...");
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(`Portfolio Message from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.open(gmailUrl, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header onOpenAIAgent={() => handleOpenAI()} />

      <main className="container">
        {/* ==========================================================================
            HERO / PROFILE INTRO
            ========================================================================== */}
        <section className="hero-profile-box" id="about">
          <div className="hero-avatar-wrap">
            <Image
              src="/assets/images/sheeladitya.png"
              alt={profile.name}
              width={104}
              height={104}
              className="hero-avatar-img"
              loading="eager"
            />
          </div>

          <div className="hero-content">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span className="badge-pill emerald">
                <span className="pulse-dot"></span> Available for Opportunities
              </span>
              <span className="badge-pill">{education.institution} &middot; B.Tech CSE</span>
            </div>

            <h1>{profile.name}</h1>
            <div className="hero-subheading">
              Software Engineer &middot; React &middot; Next.js &middot; Python &middot; Django &middot; WordPress
            </div>

            <p className="hero-bio">
              {profile.summary}
            </p>

            <div className="hero-actions">
              <Link href="/projects" className="btn-primary">
                <span>View Projects</span>
                <span style={{ fontSize: "1.1rem" }}>&rarr;</span>
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                title="View & Download Resume PDF"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
                <span>Resume / CV</span>
              </a>
              <button
                onClick={() => handleOpenAI()}
                className="btn-secondary"
                type="button"
              >
                <span>Ask Stranger</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button
                onClick={handleCopyEmail}
                className="btn-copy"
                type="button"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy Email</span>
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            RECRUITER 1-MINUTE FAST-TRACK (EXECUTIVE SUMMARY)
            ========================================================================== */}
        <section className="recruiter-fast-track" aria-label="Recruiter Summary">
          <div className="recruiter-header">
            <div className="recruiter-badge">
              <span className="pulse-dot"></span>
              <span>⚡ Recruiter Fast-Track &middot; 30-Second Summary</span>
            </div>
            <button
              onClick={() => handleOpenAI("Why should our company hire Sheeladitya as a Software Engineer?")}
              className="recruiter-ai-ask-btn"
              type="button"
            >
              <span>🎯 Ask Stranger: &ldquo;Why Hire Sheeladitya?&rdquo;</span>
              <span>&rarr;</span>
            </button>
          </div>

          <div className="recruiter-grid">
            <div className="recruiter-card">
              <div className="recruiter-card-icon">🎯</div>
              <div className="recruiter-card-title">Target Roles</div>
              <div className="recruiter-card-desc">
                Software Engineer &middot; Full-Stack Developer &middot; Software Development Engineer (SDE)
              </div>
            </div>

            <div className="recruiter-card">
              <div className="recruiter-card-icon">⚡</div>
              <div className="recruiter-card-title">Production Proof</div>
              <div className="recruiter-card-desc">
                1+ Year as SDE Intern at <strong>ColoredCow</strong> &middot; Shipped fixes on apps in Google Play &amp; Apple App Store
              </div>
            </div>

            <div className="recruiter-card">
              <div className="recruiter-card-icon">🛠️</div>
              <div className="recruiter-card-title">Core Technical Stack</div>
              <div className="recruiter-card-desc">
                React, Next.js, ES6+, Python, Django, REST APIs, Git &amp; PR Reviews
              </div>
            </div>

            <div className="recruiter-card">
              <div className="recruiter-card-icon">📍</div>
              <div className="recruiter-card-title">Availability &amp; Work Model</div>
              <div className="recruiter-card-desc">
                Immediate availability &middot; Open for Full-Time, Remote, Hybrid, or Relocation
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            IMPACT METRICS BAR (Verified SDE & Engineering Metrics)
            ========================================================================== */}
        <section className="metrics-strip-section" aria-label="Key Impact Metrics">
          <div className="metrics-grid">
            {metrics.map((m, idx) => (
              <div key={idx} className={`metric-card accent-${m.accent}`}>
                <div className="metric-header">
                  <span className="metric-value">{m.value}</span>
                  <span className={`metric-badge ${m.accent}`}>Highlight</span>
                </div>
                <div className="metric-label">{m.label}</div>
                <div className="metric-detail">{m.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            FEATURED PROJECTS PREVIEW (Top 2 Highlights)
            ========================================================================== */}
        <section className="section-block">
          <div className="section-title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div className="section-eyebrow">Work Highlights</div>
              <h2 className="section-heading">Featured Projects</h2>
            </div>
            <Link href="/projects" style={{ fontWeight: 600, color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: 6 }}>
              <span>View all {projects.length} projects</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="projects-preview-grid">
            {featuredProjects.map((p) => (
              <div key={p.id} className="project-card">
                <div className="project-card-body">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <span className="badge-pill indigo">
                      {p.badge}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                      {p.categoryLabel}
                    </span>
                  </div>

                  <h3 className="project-card-title">{p.title}</h3>
                  <div style={{ fontSize: "0.86rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: 8 }}>
                    {p.subtitle}
                  </div>

                  {p.impactMetric && (
                    <div className="project-impact-strip">
                      <span className="impact-pill">🚀 Key Impact</span>
                      <span className="impact-text">{p.impactMetric}</span>
                    </div>
                  )}

                  <p className="project-card-desc">{p.summary}</p>

                  <div className="project-card-tech">
                    {p.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Project Links / Repo Status Row */}
                  <div className="project-links-row">
                    {p.demoUrl && (
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link primary"
                        title="Open Live Demonstration"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                    {p.appUrl && (
                      <a
                        href={p.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link primary"
                        title="View on Google Play Store"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                        <span>Play Store</span>
                      </a>
                    )}
                    {p.appStoreUrl && (
                      <a
                        href={p.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link"
                        title="View on Apple App Store"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.02-.49 2.64-1.24z" />
                        </svg>
                        <span>App Store</span>
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link"
                        title="View GitHub Repository"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {p.repoType === "internal" && (
                      <span className="badge-repo-status internal" title={p.accessNote || "Internal Production Work"}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span>Internal Production</span>
                      </span>
                    )}
                    {p.repoType === "client" && (
                      <span className="badge-repo-status client" title={p.accessNote || "Live Production Website"}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="2" y1="12" x2="22" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        <span>Live Production</span>
                      </span>
                    )}
                  </div>

                  <div className="project-card-foot">
                    <Link href={`/projects#${p.id}`} style={{ fontWeight: 600, color: "var(--accent-primary)", fontSize: "0.88rem" }}>
                      Read Case Study &rarr;
                    </Link>
                    <button
                      onClick={() => handleOpenAI(`Tell me more about ${p.title}`)}
                      style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}
                      type="button"
                    >
                      Ask AI &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            WORK EXPERIENCE & EDUCATION
            ========================================================================== */}
        <section className="section-block">
          <div className="section-title-row">
            <div className="section-eyebrow">Career &amp; Background</div>
            <h2 className="section-heading">Experience &amp; Education</h2>
          </div>

          <div className="experience-education-grid">
            {/* Experience Card */}
            <div className="clean-card">
              <h3 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Professional Experience</h3>
              <div className="timeline-card-inner">
                {experience.map((exp, idx) => (
                  <div key={idx} className="timeline-row">
                    <div className="timeline-dot"></div>
                    <div className="timeline-details">
                      <h4>{exp.role}</h4>
                      <div className="timeline-company">{exp.company} &middot; {exp.period}</div>
                      <ul className="timeline-list">
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Card */}
            <div className="clean-card education-card">
              <div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 16 }}>Education</h3>
                <div style={{ marginBottom: 16 }}>
                  <h4 style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>{education.degree}</h4>
                  <div style={{ fontSize: "0.9rem", color: "var(--accent-primary)", fontWeight: 600 }}>{education.major}</div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: 4 }}>
                    {education.institution} &middot; {education.period}
                  </div>
                </div>
                <p style={{ fontSize: "0.88rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                  {education.description}
                </p>
              </div>

              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-light)" }}>
                <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 8, fontWeight: 600 }}>Core Practices</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {PORTFOLIO_DATA.developmentPractices.map((p, i) => (
                    <span key={i} style={{ fontSize: "0.76rem", padding: "3px 9px", background: "var(--bg-subtle)", borderRadius: 99, color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
                      {p.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
            TECHNICAL SKILLS
            ========================================================================== */}
        <section className="section-block">
          <div className="section-title-row">
            <div className="section-eyebrow">Technical Skills</div>
            <h2 className="section-heading">Skills &amp; Technologies</h2>
          </div>

          <div className="skills-grid-clean">
            {skillCategories.map((cat, idx) => (
              <div key={idx} className="skill-col-card">
                <div className="skill-col-title">
                  <span>{cat.icon}</span>
                  <span>{cat.title}</span>
                </div>
                <div className="skill-items-list">
                  {cat.skills.map((s, sIdx) => (
                    <div key={sIdx} className={`skill-item-row ${s.featured ? "featured" : ""}`}>
                      <span style={{ color: "var(--accent-primary)" }}>•</span>
                      <span>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================================================
            CONTACT SECTION
            ========================================================================== */}
        <section className="section-block" id="contact">
          <div className="section-title-row">
            <div className="section-eyebrow">Let&apos;s Connect</div>
            <h2 className="section-heading">Contact &amp; Coordinates</h2>
          </div>

          <div className="contact-box-grid">
            <div className="clean-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: 12 }}>Direct Channels</h3>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: 20 }}>
                  Feel free to get in touch for software engineering opportunities, roles, or project collaborations.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {/* Email Action Card */}
                  <div
                    style={{
                      padding: "14px 16px",
                      background: "var(--bg-subtle)",
                      borderRadius: 10,
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 10
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent-primary)" }}>
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--text-primary)" }}>
                          {profile.email}
                        </span>
                      </div>
                      <span className="badge-pill emerald" style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                        Active Inbox
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginTop: 2 }}>
                      <button
                        onClick={handleCopyEmail}
                        className="btn-copy"
                        type="button"
                        style={{ fontSize: "0.8rem", padding: "6px 12px" }}
                        title="Copy email address to clipboard"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>Copy Email</span>
                      </button>
                    </div>
                  </div>

                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--bg-subtle)",
                      borderRadius: 8,
                      fontSize: "0.88rem",
                      fontWeight: 600
                    }}
                  >
                    <span>GitHub Profile</span>
                    <span>&rarr;</span>
                  </a>

                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: "var(--bg-subtle)",
                      borderRadius: 8,
                      fontSize: "0.88rem",
                      fontWeight: 600
                    }}
                  >
                    <span>LinkedIn Profile</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8, fontSize: "0.84rem", color: "var(--text-muted)" }}>
                <span className="pulse-dot"></span>
                <span>Location: {profile.location}</span>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="clean-card">
              <h3 style={{ fontSize: "1.2rem", marginBottom: 14 }}>Send a Direct Message</h3>
              <form onSubmit={handleSubmitContact} suppressHydrationWarning>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Alex Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    suppressHydrationWarning
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="msg">Message</label>
                  <textarea
                    id="msg"
                    required
                    className="form-textarea"
                    placeholder="Hello Sheeladitya, we'd like to discuss a software engineering opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Side-Panel AI Launcher (Bottom Right) */}
      {!isAIAgentOpen && (
        <div
          className="floating-launcher-btn"
          onClick={() => handleOpenAI()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpenAI();
          }}
          aria-label="Open AI Assistant"
        >
          <Image
            src="/assets/images/sheeladitya.png"
            alt="Stranger AI"
            width={30}
            height={30}
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>Chat with Stranger</span>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Sheeladitya&apos;s AI</span>
          </div>
        </div>
      )}

      {/* Gemini-Style Side Panel */}
      <AIAgentModal
        key={isAIAgentOpen ? "open" : "closed"}
        isOpen={isAIAgentOpen}
        initialPrompt={aiAgentPrompt}
        onPromptHandled={() => setAiAgentPrompt(undefined)}
        onClose={() => {
          setIsAIAgentOpen(false);
          setAiAgentPrompt(undefined);
        }}
      />

      {/* Toast Notification */}
      <div className={`toast-clean ${toastMessage ? "show" : ""}`}>
        {toastMessage}
      </div>
    </>
  );
}
