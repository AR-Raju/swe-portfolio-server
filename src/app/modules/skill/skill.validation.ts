import { z } from "zod"

const createSkillValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Skill name is required",
      })
      .max(50, "Skill name cannot exceed 50 characters"),
    level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
      required_error: "Skill level is required",
    }),
    category: z.string().max(50, "Category cannot exceed 50 characters").optional(),
  }),
})

const updateSkillValidationSchema = z.object({
  body: z.object({
    name: z.string().max(50, "Skill name cannot exceed 50 characters").optional(),
    level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]).optional(),
    category: z.string().max(50, "Category cannot exceed 50 characters").optional(),
  }),
})

export const SkillValidation = {
  createSkillValidationSchema,
  updateSkillValidationSchema,
}
