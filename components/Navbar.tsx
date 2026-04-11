"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "github", "about", "projects", "experience", "contact"];
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

  const links = [
    { href: "#home", label: "Нүүр", id: "home" },
    { href: "#github", label: "GitHub", id: "github" },
    { href: "#about", label: "Миний тухай", id: "about" },
    { href: "#projects", label: "Төслүүд", id: "projects" },
    { href: "#experience", label: "Туршлага", id: "experience" },
    { href: "#contact", label: "Холбоо барих", id: "contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo">
          My Portal
        </a>
        <ul className="navbar-links">
          {links.map((l) => (
            <li key={l.id}>
              <a href={l.href} className={active === l.id ? "active" : ""}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/admin" className="btn-outline btn-sm">
          Нэвтрэх
        </Link>
      </div>
    </nav>
  );
}
