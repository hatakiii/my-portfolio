"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLanguage();

  const socialLinks = [
    { icon: <Github size={17} />, href: "https://github.com/hatakiii", label: "GitHub" },
    { icon: <Linkedin size={17} />, href: "#", label: "LinkedIn" },
    { icon: <Mail size={17} />, href: "mailto:hbbaatar@gmail.com", label: "Email" },
  ];

  return (
    <footer className="footer" style={{ padding: "64px 0", borderTop: "1px solid var(--border)" }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                style={{
                  width: 36, height: 36,
                  display: "grid", placeItems: "center",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  color: "var(--text-2)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p style={{ fontSize: "0.84rem", color: "var(--text-3)" }}>
            © {year} {t.footer.rights}
          </p>
          <p className="footer-copyright">
            {t.footer.built_with} Next.js & MongoDB
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
