'use client'

import { useEffect, useRef } from 'react'

const skills = [
  'Next.js', 'React', 'TypeScript', 'Node.js',
  'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'REST API',
  'GraphQL', 'Docker', 'Git', 'Vercel',
]

export default function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="fade-in" ref={ref}>
          <span className="section-tag">✦ Миний тухай</span>
          <h2 className="section-title">
            Хэн бэ би? <span className="gradient-text">Хатанбаатар</span>
          </h2>
          <p className="section-desc">
            Веб хөгжүүлэлтэд хүсэл зоригтой хандаж, шинэ технологиудыг судлан хэрэглэдэг developer.
          </p>

          <div className="about-grid">
            {/* Avatar */}
            <div className="about-image-wrapper">
              <div className="about-image-placeholder">
                👨‍💻
              </div>
            </div>

            {/* Info */}
            <div className="about-info">
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '12px' }}>
                  Full Stack Developer
                </h3>
                <p className="about-text">
                  Би орчин үеийн веб технологиудыг ашиглан хэрэглэгчдэд таатай, 
                  өндөр чанарын вэб програмууд бүтээдэг Full Stack Developer. 
                  Next.js, React, TypeScript болон MongoDB-г ашиглан end-to-end 
                  шийдлүүд хэрэгжүүлдэг.
                </p>
              </div>

              <div>
                <p className="about-text">
                  Хурдан суралцах чадвартай, team-д нийцтэй ажиллаж, deadline-г 
                  цаг тухайд нь биелүүлдэг. Код бичихдээ цэвэр, засвар хийхэд 
                  хялбар architectural pattern-уудыг дагаддаг.
                </p>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, marginBottom: '12px', color: 'var(--text-secondary)' }}>
                  Ашигладаг технологиуд
                </h4>
                <div className="skills-grid">
                  {skills.map((s) => (
                    <div key={s} className="skill-item">
                      <span className="skill-dot" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  📄 CV татах
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  GitHub →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
