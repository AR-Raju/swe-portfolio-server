import { z } from "zod"

const updateProfileValidationSchema = z.object({
  body: z.object({
    designation: z.string().max(100, "Designation cannot exceed 100 characters").optional(),
    introduction: z.string().max(2000, "Introduction cannot exceed 2000 characters").optional(),
    resumeUrl: z.string().url("Resume URL must be a valid URL").optional(),
  }),
})

export const ProfileValidation = {
  updateProfileValidationSchema,
}
