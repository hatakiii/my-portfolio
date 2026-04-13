'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Certificate } from '@/types/certificate'

const EMPTY_FORM = {
  title: '',
  issuer: '',
  issueDate: '',
  imageUrl: '',
  imagePublicId: '',
  description: '',
  order: 0,
}

type FormState = typeof EMPTY_FORM

interface Toast {
  msg: string
  type: 'success' | 'error'
}

export default function CertificateManager() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [showForm, setShowForm] = useState(false)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    window.setTimeout(() => setToast(null), 3000)
  }

  const fetchCertificates = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/certificates')
      const json = await res.json()
      if (json.success) setCertificates(json.data)
    } catch {
      showToast('Ачааллахад алдаа', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCertificates() }, [])

  const resetForm = () => {
    setForm(EMPTY_FORM)
    setEditId(null)
    setShowForm(false)
  }

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true)
    try {
      const payload = new FormData()
      payload.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: payload })
      const json = await res.json()
      if (!json.success) throw new Error(json.error)
      setForm(c => ({ ...c, imageUrl: json.data.imageUrl, imagePublicId: json.data.imagePublicId }))
      showToast('Зураг хадгалагдлаа')
    } catch {
      showToast('Зураг оруулахад алдаа', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.imageUrl) {
      showToast('Сертификатын зураг оруулна уу', 'error')
      return
    }
    setSaving(true)
    try {
      const url = editId ? `/api/certificates/${editId}` : '/api/certificates'
      const res = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!json.success) { showToast(json.error || 'Алдаа', 'error'); return }
      showToast(editId ? 'Шинэчлэгдлээ' : 'Нэмэгдлээ')
      resetForm()
      fetchCertificates()
    } catch {
      showToast('Сервертэй холбогдоход алдаа', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (cert: Certificate) => {
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      issueDate: cert.issueDate || '',
      imageUrl: cert.imageUrl,
      imagePublicId: cert.imagePublicId,
      description: cert.description || '',
      order: cert.order,
    })
    setEditId(cert._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" устгах уу?`)) return
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!json.success) { showToast(json.error || 'Алдаа', 'error'); return }
      showToast('Устгагдлаа')
      fetchCertificates()
    } catch {
      showToast('Алдаа', 'error')
    }
  }

  return (
    <div className="manager-panel">
      {/* Header */}
      <div className="manager-header">
        <div>
          <h2 className="manager-title">🎓 Сертификатууд</h2>
          <p className="manager-subtitle">Нийт {certificates.length} сертификат</p>
        </div>
        <button
          className={showForm ? 'manager-btn-cancel' : 'manager-btn-add'}
          onClick={() => { setShowForm(!showForm); if (showForm) resetForm() }}
        >
          {showForm ? '✕ Хаах' : '+ Нэмэх'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="manager-form-wrap">
          <h3 className="manager-form-title">{editId ? '✏️ Засах' : '➕ Шинэ сертификат'}</h3>
          <form onSubmit={handleSubmit} className="manager-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Сертификатын нэр *</label>
                <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Олгосон байгууллага *</label>
                <input className="form-input" value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} required />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Огноо</label>
                <input className="form-input" placeholder="2024-06" value={form.issueDate} onChange={e => setForm({ ...form, issueDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Дараалал</label>
                <input type="number" className="form-input" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Тайлбар (заавал биш)</label>
              <textarea className="form-textarea" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label">Сертификатын зураг / скан *</label>
              <input
                type="file" accept="image/*" className="form-input"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }}
              />
              {uploadingImage && <p className="form-hint">⏳ Зураг upload хийж байна...</p>}
              {form.imageUrl && (
                <div className="form-image-preview">
                  <Image
                    src={form.imageUrl}
                    alt="Certificate preview"
                    width={400}
                    height={250}
                    style={{ width: '100%', height: '180px', objectFit: 'contain', borderRadius: 6, background: '#f5f5f5' }}
                  />
                  <button type="button" className="form-image-remove" onClick={() => setForm(c => ({ ...c, imageUrl: '', imagePublicId: '' }))}>✕ Зураг хасах</button>
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="manager-btn-save" disabled={saving || uploadingImage}>
                {saving ? '⏳ Хадгалж байна...' : editId ? '✓ Шинэчлэх' : '✓ Хадгалах'}
              </button>
              <button type="button" className="manager-btn-cancel" onClick={resetForm}>Болих</button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="manager-list">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <div key={i} className="manager-skeleton" />)
        ) : certificates.length === 0 ? (
          <div className="manager-empty">Сертификат байхгүй байна</div>
        ) : (
          certificates.map(cert => (
            <div key={cert._id} className="manager-item">
              <div className="manager-item-thumb">
                {cert.imageUrl
                  ? <Image src={cert.imageUrl} alt={cert.title} width={48} height={32} style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                  : <div className="manager-item-thumb-placeholder">🎓</div>
                }
              </div>
              <div className="manager-item-info">
                <span className="manager-item-title">{cert.title}</span>
                <span className="manager-item-sub">{cert.issuer}{cert.issueDate ? ` · ${cert.issueDate}` : ''}</span>
              </div>
              <div className="manager-item-actions">
                <button className="manager-action-btn" onClick={() => handleEdit(cert)}>✏️</button>
                <button className="manager-action-btn manager-action-delete" onClick={() => handleDelete(cert._id, cert.title)}>🗑</button>
              </div>
            </div>
          ))
        )}
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
