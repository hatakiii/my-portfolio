"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Target, Terminal, Mail } from "lucide-react";
import { Github } from "./BrandIcons";

const skills = [
  "JavaScript", "TypeScript", "Java", "React", "Next.js", 
  "Node.js", "Spring Boot", "MongoDB", "PostgreSQL", 
  "GraphQL", "Cypress", "Jest",
];

const highlights = [
  {
    title: "Career transition",
    icon: <Target className="w-5 h-5 text-accent-primary" />,
    text: "Анагаахын суурь боловсролоос software development рүү амжилттай шилжиж, хэрэглэгчийн бодит хэрэгцээг ойлгож шийдэл санал болгодог.",
  },
  {
    title: "Production mindset",
    icon: <Terminal className="w-5 h-5 text-accent-primary" />,
    text: "Staging merge, code review, CI/CD алдаанаас сэргийлэх local build check зэрэг бодит инженерийн урсгал дээр ажилласан.",
  },
  {
    title: "Team contribution",
    icon: <User className="w-5 h-5 text-accent-primary" />,
    text: "Agile орчинд 7 хүнтэй багуудад sprint, standup, PR review хийж, feature-ээ эцэс хүртэл хүргэж байсан туршлагатай.",
  },
];

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          <span className="section-tag">✦ Миний тухай</span>
          <h2 className="section-title">
            Хэн бэ би? <span className="gradient-text">Хатанбаатар</span>
          </h2>
          <p className="section-desc">
            Хурдан суралцдаг, бодит хэрэгцээг ойлгодог, frontend ба backend аль
            алинд нь хувь нэмэр оруулдаг full-stack хөгжүүлэгч.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Avatar Area */}
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-placeholder">
              <span className="text-8xl">👨‍💻</span>
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 to-transparent" />
            </div>
          </motion.div>

          {/* Info Area */}
          <div className="about-info">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">Full Stack Developer</h3>
              <p className="about-text">
                Анагаахын боловсролтой ч гэлээ карьераа software development-д
                төвлөрүүлж, Pinecone Academy bootcamp болон бодит дадлагын
                хугацаанд веб бүтээгдэхүүн хөгжүүлэлт дээр эрчимтэй өссөн.
              </p>
              <p className="about-text">
                React, Next.js дээр суурилсан full stack ажилтай зэрэгцээд 
                Java/Spring Boot-ийг бие даан сурч production-д ашигласан. 
                Шинэ технологид маш богино хугацаанд дасан зохицох чадвартай.
              </p>
            </div>

            <div className="about-highlights">
              {highlights.map((item, idx) => (
                <motion.article 
                  key={item.title} 
                  className="about-highlight-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent-primary/10 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-text-secondary text-sm uppercase tracking-widest">
                Ашигладаг технологиуд
              </h4>
              <div className="skills-grid">
                {skills.map((s, idx) => (
                  <motion.div 
                    key={s} 
                    className="skill-item"
                    whileHover={{ scale: 1.05, borderColor: "var(--accent-primary)" }}
                  >
                    <div className="skill-dot" />
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <a
                href="https://github.com/hatakiii"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Github className="w-4 h-4" /> GitHub →
              </a>
              <a href="mailto:hbbaatar@gmail.com" className="btn-outline">
                <Mail className="w-4 h-4" /> hbbaatar@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
