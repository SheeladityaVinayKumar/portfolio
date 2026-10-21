"use client";

import React from "react";
import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export function Footer() {
  const currentYear = 2026;
  const { profile } = PORTFOLIO_DATA;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div>
            &copy; {currentYear} {profile.name} &middot; Software Engineer
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ color: "var(--text-muted)" }}>Home</Link>
            <Link href="/projects" style={{ color: "var(--text-muted)" }}>Projects</Link>
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>GitHub</a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)" }}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
