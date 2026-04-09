import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()
    const { id } = await params
    const body = await request.json()
    const project = await Project.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!project) {
      return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
    }
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
  try {
    await dbConnect()
    const { id } = await params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return Response.json({ success: false, error: 'Project not found' }, { status: 404 })
    }
    return Response.json({ success: true, data: {} })
  } catch (error) {
    console.error('DELETE /api/projects/[id] error:', error)
    return Response.json({ success: false, error: 'Failed to delete project' }, { status: 500 })
  }
}
