'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
  imageUrl: '',
  imagePublicId: '',
  order: 0,
}

type FormState = typeof EMPTY_FORM

interface Toast {
  msg: string
  type: 'success' | 'error'
}

export default function AdminPage() {
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
      showToast('Төсөл ачааллахад алдаа гарлаа', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

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

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: payload,
      })

      const json = await res.json()

      if (!json.success) {
        throw new Error(json.error || 'Upload failed')
      }

      setForm((current) => ({
        ...current,
        imageUrl: json.data.imageUrl,
        imagePublicId: json.data.imagePublicId,
      }))

      showToast('Зураг Cloudinary-д амжилттай хадгалагдлаа')
    } catch {
      showToast('Зураг upload хийхэд алдаа гарлаа', 'error')
    } finally {
      setUploadingImage(false)
    }
  }

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
        showToast(editId ? 'Төсөл шинэчлэгдлээ' : 'Төсөл нэмэгдлээ')
        resetForm()
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

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || '',
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl || '',
      techStack: (project.techStack || []).join(', '),
      category: project.category,
      featured: project.featured,
      imageUrl: project.imageUrl || '',
      imagePublicId: project.imagePublicId || '',
      order: project.order ?? 0,
    })
    setEditId(project._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" төслийг устгах уу?`)) return

    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      const json = await res.json()

      if (json.success) {
        showToast('Төсөл устгагдлаа')
        fetchProjects()
      } else {
        showToast('Устгахад алдаа гарлаа', 'error')
      }
    } catch {
      showToast('Алдаа гарлаа', 'error')
    }
  }

  const categories = ['Web App', 'E-commerce', 'Dashboard', 'Mobile', 'API', 'Other']

  return (
    <div className="admin-page">
      <div className="container admin-shell">
        <div className="admin-topbar">
          <div>
            <p className="admin-kicker">Portfolio CMS</p>
            <h1 className="admin-title">Төслүүдээ зурагтай нь удирдах хэсэг</h1>
            <p className="admin-subtitle">
              Screenshot upload хийх, Cloudinary-д хадгалах, жагсаалтын дараалал болон холбоосуудаа шинэчлэхэд зориулав.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-outline">Нүүр хуудас</Link>
            <button
              className="btn-primary"
              onClick={() => {
                setShowForm((current) => !current)
                if (showForm) {
                  resetForm()
                } else {
                  setEditId(null)
                  setForm(EMPTY_FORM)
                }
              }}
            >
              {showForm ? 'Форм хаах' : 'Шинэ төсөл нэмэх'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="admin-panel" style={{ marginBottom: '32px' }}>
            <div className="admin-header">
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {editId ? 'Төсөл засах' : 'Шинэ төсөл нэмэх'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="project-form">
              <div className="form-group">
                <label className="form-label" htmlFor="f-title">Төслийн нэр *</label>
                <input
                  id="f-title"
                  className="form-input"
                  type="text"
                  placeholder="SaaS dashboard, booking app..."
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
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-desc">Богино тайлбар *</label>
                <input
                  id="f-desc"
                  className="form-input"
                  type="text"
                  placeholder="Нэг мөрөөр төслийн гол үнэ цэнийг тайлбарлана."
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
                  placeholder="Зорилго, шийдсэн асуудал, гол feature-үүд..."
                  value={form.longDescription}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-live">Live URL *</label>
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
                <label className="form-label" htmlFor="f-tech">Технологиуд</label>
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
                <label className="form-label" htmlFor="f-order">Дараалал</label>
                <input
                  id="f-order"
                  className="form-input"
                  type="number"
                  min={0}
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-image">Project screenshot</label>
                <label className="upload-dropzone" htmlFor="f-image">
                  <input
                    id="f-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        void handleImageUpload(file)
                      }
                    }}
                    disabled={uploadingImage}
                    style={{ display: 'none' }}
                  />
                  <span className="upload-dropzone-title">
                    {uploadingImage ? 'Зураг upload хийж байна...' : 'Зураг сонгох эсвэл дахин солих'}
                  </span>
                  <span className="upload-dropzone-text">
                    Cloudinary дээр хадгалагдаж, нүүр хуудсан дээр card screenshot болж харагдана.
                  </span>
                </label>

                {form.imageUrl && (
                  <div className="admin-image-preview">
                    <div className="admin-image-preview-frame">
                      <Image
                        src={form.imageUrl}
                        alt="Project preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 420px"
                        className="project-image"
                      />
                    </div>
                    <div className="admin-image-preview-meta">
                      <span>Upload амжилттай.</span>
                      <button
                        type="button"
                        className="btn-outline btn-sm"
                        onClick={() => setForm((current) => ({ ...current, imageUrl: '', imagePublicId: '' }))}
                      >
                        Зургийг арилгах
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                <input
                  id="f-featured"
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label className="form-label" htmlFor="f-featured" style={{ marginBottom: 0, cursor: 'pointer' }}>
                  Featured болгож нүүрэнд онцлох
                </label>
              </div>

              <div className="form-group full-width" style={{ flexDirection: 'row', gap: '12px', marginTop: '8px' }}>
                <button type="submit" className="btn-primary" disabled={saving || uploadingImage}>
                  {saving ? 'Хадгалж байна...' : editId ? 'Шинэчлэх' : 'Нэмэх'}
                </button>
                <button type="button" className="btn-outline" onClick={resetForm}>
                  Цуцлах
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-panel">
          <div className="admin-header">
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              Нийт төслүүд ({projects.length})
            </h2>
            <button className="btn-outline btn-sm" onClick={fetchProjects}>
              Refresh
            </button>
          </div>

          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[1, 2, 3].map((item) => (
                <div key={item} className="skeleton" style={{ height: '88px' }} />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <p>Төсөл хараахан нэмэгдээгүй байна.</p>
            </div>
          ) : (
            <div className="admin-projects-list">
              {projects.map((project) => (
                <div key={project._id} className="admin-project-item">
                  <div className="admin-project-thumbnail">
                    {project.imageUrl ? (
                      <Image
                        src={project.imageUrl}
                        alt={`${project.title} preview`}
                        fill
                        sizes="96px"
                        className="project-image"
                      />
                    ) : (
                      <div className="admin-project-thumbnail-placeholder">{project.category}</div>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="admin-project-title">{project.title}</span>
                      {project.featured && (
                        <span className="admin-pill">Featured</span>
                      )}
                      <span className="admin-pill subtle">{project.category}</span>
                    </div>
                    <div className="admin-project-url">{project.liveUrl}</div>
                  </div>

                  <div className="admin-project-actions">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                      Live
                    </a>
                    <button className="btn-outline btn-sm" onClick={() => handleEdit(project)}>
                      Засах
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(project._id, project.title)}>
                      Устгах
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </div>
  )
}
