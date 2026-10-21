"use client";

import React, { useState, useEffect } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { playBlipSound } from "@/lib/aiAgentEngine";

interface ContactBentoProps {
  onShowToast: (msg: string) => void;
}

export function ContactBento({ onShowToast }: ContactBentoProps) {
  const { profile } = PORTFOLIO_DATA;
  const [istTime, setIstTime] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      setIstTime(`${new Intl.DateTimeFormat("en-US", options).format(now)} IST (India)`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      playBlipSound(900, 0.1);
      onShowToast(`✓ Copied email to clipboard: ${profile.email}`);
    }).catch(() => {
      onShowToast(`Email: ${profile.email}`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playBlipSound(700, 0.08);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      playBlipSound(950, 0.15);
      onShowToast("✓ Message dispatched! Sheeladitya will respond promptly.");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => setIsSuccess(false), 4000);
    }, 1000);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header-block">
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">Let&apos;s Build Something Great</h2>
          <p className="section-desc">
            Open for software engineering opportunities, internships, and collaborative development. Reach out directly or send a message below.
          </p>
        </div>

        <div className="bento-grid">
          {/* Contact Coordinates (Col 1 to 5) */}
          <div className="bento-card contact-info-card">
            <div>
              <div className="card-header-row">
                <span className="card-pill-tag accent-emerald">Direct Channels</span>
                <span className="pulse-dot"></span>
              </div>
              <h3 style={{ fontSize: "1.3rem", marginBottom: 8 }}>Direct Coordinates</h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                I respond promptly to email inquiries, recruitment outreach, and technical collaboration requests.
              </p>

              <div className="contact-links-list">
                <a href={`mailto:${profile.email}`} className="contact-link-row">
                  <div className="contact-link-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>{profile.email}</span>
                  </div>
                  <span className="contact-link-action">&rarr;</span>
                </a>

                <div
                  className="contact-link-row"
                  onClick={handleCopyEmail}
                  style={{ cursor: "pointer" }}
                >
                  <div className="contact-link-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    <span>Copy Email to Clipboard</span>
                  </div>
                  <span className="contact-link-action">Copy</span>
                </div>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-row"
                >
                  <div className="contact-link-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                    <span>GitHub Profile</span>
                  </div>
                  <span className="contact-link-action">&rarr;</span>
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-row"
                >
                  <div className="contact-link-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>LinkedIn Profile</span>
                  </div>
                  <span className="contact-link-action">&rarr;</span>
                </a>
              </div>
            </div>

            <div className="timezone-pill">
              <span className="pulse-dot"></span>
              <span>Local Time:</span>
              <strong style={{ color: "#fff" }}>{istTime || "Loading IST..."}</strong>
            </div>
          </div>

          {/* Contact Form (Col 6 to 12) */}
          <div className="bento-card contact-form-card">
            <div className="card-header-row">
              <span className="card-pill-tag accent-indigo">Send a Direct Message</span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Direct &middot; Fast Turnaround</span>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" suppressHydrationWarning>
              <div className="form-group">
                <label htmlFor="form-name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="form-name"
                  className="form-input"
                  placeholder="e.g. Hiring Manager / Team Lead"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  suppressHydrationWarning
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-email" className="form-label">Your Email</label>
                <input
                  type="email"
                  id="form-email"
                  className="form-input"
                  placeholder="name@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  suppressHydrationWarning
                />
              </div>

              <div className="form-group">
                <label htmlFor="form-message" className="form-label">Message / Opportunity Details</label>
                <textarea
                  id="form-message"
                  className="form-textarea"
                  placeholder="Hello Sheeladitya, we saw your work on SankalpTaru and the Talent Evaluator AI platform and would love to connect..."
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  suppressHydrationWarning
                />
              </div>

              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Dispatching Message...</span>
                ) : isSuccess ? (
                  <span>✓ Message Sent!</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
