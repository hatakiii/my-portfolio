'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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

const categories = ['Web App', 'E-commerce', 'Dashboard', 'Mobile', 'API', 'Other']

export default function AdminDashboard() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false)
  const [toast, setToast] = useState<Toast | null>(null)
  const [showForm, setShowForm] = useState(false)

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type })
    window.setTimeout(() => setToast(null), 3000)
  }

  const fetchProjects = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/projects')
      const json = await response.json()

      if (json.success) {
        setProjects(json.data)
      }
    } catch {
      showToast('Төслүүдийг ачааллахад алдаа гарлаа', 'error')
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

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: payload,
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Upload failed')
      }

      setForm((current) => ({
        ...current,
        imageUrl: json.data.imageUrl,
        imagePublicId: json.data.imagePublicId,
      }))

      showToast('Зураг амжилттай хадгалагдлаа')
    } catch {
      showToast('Зураг оруулахад алдаа гарлаа', 'error')
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
        techStack: form.techStack.split(',').map((item) => item.trim()).filter(Boolean),
        outcomes: form.outcomes.split('\n').map((item) => item.trim()).filter(Boolean),
        otherImages: form.otherImages.split('\n').map((item) => item.trim()).filter(Boolean),
        order: Number(form.order),
        teamSize: Number(form.teamSize),
        developerCount: Number(form.developerCount),
        githubContributions: Number(form.githubContributions),
      }

      const url = editId ? `/api/projects/${editId}` : '/api/projects'
      const method = editId ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await response.json()

      if (!json.success) {
        showToast(json.error || 'Алдаа гарлаа', 'error')
        return
      }

      showToast(editId ? 'Төсөл шинэчлэгдлээ' : 'Төсөл нэмэгдлээ')
      resetForm()
      fetchProjects()
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
      otherImages: (project.otherImages || []).join('\n'),
      order: project.order ?? 0,
      duration: project.duration || '',
      teamSize: project.teamSize ?? 1,
      developerCount: project.developerCount ?? 1,
      myRole: project.myRole || '',
      githubContributions: project.githubContributions ?? 0,
      contributionsSummary: project.contributionsSummary || '',
      outcomes: (project.outcomes || []).join('\n'),
    })
    setEditId(project._id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" төслийг устгах уу?`)) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      const json = await response.json()

      if (!json.success) {
        showToast(json.error || 'Устгахад алдаа гарлаа', 'error')
        return
      }

      showToast('Төсөл устгагдлаа')
      fetchProjects()
    } catch {
      showToast('Устгахад алдаа гарлаа', 'error')
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const handleGalleryImageUpload = async (file: File) => {
    setUploadingGalleryImage(true)

    try {
      const payload = new FormData()
      payload.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: payload,
      })

      const json = await response.json()

      if (!json.success) {
        throw new Error(json.error || 'Upload failed')
      }

      setForm((current) => {
        const nextImages = current.otherImages
          ? `${current.otherImages}\n${json.data.imageUrl}`
          : json.data.imageUrl

        return {
          ...current,
          otherImages: nextImages,
        }
      })

      showToast('Нэмэлт зураг gallery руу хадгалагдлаа')
    } catch {
      showToast('Нэмэлт зураг оруулахад алдаа гарлаа', 'error')
    } finally {
      setUploadingGalleryImage(false)
    }
  }

  return (
    <div className="admin-page">
      <div className="container admin-shell">
        <div className="admin-topbar">
          <div>
            <p className="admin-kicker">Portfolio CMS</p>
            <h1 className="admin-title">Төслүүдээ owner эрхээр удирдах хэсэг</h1>
            <p className="admin-subtitle">
              Эндээс таны бүх төслүүд public талд харагдана. Detail page дээр хугацаа, баг, contribution,
              tech stack, таны роль зэрэг мэдээлэл автоматаар очно.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-outline">Нүүр хуудас</Link>
            <button className="btn-outline" onClick={handleLogout}>Гарах</button>
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
                <label className="form-label" htmlFor="f-title">Төслийн нэр</label>
                <input id="f-title" className="form-input" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-category">Ангилал</label>
                <select id="f-category" className="form-input" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-description">Товч тайлбар</label>
                <input id="f-description" className="form-input" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-long-description">Дэлгэрэнгүй тайлбар</label>
                <textarea id="f-long-description" className="form-textarea" value={form.longDescription} onChange={(event) => setForm({ ...form, longDescription: event.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-duration">Хэр хугацаанд хийсэн</label>
                <input id="f-duration" className="form-input" placeholder="3 долоо хоног, 2 сар..." value={form.duration} onChange={(event) => setForm({ ...form, duration: event.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-role">Таны роль</label>
                <input id="f-role" className="form-input" placeholder="Full Stack Developer" value={form.myRole} onChange={(event) => setForm({ ...form, myRole: event.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-team-size">Нийт багийн хэмжээ</label>
                <input id="f-team-size" type="number" min="1" className="form-input" value={form.teamSize} onChange={(event) => setForm({ ...form, teamSize: Number(event.target.value) })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-developer-count">Хөгжүүлэгчдийн тоо</label>
                <input id="f-developer-count" type="number" min="1" className="form-input" value={form.developerCount} onChange={(event) => setForm({ ...form, developerCount: Number(event.target.value) })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-contributions">GitHub contribution</label>
                <input id="f-contributions" type="number" min="0" className="form-input" value={form.githubContributions} onChange={(event) => setForm({ ...form, githubContributions: Number(event.target.value) })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-order">Дараалал</label>
                <input id="f-order" type="number" className="form-input" value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-tech-stack">Tech stack</label>
                <input id="f-tech-stack" className="form-input" placeholder="Next.js, MongoDB, Tailwind" value={form.techStack} onChange={(event) => setForm({ ...form, techStack: event.target.value })} />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-summary">Таны contribution summary</label>
                <textarea id="f-summary" className="form-textarea" placeholder="Юуг нь та өөрөө хийсэн бэ?" value={form.contributionsSummary} onChange={(event) => setForm({ ...form, contributionsSummary: event.target.value })} />
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-outcomes">Гол үр дүнгүүд</label>
                <textarea id="f-outcomes" className="form-textarea" placeholder="Мөр бүр дээр нэг үр дүн бичнэ" value={form.outcomes} onChange={(event) => setForm({ ...form, outcomes: event.target.value })} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-live-url">Live URL</label>
                <input id="f-live-url" className="form-input" value={form.liveUrl} onChange={(event) => setForm({ ...form, liveUrl: event.target.value })} required />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="f-github-url">GitHub URL</label>
                <input id="f-github-url" className="form-input" value={form.githubUrl} onChange={(event) => setForm({ ...form, githubUrl: event.target.value })} />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Screenshot</label>
                <input
                  className="form-input"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      handleImageUpload(file)
                    }
                  }}
                />
                {uploadingImage && <p className="admin-helper-text">Зураг upload хийж байна...</p>}
                {form.imageUrl && (
                  <div className="admin-image-preview">
                    <Image src={form.imageUrl} alt="Preview" width={720} height={420} className="admin-preview-image" />
                  </div>
                )}
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-other-images">Бусад зурагнууд</label>
                <textarea
                  id="f-other-images"
                  className="form-textarea"
                  placeholder="Мөр бүр дээр нэг image URL оруулна"
                  value={form.otherImages}
                  onChange={(event) => setForm({ ...form, otherImages: event.target.value })}
                />
                <input
                  className="form-input"
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (file) {
                      handleGalleryImageUpload(file)
                    }
                  }}
                />
                {uploadingGalleryImage && <p className="admin-helper-text">Gallery зураг upload хийж байна...</p>}
                {form.otherImages && (
                  <div className="admin-gallery-preview">
                    {form.otherImages
                      .split('\n')
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((url) => (
                        <div key={url} className="admin-gallery-thumb">
                          <Image src={url} alt="Gallery preview" width={320} height={220} className="admin-preview-image" />
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="form-group full-width">
                <label className="form-label" htmlFor="f-featured">
                  <input
                    id="f-featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={(event) => setForm({ ...form, featured: event.target.checked })}
                    style={{ marginRight: '10px' }}
                  />
                  Featured төсөл болгох
                </label>
              </div>

              <div className="form-group full-width" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn-primary" type="submit" disabled={saving || uploadingImage || uploadingGalleryImage}>
                  {saving ? 'Хадгалж байна...' : editId ? 'Шинэчлэх' : 'Хадгалах'}
                </button>
                <button className="btn-outline" type="button" onClick={resetForm}>
                  Болих
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="admin-panel">
          <div className="admin-header">
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Нийт төслүүд</h2>
              <p className="admin-helper-text">Энд харагдаж буй бүх мэдээлэл public талд мөн харагдана.</p>
            </div>
          </div>

          {loading ? (
            <div className="admin-projects-list">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton" style={{ height: '84px' }} />
              ))}
            </div>
          ) : (
            <div className="admin-projects-list">
              {projects.map((project) => (
                <div key={project._id} className="admin-project-item">
                  <div className="admin-project-summary">
                    <div className="admin-project-title">{project.title}</div>
                    <div className="admin-project-url">
                      {project.duration || 'Хугацаа оруулаагүй'} • {project.developerCount || 1} dev • {project.githubContributions || 0} contributions
                    </div>
                  </div>

                  <div className="admin-project-actions">
                    <Link href={`/projects/${project._id}`} className="btn-outline btn-sm">Detail</Link>
                    <button className="btn-outline btn-sm" onClick={() => handleEdit(project)}>Засах</button>
                    <button className="btn-danger" onClick={() => handleDelete(project._id, project.title)}>Устгах</button>
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
