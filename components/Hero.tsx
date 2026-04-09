'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    setTimeout(() => el.classList.add('visible'), 100)
  }, [])

  return (
    <section id="home" className="hero">
      {/* Background orbs */}
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />

      <div className="container">
        <div className="hero-content fade-in" ref={ref}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Ажлын байранд нээлттэй
          </div>

          <h1 className="hero-title">
            Сайн байна уу, би <br />
            <span className="gradient-text">Хатанбаатар</span> —<br />
            Full Stack Developer
          </h1>

          <p className="hero-subtitle">
            Би орчин үеийн веб технологиудыг ашиглан хэрэглэгчдэд таатай, 
            өндөр чанарын вэб програмууд бүтээдэг. Next.js, React, Node.js, 
            MongoDB-ийг ашиглан бизнесийн шийдлүүд бий болгоно.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary">
              🚀 Төслүүдийг үзэх
            </a>
            <a href="#contact" className="btn-outline">
              ✉️ Холбоо барих
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number">2+</span>
              <span className="hero-stat-label">Жилийн туршлага</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">10+</span>
              <span className="hero-stat-label">Дуусгасан төсөл</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number">5+</span>
              <span className="hero-stat-label">Технологи</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
