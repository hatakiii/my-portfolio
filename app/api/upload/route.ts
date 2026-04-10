import cloudinary from '@/lib/config/cloudinary'
import { getAdminSession } from '@/lib/auth'

export async function POST(request: Request) {
  const session = await getAdminSession()

  if (!session) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return Response.json({ success: false, error: 'Image file is required' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'portfolio/projects',
      resource_type: 'image',
    })

    return Response.json({
      success: true,
      data: {
        imageUrl: result.secure_url,
        imagePublicId: result.public_id,
      },
    })
  } catch (error) {
    console.error('POST /api/upload error:', error)
    return Response.json({ success: false, error: 'Failed to upload image' }, { status: 500 })
  }
}
