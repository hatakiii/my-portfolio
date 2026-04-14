'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Github } from './BrandIcons'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate sending (replace with real email API if needed)
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 3000)
  }

  const contacts = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'hbbaatar@gmail.com', href: 'mailto:hbbaatar@gmail.com' },
    { icon: <Phone className="w-5 h-5" />, label: 'Утас', value: '+976 9522 1292', href: 'tel:+97695221292' },
    { icon: <MapPin className="w-5 h-5" />, label: 'Байршил', value: 'Улаанбаатар, Монгол', href: '#' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', value: 'github.com/hatakiii', href: 'https://github.com/hatakiii' },
  ]

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 -left-24 w-64 h-64 bg-accent-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="section-header text-center"
        >
          <span className="section-tag">✦ Холбоо барих</span>
          <h2 className="section-title">
            Ажиллацгаая <span className="gradient-text">Хамт</span>
          </h2>
          <p className="section-desc mx-auto">
            Шинэ төсөл, ажлын санал эсвэл зүгээр л танилцахыг хүсвэл мессеж үлдээгээрэй. 
            Би 24 цагийн дотор хариу өгөх болно.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {contacts.map((c, idx) => (
                <motion.a 
                  key={c.label} 
                  href={c.href} 
                  className="contact-item group"
                  target={c.href.startsWith('http') ? '_blank' : '_self'} 
                  rel="noopener noreferrer"
                  whileHover={{ x: 8 }}
                >
                  <div className="contact-icon text-accent-primary group-hover:text-white group-hover:bg-accent-primary transition-all duration-300">
                    {c.icon}
                  </div>
                  <div>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value group-hover:text-accent-primary transition-colors">
                      {c.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick availability card */}
            <motion.div 
              className="glass-card p-8 mt-8 border-accent-primary/20 bg-accent-primary/5"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-emerald"></span>
                </span>
                <span className="font-bold text-accent-emerald text-sm uppercase tracking-wider">
                  Ажлын байранд нээлттэй
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-0">
                Би одоогоор Junior Full Stack / Backend чиглэлээр шинэ ажлын саналд нээлттэй байна. 
                Багийн соёлтой, хурдтай хөгжиж буй хамт олонтой нэгдэхэд бэлэн.
              </p>
            </motion.div>
          </motion.div>

          {/* Form Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-10"
          >
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
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Сэдэв</label>
                <input
                  id="contact-subject"
                  className="form-input"
                  type="text"
                  placeholder="Хамтран ажиллах хүсэлт"
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
                  placeholder="Сайн байна уу? Бид тантай..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn-primary w-full justify-center py-4 mt-2"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Илгээж байна...
                  </>
                ) : status === 'sent' ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Амжилттай илгээгдлээ!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Мессеж илгээх
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
