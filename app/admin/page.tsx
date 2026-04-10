import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/admin/AdminDashboard'
import { isAdminAuthenticated } from '@/lib/auth'

export default async function AdminPage() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    redirect('/login')
  }

  return <AdminDashboard />
}
