import dbConnect from '@/lib/mongodb'
import { getAdminSession } from '@/lib/auth'
import Certificate from '@/models/Certificate'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()

  if (!session) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await dbConnect()
    const body = await request.json()
    const certificate = await Certificate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })

    if (!certificate) {
      return Response.json({ success: false, error: 'Certificate not found' }, { status: 404 })
    }

    return Response.json({ success: true, data: certificate })
  } catch (error) {
    console.error('PUT /api/certificates/[id] error:', error)
    return Response.json({ success: false, error: 'Failed to update certificate' }, { status: 500 })
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()

  if (!session) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await dbConnect()
    const certificate = await Certificate.findByIdAndDelete(id)

    if (!certificate) {
      return Response.json({ success: false, error: 'Certificate not found' }, { status: 404 })
    }

    return Response.json({ success: true, data: { id } })
  } catch (error) {
    console.error('DELETE /api/certificates/[id] error:', error)
    return Response.json({ success: false, error: 'Failed to delete certificate' }, { status: 500 })
  }
}
