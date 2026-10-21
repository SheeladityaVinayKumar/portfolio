"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface ExperienceBentoProps {
  onShowToast: (msg: string) => void;
}

export function ExperienceBento({ onShowToast }: ExperienceBentoProps) {
  const { experience, education } = PORTFOLIO_DATA;

  return (
    <section className="experience-section" id="experience">
      <div className="container">
        <div className="section-header-block">
          <div className="section-label">Career Journey</div>
          <h2 className="section-title">Experience &amp; Education</h2>
          <p className="section-desc">
            Industry trainee experience resolving real-world production challenges alongside academic foundations.
          </p>
        </div>

        <div className="bento-grid">
          {/* Experience Card (Col 1 to 7) */}
          <div className="bento-card exp-main-card">
            <div className="card-header-row">
              <span className="card-pill-tag accent-indigo">Industry Experience</span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>From Resume</span>
            </div>

            <div className="timeline-container">
              {experience.map((exp, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-node">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header-row">
                      <div>
                        <div className="timeline-role">{exp.role}</div>
                        <div className="timeline-company">{exp.company}</div>
                      </div>
                      <div className="timeline-date">{exp.period}</div>
                    </div>

                    <ul className="timeline-bullets">
                      {exp.points.map((pt, pIdx) => (
                        <li key={pIdx}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Practices Card (Col 8 to 12) */}
          <div className="bento-card edu-card">
            <div>
              <div className="card-header-row">
                <span className="card-pill-tag accent-cyan">Academics</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Formal Degree</span>
              </div>

              <div className="edu-degree-box">
                <div className="edu-degree-title">{education.degree}</div>
                <div className="edu-inst">{education.major}</div>
                <div className="edu-meta">{education.institution} | {education.period}</div>
                <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.5 }}>
                  {education.description}
                </p>
              </div>

              <div className="practices-box">
                <h4>Core Working Philosophy</h4>
                <p>
                  &ldquo;Interested in building reliable, maintainable software that solves real user problems through disciplined code reviews, continuous testing, and empathetic UI design.&rdquo;
                </p>
              </div>
            </div>

            <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Verified Credentials</span>
              <button
                className="btn-copy-email"
                onClick={() => onShowToast("Official transcript request logged")}
                style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                type="button"
              >
                Request Transcript
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
