'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, ExternalLink, X, ZoomIn } from 'lucide-react'
import type { Certificate } from '@/types/certificate'

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null)

  useEffect(() => {
    fetch('/api/certificates')
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setCertificates(json.data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading && certificates.length === 0) {
    return (
      <section id="certificates" className="section pb-24">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Сертификатууд & Диплом</h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="section pb-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent-color/5 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-color/5 blur-3xl rounded-full" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <div className="flex items-center gap-3 mb-2 justify-center">
            <Award className="text-accent-color w-6 h-6" />
            <span className="text-accent-color font-medium tracking-wider uppercase text-sm">Credentials</span>
          </div>
          <h2 className="section-title text-center">Сертификатууд & Диплом</h2>
          <p className="section-subtitle text-center max-w-2xl mx-auto mb-12">
            Өөрийн мэргэжлийн ур чадвар болон боловсролын баталгааг эндээс харах боломжтой.
          </p>
          <div className="section-divider mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="cert-card group relative bg-secondary-bg/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={cert.imageUrl}
                  alt={cert.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="p-3 bg-accent-color rounded-full text-black hover:scale-110 transition-transform shadow-lg"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent-color transition-colors line-clamp-1">
                    {cert.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
                  <span className="font-semibold">{cert.issuer}</span>
                  {cert.issueDate && (
                    <>
                      <span>•</span>
                      <span>{cert.issueDate}</span>
                    </>
                  )}
                </div>
                {cert.description && (
                  <p className="text-white/50 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {cert.description}
                  </p>
                )}
                <div className="h-1 w-0 group-hover:w-full bg-accent-color transition-all duration-500 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedCert(null)
              }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              layoutId={selectedCert._id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-auto flex items-center justify-center bg-[#111]">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>
              <div className="p-6 bg-secondary-bg/95 border-t border-white/5 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
                <p className="text-accent-color font-medium">{selectedCert.issuer}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .cert-card {
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .cert-card:hover {
          border-color: var(--accent-color);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </section>
  )
}
