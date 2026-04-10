import { setAdminSession, validateAdminCredentials } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username = '', password = '' } = await request.json()

    if (!validateAdminCredentials(username, password)) {
      return Response.json({ success: false, error: 'Нэвтрэх мэдээлэл буруу байна' }, { status: 401 })
    }

    await setAdminSession(username)

    return Response.json({ success: true })
  } catch (error) {
    console.error('POST /api/auth/login error:', error)
    return Response.json({ success: false, error: 'Нэвтрэхэд алдаа гарлаа' }, { status: 500 })
  }
}
