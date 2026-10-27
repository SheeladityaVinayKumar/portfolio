"use client";

import React, { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playBlipSound } from "@/lib/aiAgentEngine";

interface TerminalBentoProps {
  onOpenAIAgent: () => void;
}

interface TermOutputItem {
  id: string;
  command: string;
  output: string;
}

export function TerminalBento({ onOpenAIAgent }: TerminalBentoProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TermOutputItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const executeCmd = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playBlipSound(550, 0.05);

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    let out = "";
    if (cmd === "help") {
      out = `
<span class="term-line system">Available Commands:</span>
  • <span class="term-line success">skills</span>      - Display technical skills & tools
  • <span class="term-line success">projects</span>    - List core production projects from resume
  • <span class="term-line success">experience</span>  - ColoredCow software development experience
  • <span class="term-line success">education</span>   - Academic background at BTKIT
  • <span class="term-line success">agent</span>       - Launch Sheeladitya's AI Agent
  • <span class="term-line success">contact</span>     - Show direct communication channels
  • <span class="term-line success">clear</span>       - Clear terminal window
`;
    } else if (cmd === "skills") {
      out = `
<span class="term-line system">── Technical Skillset ──</span>
  [Web & UI]   : React, Next.js, Modern JavaScript (ES6+), HTML5, CSS3 / Modern UI
  [Backend]    : Python, Django, PHP, RESTful APIs, Auth & Session Handling
  [CMS & Web]  : WordPress, Plugin Architecture, UI Troubleshooting
  [Workflow]   : Git, GitHub, Pull Requests, Code Review, Form & Upload Validation
`;
    } else if (cmd === "projects") {
      out = `
<span class="term-line system">── Production Projects ──</span>
  1. <strong class="term-line accent">SankalpTaru Foundation — E-Commerce Website & Platform</strong>
     WordPress/WooCommerce plugin audits and mobile responsive checkout patches on live sankalptaru.org.
  2. <strong class="term-line accent">SankalpTaru HUGE — NGO Companion Mobile App</strong>
     Companion app to sankalptaru.org; resolved push notifications & runtime permissions for 50,000+ donors.
  3. <strong class="term-line accent">G1 Ground Team App</strong>
     Introduced pre-flight image-upload validation checks and fixed critical login authentication bugs.
`;
    } else if (cmd === "experience") {
      out = `
<span class="term-line system">── Professional Software Engineering Experience ──</span>
  <strong class="term-line success">ColoredCow</strong> | Software Development Engineer (SDE) Intern
  <span class="term-line">Period: Nov 2025 – Oct 2026</span>
  • SankalpTaru Foundation (NGO): Audited plugins & patched responsive checkout UI on live sankalptaru.org.
  • SankalpTaru Foundation (NGO): Resolved push notification drops & permission pop-ups in HUGE mobile app.
  • Added pre-flight image upload validation & resolved auth login failure in G1 Ground Team app.
  • Followed team-based Git/GitHub PR workflows incorporating senior reviewer feedback.
`;
    } else if (cmd === "education") {
      out = `
<span class="term-line system">── Education ──</span>
  <strong>Bachelor of Technology (B.Tech) — Computer Science and Engineering</strong>
  Institution: BTKIT | 2023–2027 (Expected)
  Focus: Software Engineering, Data Structures, Algorithms & Web Systems.
`;
    } else if (cmd === "contact") {
      out = `
<span class="term-line system">── Contact Coordinates ──</span>
  Email    : ${PORTFOLIO_DATA.profile.email}
  Status   : Ready for Software Engineer & Full-Stack Opportunities
`;
    } else if (cmd === "agent") {
      onOpenAIAgent();
      out = `<span class="term-line success">✓ Launching Sheeladitya's AI Agent Representative modal...</span>`;
    } else {
      out = `<span class="term-line" style="color: #f87171;">Command not found: '${cmd}'. Type 'help' for a list of commands.</span>`;
    }

    setHistory((prev) => [
      ...prev,
      { id: Math.random().toString(), command: rawCmd, output: out }
    ]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCmd(inputVal);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <section className="section-terminal" id="terminal" style={{ padding: "20px 0 50px" }}>
      <div className="container">
        <div className="bento-grid">
          
          {/* Terminal Bento Card (Col 1 to 7) */}
          <div className="bento-card terminal-card">
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <div className="terminal-title">sheeladitya@portfolio: ~/resume (zsh)</div>
              <div style={{ fontSize: "0.72rem", color: "var(--text-faint)" }}>Interactive CLI</div>
            </div>

            <div className="terminal-body" ref={scrollRef}>
              <div className="term-line system">Antigravity Next.js Shell v2.4 (Sheeladitya Vinay Kumar Terminal)</div>
              <div className="term-line">
                Type <span className="term-line success">&apos;help&apos;</span> to see available commands or click the shortcut pills below.
              </div>
              <div className="term-line accent">&rarr; Initialized session with full resume context.</div>

              {history.map((item) => (
                <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div className="term-line">
                    <span className="term-prompt-symbol">sheeladitya@portfolio:~$</span> {item.command}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: item.output }} />
                </div>
              ))}

              <div className="term-prompt-line">
                <span className="term-prompt-symbol">sheeladitya@portfolio:~$</span>
                <input
                  type="text"
                  className="term-input"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type 'skills', 'projects', or 'experience'..."
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
            </div>

            <div className="term-shortcuts-bar">
              <button className="term-quick-btn" onClick={() => executeCmd("skills")} type="button">skills</button>
              <button className="term-quick-btn" onClick={() => executeCmd("projects")} type="button">projects</button>
              <button className="term-quick-btn" onClick={() => executeCmd("experience")} type="button">experience</button>
              <button className="term-quick-btn" onClick={() => executeCmd("education")} type="button">education</button>
              <button className="term-quick-btn" onClick={() => executeCmd("agent")} type="button">agent</button>
              <button className="term-quick-btn" onClick={() => executeCmd("contact")} type="button">contact</button>
              <button className="term-quick-btn" onClick={() => executeCmd("clear")} type="button">clear</button>
            </div>
          </div>

          {/* Engineering Philosophy / Focus (Col 8 to 12) */}
          <div className="bento-card engineering-focus-card">
            <div>
              <div className="card-header-row">
                <span className="card-pill-tag accent-cyan">Development Practices</span>
                <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>From Resume</span>
              </div>
              <h3 style={{ fontSize: "1.25rem", marginBottom: 12 }}>Engineering Standards &amp; Practices</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Focused on delivering reliable, bug-free, and maintainable software through industry-standard practices:
              </p>
            </div>

            <div className="focus-item-list">
              {PORTFOLIO_DATA.developmentPractices.map((practice, idx) => (
                <div key={idx} className="focus-item">
                  <div className="focus-bullet">&check;</div>
                  <div className="focus-text">
                    <h4>{practice.title}</h4>
                    <p>{practice.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: 14, borderTop: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Current Status:</span>
              <span className="card-pill-tag accent-emerald">Ready for Engineering Challenges</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
