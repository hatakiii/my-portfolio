'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ProjectManager from '@/components/admin/ProjectManager'
import CertificateManager from '@/components/admin/CertificateManager'

export default function AdminDashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="admin-page" style={{ padding: '80px 0 60px' }}>
      <div className="container">
        {/* Top bar */}
        <div className="admin-topbar" style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="admin-kicker">Portfolio CMS</p>
            <h1 className="admin-title" style={{ fontSize: '1.8rem', marginBottom: 4 }}>Owner Хянах Самбар</h1>
            <p className="admin-subtitle">Төслүүд болон сертификатуудаа нэг дороос удирдана.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/" className="btn-outline btn-sm">🏠 Нүүр</Link>
            <button
              className="btn-outline btn-sm"
              style={{ borderColor: 'rgba(239,68,68,0.4)', color: '#ef4444' }}
              onClick={handleLogout}
            >
              🚪 Гарах
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="admin-two-col">
          <ProjectManager />
          <div className="admin-col-divider" />
          <CertificateManager />
        </div>
      </div>
    </div>
  )
}
