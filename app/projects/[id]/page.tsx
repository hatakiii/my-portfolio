import { notFound } from 'next/navigation'
import ProjectDetailView from '@/components/ProjectDetailView'
import dbConnect from '@/lib/mongodb'
import Project from '@/models/Project'
import type { Project as ProjectType } from '@/types/project'

async function getProject(id: string) {
  await dbConnect()
  return Project.findById(id).lean()
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)

  if (!project) {
    notFound()
  }

  const serializedProject = JSON.parse(JSON.stringify(project)) as ProjectType

  return <ProjectDetailView project={serializedProject} />
}
