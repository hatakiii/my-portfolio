"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Project } from "@/types/project";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const popIn: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 16,
    } as const,
  },
};

export default function ProjectDetailView({ project }: { project: Project }) {
  const galleryImages = (project.otherImages || []).filter(Boolean);
  const isDesignCase = project.category === "UI/UX Design";

  return (
    <motion.main
      className="project-detail-page"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="container project-detail-shell">
        <motion.div variants={popIn}>
          <Link href="/#projects" className="btn-outline project-back-link">
            Жагсаалт руу буцах
          </Link>
        </motion.div>

        <motion.section variants={popIn} className="project-detail-hero">
          <div className="project-detail-copy">
            <p className="project-detail-eyebrow">
              {isDesignCase ? "Design case study" : "Project overview"}
            </p>
            <p className="project-category">{project.category}</p>
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-description">
              {project.longDescription || project.description}
            </p>

            <div className="project-detail-actions">
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                {isDesignCase ? "Prototype үзэх" : "Төслийг үзэх"}
              </a>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline">
                  GitHub
                </a>
              )}
            </div>

            <div className="project-detail-quick-info">
              <div className="project-quick-item">
                <span className="project-meta-label">Формат</span>
                <strong>{isDesignCase ? "UX case study" : "Portfolio case study"}</strong>
              </div>
              <div className="project-quick-item">
                <span className="project-meta-label">Танилцах төрөл</span>
                <strong>{isDesignCase ? "Flow + screens + prototype" : "Дэлгэрэнгүй + live холбоос"}</strong>
              </div>
            </div>
          </div>

          <div className="project-detail-visual">
            {project.imageUrl ? (
              <div className="project-detail-image-wrap">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="project-detail-image"
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="project-detail-placeholder">Screenshot байхгүй</div>
            )}
          </div>
        </motion.section>

        <motion.section variants={popIn} className="project-meta-grid">
          <article className="project-meta-card">
            <span className="project-meta-label">Хугацаа</span>
            <strong>{project.duration || "Оруулаагүй"}</strong>
          </article>
          <article className="project-meta-card">
            <span className="project-meta-label">{isDesignCase ? "Stakeholders" : "Нийт баг"}</span>
            <strong>{project.teamSize || 1} хүн</strong>
          </article>
          <article className="project-meta-card">
            <span className="project-meta-label">{isDesignCase ? "Design / dev" : "Хөгжүүлэгчид"}</span>
            <strong>{project.developerCount || 1}</strong>
          </article>
          <article className="project-meta-card">
            <span className="project-meta-label">{isDesignCase ? "Iterations" : "GitHub contribution"}</span>
            <strong>{project.githubContributions || 0}</strong>
          </article>
        </motion.section>

        <div className="project-detail-sections">
          <motion.article variants={popIn} className="project-detail-card">
            <h2>Төслийн тухай</h2>
            <p>{project.description}</p>
          </motion.article>

          <motion.article variants={popIn} className="project-detail-card">
            <h2>{isDesignCase ? "Миний дизайн роль" : "Миний роль"}</h2>
            <p>{project.myRole || "Оруулаагүй"}</p>
          </motion.article>

          <motion.article variants={popIn} className="project-detail-card">
            <h2>{isDesignCase ? "Ашигласан хэрэгслүүд" : "Ашигласан технологи"}</h2>
            <div className="project-tech">
              {(project.techStack || []).map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.article variants={popIn} className="project-detail-card">
            <h2>{isDesignCase ? "Design contribution" : "Миний contribution"}</h2>
            <p>{project.contributionsSummary || "Contribution тайлбар оруулаагүй."}</p>
          </motion.article>

          <motion.article variants={popIn} className="project-detail-card">
            <h2>{isDesignCase ? "Гол шийдлүүд" : "Гол үр дүн"}</h2>
            {project.outcomes?.length ? (
              <ul className="project-outcomes">
                {project.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Үр дүнгийн мэдээлэл оруулаагүй.</p>
            )}
          </motion.article>

          <motion.article variants={popIn} className="project-detail-card project-detail-card-wide">
            <h2>{isDesignCase ? "Нэмэлт screen-үүд" : "Бусад зурагнууд"}</h2>
            {galleryImages.length ? (
              <div className="project-gallery-grid">
                {galleryImages.map((imageUrl, index) => (
                  <a
                    key={`${imageUrl}-${index}`}
                    href={imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-gallery-item"
                  >
                    <Image
                      src={imageUrl}
                      alt={`${project.title} additional screenshot ${index + 1}`}
                      width={900}
                      height={620}
                      className="project-gallery-image"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p>Нэмэлт screenshot оруулаагүй байна.</p>
            )}
          </motion.article>

          <motion.article variants={popIn} className="project-detail-card project-detail-card-wide project-detail-pop-card">
            <h2>{isDesignCase ? "Энэ кейсийг хэрхэн үзэх вэ?" : "Хэрхэн танилцах вэ?"}</h2>
            <p>
              {isDesignCase
                ? "Энэ кейс дээр user flow, visual direction, prototype логик, миний гаргасан шийдлүүдийг харж болно. Дээрх холбоосоор prototype эсвэл live preview руу орж үзнэ."
                : "Энэ хуудас дээр төслийн зорилго, миний оролцоо, ашигласан технологи болон үр дүнг харж болно. Дээрх товчоор live/demo хувилбар руу орж үзнэ."}
            </p>
          </motion.article>
        </div>
      </div>
    </motion.main>
  );
}
