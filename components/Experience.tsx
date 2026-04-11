'use client'

import { useEffect, useRef } from 'react'

const experiences = [
  {
    date: '2026.03 — 2026.04',
    role: 'Backend Developer Intern',
    company: 'Телкоком ХХК',
    desc: 'Spring Boot, MongoDB, Java ашиглан CRUD REST API, JWT authentication бүхий систем хөгжүүлж, invoice list, call report, dashboard зэрэг production хэсгүүдэд сайжруулалт хийж staging орчинд нийлүүлсэн.',
    icon: '💼',
  },
  {
    date: '2025.06 — 2026.02',
    role: 'Full Stack Bootcamp Trainee',
    company: 'Pinecone Academy',
    desc: 'Next.js, GraphQL, PostgreSQL, NX monorepo, Cypress, Jest зэрэг орчинд 7 хүнтэй багуудаар ажиллаж, club platform, exam system, leave management system зэрэг төслүүд дээр feature хөгжүүлэлт, PR review, Agile workflow туршлага хуримтлуулсан.',
    icon: '🚀',
  },
  {
    date: '2018.09 — 2024.06',
    role: 'Бакалавр, Хүний их эмч',
    company: 'АШУҮИС',
    desc: 'Эмчийн сургалтаар системтэй сэтгэлгээ, хариуцлага, хэрэглэгч буюу хүний хэрэгцээг анзаарах дадал суусан нь өнөөдрийн хөгжүүлэлтийн ажилд маань хүчтэй нөлөөлдөг.',
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
            Career transition, bootcamp, дадлага, бодит багийн орчинд хуримтлуулсан туршлага.
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
