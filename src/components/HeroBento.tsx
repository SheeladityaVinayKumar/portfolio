"use client";

import React from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playBlipSound } from "@/lib/aiAgentEngine";

interface HeroBentoProps {
  onOpenAIAgent: (initialPrompt?: string) => void;
  onShowToast: (msg: string) => void;
}

export function HeroBento({ onOpenAIAgent, onShowToast }: HeroBentoProps) {
  const { profile, metrics } = PORTFOLIO_DATA;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      playBlipSound(900, 0.1);
      onShowToast(`✓ Copied email to clipboard: ${profile.email}`);
    }).catch(() => {
      onShowToast(`Email: ${profile.email}`);
    });
  };

  return (
    <section className="hero-section" id="about">
      <div className="container">
        <div className="bento-grid">
          
          {/* Bento 1: Sheeladitya Main Profile Card (Col 1 to 8) */}
          <div className="bento-card hero-main-card">
            <div>
              <div className="card-header-row">
                <span className="card-pill-tag accent-emerald">
                  <span className="pulse-dot"></span> {profile.statusText}
                </span>
                <span className="card-pill-tag">{profile.educationBrief}</span>
              </div>

              <div className="hero-bio-top">
                <div className="hero-avatar-wrapper">
                  <Image
                    src="/assets/images/avatar.jpg"
                    alt={profile.name}
                    width={108}
                    height={108}
                    className="hero-avatar-img"
                    priority
                  />
                  <div className="avatar-status-badge">
                    <span className="pulse-dot" style={{ width: 5, height: 5 }}></span> Online
                  </div>
                </div>

                <div className="hero-bio-content">
                  <h1>{profile.name}</h1>
                  <div className="hero-subtitle">
                    <span>{profile.title}</span>
                    <span className="divider">&bull;</span>
                    <span style={{ color: "var(--accent-cyan)" }}>React &middot; Next.js &middot; Python &middot; Django</span>
                  </div>
                  <p className="hero-summary-text">
                    Software development trainee with practical experience resolving application bugs, engineering push-notification flows, image-upload validation, and optimizing user-facing workflows across mobile apps and web platforms. Passionate about building <strong>reliable, maintainable software that solves real user problems</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-action-row">
              <a href="#projects" className="btn-primary">
                <span>View Projects</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17l9.2-9.2M17 17V8H8" />
                </svg>
              </a>
              <button
                className="btn-secondary"
                onClick={() => onOpenAIAgent()}
                type="button"
              >
                <span>Talk to My AI</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button
                className="btn-copy-email"
                onClick={handleCopyEmail}
                title="Click to copy email address"
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

          {/* Bento 2: AI Agent Hub Card (Col 9 to 12) */}
          <div className="bento-card hero-ai-hub-card">
            <div className="ai-hub-header">
              <div className="ai-avatar-badge">
                <div className="ai-glow-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM4 11a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7z" />
                    <path d="M9 15h.01M15 15h.01" />
                  </svg>
                </div>
                <div className="ai-badge-text">
                  <h3>Sheela AI</h3>
                  <p>Replies on behalf of Sheeladitya</p>
                </div>
              </div>
              <span className="card-pill-tag accent-indigo">24/7 AI Twin</span>
            </div>

            <div className="ai-chat-preview-box">
              <div className="ai-preview-msg bot">
                Hi! 👋 I&apos;m Sheeladitya&apos;s AI representative. Ask me about his experience at <strong>ColoredCow</strong>, projects, or hireability!
              </div>

              <div className="ai-chips-preview">
                <button
                  className="ai-chip-btn"
                  onClick={() => onOpenAIAgent("Tell me about your experience at ColoredCow")}
                  type="button"
                >
                  <span>💼 Experience at ColoredCow</span>
                  <span style={{ fontSize: "0.8rem" }}>&rarr;</span>
                </button>
                <button
                  className="ai-chip-btn"
                  onClick={() => onOpenAIAgent("Tell me about SankalpTaru Foundation NGO, its e-commerce website, and mobile app")}
                  type="button"
                >
                  <span>🌱 SankalpTaru NGO Ecosystem</span>
                  <span style={{ fontSize: "0.8rem" }}>&rarr;</span>
                </button>
                <button
                  className="ai-chip-btn"
                  onClick={() => onOpenAIAgent("What are your core technical skills?")}
                  type="button"
                >
                  <span>⚡ Core Skills &amp; Tech Stack</span>
                  <span style={{ fontSize: "0.8rem" }}>&rarr;</span>
                </button>
              </div>
            </div>

            <button
              className="open-agent-modal-btn"
              onClick={() => onOpenAIAgent()}
              type="button"
            >
              <span>Start Interactive Conversation</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Metrics Bento Row */}
          {metrics.map((metric, i) => (
            <div key={i} className="bento-card metrics-bento-card">
              <div className={`metric-icon-box ${metric.accent}`}>
                {i === 0 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                )}
                {i === 1 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                )}
                {i === 2 && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                )}
              </div>
              <div>
                <div className="metric-value-title">{metric.value}</div>
                <div className="metric-desc">{metric.detail}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
