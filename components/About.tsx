'use client'

import { useEffect, useRef } from 'react'

const skills = [
  'JavaScript', 'TypeScript', 'Java', 'React',
  'Next.js', 'Node.js', 'Spring Boot', 'MongoDB',
  'PostgreSQL', 'GraphQL', 'Cypress', 'Jest',
]

const highlights = [
  {
    title: 'Career transition',
    text: 'Анагаахын суурь боловсролоос software development рүү амжилттай шилжиж, хэрэглэгчийн бодит хэрэгцээг ойлгож шийдэл болгодог.',
  },
  {
    title: 'Production mindset',
    text: 'Staging merge, code review, CI/CD алдаанаас сэргийлэх local build check зэрэг бодит инженерийн урсгал дээр ажилласан.',
  },
  {
    title: 'Team contribution',
    text: '7 хүнтэй багуудад sprint, standup, PR review орчинд хамтран ажиллаж, feature-ээ эцэс хүртэл хүргэж байсан.',
  },
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
            Хурдан суралцдаг, бодит хэрэгцээг ойлгодог, frontend ба backend аль алинд нь хувь нэмэр оруулдаг хөгжүүлэгч.
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
                  Анагаахын боловсролтой ч гэлээ карьераа software development-д
                  төвлөрүүлж, Pinecone Academy bootcamp болон бодит дадлагын
                  хугацаанд веб бүтээгдэхүүн хөгжүүлэлт дээр эрчимтэй өссөн.
                  Миний хувьд технологи сурахаас илүү хэрэглэгчид үнэхээр хэрэгтэй
                  шийдэл гаргах нь хамгийн чухал.
                </p>
              </div>

              <div>
                <p className="about-text">
                  React, Next.js, Node.js дээр суурилсан full stack ажилтай
                  зэрэгцээд Java/Spring Boot-ийг бие даан сурч дадлагын ажлын
                  production даалгаварт ашигласан. Шинэ stack, шинэ домэйнд
                  богино хугацаанд дасан зохицож чаддаг нь миний гол давуу тал.
                </p>
              </div>

              <div className="about-highlights">
                {highlights.map((item) => (
                  <article key={item.title} className="about-highlight-card">
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </article>
                ))}
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
                <a href="https://github.com/hatakiii" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  GitHub →
                </a>
                <a href="mailto:hbbaatar@gmail.com" className="btn-outline">
                  hbbaatar@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
