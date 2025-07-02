import { z } from "zod"

const createProjectValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Project name is required",
      })
      .max(100, "Project name cannot exceed 100 characters"),
    shortDescription: z
      .string({
        required_error: "Short description is required",
      })
      .max(200, "Short description cannot exceed 200 characters"),
    detailedDescription: z
      .string({
        required_error: "Detailed description is required",
      })
      .max(2000, "Detailed description cannot exceed 2000 characters"),
    techStack: z.array(z.string()).default([]),
    images: z.array(z.string().url("Image must be a valid URL")).default([]),
    links: z
      .object({
        live: z.string().url("Live URL must be valid").optional(),
        github: z.string().url("GitHub URL must be valid").optional(),
        demo: z.string().url("Demo URL must be valid").optional(),
      })
      .default({}),
    featured: z.boolean().default(false),
    status: z.enum(["completed", "in-progress", "planned"]).default("completed"),
  }),
})

const updateProjectValidationSchema = z.object({
  body: z.object({
    name: z.string().max(100, "Project name cannot exceed 100 characters").optional(),
    shortDescription: z.string().max(200, "Short description cannot exceed 200 characters").optional(),
    detailedDescription: z.string().max(2000, "Detailed description cannot exceed 2000 characters").optional(),
    techStack: z.array(z.string()).optional(),
    images: z.array(z.string().url("Image must be a valid URL")).optional(),
    links: z
      .object({
        live: z.string().url("Live URL must be valid").optional(),
        github: z.string().url("GitHub URL must be valid").optional(),
        demo: z.string().url("Demo URL must be valid").optional(),
      })
      .optional(),
    featured: z.boolean().optional(),
    status: z.enum(["completed", "in-progress", "planned"]).optional(),
  }),
})

export const ProjectValidation = {
  createProjectValidationSchema,
  updateProjectValidationSchema,
}
