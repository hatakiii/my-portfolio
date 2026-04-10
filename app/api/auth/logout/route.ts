import { clearAdminSession } from '@/lib/auth'

export async function POST() {
  try {
    await clearAdminSession()
    return Response.json({ success: true })
  } catch (error) {
    console.error('POST /api/auth/logout error:', error)
    return Response.json({ success: false, error: 'Гарахад алдаа гарлаа' }, { status: 500 })
  }
}
