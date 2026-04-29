'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types/project'

const EMPTY_FORM = {
  title: '',
  description: '',
  longDescription: '',
  liveUrl: '',
  githubUrl: '',
  techStack: '',
  category: 'Web App',
  featured: false,
  imageUrl: '',
  imagePublicId: '',
  otherImages: '',
  order: 0,
  duration: '',
  teamSize: 1,
  developerCount: 1,
  myRole: '',
  githubContributions: 0,
  contributionsSummary: '',
  outcomes: '',
}

type FormState = typeof EMPTY_FORM

interface Toast {
  msg: string
  type: 'success' | 'error'
}

const categories = ['Web App', 'UI/UX Design', 'E-commerce', 'Dashboard', 'Mobile', 'API', 'Other']

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([])
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

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const json = await res.json()
      if (json.success) setProjects(json.data)
    } catch {
      showToast('Төслүүдийг ачааллахад алдаа гарлаа', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

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
    setSaving(true)
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(s => s.trim()).filter(Boolean),
        outcomes: form.outcomes.split('\n').map(s => s.trim()).filter(Boolean),
        otherImages: form.otherImages.split('\n').map(s => s.trim()).filter(Boolean),
        order: Number(form.order),
        teamSize: Number(form.teamSize),
        developerCount: Number(form.developerCount),
        githubContributions: Number(form.githubContributions),
      }
      const url = editId ? `/api/projects/${editId}` : '/api/projects'
      const res = await fetch(url, {
        method: editId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!json.success) { showToast(json.error || 'Алдаа', 'error'); return }
      showToast(editId ? 'Шинэчлэгдлээ' : 'Нэмэгдлээ')
      resetForm()
      fetchProjects()
    } catch {
      showToast('Сервертэй холбогдоход алдаа', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title, description: p.description, longDescription: p.longDescription || '',
      liveUrl: p.liveUrl, githubUrl: p.githubUrl || '',
      techStack: (p.techStack || []).join(', '), category: p.category, featured: p.featured,
      imageUrl: p.imageUrl || '', imagePublicId: p.imagePublicId || '',
      otherImages: (p.otherImages || []).join('\n'), order: p.order ?? 0,
      duration: p.duration || '', teamSize: p.teamSize ?? 1, developerCount: p.developerCount ?? 1,
      myRole: p.myRole || '', githubContributions: p.githubContributions ?? 0,
      contributionsSummary: p.contributionsSummary || '', outcomes: (p.outcomes || []).join('\n'),
    })
    setEditId(p._id)
    setShowForm(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" устгах уу?`)) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!json.success) { showToast(json.error || 'Алдаа', 'error'); return }
      showToast('Устгагдлаа')
      fetchProjects()
    } catch {
      showToast('Алдаа', 'error')
    }
  }

  return (
    <div className="manager-panel">
      {/* Header */}
      <div className="manager-header">
        <div>
          <h2 className="manager-title">📁 Төслүүд</h2>
          <p className="manager-subtitle">Нийт {projects.length} төсөл</p>
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
          <h3 className="manager-form-title">{editId ? '✏️ Засах' : '➕ Шинэ төсөл'}</h3>
          <form onSubmit={handleSubmit} className="manager-form">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Төслийн нэр *</label>
                <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Ангилал</label>
                <select className="form-input" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Товч тайлбар *</label>
              <input className="form-input" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Live URL *</label>
                <input className="form-input" value={form.liveUrl} onChange={e => setForm({ ...form, liveUrl: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input className="form-input" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Tech Stack (таслалаар)</label>
                <input className="form-input" value={form.techStack} placeholder="React, Node.js, MongoDB" onChange={e => setForm({ ...form, techStack: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Дараалал</label>
                <input type="number" className="form-input" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Screenshot зураг</label>
              <input
                type="file" accept="image/*" className="form-input"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }}
              />
              {uploadingImage && <p className="form-hint">⏳ Зураг upload хийж байна...</p>}
              {form.imageUrl && (
                <div className="form-image-preview">
                  <Image src={form.imageUrl} alt="Preview" width={320} height={200} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 6 }} />
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
        ) : projects.length === 0 ? (
          <div className="manager-empty">Төсөл байхгүй байна</div>
        ) : (
          projects.map(p => (
            <div key={p._id} className="manager-item">
              <div className="manager-item-thumb">
                {p.imageUrl
                  ? <Image src={p.imageUrl} alt={p.title} width={48} height={32} style={{ width: 48, height: 32, objectFit: 'cover', borderRadius: 4 }} />
                  : <div className="manager-item-thumb-placeholder">📄</div>
                }
              </div>
              <div className="manager-item-info">
                <span className="manager-item-title">{p.title}</span>
                <span className="manager-item-sub">{p.category}</span>
              </div>
              <div className="manager-item-actions">
                <Link href={`/projects/${p._id}`} className="manager-action-btn" target="_blank">👁</Link>
                <button className="manager-action-btn" onClick={() => handleEdit(p)}>✏️</button>
                <button className="manager-action-btn manager-action-delete" onClick={() => handleDelete(p._id, p.title)}>🗑</button>
              </div>
            </div>
          ))
        )}
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
