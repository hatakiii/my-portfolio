'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'experience', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const links = [
    { href: '#home', label: 'Нүүр', id: 'home' },
    { href: '#about', label: 'Миний тухай', id: 'about' },
    { href: '#projects', label: 'Төслүүд', id: 'projects' },
    { href: '#experience', label: 'Туршлага', id: 'experience' },
    { href: '#contact', label: 'Холбоо барих', id: 'contact' },
  ]

  return (
    <nav className="navbar" style={{ background: scrolled ? 'rgba(5,7,9,0.95)' : 'rgba(5,7,9,0.6)' }}>
      <div className="container navbar-inner">
        <a href="#home" className="navbar-logo">KB.</a>
        <ul className="navbar-links">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                style={active === l.id ? { color: 'var(--text-primary)', background: 'var(--bg-glass)' } : {}}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Link href="/admin" className="btn-primary btn-sm">
          ⚙ Admin
        </Link>
      </div>
    </nav>
  )
}
