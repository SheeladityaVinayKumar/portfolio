"use client";

import React, { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

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
  1. <strong class="term-line accent">Enterprise E-Commerce Website & Platform</strong>
     WordPress/WooCommerce plugin audits and mobile responsive checkout patches on live enterprise storefronts.
  2. <strong class="term-line accent">Companion Mobile App</strong>
     Mobile tracking app; resolved push notifications & runtime permissions for 50,000+ users.
  3. <strong class="term-line accent">Field Operations Mobile App</strong>
     Introduced pre-flight image-upload validation checks and fixed critical login authentication bugs.
`;
    } else if (cmd === "experience") {
      out = `
<span class="term-line system">── Professional Software Engineering Experience ──</span>
  <strong class="term-line success">ColoredCow</strong> | Software Development Engineer (SDE) Intern
  <span class="term-line">Period: Nov 2025 – Present</span>
  • Enterprise Web Platforms: Audited plugins & patched responsive checkout UI on live e-commerce storefronts.
  • Companion Mobile App: Resolved push notification drops & permission pop-ups for 50,000+ users.
  • Added pre-flight image upload validation & resolved auth login failure in field operations app.
  • Followed team-based Git/GitHub PR workflows incorporating senior reviewer feedback.
`;
    } else if (cmd === "education") {
      out = `
<span class="term-line system">── Education ──</span>
  <strong>Bachelor of Technology (B.Tech) — Computer Science and Engineering</strong>
  Institution: BTKIT | 2023–2027
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
    <div className="bento-card terminal-bento-card">
      <div className="terminal-topbar">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <div className="terminal-title">sheeladitya@portfolio:~ (bash)</div>
      </div>

      <div className="terminal-viewport" ref={scrollRef}>
        <div className="term-welcome-block">
          <span className="term-line system">Sheeladitya Vinay Kumar — SDE Portfolio v2.5</span>
          <span className="term-line dim">Type <strong style={{ color: "var(--accent-primary)" }}>help</strong> to list available commands or <strong style={{ color: "var(--accent-emerald)" }}>agent</strong> to talk with Stranger AI.</span>
        </div>

        {history.map((item) => (
          <div key={item.id} className="term-history-group">
            <div className="term-prompt-line">
              <span className="term-user">visitor@sheeladitya:~$</span>
              <span className="term-cmd">{item.command}</span>
            </div>
            <div
              className="term-output"
              dangerouslySetInnerHTML={{ __html: item.output }}
            ></div>
          </div>
        ))}

        <div className="term-prompt-line active">
          <span className="term-user">visitor@sheeladitya:~$</span>
          <input
            type="text"
            className="term-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or 'projects'..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
}
