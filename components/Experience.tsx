'use client'

import { motion } from 'framer-motion'
import { Briefcase, Rocket, GraduationCap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const icons = [
  <Briefcase className="w-5 h-5 text-white" />,
  <Rocket className="w-5 h-5 text-white" />,
  <GraduationCap className="w-5 h-5 text-white" />,
]

const colors = ['var(--accent-primary)', 'var(--accent-secondary)', '#10b981']

export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="section relative overflow-hidden">
      {/* Visual background element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="section-header text-center"
        >
          <span className="section-tag">{t.experience.tag}</span>
          <h2 className="section-title">
            {t.experience.title} <span className="gradient-text">{t.experience.title_highlight}</span>
          </h2>
          <p className="section-desc mx-auto">{t.experience.desc}</p>
        </motion.div>

        <div className="timeline max-w-4xl mx-auto">
          {t.experience.items.map((exp, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="timeline-dot"
                style={{ borderColor: colors[i] }}
              >
                {icons[i]}
              </div>
              <motion.div
                className="timeline-content group"
                whileHover={{ x: 4 }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="timeline-date">{exp.date}</div>
                    <div className="timeline-role text-white group-hover:text-accent-primary transition-colors">
                      {exp.role}
                    </div>
                  </div>
                  <div className="text-accent-primary font-bold md:text-right">
                    {exp.company}
                  </div>
                </div>
                <div className="timeline-desc">{exp.desc}</div>

                {/* Decorative corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
