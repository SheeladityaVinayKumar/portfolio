"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface HeaderProps {
  onOpenAIAgent: () => void;
}

export function Header({ onOpenAIAgent }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-inner" aria-label="Main Navigation">
          <Link href="/" className="brand-badge">
            <div className="brand-monogram">S.</div>
            <span>{PORTFOLIO_DATA.profile.shortName}</span>
          </Link>

          <ul className="nav-links">
            <li>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                className={`nav-link ${pathname === "/projects" ? "active" : ""}`}
              >
                Projects
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
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
              <span>Resume</span>
            </a>
            <button
              onClick={onOpenAIAgent}
              className="nav-agent-btn"
              title="Chat with Stranger AI"
              type="button"
            >
              <span className="pulse-dot"></span>
              <span>Stranger AI</span>
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
