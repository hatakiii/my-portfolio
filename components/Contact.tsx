'use client'

import { useState, useRef, useEffect } from 'react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending (replace with real email API if needed)
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 3000)
  }

  const contacts = [
    { icon: '✉️', label: 'Email', value: 'khatanbaatar@example.com', href: 'mailto:khatanbaatar@example.com' },
    { icon: '📍', label: 'Байршил', value: 'Улаанбаатар, Монгол', href: '#' },
    { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/khatanbaatar', href: 'https://linkedin.com' },
    { icon: '🐙', label: 'GitHub', value: 'github.com/khatanbaatar', href: 'https://github.com' },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="fade-in" ref={ref}>
          <span className="section-tag">✦ Холбоо барих</span>
          <h2 className="section-title">
            Ажиллацгаая <span className="gradient-text">Хамт</span>
          </h2>
          <p className="section-desc">
            Танай байгууллагад хөгжүүлэгч хэрэгтэй бол надад мэдэгдэнэ үү.
            Хамтран ажиллахдаа баярлана.
          </p>

          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              {contacts.map((c) => (
                <a key={c.label} href={c.href} className="contact-item" target={c.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                </a>
              ))}

              {/* Quick availability */}
              <div style={{ padding: '20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-md)', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', animation: 'pulse-dot 2s infinite', display: 'inline-block' }} />
                  <span style={{ fontWeight: 700, color: '#10b981', fontSize: '0.875rem' }}>Ажлын байранд нээлттэй</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.6 }}>
                  Full-time болон part-time ажлын байрны санал авч байна. 7-14 хоногийн дотор хариу өгнө.
                </p>
              </div>
            </div>

            {/* Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Нэр</label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  placeholder="Таны нэр"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Имэйл</label>
                <input
                  id="contact-email"
                  className="form-input"
                  type="email"
                  placeholder="email@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Гарчиг</label>
                <input
                  id="contact-subject"
                  className="form-input"
                  type="text"
                  placeholder="Албан тушаалын санал / Асуулга"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Мессеж</label>
                <textarea
                  id="contact-message"
                  className="form-textarea"
                  placeholder="Таны мессеж..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              <button
                id="contact-submit"
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? '⏳ Илгээж байна...' : status === 'sent' ? '✅ Илгээгдлээ!' : '📨 Мессеж илгээх'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
