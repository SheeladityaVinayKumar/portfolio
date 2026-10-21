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

  const { projects } = PORTFOLIO_DATA;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

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

          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
            Projects &amp; Case Studies
          </h1>
          <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", maxWidth: 700, lineHeight: 1.6 }}>
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
            className={`filter-pill ${activeFilter === "ai" ? "active" : ""}`}
            onClick={() => setActiveFilter("ai")}
            type="button"
          >
            AI &amp; Mentorship
          </button>
          <button
            className={`filter-pill ${activeFilter === "mobile" ? "active" : ""}`}
            onClick={() => setActiveFilter("mobile")}
            type="button"
          >
            Mobile &amp; Push Apps
          </button>
          <button
            className={`filter-pill ${activeFilter === "web" ? "active" : ""}`}
            onClick={() => setActiveFilter("web")}
            type="button"
          >
            Web &amp; CMS
          </button>
        </div>

        {/* Projects List (Detailed View) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {filteredProjects.map((p, index) => (
            <article
              key={p.id}
              id={p.id}
              className="clean-card"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr" }}>
                {/* Image */}
                <div style={{ position: "relative", minHeight: 320, background: "#f8fafc" }}>
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 860px) 100vw, 50vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Content */}
                <div style={{ padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span className="badge-pill indigo">{p.badge}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{p.categoryLabel}</span>
                    </div>

                    <h2 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: 8 }}>{p.title}</h2>
                    <p style={{ fontSize: "0.92rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 18 }}>
                      {p.overview}
                    </p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="tech-tag">{t}</span>
                      ))}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
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
                  </div>

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
                      href={`mailto:${PORTFOLIO_DATA.profile.email}?subject=Inquiry regarding ${encodeURIComponent(p.title)}`}
                      style={{ fontSize: "0.84rem", color: "var(--text-muted)", fontWeight: 500 }}
                    >
                      Inquire via Email
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
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
    </>
  );
}
