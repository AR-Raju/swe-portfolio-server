import { z } from "zod"

const updateContactSettingsValidationSchema = z.object({
  body: z.object({
    phone: z.string().optional(),
    email: z.string().email("Invalid email format").optional(),
    address: z.string().optional(),
    socialLinks: z
      .object({
        linkedin: z.string().url("Invalid LinkedIn URL").optional(),
        github: z.string().url("Invalid GitHub URL").optional(),
        twitter: z.string().url("Invalid Twitter URL").optional(),
        facebook: z.string().url("Invalid Facebook URL").optional(),
        instagram: z.string().url("Invalid Instagram URL").optional(),
      })
      .optional(),
  }),
})

const createContactMessageValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .max(100, "Name cannot exceed 100 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format"),
    subject: z.string().max(200, "Subject cannot exceed 200 characters").optional(),
    message: z
      .string({
        required_error: "Message is required",
      })
      .max(2000, "Message cannot exceed 2000 characters"),
  }),
})

const updateContactMessageValidationSchema = z.object({
  body: z.object({
    status: z.enum(["unread", "read", "replied"]).optional(),
  }),
})

export const ContactValidation = {
  updateContactSettingsValidationSchema,
  createContactMessageValidationSchema,
  updateContactMessageValidationSchema,
}
