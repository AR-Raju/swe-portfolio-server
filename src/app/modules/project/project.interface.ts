export interface TProject {
  _id?: string
  name: string
  shortDescription: string
  detailedDescription: string
  techStack: string[]
  images: string[]
  links: {
    live?: string
    github?: string
    demo?: string
  }
  featured: boolean
  status: "completed" | "in-progress" | "planned"
  createdAt?: Date
  updatedAt?: Date
}
