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
