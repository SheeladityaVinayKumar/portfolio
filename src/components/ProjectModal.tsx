"use client";

import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/data/portfolioData";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenAIAgent: (prompt: string) => void;
}

export function ProjectModal({ project, onClose, onOpenAIAgent }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="project-modal-window">
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          &times;
        </button>

        <div style={{ position: "relative", width: "100%", height: 340 }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="modal-hero-image"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="modal-body-padding">
          <div className="card-pill-tag accent-indigo" style={{ marginBottom: 12 }}>
            {project.categoryLabel}
          </div>
          <h2 style={{ fontSize: "1.8rem", marginBottom: 6 }}>{project.title}</h2>
          <p style={{ color: "var(--accent-cyan)", fontWeight: 600, fontSize: "0.95rem", marginBottom: 20 }}>
            {project.subtitle}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {project.tech.map((t, idx) => (
              <span key={idx} className="tech-pill">
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 28 }}>
            <div>
              <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: 6 }}>Project Overview</h4>
              <p style={{ lineHeight: 1.65, color: "var(--text-secondary)" }}>{project.overview}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div
                style={{
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: 12,
                  padding: 14
                }}
              >
                <h5 style={{ color: "#f87171", marginBottom: 6, fontSize: "0.9rem" }}>⚠️ Problem Addressed</h5>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.5, color: "#cbd5e1" }}>{project.problem}</p>
              </div>

              <div
                style={{
                  background: "rgba(16, 185, 129, 0.08)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: 12,
                  padding: 14
                }}
              >
                <h5 style={{ color: "#34d399", marginBottom: 6, fontSize: "0.9rem" }}>✨ Solution Implemented</h5>
                <p style={{ fontSize: "0.83rem", lineHeight: 1.5, color: "#cbd5e1" }}>{project.solution}</p>
              </div>
            </div>

            <div>
              <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: 8 }}>Key Engineering Highlights</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {project.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--text-secondary)",
                      paddingLeft: 18,
                      position: "relative"
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: "var(--accent-emerald)" }}>▹</span> {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingTop: 20,
              borderTop: "1px solid var(--border-subtle)"
            }}
          >
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                onOpenAIAgent(`Tell me more about the project architecture: ${project.title}`);
              }}
              type="button"
            >
              Ask AI Agent About This Project
            </button>
            <button
              className="btn-secondary"
              onClick={onClose}
              type="button"
            >
              Close Deep Dive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
