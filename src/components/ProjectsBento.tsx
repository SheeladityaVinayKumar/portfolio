"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";

interface ProjectsBentoProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenAIAgent: (prompt?: string) => void;
}

export function ProjectsBento({ onSelectProject, onOpenAIAgent }: ProjectsBentoProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const { projects } = PORTFOLIO_DATA;

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header-block">
          <div className="section-label">Production &amp; Concept Portfolio</div>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-desc">
            Directly carrying projects from my resume, showcasing hands-on application troubleshooting, validation engineering, and AI mentorship solutions.
          </p>
        </div>

        {/* Filter Row */}
        <div className="project-filter-row">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
            type="button"
          >
            All Projects ({projects.length})
          </button>
          <button
            className={`filter-btn ${activeFilter === "ai" ? "active" : ""}`}
            onClick={() => setActiveFilter("ai")}
            type="button"
          >
            AI &amp; Mentorship
          </button>
          <button
            className={`filter-btn ${activeFilter === "mobile" ? "active" : ""}`}
            onClick={() => setActiveFilter("mobile")}
            type="button"
          >
            Mobile &amp; Push Apps
          </button>
          <button
            className={`filter-btn ${activeFilter === "web" ? "active" : ""}`}
            onClick={() => setActiveFilter("web")}
            type="button"
          >
            Web &amp; CMS
          </button>
        </div>

        <div className="bento-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bento-card project-card-large"
              data-category={project.category}
            >
              <div className="project-thumb-box">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="project-thumb-img"
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="project-overlay-badge">
                  <span
                    className="pulse-dot"
                    style={{
                      background:
                        project.badgeAccent === "emerald"
                          ? "var(--accent-emerald)"
                          : project.badgeAccent === "indigo"
                          ? "var(--accent-primary)"
                          : project.badgeAccent === "cyan"
                          ? "var(--accent-cyan)"
                          : "var(--accent-amber)"
                    }}
                  ></span>
                  <span>{project.categoryLabel}</span>
                </div>
              </div>

              <div className="project-details-body">
                <div className="project-meta-row">
                  <span className={`card-pill-tag accent-${project.badgeAccent}`}>
                    {project.badge}
                  </span>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)"
                    }}
                  >
                    {project.tech.slice(0, 3).join(" · ")}
                  </span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.summary}</p>

                <div className="project-tech-pills">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links-row">
                  <button
                    className="btn-card-action primary"
                    onClick={() => onSelectProject(project)}
                    type="button"
                  >
                    <span>Architecture &amp; Details</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <button
                    className="btn-card-action ghost"
                    onClick={() =>
                      onOpenAIAgent(`Tell me more about the project: ${project.title}`)
                    }
                    type="button"
                  >
                    <span>Ask AI Agent</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
