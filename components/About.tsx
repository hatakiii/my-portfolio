"use client";

import { motion } from "framer-motion";
import { User, Target, Terminal, Mail } from "lucide-react";
import { Github } from "./BrandIcons";
import { useLanguage } from "@/context/LanguageContext";
import type { LucideIcon } from "lucide-react";

const skills = [
  "JavaScript", "TypeScript", "Java", "React", "Next.js",
  "Node.js", "Spring Boot", "MongoDB", "PostgreSQL",
  "GraphQL", "Cypress", "Jest",
];

export default function About() {
  const { t } = useLanguage();
  const highlightIcons: LucideIcon[] = [Target, Terminal, User];

  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-tag">{t.about.tag}</span>
          <h2 className="section-title">
            {t.about.title}{" "}
            <span className="gradient-text">{t.about.title_name}</span>
          </h2>
          <p className="section-desc">{t.about.desc}</p>
        </motion.div>

        <div className="about-grid" style={{ marginTop: 48 }}>
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-image-placeholder">
              <span>👨‍💻</span>
            </div>
          </motion.div>

          {/* Info */}
          <div className="about-info">
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: 12 }}>
                {t.about.role}
              </h3>
              <p className="about-text" style={{ marginBottom: 10 }}>{t.about.bio1}</p>
              <p className="about-text">{t.about.bio2}</p>
            </div>

            <div className="about-highlights">
              {t.about.highlights.map((item, idx) => {
                const Icon = highlightIcons[idx];
                return (
                  <motion.article
                    key={item.title}
                    className="about-highlight-card"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      {Icon && (
                        <div style={{
                          width: 32, height: 32,
                          display: "grid", placeItems: "center",
                          background: "var(--accent-bg)",
                          borderRadius: "var(--radius)",
                          color: "var(--accent)",
                          flexShrink: 0,
                        }}>
                          <Icon size={16} />
                        </div>
                      )}
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div>
              <p style={{
                fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.16em",
                textTransform: "uppercase", color: "var(--text-3)", marginBottom: 12
              }}>
                {t.about.tech_title}
              </p>
              <div className="skills-grid">
                {skills.map((s) => (
                  <div key={s} className="skill-item">
                    <div className="skill-dot" />
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href="https://github.com/hatakiii"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github size={16} /> GitHub
              </a>
              <a href="mailto:hbbaatar@gmail.com" className="btn-outline">
                <Mail size={16} /> hbbaatar@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
