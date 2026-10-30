"use client";

import React from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ThemeToggle } from "@/components/ThemeToggle";

interface HeaderProps {
  onOpenAIAgent: () => void;
}

export function Header({ onOpenAIAgent }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-inner" aria-label="Main Navigation">
          <div className="nav-brand">
            <span className="brand-dot"></span>
            <span className="brand-title">Sheeladitya&apos;s Portfolio</span>
          </div>

          <div className="nav-actions">
            <ThemeToggle />
            <a
              href={PORTFOLIO_DATA.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume-btn"
              title="View & Download Resume PDF"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              <span className="nav-btn-text">Resume</span>
            </a>
            <button
              onClick={onOpenAIAgent}
              className="nav-agent-btn"
              title="Chat with Stranger — Sheeladitya's AI"
              type="button"
            >
              <span className="pulse-dot"></span>
              <span className="nav-btn-text">Stranger AI</span>
            </button>
            <a href="#contact" className="nav-contact-btn">
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
