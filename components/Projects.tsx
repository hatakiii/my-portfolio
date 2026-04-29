"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight, Users, Clock } from "lucide-react";
import { Github } from "./BrandIcons";
import type { Project } from "@/types/project";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectsProps {
  projects: Project[];
  loading: boolean;
}

const CATEGORIES_EN = ["All", "Web App", "UI/UX Design", "E-commerce", "Dashboard", "Mobile", "API", "Other"];
const CATEGORIES_MN = ["Бүгд", "Web App", "UI/UX Design", "E-commerce", "Dashboard", "Mobile", "API", "Other"];

export default function Projects({ projects, loading }: ProjectsProps) {
  const { lang, t } = useLanguage();
  const CATEGORIES = lang === "mn" ? CATEGORIES_MN : CATEGORIES_EN;
  const [filterIdx, setFilterIdx] = useState(0);

  const filtered =
    filterIdx === 0
      ? projects
      : projects.filter((p) => p.category === CATEGORIES_MN[filterIdx]);

  return (
    <section id="projects" className="section section-soft relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-secondary/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-primary/4 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="projects-header"
        >
          <div className="projects-header-left">
            <span className="section-tag">{t.projects.tag}</span>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-desc">{t.projects.desc}</p>
          </div>

          {/* Project count badge */}
          {!loading && filtered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="projects-count-badge"
            >
              <span className="projects-count-number">{filtered.length}</span>
              <span className="projects-count-label">
                {lang === "mn" ? "Нийт төсөл" : "Projects"}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="projects-filters"
        >
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat}
              className={`filter-btn ${filterIdx === idx ? "active" : ""}`}
              onClick={() => setFilterIdx(idx)}
            >
              {cat}
              {idx === 0 && !loading && (
                <span className="filter-btn-count">{projects.length}</span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="projects-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="project-card-skeleton">
                <div className="skeleton project-skeleton-media" />
                <div className="project-skeleton-body">
                  <div className="skeleton" style={{ height: 14, width: "40%", borderRadius: 4 }} />
                  <div className="skeleton" style={{ height: 20, width: "75%", borderRadius: 4, marginTop: 10 }} />
                  <div className="skeleton" style={{ height: 14, width: "90%", borderRadius: 4, marginTop: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "60%", borderRadius: 4, marginTop: 4 }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="projects-empty"
          >
            <div className="projects-empty-icon">🔍</div>
            <p>{t.projects.empty}</p>
          </motion.div>
        ) : (
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t, lang } = useLanguage();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`project-card group ${project.featured ? "project-card--featured" : ""}`}
    >
      {/* Image / Media */}
      <Link href={`/projects/${project._id}`} className="project-card-media">
        {/* Featured badge */}
        {project.featured && (
          <span className="project-featured-badge">
            <span className="project-featured-dot" />
            {t.projects.featured}
          </span>
        )}

        {/* Card index number */}
        <span className="project-index-num">
          {String(index + 1).padStart(2, "0")}
        </span>

        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="project-image"
          />
        ) : (
          <div className="project-image-placeholder">
            <div className="project-placeholder-icon">
              {getCategoryIcon(project.category)}
            </div>
            <span className="project-placeholder-cat">{project.category}</span>
            <p className="project-placeholder-note">{t.projects.screenshot_waiting}</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="project-hover-overlay">
          <div className="project-hover-cta">
            <ArrowUpRight className="w-5 h-5" />
            <span>{lang === "mn" ? "Дэлгэрэнгүй" : "View details"}</span>
          </div>
        </div>
      </Link>

      {/* Card body */}
      <div className="project-card-body">
        {/* Meta row */}
        <div className="project-meta-row">
          <span className="project-category-pill">{project.category}</span>
          <div className="project-meta-chips">
            {project.teamSize > 0 && (
              <span className="project-meta-chip">
                <Users className="w-3 h-3" />
                {project.teamSize}
              </span>
            )}
            {project.duration && (
              <span className="project-meta-chip">
                <Clock className="w-3 h-3" />
                {project.duration}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <Link href={`/projects/${project._id}`} className="project-title-link">
          <h3 className="project-title">
            {project.title}
            <span className="project-title-arrow">→</span>
          </h3>
        </Link>

        {/* Description */}
        <p className="project-desc line-clamp-2">{project.description}</p>

        {/* My role if available */}
        {project.myRole && (
          <div className="project-role-badge">
            <span>{project.myRole}</span>
          </div>
        )}

        {/* Tech stack */}
        {project.techStack?.length > 0 && (
          <div className="project-tech">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
            {project.techStack.length > 4 && (
              <span className="tech-tag tech-tag-more">+{project.techStack.length - 4}</span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="project-card-divider" />

        {/* Actions */}
        <div className="project-card-actions">
          <Link
            href={`/projects/${project._id}`}
            className="project-card-cta project-card-cta-primary"
          >
            {t.projects.view}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <div className="project-card-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function getCategoryIcon(cat: string) {
  const icons: Record<string, string> = {
    "Web App": "🌐",
    "UI/UX Design": "🎨",
    "E-commerce": "🛒",
    "Dashboard": "📊",
    "Mobile": "📱",
    "API": "⚡",
    "Other": "🚀",
  };
  return icons[cat] ?? "💻";
}
