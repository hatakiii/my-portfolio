import dbConnect from '@/lib/mongodb'
import { getAdminSession } from '@/lib/auth'
import cloudinary from '@/lib/config/cloudinary'
import Project from '@/models/Project'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params
    const project = await Project.findById(id).lean()

    if (!project) {
      return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    return Response.json({ success: true, data: project })
  } catch (error) {
    console.error('GET /api/projects/[id] error:', error)
    return Response.json({ success: false, error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getAdminSession()

  if (!session) {
    return Response.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await dbConnect()
    const { id } = await params
    const body = await request.json()
    const existingProject = await Project.findById(id)

    if (!existingProject) {
      return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    if (
      existingProject.imagePublicId &&
      body.imagePublicId &&
      existingProject.imagePublicId !== body.imagePublicId
    ) {
      await cloudinary.uploader.destroy(existingProject.imagePublicId)
    }

    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    return Response.json({ success: true, data: project })
  } catch (error) {
    console.error('PUT /api/projects/[id] error:', error)
    return Response.json({ success: false, error: 'Failed to update project' }, { status: 500 })
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
    await dbConnect()
    const { id } = await params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
    }

    if (project.imagePublicId) {
      await cloudinary.uploader.destroy(project.imagePublicId)
    }

    return Response.json({ success: true, data: {} })
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error)
    return Response.json({ success: false, error: 'Failed to delete project' }, { status: 500 })
  }
}
