"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Github } from "./BrandIcons";
import type { Project } from "@/types/project";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectsProps {
  projects: Project[];
  loading: boolean;
}

const CATEGORIES_EN = ["All", "Web App", "E-commerce", "Dashboard", "Mobile", "API", "Other"];
const CATEGORIES_MN = ["Бүгд", "Web App", "E-commerce", "Dashboard", "Mobile", "API", "Other"];

export default function Projects({ projects, loading }: ProjectsProps) {
  const { lang, t } = useLanguage();
  const CATEGORIES = lang === "mn" ? CATEGORIES_MN : CATEGORIES_EN;
  const [filterIdx, setFilterIdx] = useState(0);

  const filterValue = CATEGORIES_MN[filterIdx]; // always filter by MN key stored in DB
  const filtered =
    filterIdx === 0
      ? projects
      : projects.filter((p) => p.category === CATEGORIES_MN[filterIdx]);

  return (
    <section id="projects" className="section section-soft relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-secondary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <span className="section-tag">{t.projects.tag}</span>
          <h2 className="section-title">{t.projects.title}</h2>
          <p className="section-desc mx-auto md:mx-0">{t.projects.desc}</p>

          <div className="projects-filters justify-center md:justify-start">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                className={`filter-btn ${filterIdx === idx ? "active" : ""}`}
                onClick={() => setFilterIdx(idx)}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="projects-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-[400px]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 glass-card"
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-text-secondary">{t.projects.empty}</p>
          </motion.div>
        ) : (
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="project-card group"
    >
      <Link href={`/projects/${project._id}`} className="project-card-media">
        {project.featured && (
          <span className="project-featured-badge">{t.projects.featured}</span>
        )}
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
            <span>{project.category}</span>
            <p className="text-xs">{t.projects.screenshot_waiting}</p>
          </div>
        )}
        <div className="absolute inset-0 bg-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <div className="bg-bg-primary p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ArrowUpRight className="w-6 h-6 text-accent-primary" />
             </div>
        </div>
      </Link>

      <div className="project-card-body">
        <div className="project-card-header">
          <div className="project-card-labels">
            <span className="project-category">{project.category}</span>
          </div>
          <Link href={`/projects/${project._id}`} className="project-title-link">
            <h3 className="project-title group-hover:text-accent-primary transition-colors">
              {project.title}
            </h3>
          </Link>
        </div>

        <p className="project-desc line-clamp-2">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="project-tech">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className="project-card-actions">
          <Link
            href={`/projects/${project._id}`}
            className="project-card-cta project-card-cta-primary flex-1 text-center"
          >
            {t.projects.view}
          </Link>
          <div className="flex gap-2">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
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
