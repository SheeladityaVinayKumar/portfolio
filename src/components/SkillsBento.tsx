"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function SkillsBento() {
  const { skillCategories } = PORTFOLIO_DATA;

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-header-block">
          <div className="section-label">Technical Arsenal</div>
          <h2 className="section-title">Skills &amp; Technologies</h2>
          <p className="section-desc">
            Practical expertise across web application architectures, backend APIs, content platforms, and engineering workflows.
          </p>
        </div>

        <div className="bento-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bento-card skill-category-card">
              <div className="category-title-row">
                <div className="category-icon">{cat.icon}</div>
                <div>
                  <h3 style={{ fontSize: "1.15rem" }}>{cat.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{cat.subtitle}</p>
                </div>
              </div>

              <div className="skills-tags-cluster">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`skill-badge ${skill.featured ? "featured" : ""}`}
                  >
                    <span className="skill-dot"></span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
