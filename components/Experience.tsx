'use client'

import { motion } from 'framer-motion'
import { Briefcase, Rocket, GraduationCap } from 'lucide-react'

const experiences = [
  {
    date: '2026.03 — 2026.04',
    role: 'Backend Developer Intern',
    company: 'Телкоком ХХК',
    desc: 'Spring Boot, MongoDB, Java ашиглан CRUD REST API, JWT authentication бүхий систем хөгжүүлж, invoice list, call report, dashboard зэрэг production хэсгүүдэд сайжруулалт хийж staging орчинд нийлүүлсэн.',
    icon: <Briefcase className="w-5 h-5 text-white" />,
    color: 'var(--accent-primary)'
  },
  {
    date: '2025.06 — 2026.02',
    role: 'Full Stack Bootcamp Trainee',
    company: 'Pinecone Academy',
    desc: 'Next.js, GraphQL, PostgreSQL, NX monorepo, Cypress, Jest зэрэг орчинд 7 хүнтэй багуудаар ажиллаж, club platform, exam system, leave management system зэрэг төслүүд дээр feature хөгжүүлэлт, PR review, Agile workflow туршлага хуримтлуулсан.',
    icon: <Rocket className="w-5 h-5 text-white" />,
    color: 'var(--accent-secondary)'
  },
  {
    date: '2018.09 — 2024.06',
    role: 'Бакалавр, Хүний их эмч',
    company: 'АШУҮИС',
    desc: 'Эмчийн сургалтаар системтэй сэтгэлгээ, хариуцлага, хэрэглэгч буюу хүний хэрэгцээг анзаарах дадал суусан нь өнөөдрийн хөгжүүлэлтийн ажилд маань хүчтэй нөлөөлдөг.',
    icon: <GraduationCap className="w-5 h-5 text-white" />,
    color: '#10b981'
  },
]

export default function Experience() {
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
          <span className="section-tag">✦ Туршлага</span>
          <h2 className="section-title">
            Ажлын <span className="gradient-text">Туршлага</span>
          </h2>
          <p className="section-desc mx-auto">
            Бодит багийн орчинд ажиллаж, production-д код нийлүүлсэн туршлага болон миний боловсролын түүх.
          </p>
        </motion.div>

        <div className="timeline max-w-4xl mx-auto">
          {experiences.map((exp, i) => (
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
                style={{ borderColor: exp.color }}
              >
                {exp.icon}
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
