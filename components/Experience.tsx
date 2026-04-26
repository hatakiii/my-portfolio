'use client'

import { motion } from 'framer-motion'
import { Briefcase, Rocket, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import type { LucideIcon } from 'lucide-react'

const icons: LucideIcon[] = [Briefcase, Rocket, GraduationCap]

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="section section-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
          style={{ textAlign: 'center' }}
        >
          <span className="section-tag">{t.experience.tag}</span>
          <h2 className="section-title" style={{ margin: '0 auto 14px' }}>
            {t.experience.title}{' '}
            <span className="gradient-text">{t.experience.title_highlight}</span>
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>{t.experience.desc}</p>
        </motion.div>

        <div className="timeline">
          {t.experience.items.map((exp, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-dot">
                  {Icon && <Icon size={17} />}
                </div>
                <div className="timeline-content">
                  <div className="timeline-date">{exp.date}</div>
                  <div className="timeline-role">{exp.role}</div>
                  <div className="timeline-company">{exp.company}</div>
                  <div className="timeline-desc">{exp.desc}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
