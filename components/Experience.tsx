'use client'

import { useEffect, useRef } from 'react'

const experiences = [
  {
    date: '2024 — Одоо',
    role: 'Full Stack Developer',
    company: 'Freelance / Remote',
    desc: 'Next.js, React, MongoDB ашиглан клиентийн төслүүд дээр ажиллаж байна. REST API, admin dashboard, e-commerce шийдлүүд хэрэгжүүлэв.',
    icon: '💼',
  },
  {
    date: '2023 — 2024',
    role: 'Frontend Developer Intern',
    company: 'Tech Startup, Улаанбаатар',
    desc: 'React болон TypeScript ашиглан UI компонент хөгжүүлэлт хийхэд оролцов. Figma design-г кодлох, responsive layout бүтээх туршлага эзэмшив.',
    icon: '🎓',
  },
  {
    date: '2022 — 2023',
    role: 'Computer Science Student',
    company: 'МУИС / Их сургууль',
    desc: 'Програм хангамжийн инженерчлэл, алгоритм, өгөгдлийн бүтэц, өгөгдлийн сан зэрэг хичээлүүдийг судлав.',
    icon: '🎓',
  },
]

export default function Experience() {
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
    <section id="experience" className="section">
      <div className="container">
        <div className="fade-in" ref={ref}>
          <span className="section-tag">✦ Туршлага</span>
          <h2 className="section-title">
            Ажлын <span className="gradient-text">Туршлага</span>
          </h2>
          <p className="section-desc">
            Өөрийн хөгжүүлэлтийн замнал, ажилласан байр болон эзэмшсэн туршлага.
          </p>

          <div className="timeline">
            {experiences.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot">{exp.icon}</div>
                <div className="timeline-content">
                  <div className="timeline-date">{exp.date}</div>
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-company">{exp.company}</div>
                  <div className="timeline-desc">{exp.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
