import { Schema, model } from "mongoose"
import type { TProject } from "./project.interface"

const projectSchema = new Schema<TProject>(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [100, "Project name cannot exceed 100 characters"],
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    detailedDescription: {
      type: String,
      required: [true, "Detailed description is required"],
      trim: true,
      maxlength: [2000, "Detailed description cannot exceed 2000 characters"],
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    links: {
      live: {
        type: String,
        trim: true,
      },
      github: {
        type: String,
        trim: true,
      },
      demo: {
        type: String,
        trim: true,
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["completed", "in-progress", "planned"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
projectSchema.index({ name: "text", shortDescription: "text" })
projectSchema.index({ featured: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ createdAt: -1 })

export const Project = model<TProject>("Project", projectSchema)
