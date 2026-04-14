"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GitHubData {
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number;
    };
  };
  pullRequests: { totalCount: number };
  mergedPRs: { totalCount: number };
  repositoriesContributedTo: { totalCount: number };
}

export default function Hero() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setGithubData(json.data);
        }
      })
      .catch((err) => console.error("Error fetching github stats:", err));
  }, []);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };

  return (
    <section id="home" className="hero">
      <div className="hero-bg-shape hero-bg-shape-1" />
      <div className="hero-bg-shape hero-bg-shape-2" />

      <div className="container">
        <div className="hero-layout">
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="hero-badge">
              <span className="hero-badge-dot" />
              Backend дадлага + Full stack bootcamp
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title">
              Backend, frontend, full stack
              <br />
              <span className="gradient-text">хөгжүүлэлтэд бэлэн</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-subtitle">
              Telcocom дадлага, Pinecone Academy багийн төслүүд, PR review болон
              production workflow туршлагатай junior developer.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
              <a href="#projects" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                </svg>
                Төслүүдийг үзэх
              </a>
              <a href="#contact" className="btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                Холбоо барих
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {githubData ? githubData.repositoriesContributedTo.totalCount : "10+"}
                </span>
                <span className="hero-stat-label">Нийт төсөл</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {githubData ? githubData.contributionsCollection.contributionCalendar.totalContributions : "500+"}
                </span>
                <span className="hero-stat-label">Хувь нэмэр</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {githubData ? githubData.mergedPRs.totalCount : "30+"}
                </span>
                <span className="hero-stat-label">PR нэгтгэсэн</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-showcase"
            initial={{ opacity: 0, scale: 0.95, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 60 }}
          >
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
                        <div className="hero-visual-kicker">Одоогийн фокус</div>
                        <strong>Review-гээр батлагдсан код бичих</strong>
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
                    <span>Туршлага</span>
                    <strong>Telcocom дадлага</strong>
                  </div>
                  <div className="hero-proof-chip">
                    <span>Давуу тал</span>
                    <strong>Хурдан суралцагч</strong>
                  </div>
                  <div className="hero-proof-chip">
                    <span>Хэл</span>
                    <strong>IELTS 6.5</strong>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              className="hero-showcase-note"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <strong>💼 Ажилд авагчдад</strong>
              <p>
                React, Next.js, Node.js, Java/Spring Boot stack дээр хурдан
                дасан зохицож, review орчинд feature-ээ дуусгаж чадна.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
