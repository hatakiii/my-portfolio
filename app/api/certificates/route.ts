import dbConnect from '@/lib/mongodb'
import { getAdminSession } from '@/lib/auth'
import Certificate from '@/models/Certificate'

export async function GET() {
  try {
    await dbConnect()
    const certificates = await Certificate.find({}).sort({ order: 1, createdAt: -1 }).lean()
    return Response.json({ success: true, data: certificates })
  } catch (error) {
    console.error('GET /api/certificates error:', error)
    return Response.json({ success: false, error: 'Failed to fetch certificates' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession()

  if (!session) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()
    const body = await request.json()
    const certificate = await Certificate.create(body)
    return Response.json({ success: true, data: certificate }, { status: 201 })
  } catch (error) {
    console.error('POST /api/certificates error:', error)
    return Response.json({ success: false, error: 'Failed to create certificate' }, { status: 500 })
  }
}
