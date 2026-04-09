/**
 * Seed script — жишээ өгөгдөл MongoDB-д нэмнэ.
 * Ажиллуулах: node scripts/seed.mjs
 * (MONGODB_URI-ийг .env.local-д тохируулсны дараа)
 */

import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env.local') })

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI байхгүй байна. .env.local файлыг шалгана уу.')
  process.exit(1)
}

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  longDescription: String,
  liveUrl: String,
  githubUrl: String,
  techStack: [String],
  category: String,
  featured: Boolean,
  imageUrl: String,
  order: Number,
}, { timestamps: true })

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)

const sampleProjects = [
  {
    title: 'AI Exam Platform',
    description: 'AI ашиглан шалгалт үүсгэх, онлайнаар явуулах, дүн харах бүрэн платформ.',
    longDescription: 'Next.js болон OpenAI API ашиглан шалгалтын асуулга автоматаар үүсгэдэг. MongoDB-д мэдээлэл хадгалдаг. Real-time дүн шалгах боломжтой.',
    liveUrl: 'https://ai-exam.vercel.app',
    githubUrl: 'https://github.com/khatanbaatar/ai-exam',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'OpenAI', 'Tailwind'],
    category: 'Web App',
    featured: true,
    order: 1,
  },
  {
    title: 'E-commerce Store',
    description: 'Бараа борлуулалтын бүрэн e-commerce систем — Stripe төлбөр, admin dashboard.',
    longDescription: 'Next.js App Router ашиглан бүтээгдсэн. Stripe payment integration, Admin бараа удирдах, захиалга хянах боломжтой.',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/khatanbaatar/ecommerce',
    techStack: ['Next.js', 'Stripe', 'MongoDB', 'Prisma', 'TypeScript'],
    category: 'E-commerce',
    featured: true,
    order: 2,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Бизнесийн гүйцэтгэлийн үзүүлэлтийг real-time харуулах dashboard.',
    longDescription: 'Chart.js болон Recharts ашиглан бизнесийн KPI-г визуалчилна. Role-based нэвтрэх эрх, MongoDB aggregation pipeline.',
    liveUrl: 'https://analytics-kb.vercel.app',
    githubUrl: '',
    techStack: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express'],
    category: 'Dashboard',
    featured: false,
    order: 3,
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB-д холбогдлоо')

    await Project.deleteMany({})
    console.log('🗑 Хуучин өгөгдлийг устгалаа')

    const inserted = await Project.insertMany(sampleProjects)
    console.log(`✅ ${inserted.length} жишээ төсөл нэмэгдлээ:`)
    inserted.forEach((p) => console.log(`   - ${p.title}`))
  } catch (err) {
    console.error('❌ Алдаа:', err)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Холболт таслагдлаа')
  }
}

seed()
