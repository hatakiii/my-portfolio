"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface GitHubData {
  contributionsCollection: {
    contributionCalendar: { totalContributions: number };
  };
  pullRequests: { totalCount: number };
  mergedPRs: { totalCount: number };
  repositoriesContributedTo: { totalCount: number };
}

export default function Hero() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/github")
      .then((res) => res.json())
      .then((json) => { if (json.success) setGithubData(json.data); })
      .catch((err) => console.error("Error fetching github stats:", err));
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: 0.2,
      } 
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    },
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-layout">
          <motion.div
            className="hero-content"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item} className="hero-badge">
              <span className="hero-badge-dot" />
              {t.hero.badge}
            </motion.div>

            <motion.h1 variants={item} className="hero-title">
              {t.hero.title1}
              <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </motion.h1>

            <motion.p variants={item} className="hero-subtitle">
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={item} className="hero-actions">
              <a href="#projects" className="btn-primary">
                {t.hero.cta_projects}
              </a>
              <a href="#contact" className="btn-outline">
                {t.hero.cta_contact}
              </a>
            </motion.div>

            <motion.div variants={item} className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {githubData
                    ? githubData.repositoriesContributedTo.totalCount
                    : "10+"}
                </span>
                <span className="hero-stat-label">{t.hero.stat_projects}</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {githubData
                    ? githubData.contributionsCollection.contributionCalendar
                        .totalContributions
                    : "500+"}
                </span>
                <span className="hero-stat-label">
                  {t.hero.stat_contributions}
                </span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">
                  {githubData ? githubData.mergedPRs.totalCount : "30+"}
                </span>
                <span className="hero-stat-label">{t.hero.stat_prs}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
