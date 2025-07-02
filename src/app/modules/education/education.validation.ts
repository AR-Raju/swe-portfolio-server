import { z } from "zod"

const createEducationValidationSchema = z.object({
  body: z.object({
    institution: z
      .string({
        required_error: "Institution is required",
      })
      .max(100, "Institution name cannot exceed 100 characters"),
    degree: z
      .string({
        required_error: "Degree is required",
      })
      .max(100, "Degree cannot exceed 100 characters"),
    period: z
      .string({
        required_error: "Period is required",
      })
      .max(50, "Period cannot exceed 50 characters"),
    description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
  }),
})

const updateEducationValidationSchema = z.object({
  body: z.object({
    institution: z.string().max(100, "Institution name cannot exceed 100 characters").optional(),
    degree: z.string().max(100, "Degree cannot exceed 100 characters").optional(),
    period: z.string().max(50, "Period cannot exceed 50 characters").optional(),
    description: z.string().max(500, "Description cannot exceed 500 characters").optional(),
  }),
})

export const EducationValidation = {
  createEducationValidationSchema,
  updateEducationValidationSchema,
}
