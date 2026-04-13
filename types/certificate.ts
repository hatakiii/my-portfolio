export interface Certificate {
  _id: string
  title: string
  issuer: string
  issueDate?: string
  imageUrl: string
  imagePublicId: string
  description?: string
  order: number
  createdAt?: string
  updatedAt?: string
}
