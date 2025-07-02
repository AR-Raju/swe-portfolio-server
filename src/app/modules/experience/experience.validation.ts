import { z } from "zod"

const createExperienceValidationSchema = z.object({
  body: z.object({
    company: z
      .string({
        required_error: "Company is required",
      })
      .max(100, "Company name cannot exceed 100 characters"),
    position: z
      .string({
        required_error: "Position is required",
      })
      .max(100, "Position cannot exceed 100 characters"),
    duration: z
      .string({
        required_error: "Duration is required",
      })
      .max(50, "Duration cannot exceed 50 characters"),
    description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
  }),
})

const updateExperienceValidationSchema = z.object({
  body: z.object({
    company: z.string().max(100, "Company name cannot exceed 100 characters").optional(),
    position: z.string().max(100, "Position cannot exceed 100 characters").optional(),
    duration: z.string().max(50, "Duration cannot exceed 50 characters").optional(),
    description: z.string().max(1000, "Description cannot exceed 1000 characters").optional(),
  }),
})

export const ExperienceValidation = {
  createExperienceValidationSchema,
  updateExperienceValidationSchema,
}
