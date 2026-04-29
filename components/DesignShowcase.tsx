"use client";

import { motion } from "framer-motion";
import { Sigma, LayoutTemplate, MousePointerSquareDashed, Smartphone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const DESIGN_CASES = {
  mn: [
    {
      title: "Fintech Mobile App Redesign",
      summary: "Онбординг, дансны overview, мөнгө шилжүүлгийн урсгалыг илүү ойлгомжтой, premium мэдрэмжтэй болгосон redesign case.",
      outcome: "User flow, wireframe, hi-fi screen, clickable prototype",
      tools: ["Figma", "Prototype", "Design system"],
      icon: Smartphone,
    },
    {
      title: "Admin Dashboard UX Refresh",
      summary: "Мэдээлэл ихтэй dashboard дээр hierarchy, spacing, interaction state-уудыг шинэчилж decision-making-ийг хурдлуулсан.",
      outcome: "IA restructure, component audit, responsive dashboard UI",
      tools: ["UX audit", "Figma", "User journey"],
      icon: LayoutTemplate,
    },
    {
      title: "Landing Page Conversion Concept",
      summary: "Hero, proof section, CTA positioning-ийг туршиж үзсэн conversion-oriented marketing page concept.",
      outcome: "Wireframe to polished mockup, messaging layout, CTA tests",
      tools: ["Copy layout", "Visual direction", "Prototype"],
      icon: MousePointerSquareDashed,
    },
  ],
  en: [
    {
      title: "Fintech Mobile App Redesign",
      summary: "A cleaner premium flow for onboarding, account overview, and transfer interactions.",
      outcome: "User flow, wireframe, hi-fi screen, clickable prototype",
      tools: ["Figma", "Prototype", "Design system"],
      icon: Smartphone,
    },
    {
      title: "Admin Dashboard UX Refresh",
      summary: "Improved hierarchy, spacing, and state clarity for a dense analytics dashboard experience.",
      outcome: "IA restructure, component audit, responsive dashboard UI",
      tools: ["UX audit", "Figma", "User journey"],
      icon: LayoutTemplate,
    },
    {
      title: "Landing Page Conversion Concept",
      summary: "A concept focused on hero clarity, trust sections, and stronger CTA placement.",
      outcome: "Wireframe to polished mockup, messaging layout, CTA tests",
      tools: ["Copy layout", "Visual direction", "Prototype"],
      icon: MousePointerSquareDashed,
    },
  ],
} as const;

export default function DesignShowcase() {
  const { lang } = useLanguage();
  const copy = {
    mn: {
      tag: "UI/UX Design",
      title: "Вебээс гадна дизайны ажлууд",
      desc: "Би зөвхөн код биш, product thinking, user flow, wireframe, hi-fi mockup, prototype тал дээр ч ажиллаж чадна гэдгээ энэ хэсгээр харуулж байна.",
      toolsLabel: "Tools",
      outcomeLabel: "Deliverables",
      noteTitle: "Design workflow",
      noteBody:
        "Discovery, flow mapping, wireframe, visual polish, clickable prototype гэсэн шатлалаар UI/UX ажлаа үзүүлж болно. Дараа нь хүсвэл эдгээрийг Cloudinary screenshot-тай real case болгон админ хэсгээс project хэлбэрээр ч нэмэж болно.",
    },
    en: {
      tag: "UI/UX Design",
      title: "Design work beyond web builds",
      desc: "This section shows that I can contribute not only in code, but also in product thinking, flows, wireframes, hi-fi mockups, and prototype direction.",
      toolsLabel: "Tools",
      outcomeLabel: "Deliverables",
      noteTitle: "Design workflow",
      noteBody:
        "I can present UI/UX work through discovery, flow mapping, wireframes, visual polish, and clickable prototypes. If you want, these can later be added as real Cloudinary-backed case studies from the admin area too.",
    },
  }[lang];

  const cases = DESIGN_CASES[lang];

  return (
    <section id="design" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="projects-header"
        >
          <div className="projects-header-left">
            <span className="section-tag">{copy.tag}</span>
            <h2 className="section-title">{copy.title}</h2>
            <p className="section-desc">{copy.desc}</p>
          </div>

          <div className="design-badge">
            <Sigma size={18} />
            <span>Figma + UX Thinking</span>
          </div>
        </motion.div>

        <div className="design-grid">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                className="design-card"
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="design-card-preview">
                  <div className="design-preview-toolbar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="design-preview-canvas">
                    <div className="design-preview-header">
                      <Icon size={18} />
                      <strong>{item.title}</strong>
                    </div>
                    <div className="design-preview-layout">
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                </div>

                <div className="design-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>

                  <div className="design-meta">
                    <span className="project-meta-label">{copy.outcomeLabel}</span>
                    <strong>{item.outcome}</strong>
                  </div>

                  <div className="design-tools">
                    <span className="project-meta-label">{copy.toolsLabel}</span>
                    <div className="project-tech">
                      {item.tools.map((tool) => (
                        <span key={tool} className="tech-tag">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="design-note"
        >
          <h3>{copy.noteTitle}</h3>
          <p>{copy.noteBody}</p>
        </motion.div>
      </div>
    </section>
  );
}
