import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  longDescription: string
  liveUrl: string
  githubUrl?: string
  techStack: string[]
  category: string
  featured: boolean
  imageUrl?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, default: '' },
    liveUrl: { type: String, required: true },
    githubUrl: { type: String, default: '' },
    techStack: [{ type: String }],
    category: { type: String, default: 'Web App' },
    featured: { type: Boolean, default: false },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)

export default Project
