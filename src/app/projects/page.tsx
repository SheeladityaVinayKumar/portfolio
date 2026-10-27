"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIAgentModal } from "@/components/AIAgentModal";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isAIAgentOpen, setIsAIAgentOpen] = useState(false);
  const [aiAgentPrompt, setAiAgentPrompt] = useState<string | undefined>(undefined);
  const [expandedSnippets, setExpandedSnippets] = useState<Record<string, boolean>>({});

  const { projects } = PORTFOLIO_DATA;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const toggleSnippet = (projectId: string) => {
    setExpandedSnippets((prev) => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const handleOpenAI = (prompt?: string) => {
    setAiAgentPrompt(prompt);
    setIsAIAgentOpen(true);
  };

  return (
    <>
      <Header onOpenAIAgent={() => handleOpenAI()} />

      <main className="container" style={{ paddingTop: 36, paddingBottom: 60 }}>
        {/* Header Block */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <Link href="/" style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>Home</Link>
            <span style={{ color: "var(--text-faint)" }}>/</span>
            <span style={{ color: "var(--text-primary)", fontWeight: 600, fontSize: "0.88rem" }}>Projects</span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 3.5vw, 2.85rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
            Projects &amp; Case Studies
          </h1>
          <p style={{ fontSize: "clamp(0.98rem, 1.2vw, 1.1rem)", color: "var(--text-secondary)", maxWidth: 950, lineHeight: 1.65 }}>
            In-depth engineering breakdown of software applications, mobile platforms, and AI systems built and maintained according to my resume.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-pills-row">
          <button
            className={`filter-pill ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
            type="button"
          >
            All Projects ({projects.length})
          </button>
          <button
            className={`filter-pill ${activeFilter === "mobile" ? "active" : ""}`}
            onClick={() => setActiveFilter("mobile")}
            type="button"
          >
            Mobile &amp; Push Apps ({projects.filter((p) => p.category === "mobile").length})
          </button>
          <button
            className={`filter-pill ${activeFilter === "web" ? "active" : ""}`}
            onClick={() => setActiveFilter("web")}
            type="button"
          >
            Web &amp; E-Commerce ({projects.filter((p) => p.category === "web").length})
          </button>
        </div>

        {/* Projects List (Detailed View) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {filteredProjects.map((p) => (
            <article
              key={p.id}
              id={p.id}
              className="clean-card"
              style={{ padding: "clamp(24px, 3.2vw, 40px)" }}
            >
              <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="badge-pill indigo">{p.badge}</span>
                        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>{p.categoryLabel}</span>
                      </div>
                      {p.metrics && (
                        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                          {p.metrics}
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: "clamp(1.35rem, 2vw, 1.65rem)", fontWeight: 700, marginBottom: 6 }}>{p.title}</h2>
                    <div style={{ fontSize: "0.9rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: 10 }}>
                      {p.subtitle}
                    </div>

                    {p.impactMetric && (
                      <div className="project-impact-strip">
                        <span className="impact-pill">🚀 Key Impact</span>
                        <span className="impact-text">{p.impactMetric}</span>
                      </div>
                    )}

                    <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: 18 }}>
                      {p.overview}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                      ))}
                    </div>

                    {/* Project Links & Code Access */}
                    <div className="project-links-row" style={{ marginBottom: 20 }}>
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
                          <span>GitHub Repository</span>
                        </a>
                      )}
                      {p.repoType === "internal" && (
                        <span className="badge-repo-status internal" title={p.accessNote || "Internal Production Work"}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          <span>{p.accessNote || "Internal Production"}</span>
                        </span>
                      )}
                      {p.repoType === "client" && (
                        <span className="badge-repo-status client" title={p.accessNote || "Live Production Website"}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                          <span>{p.accessNote || "Live Production"}</span>
                        </span>
                      )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 20 }}>
                      <div style={{ background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: 8, padding: 12 }}>
                        <strong style={{ color: "#991b1b", fontSize: "0.82rem", display: "block", marginBottom: 3 }}>
                          Problem Addressed:
                        </strong>
                        <span style={{ fontSize: "0.85rem", color: "#7f1d1d", lineHeight: 1.45 }}>
                          {p.problem}
                        </span>
                      </div>

                      <div style={{ background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: 8, padding: 12 }}>
                        <strong style={{ color: "#166534", fontSize: "0.82rem", display: "block", marginBottom: 3 }}>
                          Solution &amp; Engineering:
                        </strong>
                        <span style={{ fontSize: "0.85rem", color: "#14532d", lineHeight: 1.45 }}>
                          {p.solution}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>
                        Key Highlights:
                      </h4>
                      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                        {p.highlights.map((h, hIdx) => (
                          <li key={hIdx} style={{ fontSize: "0.86rem", color: "var(--text-secondary)", position: "relative", paddingLeft: 16 }}>
                            <span style={{ position: "absolute", left: 0, color: "var(--accent-primary)" }}>•</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {p.codeSnippet && (
                      <div style={{ marginTop: 18 }}>
                        <button
                          onClick={() => toggleSnippet(p.id)}
                          className="code-toggle-btn"
                          type="button"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                          <span>
                            {expandedSnippets[p.id]
                              ? "Hide Code Architecture"
                              : `View Code Architecture: ${p.codeSnippet.title}`}
                          </span>
                          <span style={{ fontSize: "0.72rem", marginLeft: 4 }}>
                            {expandedSnippets[p.id] ? "▲" : "▼"}
                          </span>
                        </button>

                        {expandedSnippets[p.id] && (
                          <div className="project-code-wrapper">
                            <div className="project-code-header">
                              <span>{p.codeSnippet.title}</span>
                              <span className="code-lang-tag">{p.codeSnippet.language}</span>
                            </div>
                            <pre className="project-code-pre">
                              <code>{p.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ paddingTop: 20, marginTop: 24, borderTop: "1px solid var(--border-light)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button
                      onClick={() => handleOpenAI(`Explain the technical architecture and challenges in: ${p.title}`)}
                      className="btn-secondary"
                      style={{ fontSize: "0.84rem", padding: "7px 14px" }}
                      type="button"
                    >
                      <span>Ask AI About This Project</span>
                      <span>&rarr;</span>
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PORTFOLIO_DATA.profile.email}&su=${encodeURIComponent(`Inquiry regarding ${p.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ fontSize: "0.82rem", padding: "6px 12px", textDecoration: "none" }}
                      title="Compose email inquiry in Gmail directly in browser"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span>Inquire via Email</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
        </div>
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
            <span style={{ fontSize: "0.72rem", color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: 4 }}>
              <span className="pulse-dot" style={{ width: 4, height: 4 }}></span>
              <span>Online</span>
            </span>
          </div>
        </div>
      )}

      {/* Gemini-Style Side Panel */}
      <AIAgentModal
        isOpen={isAIAgentOpen}
        initialPrompt={aiAgentPrompt}
        onPromptHandled={() => setAiAgentPrompt(undefined)}
        onClose={() => {
          setIsAIAgentOpen(false);
          setAiAgentPrompt(undefined);
        }}
      />
    </>
  );
}
