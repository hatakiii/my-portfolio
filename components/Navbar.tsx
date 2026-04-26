"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "github", "about", "projects", "experience", "certificates", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { href: "#home", label: t.navbar.home, id: "home" },
    { href: "#github", label: t.navbar.github, id: "github" },
    { href: "#about", label: t.navbar.about, id: "about" },
    { href: "#projects", label: t.navbar.projects, id: "projects" },
    { href: "#experience", label: t.navbar.experience, id: "experience" },
    { href: "#certificates", label: t.navbar.certificates, id: "certificates" },
    { href: "#contact", label: t.navbar.contact, id: "contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo">
          K.
        </a>
        <ul className={`navbar-links ${mobileOpen ? "mobile-open" : ""}`}>
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                className={active === l.id ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Language Switcher */}
          <button
            className="lang-switcher"
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            aria-label="Toggle language"
            title={lang === "mn" ? "Switch to English" : "Монгол руу сэлгэх"}
          >
            <span className={`lang-option ${lang === "mn" ? "lang-active" : ""}`}>МН</span>
            <span className="lang-divider">|</span>
            <span className={`lang-option ${lang === "en" ? "lang-active" : ""}`}>EN</span>
          </button>
          <Link href="/admin" className="btn-outline btn-sm">
            {t.navbar.login}
          </Link>
          <button
            className={`navbar-toggle ${mobileOpen ? "open" : ""}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
