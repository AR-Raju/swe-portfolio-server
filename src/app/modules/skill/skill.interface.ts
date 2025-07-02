export interface TSkill {
  _id?: string
  name: string
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  category?: string
  createdAt?: Date
  updatedAt?: Date
}
