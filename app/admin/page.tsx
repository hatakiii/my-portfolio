'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Project } from '@/app/page'

const EMPTY_FORM = {
  title: '',
  description: '',
  longDescription: '',
  liveUrl: '',
  githubUrl: '',
  techStack: '',
  category: 'Web App',
  featured: false,
  order: 0,
}

type FormState = typeof EMPTY_FORM

interface Toast { msg: string; type: 'success' | 'error' }

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [showForm, setShowForm] = useState(false)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/projects')
      const json = await res.json()
      if (json.success) setProjects(json.data)
    } catch {
      showToast('Төсөл ачааллахад алдаа гарлаа', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map((s) => s.trim()).filter(Boolean),
        order: Number(form.order),
      }

      const url = editId ? `/api/projects/${editId}` : '/api/projects'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.success) {
        showToast(editId ? '✅ Төсөл шинэчлэгдлээ!' : '✅ Төсөл нэмэгдлээ!')
        setForm(EMPTY_FORM)
        setEditId(null)
        setShowForm(false)
        fetchProjects()
      } else {
        showToast(json.error || 'Алдаа гарлаа', 'error')
      }
    } catch {
      showToast('Сервертэй холбогдоход алдаа гарлаа', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (p: Project) => {
    setForm({
      title: p.title,
      description: p.description,
      longDescription: p.longDescription || '',
      liveUrl: p.liveUrl,
      githubUrl: p.githubUrl || '',
      techStack: (p.techStack || []).join(', '),
      category: p.category,
      featured: p.featured,
      order: p.order ?? 0,
    })
    setEditId(p._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" төслийг устгах уу?`)) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) {
        showToast('🗑 Төсөл устгагдлаа')
        fetchProjects()
      } else {
        showToast('Устгахад алдаа гарлаа', 'error')
      }
    } catch {
      showToast('Алдаа гарлаа', 'error')
    }
  }

  const handleCancel = () => {
    setForm(EMPTY_FORM)
    setEditId(null)
    setShowForm(false)
  }

  const categories = ['Web App', 'E-commerce', 'Dashboard', 'Mobile', 'API', 'Other']

  return (
    <div className="admin-page">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-1px' }}>
              ⚙ Admin <span className="gradient-text">Panel</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Төслүүдийг удирдах хэсэг</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-outline">← Нүүр хуудас</Link>
            <button
              id="toggle-form-btn"
              className="btn-primary"
              onClick={() => { setShowForm((v) => !v); setEditId(null); setForm(EMPTY_FORM) }}
            >
              {showForm ? '✕ Хаах' : '+ Төсөл нэмэх'}
            </button>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="admin-panel" style={{ marginBottom: '40px' }}>
            <div className="admin-header">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                {editId ? '✏️ Төсөл засах' : '➕ Шинэ төсөл нэмэх'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-group">
                <label className="form-label" htmlFor="f-title">Төслийн нэр *</label>
                <input
                  id="f-title"
                  className="form-input"
                  type="text"
                  placeholder="жишээ: E-commerce Platform"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-category">Ангилал *</label>
                <select
                  id="f-category"
                  className="form-input"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{ cursor: 'pointer' }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c} style={{ background: 'var(--bg-secondary)' }}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-desc">Богино тайлбар *</label>
                <input
                  id="f-desc"
                  className="form-input"
                  type="text"
                  placeholder="Төслийн богино тайлбар (1-2 өгүүлбэр)"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-long-desc">Дэлгэрэнгүй тайлбар</label>
                <textarea
                  id="f-long-desc"
                  className="form-textarea"
                  placeholder="Төслийн дэлгэрэнгүй тайлбар, зорилго, функцүүд..."
                  value={form.longDescription}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-live">Live URL * (Vercel link)</label>
                <input
                  id="f-live"
                  className="form-input"
                  type="url"
                  placeholder="https://your-project.vercel.app"
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-github">GitHub URL</label>
                <input
                  id="f-github"
                  className="form-input"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={form.githubUrl}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-tech">Технологиуд (таслалаар тусгаарла)</label>
                <input
                  id="f-tech"
                  className="form-input"
                  type="text"
                  placeholder="Next.js, TypeScript, MongoDB, Tailwind"
                  value={form.techStack}
                  onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-order">Дараалал (жижиг = эхэнд)</label>
                <input
                  id="f-order"
                  className="form-input"
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>

              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                <input
                  id="f-featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-indigo)' }}
                />
                <label className="form-label" htmlFor="f-featured" style={{ marginBottom: 0, cursor: 'pointer' }}>
                  ⭐ Featured болгох
                </label>
              </div>

              <div className="form-group full-width" style={{ flexDirection: 'row', gap: '12px', marginTop: '8px' }}>
                <button
                  id="form-submit-btn"
                  type="submit"
                  className="btn-primary"
                  disabled={saving}
                  style={{ opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? '⏳ Хадгалж байна...' : editId ? '✏️ Шинэчлэх' : '➕ Нэмэх'}
                </button>
                <button type="button" className="btn-outline" onClick={handleCancel}>
                  Цуцлах
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects list */}
        <div className="admin-panel">
          <div className="admin-header">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              📋 Нийт төслүүд ({projects.length})
            </h2>
            <button className="btn-outline btn-sm" onClick={fetchProjects} id="refresh-btn">
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" style={{ height: '72px' }} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📂</div>
              <p>Төсөл байхгүй байна. Дээрх товчоор нэмнэ үү.</p>
            </div>
          ) : (
            <div className="admin-projects-list">
              {projects.map((p) => (
                <div key={p._id} className="admin-project-item" id={`admin-project-${p._id}`}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="admin-project-title">{p.title}</span>
                      {p.featured && (
                        <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '100px', color: 'var(--accent-indigo)', fontWeight: 700 }}>
                          ⭐ Featured
                        </span>
                      )}
                      <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'var(--bg-glass)', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text-muted)' }}>
                        {p.category}
                      </span>
                    </div>
                    <div className="admin-project-url">{p.liveUrl}</div>
                  </div>
                  <div className="admin-project-actions">
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                      🔗
                    </a>
                    <button
                      className="btn-outline btn-sm"
                      onClick={() => handleEdit(p)}
                      id={`edit-${p._id}`}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(p._id, p.title)}
                      id={`delete-${p._id}`}
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  )
}
