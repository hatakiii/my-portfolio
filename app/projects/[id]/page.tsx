import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

async function getProject(id: string) {
  await dbConnect()
  return Project.findById(id).lean()
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const galleryImages = (project.otherImages || []).filter(Boolean)

  return (
    <main className="project-detail-page">
      <div className="container project-detail-shell">
        <Link href="/#projects" className="btn-outline project-back-link">Жагсаалт руу буцах</Link>

        <section className="project-detail-hero">
          <div className="project-detail-copy">
            <p className="project-detail-eyebrow">Project overview</p>
            <p className="project-category">{project.category}</p>
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-description">{project.longDescription || project.description}</p>

            <div className="project-detail-actions">
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">Төслийг үзэх</a>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-outline">GitHub</a>
              )}
            </div>

            <div className="project-detail-quick-info">
              <div className="project-quick-item">
                <span className="project-meta-label">Формат</span>
                <strong>Portfolio case study</strong>
              </div>
              <div className="project-quick-item">
                <span className="project-meta-label">Танилцах төрөл</span>
                <strong>Дэлгэрэнгүй + live холбоос</strong>
              </div>
            </div>
          </div>

          <div className="project-detail-visual">
            {project.imageUrl ? (
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="project-detail-image"
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            ) : (
              <div className="project-detail-placeholder">Screenshot байхгүй</div>
            )}
          </div>
        </section>

        <section className="project-meta-grid">
          <article className="project-meta-card">
            <span className="project-meta-label">Хугацаа</span>
            <strong>{project.duration || 'Оруулаагүй'}</strong>
          </article>
          <article className="project-meta-card">
            <span className="project-meta-label">Нийт баг</span>
            <strong>{project.teamSize || 1} хүн</strong>
          </article>
          <article className="project-meta-card">
            <span className="project-meta-label">Хөгжүүлэгчид</span>
            <strong>{project.developerCount || 1} dev</strong>
          </article>
          <article className="project-meta-card">
            <span className="project-meta-label">GitHub contribution</span>
            <strong>{project.githubContributions || 0}</strong>
          </article>
        </section>

        <section className="project-detail-sections">
          <article className="project-detail-card">
            <h2>Төслийн тухай</h2>
            <p>{project.description}</p>
          </article>

          <article className="project-detail-card">
            <h2>Миний роль</h2>
            <p>{project.myRole || 'Оруулаагүй'}</p>
          </article>

          <article className="project-detail-card">
            <h2>Ашигласан технологи</h2>
            <div className="project-tech">
              {(project.techStack || []).map((tech: string) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </article>

          <article className="project-detail-card">
            <h2>Миний contribution</h2>
            <p>{project.contributionsSummary || 'Contribution тайлбар оруулаагүй.'}</p>
          </article>

          <article className="project-detail-card">
            <h2>Гол үр дүн</h2>
            {project.outcomes?.length ? (
              <ul className="project-outcomes">
                {project.outcomes.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>Үр дүнгийн мэдээлэл оруулаагүй.</p>
            )}
          </article>

          <article className="project-detail-card project-detail-card-wide">
            <h2>Бусад зурагнууд</h2>
            {galleryImages.length ? (
              <div className="project-gallery-grid">
                {galleryImages.map((imageUrl: string, index: number) => (
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
          </article>

          <article className="project-detail-card project-detail-card-wide">
            <h2>Хэрхэн танилцах вэ?</h2>
            <p>
              Энэ хуудас дээр төслийн зорилго, миний оролцоо, ашигласан технологи болон үр дүнг
              харж болно. Хэрэв бүтээгдэхүүнийг шууд үзэхийг хүсвэл дээрх `Төслийг үзэх` товчоор
              live/demo хувилбар руу орно.
            </p>
          </article>
        </section>
      </div>
    </main>
  )
}
