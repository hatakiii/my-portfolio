'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Github } from './BrandIcons'
import { useLanguage } from '@/context/LanguageContext'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const { t } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 3000)
  }

  const contacts = [
    { icon: <Mail size={17} />, label: 'Email', value: 'hbbaatar@gmail.com', href: 'mailto:hbbaatar@gmail.com' },
    { icon: <Phone size={17} />, label: t.contact.phone_label, value: '+976 9522 1292', href: 'tel:+97695221292' },
    { icon: <MapPin size={17} />, label: t.contact.location_label, value: t.contact.location_value, href: '#' },
    { icon: <Github size={17} />, label: 'GitHub', value: 'github.com/hatakiii', href: 'https://github.com/hatakiii' },
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
        >
          <span className="section-tag">{t.contact.tag}</span>
          <h2 className="section-title">
            {t.contact.title}{' '}
            <span className="gradient-text">{t.contact.title_highlight}</span>
          </h2>
          <p className="section-desc">{t.contact.desc}</p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="contact-item"
                target={c.href.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <div className="contact-icon">{c.icon}</div>
                <div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-value">{c.value}</div>
                </div>
              </a>
            ))}

            {/* Availability */}
            <div style={{ marginTop: 8, padding: '16px 18px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--accent-bg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#22c55e', display: 'inline-block',
                }} />
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {t.contact.available_badge}
                </span>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
                {t.contact.available_desc}
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">{t.contact.name_label}</label>
              <input
                id="contact-name"
                className="form-input"
                type="text"
                placeholder={t.contact.name_placeholder}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">{t.contact.email_label}</label>
              <input
                id="contact-email"
                className="form-input"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">{t.contact.subject_label}</label>
              <input
                id="contact-subject"
                className="form-input"
                type="text"
                placeholder={t.contact.subject_placeholder}
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">{t.contact.message_label}</label>
              <textarea
                id="contact-message"
                className="form-textarea"
                placeholder={t.contact.message_placeholder}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'sending'}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {status === 'sending' ? (
                <><Loader2 size={17} className="animate-spin" /> {t.contact.sending}</>
              ) : status === 'sent' ? (
                <><CheckCircle2 size={17} /> {t.contact.sent}</>
              ) : (
                <><Send size={17} /> {t.contact.send}</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
