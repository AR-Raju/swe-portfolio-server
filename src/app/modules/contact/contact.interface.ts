export interface TContactSettings {
  _id?: string
  phone: string
  email: string
  address?: string
  socialLinks?: {
    linkedin?: string
    github?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export interface TContactMessage {
  _id?: string
  name: string
  email: string
  subject?: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt?: Date
  updatedAt?: Date
}
