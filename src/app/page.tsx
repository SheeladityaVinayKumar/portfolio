"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAgentModal } from "@/components/AIAgentModal";
import { Toast } from "@/components/Toast";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playBlipSound } from "@/lib/aiAgentEngine";

export default function Home() {
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const [aiAgentPrompt, setAiAgentPrompt] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { profile, experience, education, skillCategories, projects } = PORTFOLIO_DATA;

  // Show top 2 projects on home page, with link to full projects page
  const featuredProjects = projects.slice(0, 2);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      playBlipSound(900, 0.1);
      showToast(`✓ Copied email: ${profile.email}`);
    }).catch(() => {
      showToast(`Email: ${profile.email}`);
    });
  };

  const handleOpenAI = (prompt?: string) => {
    setAiAgentPrompt(prompt);
    setIsAIAgentOpen(true);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playBlipSound(700, 0.08);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast("✓ Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    }, 800);
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
            FEATURED PROJECTS PREVIEW (Top 2 Highlights)
            ========================================================================== */}
        <section className="section-block">
          <div className="section-title-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div className="section-eyebrow">Work Highlights</div>
              <h2 className="section-heading">Featured Projects</h2>
            </div>
            <Link href="/projects" style={{ fontWeight: 600, color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: 6 }}>
              <span>View all 4 projects</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="projects-preview-grid">
            {featuredProjects.map((p, index) => (
              <div key={p.id} className="project-card">
                <div className="project-img-box">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="project-img"
                    sizes="(max-width: 860px) 100vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
                <div className="project-card-body">
                  <span className="badge-pill indigo" style={{ alignSelf: "flex-start", marginBottom: 8 }}>
                    {p.badge}
                  </span>
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-desc">{p.summary}</p>

                  <div className="project-card-tech">
                    {p.tech.map((t, idx) => (
                      <span key={idx} className="tech-tag">
                        {t}
                      </span>
                    ))}
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

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
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
            <div className="clean-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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

              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-light)", fontSize: "0.84rem", color: "var(--text-muted)" }}>
                Core practices: Git/GitHub PRs, debugging, form &amp; upload validation.
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
                  <a
                    href={`mailto:${profile.email}`}
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
                    <span>{profile.email}</span>
                    <span>&rarr;</span>
                  </a>

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
          <span style={{ fontSize: "0.72rem", color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: 4 }}>
            <span className="pulse-dot" style={{ width: 4, height: 4 }}></span>
            <span>Online</span>
          </span>
        </div>
      </div>

      {/* Gemini-Style Side Panel */}
      <AIAgentModal
        isOpen={isAIAgentOpen}
        initialPrompt={aiAgentPrompt}
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
