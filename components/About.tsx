"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Target, Terminal, Mail } from "lucide-react";
import { Github } from "./BrandIcons";
import { useLanguage } from "@/context/LanguageContext";

const skills = [
  "JavaScript", "TypeScript", "Java", "React", "Next.js",
  "Node.js", "Spring Boot", "MongoDB", "PostgreSQL",
  "GraphQL", "Cypress", "Jest",
];

export default function About() {
  const { t } = useLanguage();

  const highlightIcons = [
    <Target className="w-5 h-5 text-accent-primary" />,
    <Terminal className="w-5 h-5 text-accent-primary" />,
    <User className="w-5 h-5 text-accent-primary" />,
  ];

  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <span className="section-tag">{t.about.tag}</span>
          <h2 className="section-title">
            {t.about.title} <span className="gradient-text">{t.about.title_name}</span>
          </h2>
          <p className="section-desc">{t.about.desc}</p>
        </motion.div>

        <div className="about-grid">
          {/* Avatar Area */}
          <motion.div
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-placeholder">
              <span className="text-8xl">👨‍💻</span>
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
            </div>
          </motion.div>

          {/* Info Area */}
          <div className="about-info">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">{t.about.role}</h3>
              <p className="about-text">{t.about.bio1}</p>
              <p className="about-text">{t.about.bio2}</p>
            </div>

            <div className="about-highlights">
              {t.about.highlights.map((item, idx) => (
                <motion.article
                  key={item.title}
                  className="about-highlight-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent-primary/10 rounded-lg">
                      {highlightIcons[idx]}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-text-secondary text-sm uppercase tracking-widest">
                {t.about.tech_title}
              </h4>
              <div className="skills-grid">
                {skills.map((s) => (
                  <motion.div
                    key={s}
                    className="skill-item"
                    whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                  >
                    <div className="skill-dot" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="https://github.com/hatakiii"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github className="w-4 h-4" /> GitHub →
              </a>
              <a href="mailto:hbbaatar@gmail.com" className="btn-outline">
                <Mail className="w-4 h-4" /> hbbaatar@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
