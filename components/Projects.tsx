'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import type { Project } from '@/app/page'

interface ProjectsProps {
  projects: Project[]
  loading: boolean
}

const CATEGORIES = ['Бүгд', 'Web App', 'E-commerce', 'Dashboard', 'Mobile', 'API', 'Other']

const ICONS: Record<string, string> = {
  'Web App': '🌐',
  'E-commerce': '🛒',
  'Dashboard': '📊',
  'Mobile': '📱',
  'API': '⚡',
  'Other': '✨',
}

export default function Projects({ projects, loading }: ProjectsProps) {
  const [filter, setFilter] = useState('Бүгд')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const filtered =
    filter === 'Бүгд' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="section section-soft">
      <div className="container">
        <div className="fade-in" ref={ref}>
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Screenshot-тай <span className="gradient-text">төсөл жагсаалт</span>
          </h2>
          <p className="section-desc">
            Хийсэн ажлуудаа зураг, товч тайлбар, ашигласан технологи, live/demo холбоосын хамт нэг дор харуулж байна.
          </p>

          {/* Filters */}
          <div className="projects-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
                id={`filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="projects-grid">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton" style={{ height: '320px' }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <p>Энэ ангилалд төсөл олдсонгүй.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '8px' }}>
                Admin хэсгээс шинэ төсөл нэмнэ үү.
              </p>
            </div>
          ) : (
            <div className="projects-grid">
              {filtered.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const icon = ICONS[project.category] || '✨'

  return (
    <article className="project-card" id={`project-${project._id}`}>
      <div className="project-card-media">
        {project.featured && <span className="project-featured-badge">Featured</span>}
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
            <span>{icon}</span>
            <p>Screenshot нэмэгдээгүй</p>
          </div>
        )}
      </div>

      <div className="project-card-header">
        <div>
          <div className="project-category">{project.category}</div>
          <h3 className="project-title">{project.title}</h3>
        </div>
        <div className="project-links">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
              title="GitHub"
              aria-label={`${project.title} GitHub`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            title="Live Demo"
            aria-label={`${project.title} live demo`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="project-card-body">
        <p className="project-desc">{project.description}</p>

        {project.techStack?.length > 0 && (
          <div className="project-tech">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        )}

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ marginTop: '8px', justifyContent: 'center', width: '100%' }}
        >
          Төслийг үзэх
        </a>
      </div>
    </article>
  )
}
