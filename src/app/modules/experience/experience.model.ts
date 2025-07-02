import { Schema, model } from "mongoose"
import type { TExperience } from "./experience.interface"

const experienceSchema = new Schema<TExperience>(
  {
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true,
      maxlength: [50, "Duration cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  },
)

// Indexes
experienceSchema.index({ createdAt: -1 })

export const Experience = model<TExperience>("Experience", experienceSchema)
