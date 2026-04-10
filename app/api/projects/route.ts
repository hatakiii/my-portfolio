import dbConnect from '@/lib/mongodb'
import { getAdminSession } from '@/lib/auth'
import Project from '@/models/Project'

export async function GET() {
  try {
    await dbConnect()
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean()
    return Response.json({ success: true, data: projects })
  } catch (error) {
    console.error('GET /api/projects error:', error)
    return Response.json({ success: false, error: 'Failed to fetch projects' }, { status: 500 })
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
    const project = await Project.create(body)
    return Response.json({ success: true, data: project }, { status: 201 })
  } catch (error) {
    console.error('POST /api/projects error:', error)
    return Response.json({ success: false, error: 'Failed to create project' }, { status: 500 })
  }
}
