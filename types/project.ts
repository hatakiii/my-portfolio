export interface Project {
  _id: string
  title: string
  description: string
  longDescription: string
  liveUrl: string
  githubUrl?: string
  techStack: string[]
  category: string
  featured: boolean
  imageUrl?: string
  imagePublicId?: string
  otherImages: string[]
  order: number
  duration: string
  teamSize: number
  developerCount: number
  myRole: string
  githubContributions: number
  contributionsSummary: string
  outcomes: string[]
  createdAt?: string
  updatedAt?: string
}
