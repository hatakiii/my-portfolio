import { redirect } from 'next/navigation'
import LoginForm from '@/components/admin/LoginForm'
import { isAdminAuthenticated } from '@/lib/auth'

export default async function LoginPage() {
  const authenticated = await isAdminAuthenticated()

  if (authenticated) {
    redirect('/admin')
  }

  return <LoginForm />
}
