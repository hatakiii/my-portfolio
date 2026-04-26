'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, X, ZoomIn } from 'lucide-react'
import type { Certificate } from '@/types/certificate'
import { useLanguage } from '@/context/LanguageContext'

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    fetch('/api/certificates')
      .then((r) => r.json())
      .then((json) => { if (json.success) setCertificates(json.data) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading && certificates.length === 0) {
    return (
      <section id="certificates" className="section section-soft">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.certificates.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ minHeight: 240, borderRadius: 'var(--radius-lg)' }} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="section section-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
          style={{ textAlign: 'center' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <Award size={18} style={{ color: 'var(--accent)' }} />
            <span className="section-tag" style={{ marginBottom: 0 }}>{t.certificates.tag}</span>
          </div>
          <h2 className="section-title" style={{ margin: '0 auto 12px' }}>{t.certificates.title}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>{t.certificates.subtitle}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                overflow: 'hidden',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onHoverStart={(e) => {
                (e.target as HTMLElement).closest('[data-cert]')?.setAttribute('data-hovered', '1');
              }}
            >
              {/* Image */}
              <div
                style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-subtle)', cursor: 'zoom-in' }}
                onClick={() => setSelectedCert(cert)}
              >
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  className="project-image"
                  style={{ transition: 'transform 0.4s ease' }}
                />
                {/* Hover overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.35)',
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
                  className="cert-overlay"
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'grid',
                    placeItems: 'center',
                    color: 'var(--text)',
                  }}>
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '16px 18px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>
                  {cert.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: 'var(--text-2)' }}>
                  <span style={{ fontWeight: 500 }}>{cert.issuer}</span>
                  {cert.issueDate && (
                    <>
                      <span style={{ color: 'var(--border-2)' }}>·</span>
                      <span>{cert.issueDate}</span>
                    </>
                  )}
                </div>
                {cert.description && (
                  <p style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--text-3)', lineHeight: 1.55 }}>
                    {cert.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 24,
              background: 'rgba(0,0,0,0.85)',
            }}
            onClick={() => setSelectedCert(null)}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedCert(null); }}
              style={{
                position: 'absolute', top: 20, right: 20,
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: 'none', color: '#fff', cursor: 'pointer',
                display: 'grid', placeItems: 'center',
                transition: 'background 0.2s',
                zIndex: 110,
              }}
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                maxWidth: 860, width: '100%',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: '#fff',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative', background: '#f5f5f5' }}>
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  style={{ display: 'block', width: '100%', maxHeight: '75vh', objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '18px 22px', borderTop: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 4, color: 'var(--text)' }}>
                  {selectedCert.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500 }}>
                  {selectedCert.issuer}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        [style*="cursor: zoom-in"]:hover .cert-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  )
}
