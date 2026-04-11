"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setTimeout(() => el.classList.add("visible"), 100);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-shape hero-bg-shape-1" />
      <div className="hero-bg-shape hero-bg-shape-2" />

      <div className="container">
        <div className="hero-layout fade-in" ref={ref}>
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Backend дадлага + Full stack bootcamp
            </div>

            <h1 className="hero-title">
              Backend, frontend, full stack
              <span className="gradient-text"> хөгжүүлэлтэд бэлэн</span>
            </h1>

            <p className="hero-subtitle">
              Telcocom дадлага, Pinecone Academy багийн төслүүд, PR review болон
              production workflow туршлагатай junior developer.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="btn-primary">
                Төслүүдийг үзэх
              </a>
              <a href="#contact" className="btn-outline">
                Холбоо барих
              </a>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">4+</span>
                <span className="hero-stat-label">Багийн төсөл</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">31</span>
                <span className="hero-stat-label">PR хаасан</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">30</span>
                <span className="hero-stat-label">PR review</span>
              </div>
            </div>
          </div>

          <div className="hero-showcase">
            <div className="hero-showcase-card hero-showcase-main">
              <div className="hero-visual">
                <div className="hero-visual-window">
                  <div className="hero-visual-topbar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="hero-visual-screen">
                    <div className="hero-visual-sidebar">
                      <div className="hero-visual-dot hero-visual-dot-active" />
                      <div className="hero-visual-dot" />
                      <div className="hero-visual-dot" />
                    </div>
                    <div className="hero-visual-main">
                      <div className="hero-visual-panel hero-visual-panel-primary">
                        <div className="hero-visual-kicker">Current focus</div>
                        <strong>Shipping features that pass review</strong>
                        <div className="hero-visual-bars">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                      <div className="hero-visual-grid">
                        <div className="hero-visual-card">
                          <span className="hero-visual-card-label">Backend</span>
                          <strong>Spring Boot</strong>
                        </div>
                        <div className="hero-visual-card">
                          <span className="hero-visual-card-label">Frontend</span>
                          <strong>Next.js</strong>
                        </div>
                        <div className="hero-visual-card">
                          <span className="hero-visual-card-label">Workflow</span>
                          <strong>PR Review</strong>
                        </div>
                        <div className="hero-visual-card">
                          <span className="hero-visual-card-label">Testing</span>
                          <strong>Cypress / Jest</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hero-proof-strip">
                  <div className="hero-proof-chip">
                    <span>Experience</span>
                    <strong>Telcocom internship</strong>
                  </div>
                  <div className="hero-proof-chip">
                    <span>Strength</span>
                    <strong>Fast learner</strong>
                  </div>
                  <div className="hero-proof-chip">
                    <span>Language</span>
                    <strong>IELTS 6.5</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-showcase-note">
              <strong>Recruiter snapshot</strong>
              <p>
                React, Next.js, Node.js, Java/Spring Boot stack дээр хурдан
                дасан зохицож, review орчинд feature-ээ дуусгаж чадна.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
